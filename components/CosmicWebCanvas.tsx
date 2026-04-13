import React, { useEffect, useRef } from 'react';

interface Particle {
  // CMB State
  cmbX: number;
  cmbY: number;
  cmbColor: { r: number, g: number, b: number }; 
  
  // Galaxy State
  galaxyX: number;
  galaxyY: number;
  galaxyColor: { r: number, g: number, b: number };
  
  // Physics
  size: number;
  
  // Render
  x: number;
  y: number;
}

const CosmicWebCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // High particle count for detailed filaments
    const particleCount = 1500; 
    const cycleDuration = 24000; 
    let startTime = Date.now();
    let width = 0;
    let height = 0;

    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;
    
    const hexToRgb = (hex: string) => {
      const bigint = parseInt(hex.replace('#', ''), 16);
      return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
    };

    // Palette 1: CMB (Planck Data) - Blue, Cyan, Orange, Red
    const CMB_COLORS = ['#1e3a8a', '#3b82f6', '#facc15', '#dc2626']; 
    
    // Palette 2: Cosmic Web (Millennium Style) - Deep Purples, Neon Magenta, Bright Gold
    const DM_FILAMENT_COLORS = ['#a855f7', '#d946ef', '#e879f9', '#c026d3']; // Violet, Fuchsia, Pink
    const DM_CORE_COLORS = ['#fef08a', '#fde047', '#ffffff']; // Yellows/Whites

    const initSystem = () => {
      const tempParticles: Particle[] = [];
      
      // 1. Generate Cluster Centers (Nodes of the Cosmic Web)
      const clusters: {x: number, y: number}[] = [];
      const clusterCount = 18; // More nodes for intricate web
      const padding = 40;
      
      let attempts = 0;
      while (clusters.length < clusterCount && attempts < 500) {
          const cx = randomRange(padding, width - padding);
          const cy = randomRange(padding, height - padding);
          
          // Enforce spacing to create distinct voids
          let tooClose = false;
          for (const c of clusters) {
             const dist = Math.hypot(cx - c.x, cy - c.y);
             if (dist < Math.min(width, height) / 5) { 
                 tooClose = true;
                 break;
             }
          }
          
          if (!tooClose) {
              clusters.push({x: cx, y: cy});
          }
          attempts++;
      }
      
      // Fallback geometry if random gen fails
      if (clusters.length < 4) {
         clusters.push({x: width * 0.25, y: height * 0.25});
         clusters.push({x: width * 0.75, y: height * 0.25});
         clusters.push({x: width * 0.75, y: height * 0.75});
         clusters.push({x: width * 0.25, y: height * 0.75});
      }

      // 2. Build Graph Edges (Filaments)
      // Connect clusters to their nearest neighbors to form the "Skeleton"
      const edges: {p1: typeof clusters[0], p2: typeof clusters[0]}[] = [];
      
      clusters.forEach((c1, i) => {
          // Find 3 nearest neighbors
          const neighbors = clusters
             .map((c, idx) => ({ c, idx, dist: Math.hypot(c.x - c1.x, c.y - c1.y) }))
             .filter(n => n.dist > 0.1) // exclude self
             .sort((a, b) => a.dist - b.dist)
             .slice(0, 3); 
          
          neighbors.forEach(n => {
             if (i < n.idx) { // Avoid duplicate edges
                edges.push({p1: c1, p2: n.c});
             }
          });
      });

      // 3. Generate Particles
      for (let i = 0; i < particleCount; i++) {
        // --- CMB State (Random Uniform) ---
        const cmbX = Math.random() * width;
        const cmbY = Math.random() * height;
        const cmbHex = CMB_COLORS[Math.floor(Math.random() * CMB_COLORS.length)];
        
        // --- Galaxy/Dark Matter State ---
        let galaxyX = 0, galaxyY = 0;
        let galHex = '';
        const structureType = Math.random();
        
        if (structureType < 0.15) {
          // Cluster Core (15%) - Dense, Bright
          const cluster = clusters[Math.floor(Math.random() * clusters.length)];
          const u = 1 - Math.random();
          const v = Math.random();
          const r = 15 * Math.sqrt(-2.0 * Math.log(u)); // Tighter Gaussian
          const theta = 2.0 * Math.PI * v;
          galaxyX = cluster.x + r * Math.cos(theta);
          galaxyY = cluster.y + r * Math.sin(theta);
          
          galHex = DM_CORE_COLORS[Math.floor(Math.random() * DM_CORE_COLORS.length)];

        } else if (structureType < 0.85) {
          // Filament (70%) - Distributed along graph edges
          const edge = edges[Math.floor(Math.random() * edges.length)];
          const t = Math.random();
          
          // Interpolate along edge
          galaxyX = edge.p1.x + (edge.p2.x - edge.p1.x) * t;
          galaxyY = edge.p1.y + (edge.p2.y - edge.p1.y) * t;
          
          // Perpendicular noise (Thickness of filament)
          const dx = edge.p2.x - edge.p1.x;
          const dy = edge.p2.y - edge.p1.y;
          const len = Math.hypot(dx, dy);
          const perpX = -dy / len;
          const perpY = dx / len;
          
          // Tighter noise for sharper filaments (15px amplitude)
          const noiseAmp = (Math.random() - 0.5) * 15; 
          galaxyX += perpX * noiseAmp;
          galaxyY += perpY * noiseAmp;

          galHex = DM_FILAMENT_COLORS[Math.floor(Math.random() * DM_FILAMENT_COLORS.length)];

        } else {
          // Voids (15%) - Background particles
          galaxyX = Math.random() * width;
          galaxyY = Math.random() * height;
          galHex = '#4c1d95'; // Deep Indigo/Purple
        }

        tempParticles.push({
          cmbX,
          cmbY,
          cmbColor: hexToRgb(cmbHex),
          galaxyX,
          galaxyY,
          galaxyColor: hexToRgb(galHex),
          size: randomRange(1.2, 3.2), 
          x: cmbX, 
          y: cmbY
        });
      }

      // Sort particles by X for rendering optimization
      tempParticles.sort((a, b) => a.galaxyX - b.galaxyX);
      particles = tempParticles;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        initSystem();
      }
    };

    const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
    const easeInOutCubic = (x: number): number => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    const animate = () => {
      const now = Date.now();
      const elapsed = (now - startTime) % cycleDuration;
      const progress = elapsed / cycleDuration;
      
      // Phases: 
      // 0.00 - 0.20: CMB Hold
      // 0.20 - 0.50: Transition 
      // 0.50 - 1.00: Cosmic Web Hold
      
      let phase = 0; 
      if (progress < 0.2) {
          phase = 0;
      } else if (progress < 0.5) {
          const t = (progress - 0.2) / 0.3;
          phase = easeInOutCubic(t);
      } else {
          phase = 1;
      }

      ctx.clearRect(0, 0, width, height);
      
      // Background: 
      // CMB: Dark Blue (#020617)
      // Web: Deep Purple/Black (#1a0524) - Richer background for the web
      const bgR = lerp(2, 26, phase);
      const bgG = lerp(6, 5, phase);
      const bgB = lerp(23, 36, phase);
      ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`;
      ctx.fillRect(0, 0, width, height);

      // Additive blending for "Glowing Plasma" effect
      if (phase > 0.6) {
        ctx.globalCompositeOperation = 'lighter';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      const maxDist = 45;
      const connectionAlphaMultiplier = Math.max(0, (phase - 0.5) * 2);

      particles.forEach((p, i) => {
        // 1. Interpolate Position
        const targetBaseX = lerp(p.cmbX, p.galaxyX, phase);
        const targetBaseY = lerp(p.cmbY, p.galaxyY, phase);
        
        const time = now * 0.0003;
        const driftScale = lerp(6, 1, phase); // Calmer in web phase
        const noiseX = Math.sin(time + p.size * 23) * driftScale;
        const noiseY = Math.cos(time + p.size * 17) * driftScale;

        let currentBaseX = targetBaseX + noiseX;
        let currentBaseY = targetBaseY + noiseY;

        // 2. Interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = 140;
        
        if (dist < mouseRadius) {
           const force = (mouseRadius - dist) / mouseRadius;
           const repulsion = 30 * force;
           const angle = Math.atan2(dy, dx);
           currentBaseX -= Math.cos(angle) * repulsion;
           currentBaseY -= Math.sin(angle) * repulsion;
        }

        p.x += (currentBaseX - p.x) * 0.1;
        p.y += (currentBaseY - p.y) * 0.1;

        // 3. Draw Particle
        const r = lerp(p.cmbColor.r, p.galaxyColor.r, phase);
        const g = lerp(p.cmbColor.g, p.galaxyColor.g, phase);
        const b = lerp(p.cmbColor.b, p.galaxyColor.b, phase);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1.0)`;
        ctx.fill();

        // 4. Draw Connections
        if (connectionAlphaMultiplier > 0.01) {
             // Render neighbor connections for web effect
             // Check subset of particles (sorted optimization)
             for (let j = i + 1; j < Math.min(i + 35, particles.length); j++) {
                  const p2 = particles[j];
                  
                  if (phase > 0.8 && (p2.x - p.x) > maxDist) break;

                  const lx = p.x - p2.x;
                  const ly = p.y - p2.y;
                  const lDistSq = lx*lx + ly*ly;

                  if (lDistSq < maxDist * maxDist) {
                       const lDist = Math.sqrt(lDistSq);
                       const opacity = (1 - lDist / maxDist) * 0.4 * connectionAlphaMultiplier;
                       // Filament color for lines (Bright Magenta/Purple)
                       ctx.strokeStyle = `rgba(216, 85, 254, ${opacity})`; 
                       ctx.lineWidth = 0.8; // Slightly thicker lines for visibility
                       ctx.beginPath();
                       ctx.moveTo(p.x, p.y);
                       ctx.lineTo(p2.x, p2.y);
                       ctx.stroke();
                  }
             }
        }
      });

      ctx.globalCompositeOperation = 'source-over';
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseLeave = () => {
        mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full bg-black rounded-sm overflow-hidden relative cursor-crosshair">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default CosmicWebCanvas;