// Synthetic Biological & High-Speed Motion Simulator
// Demonstrates side-by-side: Conventional 30 FPS Frame Camera (blur) vs Event-Based DVS Camera (zero blur, edge spikes)

export class EventCameraSim {
  constructor() {
    this.cmosCanvas = document.getElementById("sim-cmos-canvas");
    this.dvsCanvas = document.getElementById("sim-dvs-canvas");
    this.cmosCtx = this.cmosCanvas?.getContext("2d");
    this.dvsCtx = this.dvsCanvas?.getContext("2d");

    this.width = 440;
    this.height = 300;

    // Simulation presets: "microorganisms", "rotating_disk", "saccades"
    this.preset = "microorganisms";
    this.simSpeed = 1.0;
    this.isRunning = true;
    this.animationId = null;

    // Biological specimen particles
    this.particles = [];
    this.numParticles = 12;

    // Rotating disk state
    this.diskAngle = 0;

    // Saccade eye tremor state
    this.saccadeX = 0;
    this.saccadeY = 0;
    this.saccadeTimer = 0;

    // CMOS Exposure simulation buffer (accumulates frames to simulate shutter motion blur)
    this.cmosBufferCanvas = document.createElement("canvas");
    this.cmosBufferCtx = this.cmosBufferCanvas.getContext("2d");

    // DVS internal state for differential event detection
    this.dvsPrevCanvas = document.createElement("canvas");
    this.dvsPrevCtx = this.dvsPrevCanvas.getContext("2d", { willReadFrequently: true });
    this.dvsCurrCanvas = document.createElement("canvas");
    this.dvsCurrCtx = this.dvsCurrCanvas.getContext("2d", { willReadFrequently: true });

    // DVS accumulation persistence
    this.dvsAccum = null;

    // Controls
    this.presetSelect = document.getElementById("select-sim-preset");
    this.speedSlider = document.getElementById("slider-sim-speed");
    this.speedVal = document.getElementById("val-sim-speed");
    this.btnToggleSim = document.getElementById("btn-toggle-sim");
    this.btnResetSim = document.getElementById("btn-reset-sim");

    this.init();
  }

  init() {
    if (!this.cmosCanvas || !this.dvsCanvas) return;

    this.cmosCanvas.width = this.width;
    this.cmosCanvas.height = this.height;
    this.dvsCanvas.width = this.width;
    this.dvsCanvas.height = this.height;
    this.cmosBufferCanvas.width = this.width;
    this.cmosBufferCanvas.height = this.height;
    this.dvsPrevCanvas.width = this.width;
    this.dvsPrevCanvas.height = this.height;
    this.dvsCurrCanvas.width = this.width;
    this.dvsCurrCanvas.height = this.height;

    this.dvsAccum = new Float32Array(this.width * this.height * 4);

    this.spawnParticles();
    this.bindEvents();
    this.animate();
  }

  spawnParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * (this.width - 60) + 30,
        y: Math.random() * (this.height - 60) + 30,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: Math.random() * 8 + 6,
        tailAngle: Math.random() * Math.PI * 2,
        tailLength: Math.random() * 15 + 10,
        flagellaPhase: Math.random() * Math.PI
      });
    }
  }

  bindEvents() {
    this.presetSelect?.addEventListener("change", (e) => {
      this.preset = e.target.value;
      this.resetSimulation();
    });

    this.speedSlider?.addEventListener("input", (e) => {
      this.simSpeed = parseFloat(e.target.value);
      if (this.speedVal) this.speedVal.textContent = this.simSpeed.toFixed(1) + "x";
    });

    this.btnToggleSim?.addEventListener("click", () => {
      this.isRunning = !this.isRunning;
      this.btnToggleSim.textContent = this.isRunning ? "Pause Simulation" : "Resume Simulation";
    });

    this.btnResetSim?.addEventListener("click", () => {
      this.resetSimulation();
    });
  }

  resetSimulation() {
    this.spawnParticles();
    this.diskAngle = 0;
    this.dvsAccum.fill(0);
  }

  updatePhysics() {
    if (!this.isRunning) return;

    if (this.preset === "microorganisms") {
      this.particles.forEach((p) => {
        p.x += p.vx * this.simSpeed;
        p.y += p.vy * this.simSpeed;
        p.flagellaPhase += 0.25 * this.simSpeed;

        // Bounce off walls
        if (p.x < p.radius || p.x > this.width - p.radius) p.vx *= -1;
        if (p.y < p.radius || p.y > this.height - p.radius) p.vy *= -1;

        // Slight biological random wandering
        p.vx += (Math.random() - 0.5) * 0.2;
        p.vy += (Math.random() - 0.5) * 0.2;
        // Clamp speed
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 5) {
          p.vx = (p.vx / speed) * 5;
          p.vy = (p.vy / speed) * 5;
        }
      });
    } else if (this.preset === "rotating_disk") {
      this.diskAngle += 0.08 * this.simSpeed;
    } else if (this.preset === "saccades") {
      this.saccadeTimer += 0.05 * this.simSpeed;
      if (Math.random() < 0.04 * this.simSpeed) {
        // Sudden rapid saccadic jump
        this.saccadeX = (Math.random() - 0.5) * 20;
        this.saccadeY = (Math.random() - 0.5) * 20;
      } else {
        // Micro-tremor drift back toward center
        this.saccadeX += (Math.random() - 0.5) * 1.5 - this.saccadeX * 0.1;
        this.saccadeY += (Math.random() - 0.5) * 1.5 - this.saccadeY * 0.1;
      }
    }
  }

  // Draw ground-truth biological scene to any 2D context
  drawGroundTruth(ctx, offsetX = 0, offsetY = 0) {
    ctx.fillStyle = "#0a0f1c";
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.save();
    ctx.translate(offsetX, offsetY);

    if (this.preset === "microorganisms") {
      // Draw swimming ciliates / bacteria with flagella
      this.particles.forEach((p) => {
        // Cell Body
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Inner nucleus
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "#64748b";
        ctx.fill();

        // Waving Flagellum (tail)
        ctx.beginPath();
        const angle = Math.atan2(p.vy, p.vx) + Math.PI;
        ctx.moveTo(p.x, p.y);
        for (let j = 0; j < p.tailLength; j += 4) {
          const wave = Math.sin(p.flagellaPhase + j * 0.4) * 4;
          const fx = p.x + Math.cos(angle) * j - Math.sin(angle) * wave;
          const fy = p.y + Math.sin(angle) * j + Math.cos(angle) * wave;
          ctx.lineTo(fx, fy);
        }
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    } else if (this.preset === "rotating_disk") {
      // Rotating optical chopper with alternating high-contrast dots and spokes
      const cx = this.width / 2;
      const cy = this.height / 2;
      const radius = 100;

      // Outer rim
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#1e293b";
      ctx.fill();
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 4;
      ctx.stroke();

      // High-contrast rotating markers
      const numDots = 8;
      for (let i = 0; i < numDots; i++) {
        const theta = this.diskAngle + (i * Math.PI * 2) / numDots;
        const dx = cx + Math.cos(theta) * (radius * 0.65);
        const dy = cy + Math.sin(theta) * (radius * 0.65);

        ctx.beginPath();
        ctx.arc(dx, dy, 12, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "#ffffff" : "#00e5ff";
        ctx.fill();
      }
    } else if (this.preset === "saccades") {
      // Static high-contrast anatomical eye target with microscopic eye saccade jitter
      const cx = this.width / 2 + this.saccadeX;
      const cy = this.height / 2 + this.saccadeY;

      // Biological retina vessel pattern / test pattern
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fillStyle = "#f8fafc";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.fillStyle = "#0f172a";
      ctx.fill();

      // Radial spokes
      for (let k = 0; k < 6; k++) {
        const ang = (k * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang) * 55, cy + Math.sin(ang) * 55);
        ctx.strokeStyle = "#ff3366";
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  renderCMOS() {
    // Standard CMOS camera: Fixed 30 FPS exposure integration causing motion blur
    // We simulate exposure blur by blending previous frame with current frame
    this.cmosCtx.fillStyle = "rgba(10, 15, 28, 0.22)"; // Shutter persistence
    this.cmosCtx.fillRect(0, 0, this.width, this.height);

    // Draw current ground truth with slight transparency to simulate exposure smear
    this.cmosBufferCtx.clearRect(0, 0, this.width, this.height);
    this.drawGroundTruth(this.cmosBufferCtx);

    this.cmosCtx.globalAlpha = 0.45;
    this.cmosCtx.drawImage(this.cmosBufferCanvas, 0, 0);
    this.cmosCtx.globalAlpha = 1.0;
  }

  renderDVS() {
    // DVS Neuromorphic sensor:
    // Captures instantaneous differences between consecutive states with zero blur
    this.dvsCurrCtx.clearRect(0, 0, this.width, this.height);
    this.drawGroundTruth(this.dvsCurrCtx);

    const currImg = this.dvsCurrCtx.getImageData(0, 0, this.width, this.height);
    const prevImg = this.dvsPrevCtx.getImageData(0, 0, this.width, this.height);
    const currData = currImg.data;
    const prevData = prevImg.data;

    const outImg = this.dvsCtx.createImageData(this.width, this.height);
    const outData = outImg.data;
    const totalPixels = this.width * this.height;
    const decay = 0.85;

    for (let i = 0; i < totalPixels; i++) {
      const pIdx = i * 4;
      const currLuma = 0.299 * currData[pIdx] + 0.587 * currData[pIdx + 1] + 0.114 * currData[pIdx + 2];
      const prevLuma = 0.299 * prevData[pIdx] + 0.587 * prevData[pIdx + 1] + 0.114 * prevData[pIdx + 2];

      const diff = currLuma - prevLuma;

      // Decay previous visualization
      this.dvsAccum[pIdx] *= decay;
      this.dvsAccum[pIdx + 1] *= decay;
      this.dvsAccum[pIdx + 2] *= decay;

      if (diff > 10) {
        // Brightening: ON event (+1) -> Neon Cyan/Green
        this.dvsAccum[pIdx] = 0;
        this.dvsAccum[pIdx + 1] = 255;
        this.dvsAccum[pIdx + 2] = 200;
      } else if (diff < -10) {
        // Dimming: OFF event (-1) -> Neon Crimson/Red
        this.dvsAccum[pIdx] = 255;
        this.dvsAccum[pIdx + 1] = 40;
        this.dvsAccum[pIdx + 2] = 90;
      }

      outData[pIdx] = this.dvsAccum[pIdx];
      outData[pIdx + 1] = this.dvsAccum[pIdx + 1];
      outData[pIdx + 2] = this.dvsAccum[pIdx + 2];
      outData[pIdx + 3] = 255;
    }

    this.dvsCtx.putImageData(outImg, 0, 0);

    // Copy current to previous for next differential step
    this.dvsPrevCtx.putImageData(currImg, 0, 0);
  }

  animate() {
    this.updatePhysics();
    this.renderCMOS();
    this.renderDVS();

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}
