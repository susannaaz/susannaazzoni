import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROFILE } from '../constants';
import CosmicWebCanvas from '../components/CosmicWebCanvas';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Full Width Hero Section */}
      {/* Full Width Hero Section */}
      <div className="w-full bg-[#050505] pt-32 pb-32 md:pt-40 md:pb-48 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
             <CosmicWebCanvas />
        </div>
        
        {/* Visibility Gradients - Tuned for new animation */}
        <div className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f9f9f7] via-[#f9f9f7]/90 to-transparent pointer-events-none z-10"></div>
        
        {/* Content Overlay */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center pointer-events-none">
           <div className="max-w-3xl pointer-events-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white leading-tight tracking-tight drop-shadow-2xl">
              Susanna Azzoni <br/> 
              <span className="text-stone-100 italic text-2xl md:text-3xl lg:text-4xl mt-4 block font-light drop-shadow-lg">Cosmologist at Princeton University</span>
            </h1>
           </div>
        </div>
      </div>

      {/* Main Content - Editorial Layout */}
      <div className="max-w-6xl mx-auto px-6 relative z-20 mt-0 md:-mt-12 pb-24">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          
          {/* Left Column: Photo & Quick Links */}
          <div className="md:w-1/3 flex flex-col items-center md:items-start md:sticky md:top-32">
             <div className="h-56 w-56 md:h-72 md:w-72 rounded-full overflow-hidden border border-stone-200 shadow-md mb-8 bg-stone-100">
                <img 
                  src={PROFILE.imageUrl} 
                  alt={PROFILE.name} 
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full scale-110 hover:scale-125 transition-all duration-700 ease-out cursor-pointer"
                />
             </div>
             
             <div className="flex flex-col gap-4 items-center md:items-start w-full">
                <Link 
                  to="/research" 
                  className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-all"
                >
                  Read Research <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/contact" 
                  className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-stone-400 border-b border-transparent pb-1 hover:text-stone-900 transition-all"
                >
                  Get in touch
                </Link>
             </div>
          </div>
          
          {/* Right Column: Bio & Narrative */}
          <div className="md:w-2/3 pt-4 md:pt-12">
            <div className="text-lg text-stone-600 leading-loose font-light space-y-8">
              <p className="font-medium text-stone-900">
                I am a postdoctoral researcher in cosmology in the Department of Physics at <a href="https://phy.princeton.edu/people/susanna-azzoni" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:text-stone-600 transition-colors">Princeton University</a>. My work uses observations of the sky to study the early Universe and its evolution, with a focus on the Cosmic Microwave Background and its connection to large-scale structure.
              </p>
              <p>
                My research lies at the interface of observational cosmology and astrophysics, developing methods to extract fundamental physics from large datasets and using these measurements to probe the early Universe, test the standard cosmological model, and search for new physics.
              </p>
              <p>
                I received a PhD in Astrophysics from <a href="https://www.ox.ac.uk/" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:text-stone-600 transition-colors">University of Oxford</a>, where I worked on observational cosmology and data analysis, developing methods and computational tools that connect theory, instrumentation, and data, and served as a Physics Tutor at <a href="https://www.spc.ox.ac.uk/" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:text-stone-600 transition-colors">St Peter's College, Oxford</a>.
              </p>
              <p>
                Originally from Italy, I moved to the UK to study physics and philosophy at <a href="https://www.kcl.ac.uk/" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:text-stone-600 transition-colors">King’s College London</a>, focusing on theoretical projects in quantum gravity and supersymmetry in quantum mechanics, alongside early data-driven projects with <a href="https://www.ligo.org/" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:text-stone-600 transition-colors">LIGO</a> and the <a href="https://www.sdss.org/" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:text-stone-600 transition-colors">Sloan Digital Sky Survey</a>. I later transitioned to experimental cosmology, including the design and building of a working 100 mK miniature dilution refrigerator during my master’s at the <a href="https://www.manchester.ac.uk/" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:text-stone-600 transition-colors">University of Manchester</a>.
              </p>
              <p>
                I am fortunate to work with a broad network of collaborators and students. I am also involved in major international collaborations, including the <a href="https://simonsobservatory.org" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:text-stone-600 transition-colors">Simons Observatory</a>, <a href="https://www.isas.jaxa.jp/en/missions/spacecraft/future/litebird.html" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:text-stone-600 transition-colors">LiteBIRD</a>, and the <a href="https://elfs.web.roma2.infn.it/" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:text-stone-600 transition-colors">European Low Frequency Survey</a>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;