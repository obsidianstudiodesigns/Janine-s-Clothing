import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Clock } from 'lucide-react';
import { STORE_DETAILS } from '../data/clothingData';
import logoTrans from '../assets/images/logo trans.jpg';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  activeSection: string;
}

export default function Header({ onNavigate, onOpenBooking, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Collections', id: 'collections' },
    { label: 'Categories', id: 'categories' },
    { label: 'About Janine’s', id: 'about' },
    { label: 'Visit Hermanus', id: 'visit' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-stone-200'
            : 'bg-white/90 backdrop-blur-sm py-3.5 border-b border-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/80 shadow-md group-hover:scale-105 transition-transform duration-300 bg-white flex items-center justify-center p-0.5">
              <img
                src={logoTrans}
                alt="Janine's Clothing Hermanus"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-950 group-hover:text-[#7c0f1e] transition-colors leading-none">
                Janine's Clothing
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-amber-800 font-bold uppercase mt-1">
                Hermanus Boutique
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-[#7c0f1e] bg-amber-50/90 border border-amber-300/80 font-semibold shadow-xs'
                    : 'text-stone-700 hover:text-[#7c0f1e] hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action CTA & Contact */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#7c0f1e] hover:bg-[#921325] border border-amber-400/40 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Book a Styling</span>
            </button>
            <a
              href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine,%20I'd%20like%20to%20ask%20about%20your%20available%20stock%20today.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200 shadow-sm"
              title="Chat with Janine on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-toggle-btn"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-stone-200 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-amber-50 text-[#7c0f1e] font-semibold border-l-4 border-[#7c0f1e]'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#7c0f1e] hover:bg-[#8f1224] rounded-lg transition-colors shadow-md"
            >
              Book a Private Styling / Fitting
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${STORE_DETAILS.phones[0].tel}`}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-stone-100 text-stone-800 rounded-lg border border-stone-200 font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Store</span>
              </a>
              <a
                href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine,%20I'm%20contacting%20you%20from%20your%20website`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <p className="text-[11px] text-stone-500 text-center pt-2">
              📍 21 Mimosa Street, Hermanus, South Africa
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
