import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = location.pathname === '/' ? 450 : 20;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/research', label: 'Research' },
    { path: '/publications', label: 'Publications' },
    // { path: '/cv', label: 'CV' },
    { path: '/talks', label: 'Talks' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-academic-50 text-stone-900 font-sans selection:bg-stone-200">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link 
            to="/" 
            className={`text-2xl font-serif font-bold tracking-tight transition-all duration-500 ${
               location.pathname === '/' && !isScrolled 
                 ? 'opacity-0 pointer-events-none -translate-y-2' 
                 : 'opacity-100 translate-y-0 text-stone-900'
            }`}
          >
            {PROFILE.name}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group py-2">
                <Link
                  to={link.path}
                  className={`text-sm font-medium tracking-wide hover:opacity-70 transition-all ${
                    location.pathname === link.path 
                      ? (location.pathname === '/' && !isScrolled ? 'text-white border-b border-white pb-0.5' : 'text-stone-900 border-b border-stone-900 pb-0.5')
                      : (location.pathname === '/' && !isScrolled ? 'text-white/80' : 'text-stone-600')
                  }`}
                >
                  {link.label.toUpperCase()}
                </Link>
                
                {link.label === 'Research' && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-stone-100 shadow-lg rounded-sm py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <Link 
                      to="/research/simulator" 
                      className="block px-4 py-2 text-xs font-bold tracking-widest uppercase text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                    >
                      Interactive Map
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden transition-colors ${location.pathname === '/' && !isScrolled ? 'text-white' : 'text-stone-900'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-center space-y-8 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-2xl font-serif font-medium ${
                location.pathname === link.path ? 'text-stone-900 underline underline-offset-4' : 'text-stone-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
          {children}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-stone-200 mt-auto bg-academic-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-stone-500 text-sm">
          <p>© {new Date().getFullYear()} {PROFILE.name}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href={PROFILE.scholarUrl} target="_blank" rel="noreferrer" className="hover:text-stone-900 transition-colors">Google Scholar</a>
            <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" className="hover:text-stone-900 transition-colors">GitHub</a>
            <a href={`mailto:${PROFILE.email}`} className="hover:text-stone-900 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;