import { CartLine, CustomerDetails, Order } from '../types';
import { STORE_DETAILS, BANKING_DETAILS, DELIVERY_FEE_ZAR } from '../data/clothingData';

const SEQ_KEY = 'janines_invoice_seq';

/** R 1 250 — non-breaking thin spaces keep the amount on one line. */
export function formatZAR(amount: number): string {
  return `R ${amount.toLocaleString('en-ZA')}`;
}

/** JC-20260918-004 — date-stamped, with a per-browser running sequence. */
function nextInvoiceNumber(): string {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('');

  let seq = 1;
  try {
    seq = parseInt(localStorage.getItem(SEQ_KEY) || '0', 10) + 1;
    localStorage.setItem(SEQ_KEY, String(seq));
  } catch {
    seq = Math.floor(Math.random() * 900) + 100;
  }

  return `JC-${stamp}-${String(seq).padStart(3, '0')}`;
}

export function createOrder(customer: CustomerDetails, lines: CartLine[]): Order {
  const subtotalZAR = lines.reduce((sum, l) => sum + l.item.priceZAR * l.quantity, 0);
  const deliveryZAR = customer.delivery === 'courier' ? DELIVERY_FEE_ZAR : 0;

  return {
    invoiceNumber: nextInvoiceNumber(),
    issuedAt: new Date().toISOString(),
    customer,
    lines,
    subtotalZAR,
    deliveryZAR,
    totalZAR: subtotalZAR + deliveryZAR,
  };
}

export function formatInvoiceDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function customerFullName(c: CustomerDetails): string {
  return `${c.firstName} ${c.surname}`.trim();
}

/** Multi-line order summary the customer sends straight to the shop's WhatsApp. */
export function buildWhatsAppMessage(order: Order): string {
  const { customer: c } = order;

  const itemLines = order.lines
    .map(
      (l, i) =>
        `${i + 1}. ${l.item.name}\n` +
        `   Size ${l.item.size} | Qty ${l.quantity} | ${formatZAR(l.item.priceZAR * l.quantity)}`
    )
    .join('\n');

  const address =
    c.delivery === 'courier'
      ? [c.addressLine1, c.addressLine2, c.city, c.province, c.postalCode]
          .filter(Boolean)
          .join(', ')
      : 'Collecting in store — 21 Mimosa Street, Hermanus';

  const parts = [
    `*NEW ORDER — ${order.invoiceNumber}*`,
    `${STORE_DETAILS.name}`,
    '',
    '*MY DETAILS*',
    `Name: ${customerFullName(c)}`,
    `Phone: ${c.phone}`,
    `Email: ${c.email}`,
    `${c.delivery === 'courier' ? 'Delivery address' : 'Collection'}: ${address}`,
    '',
    '*MY ITEMS*',
    itemLines,
    '',
    `Subtotal: ${formatZAR(order.subtotalZAR)}`,
    ...(order.deliveryZAR > 0 ? [`Delivery: ${formatZAR(order.deliveryZAR)}`] : []),
    `*TOTAL: ${formatZAR(order.totalZAR)}*`,
    '',
    ...(c.notes ? ['*NOTES*', c.notes, ''] : []),
    '*PAYMENT (EFT)*',
    `${BANKING_DETAILS.bank} · ${BANKING_DETAILS.accountType}`,
    `Acc: ${BANKING_DETAILS.accountNumber} · Branch: ${BANKING_DETAILS.branchCode}`,
    `Reference: ${order.invoiceNumber}`,
    '',
    'Please confirm availability and I will make payment. Thank you!',
  ];

  return parts.join('\n');
}

export function whatsappOrderLink(order: Order): string {
  return `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    buildWhatsAppMessage(order)
  )}`;
}
