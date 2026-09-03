(function() {

// --- FILE: js\slides-data.js ---
// Bio-Inspired Event-Based Camera Presentation Data
// Comprehensive slide content with biological, neuromorphic, and circuit details.
// Editable in-browser or via this configuration file.

const initialSlides = [
  {
    id: 1,
    tag: "Introduction · Neuromorphic Vision",
    title: "Bio-Inspired Event-Based Cameras: The Silicon Retina",
    subtitle: "How vertebrate retinal neurobiology revolutionized computational vision and dynamic sensors",
    bullets: [
      "Traditional video cameras operate on an artificial clock (30–60 frames/sec), capturing static images regardless of motion.",
      "Biological eyes do not capture frames: 100+ million photoreceptors operate asynchronously, transmitting changes via spike trains.",
      "Neuromorphic Event-Based Cameras (Dynamic Vision Sensors - DVS) mimic the vertebrate retina at the hardware level.",
      "This presentation explores the biological neural circuitry, the silicon pixel architecture, and real-world biomedical applications."
    ],
    highlightBox: {
      title: "Core Philosophy",
      text: "Only transmit information when something changes. Nature doesn't waste energy transmitting redundant static scenes."
    },
    speakerNotes: "Welcome everyone. Today we are presenting our project on Bio-Inspired Event-Based Cameras, often referred to as Silicon Retinas. Traditional vision systems are fundamentally limited because they sample the world in rigid frames. We will see how imitating the biological retina solves the latency, power, and dynamic range bottlenecks."
  },
  {
    id: 2,
    tag: "Conventional vs Biological",
    title: "The Frame-Based Bottleneck in Computer Vision",
    subtitle: "Why conventional CMOS and CCD sensors fail in high-speed, high-contrast dynamic environments",
    bullets: [
      "Fixed Exposure Time: Fast moving objects traverse multiple pixels during exposure, causing severe motion blur.",
      "High Latency: A 30 FPS camera imposes a minimum 33 ms latency before an entire matrix frame can be read out.",
      "Low Dynamic Range (~60 dB): In high-contrast scenes (bright sunlight + dark shadows), images either overexpose or underexpose.",
      "Massive Data Redundancy: If a camera looks at a still room, it transmits gigabytes of identical pixels every minute, consuming wasteful power and bandwidth."
    ],
    highlightBox: {
      title: "The Frame Problem",
      text: "Conventional cameras treat time as a sequence of still snapshots. Biology treats time as a continuous asynchronous continuum."
    },
    speakerNotes: "Highlight the contrast between frames and nature. A standard camera takes 30 photos a second whether a cheetah is running or sitting still. This produces severe motion blur, latency bottlenecks, and consumes excessive battery power."
  },
  {
    id: 3,
    tag: "Neurobiology",
    title: "Biological Inspiration: The Vertebrate Retina",
    subtitle: "Multilayered neural processing from photoreceptors to Retinal Ganglion Cells (RGCs)",
    bullets: [
      "Photoreceptors (Rods & Cones): Convert incident photons into membrane potentials with logarithmic compression: V ∝ ln(I), covering 9 orders of magnitude.",
      "Horizontal & Bipolar Cells: Perform local spatial lateral inhibition and edge contrast normalization in the outer plexiform layer.",
      "Amacrine Cells: Modulate temporal dynamics and motion sensitivity in the inner plexiform layer.",
      "Retinal Ganglion Cells (RGCs): Generate action potential spikes (ON-center / OFF-center). They only fire when relative local illumination changes!"
    ],
    highlightBox: {
      title: "Biological Fact",
      text: "The human optic nerve has ~1 million axons carrying asynchronous spikes from ~120 million photoreceptors—an instantaneous biological data compression ratio exceeding 100:1!"
    },
    speakerNotes: "Focus on the biological pathway. Explain how the retina is not just a sensor, but an outgrowth of the central nervous system. Emphasize the logarithmic intensity compression and how Retinal Ganglion Cells only transmit spike events upon temporal contrast changes."
  },
  {
    id: 4,
    tag: "Neuromorphic Engineering",
    title: "Anatomy of a Silicon Retina: The DVS Pixel Circuit",
    subtitle: "Translating biological retinal layers into subthreshold analog CMOS circuitry",
    bullets: [
      "Pioneered by Carver Mead, Misha Mahowald, and refined by Tobi Delbruck (ETH Zurich).",
      "Stage 1 - Logarithmic Photoreceptor: Fast photodiode with subthreshold feedback FETs generates voltage V_log ∝ ln(I_ph).",
      "Stage 2 - Capacitive Differencing Amplifier: High-pass capacitive divider removes DC background illumination and amplifies transient changes: ΔV = -A · Δln(I).",
      "Stage 3 - Dual Inverting Comparators: Detects positive threshold (+θ_ON) and negative threshold (-θ_OFF).",
      "Stage 4 - Asynchronous Handshake: Once a threshold is crossed, an ON or OFF spike is placed on the bus, and the pixel auto-resets."
    ],
    highlightBox: {
      title: "DVS Event Condition",
      text: "An event is emitted at pixel (x,y) at time t whenever |ln(I_t) - ln(I_{t-Δt})| ≥ θ."
    },
    speakerNotes: "Walk through the four circuit stages. Point out how each circuit stage maps 1-to-1 to a biological layer: the photodiode maps to rods/cones, the capacitive amplifier maps to bipolar cells, and the comparators map to ganglion cells."
  },
  {
    id: 5,
    tag: "Signal Representation",
    title: "Address-Event Representation (AER)",
    subtitle: "Asynchronous, event-driven data streaming with microsecond temporal precision",
    bullets: [
      "Instead of dense video matrices I(x, y, t), event cameras output an asynchronous stream of discrete event tuples:",
      "Event Tuple: e_k = (x_k, y_k, t_k, p_k)",
      "x, y: Sensor pixel coordinates (e.g. 1280 × 720).",
      "t: Microsecond-precision timestamp (1 μs temporal resolution).",
      "p ∈ {+1, -1}: Polarity (+1 for brightness increase [ON], -1 for brightness decrease [OFF]).",
      "Spatiotemporal Space-Time: Plotted in 3D (x, y, time), moving edges form continuous geometric trajectories rather than choppy frames."
    ],
    highlightBox: {
      title: "Zero Redundancy",
      text: "If there is no motion in the scene, the camera transmits 0 bytes! Bandwidth scales strictly with scene activity."
    },
    speakerNotes: "Explain AER (Address-Event Representation). Each pixel autonomously requests access to an asynchronous arbiter bus the instant it detects change. The result is a continuous 3D stream of space-time events."
  },
  {
    id: 6,
    tag: "Performance Metrics",
    title: "Technical Benchmark: Conventional CMOS vs Event Camera",
    subtitle: "Quantitative comparison demonstrating neuromorphic sensor superiority",
    bullets: [
      "Temporal Resolution: Standard CMOS = 33 ms (30 FPS) | Event Camera = < 1 microsecond (1 μs).",
      "Dynamic Range: Standard CMOS = ~60 dB | Event Camera = > 120–140 dB (operates in starlight to bright sun).",
      "Motion Blur: Standard CMOS = Severe streaking and exposure smear | Event Camera = Completely blur-free.",
      "Power Consumption: Standard CMOS = 1 to 5 Watts | Event Camera = 5 to 50 milliwatts.",
      "Data Rate: Standard CMOS = 30-100 MB/s constant raw stream | Event Camera = Kilobytes to Megabytes sparse."
    ],
    highlightBox: {
      title: "Key Takeaway",
      text: "Event cameras achieve 10,000x faster temporal response while consuming up to 100x less power than conventional high-speed cameras."
    },
    speakerNotes: "Draw attention to the quantitative metrics. A 10,000 FPS conventional high-speed camera melts batteries and fills hard drives in seconds. An event camera provides microsecond accuracy at milliwatt power consumption."
  },
  {
    id: 7,
    tag: "Applications",
    title: "Biomedical & Cutting-Edge Scientific Applications",
    subtitle: "How silicon retinas transform bio-imaging, prosthetics, and medical robotics",
    bullets: [
      "Retinal Prosthetics (Bionic Vision): Translates visual scenes into neuromorphic spike trains directly stimulating remaining optic nerve fibers in retinitis pigmentosa patients.",
      "High-Speed Microscopic Tracking: Tracks swimming micro-organisms (e.g., paramecia, spermatozoa, flagellates) and intracellular calcium dynamics without intense laser illumination that induces phototoxicity.",
      "Robotic Microsurgery: Sub-millisecond tracking of pulsating tissues, blood vessels, and vibrating micro-tools in glare-heavy surgical fields.",
      "Saccadic Eye Tracking in VR/AR: Microsecond low-latency gaze tracking using minimal power inside lightweight wearable headsets."
    ],
    highlightBox: {
      title: "Bio-Medical Frontier",
      text: "Because biological cells naturally communicate in spikes, event-based sensors provide an impedance-matched bridge between technology and living neural tissue."
    },
    speakerNotes: "Connect the engineering back to biology and medicine. Highlight retinal prosthetics where DVS camera output can interface directly with retinal ganglion cells or the visual cortex, and non-phototoxic micro-organism microscopy."
  },
  {
    id: 8,
    tag: "Summary & Demo",
    title: "Summary & Live Interactive Demonstration",
    subtitle: "Transitioning from rigid artificial frames to natural event-driven neuromorphic intelligence",
    bullets: [
      "Bio-Inspired Engineering: Re-engineering sensors based on billions of years of biological evolution yields orders-of-magnitude efficiency gains.",
      "Silicon Retina (DVS): Emulates logarithmic photoreceptors and temporal differentiation in retinal ganglion cells.",
      "Next Frontier: Spiking Neural Networks (SNNs) and neuromorphic processors (Intel Loihi, SynSense) processing events natively without frame reconstruction.",
      "Explore the Working Model Below: Test the live webcam event stream, synthetic biological micro-organism tracking, and the 3D space-time event cloud!"
    ],
    highlightBox: {
      title: "Experience it Live",
      text: "Scroll down to launch the live webcam neuromorphic event stream and test biological motion tracking in real-time."
    },
    speakerNotes: "Wrap up the presentation by summarizing the bio-inspiration principles. Now invite the audience to observe the live interactive demonstration below the slide deck."
  }
];

// --- FILE: js\bio-retina-circuit.js ---
// Interactive Biological Retina vs Neuromorphic Silicon Circuit Explorer
// Highlights 1-to-1 functional equivalence between retinal neurobiology and DVS hardware

const retinaBioPairs = [
  {
    id: "photoreceptor",
    bioTitle: "Photoreceptors (Rods & Cones)",
    bioDesc: "Outer segments contain rhodopsin/opsin photopigments. Light triggers cyclic GMP breakdown and hyperpolarizes the membrane with logarithmic intensity compression V ∝ ln(I), covering over 9 orders of magnitude (scotopic to photopic).",
    siliconTitle: "Logarithmic Photoreceptor Circuit",
    siliconDesc: "Fast reverse-biased silicon photodiode coupled to a subthreshold MOSFET feedback loop. Converts photocurrent I_ph into a voltage V_log = V_0 + U_t · ln(I_ph / I_0), achieving >120 dB dynamic range without saturation.",
    bioSub: "Outer Plexiform Layer · Graded Potentials",
    siliconSub: "Subthreshold Analog CMOS · Continuous Log Voltage"
  },
  {
    id: "bipolar",
    bioTitle: "Horizontal & Bipolar Cells",
    bioDesc: "Horizontal cells provide lateral inhibition for spatial contrast. Bipolar cells act as high-pass temporal filters, removing the DC background illumination and transmitting transient relative luminance changes.",
    siliconTitle: "Capacitive Differencing Amplifier",
    siliconDesc: "A capacitive divider (C_1 / C_2) and high-gain inverting operational amplifier. Blocks static DC ambient light and amplifies only dynamic luminance changes with closed-loop gain A = C_1 / C_2: ΔV = -A · Δln(I).",
    bioSub: "Middle Plexiform Layer · Spatial/Temporal Contrast",
    siliconSub: "Switched Capacitor Differencing · DC Offset Rejection"
  },
  {
    id: "ganglion",
    bioTitle: "Retinal Ganglion Cells (RGCs)",
    bioDesc: "ON-center and OFF-center RGCs threshold membrane depolarizations. When temporal contrast exceeds threshold, voltage-gated Na+ channels open, emitting discrete all-or-nothing action potentials (spikes).",
    siliconTitle: "Dual Threshold Comparators",
    siliconDesc: "Two continuous-time inverting comparators compare the amplified change against adjustable thresholds: +θ_ON (brightening) and -θ_OFF (dimming). Exceeding either threshold trips an asynchronous digital latch.",
    bioSub: "Inner Retinal Layer · Action Potentials (Spikes)",
    siliconSub: "Continuous-Time Comparators · Digital Pulse Latches"
  },
  {
    id: "optic_nerve",
    bioTitle: "Optic Nerve Axon Bundle",
    bioDesc: "~1 million myelinated axons bundle together to transmit asynchronous spike trains directly to the Lateral Geniculate Nucleus (LGN) and Superior Colliculus with zero clock cycles.",
    siliconTitle: "Address-Event Representation (AER) Bus",
    siliconDesc: "High-speed row and column arbiters handle collision-free pixel readouts, transmitting packet tuples (x, y, timestamp, polarity) across asynchronous digital buses to neuromorphic processors.",
    bioSub: "Cranial Nerve II · Sparse Asynchronous Transmission",
    siliconSub: "Arbitrated Asynchronous Bus · Microsecond Timestamping"
  }
];

class BioRetinaExplorer {
  constructor() {
    this.bioColumn = document.getElementById("bio-layers-list");
    this.siliconColumn = document.getElementById("silicon-layers-list");
    this.deepDiveTitle = document.getElementById("deepdive-title");
    this.deepDiveBio = document.getElementById("deepdive-bio");
    this.deepDiveSilicon = document.getElementById("deepdive-silicon");

    this.activeId = "photoreceptor";
    this.init();
  }

  init() {
    if (!this.bioColumn || !this.siliconColumn) return;

    this.render();
    this.selectPair(this.activeId);
  }

  render() {
    this.bioColumn.innerHTML = "";
    this.siliconColumn.innerHTML = "";

    retinaBioPairs.forEach((pair) => {
      // Bio Card
      const bioCard = document.createElement("div");
      bioCard.className = "anatomy-card";
      bioCard.dataset.id = pair.id;
      bioCard.innerHTML = `
        <span class="layer-badge bio">Biological Layer</span>
        <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 0.25rem;">${pair.bioTitle}</h4>
        <div style="font-size: 0.8rem; color: #10b981; font-family: var(--font-mono); margin-bottom: 0.5rem;">${pair.bioSub}</div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.4;">${pair.bioDesc.slice(0, 95)}...</p>
      `;
      bioCard.addEventListener("click", () => this.selectPair(pair.id));
      this.bioColumn.appendChild(bioCard);

      // Silicon Card
      const siliconCard = document.createElement("div");
      siliconCard.className = "anatomy-card";
      siliconCard.dataset.id = pair.id;
      siliconCard.innerHTML = `
        <span class="layer-badge silicon">Neuromorphic Silicon Circuit</span>
        <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 0.25rem;">${pair.siliconTitle}</h4>
        <div style="font-size: 0.8rem; color: var(--accent-cyan); font-family: var(--font-mono); margin-bottom: 0.5rem;">${pair.siliconSub}</div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.4;">${pair.siliconDesc.slice(0, 95)}...</p>
      `;
      siliconCard.addEventListener("click", () => this.selectPair(pair.id));
      this.siliconColumn.appendChild(siliconCard);
    });
  }

  selectPair(id) {
    this.activeId = id;
    const pair = retinaBioPairs.find((p) => p.id === id);
    if (!pair) return;

    // Highlight active cards in both columns
    document.querySelectorAll(".anatomy-card").forEach((card) => {
      if (card.dataset.id === id) {
        card.classList.add("highlighted");
      } else {
        card.classList.remove("highlighted");
      }
    });

    // Update Deep Dive card
    if (this.deepDiveTitle) {
      this.deepDiveTitle.textContent = `${pair.bioTitle}  ⇄  ${pair.siliconTitle}`;
    }
    if (this.deepDiveBio) {
      this.deepDiveBio.innerHTML = `
        <strong style="color: #10b981; display: block; margin-bottom: 0.3rem;">Biological Mechanism:</strong>
        <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">${pair.bioDesc}</p>
      `;
    }
    if (this.deepDiveSilicon) {
      this.deepDiveSilicon.innerHTML = `
        <strong style="color: var(--accent-cyan); display: block; margin-bottom: 0.3rem;">Silicon DVS Circuit Implementation:</strong>
        <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">${pair.siliconDesc}</p>
      `;
    }
  }
}

// --- FILE: js\presentation.js ---
// Presentation Deck Controller with Fullscreen, Keyboard Shortcuts, and Custom Embed Mode


class PresentationDeck {
  constructor() {
    this.slides = [...initialSlides];
    this.currentIndex = 0;
    this.isEmbedMode = false;
    this.embedUrl = "";

    // DOM Elements
    this.deckContainer = document.getElementById("presentation-deck");
    this.slideStage = document.getElementById("slide-stage");
    this.slideContent = document.getElementById("slide-content");
    this.slideTag = document.getElementById("slide-tag");
    this.slideTitle = document.getElementById("slide-title");
    this.slideSubtitle = document.getElementById("slide-subtitle");
    this.slideBullets = document.getElementById("slide-bullets");
    this.slideHighlight = document.getElementById("slide-highlight");
    this.slideIndicator = document.getElementById("slide-indicator");
    this.progressBar = document.getElementById("slide-progress-fill");
    this.notesDrawer = document.getElementById("speaker-notes-drawer");
    this.notesText = document.getElementById("speaker-notes-text");
    this.embedWrapper = document.getElementById("embed-frame-wrapper");
    this.embedIframe = document.getElementById("embed-iframe");

    // Buttons
    this.btnPrev = document.getElementById("btn-prev-slide");
    this.btnNext = document.getElementById("btn-next-slide");
    this.btnFullscreen = document.getElementById("btn-fullscreen");
    this.btnNotes = document.getElementById("btn-toggle-notes");
    this.btnCustomize = document.getElementById("btn-customize-deck");

    // Modal elements
    this.customModal = document.getElementById("deck-custom-modal");
    this.btnCloseModal = document.getElementById("btn-close-modal");
    this.btnSaveCustom = document.getElementById("btn-save-custom");
    this.inputEmbedUrl = document.getElementById("input-embed-url");
    this.radioBuiltIn = document.getElementById("radio-mode-builtin");
    this.radioEmbed = document.getElementById("radio-mode-embed");

    this.init();
  }

  init() {
    // Load persisted custom presentation preferences if available
    const savedEmbed = localStorage.getItem("bio_deck_embed_url");
    const savedMode = localStorage.getItem("bio_deck_mode");
    if (savedEmbed) {
      this.embedUrl = savedEmbed;
      if (this.inputEmbedUrl) this.inputEmbedUrl.value = savedEmbed;
    }
    if (savedMode === "embed" && savedEmbed) {
      this.setEmbedMode(true);
    } else {
      this.setEmbedMode(false);
      this.renderSlide(this.currentIndex);
    }

    this.bindEvents();
  }

  bindEvents() {
    // Nav buttons
    this.btnPrev?.addEventListener("click", () => this.prevSlide());
    this.btnNext?.addEventListener("click", () => this.nextSlide());

    // Fullscreen toggle
    this.btnFullscreen?.addEventListener("click", () => this.toggleFullscreen());

    // Speaker notes toggle
    this.btnNotes?.addEventListener("click", () => this.toggleNotes());

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      // Ignore keystrokes when typing into input fields
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        this.toggleNotes();
      }
    });

    // Fullscreen state listener
    document.addEventListener("fullscreenchange", () => {
      const isFs = !!document.fullscreenElement;
      if (this.deckContainer) {
        this.deckContainer.classList.toggle("is-fullscreen", isFs);
      }
      if (this.btnFullscreen) {
        this.btnFullscreen.innerHTML = isFs
          ? `<i data-lucide="minimize"></i><span>Exit Fullscreen</span>`
          : `<i data-lucide="maximize"></i><span>Fullscreen (F)</span>`;
        if (window.lucide) window.lucide.createIcons();
      }
    });

    // Customizer Modal
    this.btnCustomize?.addEventListener("click", () => this.openModal());
    this.btnCloseModal?.addEventListener("click", () => this.closeModal());
    this.btnSaveCustom?.addEventListener("click", () => this.saveCustomSettings());
  }

  renderSlide(index) {
    if (index < 0 || index >= this.slides.length) return;
    this.currentIndex = index;
    const slide = this.slides[index];

    // Trigger re-animation
    this.slideContent.style.animation = "none";
    this.slideContent.offsetHeight; // trigger reflow
    this.slideContent.style.animation = "slideFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)";

    // Update texts
    this.slideTag.textContent = slide.tag;
    this.slideTitle.textContent = slide.title;
    this.slideSubtitle.textContent = slide.subtitle;

    // Bullets
    this.slideBullets.innerHTML = "";
    slide.bullets.forEach((bullet) => {
      const li = document.createElement("li");
      li.className = "slide-bullet-item";
      li.innerHTML = `
        <span class="bullet-icon">✦</span>
        <span>${bullet}</span>
      `;
      this.slideBullets.appendChild(li);
    });

    // Highlight Box
    if (slide.highlightBox) {
      this.slideHighlight.style.display = "block";
      this.slideHighlight.innerHTML = `
        <div class="slide-highlight-title">${slide.highlightBox.title}</div>
        <div class="slide-highlight-text">${slide.highlightBox.text}</div>
      `;
    } else {
      this.slideHighlight.style.display = "none";
    }

    // Indicator & Progress Bar
    this.slideIndicator.textContent = `Slide ${index + 1} of ${this.slides.length}`;
    const progressPercent = ((index + 1) / this.slides.length) * 100;
    this.progressBar.style.width = `${progressPercent}%`;

    // Speaker notes
    if (this.notesText) {
      this.notesText.textContent = slide.speakerNotes || "No speaker notes for this slide.";
    }

    // Refresh icons if needed
    if (window.lucide) window.lucide.createIcons();
  }

  nextSlide() {
    if (this.isEmbedMode) return;
    if (this.currentIndex < this.slides.length - 1) {
      this.renderSlide(this.currentIndex + 1);
    }
  }

  prevSlide() {
    if (this.isEmbedMode) return;
    if (this.currentIndex > 0) {
      this.renderSlide(this.currentIndex - 1);
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (this.deckContainer.requestFullscreen) {
        this.deckContainer.requestFullscreen().catch(err => {
          console.warn("Fullscreen request failed:", err);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  toggleNotes() {
    if (!this.notesDrawer) return;
    this.notesDrawer.classList.toggle("open");
  }

  setEmbedMode(enabled) {
    this.isEmbedMode = enabled;
    if (enabled && this.embedUrl) {
      this.embedWrapper.classList.add("active");
      this.embedIframe.src = this.embedUrl;
      this.slideContent.style.display = "none";
      this.slideIndicator.textContent = "Embedded Presentation";
    } else {
      this.embedWrapper.classList.remove("active");
      this.embedIframe.src = "";
      this.slideContent.style.display = "block";
      this.renderSlide(this.currentIndex);
    }
  }

  openModal() {
    if (this.customModal) {
      this.customModal.classList.add("open");
      if (this.isEmbedMode && this.radioEmbed) {
        this.radioEmbed.checked = true;
      } else if (this.radioBuiltIn) {
        this.radioBuiltIn.checked = true;
      }
    }
  }

  closeModal() {
    if (this.customModal) {
      this.customModal.classList.remove("open");
    }
  }

  saveCustomSettings() {
    const isEmbed = this.radioEmbed?.checked;
    const url = this.inputEmbedUrl?.value.trim() || "";

    if (isEmbed && url) {
      this.embedUrl = url;
      localStorage.setItem("bio_deck_embed_url", url);
      localStorage.setItem("bio_deck_mode", "embed");
      this.setEmbedMode(true);
    } else {
      localStorage.setItem("bio_deck_mode", "builtin");
      this.setEmbedMode(false);
    }

    this.closeModal();
  }
}

// --- FILE: js\webcam-dvs.js ---
// Live Webcam Neuromorphic Dynamic Vision Sensor (DVS) Simulator
// Models per-pixel logarithmic intensity changes and emits ON (+1) and OFF (-1) events in real-time.

class WebcamDVSSimulator {
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

// --- FILE: js\event-camera-sim.js ---
// Synthetic Biological & High-Speed Motion Simulator
// Demonstrates side-by-side: Conventional 30 FPS Frame Camera (blur) vs Event-Based DVS Camera (zero blur, edge spikes)

class EventCameraSim {
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

// --- FILE: js\spacetime-viz.js ---
// 3D Space-Time (x, y, t) Event Cloud Visualizer
// Uses Three.js to render asynchronous event points in a 3D spatiotemporal volume.

class SpaceTimeVisualizer {
  constructor() {
    this.container = document.getElementById("spacetime-3d-container");
    this.width = this.container?.clientWidth || 700;
    this.height = 420;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.pointCloud = null;
    this.pointsGeometry = null;

    this.maxPoints = 4000;
    this.positions = new Float32Array(this.maxPoints * 3);
    this.colors = new Float32Array(this.maxPoints * 3);
    this.pointIndex = 0;

    // Simulation parameters
    this.simTime = 0;
    this.isRotating = true;
    this.trajectoryType = "helix"; // "helix", "circle", "random_walk"

    // Mouse drag interaction
    this.isDragging = false;
    this.prevMousePos = { x: 0, y: 0 };
    this.rotation = { x: 0.35, y: -0.6 };

    // UI
    this.trajectorySelect = document.getElementById("select-3d-trajectory");
    this.btnToggleRotate = document.getElementById("btn-toggle-3d-rotate");
    this.btnClearPoints = document.getElementById("btn-clear-3d-points");

    this.init();
  }

  init() {
    if (!this.container || typeof THREE === "undefined") {
      console.warn("Three.js or container not available for 3D visualizer");
      return;
    }

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x05070c);

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 180);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Bounding Space-Time Box Wireframe
    const boxGeometry = new THREE.BoxGeometry(80, 80, 140);
    const boxEdges = new THREE.EdgesGeometry(boxGeometry);
    const boxLine = new THREE.LineSegments(
      boxEdges,
      new THREE.LineBasicMaterial({ color: 0x1e293b, transparent: true, opacity: 0.6 })
    );
    this.scene.add(boxLine);

    // Axis Helper & Labels
    const gridHelper = new THREE.GridHelper(80, 8, 0x00e5ff, 0x1e293b);
    gridHelper.position.z = -70;
    gridHelper.rotation.x = Math.PI / 2;
    this.scene.add(gridHelper);

    // Point Cloud for Events
    this.pointsGeometry = new THREE.BufferGeometry();
    this.pointsGeometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.pointsGeometry.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));

    // Custom circular points shader or size material
    const pointsMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });

    this.pointCloud = new THREE.Points(this.pointsGeometry, pointsMaterial);
    this.scene.add(this.pointCloud);

    // Seed initial event points
    this.generateInitialEvents();

    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    this.trajectorySelect?.addEventListener("change", (e) => {
      this.trajectoryType = e.target.value;
      this.generateInitialEvents();
    });

    this.btnToggleRotate?.addEventListener("click", () => {
      this.isRotating = !this.isRotating;
      this.btnToggleRotate.textContent = this.isRotating ? "Pause Auto-Rotation" : "Resume Auto-Rotation";
    });

    this.btnClearPoints?.addEventListener("click", () => {
      this.generateInitialEvents();
    });

    // Mouse drag controls
    this.container.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.prevMousePos.x;
      const deltaY = e.clientY - this.prevMousePos.y;
      this.rotation.y += deltaX * 0.008;
      this.rotation.x += deltaY * 0.008;
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    // Responsive resize
    window.addEventListener("resize", () => {
      if (!this.container || !this.renderer || !this.camera) return;
      this.width = this.container.clientWidth;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    });
  }

  generateInitialEvents() {
    this.positions.fill(0);
    this.colors.fill(0);
    this.pointIndex = 0;

    // Simulate 1200 events forming continuous space-time manifolds
    for (let t = -70; t < 70; t += 0.15) {
      this.emitEventAtTime(t);
    }
    this.pointsGeometry.attributes.position.needsUpdate = true;
    this.pointsGeometry.attributes.color.needsUpdate = true;
  }

  emitEventAtTime(zTime) {
    if (this.pointIndex >= this.maxPoints) {
      this.pointIndex = 0;
    }

    const idx = this.pointIndex * 3;
    let x = 0, y = 0;
    let polarity = 1;

    if (this.trajectoryType === "helix") {
      // High-speed rotating object (e.g. bio-flagellum or rotating dot) -> forms double helix
      const angle = zTime * 0.12;
      const radius = 24;
      x = Math.cos(angle) * radius;
      y = Math.sin(angle) * radius;
      polarity = Math.sin(angle) > 0 ? 1 : -1;
    } else if (this.trajectoryType === "circle") {
      // Pulsing cellular contraction
      const radius = 20 + Math.sin(zTime * 0.1) * 8;
      const angle = zTime * 0.08;
      x = Math.cos(angle) * radius;
      y = Math.sin(angle) * radius;
      polarity = (Math.floor(zTime) % 2 === 0) ? 1 : -1;
    } else {
      // Random biological movement
      x = Math.sin(zTime * 0.05) * 25 + Math.cos(zTime * 0.15) * 8;
      y = Math.cos(zTime * 0.07) * 25 + Math.sin(zTime * 0.12) * 8;
      polarity = Math.cos(zTime * 0.2) > 0 ? 1 : -1;
    }

    // Add slight spatial jitter for realistic sensor noise
    this.positions[idx] = x + (Math.random() - 0.5) * 1.5;
    this.positions[idx + 1] = y + (Math.random() - 0.5) * 1.5;
    this.positions[idx + 2] = zTime;

    // Polarity colors:
    // ON (+1): Neon Cyan/Green (0, 1.0, 0.6)
    // OFF (-1): Neon Crimson (1.0, 0.15, 0.35)
    if (polarity === 1) {
      this.colors[idx] = 0.0;
      this.colors[idx + 1] = 0.95;
      this.colors[idx + 2] = 0.65;
    } else {
      this.colors[idx] = 1.0;
      this.colors[idx + 1] = 0.2;
      this.colors[idx + 2] = 0.45;
    }

    this.pointIndex++;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.isRotating && !this.isDragging) {
      this.rotation.y += 0.005;
    }

    // Update scene rotation based on user interaction
    if (this.scene) {
      this.scene.rotation.x = this.rotation.x;
      this.scene.rotation.y = this.rotation.y;
    }

    // Continuously add newly streaming event points and scroll time
    this.simTime += 0.3;
    const currentZ = ((this.simTime * 2) % 140) - 70;
    this.emitEventAtTime(currentZ);

    if (this.pointsGeometry) {
      this.pointsGeometry.attributes.position.needsUpdate = true;
      this.pointsGeometry.attributes.color.needsUpdate = true;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

// --- FILE: js\app.jfunction startApp() {
  // 1. Initialize Presentation Deck
  const deck = new PresentationDeck();

  // 2. Initialize Simulators
  const webcamSim = new WebcamDVSSimulator();
  const syntheticSim = new EventCameraSim();
  let spaceTimeViz = null;
  const bioRetina = new BioRetinaExplorer();

  // 3. Tab Switching for Working Models
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-content-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;

      // Update button active state
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update panel visibility
      tabPanels.forEach((panel) => {
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });

      // Lazy-init 3D space-time when its tab is first viewed (ensures canvas dimensions are accurate)
      if (targetTab === "spacetime" && !spaceTimeViz) {
        setTimeout(() => {
          spaceTimeViz = new SpaceTimeVisualizer();
        }, 50);
      }
    });
  });

  // Render Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  console.log("Bio-Inspired Event-Based Camera Suite successfully initialized.");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}
})();
