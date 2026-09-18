import { useState, useEffect, FormEvent } from 'react';
import { X, User, Truck, Store, FileText, ShieldCheck, Landmark } from 'lucide-react';
import { CartLine, CustomerDetails } from '../types';
import { BANKING_DETAILS, DELIVERY_FEE_ZAR } from '../data/clothingData';
import { formatZAR } from '../utils/order';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lines: CartLine[];
  subtotal: number;
  onSubmit: (customer: CustomerDetails) => void;
}

const EMPTY_CUSTOMER: CustomerDetails = {
  firstName: '',
  surname: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  province: 'Western Cape',
  postalCode: '',
  delivery: 'collect',
  notes: '',
};

const PROVINCES = [
  'Western Cape',
  'Eastern Cape',
  'Northern Cape',
  'Gauteng',
  'KwaZulu-Natal',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
];

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#7c0f1e] focus:bg-white transition-colors';

const labelClass = 'block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1';

export default function CheckoutModal({
  isOpen,
  onClose,
  lines,
  subtotal,
  onSubmit,
}: CheckoutModalProps) {
  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY_CUSTOMER);

  // Close on Escape and lock background scroll while open.
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

  const isCourier = customer.delivery === 'courier';
  const deliveryFee = isCourier ? DELIVERY_FEE_ZAR : 0;
  const total = subtotal + deliveryFee;

  const update = <K extends keyof CustomerDetails>(key: K, value: CustomerDetails[K]) =>
    setCustomer((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(customer);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 print:hidden">
      <div
        className="relative w-full max-w-3xl h-full sm:h-auto sm:max-h-[min(92vh,900px)] bg-white sm:rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — fixed, never scrolls */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-5 sm:px-6 py-4 bg-white border-b border-stone-200">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#7c0f1e] font-bold block">
              Secure Checkout
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-950 leading-tight">
              Your Details &amp; Order
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors shrink-0"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          {/* Scrolling body */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
          {/* ---- Personal details ---- */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
              <User className="w-4 h-4 text-[#7c0f1e]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                Personal Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="co-firstname">
                  Name
                </label>
                <input
                  id="co-firstname"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={customer.firstName}
                  onChange={(e) => update('firstName', e.target.value)}
                  placeholder="Christine"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="co-surname">
                  Surname
                </label>
                <input
                  id="co-surname"
                  type="text"
                  required
                  autoComplete="family-name"
                  value={customer.surname}
                  onChange={(e) => update('surname', e.target.value)}
                  placeholder="Botha"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="co-email">
                  Email Address
                </label>
                <input
                  id="co-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={customer.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="co-phone">
                  Phone / WhatsApp
                </label>
                <input
                  id="co-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={customer.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="078 000 0000"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* ---- Delivery method ---- */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
              <Truck className="w-4 h-4 text-[#7c0f1e]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                How would you like your order?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => update('delivery', 'collect')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  !isCourier
                    ? 'border-[#7c0f1e] bg-amber-50/70 shadow-xs'
                    : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Store className={`w-4 h-4 ${!isCourier ? 'text-[#7c0f1e]' : 'text-stone-500'}`} />
                  <span className="text-sm font-bold text-stone-900">Collect In Store</span>
                  <span className="ml-auto text-xs font-bold text-emerald-700">FREE</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Pick up at 21 Mimosa Street, Hermanus &mdash; and try everything on.
                </p>
              </button>

              <button
                type="button"
                onClick={() => update('delivery', 'courier')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  isCourier
                    ? 'border-[#7c0f1e] bg-amber-50/70 shadow-xs'
                    : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Truck className={`w-4 h-4 ${isCourier ? 'text-[#7c0f1e]' : 'text-stone-500'}`} />
                  <span className="text-sm font-bold text-stone-900">Courier Delivery</span>
                  <span className="ml-auto text-xs font-bold text-stone-700">
                    {formatZAR(DELIVERY_FEE_ZAR)}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Door-to-door anywhere in South Africa, 2&ndash;4 working days.
                </p>
              </button>
            </div>
          </section>

          {/* ---- Address ---- */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
              <Landmark className="w-4 h-4 text-[#7c0f1e]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                {isCourier ? 'Delivery Address' : 'Billing Address'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="co-address1">
                  Street Address
                </label>
                <input
                  id="co-address1"
                  type="text"
                  required={isCourier}
                  autoComplete="address-line1"
                  value={customer.addressLine1}
                  onChange={(e) => update('addressLine1', e.target.value)}
                  placeholder="12 Marine Drive"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="co-address2">
                  Suburb / Complex{' '}
                  <span className="text-stone-400 font-medium normal-case">(optional)</span>
                </label>
                <input
                  id="co-address2"
                  type="text"
                  autoComplete="address-line2"
                  value={customer.addressLine2}
                  onChange={(e) => update('addressLine2', e.target.value)}
                  placeholder="Voelklip"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="co-city">
                  Town / City
                </label>
                <input
                  id="co-city"
                  type="text"
                  required={isCourier}
                  autoComplete="address-level2"
                  value={customer.city}
                  onChange={(e) => update('city', e.target.value)}
                  placeholder="Hermanus"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="co-postal">
                  Postal Code
                </label>
                <input
                  id="co-postal"
                  type="text"
                  required={isCourier}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={customer.postalCode}
                  onChange={(e) => update('postalCode', e.target.value)}
                  placeholder="7200"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="co-province">
                  Province
                </label>
                <select
                  id="co-province"
                  value={customer.province}
                  onChange={(e) => update('province', e.target.value)}
                  className={`${inputClass} cursor-pointer font-medium`}
                >
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="co-notes">
                  Notes for Janine{' '}
                  <span className="text-stone-400 font-medium normal-case">(optional)</span>
                </label>
                <textarea
                  id="co-notes"
                  rows={2}
                  value={customer.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  placeholder="e.g. Please hold until Saturday, or gift wrap this order"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </section>

          {/* ---- Order summary ---- */}
          <section className="rounded-xl bg-stone-50 border border-stone-200 p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Order Summary
            </h3>

            <div className="space-y-2">
              {lines.map((line) => (
                <div key={line.item.id} className="flex items-start justify-between gap-3 text-xs">
                  <span className="text-stone-700 leading-snug">
                    {line.item.name}
                    <span className="text-stone-500">
                      {' '}
                      &times; {line.quantity}
                    </span>
                  </span>
                  <span className="font-semibold text-stone-900 whitespace-nowrap tabular-nums">
                    {formatZAR(line.item.priceZAR * line.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatZAR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>{isCourier ? 'Courier delivery' : 'Collection in store'}</span>
                <span className="tabular-nums">
                  {deliveryFee > 0 ? formatZAR(deliveryFee) : 'Free'}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-stone-200">
                <span className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Total
                </span>
                <span className="font-serif text-2xl font-bold text-[#7c0f1e] tabular-nums">
                  {formatZAR(total)}
                </span>
              </div>
            </div>
          </section>

          {/* ---- Payment note ---- */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
            <ShieldCheck className="w-4 h-4 text-[#7c0f1e] shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Payment is by <strong>EFT into Janine&rsquo;s {BANKING_DETAILS.bank} account</strong>.
              Your invoice on the next screen carries the full banking details and your payment
              reference. No card details are taken on this website.
            </span>
          </div>
          </div>

          {/* Pinned footer — total and submit stay reachable without scrolling */}
          <div className="shrink-0 border-t border-stone-200 bg-white px-5 sm:px-6 py-3.5">
            <div className="flex items-center justify-between gap-4">
              <div className="shrink-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Total to pay
                </span>
                <span className="font-serif text-2xl font-bold text-[#7c0f1e] tabular-nums leading-none">
                  {formatZAR(total)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="hidden sm:block px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors"
                >
                  Back to Bag
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#7c0f1e] hover:bg-[#911223] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Generate Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
