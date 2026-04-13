import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { PROFILE } from '../constants';

const Publications: React.FC = () => {
  const adsUrl = "https://ui.adsabs.harvard.edu/search/fq=%7B!type%3Daqp%20v%3D%24fq_database%7D&fq_database=(database%3Aastronomy%20OR%20database%3Aphysics)&q=azzoni%2C%20susanna&sort=date%20desc%2C%20bibcode%20desc&p_=0";

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-16 animate-fade-in">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl font-serif text-stone-900 mb-6">Publications</h1>
        <p className="text-lg text-stone-600 leading-relaxed">
          My full list of publications can be found at one of the links below.
        </p>
      </div>
        
        <div className="flex flex-col sm:flex-row justify-start gap-4">
           <a 
             href={adsUrl}
             target="_blank"
             rel="noreferrer" 
             className="flex items-center justify-center gap-2 px-6 py-2 border border-stone-300 rounded-full hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all text-sm font-medium"
           >
             <BookOpen size={16} /> NASA ADS
           </a>
           <a 
             href={PROFILE.scholarUrl}
             target="_blank"
             rel="noreferrer" 
             className="flex items-center justify-center gap-2 px-6 py-2 border border-stone-300 rounded-full hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all text-sm font-medium"
           >
             <ExternalLink size={16} /> Google Scholar
           </a>
           <a 
             href="https://orcid.org/0000-0002-8132-4896"
             target="_blank"
             rel="noreferrer" 
             className="flex items-center justify-center gap-2 px-6 py-2 border border-stone-300 rounded-full hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all text-sm font-medium"
           >
             <ExternalLink size={16} /> ORCID
           </a>
        </div>
    </div>
  );
};

export default Publications;