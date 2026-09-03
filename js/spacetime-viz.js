// 3D Space-Time (x, y, t) Event Cloud Visualizer
// Uses Three.js to render asynchronous event points in a 3D spatiotemporal volume.

export class SpaceTimeVisualizer {
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
