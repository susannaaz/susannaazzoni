import React from 'react';
import { Download, Briefcase, GraduationCap, Award, Users, BookOpen, Star } from 'lucide-react';

const CV: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-16 animate-fade-in space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-stone-200 pb-8">
        <div>
          <h1 className="text-4xl font-serif text-stone-900 mb-2">Curriculum Vitae</h1>
          <p className="text-stone-500">Department of Physics, Princeton University</p>
        </div>
        <a 
          href="/susanna_azzoni_cv.pdf" 
          download="Susanna_Azzoni_CV.pdf"
          className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-700 transition-colors text-sm tracking-wide"
        >
          <Download size={16} /> Download PDF
        </a>
      </div>

      {/* Current Position */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Star className="text-stone-400" size={24} />
          <h2 className="text-2xl font-serif text-stone-900">Current Position</h2>
        </div>
        <div className="pl-2 md:pl-9">
           <div className="border-l-2 border-stone-200 pl-6 py-1">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-xl font-semibold text-stone-900">Postdoctoral Research Associate</h3>
                <span className="text-sm font-mono text-stone-500">Sep 2023 - Present</span>
              </div>
              <p className="text-stone-700 font-medium">Department of Physics, Princeton University, USA</p>
              <p className="text-sm text-stone-500 mt-2">References: Jo Dunkley, Lyman Page</p>
           </div>
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="text-stone-400" size={24} />
          <h2 className="text-2xl font-serif text-stone-900">Education</h2>
        </div>
        <div className="space-y-8 pl-2 md:pl-9">
          <div className="relative pl-8 border-l border-stone-200">
             <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-stone-300"></div>
             <span className="text-sm font-mono text-stone-500 block mb-1">2019 - 2023</span>
             <h3 className="text-lg font-semibold text-stone-900">DPhil in Astrophysics</h3>
             <p className="text-stone-600">University of Oxford, UK</p>
             <p className="text-sm text-stone-500 mt-1 italic">Thesis: "Early Universe from CMB B-modes: Observational Challenges"</p>
             <p className="text-xs text-stone-400 mt-1">Advisors: David Alonso, Tomotake Matsumura</p>
          </div>
          <div className="relative pl-8 border-l border-stone-200">
             <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-stone-300"></div>
             <span className="text-sm font-mono text-stone-500 block mb-1">2018 - 2019</span>
             <h3 className="text-lg font-semibold text-stone-900">MSc by Research in Astronomy and Astrophysics</h3>
             <p className="text-stone-600">University of Manchester, Jodrell Bank Centre, UK</p>
             <p className="text-sm text-stone-500 mt-1 italic">Distinction. Thesis: "Development of cryogenic systems for CMB observations"</p>
          </div>
          <div className="relative pl-8 border-l border-stone-200">
             <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-stone-300"></div>
             <span className="text-sm font-mono text-stone-500 block mb-1">2014 - 2018</span>
             <h3 className="text-lg font-semibold text-stone-900">BSc (Joint Honours) Physics and Philosophy</h3>
             <p className="text-stone-600">King’s College London (KCL), UK</p>
          </div>
        </div>
      </section>

      {/* Academic Appointments */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="text-stone-400" size={24} />
          <h2 className="text-2xl font-serif text-stone-900">Previous Appointments</h2>
        </div>
        <div className="space-y-6 pl-2 md:pl-9">
           <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2">
              <div className="text-sm font-mono text-stone-500">Sep - Oct 2021</div>
              <div>
                <h3 className="font-semibold text-stone-900">Visiting Scholar</h3>
                <p className="text-stone-600 text-sm">Università di Milano, Italy</p>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2">
              <div className="text-sm font-mono text-stone-500">Jan - Jun 2017</div>
              <div>
                <h3 className="font-semibold text-stone-900">Undergraduate Researcher (LIGO Project)</h3>
                <p className="text-stone-600 text-sm">Kavli Institute for Cosmological Physics, USA</p>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2">
              <div className="text-sm font-mono text-stone-500">Jun - Aug 2016</div>
              <div>
                <h3 className="font-semibold text-stone-900">Visiting Researcher</h3>
                <p className="text-stone-600 text-sm">Max-Planck-Institut für Gravitationsphysik, Germany</p>
              </div>
           </div>
        </div>
      </section>

      {/* Honours & Grants */}
       <section>
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-stone-400" size={24} />
            <h2 className="text-2xl font-serif text-stone-900">Honours & Awards</h2>
          </div>
          <ul className="space-y-4 pl-2 md:pl-9">
            <li className="pb-4 border-b border-stone-100 last:border-0 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-stone-800">Simons Foundation Grant (Award #457687)</h3>
              </div>
              <span className="text-xs font-mono text-stone-400 whitespace-nowrap ml-4">Jan 2025</span>
            </li>
            <li className="pb-4 border-b border-stone-100 last:border-0 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-stone-800">Princeton Physics Postdoctoral Fellowship</h3>
              </div>
              <span className="text-xs font-mono text-stone-400 whitespace-nowrap ml-4">2023</span>
            </li>
            <li className="pb-4 border-b border-stone-100 last:border-0 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-stone-800">Education, Diversity and Inclusion (EDI) Fellowship</h3>
                <p className="text-sm text-stone-500">Princeton University</p>
              </div>
              <span className="text-xs font-mono text-stone-400 whitespace-nowrap ml-4">2024</span>
            </li>
            <li className="pb-4 border-b border-stone-100 last:border-0 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-stone-800">Kavli/IPMU PhD Fellowship</h3>
              </div>
              <span className="text-xs font-mono text-stone-400 whitespace-nowrap ml-4">2019</span>
            </li>
            <li className="pb-4 border-b border-stone-100 last:border-0 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-stone-800">European Space Agency Award</h3>
                <p className="text-sm text-stone-500">First prize, Technology Transfer Workshop, Belgium</p>
              </div>
              <span className="text-xs font-mono text-stone-400 whitespace-nowrap ml-4">2018</span>
            </li>
          </ul>
       </section>

       {/* Major Collaborations */}
       <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-stone-400" size={24} />
            <h2 className="text-2xl font-serif text-stone-900">Major Collaborations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2 md:pl-9">
              <div className="bg-white p-5 border border-stone-200 rounded-sm shadow-sm">
                  <h3 className="font-serif text-lg text-stone-900 font-medium mb-1">Simons Observatory</h3>
                  <p className="text-xs text-stone-400 uppercase tracking-widest mb-3">300+ Members • 2019-Present</p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Co-Lead of B-mode and SAT Analysis Working Groups. Member of Theory and Analysis Committee.
                  </p>
              </div>
              <div className="bg-white p-5 border border-stone-200 rounded-sm shadow-sm">
                  <h3 className="font-serif text-lg text-stone-900 font-medium mb-1">LiteBIRD</h3>
                  <p className="text-xs text-stone-400 uppercase tracking-widest mb-3">200+ Members • 2019-Present</p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Active member of Systematics and Foregrounds analysis groups.
                  </p>
              </div>
              <div className="bg-white p-5 border border-stone-200 rounded-sm shadow-sm">
                  <h3 className="font-serif text-lg text-stone-900 font-medium mb-1">European Low Frequency Survey</h3>
                  <p className="text-xs text-stone-400 uppercase tracking-widest mb-3">~20 Members • 2022-Present</p>
              </div>
              <div className="bg-white p-5 border border-stone-200 rounded-sm shadow-sm">
                  <h3 className="font-serif text-lg text-stone-900 font-medium mb-1">QUBIC</h3>
                  <p className="text-xs text-stone-400 uppercase tracking-widest mb-3">50+ Members • 2018-2023</p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Past member: building and testing cryogenic systems.
                  </p>
              </div>
          </div>
       </section>

       {/* Teaching & Advising */}
       <section>
        <div className="flex items-center gap-3 mb-8">
          <Users className="text-stone-400" size={24} />
          <h2 className="text-2xl font-serif text-stone-900">Teaching & Mentoring</h2>
        </div>
        <div className="space-y-10 pl-2 md:pl-9">
          
          {/* Advising */}
          <div>
            <h3 className="text-lg font-semibold text-stone-800 mb-5 border-b border-stone-100 pb-2 uppercase tracking-wider text-sm">Advising</h3>
            <ul className="space-y-6">
               <li className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2">
                 <span className="text-sm font-mono text-stone-500">Sep 2023 - Present</span>
                 <div>
                   <span className="font-semibold text-stone-900 text-lg">Yiqi Andrew Liu</span>
                   <span className="text-stone-600"> (PhD Student, Princeton)</span>
                   <p className="text-sm text-stone-500 mt-1">Co-advised with Jo Dunkley</p>
                 </div>
               </li>
               <li className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2">
                 <span className="text-sm font-mono text-stone-500">Sep 2024 - Present</span>
                 <div>
                   <span className="font-semibold text-stone-900 text-lg">Claire Rigouzzo</span>
                   <span className="text-stone-600"> (PhD Student, King's College London)</span>
                 </div>
               </li>
               <li className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2">
                 <span className="text-sm font-mono text-stone-500">Sep 2025 - Present</span>
                 <div>
                   <span className="font-semibold text-stone-900 text-lg">Teodor Grosu</span>
                   <span className="text-stone-600"> (Undergraduate, Princeton)</span>
                   <p className="text-sm text-stone-500 mt-1">Senior Thesis (12 months)</p>
                 </div>
               </li>
                <li className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2">
                 <span className="text-sm font-mono text-stone-500">Aug 2025 - Present</span>
                 <div>
                   <span className="font-semibold text-stone-900 text-lg">Heidi Gubser</span>
                   <span className="text-stone-600"> (Undergraduate, Princeton)</span>
                   <p className="text-sm text-stone-500 mt-1">Summer Project & Junior Thesis</p>
                 </div>
               </li>
            </ul>
          </div>

          {/* Teaching */}
          <div>
             <h3 className="text-lg font-semibold text-stone-800 mb-5 border-b border-stone-100 pb-2 uppercase tracking-wider text-sm">Teaching</h3>
             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2">
                   <span className="text-sm font-mono text-stone-500">Apr 2025</span>
                   <div>
                     <h4 className="font-semibold text-stone-900 text-lg">Guest Lecturer</h4>
                     <p className="text-stone-600">Princeton University, USA</p>
                     <p className="text-sm text-stone-500 italic mt-1">Course: Astrophysical Sciences 203</p>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2">
                   <span className="text-sm font-mono text-stone-500">2021 - 2023</span>
                   <div>
                     <h4 className="font-semibold text-stone-900 text-lg">Tutor of Physics</h4>
                     <p className="text-stone-600">St Peter's College, University of Oxford, UK</p>
                     <p className="text-sm text-stone-500 italic mt-1">Taught Undergraduate Electromagnetism, Optics, Circuit theory</p>
                   </div>
                </div>
             </div>
          </div>

           {/* Science Comm / Mentoring */}
          <div>
             <h3 className="text-lg font-semibold text-stone-800 mb-5 border-b border-stone-100 pb-2 uppercase tracking-wider text-sm">Outreach & Mentoring</h3>
             <ul className="space-y-3 text-stone-600">
                <li className="flex gap-3">
                   <span className="text-stone-300 mt-1.5 h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0"></span>
                   <span><strong>Princeton Physics Mentorship (PPM):</strong> Mentored four undergraduate students (2023 - 2025).</span>
                </li>
                <li className="flex gap-3">
                   <span className="text-stone-300 mt-1.5 h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0"></span>
                   <span><strong>Oxford Physics Gender Equity Network (OPGEN):</strong> Mentored one undergraduate student (2021 - 2022).</span>
                </li>
                <li className="flex gap-3">
                   <span className="text-stone-300 mt-1.5 h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0"></span>
                   <span><strong>Princeton EDI outreach:</strong> Organizer for "Zoom a Princeton Physicist" (ZAPP) (2024 - 2025).</span>
                </li>
                <li className="flex gap-3">
                   <span className="text-stone-300 mt-1.5 h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0"></span>
                   <span><strong>High School Outreach:</strong> Organized class "Calculating the Age of the Universe", Oxford (July 2021).</span>
                </li>
             </ul>
          </div>

        </div>
      </section>

       {/* Professional Activities */}
       <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-stone-400" size={24} />
            <h2 className="text-2xl font-serif text-stone-900">Professional Activities</h2>
          </div>
          <ul className="space-y-4 pl-2 md:pl-9 text-sm text-stone-600">
             <li className="flex gap-3">
               <span className="font-bold text-stone-900 min-w-[120px]">Reviewer</span>
               <span>Proposal Reviewer for the National Science Foundation (NSF) (2025)</span>
             </li>
             <li className="flex gap-3">
               <span className="font-bold text-stone-900 min-w-[120px]">Referee</span>
               <span>A&A, JCAP, MNRAS (2021 - Present)</span>
             </li>
             <li className="flex gap-3">
               <span className="font-bold text-stone-900 min-w-[120px]">Organizer</span>
               <span>Simons Observatory SAT Analysis Hackathon (Princeton, 2025)</span>
             </li>
             <li className="flex gap-3">
               <span className="font-bold text-stone-900 min-w-[120px]">Organizer</span>
               <span>Cosmology lunch weekly meeting (Princeton, 2023-Present)</span>
             </li>
             <li className="flex gap-3">
               <span className="font-bold text-stone-900 min-w-[120px]">Organizer</span>
               <span>BIPAC Cosmology weekly meeting (Oxford, 2021-2023)</span>
             </li>
          </ul>
       </section>
    </div>
  );
};

export default CV;