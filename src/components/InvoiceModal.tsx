import { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  MessageCircle,
  Printer,
  Landmark,
  MapPin,
  Phone,
  Mail,
  Truck,
  Store,
} from 'lucide-react';
import { Order } from '../types';
import { STORE_DETAILS, BANKING_DETAILS } from '../data/clothingData';
import { formatZAR, formatInvoiceDate, customerFullName, whatsappOrderLink } from '../utils/order';
import logoTrans from '../assets/images/logo trans.jpg';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  // Escape to close; keep the page behind from scrolling.
  useEffect(() => {
    if (!order) return;

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
  }, [order, onClose]);

  if (!order) return null;

  const { customer: c } = order;
  const isCourier = c.delivery === 'courier';

  const addressLines = [c.addressLine1, c.addressLine2, c.city, c.province, c.postalCode].filter(
    Boolean
  );

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 print:static print:bg-transparent print:p-0 print:block print:overflow-visible">
      <div className="relative w-full max-w-3xl h-full sm:h-auto sm:max-h-[min(92vh,900px)] flex flex-col overflow-hidden sm:rounded-2xl print:h-auto print:max-h-none print:block print:overflow-visible print:max-w-none print:rounded-none">
        {/* Confirmation banner — screen only */}
        <div className="shrink-0 bg-emerald-600 text-white px-6 py-4 flex items-center gap-3 print:hidden">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <div className="flex-1">
            <h2 className="font-serif text-lg font-bold leading-tight">Order Received!</h2>
            <p className="text-xs text-emerald-50">
              Invoice {order.invoiceNumber} has been generated. Send it to Janine on WhatsApp below
              to confirm availability.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors shrink-0"
            aria-label="Close invoice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ============ THE INVOICE (scrolls on its own) ============ */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-white print:flex-none print:min-h-0 print:overflow-visible print:block">
        <div
          id="invoice-printable"
          className="bg-white shadow-2xl print:shadow-none border-x border-stone-200 print:border-0"
        >
          {/* Letterhead */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-5 px-6 sm:px-10 py-8 border-b-4 border-[#7c0f1e]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/80 bg-white shrink-0">
                <img
                  src={logoTrans}
                  alt="Janine's Clothing"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 leading-none">
                  {STORE_DETAILS.name}
                </h1>
                <p className="text-[10px] tracking-[0.25em] text-amber-800 font-bold uppercase mt-1.5">
                  Hermanus Boutique
                </p>
                <p className="text-[11px] text-stone-500 italic mt-1">{STORE_DETAILS.tagline}</p>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="inline-block px-3 py-1 rounded bg-[#7c0f1e] text-white text-xs font-bold uppercase tracking-[0.2em]">
                Invoice
              </div>
              <p className="font-mono text-base font-bold text-stone-950 mt-2 tracking-tight">
                {order.invoiceNumber}
              </p>
              <p className="text-xs text-stone-600 mt-0.5">{formatInvoiceDate(order.issuedAt)}</p>
            </div>
          </div>

          {/* From / To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 sm:px-10 py-6 border-b border-stone-200">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-2.5">
                From
              </h3>
              <p className="font-serif text-base font-bold text-stone-950">{STORE_DETAILS.name}</p>
              <div className="mt-1.5 space-y-1 text-xs text-stone-600">
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-3 h-3 text-[#7c0f1e] shrink-0 mt-0.5" />
                  <span>
                    {STORE_DETAILS.street}, {STORE_DETAILS.town}, {STORE_DETAILS.postalCode}
                    <br />
                    {STORE_DETAILS.country}
                  </span>
                </p>
                {STORE_DETAILS.phones.map((p) => (
                  <p key={p.tel} className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-[#7c0f1e] shrink-0" />
                    <span>
                      {p.display}
                      <span className="text-stone-400"> &middot; {p.label}</span>
                    </span>
                  </p>
                ))}
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#7c0f1e] shrink-0" />
                  <span className="break-all">{STORE_DETAILS.email}</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-2.5">
                Invoice To
              </h3>
              <p className="font-serif text-base font-bold text-stone-950">
                {customerFullName(c)}
              </p>
              <div className="mt-1.5 space-y-1 text-xs text-stone-600">
                {addressLines.length > 0 && (
                  <p className="flex items-start gap-1.5">
                    <MapPin className="w-3 h-3 text-[#7c0f1e] shrink-0 mt-0.5" />
                    <span>{addressLines.join(', ')}</span>
                  </p>
                )}
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#7c0f1e] shrink-0" />
                  <span>{c.phone}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#7c0f1e] shrink-0" />
                  <span className="break-all">{c.email}</span>
                </p>
                <p className="flex items-center gap-1.5 pt-1">
                  {isCourier ? (
                    <Truck className="w-3 h-3 text-[#7c0f1e] shrink-0" />
                  ) : (
                    <Store className="w-3 h-3 text-[#7c0f1e] shrink-0" />
                  )}
                  <span className="font-semibold text-stone-800">
                    {isCourier ? 'Courier delivery' : 'Collection from store'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Line items */}
          <div className="px-6 sm:px-10 py-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-600">
                    Item
                  </th>
                  <th className="pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-600 text-center w-14">
                    Qty
                  </th>
                  <th className="pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-600 text-right w-24">
                    Price
                  </th>
                  <th className="pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-600 text-right w-24">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.lines.map((line) => (
                  <tr key={line.item.id} className="border-b border-stone-150 align-top">
                    <td className="py-3 pr-3">
                      <p className="font-serif text-sm font-bold text-stone-950 leading-snug">
                        {line.item.name}
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {line.item.subCategory} &middot; Size {line.item.size} &middot;{' '}
                        {line.item.color}
                      </p>
                      <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                        {line.item.condition}
                      </p>
                    </td>
                    <td className="py-3 text-center text-sm text-stone-800 tabular-nums">
                      {line.quantity}
                    </td>
                    <td className="py-3 text-right text-sm text-stone-800 tabular-nums whitespace-nowrap">
                      {formatZAR(line.item.priceZAR)}
                    </td>
                    <td className="py-3 text-right text-sm font-bold text-stone-950 tabular-nums whitespace-nowrap">
                      {formatZAR(line.item.priceZAR * line.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mt-5">
              <div className="w-full sm:w-72 space-y-2">
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatZAR(order.subtotalZAR)}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>{isCourier ? 'Courier delivery' : 'Collection in store'}</span>
                  <span className="tabular-nums">
                    {order.deliveryZAR > 0 ? formatZAR(order.deliveryZAR) : 'Free'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2.5 border-t-2 border-[#7c0f1e]">
                  <span className="text-sm font-bold uppercase tracking-wider text-stone-900">
                    Total Due
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#7c0f1e] tabular-nums">
                    {formatZAR(order.totalZAR)}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 text-right">
                  All prices in South African Rand (ZAR)
                </p>
              </div>
            </div>
          </div>

          {/* Banking details */}
          <div className="mx-6 sm:mx-10 mb-6 rounded-xl border-2 border-[#7c0f1e]/25 bg-amber-50/60 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-[#7c0f1e] text-white">
              <Landmark className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-[0.15em]">
                Banking Details for EFT Payment
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                  Account Holder
                </p>
                <p className="text-sm font-bold text-stone-950">{BANKING_DETAILS.accountHolder}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                  Bank
                </p>
                <p className="text-sm font-bold text-stone-950">{BANKING_DETAILS.bank}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                  Account Type
                </p>
                <p className="text-sm font-bold text-stone-950">{BANKING_DETAILS.accountType}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                  Account Number
                </p>
                <p className="font-mono text-sm font-bold text-stone-950 tracking-wide">
                  {BANKING_DETAILS.accountNumber}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                  Branch Code
                </p>
                <p className="font-mono text-sm font-bold text-stone-950 tracking-wide">
                  {BANKING_DETAILS.branchCode}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                  Payment Reference
                </p>
                <p className="font-mono text-sm font-bold text-[#7c0f1e] tracking-wide">
                  {order.invoiceNumber}
                </p>
              </div>
            </div>

            <p className="px-5 pb-4 text-[11px] text-stone-600 leading-relaxed">
              Please use <strong className="text-stone-900">{order.invoiceNumber}</strong> as your
              payment reference and send proof of payment to Janine on WhatsApp or to{' '}
              <span className="break-all">{STORE_DETAILS.email}</span>. Items are reserved for 48
              hours pending payment.
            </p>
          </div>

          {/* Customer notes */}
          {c.notes && (
            <div className="mx-6 sm:mx-10 mb-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
              <p className="text-[10px] uppercase tracking-wider text-stone-500 font-bold mb-1">
                Notes from customer
              </p>
              <p className="text-xs text-stone-700 leading-relaxed">{c.notes}</p>
            </div>
          )}

          {/* Invoice footer */}
          <div className="px-6 sm:px-10 py-5 border-t border-stone-200 text-center">
            <p className="font-serif text-sm text-stone-800 italic">
              Thank you for shopping with {STORE_DETAILS.name}
            </p>
            <p className="text-[11px] text-stone-500 mt-1">{STORE_DETAILS.slogan}</p>
            <p className="text-[10px] text-stone-400 mt-2">
              {STORE_DETAILS.street}, {STORE_DETAILS.town} &middot;{' '}
              {STORE_DETAILS.phones[1].display} &middot; {STORE_DETAILS.email}
            </p>
          </div>
        </div>
        </div>

        {/* Actions — pinned, screen only */}
        <div className="shrink-0 bg-white border-t border-stone-200 px-5 sm:px-6 py-3 print:hidden">
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <a
              href={whatsappOrderLink(order)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Send Order to Janine on WhatsApp</span>
            </a>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 sm:flex-none py-3 px-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-[#7c0f1e] shrink-0" />
                <span>Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 sm:flex-none py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 text-center leading-snug mt-2">
            WhatsApp opens with your full order already typed in &mdash; just press send.
          </p>
        </div>
      </div>
    </div>
  );
}
