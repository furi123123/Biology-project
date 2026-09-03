// Live Webcam Neuromorphic Dynamic Vision Sensor (DVS) Simulator
// Models per-pixel logarithmic intensity changes and emits ON (+1) and OFF (-1) events in real-time.

export class WebcamDVSSimulator {
  constructor() {
    this.video = document.createElement("video");
    this.video.playsInline = true;
    this.video.muted = true;

    this.canvas = document.getElementById("webcam-dvs-canvas");
    this.ctx = this.canvas?.getContext("2d", { willReadFrequently: true });

    // Secondary canvas for reading raw webcam frames
    this.rawCanvas = document.createElement("canvas");
    this.rawCtx = this.rawCanvas.getContext("2d", { willReadFrequently: true });

    this.isRunning = false;
    this.stream = null;
    this.animationId = null;

    // Processing resolution (efficient for per-pixel logarithmic math in JS)
    this.width = 480;
    this.height = 360;

    // Previous reference logarithmic luminance buffer: Float32Array
    this.prevLogLuma = null;

    // Event accumulation display buffer (decaying red/green/blue channels)
    this.accumBuffer = null;

    // Parameters
    this.threshold = 0.18; // Sensitivity threshold theta
    this.decayRate = 0.88; // Persistence decay factor
    this.displayMode = "dark"; // "dark" or "overlay"
    this.colorScheme = "standard"; // "standard" (green/red) or "mono"

    // Metrics
    this.eventCountCurrentSecond = 0;
    this.lastSecondTimestamp = performance.now();
    this.eventsPerSec = 0;

    // UI elements
    this.btnStart = document.getElementById("btn-start-webcam");
    this.btnStop = document.getElementById("btn-stop-webcam");
    this.statusEl = document.getElementById("webcam-status");
    this.thresholdSlider = document.getElementById("slider-webcam-threshold");
    this.thresholdVal = document.getElementById("val-webcam-threshold");
    this.decaySlider = document.getElementById("slider-webcam-decay");
    this.decayVal = document.getElementById("val-webcam-decay");
    this.modeSelect = document.getElementById("select-webcam-mode");
    this.eventRateStat = document.getElementById("stat-webcam-event-rate");
    this.bandwidthStat = document.getElementById("stat-webcam-bandwidth");

    this.init();
  }

  init() {
    if (!this.canvas) return;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.rawCanvas.width = this.width;
    this.rawCanvas.height = this.height;

    this.bindEvents();
  }

  bindEvents() {
    this.btnStart?.addEventListener("click", () => this.start());
    this.btnStop?.addEventListener("click", () => this.stop());

    this.thresholdSlider?.addEventListener("input", (e) => {
      this.threshold = parseFloat(e.target.value);
      if (this.thresholdVal) this.thresholdVal.textContent = this.threshold.toFixed(2);
    });

    this.decaySlider?.addEventListener("input", (e) => {
      this.decayRate = parseFloat(e.target.value);
      if (this.decayVal) this.decayVal.textContent = this.decayRate.toFixed(2);
    });

    this.modeSelect?.addEventListener("change", (e) => {
      this.displayMode = e.target.value;
    });
  }

