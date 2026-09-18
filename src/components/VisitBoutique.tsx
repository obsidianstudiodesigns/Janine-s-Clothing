import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, Navigation, Calendar } from 'lucide-react';
import { STORE_DETAILS } from '../data/clothingData';
import logoTrans from '../assets/images/logo trans.jpg';

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
    <section id="visit" className="py-24 bg-[#faf8f5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-950 tracking-tight">
            Visit Our Hermanus Boutique
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 max-w-xl mx-auto">
            Experience our personal fitting rooms, browse new arrivals, or contact Janine directly for styling inquiries.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Route + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business Details, Map Card & Hours */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quick Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-md space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-stone-200">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-950">Janine's Clothing</h3>
                  <p className="text-xs text-[#7c0f1e] font-bold tracking-wider uppercase mt-0.5">
                    Hermanus, South Africa
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#7c0f1e] bg-white p-1 shrink-0 flex items-center justify-center shadow-xs">
                  <img src={logoTrans} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#7c0f1e] flex items-center justify-center shrink-0 border border-stone-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block">
                    Boutique Address
                  </span>
                  <p className="text-stone-950 font-serif text-lg font-semibold mt-0.5">
                    {STORE_DETAILS.street}
                  </p>
                  <p className="text-xs text-stone-600">
                    {STORE_DETAILS.town}, Western Cape, {STORE_DETAILS.country}
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#7c0f1e] hover:text-[#911223] font-bold mt-2 underline underline-offset-4"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps / Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4 pt-2">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#7c0f1e] flex items-center justify-center shrink-0 border border-stone-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block">
                    Telephone & WhatsApp
                  </span>
                  <div className="flex items-center gap-3 flex-wrap">
                    <a
                      href={`tel:${STORE_DETAILS.phones[0].tel}`}
                      className="text-stone-900 hover:text-[#7c0f1e] font-semibold text-sm transition-colors"
                    >
                      {STORE_DETAILS.phones[0].display} <span className="text-xs text-stone-500 font-normal">(Landline)</span>
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${STORE_DETAILS.phones[1].tel}`}
                      className="text-emerald-700 hover:text-emerald-800 font-semibold text-sm transition-colors"
                    >
                      {STORE_DETAILS.phones[1].display} <span className="text-xs text-stone-500 font-normal">(WhatsApp / Mobile)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pt-2">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#7c0f1e] flex items-center justify-center shrink-0 border border-stone-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${STORE_DETAILS.email}`}
                    className="text-stone-900 hover:text-[#7c0f1e] font-semibold text-sm transition-colors"
                  >
                    {STORE_DETAILS.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex items-center gap-2 text-[#7c0f1e] font-serif font-bold text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Trading Hours</span>
                </div>
                <div className="space-y-2 text-xs">
                  {STORE_DETAILS.hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-stone-700 py-1 border-b border-stone-100 last:border-0">
                      <span className="font-semibold">{h.days}</span>
                      <span className="text-stone-900 font-medium">{h.times}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Private Fitting CTA Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#7c0f1e] to-[#590a16] text-white border border-amber-300/40 shadow-md flex items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-white text-base">Personal Styling Session</h4>
                <p className="text-xs text-amber-100 mt-0.5">Need a dedicated fitting or advice for an upcoming wedding or gala?</p>
              </div>
              <button
                onClick={onOpenBooking}
                className="px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-300 hover:bg-amber-200 text-stone-950 shrink-0 transition-colors shadow-sm"
              >
                Book Session
              </button>
            </div>
          </div>

          {/* Right Column: Contact & Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-md">
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-stone-950">Send Janine a Message</h3>
                <p className="text-xs text-stone-600 mt-1">
                  Have a question about a specific dress, sizing, or trading hours? Leave a note below.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-stone-900">Thank You for Reaching Out!</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Janine has received your message and will respond promptly to your email or phone number.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7c0f1e] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 078 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7c0f1e] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7c0f1e] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Subject of Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#7c0f1e] transition-colors cursor-pointer font-medium"
                    >
                      <option value="General Inquiry">General Boutique Inquiry</option>
                      <option value="Evening Couture Fitting">Evening Couture Fitting</option>
                      <option value="Shoes & Handbags Stock">Shoes & Handbags In-Stock</option>
                      <option value="Pre-Loved Consignment">Selling / Consigning Pre-Loved Luxury</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Your Message or Question
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us what items or sizes you are looking for..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7c0f1e] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#7c0f1e] hover:bg-[#911223] shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01]"
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
