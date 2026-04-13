import React from 'react';
import { TALKS } from '../constants';

const Talks: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-16 animate-fade-in">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl font-serif text-stone-900 mb-6">Talks</h1>
        <p className="text-lg text-stone-600 leading-relaxed">
          Research is more exciting when it is shared! Find here a selection of seminars, colloquia, and conference contributions where I talk about my research.
        </p>
      </div>

      <div className="max-w-4xl space-y-12">
        {TALKS.map((talk) => (
          <div key={talk.id} className="relative pl-8 md:pl-12 border-l border-stone-200 group">
             <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-stone-300 group-hover:bg-stone-900 transition-colors"></div>
             
             <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-2">
                <span className="text-sm font-mono text-stone-500 font-medium min-w-[80px]">{talk.date}</span>
                <span className={`text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm w-fit ${
                    talk.type === 'Invited' || talk.type === 'Colloquium' || talk.type === 'Seminar' 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-stone-200 text-stone-700'
                }`}>
                  {talk.type}
                </span>
                {talk.url && (
                  <a 
                    href={talk.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-bold tracking-widest uppercase text-stone-400 hover:text-stone-900 border-b border-transparent hover:border-stone-900 transition-all"
                  >
                    View Link
                  </a>
                )}
             </div>

             <h3 className="text-xl font-serif text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
               {talk.title}
             </h3>
             <p className="text-stone-600 italic">
               {talk.event}
             </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Talks;