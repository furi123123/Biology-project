// Interactive Biological Retina vs Neuromorphic Silicon Circuit Explorer
// Highlights 1-to-1 functional equivalence between retinal neurobiology and DVS hardware

export const retinaBioPairs = [
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

export class BioRetinaExplorer {
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
