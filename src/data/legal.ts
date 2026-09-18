import { STORE_DETAILS, BANKING_DETAILS, DELIVERY_FEE_ZAR } from './clothingData';

/**
 * Legal documents for the site.
 *
 * Facts the business still has to confirm are wrapped in {{double braces}} and
 * rendered as a highlighted placeholder, so nothing invented is ever presented
 * as though it were a real registered detail. Search for "{{" to find them all.
 */

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; rows: [string, string][] }
  | { type: 'note'; text: string };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  id: string;
  title: string;
  short: string;
  summary: string;
  sections: LegalSection[];
}

export const LEGAL_LAST_UPDATED = '18 September 2026';

const ADDRESS = `${STORE_DETAILS.street}, ${STORE_DETAILS.town}, ${STORE_DETAILS.postalCode}, Western Cape, ${STORE_DETAILS.country}`;

const REGULATOR = [
  'The Information Regulator (South Africa)',
  'JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001',
  'Email: complaints.IR@inforegulator.org.za',
  'Website: inforegulator.org.za',
].join(' · ');

/* ------------------------------------------------------------------ */
/* 1. Privacy / POPIA                                                  */
/* ------------------------------------------------------------------ */

const privacy: LegalDoc = {
  id: 'privacy',
  title: 'Privacy Policy & POPIA Notice',
  short: 'Privacy & POPIA',
  summary:
    'How we collect, use and protect your personal information under the Protection of Personal Information Act 4 of 2013.',
  sections: [
    {
      heading: '1. Who we are',
      blocks: [
        {
          type: 'p',
          text: `${STORE_DETAILS.name} ("we", "us", "our") is the responsible party for the personal information described in this notice, as that term is used in the Protection of Personal Information Act 4 of 2013 ("POPIA").`,
        },
        {
          type: 'table',
          rows: [
            ['Trading name', STORE_DETAILS.name],
            ['Legal entity', '{{sole proprietor / close corporation / (Pty) Ltd — confirm}}'],
            ['Registration number', '{{company or CC registration number, if registered}}'],
            ['VAT number', '{{VAT number, or state "Not a VAT vendor"}}'],
            ['Physical & registered address', ADDRESS],
            ['Telephone', STORE_DETAILS.phones.map((p) => p.display).join(' / ')],
            ['Email', STORE_DETAILS.email],
            ['Information Officer', '{{full name of the Information Officer}}'],
            ['Information Officer email', STORE_DETAILS.email],
          ],
        },
        {
          type: 'note',
          text: 'Under POPIA the head of a private body is automatically the Information Officer, and must be registered with the Information Regulator before acting in that capacity.',
        },
      ],
    },
    {
      heading: '2. What personal information we collect',
      blocks: [
        {
          type: 'p',
          text: 'We only collect information you give us yourself. We do not buy personal information, and we do not build profiles of visitors.',
        },
        {
          type: 'ul',
          items: [
            'Identity and contact details — your name, surname, email address and mobile number, when you place an order, request a fitting, or contact us.',
            'Delivery details — your street address, suburb, town, province and postal code, where you ask us to courier an order to you.',
            'Order details — the items you select, quantities, prices, your invoice number and any notes you add to your order.',
            'Correspondence — the content of WhatsApp messages, emails or phone calls between you and us.',
            'Technical information — your device sends an IP address and browser details to the servers that host this website, which is an unavoidable part of how the internet works.',
          ],
        },
        {
          type: 'note',
          text: 'We do not collect payment card details on this website. Payment is by EFT directly into our bank account, so your banking credentials never pass through this site.',
        },
      ],
    },
    {
      heading: '3. Where your information is stored',
      blocks: [
        {
          type: 'p',
          text: 'This is an important point, and it works in your favour. This website has no customer database. When you build a shopping bag and complete the checkout form:',
        },
        {
          type: 'ol',
          items: [
            'Your shopping bag is saved only in your own browser, on your own device, using browser local storage. We cannot see it.',
            'Your details are used, in your browser, to generate your invoice. They are not transmitted to us at that point.',
            'Nothing reaches us until you press the WhatsApp button and then send the message yourself. You remain in control until that moment.',
            'Once you send it, your order details sit in our WhatsApp chat history and in our own records of the sale.',
          ],
        },
        {
          type: 'p',
          text: 'You can erase everything this website has stored on your device at any time by clearing your browser data for this site, or by emptying your shopping bag.',
        },
      ],
    },
    {
      heading: '4. Why we process your information, and on what lawful basis',
      blocks: [
        {
          type: 'table',
          rows: [
            [
              'To confirm availability and fulfil your order',
              'Necessary to conclude or perform a contract with you (POPIA s11(1)(b)).',
            ],
            [
              'To issue your invoice and reconcile your EFT payment',
              'Necessary to perform the contract, and to comply with our tax and record-keeping obligations (POPIA s11(1)(b) and s11(1)(c)).',
            ],
            [
              'To arrange courier delivery',
              'Necessary to perform the contract (POPIA s11(1)(b)).',
            ],
            [
              'To answer your enquiries and book fittings',
              'Our legitimate interest in responding to you, and your consent in contacting us (POPIA s11(1)(f) and s11(1)(a)).',
            ],
            [
              'To keep accounting and tax records',
              'Legal obligation — the Tax Administration Act 28 of 2011 requires records to be kept for five years (POPIA s11(1)(c)).',
            ],
            [
              'To send you marketing about new arrivals',
              'Only with your consent, which you may withdraw at any time (POPIA s69).',
            ],
          ],
        },
        {
          type: 'note',
          text: 'Providing your details is voluntary. You are never obliged to give them to us — but without your name, contact number and delivery address we cannot confirm stock, invoice you, or deliver an order.',
        },
      ],
    },
    {
      heading: '5. Who we share your information with',
      blocks: [
        {
          type: 'p',
          text: 'We do not sell, rent or trade your personal information. We share it only where it is necessary:',
        },
        {
          type: 'ul',
          items: [
            'Courier companies — your name, address and contact number, only where you have chosen delivery, and only so that they can deliver your parcel.',
            'Our bank — to identify and reconcile your EFT payment against your invoice reference.',
            'Our accountant and SARS — as part of ordinary bookkeeping and tax compliance.',
            'Professional advisers or authorities — where we are legally obliged to disclose, or need to establish or defend a legal claim.',
          ],
        },
        {
          type: 'p',
          text: 'We require anyone who processes personal information on our behalf to keep it confidential and secure, as POPIA s21 requires of operators.',
        },
      ],
    },
    {
      heading: '6. Transfers outside South Africa',
      blocks: [
        {
          type: 'p',
          text: 'We do not deliberately transfer your personal information out of South Africa. Two ordinary features of this website do involve services based abroad, and you should know about them:',
        },
        {
          type: 'ul',
          items: [
            'WhatsApp — messages you send us are carried by WhatsApp Ireland Limited / Meta Platforms and are subject to their own privacy terms. WhatsApp messages are end-to-end encrypted in transit.',
            'Website hosting and fonts — this site is hosted on GitHub Pages and loads typefaces from Google Fonts. Both receive your IP address as a technical necessity of serving the page to you.',
          ],
        },
        {
          type: 'p',
          text: 'These transfers are permitted under POPIA s72 because they are necessary for the performance of a contract with you, or for the conclusion of a contract in your interest.',
        },
      ],
    },
    {
      heading: '7. How long we keep it',
      blocks: [
        {
          type: 'table',
          rows: [
            ['Invoices and sales records', 'Five years, as required by the Tax Administration Act 28 of 2011.'],
            ['WhatsApp and email correspondence', 'Up to {{choose a period, e.g. 24 months}} after your last contact with us, unless it relates to a sale.'],
            ['Enquiries that do not lead to a sale', 'Up to {{choose a period, e.g. 12 months}}.'],
            ['Marketing consent records', 'Until you withdraw consent, plus a record of the withdrawal itself.'],
            ['Data in your own browser', 'Until you clear it. It never expires on our side because we never receive it.'],
          ],
        },
        {
          type: 'p',
          text: 'When a retention period ends we delete or de-identify the information, unless the law requires us to keep it for longer.',
        },
      ],
    },
    {
      heading: '8. Your rights under POPIA',
      blocks: [
        { type: 'p', text: 'As a data subject you have the right to:' },
        {
          type: 'ul',
          items: [
            'Be told that we hold information about you, and to request access to it (s23). We may charge a prescribed fee for providing a copy.',
            'Request that we correct or delete information that is inaccurate, irrelevant, excessive, out of date, incomplete, misleading or unlawfully obtained (s24).',
            'Object, on reasonable grounds, to our processing of your information (s11(3)).',
            'Withdraw your consent at any time where processing is based on consent, without affecting processing already carried out.',
            'Refuse direct marketing, or tell us to stop at any time (s69).',
            'Not be subject to a decision based solely on automated processing. We do not make any such decisions.',
            'Complain to the Information Regulator, and to institute civil proceedings.',
          ],
        },
        {
          type: 'p',
          text: `To exercise any of these rights, contact our Information Officer at ${STORE_DETAILS.email} or on ${STORE_DETAILS.phones[1].display}. Requests for access or correction must be made on Form 2 under the Promotion of Access to Information Act 2 of 2000. We will respond within 30 days.`,
        },
      ],
    },
    {
      heading: '9. How we protect your information',
      blocks: [
        {
          type: 'ul',
          items: [
            'This website is served over HTTPS, so traffic between your device and the site is encrypted.',
            'The website holds no customer database that could be breached, because order details are never stored on a server.',
            'Devices and accounts used to run the business are protected by passwords and, where available, two-factor authentication.',
            'Access to customer information is limited to the owner and staff who need it to fulfil an order.',
            'Paper records, where kept, are stored securely at the shop.',
          ],
        },
        {
          type: 'p',
          text: 'If a security compromise affects your personal information, POPIA s22 requires us to notify both the Information Regulator and you as soon as reasonably possible after discovering it.',
        },
      ],
    },
    {
      heading: '10. Children',
      blocks: [
        {
          type: 'p',
          text: 'We do not knowingly collect the personal information of children under 18 without the consent of a competent person. If you believe a child has given us their information, contact us and we will delete it.',
        },
      ],
    },
    {
      heading: '11. Complaints',
      blocks: [
        {
          type: 'p',
          text: `Please raise any concern with us first — we would rather fix it directly. If you are not satisfied, you may complain to ${REGULATOR}.`,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 2. Cookies                                                          */
/* ------------------------------------------------------------------ */

const cookies: LegalDoc = {
  id: 'cookies',
  title: 'Cookie & Browser Storage Policy',
  short: 'Cookies',
  summary:
    'What this website stores on your device. In short: only what is needed to make your shopping bag work. No advertising or tracking cookies.',
  sections: [
    {
      heading: '1. The short version',
      blocks: [
        {
          type: 'p',
          text: 'This website does not set any advertising, analytics or tracking cookies. We do not use Google Analytics, we do not run advertising pixels, and we do not share your browsing behaviour with anyone.',
        },
        {
          type: 'p',
          text: 'What we do use is browser local storage — a small amount of space in your own browser — so that your shopping bag is still there when you come back. That information stays on your device and is never sent to us.',
        },
      ],
    },
    {
      heading: '2. Exactly what is stored',
      blocks: [
        {
          type: 'table',
          rows: [
            ['janines_cart', 'The item references and quantities in your shopping bag, so it survives a page refresh. Strictly necessary.'],
            ['janines_wishlist', 'The items you have marked with a heart. Strictly necessary for that feature.'],
            ['janines_invoice_seq', 'A counter so each invoice you generate gets a different number. Strictly necessary.'],
            ['janines_cookie_notice', 'A record that you have seen the notice at the bottom of the screen, so we do not show it every time. Strictly necessary.'],
          ],
        },
        {
          type: 'p',
          text: 'All four are first-party, stored by this site only, and readable only by this site. None of them identify you personally, and none of them are transmitted to our servers — because this site has no server that receives them.',
        },
      ],
    },
    {
      heading: '3. Why we show a notice rather than a consent pop-up',
      blocks: [
        {
          type: 'p',
          text: 'Consent is required for storage that is not strictly necessary — typically tracking and advertising. Everything this site stores is strictly necessary to provide a feature you have asked for, so the law does not require us to obtain your consent for it. We tell you about it anyway, because you are entitled to know what is on your device.',
        },
        {
          type: 'note',
          text: 'If analytics or advertising tools are ever added to this site, this policy must be updated and a proper opt-in consent banner put in place before those tools load.',
        },
      ],
    },
    {
      heading: '4. Third-party requests',
      blocks: [
        {
          type: 'p',
          text: 'Two external services are contacted when the page loads. Neither sets cookies on this site, but both necessarily receive your IP address:',
        },
        {
          type: 'ul',
          items: [
            'Google Fonts (fonts.googleapis.com, fonts.gstatic.com) — supplies the typefaces used on the site.',
            'GitHub Pages — hosts the website and serves the page to you.',
          ],
        },
        {
          type: 'p',
          text: 'Product photography may also load from third-party image hosts. Clicking a WhatsApp button hands you over to WhatsApp, which applies its own privacy terms.',
        },
      ],
    },
    {
      heading: '5. How to clear or block it',
      blocks: [
        {
          type: 'ul',
          items: [
            'Clear it: use your browser settings to clear site data or cookies for this website. Your bag and wishlist will be emptied.',
            'Block it: browsing in private or incognito mode discards everything when you close the window.',
            'Note that blocking storage will stop the shopping bag from remembering your items between visits.',
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 3. Terms & Conditions                                               */
/* ------------------------------------------------------------------ */

const terms: LegalDoc = {
  id: 'terms',
  title: 'Terms & Conditions of Sale',
  short: 'Terms & Conditions',
  summary:
    'The terms on which we sell to you, including the disclosures required by the Electronic Communications and Transactions Act 25 of 2002.',
  sections: [
    {
      heading: '1. Supplier information (ECTA section 43)',
      blocks: [
        {
          type: 'p',
          text: 'Section 43 of the Electronic Communications and Transactions Act 25 of 2002 ("ECTA") requires the following to be disclosed to you before you place an order:',
        },
        {
          type: 'table',
          rows: [
            ['Full legal name', '{{registered legal name, if different from the trading name}}'],
            ['Trading as', STORE_DETAILS.name],
            ['Legal status', '{{sole proprietor / close corporation / (Pty) Ltd — confirm}}'],
            ['Registration number', '{{company or CC registration number, if registered}}'],
            ['Physical address', ADDRESS],
            ['Telephone', STORE_DETAILS.phones.map((p) => `${p.display} (${p.label})`).join(' · ')],
            ['Email', STORE_DETAILS.email],
            ['Website', '{{your website address, e.g. https://…}}'],
            ['Directors / owner', '{{full name(s) of the owner or members}}'],
            ['Membership of self-regulatory bodies', '{{state any, or "None"}}'],
            ['Codes of conduct subscribed to', '{{state any, or "None"}}'],
          ],
        },
      ],
    },
    {
      heading: '2. These terms, and your agreement to them',
      blocks: [
        {
          type: 'p',
          text: 'By placing an order through this website you agree to these terms. Please read them before you submit your details. If you do not agree to them, do not place an order — you are welcome to visit the shop instead.',
        },
        {
          type: 'p',
          text: 'Nothing in these terms limits or excludes any right you have under the Consumer Protection Act 68 of 2008 ("CPA") or ECTA. Where any term conflicts with those Acts, the Acts prevail.',
        },
      ],
    },
    {
      heading: '3. Our stock is pre-loved and one of a kind',
      blocks: [
        {
          type: 'p',
          text: 'Almost everything we sell is second-hand. Each piece is individually sourced, inspected and steamed, and in most cases there is only one of it. This has three consequences you should understand:',
        },
        {
          type: 'ol',
          items: [
            'Items are described and priced on the basis that they are pre-loved. The condition of each piece is stated on its listing.',
            'Because stock is unique and also sold in the shop, an item shown as available online may already have been sold by the time your order reaches us.',
            'Photographs are of the actual item wherever possible, but screen colours vary and minor signs of wear consistent with the stated condition are to be expected.',
          ],
        },
        {
          type: 'note',
          text: 'Under CPA section 55(6), the implied warranty that goods are free of defects does not apply to a specific defect or condition that was disclosed to you and that you expressly agreed to accept. By buying an item described as pre-loved, in the stated condition, you accept it in that condition.',
        },
      ],
    },
    {
      heading: '4. How an order becomes a sale',
      blocks: [
        {
          type: 'p',
          text: 'This is important. Submitting the checkout form and sending us your order on WhatsApp is an offer to buy. It is not yet a binding sale, and it does not reserve the item.',
        },
        {
          type: 'ol',
          items: [
            'You add items to your bag and complete the checkout form.',
            'The website generates an invoice in your browser and opens WhatsApp with your order.',
            'You send us that message. Your offer reaches us at that point.',
            'We check that the items are still physically available.',
            'We confirm availability to you in writing. A binding sale comes into existence only at that moment.',
            'You pay by EFT using your invoice number as the reference.',
            'We release the goods for collection or hand them to the courier.',
          ],
        },
        {
          type: 'p',
          text: 'If an item has already sold, we will tell you promptly and refund in full any amount you have already paid for it, without deduction. We may also, at our discretion, offer you something similar.',
        },
      ],
    },
    {
      heading: '5. Prices and payment',
      blocks: [
        {
          type: 'ul',
          items: [
            'All prices are in South African Rand (ZAR) and include VAT where applicable. {{Confirm whether you are a VAT vendor. If not, state "We are not a registered VAT vendor and no VAT is charged."}}',
            'The price of an item is the price shown on its listing at the time you place your order.',
            `Delivery, where selected, is charged at ${DELIVERY_FEE_ZAR ? `R ${DELIVERY_FEE_ZAR}` : '{{delivery fee}}'} and is shown separately on your invoice. Collection from the shop is free.`,
            'We accept payment by EFT. We do not process card payments on this website and never ask for card details.',
            'Obvious pricing errors are not binding on us. If an item is listed at a price that is clearly wrong, we will contact you before accepting your order.',
          ],
        },
        {
          type: 'table',
          rows: [
            ['Account holder', BANKING_DETAILS.accountHolder],
            ['Bank', BANKING_DETAILS.bank],
            ['Account type', BANKING_DETAILS.accountType],
            ['Account number', BANKING_DETAILS.accountNumber],
            ['Branch code', BANKING_DETAILS.branchCode],
            ['Reference', 'Your invoice number'],
          ],
        },
        {
          type: 'note',
          text: 'Always check these banking details against your invoice, and phone us on a number you already have if anything looks different. We will never email or message you to say our banking details have changed.',
        },
      ],
    },
    {
      heading: '6. Reservation period',
      blocks: [
        {
          type: 'p',
          text: 'Once we confirm availability we will hold the items for you for 48 hours pending payment. If payment has not reflected within that period we may release the items for sale again, unless we have agreed otherwise with you in writing.',
        },
      ],
    },
    {
      heading: '7. Ownership and risk',
      blocks: [
        {
          type: 'p',
          text: 'Ownership of the goods passes to you once we have received payment in full. Risk passes to you on delivery, or on collection, whichever applies.',
        },
      ],
    },
    {
      heading: '8. Your right to cancel',
      blocks: [
        {
          type: 'p',
          text: 'Because you are buying without seeing the item in person, ECTA section 44 gives you a cooling-off right. This is set out in full in our Returns, Refunds & Exchanges policy, which forms part of these terms.',
        },
      ],
    },
    {
      heading: '9. Limitation of liability',
      blocks: [
        {
          type: 'p',
          text: 'To the maximum extent the law allows, and subject always to your rights under the CPA, we are not liable for indirect or consequential loss. Nothing in these terms excludes our liability for death or personal injury caused by our negligence, for fraud, or for any liability that cannot lawfully be excluded.',
        },
        {
          type: 'p',
          text: 'We take care to describe items accurately, but we do not warrant that the website will be uninterrupted or error-free.',
        },
      ],
    },
    {
      heading: '10. Intellectual property',
      blocks: [
        {
          type: 'p',
          text: 'The content of this website — text, photographs, the logo and the layout — belongs to us or is used with permission. You may not copy or reuse it commercially without our written consent. Brand names of items we resell belong to their respective owners, and their use is purely descriptive of the item on offer.',
        },
      ],
    },
    {
      heading: '11. Authenticity of designer items',
      blocks: [
        {
          type: 'p',
          text: 'Where an item is described by a brand name, we describe it in good faith on the basis of our own inspection. {{Confirm whether you wish to guarantee authenticity, and what happens if an item is later shown not to be genuine — for example a full refund on return.}}',
        },
      ],
    },
    {
      heading: '12. Complaints and disputes',
      blocks: [
        {
          type: 'p',
          text: `Please contact us first at ${STORE_DETAILS.email} or on ${STORE_DETAILS.phones[1].display}. We aim to acknowledge complaints within {{e.g. 2}} business days.`,
        },
        {
          type: 'p',
          text: 'If we cannot resolve matters, you may refer the dispute to the National Consumer Commission, or to a consumer court or an accredited ombud with jurisdiction. You do not lose any right to approach a court.',
        },
      ],
    },
    {
      heading: '13. General',
      blocks: [
        {
          type: 'ul',
          items: [
            'These terms are governed by the law of the Republic of South Africa.',
            'If any provision is found to be unenforceable, the rest continues to apply.',
            'We may update these terms. The version that applies to your purchase is the one published when you placed your order.',
            'We may not transfer your order to another business without telling you.',
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 4. Returns & refunds                                                */
/* ------------------------------------------------------------------ */

const returns: LegalDoc = {
  id: 'returns',
  title: 'Returns, Refunds & Exchanges',
  short: 'Returns & Refunds',
  summary:
    'Your cooling-off right under ECTA, your rights under the Consumer Protection Act, and how returns work for pre-loved items.',
  sections: [
    {
      heading: '1. Your 7-day cooling-off right (online orders only)',
      blocks: [
        {
          type: 'p',
          text: 'Because you bought without seeing the item in person, section 44 of ECTA gives you the right to cancel, for any reason and without penalty, within seven days after the day you receive the goods.',
        },
        {
          type: 'ul',
          items: [
            'You do not have to give us a reason.',
            'We refund the full purchase price within 30 days of the cancellation.',
            'The only cost you carry is the direct cost of returning the goods to us.',
            'The item must be returned in the same condition in which you received it, with any tags still attached.',
          ],
        },
        {
          type: 'note',
          text: 'This cooling-off right applies to orders placed through this website. It does not apply to items you bought in person at the shop, where you were able to inspect and try on the item before buying.',
        },
      ],
    },
    {
      heading: '2. Faulty, unsafe or misdescribed goods (CPA)',
      blocks: [
        {
          type: 'p',
          text: 'Section 56 of the CPA gives you an implied warranty of quality for six months after delivery. If goods are unsafe, defective, or not as described, you may return them and choose whether you want a refund, a replacement or a repair. The choice is yours, not ours, and we carry the cost of the return.',
        },
        {
          type: 'p',
          text: 'What counts as a defect for pre-loved clothing is narrower than for new clothing, and it is worth being clear about:',
        },
        {
          type: 'table',
          rows: [
            [
              'Covered',
              'A fault we did not disclose and you could not reasonably have known about — a broken zip, a hidden tear, a missing fastening, or an item that is materially not what it was described to be.',
            ],
            [
              'Not covered',
              'Wear that was disclosed in the listing and that you accepted, ordinary characteristics of a second-hand garment consistent with its stated condition, or damage caused after delivery.',
            ],
          ],
        },
        {
          type: 'note',
          text: 'This follows CPA section 55(6): where a specific condition or defect was disclosed to you and you expressly agreed to accept the item in that condition, the implied warranty does not apply to that particular defect. Every listing states the condition of the item for exactly this reason.',
        },
      ],
    },
    {
      heading: '3. Change of mind, and fit',
      blocks: [
        {
          type: 'p',
          text: 'Outside the 7-day cooling-off period, we are not obliged to accept a return simply because an item does not fit or you have changed your mind. {{Set your own goodwill policy here — for example: "As a courtesy we offer a credit note valid for 6 months on unworn items returned within 14 days, excluding earrings and swimwear."}}',
        },
        {
          type: 'p',
          text: 'Because our stock is one of a kind, a like-for-like exchange is usually not possible. We will normally offer a credit or a refund instead.',
        },
      ],
    },
    {
      heading: '4. Items we cannot accept back',
      blocks: [
        {
          type: 'p',
          text: 'For hygiene reasons, and consistent with CPA section 20(2)(d), we cannot accept the return of the following once the seal or packaging has been opened or the item has been worn, unless it is genuinely faulty:',
        },
        {
          type: 'ul',
          items: [
            'Pierced earrings and other pierced jewellery',
            'Swimwear and underwear',
            '{{Add anything else you want excluded, or delete this line}}',
          ],
        },
      ],
    },
    {
      heading: '5. How to return something',
      blocks: [
        {
          type: 'ol',
          items: [
            `Contact us first on ${STORE_DETAILS.phones[1].display} or at ${STORE_DETAILS.email}, quoting your invoice number.`,
            'Tell us what you are returning and why, so we know whether it is a cooling-off cancellation or a fault.',
            `Return the item to ${ADDRESS}, or arrange a courier with us.`,
            'Keep your proof of postage until the refund reflects.',
          ],
        },
        {
          type: 'p',
          text: 'Refunds are paid by EFT to the account the payment came from, within 30 days of a valid cancellation, or within a reasonable time for a CPA return.',
        },
      ],
    },
    {
      heading: '6. Goods damaged in transit',
      blocks: [
        {
          type: 'p',
          text: 'Please check your parcel on arrival. If it arrives damaged, tell us within {{e.g. 48 hours}} and send photographs of the packaging and the item. We will take the matter up with the courier and sort you out — that is our responsibility, not yours.',
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 5. Delivery                                                         */
/* ------------------------------------------------------------------ */

const delivery: LegalDoc = {
  id: 'delivery',
  title: 'Delivery & Collection',
  short: 'Delivery',
  summary: 'How and when you get your order, and what it costs.',
  sections: [
    {
      heading: '1. Collection from the shop',
      blocks: [
        {
          type: 'p',
          text: `Collection is free. Once we confirm your order is ready, collect it from ${ADDRESS} during trading hours:`,
        },
        { type: 'table', rows: STORE_DETAILS.hours.map((h) => [h.days, h.times] as [string, string]) },
        {
          type: 'p',
          text: 'Please bring your invoice number. We will hold a paid order for collection for {{e.g. 14 days}} unless we agree otherwise.',
        },
      ],
    },
    {
      heading: '2. Courier delivery',
      blocks: [
        {
          type: 'ul',
          items: [
            `Courier delivery within South Africa costs R ${DELIVERY_FEE_ZAR} per order.`,
            'We dispatch within {{e.g. 1–2}} business days of your payment reflecting.',
            'Expect delivery {{e.g. 2–4}} business days after dispatch to main centres, and longer to outlying areas.',
            'We deliver to street addresses only. {{Confirm whether you deliver to Postnet counters, lockers, or outside South Africa.}}',
            'Someone must be available to accept and sign for the parcel.',
          ],
        },
        {
          type: 'note',
          text: 'Delivery timeframes are estimates given in good faith and depend on the courier. Under CPA section 19, where no time is agreed we must deliver within a reasonable time. If we cannot deliver within the agreed or a reasonable period, you may cancel and receive a full refund.',
        },
      ],
    },
    {
      heading: '3. Incorrect addresses',
      blocks: [
        {
          type: 'p',
          text: 'Please check your delivery address carefully at checkout. If a parcel is returned to us because the address was wrong or nobody was available, we will contact you. A second delivery attempt will be charged again at the standard rate.',
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 6. PAIA manual                                                      */
/* ------------------------------------------------------------------ */

const paia: LegalDoc = {
  id: 'paia',
  title: 'PAIA Manual',
  short: 'PAIA Manual',
  summary:
    'Our manual under section 51 of the Promotion of Access to Information Act 2 of 2000, which every private body in South Africa must have.',
  sections: [
    {
      heading: '1. Purpose of this manual',
      blocks: [
        {
          type: 'p',
          text: 'The Promotion of Access to Information Act 2 of 2000 ("PAIA") gives effect to the constitutional right of access to information. Section 51 requires every private body to compile a manual describing the records it holds and how to request access to them. This is that manual.',
        },
        {
          type: 'note',
          text: 'The exemption that previously relieved small private bodies of this obligation lapsed on 31 December 2021. All private bodies, including sole proprietors, have been required to have a PAIA manual since 1 January 2022.',
        },
      ],
    },
    {
      heading: '2. Contact details of the Information Officer',
      blocks: [
        {
          type: 'table',
          rows: [
            ['Private body', STORE_DETAILS.name],
            ['Information Officer', '{{full name of the Information Officer}}'],
            ['Postal address', '{{postal address, if different from the street address}}'],
            ['Street address', ADDRESS],
            ['Telephone', STORE_DETAILS.phones.map((p) => p.display).join(' / ')],
            ['Email', STORE_DETAILS.email],
          ],
        },
      ],
    },
    {
      heading: '3. The PAIA Guide',
      blocks: [
        {
          type: 'p',
          text: 'The Information Regulator has compiled a guide, in terms of section 10 of PAIA, explaining how to use the Act. It is available from the Information Regulator in each official language, free of charge, at inforegulator.org.za, or on request from the Regulator at the address given below.',
        },
      ],
    },
    {
      heading: '4. Records we hold',
      blocks: [
        {
          type: 'table',
          rows: [
            ['Customer records', 'Invoices, order correspondence, delivery records, returns and refunds.'],
            ['Financial records', 'Bank statements, sales records, tax returns and supporting documents.'],
            ['Supplier and stock records', 'Purchase and consignment records for items we resell.'],
            ['Employment records', '{{Delete if you have no staff. Otherwise: contracts, payroll, leave records.}}'],
            ['Statutory records', '{{Registration documents, if the business is a registered entity.}}'],
          ],
        },
        {
          type: 'p',
          text: 'Records held under the following legislation, among others: the Consumer Protection Act 68 of 2008, the Electronic Communications and Transactions Act 25 of 2002, the Income Tax Act 58 of 1962, the Tax Administration Act 28 of 2011, the Value-Added Tax Act 89 of 1991 (if applicable), the Basic Conditions of Employment Act 75 of 1997 (if applicable) and POPIA.',
        },
      ],
    },
    {
      heading: '5. How to request a record',
      blocks: [
        {
          type: 'ol',
          items: [
            'Complete Form 2 of the PAIA Regulations, available from inforegulator.org.za.',
            'Provide enough detail to identify the record, and your contact details.',
            'State the form of access you want, and the manner in which you wish to be informed of the outcome.',
            'If you are requesting the record on behalf of someone else, attach proof of your authority.',
            `Send the completed form to our Information Officer at ${STORE_DETAILS.email}, or deliver it to ${ADDRESS}.`,
          ],
        },
        {
          type: 'p',
          text: 'You must identify the right you are seeking to exercise or protect, and explain why the record is required to exercise or protect it. We will decide within 30 days and notify you of the outcome. Where a request is refused, we will give reasons and explain your right to lodge a complaint with the Information Regulator or to apply to a court.',
        },
      ],
    },
    {
      heading: '6. Fees',
      blocks: [
        {
          type: 'p',
          text: 'A request fee and an access fee may be payable, as prescribed in the PAIA Regulations. We will notify you of any fee before processing the request, and you may lodge a complaint or appeal against the fee. No fee is payable for a request by a personal requester for a record containing their own personal information.',
        },
      ],
    },
    {
      heading: '7. Grounds for refusal',
      blocks: [
        {
          type: 'p',
          text: 'Access may be refused on the grounds set out in Chapter 4 of Part 3 of PAIA, including the mandatory protection of the privacy of a third party, the commercial information of a third party, confidential information, and records privileged from production in legal proceedings.',
        },
      ],
    },
    {
      heading: '8. Information Regulator',
      blocks: [
        { type: 'p', text: `Complaints may be submitted to ${REGULATOR}.` },
      ],
    },
  ],
};

export const LEGAL_DOCS: LegalDoc[] = [privacy, cookies, terms, returns, delivery, paia];

export function findLegalDoc(id: string | null): LegalDoc | null {
  if (!id) return null;
  return LEGAL_DOCS.find((d) => d.id === id) ?? null;
}
