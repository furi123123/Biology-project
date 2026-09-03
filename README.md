# Bio-Inspired Event-Based Camera (Neuromorphic Silicon Retina)

An interactive web application and presentation suite demonstrating **Event-Based Cameras (Dynamic Vision Sensors - DVS)** inspired by vertebrate retinal neurobiology.

Designed for instant deployment onto **Vercel** with zero build configuration.

---

## 🌟 Key Features

### 1. Presentation Deck Player (Hero Section)
- **True Full-Screen Delivery**: Press `F` or click the **Fullscreen** button to expand into a slide show presentation.
- **Natural Presentation Controls**:
  - **Next Slide**: Right Arrow (`→`), `Spacebar`, or `PageDown`.
  - **Previous Slide**: Left Arrow (`←`) or `PageUp`.
  - **Speaker Notes**: Press `N` to toggle presenter notes.
  - **Slide Counter & Progress Bar**: Real-time slide tracking.
- **Scientifically Curated Slides**: 8 detailed slides covering:
  - Vertebrate retinal architecture (Photoreceptors, Horizontal, Bipolar, Amacrine, Ganglion cells).
  - Limitations of conventional CMOS cameras (motion blur, latency, redundant data).
  - The neuromorphic pixel circuit (logarithmic photodiode, capacitive amplifier, dual comparators).
  - Address-Event Representation (AER) protocol.
  - Quantitative benchmark metrics (>120 dB dynamic range, <1 μs latency, milliwatt power).
  - Biomedical applications (retinal bionic prosthetics, micro-organism tracking, surgical robotics).
- **Slide Customizer & Embed Slot**:
  - Want to use your own slides? Click **"Slide Settings / Embed"** to paste a link from **Google Slides**, **Microsoft PowerPoint Online**, **Canva**, or a **PDF**.

---

### 2. Interactive Working Model Suite (Below Slides)

- **Live Webcam DVS Simulator**:
  - Accesses your live webcam feed and computes per-pixel temporal contrast:
    $$\Delta L(x, y, t) = \ln(I(x, y, t)) - \ln(I(x, y, t - \Delta t))$$
  - Emits real-time **ON events** ($+1$, neon cyan/green for brightening) and **OFF events** ($-1$, neon crimson for dimming).
  - Sliders for contrast threshold $\theta$, persistence decay $\tau$, and live **Events/sec** and bandwidth meters.
- **Synthetic Biological Motion (Dual View)**:
  - Side-by-side comparison between a conventional **30 FPS CMOS Camera** (with exposure smear and motion blur) and an **Event-Based DVS Camera** (sharp asynchronous event edges, zero blur).
  - Presets:
    1. *Swimming Micro-Organisms (Ciliates)*: Fast flagellar motion tracking.
    2. *High-Speed Optical Chopper*: 1500 RPM rotating radial pattern demonstrating high-speed capture.
    3. *Biological Saccadic Eye Tremor*: Simulating how biological eyes micro-tremor to prevent retinal image fading.
- **3D Space-Time $(x, y, t)$ Event Cloud**:
  - Three.js 3D interactive volume plotting events across space and time.
  - Visualizes continuous space-time manifolds (rotating helices, cellular pulses, Brownian motion) with interactive rotation and zoom.
- **Biological Retina vs Silicon Architecture Explorer**:
  - Interactive 1-to-1 mapping linking biological cells to their electronic CMOS counterparts.
  - Quantitative performance matrix comparing human eyes, CMOS cameras, and DVS sensors.

---

## 🚀 How to Deploy to Vercel

This repository is pre-configured with `vercel.json` for instant static hosting:

### Option A: Deploy via GitHub (Recommended)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Bio Event-Based Camera project"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Leave all build settings as default (Framework Preset: **Other**) and click **Deploy**.
5. Your project will be live on `https://<your-project>.vercel.app` in seconds!

### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 💻 Running Locally

You can open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari):

- Simply double-click `index.html`, OR
- Use any local static server:
  ```bash
  # Python 3
  python -m http.server 8000
  ```
  or
  ```bash
  # Node.js
  npx serve .
  ```
  Then open `http://localhost:8000` in your browser.

---

## 📁 Project Structure

```
event-camera-bio/
├── index.html                  # Main application & UI shell
├── vercel.json                 # Vercel static deployment config
├── package.json                # Project metadata
├── README.md                   # Documentation & deployment guide
├── css/
│   └── styles.css              # Cyber-neuromorphic styling & fullscreen layout
└── js/
    ├── app.js                  # Main orchestrator
    ├── slides-data.js          # Built-in presentation slides content
    ├── presentation.js         # Fullscreen presentation engine
    ├── webcam-dvs.js           # Live webcam neuromorphic event stream generator
    ├── event-camera-sim.js     # Synthetic bio-motion simulation (CMOS vs DVS)
    ├── spacetime-viz.js        # 3D Space-Time (x,y,t) event cloud (Three.js)
    └── bio-retina-circuit.js   # Retina vs Silicon circuit comparative explorer
```

---

## 🔬 Scientific References

1. **Mahowald, M. & Mead, C.** (1991). *The Silicon Retina*. Scientific American, 264(5), 76–82.
2. **Lichtsteiner, P., Posch, C., & Delbruck, T.** (2008). *A 128×128 120dB 15μs Latency Asynchronous Temporal Contrast Vision Sensor*. IEEE Journal of Solid-State Circuits, 43(2), 566–576.
3. **Gallego, G., et al.** (2022). *Event-Based Vision: A Survey*. IEEE Transactions on Pattern Analysis and Machine Intelligence, 44(1), 154–180.
