import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Layers, CloudFog, Activity, RefreshCw, Radio, Zap, Aperture, Settings2, Lock, Unlock } from 'lucide-react';

const CMBInteractive: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for controls
  const [colorRange, setColorRange] = useState(3000); // Default +/- 3000 uK
  const [isAutoRange, setIsAutoRange] = useState(true);
  const [seed, setSeed] = useState(1200);
  
  const [layers, setLayers] = useState({
    cmb: true,
    ptsrc: false,
    sz: false,
    dust: false,
    atmosphere: false,
    sidelobe: false,
    beam: false,
    noise: false,
    glitch: false
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Auto-range logic
  useEffect(() => {
    if (!isAutoRange) return;

    // Base range set to 3000 uK as requested.
    // This provides a fixed dynamic range that shows how faint the CMB is compared 
    // to potential contaminants, and prevents constant jumping of the color bar.
    let range = 3000; 

    // Glitches can be 5000-10000 uK, so we might want to expand slightly if they are dominant,
    // but usually saturation is the expected behavior for glitches. 
    // We will keep it stable at 3000 unless explicitly overridden by the user.
    
    setColorRange(range);
  }, [layers, isAutoRange]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorRange(Number(e.target.value));
    setIsAutoRange(false);
  };

  // Buffers for generated map components
  const buffersRef = useRef<{
    cmb: Float32Array | null;
    dust: Float32Array | null;
    atmosphere: Float32Array | null;
    ptsrc: Float32Array | null;
    sz: Float32Array | null;
    sidelobe: Float32Array | null;
    glitch: Float32Array | null;
  }>({ cmb: null, dust: null, atmosphere: null, ptsrc: null, sz: null, sidelobe: null, glitch: null });

  // --- PHYSICS ENGINE ---

  // 1. Spectral Synthesis
  const generateGRF = useCallback((width: number, height: number, powerFunc: (k: number) => number, ampScale: number) => {
    const map = new Float32Array(width * height).fill(0);
    const numModes = 2500; 
    
    for(let i=0; i<numModes; i++) {
        const logMin = Math.log(0.02);
        const logMax = Math.log(3.0);
        const k = Math.exp(logMin + Math.random() * (logMax - logMin));
        
        const power = powerFunc(k);
        const amplitude = Math.sqrt(power) * ampScale;
        
        const theta = Math.random() * 2 * Math.PI;
        const kx = k * Math.cos(theta);
        const ky = k * Math.sin(theta);
        const phase = Math.random() * 2 * Math.PI;
        
        for(let y=0; y<height; y++) {
            const yTerm = y * ky;
            let idx = y * width;
            for(let x=0; x<width; x++) {
                map[idx++] += amplitude * Math.cos(x * kx + yTerm + phase);
            }
        }
    }
    return map;
  }, []);

  // 2. Point Sources
  const generatePointSources = useCallback((width: number, height: number, type: 'radio' | 'sz') => {
    const map = new Float32Array(width * height).fill(0);
    const alpha = -1.75;
    const baseAmp = type === 'sz' ? -400 : 1000; 
    const minAmp = 1.0;
    const density = type === 'sz' ? 0.0002 : 0.0005; 
    const n = Math.floor(width * height * density);
    const beamSigma = type === 'sz' ? 2.5 : 1.2;

    for(let i=0; i<n; i++) {
        const u = Math.random();
        const exponent = 1 / (alpha + 1); 
        let s = Math.pow(u, exponent);
        let amp = baseAmp * minAmp * s;
        if (Math.abs(amp) > 50000) amp = 50000 * Math.sign(amp);

        const cx = Math.random() * width;
        const cy = Math.random() * height;

        const rad = Math.ceil(beamSigma * 4);
        const xMin = Math.max(0, Math.floor(cx - rad));
        const xMax = Math.min(width, Math.ceil(cx + rad));
        const yMin = Math.max(0, Math.floor(cy - rad));
        const yMax = Math.min(height, Math.ceil(cy + rad));

        for(let y=yMin; y<yMax; y++) {
            for(let x=xMin; x<xMax; x++) {
                const r2 = (x-cx)*(x-cx) + (y-cy)*(y-cy);
                const val = amp * Math.exp(-0.5 * r2 / (beamSigma*beamSigma));
                map[y*width + x] += val;
            }
        }
    }
    return map;
  }, []);

  // 3. Sidelobes
  const generateSidelobe = useCallback((width: number, height: number) => {
      const map = new Float32Array(width * height);
      const cx = width * 0.7; 
      const cy = height * 0.4;
      const sigma = width * 0.2; 
      const wave = 20; 
      const amps = 200; 

      for(let y=0; y<height; y++) {
          let idx = y*width;
          for(let x=0; x<width; x++) {
             const dx = x - cx;
             const dy = y - cy;
             const r = Math.sqrt(dx*dx + dy*dy);
             const val = amps * Math.exp(-0.5 * (r*r)/(sigma*sigma)) * Math.cos(2 * Math.PI * r / wave);
             map[idx++] = val;
          }
      }
      return map;
  }, []);

  // 4. Glitches (Tiny Point Sources in Map)
  const generateGlitches = useCallback((width: number, height: number) => {
    const map = new Float32Array(width * height).fill(0);
    const numGlitches = 40; 
    for(let i=0; i<numGlitches; i++) {
        const cx = Math.floor(Math.random() * width);
        const cy = Math.floor(Math.random() * height);
        // Extremely bright spikes
        const amp = (Math.random() > 0.5 ? 1 : -1) * (5000 + Math.random() * 5000);
        
        // Draw small point (approx 1-2px radius but sharp)
        for(let dy=-1; dy<=1; dy++) {
            for(let dx=-1; dx<=1; dx++) {
                const x = cx + dx;
                const y = cy + dy;
                if (x>=0 && x<width && y>=0 && y<height) {
                    const r2 = dx*dx + dy*dy;
                    if(r2 <= 1.5) {
                        map[y*width + x] = amp / (1 + r2);
                    }
                }
            }
        }
    }
    return map;
}, []);


  // --- INITIALIZATION EFFECT ---
  useEffect(() => {
    const parentWidth = containerRef.current?.clientWidth || 600;
    const w = 360; 
    const h = 240; 
    
    // 1. CMB Power Spectrum
    const cmbPower = (k: number) => {
       const peak = 0.25;
       const shape = 1.0 / (1 + Math.pow((k - peak)/0.1, 2)); 
       const damp = Math.exp(-0.5 * k * k);
       const plateau = 0.1 * Math.pow(k, -1.5);
       return (shape + plateau) * damp;
    };
    buffersRef.current.cmb = generateGRF(w, h, cmbPower, 25.0);
    
    // 2. Foregrounds
    buffersRef.current.dust = generateGRF(w, h, (k) => Math.pow(k, -2.5), 15.0);
    buffersRef.current.atmosphere = generateGRF(w, h, (k) => Math.pow(k, -4.0), 40.0);
    buffersRef.current.ptsrc = generatePointSources(w, h, 'radio');
    buffersRef.current.sz = generatePointSources(w, h, 'sz');
    buffersRef.current.sidelobe = generateSidelobe(w, h);
    buffersRef.current.glitch = generateGlitches(w, h);

    if (canvasRef.current) {
        canvasRef.current.width = w;
        canvasRef.current.height = h;
    }
  }, [seed, generateGRF, generatePointSources, generateSidelobe, generateGlitches]);


  // --- RENDER LOOP ---
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;
      
      const buf = buffersRef.current;
      if (!buf.cmb) return;

      const time = Date.now() / 1000;
      
      const driftX = Math.floor(Math.sin(time * 0.1) * 20);

      for(let i=0; i<w*h; i++) {
          let val = 0;
          
          if (layers.cmb) val += buf.cmb![i];
          if (layers.dust) val += buf.dust![i];
          if (layers.ptsrc) val += buf.ptsrc![i];
          if (layers.sz) val += buf.sz![i];
          if (layers.sidelobe) val += buf.sidelobe![i];
          if (layers.glitch) val += buf.glitch![i];
          
          if (layers.atmosphere) {
              const x = i % w;
              const y = Math.floor(i / w);
              const dx = (x + driftX + w) % w;
              val += buf.atmosphere![y*w + dx];
          }

          if (layers.noise) {
              // STRONGER DETECTOR NOISE
              // Approx +/- 70uK RMS. 
              val += (Math.random() - 0.5) * 240; 
          }

          // --- COLOR MAPPING ---
          let u = val / colorRange;
          
          let r, g, b;

          if (u > 1) u = 1;
          if (u < -1) u = -1;

          // Planck Color Palette
          // -1.0: Navy (0,0,128)
          // -0.33: Blue/Azure (0,100,255)
          // 0.0: White (255,255,255)
          // 0.33: Orange/Gold (255,178,0)
          // 1.0: Dark Red (204,0,0)

          if (u < -0.33) {
             const t = (u + 1) / 0.67;
             r = 0; g = Math.floor(100 * t); b = Math.floor(128 + 127*t);
          } else if (u < 0) {
             const t = (u + 0.33) / 0.33;
             r = Math.floor(255*t); g = Math.floor(100 + 155*t); b = 255;
          } else if (u < 0.33) {
             const t = u / 0.33;
             r = 255; g = Math.floor(255 * (1 - t*0.3)); b = Math.floor(255 * (1 - t));
          } else {
             const t = (u - 0.33) / 0.67;
             r = Math.floor(255 * (1 - t*0.2)); g = Math.floor(178 * (1 - t)); b = 0;
          }

          const pIdx = i * 4;
          data[pIdx] = r;
          data[pIdx+1] = g;
          data[pIdx+2] = b;
          data[pIdx+3] = 255;
      }

      ctx.putImageData(imgData, 0, 0);

      if (layers.atmosphere || layers.noise) {
         requestAnimationFrame(() => {}); 
      }
  }, [layers, colorRange, seed]);
  
  // Animation driver
  const [tick, setTick] = useState(0);
  useEffect(() => {
     let id: number;
     const loop = () => {
         setTick(t => t + 1);
         id = requestAnimationFrame(loop);
     }
     if (layers.atmosphere || layers.noise) {
         loop();
     }
     return () => cancelAnimationFrame(id);
  }, [layers.atmosphere, layers.noise]);

  return (
    <div className="bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden font-sans">
        {/* Header */}
        <div className="bg-stone-50 border-b border-stone-200 p-4 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex items-center gap-2">
                <Activity size={18} className="text-stone-500" />
                <span className="font-serif font-bold text-stone-900">CMB Pipeline Simulator</span>
            </div>
            
            <div className="flex items-center gap-6">
                {/* Color Scale Slider */}
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-sm relative group">
                    <button 
                        onClick={() => setIsAutoRange(!isAutoRange)}
                        className={`p-1 rounded-full transition-colors ${isAutoRange ? 'text-emerald-500 bg-emerald-50' : 'text-stone-400 hover:text-stone-600'}`}
                        title={isAutoRange ? "Auto-scale Active" : "Manual Scale"}
                    >
                        {isAutoRange ? <Lock size={12} /> : <Unlock size={12} />}
                    </button>
                    <Settings2 size={14} className="text-stone-400" />
                    <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Scale:</span>
                    <input 
                        type="range" 
                        min="400" 
                        max="50000" 
                        step="50"
                        value={colorRange}
                        onChange={handleRangeChange}
                        className="w-24 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                    />
                    <span className="text-xs font-mono w-14 text-right">±{colorRange}µK</span>
                </div>

                <button 
                    onClick={() => setSeed(Math.random() * 10000)}
                    className="text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1 text-xs uppercase font-bold tracking-wider"
                >
                    <RefreshCw size={14} /> Reset
                </button>
            </div>
        </div>

        <div className="flex flex-col xl:flex-row">
            {/* Canvas Area */}
            <div ref={containerRef} className="relative flex-1 bg-stone-900 min-h-[400px] overflow-hidden group flex items-center justify-center">
                <canvas 
                    ref={canvasRef} 
                    className={`block w-full h-full object-contain transition-all duration-300 ${layers.beam ? 'blur-[3px]' : ''}`}
                    style={{ imageRendering: 'pixelated' }}
                />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 bg-stone-900/90 backdrop-blur-sm px-4 py-3 rounded-sm border-l-2 border-stone-500 shadow-xl max-w-xs pointer-events-none z-10">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Map Status</span>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${
                                !layers.cmb ? 'bg-stone-500' :
                                (layers.dust || layers.atmosphere || layers.ptsrc || layers.sz || layers.noise || layers.glitch) 
                                ? 'bg-amber-500' 
                                : 'bg-emerald-500'
                            }`} />
                            <span className="text-xs font-mono text-white">
                                {!layers.cmb ? "NO SIGNAL" :
                                (layers.dust || layers.atmosphere || layers.ptsrc || layers.sz || layers.noise || layers.glitch) 
                                ? "CONTAMINATED" 
                                : "PURE CMB"}
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Colorbar Legend */}
                <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-md p-2 rounded-sm border border-stone-700/50 opacity-90">
                    <div 
                        className="h-40 w-4 rounded-full border border-white/10 relative shadow-inner"
                        style={{ background: 'linear-gradient(to top, rgb(0,0,128) 0%, rgb(0,100,255) 33.5%, rgb(255,255,255) 50%, rgb(255,178,0) 66.5%, rgb(204,0,0) 100%)' }}
                    ></div>
                    <div className="absolute right-8 top-0 bottom-0 flex flex-col justify-between text-[9px] font-mono text-stone-300 py-1 text-right w-12">
                        <span>+{colorRange}</span>
                        <span>0</span>
                        <span>-{colorRange}</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="xl:w-80 bg-stone-50 border-l border-stone-200 p-6 flex flex-col gap-6 overflow-y-auto max-h-[600px]">
                
                {/* Section 1: Signal */}
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">1. Cosmological Signal</h4>
                    <ControlRow 
                        label="Primordial CMB" 
                        active={layers.cmb} 
                        onClick={() => toggleLayer('cmb')}
                        icon={<Activity size={16} />}
                        desc="CMB signal (z=1100)"
                    />
                </div>

                {/* Section 2: Foregrounds */}
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">2. Foregrounds</h4>
                    <ControlRow 
                        label="Point Sources" 
                        active={layers.ptsrc} 
                        onClick={() => toggleLayer('ptsrc')}
                        icon={<Radio size={16} />}
                        desc="Radio sources: N(S) ~ S^-1.75"
                    />
                    <ControlRow 
                        label="SZ Clusters" 
                        active={layers.sz} 
                        onClick={() => toggleLayer('sz')}
                        icon={<Aperture size={16} />}
                        desc="SZ decrement (blue spots), amp=-4e2"
                    />
                    <ControlRow 
                        label="Galactic Dust" 
                        active={layers.dust} 
                        onClick={() => toggleLayer('dust')}
                        icon={<Layers size={16} />}
                        desc="Thermal emission: C_l ~ l^-2.5"
                    />
                </div>

                {/* Section 3: Environment & Instrument */}
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">3. Systematics</h4>
                    <ControlRow 
                        label="Atmosphere" 
                        active={layers.atmosphere} 
                        onClick={() => toggleLayer('atmosphere')}
                        icon={<CloudFog size={16} />}
                        desc="Red noise (1/f), slope -4.0"
                    />
                     <ControlRow 
                        label="Sidelobes" 
                        active={layers.sidelobe} 
                        onClick={() => toggleLayer('sidelobe')}
                        icon={<Zap size={16} />}
                        desc="Optical stray light pickup"
                    />
                    <ControlRow 
                        label="Detector Noise" 
                        active={layers.noise} 
                        onClick={() => toggleLayer('noise')}
                        icon={<Activity size={16} />}
                        desc="White noise (~70uK RMS)"
                    />
                     <ControlRow 
                        label="Glitches" 
                        active={layers.glitch} 
                        onClick={() => toggleLayer('glitch')}
                        icon={<Zap size={16} />}
                        desc="High-amp spikes (TOD artifacts)"
                    />
                     <ControlRow 
                        label="Beam Smoothing" 
                        active={layers.beam} 
                        onClick={() => toggleLayer('beam')}
                        icon={<Aperture size={16} />}
                        desc="Instrumental PSF convolution"
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

const ControlRow: React.FC<{
    label: string; 
    active: boolean; 
    onClick: () => void; 
    icon: React.ReactNode;
    desc?: string;
    disabled?: boolean;
}> = ({ label, active, onClick, icon, desc, disabled }) => (
    <div 
        onClick={!disabled ? onClick : undefined}
        className={`group flex items-start gap-3 p-2 rounded-md transition-all border 
            ${disabled ? 'opacity-40 cursor-not-allowed border-transparent' : 'cursor-pointer'}
            ${active && !disabled ? 'bg-white border-stone-300 shadow-sm' : 'border-transparent hover:bg-stone-100'}
        `}
    >
        <div className={`mt-0.5 ${active && !disabled ? 'text-stone-900' : 'text-stone-400 group-hover:text-stone-600'}`}>
            {icon}
        </div>
        <div>
            <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${active && !disabled ? 'text-stone-900' : 'text-stone-500'}`}>{label}</span>
                {active && !disabled && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
            </div>
            {desc && <p className="text-[10px] text-stone-400 leading-tight mt-1">{desc}</p>}
        </div>
    </div>
);

export default CMBInteractive;