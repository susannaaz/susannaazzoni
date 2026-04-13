import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { PROFILE } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-16 animate-fade-in">
      <div className="max-w-2xl mb-16">
         <h1 className="text-4xl font-serif text-stone-900 mb-6">Get in Touch</h1>
         <p className="text-lg text-stone-600 leading-relaxed">
           I am always interested in hearing from students, collaborators, and the public. 
           For prospective students interested in working on computational cosmology, please 
           read my research page before reaching out.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-sm border border-stone-100 shadow-sm">
          <h2 className="text-xl font-serif text-stone-900 mb-6">Contact Information</h2>
          <div className="space-y-6">
             <div className="flex items-start gap-4">
                <Mail className="text-stone-400 mt-1" />
                <div>
                   <p className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-1">Email</p>
                   <a href={`mailto:${PROFILE.email}`} className="text-stone-600 hover:text-stone-900 underline underline-offset-2">
                     {PROFILE.email}
                   </a>
                </div>
             </div>
             <div className="flex items-start gap-4">
                <MapPin className="text-stone-400 mt-1" />
                <div>
                   <p className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-1">Office</p>
                   <p className="text-stone-600">
                     Jadwin Hall, Room 223<br/>
                     Department of Physics<br/>
                     Princeton University<br/>
                     Princeton, NJ 08540
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="bg-stone-100 rounded-sm overflow-hidden h-[450px] border border-stone-200 shadow-sm">
           <iframe
             title="Jadwin Hall, Princeton University"
             width="100%"
             height="100%"
             style={{ border: 0 }}
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3042.84435649495!2d-74.6565436234473!3d40.34583337145037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3e696f86c6a4b%3A0x7d2874313f88975!2sJadwin%20Hall!5e0!3m2!1sen!2sus!4v1712880000000!5m2!1sen!2sus"
             allowFullScreen
             loading="lazy"
             referrerPolicy="no-referrer-when-downgrade"
           ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;