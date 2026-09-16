import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, Navigation, Calendar } from 'lucide-react';
import { STORE_DETAILS } from '../data/clothingData';

interface VisitBoutiqueProps {
  onOpenBooking: () => void;
}

export default function VisitBoutique({ onOpenBooking }: VisitBoutiqueProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    interest: 'General Inquiry',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '', interest: 'General Inquiry' });
    }, 4000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    '21 Mimosa street, Hermanus, South Africa'
  )}`;

  return (
    <section id="visit" className="py-24 bg-[#0a0a0d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#590a16]/60 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Store Location & Inquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Visit Our Hermanus Boutique
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-3 max-w-xl mx-auto">
            Experience our personal fitting rooms, browse new arrivals, or contact Janine directly for styling inquiries.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Route + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business Details, Map Card & Hours */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quick Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#131317] border border-amber-500/30 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-stone-800">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Janine's Clothing</h3>
                  <p className="text-xs text-amber-400 font-semibold tracking-wider uppercase mt-0.5">
                    Hermanus, South Africa
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400/50 bg-white shrink-0">
                  <img src="./images/logo.jpg" alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#520914] text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-medium uppercase tracking-wider block">
                    Boutique Address
                  </span>
                  <p className="text-white font-serif text-lg font-semibold mt-0.5">
                    {STORE_DETAILS.street}
                  </p>
                  <p className="text-xs text-stone-300">
                    {STORE_DETAILS.town}, Western Cape, {STORE_DETAILS.country}
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-semibold mt-2 underline underline-offset-4"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps / Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4 pt-2">
                <div className="w-10 h-10 rounded-xl bg-[#520914] text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-stone-400 font-medium uppercase tracking-wider block">
                    Telephone & WhatsApp
                  </span>
                  <div className="flex items-center gap-3 flex-wrap">
                    <a
                      href={`tel:${STORE_DETAILS.phones[0].tel}`}
                      className="text-white hover:text-amber-300 font-medium text-sm transition-colors"
                    >
                      {STORE_DETAILS.phones[0].display} <span className="text-xs text-stone-400">(Landline)</span>
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${STORE_DETAILS.phones[1].tel}`}
                      className="text-white hover:text-amber-300 font-medium text-sm transition-colors"
                    >
                      {STORE_DETAILS.phones[1].display} <span className="text-xs text-emerald-400">(WhatsApp / Mobile)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pt-2">
                <div className="w-10 h-10 rounded-xl bg-[#520914] text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-medium uppercase tracking-wider block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${STORE_DETAILS.email}`}
                    className="text-white hover:text-amber-300 font-medium text-sm transition-colors"
                  >
                    {STORE_DETAILS.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="pt-4 border-t border-stone-800">
                <div className="flex items-center gap-2 text-amber-400 font-serif font-semibold text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Trading Hours</span>
                </div>
                <div className="space-y-2 text-xs">
                  {STORE_DETAILS.hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-stone-300 py-1 border-b border-stone-800/60 last:border-0">
                      <span className="font-medium">{h.days}</span>
                      <span className="text-amber-200/90">{h.times}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Private Fitting CTA Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-stone-900 to-[#2c050b] border border-amber-500/30 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-white text-base">Personal Styling Session</h4>
                <p className="text-xs text-stone-400 mt-0.5">Need a dedicated fitting or advice for an upcoming wedding or gala?</p>
              </div>
              <button
                onClick={onOpenBooking}
                className="px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-black shrink-0 transition-colors shadow-md"
              >
                Book Session
              </button>
            </div>
          </div>

          {/* Right Column: Contact & Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#131317] border border-amber-500/30 shadow-xl">
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-white">Send Janine a Message</h3>
                <p className="text-xs text-stone-400 mt-1">
                  Have a question about a specific dress, sizing, or trading hours? Leave a note below.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-white">Thank You for Reaching Out!</h4>
                  <p className="text-xs text-stone-300 max-w-sm mx-auto">
                    Janine has received your message and will respond promptly to your email or phone number.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400/80 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 078 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400/80 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400/80 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                      Subject of Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-200 focus:outline-none focus:border-amber-400/80 transition-colors cursor-pointer"
                    >
                      <option value="General Inquiry">General Boutique Inquiry</option>
                      <option value="Evening Couture Fitting">Evening Couture Fitting</option>
                      <option value="Shoes & Handbags Stock">Shoes & Handbags In-Stock</option>
                      <option value="Pre-Loved Consignment">Selling / Consigning Pre-Loved Luxury</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                      Your Message or Question
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us what items or sizes you are looking for..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400/80 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#790d1f] hover:bg-[#8f1226] border border-amber-400/50 shadow-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Send Message to Janine</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
