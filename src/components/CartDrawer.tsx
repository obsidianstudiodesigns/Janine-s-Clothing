import { useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartLine } from '../types';
import { formatZAR } from '../utils/order';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lines: CartLine[];
  subtotal: number;
  onSetQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  lines,
  subtotal,
  onSetQuantity,
  onRemove,
  onCheckout,
  onContinueShopping,
}: CartDrawerProps) {
  // Close on Escape, and stop the page behind the drawer from scrolling.
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

  return (
    <div className="fixed inset-0 z-[60] flex justify-end print:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <aside
        className="relative w-full max-w-md bg-[#faf8f5] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-[#7c0f1e] text-white shadow-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-stone-950 leading-tight">
                Your Shopping Bag
              </h2>
              <p className="text-[11px] text-stone-500">
                {lines.length === 0
                  ? 'No pieces selected yet'
                  : `${lines.length} ${lines.length === 1 ? 'piece' : 'pieces'} reserved for you`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart lines */}
        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-3">
            <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-stone-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">Your bag is empty</h3>
            <p className="text-xs text-stone-600 max-w-xs leading-relaxed">
              Browse our latest pre-loved arrivals and add the pieces you love. Every item is
              one-of-a-kind, so it is worth reserving early.
            </p>
            <button
              onClick={onContinueShopping}
              className="mt-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#7c0f1e] hover:bg-[#911223] transition-colors shadow-md"
            >
              Browse Collections
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {lines.map((line) => (
              <div
                key={line.item.id}
                className="flex gap-3 p-3 rounded-xl bg-white border border-stone-200 shadow-2xs"
              >
                <div className="w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src={line.item.image}
                    alt={line.item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-sm font-bold text-stone-950 leading-snug line-clamp-2">
                        {line.item.name}
                      </h3>
                      <button
                        onClick={() => onRemove(line.item.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                        aria-label={`Remove ${line.item.name} from cart`}
                        title="Remove from bag"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-[#7c0f1e] font-bold mt-0.5">
                      {line.item.subCategory} &middot; Size {line.item.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity stepper */}
                    <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg p-0.5">
                      <button
                        onClick={() => onSetQuantity(line.item.id, line.quantity - 1)}
                        className="p-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-stone-900 tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() => onSetQuantity(line.item.id, line.quantity + 1)}
                        className="p-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-serif text-base font-bold text-[#7c0f1e] leading-none">
                        {formatZAR(line.item.priceZAR * line.quantity)}
                      </div>
                      {line.quantity > 1 && (
                        <div className="text-[10px] text-stone-500 mt-0.5">
                          {formatZAR(line.item.priceZAR)} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Totals & checkout */}
        {lines.length > 0 && (
          <div className="shrink-0 bg-white border-t border-stone-200 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-600">Subtotal</span>
              <span className="font-serif text-2xl font-bold text-[#7c0f1e]">
                {formatZAR(subtotal)}
              </span>
            </div>

            <p className="text-[11px] text-stone-500 leading-relaxed">
              Delivery is calculated at checkout. Collection from 21 Mimosa Street is always free.
            </p>

            <button
              onClick={onCheckout}
              className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-[#7c0f1e] hover:bg-[#911223] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onContinueShopping}
              className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors"
            >
              Continue Shopping
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Every piece hand-inspected &amp; steamed by Janine</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
