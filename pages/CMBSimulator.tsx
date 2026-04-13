import React from 'react';
import CMBInteractive from '../components/CMBInteractive';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CMBSimulator: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-16 animate-fade-in">
      <div className="mb-12">
        <Link 
          to="/research" 
          className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-all mb-8"
        >
          <ArrowLeft size={16} /> Back to Research
        </Link>
        
        <div className="flex items-baseline justify-between border-b border-stone-200 pb-4 mb-8">
            <h1 className="text-4xl font-serif text-stone-900">CMB Map Simulator</h1>
            <span className="text-xs font-mono text-stone-500 uppercase hidden md:block">Interactive Simulation</span>
        </div>
        
        <p className="text-xl text-stone-600 max-w-3xl leading-relaxed font-light mb-12">
          This interactive panel simulates the additive components of a real CMB observation pipeline. Toggle the layers to see how extragalactic and galactic signals, the Earth atmosphere and instrument effects obscure the primordial signal.
        </p>

        <div className="bg-white p-4 md:p-8 rounded-sm shadow-sm border border-stone-100">
          <CMBInteractive />
        </div>
      </div>
    </div>
  );
};

export default CMBSimulator;
