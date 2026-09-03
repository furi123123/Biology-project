// Bio-Inspired Event-Based Camera Presentation Data
// Comprehensive slide content with biological, neuromorphic, and circuit details.
// Editable in-browser or via this configuration file.

export const initialSlides = [
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
