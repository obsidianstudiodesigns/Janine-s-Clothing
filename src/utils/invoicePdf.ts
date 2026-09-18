import type { jsPDF } from 'jspdf';
import { Order } from '../types';
import { STORE_DETAILS, BANKING_DETAILS } from '../data/clothingData';
import { formatZAR, formatInvoiceDate, customerFullName, whatsappOrderLink } from './order';

/**
 * Builds the invoice as a real PDF by drawing it, rather than rasterising the
 * DOM. Screenshotting the page (html2canvas / html-to-image) needs the browser
 * to decode an SVG of the whole invoice, which stalls in a backgrounded tab and
 * trips over Tailwind v4's oklch() colours. Drawing is deterministic, works
 * regardless of what the page is doing, and yields selectable text.
 */

const CRIMSON: [number, number, number] = [124, 15, 30];
const INK: [number, number, number] = [28, 25, 23];
const MUTED: [number, number, number] = [120, 113, 108];
const RULE: [number, number, number] = [214, 211, 209];
const AMBER_BG: [number, number, number] = [254, 248, 235];

const PAGE_W = 210;
const MARGIN = 16;
const CONTENT_W = PAGE_W - MARGIN * 2;

/** ZAR amounts: jsPDF's core fonts have no rand glyph issues, but the
 *  narrow no-break space from toLocaleString renders as a box, so normalise. */
function money(amount: number): string {
  return formatZAR(amount).replace(/ | /g, ' ');
}

