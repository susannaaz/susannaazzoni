import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Activity, RefreshCw, Sliders } from 'lucide-react';

const CMBPowerSpectrum: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Standard LCDM Best Fit parameters as defaults
  const DEFAULTS = {
    H0: 67.5,    // Hubble Constant
    omb: 0.022,  // Baryon Density
    omc: 0.120,  // Cold Dark Matter Density
    ns: 0.965,   // Spectral Index
    As: 2.1      // Scalar Amplitude
  };

  const [params, setParams] = useState(DEFAULTS);
  const [hoverPos, setHoverPos] = useState<{x: number, y: number} | null>(null);

  // --- PHYSICS ENGINE (Analytical Approximation) ---
  const calculateSpectrum = useCallback((width: number, height: number) => {
    const dataPoints: {x: number, y: number, l: number, Dl: number, upper: number, lower: number}[] = [];
    
    // Scale factors for the plot
    const maxL = 2500;
    const maxDl = 6500; // uK^2
    const padding = { left: 60, right: 30, top: 30, bottom: 50 };
    
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    // Physics constants
    const ombh2 = params.omb;
    const omch2 = params.omc;
    const omh2 = ombh2 + omch2; // total matter density
    
    // 1. Acoustic Scale (Location of peaks)
    const theta_s = 0.0104 * Math.pow(67.5 / params.H0, 0.5); 
    const l_a = Math.PI / theta_s;

    // 2. Baryon Loading
    // 3. Damping Scale
    const l_d = 1400 * Math.pow(omh2 / 0.14, 0.5);

    // Generate points
    for (let l = 2; l <= maxL; l += 4) { // finer step
        // A. Primordial Tilt
        const primordial = params.As * Math.pow(l / 0.05, params.ns - 1);

        // B. Transfer Function / Acoustic Oscillations
        const x = l / l_a;
        const phase = x * Math.PI;
        const osc = Math.cos(phase);
        
        // Baryon modulation
        const baryonEnhance = 1 + (ombh2 / 0.022) * 0.6;
        const evenOddAsymmetry = (ombh2 / 0.022) * 0.35 * Math.cos(phase); 
        
        // Envelope decay
        const envelope = Math.pow(l, -1.25); 
        
        // Silk damping
        const damping = Math.exp(-Math.pow(l / l_d, 1.4));

        // Simplified SW plateau + Acoustic peaks combination
        let Dl_model = 0;
        const SW = 1000 * Math.pow(l, -2); 
        const Peaks = 4800 * envelope * damping * baryonEnhance * (1 + osc * 0.75 + evenOddAsymmetry);
        
        const transition = 1.0 - Math.exp(-l/180);
        let Dl = (SW * (1-transition) + Peaks * transition) * primordial;
        Dl *= Math.pow(omch2/0.12, -0.4); // Matter density amplitude scaling

        // Cosmic Variance (approximate 1/sqrt(2l+1))
        // We exaggerate it slightly for visual effect at low l
        const f_sky = 0.6; // Sky fraction
        const cv = Math.sqrt(2 / ((2*l + 1) * f_sky));
        const sigma = Dl * cv;

        // Map to Canvas Coordinates
        const xPos = padding.left + (l / maxL) * plotW;
        const yPos = height - padding.bottom - (Dl / maxDl) * plotH;

        dataPoints.push({ 
            x: xPos, 
            y: yPos, 
            l, 
            Dl,
            upper: height - padding.bottom - ((Dl + sigma) / maxDl) * plotH,
            lower: height - padding.bottom - ((Dl - sigma) / maxDl) * plotH,
        });
    }

    return { dataPoints, padding, plotW, plotH, maxL, maxDl };
  }, [params]);

  // Mouse Interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if(rect) {
          setHoverPos({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
          });
      }
  };

  const handleMouseLeave = () => {
      setHoverPos(null);
  }

  // --- RENDER ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const parent = containerRef.current;
    
    if (parent) {
       const displayWidth = parent.clientWidth;
       const displayHeight = 400;
       
       canvas.style.width = `${displayWidth}px`;
       canvas.style.height = `${displayHeight}px`;
       
       // Only resize backing store if needed to avoid flicker
       if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
           canvas.width = displayWidth * dpr;
           canvas.height = displayHeight * dpr;
       }
       
       ctx.scale(dpr, dpr);
       // Pass logical dimensions to calculation
       var width = displayWidth;
       var height = displayHeight;
    } else {
        return;
    }

    const { dataPoints, padding, plotW, plotH, maxL, maxDl } = calculateSpectrum(width, height);

    ctx.clearRect(0, 0, width, height);

    // -- 1. Grid & Axes --
    ctx.strokeStyle = '#e5e7eb'; // stone-200 / gray-200
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]); // Dashed grid
    ctx.beginPath();
    
    // Vertical grid (L multipoles)
    [500, 1000, 1500, 2000].forEach(val => {
        const x = padding.left + (val / maxL) * plotW;
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, height - padding.bottom);
    });
    // Horizontal grid (Power)
    [0, 2000, 4000, 6000].forEach(val => {
        const y = height - padding.bottom - (val / maxDl) * plotH;
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
    });
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // -- 2. Cosmic Variance Band --
    ctx.fillStyle = '#f3f4f6'; // gray-100/stone-100
    ctx.beginPath();
    if (dataPoints.length > 0) {
        // Top edge
        ctx.moveTo(dataPoints[0].x, dataPoints[0].upper);
        for (let i = 1; i < dataPoints.length; i++) {
             // Simple smoothing
             const xc = (dataPoints[i].x + dataPoints[i-1].x) / 2;
             const yc = (dataPoints[i].upper + dataPoints[i-1].upper) / 2;
             ctx.quadraticCurveTo(dataPoints[i-1].x, dataPoints[i-1].upper, xc, yc);
        }
        ctx.lineTo(dataPoints[dataPoints.length-1].x, dataPoints[dataPoints.length-1].upper);
        
        // Bottom edge (reverse)
        ctx.lineTo(dataPoints[dataPoints.length-1].x, dataPoints[dataPoints.length-1].lower);
        for (let i = dataPoints.length - 2; i >= 0; i--) {
             const xc = (dataPoints[i].x + dataPoints[i+1].x) / 2;
             const yc = (dataPoints[i].lower + dataPoints[i+1].lower) / 2;
             ctx.quadraticCurveTo(dataPoints[i+1].x, dataPoints[i+1].lower, xc, yc);
        }
        ctx.closePath();
        ctx.fill();
    }

    // -- 3. Main Curve --
    if (dataPoints.length > 0) {
        // A. Gradient Fill
        const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
        gradient.addColorStop(0, 'rgba(14, 165, 233, 0.15)'); // sky-500
        gradient.addColorStop(1, 'rgba(14, 165, 233, 0.0)');

        ctx.beginPath();
        ctx.moveTo(dataPoints[0].x, dataPoints[0].y);
        for (let i = 1; i < dataPoints.length - 1; i++) {
            const xc = (dataPoints[i].x + dataPoints[i + 1].x) / 2;
            const yc = (dataPoints[i].y + dataPoints[i + 1].y) / 2;
            ctx.quadraticCurveTo(dataPoints[i].x, dataPoints[i].y, xc, yc);
        }
        ctx.lineTo(dataPoints[dataPoints.length-1].x, height - padding.bottom); // Drop to bottom
        ctx.lineTo(dataPoints[0].x, height - padding.bottom); // Return to start
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // B. Stroke Line
        ctx.beginPath();
        ctx.moveTo(dataPoints[0].x, dataPoints[0].y);
        for (let i = 1; i < dataPoints.length - 1; i++) {
            const xc = (dataPoints[i].x + dataPoints[i + 1].x) / 2;
            const yc = (dataPoints[i].y + dataPoints[i + 1].y) / 2;
            ctx.quadraticCurveTo(dataPoints[i].x, dataPoints[i].y, xc, yc);
        }
        ctx.strokeStyle = '#0ea5e9'; // sky-500
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.stroke();
    }

    // -- 4. Axis Labels & Ticks --
    ctx.fillStyle = '#57534e'; // stone-600
    ctx.font = '11px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // X-Axis
    [500, 1000, 1500, 2000, 2500].forEach(val => {
        const x = padding.left + (val / maxL) * plotW;
        ctx.fillText(val.toString(), x, height - padding.bottom + 8);
        // Tick
        ctx.beginPath();
        ctx.moveTo(x, height - padding.bottom);
        ctx.lineTo(x, height - padding.bottom + 4);
        ctx.stroke();
    });

    // Y-Axis
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    [0, 2000, 4000, 6000].forEach(val => {
        const y = height - padding.bottom - (val / maxDl) * plotH;
        ctx.fillText(val.toString(), padding.left - 10, y);
    });

    // Titles
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1c1917'; // stone-900
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillText("Power Dℓ [μK²]", 0, 0);
    ctx.restore();

    ctx.fillStyle = '#1c1917';
    ctx.textAlign = 'center';
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillText("Multipole Moment (ℓ)", width / 2 + padding.left/2, height - 15);


    // -- 5. Interactive Tooltip (Crosshair) --
    if (hoverPos) {
        // Find nearest point
        const relativeX = hoverPos.x - padding.left;
        const l_hover = (relativeX / plotW) * maxL;
        
        // Find closest data point
        let closest = dataPoints[0];
        let minDist = 10000;
        
        for (const p of dataPoints) {
            const dist = Math.abs(p.l - l_hover);
            if (dist < minDist) {
                minDist = dist;
                closest = p;
            }
        }

        if (Math.abs(closest.x - hoverPos.x) < 50) { // Only show if near
            // Draw vertical line
            ctx.beginPath();
            ctx.moveTo(closest.x, padding.top);
            ctx.lineTo(closest.x, height - padding.bottom);
            ctx.strokeStyle = '#a8a29e'; // stone-400
            ctx.setLineDash([2, 2]);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);

            // Draw Point
            ctx.beginPath();
            ctx.arc(closest.x, closest.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#0284c7'; // sky-600
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw Tooltip Box
            const tipW = 100;
            const tipH = 50;
            let tipX = closest.x + 10;
            let tipY = closest.y - 60;
            
            if (tipX + tipW > width) tipX = closest.x - tipW - 10;
            if (tipY < 0) tipY = closest.y + 10;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.shadowColor = 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 10;
            ctx.fillRect(tipX, tipY, tipW, tipH);
            ctx.shadowBlur = 0;
            ctx.strokeStyle = '#e7e5e4';
            ctx.strokeRect(tipX, tipY, tipW, tipH);

            // Tooltip Text
            ctx.textAlign = 'left';
            ctx.fillStyle = '#78716c';
            ctx.font = '10px "Inter", sans-serif';
            ctx.fillText(`ℓ = ${Math.round(closest.l)}`, tipX + 8, tipY + 16);
            
            ctx.fillStyle = '#0ea5e9';
            ctx.font = 'bold 12px "Inter", sans-serif';
            ctx.fillText(`${Math.round(closest.Dl)} μK²`, tipX + 8, tipY + 34);
        }
    }

  }, [params, calculateSpectrum, hoverPos]);

  return (
    <div className="bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden font-sans">
       {/* Header */}
       <div className="bg-stone-50 border-b border-stone-200 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Activity size={18} className="text-stone-500" />
                <span className="font-serif font-bold text-stone-900">Theory Power Spectrum</span>
            </div>
            <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-stone-400">
                    <span className="w-3 h-3 bg-stone-200 rounded-sm"></span> Cosmic Variance
                    <span className="w-3 h-3 bg-sky-500 rounded-sm ml-2"></span> Model
                </div>
                <button 
                    onClick={() => setParams(DEFAULTS)}
                    className="text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1 text-xs uppercase font-bold tracking-wider ml-4 border-l border-stone-200 pl-4"
                >
                    <RefreshCw size={14} /> Reset LCDM
                </button>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row">
            {/* Graph Area */}
            <div ref={containerRef} className="flex-1 bg-white min-h-[400px] relative cursor-crosshair">
                <canvas 
                    ref={canvasRef} 
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="w-full h-full block" 
                />
            </div>

            {/* Controls */}
            <div className="lg:w-80 bg-stone-50 border-l border-stone-200 p-6 flex flex-col gap-6">
                <div className="flex items-center gap-2 mb-2 text-stone-500">
                    <Sliders size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Cosmological Parameters</span>
                </div>

                <SliderControl 
                    label="Hubble Constant"
                    symbol="H₀"
                    value={params.H0}
                    min={50} max={90} step={0.5}
                    onChange={(v) => setParams(p => ({...p, H0: v}))}
                    desc="Expansion rate. Shifts peak locations horizontally."
                />
                
                <SliderControl 
                    label="Baryon Density"
                    symbol="Ω_b h²"
                    value={params.omb}
                    min={0.010} max={0.040} step={0.001}
                    onChange={(v) => setParams(p => ({...p, omb: v}))}
                    desc="Ordinary matter. Modulates relative peak heights."
                />

                <SliderControl 
                    label="Dark Matter Density"
                    symbol="Ω_c h²"
                    value={params.omc}
                    min={0.05} max={0.25} step={0.005}
                    onChange={(v) => setParams(p => ({...p, omc: v}))}
                    desc="Total gravitational potential depth."
                />

                <SliderControl 
                    label="Spectral Index"
                    symbol="n_s"
                    value={params.ns}
                    min={0.8} max={1.1} step={0.01}
                    onChange={(v) => setParams(p => ({...p, ns: v}))}
                    desc="Primordial tilt from Inflation."
                />
            </div>
        </div>
    </div>
  );
};

const SliderControl: React.FC<{
    label: string;
    symbol: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (val: number) => void;
    desc: string;
}> = ({ label, symbol, value, min, max, step, onChange, desc }) => (
    <div>
        <div className="flex justify-between items-baseline mb-1">
            <div className="flex flex-col">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wide">{label}</span>
                <span className="text-[10px] font-mono text-stone-500">{symbol}</span>
            </div>
            <span className="text-xs font-mono text-stone-900 bg-white border border-stone-200 px-1.5 py-0.5 rounded shadow-sm">{value.toFixed(3)}</span>
        </div>
        <input 
            type="range" 
            min={min} max={max} step={step} 
            value={value} 
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900 mb-2"
        />
        <p className="text-[10px] text-stone-400 leading-tight">{desc}</p>
    </div>
);

export default CMBPowerSpectrum;