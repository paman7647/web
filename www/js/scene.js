(function() {
  'use strict';

  // --- Configuration & Constants ---
  const COLORS = {
    earth: '#B85C38',
    canopy: '#2D5F3E',
    gold: '#C9993A',
    indigo: '#1E2A4A',
    stone: '#8A8278',
    cream: '#F5F0E8',
    paper: '#FAFAF5',
    border: '#D8D0C4'
  };

  const COUNTRIES = [
    { name: 'Malawi', lat: -13.25, lon: 34.3, color: COLORS.gold },
    { name: 'Zambia', lat: -13.13, lon: 27.85, color: COLORS.canopy },
    { name: 'Zimbabwe', lat: -19.02, lon: 29.15, color: COLORS.earth },
    { name: 'South Africa', lat: -30.56, lon: 25.1, color: COLORS.indigo }
  ];

  const PARTICLE_COUNTS = {
    high: 1200,
    medium: 600,
    low: 200,
    off: 0
  };

  // --- State Variables ---
  let tier = 'medium';
  let container = null;
  let renderer = null;
  let scene = null;
  let camera = null;
  let animationFrameId = null;
  let isPaused = false;
  let currentProgress = 0;

  // Scene Objects
  let globe = null;
  let countryNodes = null;
  let connections = null;
  let particles = null;
  
  // Interaction
  let mouse = { x: 0, y: 0 };
  let targetMouse = { x: 0, y: 0 };
  
  // Materials that need to be disposed
  const materialsToDispose = [];
  const geometriesToDispose = [];

  // --- Utility Functions ---
  
  function checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  function detectTier() {
    if (!checkWebGL() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'off';
    }
    const width = window.innerWidth;
    if (width <= 480) {
      return 'off'; // Mobile fallback
    }
    if (width <= 768) {
      return 'low'; // Tablet fallback
    }
    if (width <= 1280) {
      return 'medium'; // Normal laptop
    }
    return 'high'; // High-end desktop
  }

  function trackResource(resource) {
    if (!resource) return;
    if (resource.isGeometry) geometriesToDispose.push(resource);
    if (resource.isMaterial) materialsToDispose.push(resource);
  }

  function latLonToVector3(lat, lon, radius) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lon + 180) * (Math.PI / 180);

    var x = -(radius * Math.sin(phi) * Math.cos(theta));
    var z = (radius * Math.sin(phi) * Math.sin(theta));
    var y = (radius * Math.cos(phi));

    return new THREE.Vector3(x, y, z);
  }

  function init(containerId) {
    container = document.getElementById(containerId);
    if (!container) {
      console.warn('MLScene: Container not found');
      return;
    }

    tier = detectTier();
    if (tier === 'off') {
      console.log('MLScene: WebGL disabled or reduced motion preferred. Using fallback.');
      const fallback = container.querySelector('.globe-fallback');
      if (fallback) fallback.style.display = 'flex';
      return;
    }
    
    const fallback = container.querySelector('.globe-fallback');
    if (fallback) fallback.style.display = 'none';

    if (!window.THREE) {
      console.error('MLScene: THREE.js not found on window. Ensure it is loaded before initializing.');
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // 1. Scene Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(new THREE.Color(COLORS.cream), 0.04);

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 100);
    // Position camera to look at Africa
    camera.position.set(0, 0, 18);
    camera.lookAt(0, 0, 0);

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({
      antialias: tier === 'high',
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'mediump'
    });
    
    const pixelRatio = Math.min(window.devicePixelRatio, tier === 'high' ? 2 : 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color(COLORS.cream), 0);
    container.appendChild(renderer.domElement);

    // 4. Create Geometry
    createGlobe();
    createCountries();
    createConnections();
    createParticles();
    
    // Rotate scene slightly so Africa faces front properly
    scene.rotation.y = Math.PI;

    // 5. Events
    window.addEventListener('resize', onWindowResizeDebounced, false);
    document.addEventListener('mousemove', onMouseMove, false);

    // 6. Start Loop & Viewport Observer
    isPaused = false;
    animate();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resume();
        } else {
          pause();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(container);
    
    container.dataset.hasObserver = "true";
  }

  function createGlobe() {
    const geometry = new THREE.IcosahedronGeometry(5, tier === 'high' ? 6 : tier === 'medium' ? 4 : 2);
    const material = new THREE.MeshBasicMaterial({
      color: COLORS.border,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    
    trackResource(geometry);
    trackResource(material);

    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
  }

  function createCountries() {
    countryNodes = new THREE.Group();
    
    const nodeGeom = new THREE.SphereGeometry(0.12, 16, 16);
    trackResource(nodeGeom);

    COUNTRIES.forEach(country => {
      const pos = latLonToVector3(country.lat, country.lon, 5);
      const material = new THREE.MeshBasicMaterial({
        color: country.color
      });
      trackResource(material);

      const mesh = new THREE.Mesh(nodeGeom, material);
      mesh.position.copy(pos);
      mesh.userData = { originalPosition: pos.clone() };
      countryNodes.add(mesh);
    });

    scene.add(countryNodes);
  }

  function createConnections() {
    connections = new THREE.Group();
    const material = new THREE.LineBasicMaterial({
      color: COLORS.indigo,
      transparent: true,
      opacity: 0.0
    });
    trackResource(material);

    // Create lines connecting adjacent nodes
    for (let i = 0; i < COUNTRIES.length; i++) {
      for (let j = i + 1; j < COUNTRIES.length; j++) {
        const p1 = latLonToVector3(COUNTRIES[i].lat, COUNTRIES[i].lon, 5);
        const p2 = latLonToVector3(COUNTRIES[j].lat, COUNTRIES[j].lon, 5);
        
        // Create an arc (Bezier curve)
        const midPoint = p1.clone().lerp(p2, 0.5);
        const distance = p1.distanceTo(p2);
        midPoint.normalize().multiplyScalar(5 + distance * 0.2); // Push out

        const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
        const points = curve.getPoints(20);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        trackResource(geometry);

        const line = new THREE.Line(geometry, material);
        line.userData = { length: points.length, originalOpacity: 0.3 };
        connections.add(line);
      }
    }
    scene.add(connections);
  }

  function createParticles() {
    const count = PARTICLE_COUNTS[tier];
    if (count === 0) return;

    const geometry = new THREE.PlaneGeometry(0.08, 0.08);
    const material = new THREE.MeshBasicMaterial({
      color: COLORS.gold,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    
    trackResource(geometry);
    trackResource(material);

    particles = new THREE.InstancedMesh(geometry, material, count);
    
    const dummy = new THREE.Object3D();
    const origin = new THREE.Vector3(0,0,0);
    
    for (let i = 0; i < count; i++) {
      // Random position around globe
      const radius = 5.2 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      dummy.position.set(x, y, z);
      dummy.lookAt(origin); // Look at center
      
      // Random rotation offset
      dummy.rotation.z = Math.random() * Math.PI;
      
      // Random scale
      const scale = Math.random() * 0.5 + 0.5;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      particles.setMatrixAt(i, dummy.matrix);
    }
    
    scene.add(particles);
  }

  // --- Animation & Interaction ---

  let resizeTimeout;
  function onWindowResizeDebounced() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(onWindowResize, 150);
  }

  function onWindowResize() {
    if (!camera || !renderer || !container) return;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function onMouseMove(event) {
    if (isPaused) return;
    targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function updateTransformations(progress) {
    currentProgress = progress;
    
    // Stage 1 (0-0.2): Fragmented points, sparse
    // Stage 2 (0.2-0.4): Connections form between points
    // Stage 3 (0.4-0.6): Groups emerge, particles cluster
    // Stage 4 (0.6-0.8): Flow lines animate (capital moving)
    // Stage 5 (0.8-1.0): Full network visible, settled

    if (!scene) return;

    // Handle connections opacity
    connections.children.forEach(line => {
      let opacity = 0;
      if (progress > 0.2) {
        const localProgress = Math.min(1, (progress - 0.2) / 0.2);
        opacity = localProgress * line.userData.originalOpacity;
      }
      line.material.opacity = opacity;
    });

    // Handle globe wireframe opacity
    if (globe) {
      const globeOpacity = 0.05 + (progress * 0.15);
      globe.material.opacity = globeOpacity;
    }
    
    // Node scale based on progress
    if (countryNodes) {
      const scale = 0.5 + Math.min(1, progress * 2) * 0.5;
      countryNodes.scale.set(scale, scale, scale);
    }
  }

  function animate() {
    if (isPaused) return;
    animationFrameId = requestAnimationFrame(animate);

    // Smooth cursor parallax
    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    // Apply parallax
    camera.position.x = mouse.x * 1.5;
    camera.position.y = mouse.y * 1.5;
    camera.lookAt(0, 0, 0);

    // Ambient rotation
    if (scene) {
      scene.rotation.y -= 0.0005; // Slow rotation
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  // --- Public API ---
  
  function setProgress(progress) {
    // Clamp between 0 and 1
    const p = Math.max(0, Math.min(1, progress));
    if (tier !== 'off') {
      updateTransformations(p);
    }
  }

  function pause() {
    isPaused = true;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function resume() {
    if (isPaused) {
      isPaused = false;
      animate();
    }
  }

  function dispose() {
    pause();
    
    window.removeEventListener('resize', onWindowResizeDebounced);
    document.removeEventListener('mousemove', onMouseMove);

    if (scene) {
      scene.clear();
    }

    geometriesToDispose.forEach(geom => geom.dispose());
    materialsToDispose.forEach(mat => mat.dispose());
    
    geometriesToDispose.length = 0;
    materialsToDispose.length = 0;

    if (renderer) {
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    }
    
    renderer = null;
    scene = null;
    camera = null;
    container = null;
    globe = null;
    countryNodes = null;
    connections = null;
    particles = null;
  }

  function isSupported() {
    return checkWebGL() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Export to window
  window.MLScene = {
    init,
    setProgress,
    pause,
    resume,
    dispose,
    isSupported
  };

})();
