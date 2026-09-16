import { MessageCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/clothingData';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hi Janine! I'm browsing your website and would love to ask about your available ladies clothing and sizes in Hermanus."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white shadow-2xl border border-emerald-400/50 hover:scale-105 active:scale-95 transition-all duration-300"
        title="Chat with Janine on WhatsApp"
        aria-label="Chat with Janine on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
        </div>
        <div className="hidden sm:block text-left">
          <span className="block text-[10px] text-emerald-200 uppercase tracking-widest font-semibold leading-none">
            Chat with Janine
          </span>
          <span className="block text-xs font-bold text-white mt-0.5">
            WhatsApp Online
          </span>
        </div>
      </a>
    </div>
  );
}
