import React from 'react';
import { NEWS } from '../constants';

const News: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-16 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif text-stone-900 mb-12">Updates</h1>
        
        <div className="border-l border-stone-200 pl-8 md:pl-12 space-y-12">
          {NEWS.map((item) => (
            <div key={item.id} className="relative">
              <span className="absolute -left-[39px] md:-left-[55px] top-1 h-3 w-3 rounded-full bg-stone-300 border-4 border-stone-50" />
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
                <span className="text-sm font-mono text-stone-400">{item.date}</span>
                <span className="text-xs font-bold tracking-widest uppercase text-stone-900 bg-stone-200 px-2 py-1 rounded-sm">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-2">{item.title}</h3>
              <p className="text-stone-600 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;