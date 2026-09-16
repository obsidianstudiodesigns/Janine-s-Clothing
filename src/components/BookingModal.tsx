import { useState, FormEvent } from 'react';
import { X, Calendar, Clock, CheckCircle2, MessageCircle, Phone, MapPin } from 'lucide-react';
import { STORE_DETAILS } from '../data/clothingData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  if (!isOpen) return null;

  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3500);
  };

  const directWhatsapp = () => {
    const text = encodeURIComponent(
      `Hi Janine! I would like to schedule a private styling session at 21 Mimosa Street for ${date || 'an upcoming date'} around ${time}. My name is ${name || 'a customer'}.`
    );
    window.open(`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#141419] border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 text-left">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">
            Personal Fitting & Styling
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Book a Boutique Session
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Reserve dedicated one-on-one time with Janine to find your dream dress, ballgown, or wardrobe revamp.
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-white">Session Requested!</h4>
            <p className="text-xs text-stone-300">
              Janine will confirm your booking time via WhatsApp or phone call. We look forward to welcoming you at 21 Mimosa Street!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Christine Botha"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400/80"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="078 000 0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400/80"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  Preferred Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-200 focus:outline-none focus:border-amber-400/80 cursor-pointer"
                >
                  <option value="10:00 AM">10:00 AM (Morning)</option>
                  <option value="11:30 AM">11:30 AM (Mid-Day)</option>
                  <option value="02:00 PM">02:00 PM (Afternoon)</option>
                  <option value="03:30 PM">03:30 PM (Late Afternoon)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-200 focus:outline-none focus:border-amber-400/80"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                What are you shopping for? (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Gala ballgown, mother of bride, winter coat, shoes"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400/80"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100 bg-[#720e1e] hover:bg-[#881224] border border-amber-400/50 shadow-lg transition-all"
              >
                Confirm Fitting Request
              </button>

              <button
                type="button"
                onClick={directWhatsapp}
                className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-600/40 transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Or Request Instantly on WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
