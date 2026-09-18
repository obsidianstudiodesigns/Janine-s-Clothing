import { useEffect, Fragment } from 'react';
import type { ReactElement } from 'react';
import { X, Scale, Printer } from 'lucide-react';
import { LEGAL_DOCS, LegalBlock, LegalDoc, LEGAL_LAST_UPDATED } from '../data/legal';

interface LegalModalProps {
  doc: LegalDoc | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}

/**
 * Renders text containing {{placeholders}} for facts the business still has to
 * supply, marking them clearly so they can never be mistaken for real details.
 */
function Placeholders({ text }: { text: string }) {
  const parts = text.split(/(\{\{[^}]*\}\})/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('{{') && part.endsWith('}}') ? (
          <mark
            key={i}
            className="bg-amber-200/80 text-amber-950 px-1 py-0.5 rounded font-semibold not-italic"
          >
            {part.slice(2, -2)}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

function BlockView({ block }: { block: LegalBlock }): ReactElement | null {
  switch (block.type) {
    case 'p':
      return (
        <p className="text-sm text-stone-700 leading-relaxed">
          <Placeholders text={block.text} />
        </p>
      );

    case 'ul':
      return (
        <ul className="space-y-1.5 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-stone-700 leading-relaxed">
              <span className="text-[#7c0f1e] mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[#7c0f1e]" />
              <span>
                <Placeholders text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol className="space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-stone-700 leading-relaxed">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#7c0f1e] text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>
                <Placeholders text={item} />
              </span>
            </li>
          ))}
        </ol>
      );

    case 'table':
      return (
        <div className="overflow-hidden rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <tbody>
              {block.rows.map(([label, value], i) => (
                <tr key={i} className={i % 2 ? 'bg-white' : 'bg-stone-50/70'}>
                  <th className="text-left align-top font-semibold text-stone-900 px-3.5 py-2.5 w-2/5 border-b border-stone-100">
                    <Placeholders text={label} />
                  </th>
                  <td className="align-top text-stone-700 px-3.5 py-2.5 border-b border-stone-100">
                    <Placeholders text={value} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'note':
      return (
        <div className="flex gap-2.5 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
          <Scale className="w-4 h-4 text-[#7c0f1e] shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed">
            <Placeholders text={block.text} />
          </p>
        </div>
      );

    default:
      return null;
  }
}

export default function LegalModal({ doc, onSelect, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!doc) return;

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
  }, [doc, onClose]);

  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 print:hidden">
      <div className="relative w-full max-w-4xl h-full sm:h-auto sm:max-h-[min(92vh,900px)] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-5 sm:px-6 py-4 bg-white border-b border-stone-200">
          <div className="min-w-0">
            <span className="text-[11px] uppercase tracking-widest text-[#7c0f1e] font-bold block">
              Legal &amp; Policies
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-950 leading-tight truncate">
              {doc.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex p-2 rounded-full bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
              aria-label="Print this policy"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
              aria-label="Close policies"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document switcher */}
        <div className="shrink-0 flex gap-1.5 overflow-x-auto px-5 sm:px-6 py-2.5 bg-stone-50 border-b border-stone-200 scrollbar-none">
          {LEGAL_DOCS.map((d) => (
            <button
              key={d.id}
              onClick={() => onSelect(d.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                d.id === doc.id
                  ? 'bg-[#7c0f1e] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {d.short}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-8 py-6">
          <p className="text-sm text-stone-600 leading-relaxed border-l-4 border-[#7c0f1e] pl-4 italic">
            {doc.summary}
          </p>
          <p className="text-[11px] text-stone-400 mt-2 pl-4">
            Last updated: {LEGAL_LAST_UPDATED}
          </p>

          <div className="mt-7 space-y-7">
            {doc.sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-stone-950 pb-1.5 border-b border-stone-200">
                  {section.heading}
                </h3>
                {section.blocks.map((block, i) => (
                  <Fragment key={i}>
                    <BlockView block={block} />
                  </Fragment>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-10 pt-5 border-t border-stone-200 text-[11px] text-stone-500 leading-relaxed">
            Anything highlighted{' '}
            <mark className="bg-amber-200/80 text-amber-950 px-1 rounded font-semibold">
              like this
            </mark>{' '}
            is a detail still to be confirmed by the business before this policy is relied upon.
            These documents are drafted to reflect South African law but are not legal advice, and
            should be reviewed by an attorney.
          </p>
        </div>
      </div>
    </div>
  );
}