function clean(text: string): string {
  return text
    .replace(/’/g, "'")
    .replace(/[‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/ | /g, ' ');
}

export async function buildInvoicePdf(order: Order): Promise<jsPDF> {
  const { jsPDF: JsPDF } = await import('jspdf');
  const doc = new JsPDF({ unit: 'mm', format: 'a4' });

  const { customer: c } = order;
  const isCourier = c.delivery === 'courier';
  let y = MARGIN;

  // ---------- Letterhead ----------
  doc.setFont('times', 'bold').setFontSize(24).setTextColor(...INK);
  doc.text(clean(STORE_DETAILS.name), MARGIN, y + 6);

  doc.setFont('helvetica', 'bold').setFontSize(7).setTextColor(146, 110, 27);
  doc.text('HERMANUS BOUTIQUE', MARGIN, y + 11);

  doc.setFont('helvetica', 'italic').setFontSize(8).setTextColor(...MUTED);
  doc.text(clean(STORE_DETAILS.tagline), MARGIN, y + 16);

  // Invoice badge, right aligned
  doc.setFillColor(...CRIMSON);
  doc.rect(PAGE_W - MARGIN - 34, y, 34, 7, 'F');
  doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor(255, 255, 255);
  doc.text('INVOICE', PAGE_W - MARGIN - 17, y + 4.9, { align: 'center' });

  doc.setFont('courier', 'bold').setFontSize(11).setTextColor(...INK);
  doc.text(order.invoiceNumber, PAGE_W - MARGIN, y + 13, { align: 'right' });

  doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(...MUTED);
  doc.text(formatInvoiceDate(order.issuedAt), PAGE_W - MARGIN, y + 18, { align: 'right' });

  y += 22;
  doc.setDrawColor(...CRIMSON).setLineWidth(1).line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;

  // ---------- From / Invoice To ----------
  const colR = MARGIN + CONTENT_W / 2 + 4;

  const heading = (label: string, x: number, yy: number) => {
    doc.setFont('helvetica', 'bold').setFontSize(7).setTextColor(...MUTED);
    doc.text(label, x, yy);
  };

  heading('FROM', MARGIN, y);
  heading('INVOICE TO', colR, y);
  y += 5;

  doc.setFont('times', 'bold').setFontSize(11).setTextColor(...INK);
  doc.text(clean(STORE_DETAILS.name), MARGIN, y);
  doc.text(clean(customerFullName(c)), colR, y);
  y += 5;

  doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(80, 74, 70);

  const storeLines = [
    `${STORE_DETAILS.street}, ${STORE_DETAILS.town}, ${STORE_DETAILS.postalCode}`,
    STORE_DETAILS.country,
    ...STORE_DETAILS.phones.map((p) => `${p.display} (${p.label})`),
    STORE_DETAILS.email,
  ];

  const addressLine = [c.addressLine1, c.addressLine2, c.city, c.province, c.postalCode]
    .filter(Boolean)
    .join(', ');

  const customerLines = [
    ...(addressLine ? doc.splitTextToSize(clean(addressLine), CONTENT_W / 2 - 4) : []),
    c.phone,
    c.email,
    isCourier ? 'Courier delivery' : 'Collection from store',
  ];

  const blockTop = y;
  storeLines.forEach((line, i) => doc.text(clean(line), MARGIN, blockTop + i * 4.4));
  customerLines.forEach((line, i) => doc.text(clean(line), colR, blockTop + i * 4.4));

  y = blockTop + Math.max(storeLines.length, customerLines.length) * 4.4 + 6;

  // ---------- Line items ----------
  const colQty = MARGIN + 116;
  const colPrice = MARGIN + 140;
  const colAmount = PAGE_W - MARGIN;

  doc.setDrawColor(...INK).setLineWidth(0.4).line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 4.5;

  doc.setFont('helvetica', 'bold').setFontSize(7).setTextColor(...MUTED);
  doc.text('ITEM', MARGIN, y);
  doc.text('QTY', colQty, y, { align: 'center' });
  doc.text('PRICE', colPrice, y, { align: 'right' });
  doc.text('AMOUNT', colAmount, y, { align: 'right' });
  y += 3;
  doc.setDrawColor(...INK).setLineWidth(0.4).line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 5;

  for (const line of order.lines) {
    // Start a new page if this row would run off the bottom.
    if (y > 240) {
      doc.addPage();
      y = MARGIN;
    }

    const nameLines: string[] = doc.splitTextToSize(clean(line.item.name), 108);

    doc.setFont('times', 'bold').setFontSize(10).setTextColor(...INK);
    nameLines.forEach((t, i) => doc.text(t, MARGIN, y + i * 4.4));

    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(...INK);
    doc.text(String(line.quantity), colQty, y, { align: 'center' });
    doc.text(money(line.item.priceZAR), colPrice, y, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.text(money(line.item.priceZAR * line.quantity), colAmount, y, { align: 'right' });

    let rowY = y + nameLines.length * 4.4;

    doc.setFont('helvetica', 'normal').setFontSize(7.5).setTextColor(...MUTED);
    doc.text(
      clean(`${line.item.subCategory} · Size ${line.item.size} · ${line.item.color}`),
      MARGIN,
      rowY
    );
    rowY += 3.6;

    doc.setTextColor(16, 122, 87);
    doc.text(clean(line.item.condition), MARGIN, rowY);
    rowY += 4;

    doc.setDrawColor(...RULE).setLineWidth(0.2).line(MARGIN, rowY, PAGE_W - MARGIN, rowY);
    y = rowY + 5;
  }

  // ---------- Totals ----------
  const totalsX = PAGE_W - MARGIN - 62;
  doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(...MUTED);

  doc.text('Subtotal', totalsX, y);
  doc.setTextColor(...INK);
  doc.text(money(order.subtotalZAR), colAmount, y, { align: 'right' });
  y += 5;

  doc.setTextColor(...MUTED);
  doc.text(isCourier ? 'Courier delivery' : 'Collection in store', totalsX, y);
  doc.setTextColor(...INK);
  doc.text(order.deliveryZAR > 0 ? money(order.deliveryZAR) : 'Free', colAmount, y, {
    align: 'right',
  });
  y += 4;

  doc.setDrawColor(...CRIMSON).setLineWidth(0.6).line(totalsX, y, PAGE_W - MARGIN, y);
  y += 6;

  doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor(...INK);
  doc.text('TOTAL DUE', totalsX, y);
  doc.setFont('times', 'bold').setFontSize(16).setTextColor(...CRIMSON);
  doc.text(money(order.totalZAR), colAmount, y + 1, { align: 'right' });
  y += 6;

  doc.setFont('helvetica', 'normal').setFontSize(7).setTextColor(...MUTED);
  doc.text('All prices in South African Rand (ZAR)', colAmount, y, { align: 'right' });
  y += 8;

  // ---------- Banking details ----------
  if (y > 225) {
    doc.addPage();
    y = MARGIN;
  }

  const boxH = 40;
  doc.setFillColor(...AMBER_BG);
  doc.rect(MARGIN, y, CONTENT_W, boxH, 'F');
  doc.setFillColor(...CRIMSON);
  doc.rect(MARGIN, y, CONTENT_W, 7, 'F');

  doc.setFont('helvetica', 'bold').setFontSize(8).setTextColor(255, 255, 255);
  doc.text('BANKING DETAILS FOR EFT PAYMENT', MARGIN + 3, y + 4.8);

  const fields: Array<[string, string]> = [
    ['ACCOUNT HOLDER', BANKING_DETAILS.accountHolder],
    ['BANK', BANKING_DETAILS.bank],
    ['ACCOUNT TYPE', BANKING_DETAILS.accountType],
    ['ACCOUNT NUMBER', BANKING_DETAILS.accountNumber],
    ['BRANCH CODE', BANKING_DETAILS.branchCode],
    ['PAYMENT REFERENCE', order.invoiceNumber],
  ];

  const cellW = CONTENT_W / 3;
  fields.forEach(([label, value], i) => {
    const cx = MARGIN + 3 + (i % 3) * cellW;
    const cy = y + 13 + Math.floor(i / 3) * 12;

    doc.setFont('helvetica', 'bold').setFontSize(6.5).setTextColor(...MUTED);
    doc.text(label, cx, cy);

    const isRef = label === 'PAYMENT REFERENCE';
    doc.setFont(isRef || label === 'ACCOUNT NUMBER' || label === 'BRANCH CODE' ? 'courier' : 'helvetica', 'bold');
    doc.setFontSize(9.5).setTextColor(...(isRef ? CRIMSON : INK));
    doc.text(clean(value), cx, cy + 4.6);
  });

  y += boxH + 5;

  doc.setFont('helvetica', 'normal').setFontSize(7.5).setTextColor(...MUTED);
  doc
    .splitTextToSize(
      clean(
        `Please use ${order.invoiceNumber} as your payment reference and send proof of payment to Janine on WhatsApp or to ${STORE_DETAILS.email}. Items are reserved for 48 hours pending payment.`
      ),
      CONTENT_W
    )
    .forEach((t: string, i: number) => doc.text(t, MARGIN, y + i * 3.6));
  y += 10;

  // ---------- Customer notes ----------
  if (c.notes) {
    doc.setFont('helvetica', 'bold').setFontSize(7).setTextColor(...MUTED);
    doc.text('NOTES FROM CUSTOMER', MARGIN, y);
    y += 4;
    doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(...INK);
    doc.splitTextToSize(clean(c.notes), CONTENT_W).forEach((t: string, i: number) => {
      doc.text(t, MARGIN, y + i * 4);
    });
    y += 10;
  }

  // ---------- Footer ----------
  doc.setFont('times', 'italic').setFontSize(10).setTextColor(...INK);
  doc.text(clean(`Thank you for shopping with ${STORE_DETAILS.name}`), PAGE_W / 2, 282, {
    align: 'center',
  });
  doc.setFont('helvetica', 'normal').setFontSize(7).setTextColor(...MUTED);
  doc.text(
    clean(
      `${STORE_DETAILS.street}, ${STORE_DETAILS.town} · ${STORE_DETAILS.phones[1].display} · ${STORE_DETAILS.email}`
    ),
    PAGE_W / 2,
    287,
    { align: 'center' }
  );

  return doc;
}

export function invoiceFileName(order: Order): string {
  return `${order.invoiceNumber}-Janines-Clothing.pdf`;
}

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export async function downloadInvoicePdf(order: Order): Promise<void> {
  const doc = await buildInvoicePdf(order);
  triggerDownload(doc.output('blob'), invoiceFileName(order));
}

export type SendOutcome = 'opened' | 'opened-without-pdf' | 'popup-blocked';

/**
 * Sends the order to the shop's WhatsApp.
 *
 * This deliberately does NOT use the Web Share API. Sharing a file opens the
 * device's "share with which app?" sheet, which makes the customer find
 * WhatsApp and then pick a chat — they can easily send the order to the wrong
 * person. Going straight to the shop's wa.me link always lands in Janine's
 * chat with the order already typed in.
 *
 * A wa.me link cannot carry an attachment, so the PDF is downloaded alongside
 * for the customer to attach; the order text alone is already complete.
 */
export async function sendInvoiceToStore(order: Order): Promise<SendOutcome> {
  // Open Janine's chat first and synchronously — after an await, the browser no
  // longer treats this as part of the click and the popup gets blocked.
  const chat = window.open(whatsappOrderLink(order), '_blank', 'noopener');
  const blocked = !chat;

  try {
    const blob = (await buildInvoicePdf(order)).output('blob');
    triggerDownload(blob, invoiceFileName(order));
  } catch {
    return blocked ? 'popup-blocked' : 'opened-without-pdf';
  }

  return blocked ? 'popup-blocked' : 'opened';
}

/** Direct link to the shop's chat, for rendering as a real anchor fallback. */
export function storeChatLink(order: Order): string {
  return whatsappOrderLink(order);
}
