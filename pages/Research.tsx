import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLLABORATIONS, PROFILE } from '../constants';

const Research: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-16 space-y-20 animate-fade-in">
      <div className="space-y-8">
        <div className="max-w-3xl">
           <h1 className="text-4xl font-serif text-stone-900">Research</h1>
        </div>

        {/* Full Width Figure */}
        <figure className="w-full">
            <div className="w-full h-68 md:h-82 bg-stone-100 rounded-sm overflow-hidden shadow-sm">
                <img 
                    src={PROFILE.researchImageUrl} 
                    alt="Timeline of research experiences" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                />
            </div>
            <figcaption className="mt-3 text-sm text-stone-500 italic">
                Brief history of my research experiences
            </figcaption>
        </figure>

        <div className="max-w-3xl text-lg text-stone-600 leading-relaxed space-y-4 font-light">
          <p>
            I am a postdoctoral researcher at <a href="https://phy.princeton.edu/people/susanna-azzoni" target="_blank" rel="noreferrer" className="border-b border-stone-300 hover:border-stone-900 hover:text-stone-900 transition-colors">Princeton University</a> in cosmology and astrophysics. My work explores how the Universe began and how its earliest moments grew into the cosmic web we see today. I have primarily worked on the analysis of the cosmic microwave background (CMB) — the earliest image of the Universe — and developed the methods and end-to-end analysis tools needed to interpret it, from instrument characterization to cosmological inference.
          </p>
          <p>
            I currently co-lead analysis efforts for the <a href="https://simonsobservatory.org" target="_blank" rel="noreferrer" className="border-b border-stone-300 hover:border-stone-900 hover:text-stone-900 transition-colors">Simons Observatory</a> in Chile, particularly for the Small Aperture Telescopes. I am also a member of the <a href="https://www.isas.jaxa.jp/en/missions/spacecraft/future/litebird.html" target="_blank" rel="noreferrer" className="border-b border-stone-300 hover:border-stone-900 hover:text-stone-900 transition-colors">LiteBIRD</a> satellite mission and of the European Low Frequency Survey. Earlier in my career, I worked on QUBIC, where I helped design, build, and test cryogenic systems.
          </p>
          <p>
            I am broadly interested in the physics of the early Universe, the evolution and composition of the cosmos, and how the earliest moments set the stage for the structure we observe today. My research spans the study of the CMB, Galactic and extragalactic foregrounds, and their correlations with large-scale structure surveys. I work at the interface of cosmological theory, precision data analysis, instrument modeling, and statistical methods to uncover new physics and produce robust, transparent measurements of the cosmic sky.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-serif text-stone-900 mb-6">International Collaborations</h2>
          <p className="text-lg text-stone-600 leading-relaxed font-light">
            My research is carried out within large international collaborations. I am a member of the Simons Observatory, LiteBIRD, and ELFS collaborations, and have previously contributed to QUBIC. These efforts combine instrumentation, data analysis, and theory to enable next-generation measurements of the CMB.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COLLABORATIONS.map((collab) => (
            <a 
              key={collab.id} 
              href={collab.url}
              target="_blank"
              rel="noreferrer"
              className="group bg-white border border-stone-200 rounded-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="aspect-video overflow-hidden bg-stone-100">
                <img 
                  src={collab.imageUrl} 
                  alt={collab.name} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 space-y-4 flex-grow">
                <h3 className="text-2xl font-serif text-stone-900 group-hover:text-stone-600 transition-colors">{collab.name}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-1">Experiment</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{collab.description}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-1">Contribution</h4>
                    <p className="text-stone-900 text-sm leading-relaxed font-medium">{collab.contribution}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Interactive Tools Link */}
      <div className="pt-12 border-t border-stone-200">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl font-serif text-stone-900">Interactive CMB Map</h2>
          <p className="text-lg text-stone-600 leading-relaxed font-light">
            Use my interactive simulator to see how our atmosphere, instruments, galactic and extragalactic signals interact with the CMB, the cosmic signal from the Big Bang!
          </p>
          <Link 
            to="/research/simulator" 
            className="group inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-all"
          >
            Launch CMB Map Simulator <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Research;