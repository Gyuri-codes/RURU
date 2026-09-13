import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  reducedMotion: boolean;
  onChapterChange?: (chapterIndex: number) => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  scrollProgress,
  reducedMotion,
  onChapterChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetScrollRef = useRef<number>(scrollProgress);
  const onChapterChangeRef = useRef(onChapterChange);
  const reducedMotionRef = useRef(reducedMotion);

  // Keep refs updated without re-triggering the 3D scene creation
  useEffect(() => {
    targetScrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    onChapterChangeRef.current = onChapterChange;
  }, [onChapterChange]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let fallbackCanvas: HTMLCanvasElement | null = null;
    let fallbackCtx: CanvasRenderingContext2D | null = null;
    let isWebGlActive = false;

    let scrollVal = targetScrollRef.current;
    let currentChapter = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // -------------------------------------------------------------
    // HIGH-PERFORMANCE THREE.JS WEBGL RENDERER
    // -------------------------------------------------------------
    const tryInitThreeJS = (): boolean => {
      try {
        const probeCanvas = document.createElement('canvas');
        const probeGl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!probeGl) return false;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x05070a);
        scene.fog = new THREE.FogExp2(0x070b12, 0.022);

        const camera = new THREE.PerspectiveCamera(
          52,
          container.clientWidth / container.clientHeight,
          0.1,
          500
        );

        renderer = new THREE.WebGLRenderer({
          antialias: false, // Turn off heavy MSAA for dramatic 60fps frame rate boost
          powerPreference: 'high-performance',
          alpha: false,
          depth: true,
          stencil: false,
          failIfMajorPerformanceCaveat: false
        });

        // Cap pixel ratio to 1.25 for crisp clarity without Retina lag
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;

        renderer.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          console.warn('WebGL context lost - switching to graceful fallback');
          isWebGlActive = false;
        }, false);

        container.appendChild(renderer.domElement);

        // LIGHTING: Kept to strictly 3 key lights for silky smooth 60fps
        const ambientLight = new THREE.AmbientLight(0x182436, 1.0);
        scene.add(ambientLight);

        const moonDirLight = new THREE.DirectionalLight(0x8faecc, 1.3);
        moonDirLight.position.set(-30, 45, -60);
        scene.add(moonDirLight);

        // 1 mobile warm lantern point light that follows the camera path
        const heroLanternLight = new THREE.PointLight(0xff9933, 2.5, 22, 1.8);
        heroLanternLight.position.set(0, 3, 10);
        scene.add(heroLanternLight);

        // Vermilion Moon
        const moonGroup = new THREE.Group();
        moonGroup.position.set(22, 38, -160);
        const moonGeo = new THREE.SphereGeometry(22, 16, 16);
        const moonMat = new THREE.MeshBasicMaterial({ color: 0xd94426 });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonGroup.add(moonMesh);

        const haloGeo = new THREE.RingGeometry(22.5, 36, 24);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0xc83d21,
          transparent: true,
          opacity: 0.35,
          side: THREE.DoubleSide
        });
        const haloMesh = new THREE.Mesh(haloGeo, haloMat);
        haloMesh.lookAt(0, 38, 0);
        moonGroup.add(haloMesh);
        scene.add(moonGroup);

        // Mountain Ridges
        const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x080d16, roughness: 0.95 });
        for (let r = 0; r < 4; r++) {
          const ridgeGeo = new THREE.ConeGeometry(70 + r * 20, 42 + r * 12, 5, 1);
          const ridgeMesh = new THREE.Mesh(ridgeGeo, ridgeMat);
          ridgeMesh.position.set(-60 + r * 45, 10 + r * 4, -130 - r * 30);
          ridgeMesh.rotation.y = r * 1.3;
          scene.add(ridgeMesh);
        }

        // Ground Terrain
        const groundMat = new THREE.MeshStandardMaterial({ color: 0x090e14, roughness: 0.9 });
        const groundGeo = new THREE.PlaneGeometry(150, 240, 8, 12);
        const groundMesh = new THREE.Mesh(groundGeo, groundMat);
        groundMesh.rotation.x = -Math.PI / 2;
        groundMesh.position.set(0, -0.6, -70);
        scene.add(groundMesh);

        // Shared materials (Instanced/reused)
        const stoneStepMat = new THREE.MeshStandardMaterial({ color: 0x1a212b, roughness: 0.85 });
        const woodDarkMat = new THREE.MeshStandardMaterial({ color: 0x140e0b, roughness: 0.75 });
        const vermilionMat = new THREE.MeshStandardMaterial({ color: 0xa92f1b, roughness: 0.5 });
        const shojiPaperMat = new THREE.MeshBasicMaterial({ color: 0xffb74d });
        const stoneLanternMat = new THREE.MeshStandardMaterial({ color: 0x1e2733, roughness: 0.9 });
        const pineBarkMat = new THREE.MeshStandardMaterial({ color: 0x120e0b, roughness: 0.9 });
        const pineNeedleMat = new THREE.MeshStandardMaterial({ color: 0x0c1e18, roughness: 0.85 });

        // Helper: Stone Lantern with emissive glowing firebox (0 dynamic light passes!)
        const createStoneLantern = (x: number, y: number, z: number) => {
          const g = new THREE.Group();
          g.position.set(x, y, z);
          const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.4, 6), stoneLanternMat);
          base.position.y = 0.2;
          g.add(base);
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 1.2, 6), stoneLanternMat);
          post.position.y = 1.0;
          g.add(post);
          const firebox = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.65), shojiPaperMat);
          firebox.position.y = 1.9;
          g.add(firebox);
          const roof = new THREE.Mesh(new THREE.ConeGeometry(1.0, 0.65, 6), stoneLanternMat);
          roof.position.y = 2.45;
          g.add(roof);
          scene.add(g);
          return g;
        };

        // Helper: Pine Tree
        const createPineTree = (x: number, y: number, z: number, scale = 1, rotY = 0) => {
          const tree = new THREE.Group();
          tree.position.set(x, y, z);
          tree.scale.set(scale, scale, scale);
          tree.rotation.y = rotY;
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 6.5, 5), pineBarkMat);
          trunk.position.y = 3.25;
          tree.add(trunk);
          [
            { y: 3.5, x: 1.2, z: 0.2, r: 1.7 },
            { y: 5.0, x: -1.0, z: 0.4, r: 1.9 },
            { y: 6.2, x: 0.5, z: -0.6, r: 1.8 }
          ].forEach((c) => {
            const cluster = new THREE.Mesh(new THREE.CylinderGeometry(c.r * 0.4, c.r, 0.55, 5), pineNeedleMat);
            cluster.position.set(c.x, c.y, c.z);
            tree.add(cluster);
          });
          scene.add(tree);
        };

        // Helper: Torii Gate
        const createToriiGate = (x: number, y: number, z: number, scale = 1) => {
          const torii = new THREE.Group();
          torii.position.set(x, y, z);
          torii.scale.set(scale, scale, scale);
          const pL = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.52, 9.2, 6), vermilionMat);
          pL.position.set(-4.2, 4.6, 0);
          torii.add(pL);
          const pR = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.52, 9.2, 6), vermilionMat);
          pR.position.set(4.2, 4.6, 0);
          torii.add(pR);
          const topBeam = new THREE.Mesh(new THREE.BoxGeometry(13.2, 0.65, 1.0), vermilionMat);
          topBeam.position.set(0, 9.6, 0);
          torii.add(topBeam);
          const lowerBeam = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.45, 0.65), vermilionMat);
          lowerBeam.position.set(0, 8.0, 0);
          torii.add(lowerBeam);
          scene.add(torii);
        };

        // Helper: Temple Hall
        const createTempleHall = (x: number, y: number, z: number) => {
          const temple = new THREE.Group();
          temple.position.set(x, y, z);
          const plinth = new THREE.Mesh(new THREE.BoxGeometry(24, 1.5, 18), stoneStepMat);
          plinth.position.y = 0.75;
          temple.add(plinth);
          const deck = new THREE.Mesh(new THREE.BoxGeometry(22, 0.3, 16), woodDarkMat);
          deck.position.y = 1.65;
          temple.add(deck);
          const shoji = new THREE.Mesh(new THREE.BoxGeometry(16, 5.0, 0.1), shojiPaperMat);
          shoji.position.set(0, 4.3, -4);
          temple.add(shoji);
          const roof = new THREE.Mesh(new THREE.ConeGeometry(16, 3.6, 4), woodDarkMat);
          roof.position.set(0, 9.2, 0);
          roof.rotation.y = Math.PI / 4;
          temple.add(roof);
          createStoneLantern(-6, 2.2, 7.8);
          createStoneLantern(6, 2.2, 7.8);
          scene.add(temple);
        };

        // Environment Layout
        for (let i = 0; i < 9; i++) {
          const zPos = 15 - i * 4;
          const step = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.25, 2.8), stoneStepMat);
          step.position.set(0, 0.1 + i * 0.18, zPos);
          scene.add(step);
          if (i % 2 === 0) {
            createStoneLantern(-3.6, 0.1 + i * 0.18, zPos);
            createStoneLantern(3.6, 0.1 + i * 0.18, zPos);
          }
        }

        createPineTree(-7.5, 0, 12, 1.1, 0.4);
        createPineTree(7.5, 0, 8, 1.2, -0.3);
        createPineTree(-8.2, 0.8, -4, 1.3, 0.8);
        createPineTree(8.0, 0.8, -8, 1.15, -0.6);

        // Ch 2: Torii
        createToriiGate(0, 1.6, -25, 1.25);
        createStoneLantern(-5.5, 1.6, -23);
        createStoneLantern(5.5, 1.6, -23);
        createPineTree(-11, 1.8, -26, 1.4, 1.1);
        createPineTree(11, 1.8, -28, 1.35, -1.2);

        // Ch 3: Garden
        const gravelPlinth = new THREE.Mesh(new THREE.BoxGeometry(16, 0.4, 18), stoneStepMat);
        gravelPlinth.position.set(0, 2.4, -54);
        scene.add(gravelPlinth);
        createStoneLantern(-6.5, 2.4, -48);
        createStoneLantern(6.5, 2.4, -48);
        createPineTree(7.5, 2.6, -56, 1.25, 2.4);

        // Ch 4: Sanctuary
        createTempleHall(0, 3.2, -92);

        // Ch 5: Overlook
        const overlookDeck = new THREE.Mesh(new THREE.BoxGeometry(22, 0.4, 24), woodDarkMat);
        overlookDeck.position.set(0, 4.8, -125);
        scene.add(overlookDeck);
        createStoneLantern(-7.5, 5.0, -135);
        createStoneLantern(7.5, 5.0, -135);

        // -------------------------------------------------------------
        // ZERO-OVERHEAD RAIN & LEAF SYSTEMS (NO CPU BUFFER RE-UPLOADS)
        // -------------------------------------------------------------
        const rainGroup = new THREE.Group();
        const rainCount = 450;
        const rainGeo = new THREE.BufferGeometry();
        const rainPositions = new Float32Array(rainCount * 3);
        for (let i = 0; i < rainCount; i++) {
          rainPositions[i * 3] = (Math.random() - 0.5) * 55;
          rainPositions[i * 3 + 1] = Math.random() * 45;
          rainPositions[i * 3 + 2] = -140 + Math.random() * 170;
        }
        rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
        const rainMat = new THREE.PointsMaterial({
          color: 0x8ea2bd,
          size: 0.16,
          transparent: true,
          opacity: 0.35
        });
        const rainPoints1 = new THREE.Points(rainGeo, rainMat);
        const rainPoints2 = new THREE.Points(rainGeo, rainMat);
        rainPoints2.position.y = 45;
        rainGroup.add(rainPoints1);
        rainGroup.add(rainPoints2);
        scene.add(rainGroup);

        // Leaves Group
        const leafGroup = new THREE.Group();
        const leafCount = 35;
        const leafGeo = new THREE.BufferGeometry();
        const leafPositions = new Float32Array(leafCount * 3);
        for (let i = 0; i < leafCount; i++) {
          leafPositions[i * 3] = (Math.random() - 0.5) * 40;
          leafPositions[i * 3 + 1] = 2 + Math.random() * 20;
          leafPositions[i * 3 + 2] = -130 + Math.random() * 150;
        }
        leafGeo.setAttribute('position', new THREE.BufferAttribute(leafPositions, 3));
        const leafMat = new THREE.PointsMaterial({
          color: 0xc84227,
          size: 0.55,
          transparent: true,
          opacity: 0.85
        });
        const leafPoints = new THREE.Points(leafGeo, leafMat);
        leafGroup.add(leafPoints);
        scene.add(leafGroup);

        // Spline Curves
        const cameraPathPoints = [
          new THREE.Vector3(0.0, 3.2, 22.0),
          new THREE.Vector3(0.4, 3.6, 6.0),
          new THREE.Vector3(-0.2, 4.2, -12.0),
          new THREE.Vector3(0.0, 5.0, -25.0),
          new THREE.Vector3(0.8, 5.4, -38.0),
          new THREE.Vector3(-1.8, 4.8, -52.0),
          new THREE.Vector3(0.2, 5.6, -66.0),
          new THREE.Vector3(0.0, 6.4, -80.0),
          new THREE.Vector3(0.0, 6.8, -95.0),
          new THREE.Vector3(1.2, 7.2, -112.0),
          new THREE.Vector3(0.0, 7.6, -128.0)
        ];
        const cameraCurve = new THREE.CatmullRomCurve3(cameraPathPoints);
        cameraCurve.curveType = 'catmullrom';
        cameraCurve.tension = 0.45;

        const lookAtPoints = [
          new THREE.Vector3(0.0, 3.5, 0.0),
          new THREE.Vector3(0.0, 4.2, -15.0),
          new THREE.Vector3(0.0, 5.2, -30.0),
          new THREE.Vector3(0.0, 5.5, -45.0),
          new THREE.Vector3(-2.0, 4.6, -55.0),
          new THREE.Vector3(0.0, 5.8, -75.0),
          new THREE.Vector3(0.0, 6.6, -95.0),
          new THREE.Vector3(0.0, 7.0, -115.0),
          new THREE.Vector3(0.0, 7.5, -135.0),
          new THREE.Vector3(10.0, 18.0, -160.0),
          new THREE.Vector3(15.0, 24.0, -160.0)
        ];
        const lookAtCurve = new THREE.CatmullRomCurve3(lookAtPoints);
        lookAtCurve.curveType = 'catmullrom';
        lookAtCurve.tension = 0.45;

        // Render Loop
        const clock = new THREE.Clock();
        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);

          // Skip rendering when tab is hidden
          if (document.hidden) return;

          const elapsedTime = clock.getElapsedTime();

          const isReduced = reducedMotionRef.current;
          const easeFactor = isReduced ? 0.08 : 0.06;
          scrollVal += (targetScrollRef.current - scrollVal) * easeFactor;
          const progress = Math.max(0, Math.min(1, scrollVal));

          const chapterIdx = Math.min(4, Math.floor(progress * 5));
          if (chapterIdx !== currentChapter) {
            currentChapter = chapterIdx;
            onChapterChangeRef.current?.(chapterIdx);
          }

          const camPos = cameraCurve.getPointAt(progress);
          const lookTarget = lookAtCurve.getPointAt(progress);

          if (!isReduced) {
            const swayX = Math.sin(elapsedTime * 0.4) * 0.07 + mouseX * 0.3;
            const swayY = Math.cos(elapsedTime * 0.5) * 0.05 + mouseY * 0.2;
            camera.position.set(camPos.x + swayX, camPos.y + swayY, camPos.z);
          } else {
            camera.position.copy(camPos);
          }
          camera.lookAt(lookTarget);

          // Update hero light location along the active journey path with organic flicker
          heroLanternLight.position.set(camPos.x * 0.5, camPos.y + 1.2, camPos.z - 4);
          heroLanternLight.intensity = 2.2 + Math.sin(elapsedTime * 3.5) * 0.25;

          // Rain animation via group translation (0 CPU buffer writes!)
          rainGroup.position.y -= 0.4;
          if (rainGroup.position.y < -45) {
            rainGroup.position.y = 0;
          }

          // Leaf animation via group transform
          leafGroup.position.y -= 0.03;
          leafGroup.position.x = Math.sin(elapsedTime * 0.4) * 1.5;
          leafGroup.rotation.y = elapsedTime * 0.05;
          if (leafGroup.position.y < -20) {
            leafGroup.position.y = 10;
          }

          renderer!.render(scene, camera);
        };

        animate();

        const handleResize = () => {
          if (!container || !renderer) return;
          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        return true;
      } catch (err) {
        console.warn('Three.js WebGL initialization failed or unsupported:', err);
        return false;
      }
    };

    // -------------------------------------------------------------
    // PROCEDURAL 2D CANVAS FALLBACK (LIGHTWEIGHT & ROCK-SOLID 60FPS)
    // -------------------------------------------------------------
    const init2DFallback = () => {
      fallbackCanvas = document.createElement('canvas');
      fallbackCanvas.className = 'w-full h-full block';
      fallbackCanvas.width = container.clientWidth;
      fallbackCanvas.height = container.clientHeight;
      container.appendChild(fallbackCanvas);

      fallbackCtx = fallbackCanvas.getContext('2d');
      if (!fallbackCtx) return;

      const rainDropCount = 100;
      const drops = Array.from({ length: rainDropCount }, () => ({
        x: Math.random() * fallbackCanvas!.width,
        y: Math.random() * fallbackCanvas!.height,
        len: Math.random() * 16 + 8,
        speed: Math.random() * 6 + 5
      }));

      const render2D = () => {
        if (!fallbackCtx || !fallbackCanvas || document.hidden) {
          animationFrameId = requestAnimationFrame(render2D);
          return;
        }
        animationFrameId = requestAnimationFrame(render2D);

        const w = fallbackCanvas.width;
        const h = fallbackCanvas.height;

        scrollVal += (targetScrollRef.current - scrollVal) * 0.06;
        const progress = Math.max(0, Math.min(1, scrollVal));

        const chapterIdx = Math.min(4, Math.floor(progress * 5));
        if (chapterIdx !== currentChapter) {
          currentChapter = chapterIdx;
          onChapterChangeRef.current?.(chapterIdx);
        }

        // Night Sky Gradient
        fallbackCtx.fillStyle = '#05070a';
        fallbackCtx.fillRect(0, 0, w, h);

        // Vermilion Moon with Parallax
        const moonX = w * 0.75 - mouseX * 15;
        const moonY = h * 0.28 + progress * 50;
        const moonRadius = Math.min(w, h) * 0.11;

        // Moon Glow
        const moonGlow = fallbackCtx.createRadialGradient(moonX, moonY, moonRadius * 0.6, moonX, moonY, moonRadius * 1.8);
        moonGlow.addColorStop(0, 'rgba(217, 68, 38, 0.4)');
        moonGlow.addColorStop(1, 'rgba(217, 68, 38, 0)');
        fallbackCtx.fillStyle = moonGlow;
        fallbackCtx.beginPath();
        fallbackCtx.arc(moonX, moonY, moonRadius * 1.8, 0, Math.PI * 2);
        fallbackCtx.fill();

        // Moon Body
        fallbackCtx.fillStyle = '#d94426';
        fallbackCtx.beginPath();
        fallbackCtx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        fallbackCtx.fill();

        // Distant Mountain Ridges
        fallbackCtx.fillStyle = '#070c14';
        fallbackCtx.beginPath();
        fallbackCtx.moveTo(0, h);
        for (let x = 0; x <= w; x += 50) {
          const y = h * 0.58 + Math.sin(x * 0.003 + 1) * 50 - progress * 40;
          fallbackCtx.lineTo(x, y);
        }
        fallbackCtx.lineTo(w, h);
        fallbackCtx.fill();

        // Torii silhouette
        fallbackCtx.fillStyle = '#030508';
        const toriiX = w * 0.5;
        const toriiY = h * 0.72 - progress * 70;
        fallbackCtx.fillRect(toriiX - 80, toriiY, 12, 160);
        fallbackCtx.fillRect(toriiX + 68, toriiY, 12, 160);
        fallbackCtx.fillStyle = '#a92f1b';
        fallbackCtx.fillRect(toriiX - 110, toriiY - 12, 220, 14);
        fallbackCtx.fillRect(toriiX - 95, toriiY + 16, 190, 8);

        // Rain
        fallbackCtx.strokeStyle = 'rgba(142, 162, 189, 0.22)';
        fallbackCtx.lineWidth = 1;
        fallbackCtx.beginPath();
        for (let i = 0; i < rainDropCount; i++) {
          const d = drops[i];
          fallbackCtx.moveTo(d.x, d.y);
          fallbackCtx.lineTo(d.x - 1, d.y + d.len);
          d.y += d.speed;
          if (d.y > h) {
            d.y = -10;
            d.x = Math.random() * w;
          }
        }
        fallbackCtx.stroke();
      };

      render2D();

      const handleFallbackResize = () => {
        if (!fallbackCanvas || !container) return;
        fallbackCanvas.width = container.clientWidth;
        fallbackCanvas.height = container.clientHeight;
      };
      window.addEventListener('resize', handleFallbackResize);
    };

    isWebGlActive = tryInitThreeJS();
    if (!isWebGlActive) {
      init2DFallback();
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);

      if (renderer) {
        try {
          renderer.forceContextLoss();
          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        } catch {
          // ignore
        }
      }

      if (fallbackCanvas && container.contains(fallbackCanvas)) {
        container.removeChild(fallbackCanvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="ruru-webgl-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
