import { useState, useEffect, FormEvent } from 'react';
import { X, MessageCircle, MapPin } from 'lucide-react';
import { STORE_DETAILS } from '../data/clothingData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7c0f1e] focus:bg-white transition-colors';

const labelClass = 'block text-xs font-semibold text-stone-700 mb-1.5';

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /**
   * The form has one action, and it is real: it opens Janine's WhatsApp with
   * every field the customer filled in. There is no second "submit" button,
   * because there is no server here to submit to.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const readableDate = date
      ? new Date(date).toLocaleDateString('en-ZA', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : 'a date that suits you';

    const lines = [
      `Hi Janine, I would like to book a styling session at ${STORE_DETAILS.street}.`,
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Preferred date: ${readableDate}`,
      `Preferred time: ${time}`,
      ...(notes ? ['', `Looking for: ${notes}`] : []),
      '',
      'Please let me know if that works. Thank you!',
    ];

    window.open(
      `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 print:hidden">
      <div
        className="relative w-full max-w-lg h-full sm:h-auto sm:max-h-[min(92vh,760px)] bg-white sm:rounded-2xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-5 sm:px-6 py-4 border-b border-stone-200">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-950 leading-tight">
              Book a Styling Session
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              One-on-one time with Janine to find your dream outfit.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors shrink-0"
            aria-label="Close booking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-5 space-y-4">
            <div>
              <label className={labelClass} htmlFor="bk-name">
                Your name
              </label>
              <input
                id="bk-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Christine Botha"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="bk-phone">
                Phone / WhatsApp
              </label>
              <input
                id="bk-phone"
                type="tel"
                required
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="078 000 0000"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass} htmlFor="bk-date">
                  Preferred date
                </label>
                <input
                  id="bk-date"
                  type="date"
                  required
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="bk-time">
                  Preferred time
                </label>
                <select
                  id="bk-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="10:00">10:00 (morning)</option>
                  <option value="11:30">11:30 (mid-morning)</option>
                  <option value="14:00">14:00 (afternoon)</option>
                  <option value="15:30">15:30 (late afternoon)</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="bk-notes">
                What are you shopping for?{' '}
                <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              <input
                id="bk-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Gala gown, mother of the bride, winter coat…"
                className={inputClass}
              />
            </div>

            <p className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#7c0f1e] shrink-0 mt-0.5" />
              <span>
                Sessions are held at {STORE_DETAILS.street}, {STORE_DETAILS.town}. Janine will
                confirm your time on WhatsApp.
              </span>
            </p>
          </div>

          {/* Single, honest action */}
          <div className="shrink-0 border-t border-stone-200 px-5 sm:px-6 py-3.5">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Request on WhatsApp</span>
            </button>
            <p className="text-[11px] text-stone-500 text-center mt-2">
              Opens WhatsApp with your request ready to send.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