  async start() {
    if (this.isRunning) return;

    try {
      if (this.statusEl) {
        this.statusEl.textContent = "Requesting camera access...";
        this.statusEl.style.color = "#fbbf24";
      }

      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        },
        audio: false
      });

      this.video.srcObject = this.stream;
      await this.video.play();

      this.isRunning = true;
      if (this.statusEl) {
        this.statusEl.textContent = "Sensor Active (Emitting Events)";
        this.statusEl.style.color = "#00ff88";
      }
      this.btnStart.disabled = true;
      this.btnStop.disabled = false;

      // Allocate buffers
      const pixelCount = this.width * this.height;
      this.prevLogLuma = new Float32Array(pixelCount);
      this.accumBuffer = new Float32Array(pixelCount * 4); // RGBA

      this.processFrame();
    } catch (err) {
      console.error("Camera access error:", err);
      if (this.statusEl) {
        this.statusEl.textContent = "Camera error: " + (err.message || "Permission denied");
        this.statusEl.style.color = "#ff3366";
      }
    }
  }

  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    if (this.statusEl) {
      this.statusEl.textContent = "Camera Inactive";
      this.statusEl.style.color = "#94a3b8";
    }
    this.btnStart.disabled = false;
    this.btnStop.disabled = true;

    // Clear canvas
    if (this.ctx) {
      this.ctx.fillStyle = "#05070c";
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "#64748b";
      this.ctx.font = "14px monospace";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Click 'Start Camera' to capture live event stream", this.width / 2, this.height / 2);
    }
  }

  processFrame() {
    if (!this.isRunning) return;

    // Draw video frame to raw hidden canvas
    this.rawCtx.drawImage(this.video, 0, 0, this.width, this.height);
    const frameData = this.rawCtx.getImageData(0, 0, this.width, this.height);
    const rawPixels = frameData.data;

    // Create target output imageData
    const outImageData = this.ctx.createImageData(this.width, this.height);
    const outPixels = outImageData.data;

    const totalPixels = this.width * this.height;
    const thresh = this.threshold;
    const decay = this.decayRate;
    const isOverlay = this.displayMode === "overlay";

    let eventsThisFrame = 0;

    for (let i = 0; i < totalPixels; i++) {
      const pIdx = i * 4;
      // Perceived luminance: 0.299R + 0.587G + 0.114B
      const r = rawPixels[pIdx];
      const g = rawPixels[pIdx + 1];
      const b = rawPixels[pIdx + 2];
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;

      // Logarithmic intensity L = ln(luma + 1)
      const logL = Math.log(luma + 1.0);

      // Decay previous accumulated visualization
      this.accumBuffer[pIdx] *= decay;     // R
      this.accumBuffer[pIdx + 1] *= decay; // G
      this.accumBuffer[pIdx + 2] *= decay; // B

      // If initial frame, populate reference and continue
      if (this.prevLogLuma[i] === 0 && logL > 0) {
        this.prevLogLuma[i] = logL;
      } else {
        const deltaL = logL - this.prevLogLuma[i];

        // Check ON threshold: Brightness increased
        if (deltaL >= thresh) {
          eventsThisFrame++;
          // Green/Cyan flash for ON event (+1)
          this.accumBuffer[pIdx] = 0;       // R
          this.accumBuffer[pIdx + 1] = 255; // G (Bright green)
          this.accumBuffer[pIdx + 2] = 160; // B
          this.prevLogLuma[i] = logL;       // Reset pixel reference
        }
        // Check OFF threshold: Brightness decreased
        else if (deltaL <= -thresh) {
          eventsThisFrame++;
          // Crimson/Red flash for OFF event (-1)
          this.accumBuffer[pIdx] = 255;     // R (Bright crimson)
          this.accumBuffer[pIdx + 1] = 30;  // G
          this.accumBuffer[pIdx + 2] = 80;  // B
          this.prevLogLuma[i] = logL;       // Reset pixel reference
        }
      }

      // Compose final pixel
      if (isOverlay) {
        // Dim grayscale video + event overlay
        const gray = luma * 0.25;
        outPixels[pIdx] = Math.min(255, gray + this.accumBuffer[pIdx]);
        outPixels[pIdx + 1] = Math.min(255, gray + this.accumBuffer[pIdx + 1]);
        outPixels[pIdx + 2] = Math.min(255, gray + this.accumBuffer[pIdx + 2]);
        outPixels[pIdx + 3] = 255;
      } else {
        // Neuromorphic dark mode
        outPixels[pIdx] = this.accumBuffer[pIdx];
        outPixels[pIdx + 1] = this.accumBuffer[pIdx + 1];
        outPixels[pIdx + 2] = this.accumBuffer[pIdx + 2];
        outPixels[pIdx + 3] = 255;
      }
    }

    this.ctx.putImageData(outImageData, 0, 0);

    // Update real-time metrics
    this.eventCountCurrentSecond += eventsThisFrame;
    const now = performance.now();
    if (now - this.lastSecondTimestamp >= 1000) {
      this.eventsPerSec = this.eventCountCurrentSecond;
      this.eventCountCurrentSecond = 0;
      this.lastSecondTimestamp = now;

      // Update HUD stats
      if (this.eventRateStat) {
        this.eventRateStat.textContent = this.eventsPerSec.toLocaleString() + " ev/s";
      }
      if (this.bandwidthStat) {
        // Each event is ~8 bytes (x: 2B, y: 2B, t: 3B, p: 1B)
        const kbSec = (this.eventsPerSec * 8) / 1024;
        this.bandwidthStat.textContent = kbSec.toFixed(1) + " KB/s";
      }
    }

    this.animationId = requestAnimationFrame(() => this.processFrame());
  }
}
