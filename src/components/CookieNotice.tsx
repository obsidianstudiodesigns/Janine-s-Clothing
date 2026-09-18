import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'janines_cookie_notice';

interface CookieNoticeProps {
  onOpenPolicy: (id: string) => void;
}

/**
 * A notice, not a consent gate.
 *
 * This site sets no analytics, advertising or tracking storage — only the
 * local storage needed to keep a shopping bag working, which is strictly
 * necessary and does not require consent. Presenting a fake "Accept / Reject"
 * choice over storage we would keep using either way would be misleading, so
 * the banner tells the visitor what is stored and links to the full policy.
 *
 * If analytics or ad tooling is ever added, this must become a real opt-in
 * banner that blocks those scripts until the visitor agrees.
 */
export default function CookieNotice({ onOpenPolicy }: CookieNoticeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setIsVisible(true);
    } catch {
      // Storage blocked — showing the notice every visit is the safe default,
      // but a banner that can never be dismissed is worse, so stay quiet.
    }
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, LEGAL_NOTICE_VERSION);
    } catch {
      // Nothing to do — it will simply reappear next visit.
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[85] p-3 sm:p-4 print:hidden animate-in slide-in-from-bottom duration-300">
      <div className="max-w-4xl mx-auto bg-white border border-stone-300 rounded-2xl shadow-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-amber-100 border border-amber-200 shrink-0">
            <Cookie className="w-4 h-4 text-[#7c0f1e]" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-serif text-base font-bold text-stone-950 leading-tight">
              A quick note about your privacy
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed mt-1">
              We use no tracking or advertising cookies. This site only saves your shopping bag and
              wishlist in your own browser so they are still there when you return &mdash; that
              information never leaves your device. Read our{' '}
              <button
                onClick={() => onOpenPolicy('cookies')}
                className="text-[#7c0f1e] font-semibold underline hover:text-[#911223]"
              >
                Cookie Policy
              </button>{' '}
              and{' '}
              <button
                onClick={() => onOpenPolicy('privacy')}
                className="text-[#7c0f1e] font-semibold underline hover:text-[#911223]"
              >
                Privacy &amp; POPIA Notice
              </button>
              .
            </p>
          </div>

          <button
            onClick={dismiss}
            className="shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#7c0f1e] hover:bg-[#911223] transition-colors shadow-sm"
          >
            Got it
          </button>

          <button
            onClick={dismiss}
            className="shrink-0 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors sm:hidden"
            aria-label="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Bump this to re-show the notice after a material policy change. */
const LEGAL_NOTICE_VERSION = '2026-09-18';
