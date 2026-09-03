// Main Application Orchestrator
import { PresentationDeck } from "./presentation.js";
import { WebcamDVSSimulator } from "./webcam-dvs.js";
import { EventCameraSim } from "./event-camera-sim.js";
import { SpaceTimeVisualizer } from "./spacetime-viz.js";
import { BioRetinaExplorer } from "./bio-retina-circuit.js";

document.addEventListener("DOMContentLoaded", () => {
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
});
