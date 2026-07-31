/* ============================================================
   MIDAS — Black & Gold interactive prototype
   Vanilla JS, hash-routed, single file app logic.
   ============================================================ */

/* ---------------- Icon set (minimal line icons) ---------------- */
const ICON = {
  diamond: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3l3 6-3 12M15 3l-3 6 3 12"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22z"/><circle cx="12" cy="9.5" r="2.3"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 8h12l1 13H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`,
  swap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h13l-3-3M20 17H7l3 3"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a8 8 0 1 1-3.2-6.4L21 4l-1 4.4A7.9 7.9 0 0 1 21 12z"/></svg>`,
  help: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9.3 9a2.7 2.7 0 1 1 3.8 2.5c-.9.5-1.4 1-1.4 2"/><path d="M12 17h.01"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2.4 4.5 6 4a5.4 5.4 0 0 1 6 3 5.4 5.4 0 0 1 6-3c3.6.5 5.5 4 4 7.7C19.5 16.4 12 21 12 21z"/></svg>`,
  store: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9l1-5h14l1 5"/><path d="M4 9h16v11H4z"/><path d="M9 20v-6h6v6"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3 6.4 7 1-5 5 1.2 7-6.2-3.3L5.8 21.4 7 14.4l-5-5 7-1z"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 14a8 8 0 1 1 16 0"/><path d="M12 14l4-5"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></svg>`,
  coins: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>`,
  bank: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10l9-6 9 6"/><path d="M5 10v9M10 10v9M14 10v9M19 10v9M3 21h18"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="18" cy="9" r="2.6"/><path d="M15.5 14.2c2.8.4 5 2.4 5 5.8"/></svg>`,
  flag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 21V4"/><path d="M5 4h13l-3 4 3 4H5"/></svg>`,
  percent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 19L19 5"/><circle cx="7" cy="7" r="2.2"/><circle cx="17" cy="17" r="2.2"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l10 18H2z"/><path d="M12 9v5M12 17h.01"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 5.5v15"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.9 7.9 0 0 0 0-2l2-1.6-2-3.4-2.4.7a8 8 0 0 0-1.7-1L15 3h-4l-.3 2.7a8 8 0 0 0-1.7 1l-2.4-.7-2 3.4L6.6 11a7.9 7.9 0 0 0 0 2l-2 1.6 2 3.4 2.4-.7a8 8 0 0 0 1.7 1L10.7 21h4l.3-2.7a8 8 0 0 0 1.7-1l2.4.7 2-3.4z"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M21 16l-5.5-5.5L4 21"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 19h16"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.6"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12.5l4.5 4.5L19 7"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 3.5v5c0 5-3.4 8.5-8 9.5-4.6-1-8-4.5-8-9.5v-5z"/><path d="M9 12l2 2 4-4.5"/></svg>`,
};
function icon(name, cls){ return `<span class="${cls||''}" style="display:inline-flex">${ICON[name]||''}</span>`; }

/* ---------------- Formatting helpers ---------------- */
function bdt(n){ return 'BDT ' + Number(n).toLocaleString('en-US'); }
function pct(n){ return n + '%'; }
function grams(n){ return Number(n).toFixed(3).replace(/\.?0+$/, '') + ' g'; }
function goldCredited(payment){
  return payment.status === 'Confirmed' && payment.goldRate ? payment.amount / payment.goldRate : 0;
}
function installmentSummary(inst){
  const confirmed = inst.schedule.filter(payment=>payment.status === 'Confirmed');
  const goldOwned = confirmed.reduce((sum, payment)=>sum + goldCredited(payment), 0);
  const moneySpent = confirmed.reduce((sum, payment)=>sum + payment.amount, 0);
  const goldRemaining = Math.max(0, inst.targetGoldGrams - goldOwned);
  return {
    goldOwned,
    moneySpent,
    goldRemaining,
    progressPct: Math.min(100, (goldOwned / inst.targetGoldGrams) * 100),
  };
}

/* ---------------- Toast ---------------- */
let toastTimer = null;
function toast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.remove('show'), 2600);
}
window.toast = toast;

/* ---------------- Mock data ---------------- */
const DATA = {
  shops: [
    { id:'sh-01', name:'Aurelia Jewellers', area:'Dhanmondi, Dhaka', distance:'0.5 km', rating:4.8, reviews:126, verified:true },
    { id:'sh-02', name:'Raj Jewellers', area:'Mohammadpur, Dhaka', distance:'1.2 km', rating:4.6, reviews:98, verified:true },
    { id:'sh-03', name:'Gold & Co.', area:'Jigatola, Dhaka', distance:'1.8 km', rating:4.5, reviews:72, verified:true },
    { id:'sh-04', name:'Shahina Jewellers', area:'Elephant Road, Dhaka', distance:'2.4 km', rating:4.7, reviews:64, verified:true },
    { id:'sh-05', name:'Heritage Jewels', area:'Rajshahi', distance:null, rating:4.4, reviews:31, verified:false },
    { id:'sh-06', name:'Golden Trust', area:'Uttara, Dhaka', distance:'3.1 km', rating:4.9, reviews:210, verified:true },
  ],
  products: [
    { id:'p-01', name:'22K Gold Necklace', category:'Necklaces', shop:'Aurelia Jewellers', price:125000, weight:'12.45 g', purity:'22K', installment:true, minimumInstallment:5000 },
    { id:'p-02', name:'Gold Bangle (22K)', category:'Bangles', shop:'Raj Jewellers', price:78000, weight:'8.20 g', purity:'22K', installment:true, minimumInstallment:3000, image:'/images/gold-bangle-set.png' },
    { id:'p-03', name:'Gold Pendant (22K)', category:'Pendants', shop:'Gold & Co.', price:32000, weight:'4.10 g', purity:'22K', installment:true, minimumInstallment:1500 },
    { id:'p-04', name:'22K Gold Earrings', category:'Earrings', shop:'Shahina Jewellers', price:24500, weight:'3.05 g', purity:'22K', installment:true, minimumInstallment:1000 },
    { id:'p-05', name:'Gold Chain 22"', category:'Chains', shop:'Golden Trust', price:145000, weight:'15.60 g', purity:'22K', installment:true, minimumInstallment:5000, image:'/images/gold-chain.png' },
    { id:'p-06', name:'Bridal Set (21K)', category:'Bridal Sets', shop:'Aurelia Jewellers', price:310000, weight:'34.2 g', purity:'21K', installment:true, minimumInstallment:10000 },
    { id:'p-07', name:'Gold Ring, Solitaire Halo', category:'Rings', shop:'Raj Jewellers', price:56000, weight:'5.4 g', purity:'22K', installment:true, minimumInstallment:2500 },
    { id:'p-08', name:'Antique Coin Pendant', category:'Pendants', shop:'Gold & Co.', price:41000, weight:'5.9 g', purity:'22K', installment:true, minimumInstallment:2000 },
  ],
  installment: {
    shop:'Aurelia Jewellers', product:'Gold Necklace (22K)', verified:true,
    targetGoldGrams:12.45, purity:'22K', nextDue:'15 Aug 2025', nextAmount:10000,
    currentTrendlineRate:10150,
    schedule:[
      { n:1, due:'15 Apr 2025', amount:10000, goldRate:9520, status:'Confirmed' },
      { n:2, due:'15 May 2025', amount:10000, goldRate:9680, status:'Confirmed' },
      { n:3, due:'15 Jun 2025', amount:10000, goldRate:9810, status:'Confirmed' },
      { n:4, due:'15 Jul 2025', amount:20000, goldRate:10020, status:'Confirmed' },
      { n:5, due:'15 Aug 2025', amount:10000, status:'Scheduled' },
      { n:6, due:'15 Sep 2025', amount:20000, status:'Scheduled' },
      { n:7, due:'15 Oct 2025', amount:20000, status:'Scheduled' },
    ]
  },
  recentActivity: [
    { icon:'doc', title:'Payment recorded', meta:'Aurelia Jewellers · BDT 10,000', when:'1 Aug' },
    { icon:'store', title:'Shop visited', meta:'Raj Jewellers', when:'31 Jul' },
    { icon:'chat', title:'Message received', meta:'Gold & Co.', when:'30 Jul' },
  ],
  c2c: [
    { id:'c2c-01', title:'18K Gold Ring, 22g', listingType:'jewelry', price:28000, seller:'User_7842', area:'Uttara, Dhaka', status:'Reported', reason:'Misleading info' },
    { id:'c2c-02', title:'Gold Chain, 22"', listingType:'jewelry', price:145000, seller:'User_3190', area:'Mirpur, Dhaka', status:'Active', image:'/images/gold-chain.png' },
    { id:'c2c-03', title:'Diamond Pendant', listingType:'jewelry', price:38500, seller:'User_5521', area:'Banani, Dhaka', status:'Reported', reason:'Spam' },
    { id:'c2c-04', title:'Bangle Set, 2pc', listingType:'jewelry', price:64000, seller:'User_2210', area:'Dhanmondi, Dhaka', status:'Active', image:'/images/gold-bangle-set.png' },
    { id:'c2c-05', title:'2.5 g 22K MIDAS Gold', listingType:'owned-gold', weight:2.5, purity:'22K', price:25500, seller:'Rahman Khan', area:'Mohammadpur, Dhaka', status:'Active' },
    { id:'c2c-06', title:'5 g 22K MIDAS Gold', listingType:'owned-gold', weight:5, purity:'22K', price:50750, seller:'Tahmina Akter', area:'Dhanmondi, Dhaka', status:'Active' },
    { id:'c2c-07', title:'1.75 g 21K MIDAS Gold', listingType:'owned-gold', weight:1.75, purity:'21K', price:16800, seller:'Mehedi Hasan', area:'Mirpur, Dhaka', status:'Active' },
  ],
  shopStats: { activeAgreements:48, pendingConfirmations:7, ordersInPrep:12, commissionDue:18500 },
  confirmQueue: [
    { customer:'User', agreement:'AG-2025-0481', amount:25000, date:'May 23, 2025 · 10:15 AM' },
    { customer:'Rahman Khan', agreement:'AG-2025-0476', amount:18500, date:'May 23, 2025 · 09:42 AM' },
    { customer:'Tahmina Akter', agreement:'AG-2025-0472', amount:30000, date:'May 22, 2025 · 07:30 PM' },
    { customer:'Mehedi Hasan', agreement:'AG-2025-0468', amount:12000, date:'May 22, 2025 · 05:10 PM' },
    { customer:'Sadia Islam', agreement:'AG-2025-0463', amount:22000, date:'May 22, 2025 · 03:05 PM' },
  ],
  upcomingInstallments: [
    { customer:'User', agreement:'AG-2025-0481', due:'May 28, 2025', progress:'2 of 6', amount:25000 },
    { customer:'Rahman Khan', agreement:'AG-2025-0476', due:'May 29, 2025', progress:'3 of 8', amount:18500 },
    { customer:'Tahmina Akter', agreement:'AG-2025-0472', due:'May 30, 2025', progress:'2 of 5', amount:30000 },
    { customer:'Mehedi Hasan', agreement:'AG-2025-0468', due:'Jun 02, 2025', progress:'4 of 10', amount:12000 },
  ],
  purchaseRequests: [
    { customer:'User', product:'22K Gold Necklace, 12.45 g', type:'Installment', amount:150000, date:'May 23, 2025' },
    { customer:'Rahman Khan', product:'Gold Bangles Set, 2pc (28g)', type:'Direct', amount:95000, date:'May 22, 2025' },
    { customer:'Tahmina Akter', product:'Gold Pendant, 4.10 g', type:'Installment', amount:42000, date:'May 22, 2025' },
  ],
  fulfillment: { accepted:15, prep:12, ready:8, delivered:23 },
  commissionSummary: { qualifyingSales:925000, pct:2.0, commission:18500, settlement:'Pending Settlement', expected:'Jun 05, 2025' },
  adminStats: { customers:5248, shops:126, agreements:1842, disputes:23, commissionDue:485000 },
  approvalQueue: [
    { shop:'Shine Gold Store', area:'Uttara, Dhaka', docs:'4/5', submitted:'May 18, 2025 10:21 AM', risk:'Low' },
    { shop:'Elegant Jewels', area:'Mirpur, Dhaka', docs:'5/5', submitted:'May 18, 2025 09:47 AM', risk:'Low' },
    { shop:'Royal Ornaments', area:'Chattogram', docs:'3/5', submitted:'May 18, 2025 09:12 AM', risk:'Medium' },
    { shop:'Crafted Gold', area:'Sylhet', docs:'3/5', submitted:'May 17, 2025 04:31 PM', risk:'High' },
    { shop:'Heritage Jewels', area:'Rajshahi', docs:'4/5', submitted:'May 17, 2025 02:08 PM', risk:'Medium' },
  ],
  alerts: [
    { label:'Overdue installment confirmations', count:12 },
    { label:'Reported C2C listings', count:18 },
    { label:'Commission statements awaiting reconciliation', count:8 },
    { label:'Unusual activity detected', count:4 },
  ],
  platformTx: [
    { id:'TRX-2025-0518-0001', parties:'Golden Trust ↔ Sparkle Jewels', type:'Installment', amount:120000, status:'Recorded', date:'May 18, 2025 11:03 AM' },
    { id:'TRX-2025-0518-0002', parties:'Diamond Corner ↔ Jewel Box', type:'Direct', amount:85500, status:'Submitted', date:'May 18, 2025 10:15 AM' },
    { id:'TRX-2025-0517-0098', parties:'Pearl Jewels ↔ Gold Haven', type:'Installment', amount:250000, status:'Confirmed', date:'May 17, 2025 04:22 PM' },
    { id:'TRX-2025-0517-0097', parties:'Shine Gold Store ↔ Buyer (C2C)', type:'C2C', amount:35000, status:'Disputed', date:'May 17, 2025 02:11 PM' },
    { id:'TRX-2025-0517-0096', parties:'Royal Ornaments ↔ Elegant Jewels', type:'Direct', amount:210000, status:'Confirmed', date:'May 17, 2025 12:42 PM' },
  ],
  commissionRecon: [
    { shop:'Golden Trust', period:'May 2025', sales:2450000, pct:2.0, commission:49000, settlement:'Not Settled' },
    { shop:'Sparkle Jewels', period:'May 2025', sales:1875000, pct:2.0, commission:37500, settlement:'Partially Settled' },
    { shop:'Pearl Jewels', period:'May 2025', sales:3120000, pct:2.0, commission:62400, settlement:'Not Settled' },
    { shop:'Diamond Corner', period:'May 2025', sales:1250000, pct:2.0, commission:25000, settlement:'Settled' },
    { shop:'Heritage Jewels', period:'May 2025', sales:980000, pct:2.0, commission:19600, settlement:'Not Settled' },
  ],
  disputeOverview: [ { label:'New', count:6 }, { label:'Under Review', count:9 }, { label:'Awaiting Partner Response', count:5 }, { label:'Escalated', count:2 }, { label:'Resolved (This Week)', count:18 } ],
  adminUsers: [
    { id:'USR-5248', name:'Midas Customer', contact:'customer@midas.bd', role:'Customer', joined:'Jul 28, 2026', agreements:2, status:'Active' },
    { id:'USR-5247', name:'Rahman Khan', contact:'rahman@example.com', role:'Customer', joined:'Jul 27, 2026', agreements:3, status:'Active' },
    { id:'USR-5246', name:'Tahmina Akter', contact:'tahmina@example.com', role:'Customer', joined:'Jul 26, 2026', agreements:1, status:'Active' },
    { id:'USR-5245', name:'Mehedi Hasan', contact:'mehedi@example.com', role:'Customer', joined:'Jul 25, 2026', agreements:4, status:'Suspended' },
    { id:'USR-5244', name:'Arif Rahman', contact:'shop@midas.bd', role:'Shop Owner', joined:'Jul 22, 2026', agreements:48, status:'Active' },
    { id:'USR-5243', name:'Sadia Islam', contact:'sadia@example.com', role:'Customer', joined:'Jul 20, 2026', agreements:2, status:'Pending' },
  ],
  adminShops: [
    { id:'SHP-0126', name:'Aurelia Jewellers', owner:'Arif Rahman', area:'Dhanmondi, Dhaka', products:24, agreements:48, verification:'Verified', status:'Active' },
    { id:'SHP-0125', name:'Raj Jewellers', owner:'Rafiq Ahmed', area:'Mohammadpur, Dhaka', products:18, agreements:35, verification:'Verified', status:'Active' },
    { id:'SHP-0124', name:'Gold & Co.', owner:'Nadia Karim', area:'Jigatola, Dhaka', products:16, agreements:27, verification:'Verified', status:'Active' },
    { id:'SHP-0123', name:'Shahina Jewellers', owner:'Shahina Begum', area:'Elephant Road, Dhaka', products:12, agreements:21, verification:'Verified', status:'Active' },
    { id:'SHP-0122', name:'Heritage Jewels', owner:'Fahim Chowdhury', area:'Rajshahi', products:9, agreements:6, verification:'Pending', status:'Under Review' },
    { id:'SHP-0121', name:'Golden Trust', owner:'Imran Hossain', area:'Uttara, Dhaka', products:31, agreements:57, verification:'Verified', status:'Active' },
  ],
  adminAgreements: [
    { id:'AG-2026-0481', customer:'Midas Customer', shop:'Aurelia Jewellers', product:'22K Gold Necklace', targetGold:12.45, ownedGold:5.1, plan:'2 years', status:'Active', updated:'Jul 30, 2026' },
    { id:'AG-2026-0476', customer:'Rahman Khan', shop:'Raj Jewellers', product:'Gold Bangle (22K)', targetGold:8.2, ownedGold:6.4, plan:'1 year', status:'Active', updated:'Jul 30, 2026' },
    { id:'AG-2026-0472', customer:'Tahmina Akter', shop:'Gold & Co.', product:'Gold Pendant (22K)', targetGold:4.1, ownedGold:4.1, plan:'6 months', status:'Completed', updated:'Jul 29, 2026' },
    { id:'AG-2026-0468', customer:'Mehedi Hasan', shop:'Golden Trust', product:'Gold Chain 22&quot;', targetGold:15.6, ownedGold:3.8, plan:'3 years', status:'Active', updated:'Jul 28, 2026' },
    { id:'AG-2026-0463', customer:'Sadia Islam', shop:'Shahina Jewellers', product:'22K Gold Earrings', targetGold:3.05, ownedGold:0, plan:'1 year', status:'Pending', updated:'Jul 27, 2026' },
    { id:'AG-2026-0459', customer:'Nusrat Jahan', shop:'Aurelia Jewellers', product:'Bridal Set (21K)', targetGold:34.2, ownedGold:19.6, plan:'5 years', status:'Paused', updated:'Jul 25, 2026' },
  ],
  auditLog: [
    { actor:'Admin User', action:'Approved shop', record:'Shine Gold Store', time:'May 18, 2025 10:31 AM' },
    { actor:'Admin User', action:'Updated agreement', record:'AG-2025-1841', time:'May 18, 2025 10:12 AM' },
    { actor:'Admin User', action:'Reconciled commission', record:'Golden Trust (May 2025)', time:'May 18, 2025 09:58 AM' },
    { actor:'Moderator_02', action:'Hid C2C listing', record:'C2C-77821', time:'May 18, 2025 09:47 AM' },
    { actor:'Admin User', action:'Changed user role', record:'partner_3321', time:'May 18, 2025 09:21 AM' },
  ],
};

/* ---------------- App / router state ---------------- */
const STATE = { role:'public', view:'', productModal:null, registrationRole:'customer' };
const FRONTEND_ACCOUNTS = {
  'customer@midas.bd': { password:'Midas@123', role:'customer', name:'Midas Customer' },
  'shop@midas.bd': { password:'Midas@123', role:'shop', name:'Aurelia Jewellers' },
  'admin@midas.bd': { password:'Midas@123', role:'admin', name:'Midas Admin' },
};

function go(role, view){
  document.body.classList.remove('sidebar-open');
  location.hash = '#/' + role + '/' + view;
}
window.go = go;

function parseHash(){
  const h = location.hash.replace('#/', '');
  const [role, ...rest] = h.split('/');
  return { role: role || 'public', view: rest.join('/') || '' };
}

function router(){
  document.body.classList.remove('sidebar-open');
  const { role, view } = parseHash();
  const protectedRoles = ['customer','shop','admin'];
  let session = null;
  try { session = JSON.parse(localStorage.getItem('midas-session') || 'null'); } catch(e) {}
  if(protectedRoles.includes(role) && !session){
    location.hash = '#/login';
    return;
  }
  if(protectedRoles.includes(role) && session.role !== role){
    location.hash = '#/' + session.role + '/dashboard';
    return;
  }
  STATE.role = role; STATE.view = view;
  const app = document.getElementById('app');
  try{
    if(role === 'public'){ app.innerHTML = renderPublic(view); }
    else if(role === 'login'){ app.innerHTML = renderLogin(); }
    else if(role === 'register'){ app.innerHTML = renderRegister(); }
    else if(role === 'customer'){ app.innerHTML = renderCustomerLayout(view); }
    else if(role === 'shop'){ app.innerHTML = renderShopLayout(view); }
    else if(role === 'admin'){ app.innerHTML = renderAdminLayout(view); }
    else { app.innerHTML = renderPublic('landing'); }
  }catch(e){
    console.error(e);
    app.innerHTML = `<div style="padding:60px;font-family:monospace;color:#a23b3b">Render error: ${e.message}</div>`;
  }
  window.scrollTo(0,0);
}
let started = false;
export function initializeLegacy(){
  if(started) return;
  started = true;
  window.addEventListener('hashchange', router);
  if(!location.hash) location.hash = '#/public/landing';
  router();
}

/* ============================================================
   PUBLIC SITE
   ============================================================ */
function pubHeader(){
  let session = null;
  try { session = JSON.parse(localStorage.getItem('midas-session') || 'null'); } catch(e) {}
  return `
  <div class="pub-header">
    <a class="u-flex u-gap-10 brand-home-link" href="#/public/landing" aria-label="MIDAS home">
      ${icon('diamond','')}<span style="font-family:var(--font-display);font-weight:700;font-size:20px;letter-spacing:.05em;color:var(--ivory)">MIDAS</span>
    </a>
    <nav class="pub-nav">
      <a href="#/public/landing">Home</a>
      <a href="#/public/marketplace">Marketplace</a>
      <a href="#/public/how-it-works">How it works</a>
      <a href="#/public/c2c">C2C Gold</a>
      <a href="#/public/partner">Become a Partner</a>
    </nav>
    <div class="pub-actions">
      ${session ? `<button class="btn btn-gold" onclick="go('${session.role}','dashboard')">My dashboard</button>` : `<button class="btn btn-ghost" style="color:var(--muted-2)" onclick="go('login','')">Log in</button><button class="btn btn-gold" onclick="go('register','')">Create account</button>`}
    </div>
  </div>`;
}

function pubFooter(){
  return `
  <div class="pub-footer">
    <div class="foot-top">
      <div style="max-width:280px">
        <a class="u-flex u-gap-10 brand-home-link" href="#/public/landing" style="margin-bottom:14px">${icon('diamond','')}<span style="font-family:var(--font-display);font-weight:700;font-size:19px;color:var(--ivory)">MIDAS</span></a>
        <p style="font-size:12.5px;line-height:1.7;color:var(--muted-2)">A location-aware marketplace connecting customers with approved partner jewelry shops. MIDAS records agreements and progress. It never receives, holds, or moves customer money.</p>
      </div>
      <div class="foot-cols">
        <div class="foot-col"><h4>Platform</h4><a href="#/public/marketplace">Marketplace</a><a href="#/public/c2c">C2C Gold</a><a href="#/public/partner">Become a Partner</a><a href="#/public/how-it-works">How it works</a></div>
        <div class="foot-col"><h4>Support</h4><a href="#/public/help">Non-custodial Payment Help</a><a href="#/public/help">C2C Safety Guide</a><a href="#/public/help">FAQ</a><a href="#/public/help">Contact support</a></div>
        <div class="foot-col"><h4>Company</h4><a href="#/public/legal">Legal &amp; policies</a><a href="#/public/legal">Privacy</a><a href="#/public/legal">Terms</a></div>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 MIDAS. Bangladesh · v3.1</span>
      <span>MIDAS is non-custodial. Payments are completed directly between customers and partner shops.</span>
    </div>
  </div>`;
}

function renderPublic(view){
  if(view === 'landing' || !view) return pubLanding();
  if(view === 'marketplace') return publicMarketplace();
  if(view === 'how-it-works') return publicHowItWorks();
  if(view === 'c2c') return publicC2C();
  if(view === 'partner') return publicPartner();
  if(view === 'help') return publicHelp();
  if(view === 'legal') return publicLegal();
  return publicNotFound();
}

function pubLanding(){
  return `
  ${pubHeader()}
  <section class="hero">
    <div class="hero-inner">
      <div>
        <h1>Gold ownership,<br/><em>recorded</em>, not held.</h1>
        <p>MIDAS connects you with verified partner jewelry shops nearby for direct or installment purchases. We track every agreement, payment record, and delivery, but your money always moves directly between you and the shop.</p>
        <div class="hero-note">
          ${icon('help','')} <span>MIDAS does not process, hold, guarantee, or refund money. All payments are made directly between customers and partner shops, outside the platform.</span>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hallmark-ring">
          <div class="hallmark-core">
            <div class="big">22K</div>
            <div class="small">Verified Purity</div>
          </div>
          <div class="orbit-tag" style="top:-10px; left:-40px;">Gold progress<br/><b>41.0% secured</b></div>
          <div class="orbit-tag" style="bottom:0px; right:-50px;">Partner shops<br/><b>126 approved</b></div>
          <div class="orbit-tag" style="bottom:60px; left:-70px;">Commission recorded<br/><b>BDT 18,500</b></div>
        </div>
      </div>
    </div>
  </section>

  <section class="pub-section">
    <h2>One platform, two roles, one ledger.</h2>
    <p class="lead">Customers discover and buy. Shop owners fulfil and confirm. Every action lands in the same non-custodial record.</p>
    <div class="feature-grid">
      <div class="feature-card">
        <div class="num">For Customers</div>
        <h3>Discover, compare, buy</h3>
        <p>Find approved shops near you, compare products and installment terms, and track every payment record and delivery milestone in one place.</p>
      </div>
      <div class="feature-card">
        <div class="num">For Shop Owners</div>
        <h3>Confirm, fulfil, earn</h3>
        <p>Manage your catalog, accept purchase requests, confirm externally received payments, and review commission statements on your terms.</p>
      </div>
    </div>
  </section>

  <section class="pub-section pub-dark" style="max-width:none;padding:70px 42px">
    <div style="max-width:1200px;margin:0 auto">
      <h2 style="color:var(--ivory)">Customer to customer gold, safely framed.</h2>
      <p class="lead" style="color:var(--muted-2)">List eligible gold for sale, or browse listings from other members. MIDAS provides discovery, messaging, and a transaction record. Inspection, payment, and handover stay between buyer and seller.</p>
      <div class="grid g-4">
        ${DATA.c2c.filter(c=>c.status==='Active').map(c=>`
          <div class="card" style="background:var(--panel-black);border-color:rgba(185,144,63,.22)">
            <div class="card-pad">
              <div class="product-thumb" style="margin:-22px -22px 12px;border-radius:14px 14px 0 0;background:linear-gradient(135deg,#241d13,#1b160f)">${c.image ? `<img class="product-photo" src="${c.image}" alt="${c.title}"/>` : icon('diamond','')}</div>
              <div style="color:var(--ivory);font-weight:700;font-size:13.5px">${c.title}</div>
              <div style="color:var(--muted-2);font-size:11.5px;margin:4px 0 10px">${c.area}</div>
              <div class="mono" style="color:var(--gold-bright);font-weight:600">${bdt(c.price)}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="pub-section">
    <h2>Every record, honestly labelled.</h2>
    <p class="lead">Submitted isn't the same as Confirmed. We never blur that line.</p>
    <div class="grid g-4">
      <div class="card card-pad"><span class="badge badge-muted">Scheduled</span><p style="font-size:12.5px;color:var(--muted);margin-top:10px">An installment is due. Nothing has happened yet.</p></div>
      <div class="card card-pad"><span class="badge badge-warn">Submitted</span><p style="font-size:12.5px;color:var(--muted);margin-top:10px">Customer recorded a payment they made directly to the shop.</p></div>
      <div class="card card-pad"><span class="badge badge-green">Confirmed</span><p style="font-size:12.5px;color:var(--muted);margin-top:10px">The shop verified receipt. Only this increases paid progress.</p></div>
      <div class="card card-pad"><span class="badge badge-red">Disputed</span><p style="font-size:12.5px;color:var(--muted);margin-top:10px">Either party flagged a mismatch for review.</p></div>
    </div>
  </section>
  ${pubFooter()}
  `;
}

function publicPage(eyebrow, title, intro, content){
  return `${pubHeader()}
    <section class="page-hero">
      <div class="page-hero-inner"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${intro}</p></div>
    </section>
    <section class="pub-section public-page-content">${content}</section>
    ${pubFooter()}`;
}

function publicMarketplace(){
  return publicPage('Verified partner catalog', 'Explore gold jewelry', 'Browse pieces from approved partner shops. Product values are current references; installment progress is always measured in accumulated gold weight.', `
    ${marketplaceControls()}
    <div class="grid g-4" id="marketplace-product-grid">${DATA.products.map(productCard).join('')}</div>
    <div class="marketplace-empty" id="marketplace-empty" hidden>No accessories match this filter.</div>
  `);
}

function publicHowItWorks(){
  return publicPage('A clearer way to accumulate gold', 'How MIDAS works', 'Choose a target gold weight, pay a verified shop directly, and see each confirmed payment converted using the payment-time Trendline rate.', `
    <div class="process-grid">
      ${[
        ['01','Choose your gold','Select a product and agree on its target weight and purity with a verified partner shop.'],
        ['02','Pay the shop directly','Make deposits using the payment method agreed with the shop. MIDAS never holds your money.'],
        ['03','Convert at the live rate','After confirmation, the payment is converted to gold using the recorded Trendline rate for that time.'],
        ['04','Reach your target','Progress reaches 100% only when your accumulated gold equals the agreed target weight.']
      ].map(step=>`<article class="feature-card process-card"><div class="num">${step[0]}</div><h3>${step[1]}</h3><p>${step[2]}</p></article>`).join('')}
    </div>
    <div class="notice product-notice">${icon('shield','notice-icon')}<span><b>Transparent by design.</b> Every conversion keeps the paid amount, gold rate, credited weight, timestamp, and confirmation status in the same record.</span></div>
  `);
}

function publicC2C(){
  return publicPage('Member marketplace', 'Buy and sell gold directly', 'Discover member listings with clear seller, location, and status information. Inspection, payment, and handover remain between buyer and seller.', `
    <div class="grid g-4">${DATA.c2c.filter(c=>c.status==='Active').map(c=>`
      <article class="product-card">
        <div class="product-thumb">${c.image ? `<img class="product-photo" src="${c.image}" alt="${c.title}" loading="lazy"/>` : icon('image')}</div>
        <div class="product-body"><div class="product-name">${c.title}</div><div class="product-shop">${c.seller} · ${c.area}</div><div class="product-price mono">${bdt(c.price)}</div><button class="btn btn-gold btn-block" onclick="go('login','')">Contact seller</button></div>
      </article>`).join('')}</div>
    <div class="notice product-notice">${icon('help','notice-icon')}<span>Always inspect the item and verify purity independently before completing a customer-to-customer purchase.</span></div>
  `);
}

function publicPartner(){
  return publicPage('For jewelry businesses', 'Grow with a trusted digital record', 'Join MIDAS to publish products, manage gold accumulation agreements, confirm customer deposits, and coordinate fulfillment.', `
    <div class="feature-grid partner-features">
      <article class="feature-card"><div class="num">Catalog</div><h3>Present your collection</h3><p>Publish product weight, purity, availability, and purchase options in a consistent professional catalog.</p></article>
      <article class="feature-card"><div class="num">Operations</div><h3>Manage every agreement</h3><p>Review requests, confirm payments received directly, and track gold credited against each target.</p></article>
      <article class="feature-card"><div class="num">Trust</div><h3>Build a clear history</h3><p>Keep confirmation, fulfillment, commission, and dispute records organized in one place.</p></article>
    </div>
    <div class="partner-cta"><div><h2>Ready to become a partner?</h2><p>Start your business profile and prepare your verification information.</p></div><button class="btn btn-gold" onclick="go('register','')">Start partner application</button></div>
  `);
}

function publicHelp(){
  return publicPage('Support center', 'Answers when you need them', 'Find guidance for payments, gold conversion, account access, partner shops, and customer-to-customer safety.', `
    <div class="faq-list">
      ${[
        ['Does MIDAS hold my money or gold?','No. Payments happen directly between customers and shops. MIDAS provides the marketplace and transaction record.'],
        ['How is a deposit converted into gold?','Once the shop confirms receipt, the amount is converted using the Trendline rate recorded for that payment time.'],
        ['When does progress reach 100%?','Only when the total confirmed gold credited equals the target gold weight in the agreement.'],
        ['How do I report a problem?','Open the relevant agreement or listing and use its dispute action to preserve the record for review.']
      ].map((item,index)=>`<details class="faq-item" ${index===0?'open':''}><summary>${item[0]}</summary><p>${item[1]}</p></details>`).join('')}
    </div>
  `);
}

function publicLegal(){
  return publicPage('Policies', 'Legal and privacy', 'The principles that govern how MIDAS presents marketplace records and protects account information.', `
    <div class="legal-copy"><h2>Non-custodial marketplace</h2><p>MIDAS does not receive, hold, transfer, guarantee, or refund customer payments. Parties remain responsible for payment, inspection, and handover.</p><h2>Record integrity</h2><p>Submitted records remain distinct from shop-confirmed payments. Gold credit is applied only after confirmation and retains its associated conversion rate.</p><h2>Privacy</h2><p>Account and transaction information should be collected only for operating the marketplace, securing accounts, meeting legal obligations, and resolving disputes.</p></div>
  `);
}

function publicNotFound(){
  return publicPage('404', 'Page not found', 'The page you requested is unavailable.', `<div class="u-center"><button class="btn btn-dark" onclick="go('public','landing')">Return home</button></div>`);
}

/* ============================================================
   AUTH — Login / Register
   ============================================================ */
function renderLogin(){
  return `
  <div class="auth-wrap">
    <div class="auth-side">
      <a class="u-flex u-gap-10 brand-home-link" href="#/public/landing" aria-label="Back to MIDAS home">${icon('diamond','',)}<span style="font-family:var(--font-display);font-weight:700;font-size:20px;color:var(--ivory)">MIDAS</span></a>
      <div>
        <p class="auth-quote">"MIDAS doesn't hold your gold savings. It just makes sure no one forgets what was promised."</p>
        <div class="auth-quote-attr">Non-custodial by design, since v1</div>
      </div>
      <div style="font-size:11.5px;color:var(--muted-2)">© 2026 MIDAS · Bangladesh</div>
    </div>
    <div class="auth-form-wrap">
      <form class="auth-card" onsubmit="handleLogin(event)" novalidate>
        <h2 style="font-family:var(--font-display);font-size:28px;margin:0 0 6px">Welcome back</h2>
        <p style="font-size:13px;color:var(--muted);margin:0 0 26px">Log in to track your purchases and installments.</p>
        <div class="field-row"><label class="field-label" for="login-identity">Mobile number or email</label><input class="field" id="login-identity" name="identity" autocomplete="username" placeholder="e.g. 01XXXXXXXXX or name@email.com" required/><div class="field-error" data-error="identity"></div></div>
        <div class="field-row"><label class="field-label" for="login-password">Password</label><input class="field" id="login-password" name="password" type="password" autocomplete="current-password" placeholder="••••••••" minlength="8" required/><div class="field-error" data-error="password"></div></div>
        <button class="btn btn-gold btn-block" type="submit" style="margin-bottom:12px">Log in</button>
        <div class="login-hint">Use one of the provided customer, shop owner, or administrator accounts.</div>
        <button class="text-button" type="button" onclick="toast('Password recovery instructions will be sent to your registered contact')">Forgot password?</button>
        <div class="hairline" style="margin-bottom:18px"></div>
        <div class="u-center" style="font-size:13px;color:var(--muted)">New to MIDAS? <a href="#" onclick="go('register','');return false" style="color:var(--gold-dim);font-weight:700">Create an account</a></div>
      </form>
    </div>
  </div>`;
}

function renderRegister(){
  return `
  <div class="auth-wrap">
    <div class="auth-side">
      <a class="u-flex u-gap-10 brand-home-link" href="#/public/landing" aria-label="Back to MIDAS home">${icon('diamond','')}<span style="font-family:var(--font-display);font-weight:700;font-size:20px;color:var(--ivory)">MIDAS</span></a>
      <div>
        <p class="auth-quote">"Every karat, every taka, every promise, written down and never quietly rewritten."</p>
        <div class="auth-quote-attr">The MIDAS ledger principle</div>
      </div>
      <div style="font-size:11.5px;color:var(--muted-2)">© 2026 MIDAS · Bangladesh</div>
    </div>
    <div class="auth-form-wrap">
      <form class="auth-card" onsubmit="handleRegister(event)" novalidate>
        <h2 style="font-family:var(--font-display);font-size:28px;margin:0 0 6px">Create your account</h2>
        <p style="font-size:13px;color:var(--muted);margin:0 0 20px">Choose how you'll use MIDAS.</p>
        <div class="tabbar" style="margin-bottom:20px" id="reg-tabs">
          <button class="active" onclick="switchRegTab(this,'customer')">Customer</button>
          <button onclick="switchRegTab(this,'shop')">Shop Owner</button>
        </div>
        <input type="hidden" id="registration-role" name="role" value="customer"/>
        <div class="field-row"><label class="field-label" for="register-name">Full name</label><input class="field" id="register-name" name="name" autocomplete="name" placeholder="Your full name" required/><div class="field-error" data-error="name"></div></div>
        <div class="field-grid field-row">
          <div><label class="field-label" for="register-mobile">Mobile number</label><input class="field" id="register-mobile" name="mobile" autocomplete="tel" inputmode="tel" placeholder="01XXXXXXXXX" required/><div class="field-error" data-error="mobile"></div></div>
          <div><label class="field-label" for="register-email">Email (optional)</label><input class="field" id="register-email" name="email" type="email" autocomplete="email" placeholder="name@email.com"/><div class="field-error" data-error="email"></div></div>
        </div>
        <div class="field-row"><label class="field-label" for="register-password">Password</label><input class="field" id="register-password" name="password" type="password" autocomplete="new-password" placeholder="At least 8 characters" minlength="8" required/><div class="field-error" data-error="password"></div></div>
        <div class="notice" style="margin-bottom:16px">${icon('help','notice-icon')}<span>By continuing you acknowledge MIDAS is non-custodial: it records purchase and installment activity but never receives, holds, or transfers your payments.</span></div>
        <button class="btn btn-gold btn-block" type="submit">Create account</button>
        <div class="u-center" style="font-size:13px;color:var(--muted);margin-top:18px">Already have an account? <a href="#" onclick="go('login','');return false" style="color:var(--gold-dim);font-weight:700">Log in</a></div>
      </form>
    </div>
  </div>`;
}
function switchRegTab(btn, kind){
  document.querySelectorAll('#reg-tabs button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  STATE.registrationRole = kind;
  document.getElementById('registration-role').value = kind;
}
window.switchRegTab = switchRegTab;

function clearFieldErrors(form){
  form.querySelectorAll('.field-error').forEach(el=>el.textContent='');
  form.querySelectorAll('.field.invalid').forEach(el=>el.classList.remove('invalid'));
}
function setFieldError(form, name, message){
  const field = form.elements[name];
  const error = form.querySelector(`[data-error="${name}"]`);
  if(field) field.classList.add('invalid');
  if(error) error.textContent = message;
}
function handleLogin(event){
  event.preventDefault();
  const form = event.currentTarget;
  clearFieldErrors(form);
  const identity = form.elements.identity.value.trim();
  const password = form.elements.password.value;
  let valid = true;
  if(!identity){ setFieldError(form,'identity','Enter your mobile number or email.'); valid=false; }
  if(password.length < 8){ setFieldError(form,'password','Password must contain at least 8 characters.'); valid=false; }
  if(!valid) return;
  const account = FRONTEND_ACCOUNTS[identity.toLowerCase()];
  if(!account || account.password !== password){
    setFieldError(form,'password','The email or password is incorrect.');
    return;
  }
  localStorage.setItem('midas-profile', JSON.stringify({ name:account.name, email:identity.toLowerCase(), role:account.role }));
  localStorage.setItem('midas-session', JSON.stringify({ role:account.role, identity, signedInAt:new Date().toISOString() }));
  go(account.role,'dashboard');
}
function handleRegister(event){
  event.preventDefault();
  const form = event.currentTarget;
  clearFieldErrors(form);
  const values = Object.fromEntries(new FormData(form));
  let valid = true;
  if(values.name.trim().length < 2){ setFieldError(form,'name','Enter your full name.'); valid=false; }
  if(!/^01\d{9}$/.test(values.mobile.trim())){ setFieldError(form,'mobile','Enter a valid 11 digit Bangladesh mobile number.'); valid=false; }
  if(values.email && !/^\S+@\S+\.\S+$/.test(values.email)){ setFieldError(form,'email','Enter a valid email address.'); valid=false; }
  if(values.password.length < 8){ setFieldError(form,'password','Use at least 8 characters.'); valid=false; }
  if(!valid) return;
  const profile = { name:values.name.trim(), mobile:values.mobile.trim(), email:values.email.trim(), role:values.role, createdAt:new Date().toISOString() };
  localStorage.setItem('midas-profile', JSON.stringify(profile));
  localStorage.setItem('midas-session', JSON.stringify({ role:values.role, identity:values.mobile.trim(), signedInAt:new Date().toISOString() }));
  go(values.role === 'shop' ? 'shop' : 'customer','dashboard');
}
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;

/* ============================================================
   CUSTOMER — layout shell
   ============================================================ */
function customerNavItems(){
  return [
    { id:'dashboard', label:'Dashboard', icon:'home' },
    { id:'shops', label:'Nearby Shops', icon:'pin' },
    { id:'marketplace', label:'Marketplace', icon:'bag' },
    { id:'installments', label:'My Installments', icon:'calendar' },
    { id:'c2c', label:'C2C Listings', icon:'swap' },
    { id:'support', label:'Support', icon:'help' },
    { id:'settings', label:'Account Settings', icon:'settings' },
  ];
}

function sidebarShell(items, activeView, roleTag){
  return `
  <div class="sidebar">
    <a class="back-to-site back-to-site-top" href="#/public/landing">${icon('chevronRight')}<span>Back to website</span></a>
    <a class="sidebar-brand" href="#/public/landing" aria-label="Back to MIDAS website">
      <div class="brand-mark" style="color:var(--gold)">${ICON.diamond}</div>
      <div><div class="brand-word">MIDAS</div><div class="brand-context">${roleTag}</div></div>
    </a>
    <div class="nav-group" style="flex:1">
      ${items.map(it=>`
        <div class="nav-item ${activeView===it.id?'active':''}" onclick="go('${STATE.role}','${it.id}')">
          ${icon(it.icon)}<span>${it.label}</span>${it.count?`<span class="count">${it.count}</span>`:''}
        </div>`).join('')}
      <div id="language-switch-slot" class="language-switch-slot"></div>
    </div>
    <div class="sidebar-foot">
      <div class="notice">${icon('help','notice-icon')}<span><b>Non-custodial.</b> MIDAS records transactions; it never holds or moves your money.</span></div>
    </div>
  </div>`;
}

function topbar(title, subtitle, extraRight){
  let profile = {};
  try { profile = JSON.parse(localStorage.getItem('midas-profile') || '{}'); } catch(e) {}
  const profileName = profile.name || (STATE.role === 'shop' ? 'Shop Owner' : STATE.role === 'admin' ? 'Administrator' : 'User');
  const initials = profileName.split(/\s+/).slice(0,2).map(part=>part[0]).join('').toUpperCase();
  return `
  <div class="topbar">
    <button class="icon-btn mobile-menu-btn" aria-label="Open navigation" onclick="toggleSidebar()">${icon('list')}</button>
    <div>
      <div class="topbar-title">${title}</div>
      ${subtitle?`<div class="topbar-role">${subtitle}</div>`:''}
    </div>
    <label class="search-field">
      ${icon('search')}
      ${STATE.role === 'customer'
        ? `<input type="search" aria-label="Search shops, jewelry, or area" placeholder="Search shops, jewelry, or area" oninput="searchCustomer(this.value)" onkeydown="if(event.key==='Escape'){this.value='';searchCustomer('')}"/>`
        : `<span>Search shops, jewelry, or area</span>`}
    </label>
    <div class="topbar-spacer"></div>
    ${extraRight||''}
    <button class="icon-btn" aria-label="Notifications">${icon('bell')}<span class="dot-badge">3</span></button>
    <div class="profile-chip">
      <div class="avatar">${initials}</div>
      <div><div class="profile-name">${profileName}</div></div>
    </div>
    <button class="btn btn-outline btn-sm logout-button" onclick="signOut()">Log out</button>
  </div>`;
}
function toggleSidebar(){ document.body.classList.toggle('sidebar-open'); }
function signOut(){
  localStorage.removeItem('midas-session');
  localStorage.removeItem('midas-profile');
  document.body.classList.remove('sidebar-open');
  go('public','landing');
  toast('You have been logged out');
}
window.toggleSidebar = toggleSidebar;
window.signOut = signOut;

function renderCustomerLayout(view){
  view = view || 'dashboard';
  const content = customerViewContent(view);

  return `
  <div class="shell">
    <button class="sidebar-backdrop" aria-label="Close navigation" onclick="toggleSidebar()"></button>
    ${sidebarShell(customerNavItems(), view, 'Customer Workspace')}
    <div class="main">
      ${topbar(navLabel(customerNavItems(), view), 'Dhanmondi, Dhaka · <a href="#" style="color:var(--gold-dim);font-weight:700">Change area</a>')}
      <div class="content">${content}</div>
    </div>
  </div>
  ${STATE.productModal ? renderProductModal(STATE.productModal) : ''}
  `;
}
function customerViewContent(view){
  let content = '';
  if(view === 'dashboard') content = customerDashboard();
  else if(view === 'shops') content = customerShops();
  else if(view === 'marketplace') content = customerMarketplace();
  else if(view === 'installments') content = customerInstallments();
  else if(view === 'c2c') content = customerC2C();
  else if(view === 'support') content = simplePane('Support', 'Guides, FAQ, and case history for your account.', 'help');
  else if(view === 'settings') content = customerAccountSettings();
  else content = customerDashboard();
  return content;
}
function navLabel(items, id){ const m = items.find(i=>i.id===id); return m? m.label : 'Dashboard'; }

function searchCustomer(value){
  const content = document.querySelector('.main > .content');
  if(!content) return;
  const query = value.trim().toLocaleLowerCase();
  if(!query){
    content.innerHTML = customerViewContent(parseHash().view || 'dashboard');
    return;
  }

  const products = DATA.products.filter(product=>
    [product.name, product.category, product.shop, product.purity, product.weight]
      .some(field=>String(field || '').toLocaleLowerCase().includes(query))
  );
  const shops = DATA.shops.filter(shop=>
    [shop.name, shop.area, shop.distance]
      .some(field=>String(field || '').toLocaleLowerCase().includes(query))
  );

  content.innerHTML = `
    <div class="section-h customer-search-heading">
      <h2>Search results</h2>
      <span>${products.length + shops.length} match${products.length + shops.length === 1 ? '' : 'es'}</span>
    </div>
    ${shops.length ? `
      <div class="section-h"><h2>Partner Shops</h2></div>
      <div class="grid g-3">${shops.map(shopCard).join('')}</div>
    ` : ''}
    ${products.length ? `
      <div class="section-h"><h2>Jewelry</h2></div>
      <div class="grid g-4">${products.map(productCard).join('')}</div>
    ` : ''}
    ${!products.length && !shops.length ? `
      <div class="marketplace-empty">No shops or jewelry match your search.</div>
    ` : ''}
  `;
}
window.searchCustomer = searchCustomer;

function simplePane(title, sub, ic){
  return `<div class="card" style="padding:70px 20px;text-align:center">
    <div style="width:52px;height:52px;border-radius:14px;background:#FBF6EA;border:1px solid var(--gold-line);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:var(--gold-dim)">${icon(ic)}</div>
    <div style="font-family:var(--font-display);font-size:22px;font-weight:600;margin-bottom:8px">${title}</div>
    <div style="color:var(--muted);font-size:13.5px;max-width:360px;margin:0 auto">${sub}</div>
  </div>`;
}

function customerAccountSettings(){
  let profile = {};
  try { profile = JSON.parse(localStorage.getItem('midas-profile') || '{}'); } catch(e) {}
  return `<div class="card settings-card">
    <div class="card-head"><div><div class="card-title">Account Settings</div><div class="card-sub">Manage your personal information and preferences.</div></div></div>
    <form class="card-pad" onsubmit="saveAccountSettings(event)">
      <div class="field-grid field-row">
        <div><label class="field-label" for="settings-name">Full name</label><input class="field" id="settings-name" name="name" value="${profile.name || 'Midas Customer'}" required/></div>
        <div><label class="field-label" for="settings-mobile">Mobile number</label><input class="field" id="settings-mobile" name="mobile" inputmode="tel" value="${profile.mobile || ''}" placeholder="01XXXXXXXXX"/></div>
      </div>
      <div class="field-row"><label class="field-label" for="settings-email">Email address</label><input class="field" id="settings-email" name="email" type="email" value="${profile.email || ''}" placeholder="name@email.com"/></div>
      <div class="u-flex settings-actions"><button class="btn btn-gold" type="submit">Save changes</button></div>
    </form>
  </div>`;
}
function saveAccountSettings(event){
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  let profile = {};
  try { profile = JSON.parse(localStorage.getItem('midas-profile') || '{}'); } catch(e) {}
  localStorage.setItem('midas-profile', JSON.stringify({ ...profile, name:values.name.trim(), mobile:values.mobile.trim(), email:values.email.trim() }));
  toast('Account settings saved');
  router_rerenderOnly();
}
window.saveAccountSettings = saveAccountSettings;

/* ---------------- Customer: Dashboard ---------------- */
function customerDashboard(){
  const inst = DATA.installment;
  const summary = installmentSummary(inst);
  return `
  <div class="grid g-2-1">
    <div class="card">
      <div class="card-head">
        <div><div class="card-title">Active Installment</div><div class="card-sub">${inst.shop} · ${inst.product}</div></div>
      </div>
      <div class="card-pad">
        <div class="u-flex" style="justify-content:space-between;margin-bottom:14px">
          <span style="font-size:12.5px;color:var(--muted);font-weight:700">Progress</span>
          <span style="font-family:var(--font-mono);font-weight:700">${summary.progressPct.toFixed(1)}%</span>
        </div>
        <div class="progress" style="margin-bottom:20px"><span style="width:${summary.progressPct}%"></span></div>
        <div class="grid g-2" style="margin-bottom:20px">
          <div><div class="stat-label">Target jewelry gold</div><div class="mono" style="font-weight:700;font-size:15px">${grams(inst.targetGoldGrams)} ${inst.purity}</div></div>
          <div><div class="stat-label">Gold you own</div><div class="mono" style="font-weight:700;font-size:15px;color:var(--success)">${grams(summary.goldOwned)}</div></div>
        </div>
        <div class="u-flex u-gap-10">
          <button class="btn btn-gold" onclick="openRecordPayment()">Record payment</button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-pad u-center" style="padding-top:32px">
        <div style="font-family:var(--font-display);font-size:18px;font-weight:600;margin-bottom:14px">Transaction History Only</div>
        <div class="seal" style="color:var(--gold-dim);width:46px;height:46px;margin:0 auto 14px">${icon('shield')}</div>
        <div style="font-size:13px;color:var(--ink-soft);line-height:1.6;margin-bottom:8px">MIDAS does not process or hold payments.</div>
        <div style="font-size:12px;color:var(--muted)">All payments are made directly between you and the partner shop.</div>
      </div>
    </div>
  </div>

  <div class="section-h"><h2>Partner Shops Near You</h2><a href="#" onclick="go('customer','shops');return false">View all →</a></div>
  <div class="grid g-3">
    ${DATA.shops.slice(0,3).map(shopCard).join('')}
  </div>

  <div class="section-h"><h2>Recommended Jewelry</h2><a href="#" onclick="go('customer','marketplace');return false">View all →</a></div>
  <div class="grid g-4">
    ${DATA.products.slice(0,4).map(productCard).join('')}
  </div>

  <div class="grid g-2" style="margin-top:34px">
    <div class="card">
      <div class="card-head"><div class="card-title" style="font-size:16px">Upcoming Due</div></div>
      <div class="card-pad" style="display:flex;gap:14px;align-items:center">
        ${icon('calendar','')}
        <div style="flex:1"><div style="font-weight:700">${inst.nextDue}</div><div class="tmeta">${inst.shop} · ${bdt(inst.nextAmount)}</div></div>
        <button class="btn btn-outline btn-sm" onclick="go('customer','installments')">View all</button>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-title" style="font-size:16px">Recent Activity</div></div>
      <div class="card-pad" style="display:flex;flex-direction:column;gap:14px">
        ${DATA.recentActivity.map(a=>`
          <div class="u-flex u-gap-10">
            <div style="color:var(--gold-dim)">${icon(a.icon)}</div>
            <div style="flex:1"><div style="font-weight:700;font-size:13px">${a.title}</div><div class="tmeta">${a.meta}</div></div>
            <div class="tmeta">${a.when}</div>
          </div>`).join('')}
      </div>
    </div>
  </div>

  <div class="card" style="margin-top:26px;background:var(--ink-black);border:none">
    <div class="card-pad" style="display:flex;align-items:center;gap:20px;color:var(--ivory)">
      <div style="color:var(--gold)">${icon('swap')}</div>
      <div style="flex:1">
        <div style="font-family:var(--font-display);font-size:19px;font-weight:600">C2C Gold</div>
        <div style="color:var(--muted-2);font-size:12.5px">Buy or sell gold directly with other members.</div>
      </div>
      <button class="btn btn-gold" onclick="go('customer','c2c')">Go to C2C Gold</button>
    </div>
  </div>
  `;
}

function shopCard(s){
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + ', ' + s.area)}`;
  return `
  <div class="shop-card">
    <div class="shop-thumb">${icon('store')}</div>
    <div class="shop-name">${s.name} ${s.verified?`<span class="badge badge-gold" style="padding:1px 7px 1px 5px">${icon('check')}Verified</span>`:''}</div>
    <div class="shop-meta">
      <span>${icon('pin')} ${s.distance ? s.distance+' away' : s.area}</span>
      <span>${icon('star')} ${s.rating} (${s.reviews})</span>
    </div>
    <a class="btn btn-outline btn-block btn-sm" href="${mapUrl}" target="_blank" rel="noopener noreferrer" aria-label="View ${s.name} location in Google Maps">View Shop</a>
  </div>`;
}

function productCard(p, index=0){
  return `
  <div class="product-card" data-marketplace-product data-category="${p.category}" data-price="${p.price}" data-order="${index}">
    <div class="product-thumb">${p.image ? `<img class="product-photo" src="${p.image}" alt="${p.name}" loading="lazy"/>` : icon('image')}<button class="fav-btn" aria-label="Save ${p.name}" onclick="event.stopPropagation();this.classList.toggle('saved');toast(this.classList.contains('saved')?'Saved to favorites':'Removed from favorites')">${icon('heart')}</button></div>
    <div class="product-body">
      <div class="product-name">${p.name}</div>
      <div class="product-shop">${p.shop}</div>
      <div class="product-price mono">${bdt(p.price)}</div>
      <div class="product-actions">
        <button class="btn btn-gold" onclick='openProductModal("${p.id}")'>Installment</button>
      </div>
    </div>
  </div>`;
}
function marketplaceControls(){
  const categories = [...new Set(DATA.products.map(product=>product.category))];
  return `<div class="toolbar-row marketplace-toolbar">
    <div class="u-flex u-gap-10 filter-scroll" role="group" aria-label="Filter accessories">
      <button class="filter-chip active" type="button" onclick="filterMarketplace(this,'all')">All accessories</button>
      ${categories.map(category=>`<button class="filter-chip" type="button" onclick="filterMarketplace(this,'${category}')">${category}</button>`).join('')}
    </div>
    <select class="field compact-select" aria-label="Sort accessories by price" onchange="sortMarketplace(this.value)">
      <option value="recommended">Sort: Recommended</option>
      <option value="low-high">Price: Low to High</option>
      <option value="high-low">Price: High to Low</option>
    </select>
  </div>`;
}
function filterMarketplace(button, category){
  button.closest('.filter-scroll').querySelectorAll('.filter-chip').forEach(chip=>chip.classList.remove('active'));
  button.classList.add('active');
  const cards = [...document.querySelectorAll('[data-marketplace-product]')];
  cards.forEach(card=>card.hidden = category !== 'all' && card.dataset.category !== category);
  const empty = document.getElementById('marketplace-empty');
  if(empty) empty.hidden = cards.some(card=>!card.hidden);
}
function sortMarketplace(direction){
  const grid = document.getElementById('marketplace-product-grid');
  if(!grid) return;
  const cards = [...grid.querySelectorAll('[data-marketplace-product]')];
  cards.sort((a,b)=>{
    if(direction === 'low-high') return Number(a.dataset.price) - Number(b.dataset.price);
    if(direction === 'high-low') return Number(b.dataset.price) - Number(a.dataset.price);
    return Number(a.dataset.order) - Number(b.dataset.order);
  }).forEach(card=>grid.appendChild(card));
}
window.filterMarketplace = filterMarketplace;
window.sortMarketplace = sortMarketplace;

/* ---------------- Customer: Nearby Shops ---------------- */
function customerShops(){
  return `
  <div class="u-flex" style="justify-content:space-between;margin-bottom:18px">
    <div class="u-flex u-gap-10">
      <span class="filter-chip active">All Areas</span>
      <span class="filter-chip">Highest rated</span>
      <span class="filter-chip">Nearest first</span>
    </div>
  </div>
  <div class="grid g-3">
    ${DATA.shops.map(shopCard).join('')}
  </div>
  <div class="notice" style="margin-top:20px">${icon('help','notice-icon')}<span>Can't share your location? Area-based results stay available. You can <a href="#" style="color:var(--gold-dim);font-weight:700">enter your area manually</a>.</span></div>
  `;
}

/* ---------------- Customer: Marketplace ---------------- */
function customerMarketplace(){
  return `
  ${marketplaceControls()}
  <div class="grid g-4" id="marketplace-product-grid">
    ${DATA.products.map(productCard).join('')}
  </div>
  <div class="marketplace-empty" id="marketplace-empty" hidden>No accessories match this filter.</div>
  `;
}

/* ---------------- Product modal (purchase flow) ---------------- */
function openProductModal(id){
  if(parseHash().role !== 'customer'){
    localStorage.setItem('midas-intended-product', JSON.stringify({ id }));
    go('login','');
    return;
  }
  STATE.productModal = { id };
  router_rerenderOnly();
}
function closeProductModal(){ STATE.productModal = null; router_rerenderOnly(); }
function router_rerenderOnly(){
  // re-render current view without changing hash
  const { role, view } = parseHash();
  const app = document.getElementById('app');
  if(role==='customer') app.innerHTML = renderCustomerLayout(view);
}
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;

function renderProductModal(modalState){
  const p = DATA.products.find(x=>x.id===modalState.id);
  if(!p) return '';
  return `
  <div class="modal-backdrop" onclick="if(event.target===this) closeProductModal()">
    <div class="modal">
      <div class="modal-head"><h3>Installment Agreement</h3><button class="modal-close" onclick="closeProductModal()">✕</button></div>
      <div class="modal-body">
        <div class="u-flex u-gap-14" style="margin-bottom:18px">
          <div class="product-thumb" style="width:70px;height:70px;border-radius:10px;flex:none">${p.image ? `<img class="product-photo" src="${p.image}" alt="${p.name}"/>` : icon('image')}</div>
          <div>
            <div style="font-weight:700">${p.name}</div>
            <div class="tmeta">${p.shop} · ${p.weight} · ${p.purity}</div>
          </div>
        </div>
        <div class="field-row">
          <label class="field-label" for="installment-plan">Installment plan</label>
          <select class="field" id="installment-plan"><option>6 months</option><option>1 year</option><option>2 years</option><option>3 years</option><option>4 years</option><option>5 years</option></select>
        </div>
        <div class="grid g-3 agreement-summary">
          <div><div class="stat-label">Gold price</div><div class="mono agreement-value">${bdt(p.price)}</div></div>
          <div><div class="stat-label">Gold weight</div><div class="mono agreement-value">${p.weight} · ${p.purity}</div></div>
          <div><div class="stat-label">Minimum installment</div><div class="mono agreement-value">${bdt(p.minimumInstallment)}</div></div>
        </div>
        <div class="notice">${icon('help','notice-icon')}<span><b>Gold accumulation.</b> Each confirmed deposit buys gold at the Trendline rate recorded for that payment time. Completion is based on accumulated gold weight reaching ${p.weight}, not on reaching a fixed taka cost.</span></div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="closeProductModal()">Cancel</button>
        <button class="btn btn-gold" onclick="submitPurchaseRequest('${p.shop}')">Send Purchase Request</button>
      </div>
    </div>
  </div>`;
}
function submitPurchaseRequest(shop){
  closeProductModal();
  toast('Purchase request sent to ' + shop + '. Awaiting acceptance.');
}
window.submitPurchaseRequest = submitPurchaseRequest;

/* ---------------- Customer: Installments ---------------- */
function customerInstallments(){
  const inst = DATA.installment;
  const summary = installmentSummary(inst);
  return `
  <div class="card" style="margin-bottom:26px">
    <div class="card-head">
      <div><div class="card-title">${inst.product}</div><div class="card-sub">${inst.shop} · Agreement AG-2025-0481</div></div>
    </div>
    <div class="card-pad">
      <div class="u-flex" style="justify-content:space-between;margin-bottom:10px"><span class="stat-label">Gold accumulation progress</span><span class="mono" style="font-weight:700">${summary.progressPct.toFixed(1)}%</span></div>
      <div class="progress" style="margin-bottom:18px"><span style="width:${summary.progressPct}%"></span></div>
      <div class="grid g-2" style="margin-bottom:20px">
        <div><div class="stat-label">Target jewelry gold</div><div class="mono" style="font-weight:700">${grams(inst.targetGoldGrams)} ${inst.purity}</div></div>
        <div><div class="stat-label">Gold you own</div><div class="mono" style="font-weight:700;color:var(--success)">${grams(summary.goldOwned)}</div></div>
      </div>
    </div>
  </div>

  <div class="section-h"><h2>Installment Schedule</h2>
    <a href="#" onclick="toast('Downloading chronological statement');return false">${icon('download')} Download statement</a>
  </div>
  <div class="card">
    <table class="dtable">
      <thead><tr><th>#</th><th>Date</th><th>Gold credited</th><th>Trendline rate</th><th>Paid to shop</th><th>Status</th><th></th></tr></thead>
      <tbody>
      ${inst.schedule.map(s=>`
        <tr>
          <td>${s.n}</td>
          <td>${s.due}</td>
          <td class="mono" style="font-weight:700">${s.status === 'Confirmed' ? grams(goldCredited(s)) : 'Pending conversion'}</td>
          <td class="mono">${s.goldRate ? `${bdt(s.goldRate)}/g` : 'Locked on confirmation'}</td>
          <td class="mono tmeta">${bdt(s.amount)}</td>
          <td>${statusBadge(s.status)}</td>
          <td>${s.status==='Scheduled'?`<button class="btn btn-gold btn-sm" onclick="openRecordPayment()">Record payment</button>`:`<span class="link-view">View evidence</span>`}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
  <div class="notice" style="margin-top:18px">${icon('help','notice-icon')}<span>When ${inst.shop} confirms a payment, MIDAS records the payment-time Trendline rate and credits the resulting gold weight. Progress reaches 100% only when credited gold equals the ${grams(inst.targetGoldGrams)} target.</span></div>
  `;
}
function statusBadge(status){
  const map = { Confirmed:'badge-green', Completed:'badge-green', Published:'badge-green', Scheduled:'badge-muted', Submitted:'badge-warn', Pending:'badge-warn', Paused:'badge-warn', Hidden:'badge-red', Suspended:'badge-red', Overdue:'badge-red', Disputed:'badge-red', Active:'badge-green', Reported:'badge-red', 'Under Review':'badge-warn', 'Not Settled':'badge-red', 'Partially Settled':'badge-warn', Settled:'badge-green', 'Recorded':'badge-muted', 'Confirmed ':'badge-green' };
  const cls = map[status] || 'badge-muted';
  return `<span class="badge ${cls}">${status}</span>`;
}
window.statusBadge = statusBadge;

function openRecordPayment(){
  const inst = DATA.installment;
  const modal = document.createElement('div');
  modal.innerHTML = `
  <div class="modal-backdrop" id="pay-modal-backdrop" onclick="if(event.target===this) document.getElementById('pay-modal-backdrop').remove()">
    <div class="modal">
      <div class="modal-head"><h3>Record a Payment</h3><button class="modal-close" onclick="document.getElementById('pay-modal-backdrop').remove()">✕</button></div>
      <div class="modal-body">
        <div class="notice" style="margin-bottom:16px">${icon('help','notice-icon')}<span>This records that <b>you</b> paid ${inst.shop} directly. It stays <b>Submitted</b> until the shop confirms receipt.</span></div>
        <div class="field-grid field-row">
          <div><label class="field-label">Amount paid to shop</label><input class="field" value="${inst.nextAmount}"/></div>
          <div><label class="field-label">Date</label><input class="field" type="date"/></div>
        </div>
        <div class="notice" style="margin-bottom:16px">${icon('gauge','notice-icon')}<span>Estimated at the current Trendline rate: <b>${grams(inst.nextAmount / inst.currentTrendlineRate)}</b>. The final gold credit is locked using the rate at confirmation time.</span></div>
        <div class="field-row"><label class="field-label">Payment method</label><select class="field"><option>Cash</option><option>Bank transfer</option><option>Mobile financial service</option><option>Other</option></select></div>
        <div class="field-row"><label class="field-label">Reference / note (optional)</label><input class="field" placeholder="e.g. receipt number"/></div>
        <div class="field-row"><label class="field-label">Evidence (optional)</label>
          <div style="border:1.5px dashed #DDD3B8;border-radius:8px;padding:20px;text-align:center;color:var(--muted);font-size:12.5px">${icon('image')}<div style="margin-top:6px">Attach a receipt photo</div></div>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="document.getElementById('pay-modal-backdrop').remove()">Cancel</button>
        <button class="btn btn-gold" onclick="document.getElementById('pay-modal-backdrop').remove(); toast('Payment submitted. Awaiting shop confirmation.')">Submit Record</button>
      </div>
    </div>
  </div>`;
  document.body.appendChild(modal.firstElementChild);
}
window.openRecordPayment = openRecordPayment;

/* ---------------- Customer: C2C ---------------- */
function customerC2C(){
  let savedListings = [];
  try { savedListings = JSON.parse(localStorage.getItem('midas-c2c-listings') || '[]'); } catch(e) {}
  const listings = [...savedListings, ...DATA.c2c];
  const ownedGold = installmentSummary(DATA.installment).goldOwned;
  const listedGold = savedListings.filter(item=>item.listingType === 'owned-gold').reduce((sum,item)=>sum + Number(item.weight || 0),0);
  const availableGold = Math.max(0, ownedGold - listedGold);
  return `
  <div class="c2c-balance card card-pad">
    <div><div class="stat-label">Your available gold</div><div class="mono c2c-balance-value">${grams(availableGold)} ${DATA.installment.purity}</div><div class="tmeta">Confirmed gold can be sold without purchasing the target jewelry.</div></div>
    <button class="btn btn-gold" onclick="openC2CListingModal()">+ Create C2C Listing</button>
  </div>
  <div class="u-flex c2c-toolbar">
    <div class="u-flex u-gap-10 filter-scroll" role="group" aria-label="Filter C2C listings">
      <button class="filter-chip active" onclick="filterC2C(this,'all')">All Listings</button>
      <button class="filter-chip" onclick="filterC2C(this,'jewelry')">Jewelry</button>
      <button class="filter-chip" onclick="filterC2C(this,'owned-gold')">Owned Gold</button>
    </div>
  </div>
  <div class="grid g-4">
    ${listings.map(c=>`
      <div class="product-card" data-c2c-type="${c.listingType || 'jewelry'}">
        <div class="product-thumb">${c.image ? `<img class="product-photo" src="${c.image}" alt="${c.title}"/>` : icon(c.listingType === 'owned-gold' ? 'coins' : 'image')}</div>
        <div class="product-body">
          <span class="badge ${c.listingType === 'owned-gold' ? 'badge-gold' : 'badge-muted'} c2c-type-badge">${c.listingType === 'owned-gold' ? 'Owned Gold' : 'Jewelry'}</span>
          <div class="product-name">${c.title}</div>
          <div class="product-shop">${c.seller} · ${c.area}</div>
          ${c.weight ? `<div class="tmeta">${grams(c.weight)} · ${c.purity || '22K'}</div>` : ''}
          <div class="product-price mono">${bdt(c.price)}</div>
          <div class="product-actions"><button class="btn btn-gold" onclick="toast('${c.listingType === 'owned-gold' ? 'Gold purchase request sent to seller' : 'Inquiry sent to seller'}')">${c.listingType === 'owned-gold' ? 'Buy Gold' : 'Send Inquiry'}</button></div>
        </div>
      </div>`).join('')}
  </div>
  <div class="notice" style="margin-top:20px">${icon('help','notice-icon')}<span>Jewelry must be inspected in person. Owned Gold listings are limited to the seller's confirmed MIDAS gold balance.</span></div>
  `;
}
function filterC2C(button, type){
  button.closest('.filter-scroll').querySelectorAll('.filter-chip').forEach(chip=>chip.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('[data-c2c-type]').forEach(card=>card.hidden = type !== 'all' && card.dataset.c2cType !== type);
}
function openC2CListingModal(){
  const ownedGold = installmentSummary(DATA.installment).goldOwned;
  let listings = [];
  try { listings = JSON.parse(localStorage.getItem('midas-c2c-listings') || '[]'); } catch(e) {}
  const listedGold = listings.filter(item=>item.listingType === 'owned-gold').reduce((sum,item)=>sum + Number(item.weight || 0),0);
  const availableGold = Math.max(0, ownedGold - listedGold);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `<div class="modal-backdrop" id="c2c-listing-modal" onclick="if(event.target===this)this.remove()"><div class="modal">
    <div class="modal-head"><h3>Create C2C Listing</h3><button class="modal-close" onclick="document.getElementById('c2c-listing-modal').remove()">✕</button></div>
    <form onsubmit="submitC2CListing(event,${availableGold})"><div class="modal-body">
      <div class="field-row"><label class="field-label" for="c2c-listing-type">What are you selling?</label><select class="field" id="c2c-listing-type" name="listingType" onchange="switchC2CListingType(this.value,${availableGold})"><option value="jewelry">Physical jewelry</option><option value="owned-gold">Gold I own in MIDAS</option></select></div>
      <div class="field-row" id="c2c-title-row"><label class="field-label" for="c2c-title">Jewelry name</label><input class="field" id="c2c-title" name="title" placeholder="e.g. 22K Gold Ring"/></div>
      <div class="field-grid field-row"><div><label class="field-label" for="c2c-weight">Gold weight (g)</label><input class="field" id="c2c-weight" name="weight" type="number" min="0.001" step="0.001" required/></div><div><label class="field-label" for="c2c-purity">Purity</label><select class="field" id="c2c-purity" name="purity"><option>22K</option><option>21K</option><option>18K</option></select></div></div>
      <div class="field-row"><label class="field-label" for="c2c-price">Asking price</label><input class="field" id="c2c-price" name="price" type="number" min="1" step="1" required/></div>
      <div class="notice" id="c2c-listing-notice">${icon('help','notice-icon')}<span>Provide accurate jewelry weight and purity details. The buyer should inspect the item before purchase.</span></div>
    </div><div class="modal-foot"><button class="btn btn-ghost" type="button" onclick="document.getElementById('c2c-listing-modal').remove()">Cancel</button><button class="btn btn-gold" type="submit">Publish Listing</button></div></form>
  </div></div>`;
  document.body.appendChild(wrapper.firstElementChild);
}
function switchC2CListingType(type, availableGold){
  const titleRow = document.getElementById('c2c-title-row');
  const weight = document.getElementById('c2c-weight');
  const purity = document.getElementById('c2c-purity');
  const notice = document.getElementById('c2c-listing-notice');
  titleRow.hidden = type === 'owned-gold';
  weight.max = type === 'owned-gold' ? availableGold : '';
  purity.value = type === 'owned-gold' ? DATA.installment.purity : purity.value;
  purity.disabled = type === 'owned-gold';
  notice.querySelector('span').innerHTML = type === 'owned-gold' ? `<b>${grams(availableGold)}</b> is available to list. You cannot list more than your confirmed gold balance.` : 'Provide accurate jewelry weight and purity details. The buyer should inspect the item before purchase.';
}
function submitC2CListing(event, availableGold){
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  const weight = Number(values.weight);
  if(values.listingType === 'owned-gold' && weight > availableGold){ toast('You cannot list more gold than you own'); return; }
  if(values.listingType === 'jewelry' && !values.title.trim()){ toast('Enter the jewelry name'); return; }
  let profile = {}, listings = [];
  try { profile = JSON.parse(localStorage.getItem('midas-profile') || '{}'); } catch(e) {}
  try { listings = JSON.parse(localStorage.getItem('midas-c2c-listings') || '[]'); } catch(e) {}
  listings.unshift({ id:'c2c-local-'+Date.now(), title:values.listingType === 'owned-gold' ? `${grams(weight)} ${DATA.installment.purity} MIDAS Gold` : values.title.trim(), listingType:values.listingType, weight, purity:values.listingType === 'owned-gold' ? DATA.installment.purity : values.purity, price:Number(values.price), seller:profile.name || 'You', area:'Dhanmondi, Dhaka', status:'Active' });
  localStorage.setItem('midas-c2c-listings', JSON.stringify(listings));
  document.getElementById('c2c-listing-modal').remove();
  toast('C2C listing published');
  router_rerenderOnly();
}
window.filterC2C = filterC2C;
window.openC2CListingModal = openC2CListingModal;
window.switchC2CListingType = switchC2CListingType;
window.submitC2CListing = submitC2CListing;

/* ============================================================
   SHOP OWNER — layout + views
   ============================================================ */
function shopNavItems(){
  return [
    { id:'dashboard', label:'Overview', icon:'home' },
    { id:'products', label:'Products', icon:'bag' },
    { id:'requests', label:'Purchase Requests', icon:'doc', count:3 },
    { id:'installments', label:'Installments', icon:'calendar' },
    { id:'confirmations', label:'Payment Confirmations', icon:'check', count:5 },
    { id:'orders', label:'Orders', icon:'box' },
    { id:'commissions', label:'Commission Statements', icon:'coins' },
    { id:'insights', label:'AI Insights', icon:'gauge' },
    { id:'reports', label:'Reports', icon:'download' },
    { id:'settings', label:'Settings', icon:'settings' },
  ];
}

function renderShopLayout(view){
  view = view || 'dashboard';
  let content = '';
  if(view === 'dashboard') content = shopDashboard();
  else if(view === 'products') content = shopProducts();
  else if(view === 'commissions') content = shopCommissions();
  else if(view === 'confirmations') content = shopConfirmations();
  else if(view === 'requests') content = shopRequests();
  else if(view === 'orders') content = shopOrders();
  else if(view === 'insights') content = shopAIInsights();
  else if(view === 'reports') content = shopReports();
  else if(view === 'installments') content = shopUpcomingFull();
  else if(view === 'settings') content = shopProfile();
  else content = shopDashboard();

  return `
  <div class="shell">
    <button class="sidebar-backdrop" aria-label="Close navigation" onclick="toggleSidebar()"></button>
    ${sidebarShell(shopNavItems(), view, 'Aurelia Jewellers · Shop Owner Portal')}
    <div class="main">
      ${topbar(navLabel(shopNavItems(), view), '<span class="badge badge-green" style="margin-left:0">'+icon('check')+' Verified Partner</span>')}
      <div class="content">${content}</div>
    </div>
  </div>`;
}

function shopAIInsights(){
  return `<div class="ai-insights-header">
    <div><div class="eyebrow">${icon('gauge')} AI assisted analysis</div><h2>Business insights for Aurelia Jewellers</h2><p>Patterns derived from catalog activity, purchase requests, installment records, and fulfillment history.</p></div>
    <button class="btn btn-outline" onclick="toast('Insights refreshed with the latest available records')">Refresh insights</button>
  </div>
  <div class="grid g-3 ai-insight-grid">
    <article class="card card-pad ai-insight-card"><div class="ai-insight-top"><span class="badge badge-green">High confidence</span><span class="mono">Demand</span></div><h3>22K chains are gaining interest</h3><p>Chain product views and installment requests are stronger than other categories in your service area.</p><div class="ai-recommendation"><b>Recommended action</b><span>Prioritize two additional 22K chain designs between 10 g and 16 g.</span></div></article>
    <article class="card card-pad ai-insight-card"><div class="ai-insight-top"><span class="badge badge-gold">Opportunity</span><span class="mono">Installments</span></div><h3>Smaller plans convert faster</h3><p>Customers selecting minimum installments below BDT 5,000 are more likely to submit their first payment record.</p><div class="ai-recommendation"><b>Recommended action</b><span>Keep lightweight earrings and pendants available for entry-level plans.</span></div></article>
    <article class="card card-pad ai-insight-card"><div class="ai-insight-top"><span class="badge badge-warn">Needs attention</span><span class="mono">Operations</span></div><h3>Five confirmations are pending</h3><p>Payment confirmations waiting longer than usual may delay customers' credited gold progress.</p><div class="ai-recommendation"><b>Recommended action</b><span>Review the oldest confirmation records before processing new requests.</span></div></article>
  </div>
  <div class="grid g-2 ai-secondary-grid">
    <div class="card"><div class="card-head"><div class="card-title">This week's signals</div></div><div class="card-pad ai-signal-list">
      <div><span>Most requested purity</span><b>22K</b></div><div><span>Fastest-growing category</span><b>Gold Chains</b></div><div><span>Typical target weight</span><b>8 g to 16 g</b></div><div><span>Confirmation queue</span><b>5 records</b></div>
    </div></div>
    <div class="card"><div class="card-head"><div class="card-title">Responsible use</div></div><div class="card-pad"><div class="notice">${icon('help','notice-icon')}<span>AI insights are decision support, not guarantees. Review product availability, customer context, and payment evidence before taking action.</span></div></div></div>
  </div>`;
}

function shopProfile(){
  let profile = {}, verification = 'unverified';
  try { profile = JSON.parse(localStorage.getItem('midas-shop-profile') || '{}'); } catch(e) {}
  verification = localStorage.getItem('midas-shop-verification') || 'unverified';
  const verificationPanel = verification === 'verified' ? `<div class="verification-state verified-state">${icon('check')}<div><b>Verified Partner</b><span>Your business identity and submitted documents have been approved.</span></div></div>` : verification === 'pending' ? `<div class="verification-state pending-state">${icon('clock')}<div><b>Verification under review</b><span>Your application is being reviewed. Keep the business information below up to date.</span></div></div>` : `<div class="verification-state unverified-state">${icon('alert')}<div><b>Not a verified partner</b><span>Complete your business profile and submit the required documents to apply.</span></div></div>`;
  return `<div class="shop-profile-layout">
    <div class="shop-profile-main">
      <div class="card">
        <div class="card-head"><div><div class="card-title">Business Profile</div><div class="card-sub">Information customers use to identify and locate your shop.</div></div></div>
        <form class="card-pad" onsubmit="saveShopProfile(event)">
          <div class="field-grid field-row"><div><label class="field-label" for="shop-business-name">Business name</label><input class="field" id="shop-business-name" name="businessName" value="${profile.businessName || 'Aurelia Jewellers'}" required/></div><div><label class="field-label" for="shop-owner-name">Owner name</label><input class="field" id="shop-owner-name" name="ownerName" value="${profile.ownerName || 'Arif Rahman'}" required/></div></div>
          <div class="field-grid field-row"><div><label class="field-label" for="shop-mobile">Business mobile</label><input class="field" id="shop-mobile" name="mobile" inputmode="tel" value="${profile.mobile || '01712345678'}" required/></div><div><label class="field-label" for="shop-email">Business email</label><input class="field" id="shop-email" name="email" type="email" value="${profile.email || 'contact@aurelia.bd'}" required/></div></div>
          <div class="field-row"><label class="field-label" for="shop-address">Shop address</label><input class="field" id="shop-address" name="address" value="${profile.address || 'Road 27, Dhanmondi, Dhaka'}" required/></div>
          <div class="field-grid field-row"><div><label class="field-label" for="shop-area">Service area</label><input class="field" id="shop-area" name="area" value="${profile.area || 'Dhanmondi, Dhaka'}" required/></div><div><label class="field-label" for="shop-hours">Opening hours</label><input class="field" id="shop-hours" name="hours" value="${profile.hours || '10:00 AM to 8:00 PM'}" required/></div></div>
          <div class="field-row"><label class="field-label" for="shop-description">About the shop</label><textarea class="field" id="shop-description" name="description" rows="4" placeholder="Describe your products and services">${profile.description || 'Gold jewelry retailer specializing in 21K and 22K pieces, installment agreements, and custom orders.'}</textarea></div>
          <div class="settings-actions"><button class="btn btn-gold" type="submit">Save Profile</button></div>
        </form>
      </div>
    </div>
    <aside class="shop-profile-side">
      <div class="card"><div class="card-head"><div class="card-title">Partner Verification</div></div><div class="card-pad">
        ${verificationPanel}
        ${verification === 'unverified' ? `<div class="verification-guide"><h3>How to become verified</h3><ol><li>Complete all business profile information.</li><li>Provide a valid trade license.</li><li>Provide the owner's national ID.</li><li>Provide proof of shop address.</li><li>Submit hallmark or jewelry association documents where applicable.</li></ol><div class="verification-docs"><label><input type="checkbox"/> Trade license ready</label><label><input type="checkbox"/> Owner identification ready</label><label><input type="checkbox"/> Address proof ready</label></div><button class="btn btn-gold btn-block" onclick="submitShopVerification()">Apply for Verification</button></div>` : verification === 'pending' ? `<div class="verification-guide"><h3>What happens next</h3><p>MIDAS will review the business identity, address, and supporting documents. You will see the updated status here.</p></div>` : `<div class="verification-guide"><h3>Maintain your status</h3><p>Keep licenses, contact details, and business address current. Material changes may require another review.</p></div>`}
      </div></div>
      <div class="card shop-location-card"><div class="card-head"><div class="card-title">Public Location</div></div><div class="card-pad"><div class="shop-location-preview">${icon('pin')}<span>${profile.address || 'Road 27, Dhanmondi, Dhaka'}</span></div><a class="btn btn-outline btn-block" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.address || 'Road 27, Dhanmondi, Dhaka')}" target="_blank" rel="noopener noreferrer">View on Map</a></div></div>
    </aside>
  </div>`;
}
function saveShopProfile(event){
  event.preventDefault();
  const profile = Object.fromEntries(new FormData(event.currentTarget));
  localStorage.setItem('midas-shop-profile', JSON.stringify(profile));
  toast('Shop profile saved');
  router();
}
function submitShopVerification(){
  const checks = [...document.querySelectorAll('.verification-docs input[type="checkbox"]')];
  if(checks.some(check=>!check.checked)){ toast('Confirm that all required documents are ready'); return; }
  localStorage.setItem('midas-shop-verification','pending');
  toast('Verification application submitted');
  router();
}
window.saveShopProfile = saveShopProfile;
window.submitShopVerification = submitShopVerification;

function shopReports(){
  return `<div class="report-toolbar">
    <div><h2>Business Reports</h2><p>Review sales activity, installment performance, gold obligations, and fulfillment results.</p></div>
    <div class="u-flex u-gap-10"><select class="field report-period" aria-label="Report period" onchange="toast('Report period updated to '+this.options[this.selectedIndex].text)"><option>Last 30 days</option><option>Last 90 days</option><option>This year</option><option>Custom period</option></select><button class="btn btn-gold" onclick="toast('Preparing report export')">${icon('download')} Export Report</button></div>
  </div>
  <div class="grid g-4 report-summary">
    ${shopStatTile('coins', bdt(925000), 'Qualifying Sales', '+12%')}
    ${shopStatTile('doc', '48', 'Active Agreements', '+6')}
    ${shopStatTile('gauge', '186.4 g', 'Gold Committed', '+14.2 g')}
    ${shopStatTile('box', '23', 'Orders Fulfilled', '+5')}
  </div>
  <div class="grid g-2 report-grid">
    <article class="card report-card"><div class="card-head"><div><div class="card-title">Sales and Agreements</div><div class="card-sub">Revenue and customer agreement activity</div></div><button class="btn btn-outline btn-sm" onclick="toast('Sales report downloaded')">Download</button></div><div class="card-pad ai-signal-list"><div><span>Accepted purchase requests</span><b>31</b></div><div><span>New installment agreements</span><b>18</b></div><div><span>Average jewelry value</span><b>${bdt(78500)}</b></div><div><span>Agreement conversion rate</span><b>68%</b></div></div></article>
    <article class="card report-card"><div class="card-head"><div><div class="card-title">Gold Accumulation</div><div class="card-sub">Confirmed gold credited to customers</div></div><button class="btn btn-outline btn-sm" onclick="toast('Gold report downloaded')">Download</button></div><div class="card-pad ai-signal-list"><div><span>Gold credited this period</span><b>74.8 g</b></div><div><span>Customer target gold</span><b>186.4 g</b></div><div><span>Average completion</span><b>46.2%</b></div><div><span>Awaiting confirmation</span><b>5 records</b></div></div></article>
    <article class="card report-card"><div class="card-head"><div><div class="card-title">Product Performance</div><div class="card-sub">Demand by jewelry category</div></div><button class="btn btn-outline btn-sm" onclick="toast('Product report downloaded')">Download</button></div><div class="card-pad ai-signal-list"><div><span>Gold Chains</span><b>18 requests</b></div><div><span>Necklaces</span><b>12 requests</b></div><div><span>Bangles</span><b>9 requests</b></div><div><span>Rings</span><b>7 requests</b></div></div></article>
    <article class="card report-card"><div class="card-head"><div><div class="card-title">Fulfillment</div><div class="card-sub">Order preparation and delivery status</div></div><button class="btn btn-outline btn-sm" onclick="toast('Fulfillment report downloaded')">Download</button></div><div class="card-pad ai-signal-list"><div><span>In preparation</span><b>12</b></div><div><span>Ready for handover</span><b>8</b></div><div><span>Delivered</span><b>23</b></div><div><span>Average fulfillment time</span><b>4.2 days</b></div></div></article>
  </div>
  <div class="notice report-notice">${icon('help','notice-icon')}<span>Report figures reflect records currently available in MIDAS. Reconcile exported reports with shop receipts and accounting records.</span></div>`;
}

function shopStatTile(iconName, num, label, delta){
  return `<div class="card card-pad stat-tile">
    <div class="icon">${icon(iconName)}</div>
    <div class="stat-num">${num}</div>
    <div class="stat-label">${label}</div>
    ${delta?`<div class="stat-delta ${delta.startsWith('-')?'down':'up'}">${delta} vs last 7 days</div>`:''}
  </div>`;
}

function shopDashboard(){
  const s = DATA.shopStats;
  return `
  <div class="grid g-4" style="margin-bottom:8px">
    ${shopStatTile('doc', s.activeAgreements, 'Active Agreements')}
    ${shopStatTile('clock', s.pendingConfirmations, 'Pending Confirmations')}
    ${shopStatTile('box', s.ordersInPrep, 'Orders in Preparation')}
    ${shopStatTile('coins', bdt(s.commissionDue), 'Commission Due')}
  </div>

  <div class="section-h"><h2>Payment Confirmation Queue</h2><a href="#" onclick="go('shop','confirmations');return false">View all payment confirmations →</a></div>
  <div class="card">
    <table class="dtable">
      <thead><tr><th>Customer</th><th>Agreement</th><th>Submitted amount</th><th>Date</th><th>Evidence</th><th>Action</th></tr></thead>
      <tbody>
      ${DATA.confirmQueue.map(c=>`
        <tr>
          <td class="tname">${c.customer}</td>
          <td class="mono">${c.agreement}</td>
          <td class="mono">${bdt(c.amount)}</td>
          <td class="tmeta">${c.date}</td>
          <td><span class="link-view" onclick="toast('Opening evidence photo')">${icon('image')} Review</span></td>
          <td>
            <button class="btn btn-gold btn-sm" onclick="toast('Confirmed payment for ${c.customer}')">Confirm</button>
            <button class="btn btn-danger-outline btn-sm" onclick="toast('Rejected payment for ${c.customer}')">Reject</button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div class="section-h"><h2>Recent Purchase Requests</h2><a href="#" onclick="go('shop','requests');return false">View all purchase requests →</a></div>
  <div class="card">
    <table class="dtable">
      <thead><tr><th>Customer</th><th>Product</th><th>Type</th><th>Requested amount</th><th>Date</th><th>Action</th></tr></thead>
      <tbody>
      ${DATA.purchaseRequests.map(r=>`
        <tr>
          <td class="tname">${r.customer}</td>
          <td>${r.product}</td>
          <td>${statusBadge(r.type==='Direct'?'Not Settled':'Settled').replace(/badge-(red|green)/,'badge-muted').replace(r.type==='Direct'?'Not Settled':'Settled', r.type)}</td>
          <td class="mono">${bdt(r.amount)}</td>
          <td class="tmeta">${r.date}</td>
          <td>
            <button class="btn btn-gold btn-sm" onclick="toast('Accepted request from ${r.customer}')">Accept</button>
            <button class="btn btn-outline btn-sm" onclick="toast('Proposed revision to ${r.customer}')">Propose Revision</button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div class="grid g-2-1" style="margin-top:34px">
    <div class="card">
      <div class="card-head"><div class="card-title" style="font-size:16px">Order Fulfillment</div></div>
      <div class="card-pad grid g-4">
        <div class="u-center"><div style="color:var(--gold-dim);margin-bottom:6px">${icon('doc')}</div><div class="stat-num" style="font-size:22px">${DATA.fulfillment.accepted}</div><div class="stat-label">Accepted</div></div>
        <div class="u-center"><div style="color:var(--gold-dim);margin-bottom:6px">${icon('settings')}</div><div class="stat-num" style="font-size:22px">${DATA.fulfillment.prep}</div><div class="stat-label">In Preparation</div></div>
        <div class="u-center"><div style="color:var(--gold-dim);margin-bottom:6px">${icon('box')}</div><div class="stat-num" style="font-size:22px">${DATA.fulfillment.ready}</div><div class="stat-label">Ready</div></div>
        <div class="u-center"><div style="color:var(--gold-dim);margin-bottom:6px">${icon('bag')}</div><div class="stat-num" style="font-size:22px">${DATA.fulfillment.delivered}</div><div class="stat-label">Delivered</div></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-title" style="font-size:16px">Upcoming Installments</div></div>
      <div class="card-pad" style="display:flex;flex-direction:column;gap:12px">
        ${DATA.upcomingInstallments.slice(0,4).map(u=>`
          <div>
            <div class="u-flex" style="justify-content:space-between"><span style="font-weight:700;font-size:13px">${u.customer}</span><span class="mono" style="font-size:12.5px">${bdt(u.amount)}</span></div>
            <div class="tmeta">${u.due} · ${u.progress}</div>
          </div>`).join('')}
      </div>
    </div>
  </div>

  <div class="section-h"><h2>Your Commission Summary <span style="font-size:12px;color:var(--muted);font-weight:500">(Selected Period)</span></h2></div>
  <div class="card card-pad grid g-5">
    <div><div class="stat-label">Qualifying Completed Sales</div><div class="mono" style="font-weight:700;font-size:17px">${bdt(DATA.commissionSummary.qualifyingSales)}</div></div>
    <div><div class="stat-label">Commission Percentage</div><div class="mono" style="font-weight:700;font-size:17px">${DATA.commissionSummary.pct}%</div></div>
    <div><div class="stat-label">Calculated Commission</div><div class="mono" style="font-weight:700;font-size:17px">${bdt(DATA.commissionSummary.commission)}</div></div>
    <div><div class="stat-label">External Settlement Status</div><div style="font-weight:700;font-size:13.5px">${DATA.commissionSummary.settlement}</div><div class="tmeta">Expected: ${DATA.commissionSummary.expected}</div></div>
    <div style="display:flex;align-items:center"><button class="btn btn-outline btn-block" onclick="go('shop','commissions')">View Statement</button></div>
  </div>

  <div class="notice" style="margin-top:22px">${icon('help','notice-icon')}<span>MIDAS records transactions only. Customer payments are made directly to your shop.</span></div>
  `;
}

function shopProducts(){
  return `
  <div class="u-flex" style="justify-content:space-between;margin-bottom:18px">
    <div class="u-flex u-gap-10">
      <span class="filter-chip active">All (${DATA.products.length})</span>
      <span class="filter-chip">Published</span>
      <span class="filter-chip">Draft</span>
      <span class="filter-chip">Archived</span>
    </div>
    <button class="btn btn-gold" onclick="toast('Opening new product form')">+ Add Product</button>
  </div>
  <div class="card">
    <table class="dtable">
      <thead><tr><th>Product</th><th>Weight</th><th>Purity</th><th>Price</th><th>Purchase modes</th><th>Status</th><th></th></tr></thead>
      <tbody>
      ${DATA.products.filter(p=>p.shop==='Aurelia Jewellers').concat(DATA.products.slice(0,3)).map(p=>`
        <tr>
          <td class="tname">${p.name}</td>
          <td>${p.weight}</td>
          <td>${p.purity}</td>
          <td class="mono">${bdt(p.price)}</td>
          <td>${p.direct?'<span class="badge badge-muted">Direct</span> ':''}${p.installment?'<span class="badge badge-gold">Installment</span>':''}</td>
          <td><span class="badge badge-green">Published</span></td>
          <td><span class="link-view" onclick="toast('Editing ${p.name}')">Edit</span></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function shopRequests(){
  return `
  <div class="card">
    <table class="dtable">
      <thead><tr><th>Customer</th><th>Product</th><th>Type</th><th>Requested amount</th><th>Date</th><th>Action</th></tr></thead>
      <tbody>
      ${DATA.purchaseRequests.map(r=>`
        <tr>
          <td class="tname">${r.customer}</td><td>${r.product}</td>
          <td><span class="badge ${r.type==='Direct'?'badge-muted':'badge-gold'}">${r.type}</span></td>
          <td class="mono">${bdt(r.amount)}</td><td class="tmeta">${r.date}</td>
          <td><button class="btn btn-gold btn-sm" onclick="toast('Accepted')">Accept</button> <button class="btn btn-outline btn-sm" onclick="toast('Revision proposed')">Propose Revision</button> <button class="btn btn-danger-outline btn-sm" onclick="toast('Rejected')">Reject</button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function shopConfirmations(){
  return `
  <div class="card">
    <table class="dtable">
      <thead><tr><th>Customer</th><th>Agreement</th><th>Submitted amount</th><th>Date</th><th>Evidence</th><th>Action</th></tr></thead>
      <tbody>
      ${DATA.confirmQueue.map(c=>`
        <tr>
          <td class="tname">${c.customer}</td><td class="mono">${c.agreement}</td><td class="mono">${bdt(c.amount)}</td><td class="tmeta">${c.date}</td>
          <td><span class="link-view">${icon('image')} Review</span></td>
          <td><button class="btn btn-gold btn-sm" onclick="toast('Confirmed')">Confirm</button> <button class="btn btn-outline btn-sm" onclick="toast('Partially confirmed')">Partial</button> <button class="btn btn-danger-outline btn-sm" onclick="toast('Rejected')">Reject</button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
  <div class="notice" style="margin-top:16px">${icon('help','notice-icon')}<span>Confirming marks a record <b>Confirmed</b> and increases paid progress. A customer's submission alone is never presented as proven receipt.</span></div>
  `;
}

function shopUpcomingFull(){
  return `
  <div class="card">
    <table class="dtable">
      <thead><tr><th>Customer</th><th>Agreement</th><th>Due date</th><th>Installment</th><th>Amount</th></tr></thead>
      <tbody>
      ${DATA.upcomingInstallments.map(u=>`
        <tr><td class="tname">${u.customer}</td><td class="mono">${u.agreement}</td><td class="tmeta">${u.due}</td><td>${u.progress}</td><td class="mono">${bdt(u.amount)}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function shopOrders(){
  const f = DATA.fulfillment;
  const cols = [ ['Accepted', f.accepted, 'doc'], ['In Preparation', f.prep, 'settings'], ['Ready', f.ready, 'box'], ['Delivered', f.delivered, 'bag'] ];
  return `<div class="grid g-4">
    ${cols.map(c=>`<div class="card card-pad u-center"><div style="color:var(--gold-dim);margin-bottom:8px">${icon(c[2])}</div><div class="stat-num">${c[1]}</div><div class="stat-label">${c[0]}</div></div>`).join('')}
  </div>
  <div class="section-h"><h2>Orders</h2></div>
  <div class="card">
    <table class="dtable">
      <thead><tr><th>Customer</th><th>Product</th><th>Status</th><th>Updated</th><th></th></tr></thead>
      <tbody>
      ${DATA.purchaseRequests.map((r,i)=>`
        <tr><td class="tname">${r.customer}</td><td>${r.product}</td><td>${statusBadge(['Recorded','Confirmed','Not Settled'][i%3])}</td><td class="tmeta">${r.date}</td><td><span class="link-view">Update status</span></td></tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function shopCommissions(){
  const c = DATA.commissionSummary;
  return `
  <div class="card card-pad grid g-4" style="margin-bottom:26px">
    <div><div class="stat-label">Qualifying Completed Sales</div><div class="mono" style="font-weight:700;font-size:17px">${bdt(c.qualifyingSales)}</div></div>
    <div><div class="stat-label">Commission %</div><div class="mono" style="font-weight:700;font-size:17px">${c.pct}%</div></div>
    <div><div class="stat-label">Calculated Commission</div><div class="mono" style="font-weight:700;font-size:17px">${bdt(c.commission)}</div></div>
    <div><div class="stat-label">Settlement Status</div><div style="font-weight:700">${c.settlement}</div></div>
  </div>
  <div class="section-h"><h2>Statement History</h2><a href="#" onclick="toast('Downloading CSV');return false">${icon('download')} Export</a></div>
  <div class="card">
    <table class="dtable">
      <thead><tr><th>Period</th><th>Qualifying Sales</th><th>%</th><th>Commission</th><th>Status</th><th></th></tr></thead>
      <tbody>
        <tr><td>May 2025</td><td class="mono">${bdt(925000)}</td><td>2.00%</td><td class="mono">${bdt(18500)}</td><td>${statusBadge('Not Settled')}</td><td><span class="link-view">View</span></td></tr>
        <tr><td>Apr 2025</td><td class="mono">${bdt(860000)}</td><td>2.00%</td><td class="mono">${bdt(17200)}</td><td>${statusBadge('Settled')}</td><td><span class="link-view">View</span></td></tr>
        <tr><td>Mar 2025</td><td class="mono">${bdt(740000)}</td><td>2.00%</td><td class="mono">${bdt(14800)}</td><td>${statusBadge('Settled')}</td><td><span class="link-view">View</span></td></tr>
      </tbody>
    </table>
  </div>`;
}

/* ============================================================
   ADMIN — layout + views
   ============================================================ */
function adminNavItems(){
  return [
    { id:'dashboard', label:'Overview', icon:'home' },
    { id:'approvals', label:'Partner Approvals', icon:'shield', count:5 },
    { id:'users', label:'Users', icon:'users' },
    { id:'shops', label:'Shops', icon:'store' },
    { id:'products', label:'Products', icon:'bag' },
    { id:'agreements', label:'Agreements', icon:'doc' },
    { id:'transactions', label:'Transactions', icon:'swap' },
    { id:'c2c', label:'C2C Moderation', icon:'flag', count:5 },
    { id:'commissions', label:'Commissions', icon:'percent' },
    { id:'reports', label:'Reports', icon:'gauge' },
    { id:'audit', label:'Audit Logs', icon:'book' },
    { id:'settings', label:'Platform Settings', icon:'settings' },
  ];
}

function renderAdminLayout(view){
  view = view || 'dashboard';
  let content = '';
  if(view === 'dashboard') content = adminDashboard();
  else if(view === 'approvals') content = adminApprovals();
  else if(view === 'c2c') content = adminC2C();
  else if(view === 'commissions') content = adminCommissions();
  else if(view === 'transactions') content = adminTransactions();
  else if(view === 'audit') content = adminAudit();
  else if(view === 'users') content = adminUsers();
  else if(view === 'shops') content = adminShops();
  else if(view === 'products') content = adminProducts();
  else if(view === 'agreements') content = adminAgreements();
  else if(view === 'reports') content = adminReports();
  else if(view === 'settings') content = adminPlatformSettings();
  else content = adminDashboard();

  return `
  <div class="shell">
    <button class="sidebar-backdrop" aria-label="Close navigation" onclick="toggleSidebar()"></button>
    ${sidebarShell(adminNavItems(), view, 'Admin Control Center')}
    <div class="main">
      ${topbar(navLabel(adminNavItems(), view), '<span class="badge badge-gold" style="margin-left:0">Super Admin</span>', `<button class="btn btn-outline btn-sm" onclick="toast('Exporting report')">${icon('download')} Export Report</button>`)}
      <div class="content">${content}</div>
    </div>
  </div>`;
}

function adminDashboard(){
  const s = DATA.adminStats;
  return `
  <div class="grid g-4" style="margin-bottom:8px">
    ${shopStatTile('users', s.customers.toLocaleString(), 'Customers', '+128')}
    ${shopStatTile('store', s.shops, 'Partner Shops', '+3')}
    ${shopStatTile('doc', s.agreements.toLocaleString(), 'Active Agreements', '+56')}
    ${shopStatTile('coins', bdt(s.commissionDue), 'Commission Due')}
  </div>

  <div class="grid g-2-1" style="margin-top:26px">
    <div class="card">
      <div class="card-head"><div class="card-title" style="font-size:17px">Partner Approval Queue <span class="badge badge-warn" style="margin-left:6px">${DATA.approvalQueue.length}</span></div><a class="link-view" href="#" onclick="go('admin','approvals');return false">View all →</a></div>
      <table class="dtable">
        <thead><tr><th>Shop</th><th>Area</th><th>Documents</th><th>Submitted</th><th>Risk</th><th>Action</th></tr></thead>
        <tbody>
        ${DATA.approvalQueue.map(a=>`
          <tr>
            <td class="tname">${a.shop}</td><td class="tmeta">${a.area}</td><td>${a.docs}</td><td class="tmeta">${a.submitted}</td>
            <td><span class="badge ${a.risk==='Low'?'badge-green':a.risk==='Medium'?'badge-warn':'badge-red'}">${a.risk}</span></td>
            <td><button class="btn btn-gold btn-sm" onclick="toast('Approved ${a.shop}')">Approve</button> <button class="btn btn-danger-outline btn-sm" onclick="toast('Rejected ${a.shop}')">Reject</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-title" style="font-size:17px">Alerts &amp; Tasks</div></div>
      <div class="card-pad" style="display:flex;flex-direction:column;gap:14px">
        ${DATA.alerts.map(a=>`
          <div class="u-flex" style="justify-content:space-between;cursor:pointer" onclick="toast('${a.label}')">
            <span style="font-size:13px;font-weight:600">${icon('alert','')} ${a.label}</span>
            <span class="badge badge-gold">${a.count}</span>
          </div>`).join('')}
      </div>
    </div>
  </div>

  <div class="grid g-2" style="margin-top:26px">
    <div class="card">
      <div class="card-head"><div class="card-title" style="font-size:17px">Platform Transactions</div><a class="link-view" href="#" onclick="go('admin','transactions');return false">View all →</a></div>
      <table class="dtable">
        <thead><tr><th>Record ID</th><th>Parties</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
        ${DATA.platformTx.map(t=>`
          <tr><td class="mono tmeta">${t.id}</td><td style="font-size:12px">${t.parties}</td><td>${t.type}</td><td class="mono">${bdt(t.amount)}</td><td>${statusBadge(t.status)}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-title" style="font-size:17px">Commission Reconciliation</div><a class="link-view" href="#" onclick="go('admin','commissions');return false">View all →</a></div>
      <table class="dtable">
        <thead><tr><th>Shop</th><th>Sales</th><th>Commission</th><th>Status</th><th></th></tr></thead>
        <tbody>
        ${DATA.commissionRecon.slice(0,5).map(c=>`
          <tr><td class="tname">${c.shop}</td><td class="mono">${bdt(c.sales)}</td><td class="mono">${bdt(c.commission)}</td><td>${statusBadge(c.settlement)}</td><td><span class="link-view" onclick="toast('Reconciling ${c.shop}')">Reconcile</span></td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <div class="grid g-3" style="margin-top:26px">
    <div class="card">
      <div class="card-head"><div class="card-title" style="font-size:15px">C2C Moderation Queue <span class="badge badge-warn" style="margin-left:4px">${DATA.c2c.filter(c=>c.status==='Reported').length}</span></div></div>
      <div class="card-pad" style="display:flex;flex-direction:column;gap:12px">
        ${DATA.c2c.filter(c=>c.status==='Reported').map(c=>`
          <div>
            <div class="u-flex" style="justify-content:space-between"><span style="font-weight:700;font-size:12.5px">${c.title}</span><span class="mono" style="font-size:11.5px">${bdt(c.price)}</span></div>
            <div class="tmeta" style="margin-bottom:6px">Reported: ${c.reason}</div>
            <div class="u-flex u-gap-8"><button class="btn btn-outline btn-sm" onclick="toast('Hidden')">Hide</button><button class="btn btn-danger-outline btn-sm" onclick="toast('Suspended seller')">Suspend</button></div>
          </div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-title" style="font-size:15px">System Activity</div></div>
      <div class="card-pad" style="display:flex;flex-direction:column;gap:12px">
        ${DATA.auditLog.slice(0,4).map(a=>`<div><div style="font-size:12.5px;font-weight:600">${a.action}</div><div class="tmeta">${a.record} · ${a.time.split(' ').slice(-2).join(' ')}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-title" style="font-size:15px">Audit Log</div><a class="link-view" href="#" onclick="go('admin','audit');return false">View →</a></div>
      <div class="card-pad" style="display:flex;flex-direction:column;gap:12px">
        ${DATA.auditLog.slice(0,4).map(a=>`<div><div style="font-size:12.5px;font-weight:600">${a.actor}</div><div class="tmeta">${a.action} · ${a.record}</div></div>`).join('')}
      </div>
    </div>
  </div>
  <div class="foot-notice">MIDAS is a marketplace platform. All payments are facilitated by external partners. MIDAS does not process or hold funds.</div>
  `;
}

function adminApprovals(){
  return `<div class="card"><table class="dtable">
    <thead><tr><th>Shop</th><th>Area</th><th>Documents</th><th>Submitted</th><th>Risk</th><th>Action</th></tr></thead>
    <tbody>${DATA.approvalQueue.map(a=>`
      <tr><td class="tname">${a.shop}</td><td class="tmeta">${a.area}</td><td>${a.docs}</td><td class="tmeta">${a.submitted}</td>
      <td><span class="badge ${a.risk==='Low'?'badge-green':a.risk==='Medium'?'badge-warn':'badge-red'}">${a.risk}</span></td>
      <td><button class="btn btn-gold btn-sm" onclick="toast('Approved ${a.shop}')">Approve</button> <button class="btn btn-outline btn-sm" onclick="toast('Viewing documents')">Review</button> <button class="btn btn-danger-outline btn-sm" onclick="toast('Rejected ${a.shop}')">Reject</button></td></tr>`).join('')}
    </tbody></table></div>`;
}

function adminProducts(){
  const categories = [...new Set(DATA.products.map(product=>product.category))];
  const totalValue = DATA.products.reduce((sum,product)=>sum+product.price,0);
  return `<div class="grid g-4 admin-management-stats">
    ${shopStatTile('bag', DATA.products.length, 'Catalog Products')}
    ${shopStatTile('store', new Set(DATA.products.map(product=>product.shop)).size, 'Publishing Shops')}
    ${shopStatTile('calendar', DATA.products.filter(product=>product.installment).length, 'Installment Eligible')}
    ${shopStatTile('coins', bdt(totalValue), 'Catalog Reference Value')}
  </div>
  <div class="admin-list-toolbar"><div><h2>Product Management</h2><p>Review jewelry information, publishing status, weight, purity, and installment availability.</p></div><div class="u-flex u-gap-10 admin-filter-controls"><input class="field" id="admin-product-search" placeholder="Search product or shop" oninput="filterAdminProducts()"/><select class="field" id="admin-product-category" onchange="filterAdminProducts()"><option value="all">All categories</option>${categories.map(category=>`<option value="${category}">${category}</option>`).join('')}</select><select class="field" id="admin-product-status" onchange="filterAdminProducts()"><option value="all">All statuses</option><option>Published</option><option>Hidden</option></select></div></div>
  <div class="card admin-table-card"><table class="dtable" id="admin-products-table"><thead><tr><th>Product</th><th>Shop</th><th>Category</th><th>Gold</th><th>Reference Price</th><th>Minimum Installment</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    ${DATA.products.map((product,index)=>{ const productStatus = index === 7 ? 'Hidden' : 'Published'; return `<tr data-admin-product data-category="${product.category}" data-status="${productStatus}"><td><div class="admin-product-cell">${product.image ? `<img src="${product.image}" alt=""/>` : `<span class="admin-product-placeholder">${icon('bag')}</span>`}<div><div class="tname">${product.name}</div><div class="tmeta">${product.id}</div></div></div></td><td>${product.shop}</td><td><span class="badge badge-muted">${product.category}</span></td><td><div class="mono">${product.weight}</div><div class="tmeta">${product.purity}</div></td><td class="mono">${bdt(product.price)}</td><td class="mono">${bdt(product.minimumInstallment)}</td><td class="admin-status-cell">${statusBadge(productStatus)}</td><td><button class="btn btn-outline btn-sm" onclick="toast('Opening ${product.name}')">View</button> <button class="btn ${productStatus === 'Hidden' ? 'btn-outline' : 'btn-danger-outline'} btn-sm" onclick="toggleAdminProduct(this,'${product.name}')">${productStatus === 'Hidden' ? 'Publish' : 'Hide'}</button></td></tr>`}).join('')}
  </tbody></table><div class="admin-empty" hidden>No products match these filters.</div></div>`;
}

function adminAgreements(){
  const active = DATA.adminAgreements.filter(agreement=>agreement.status === 'Active').length;
  const completed = DATA.adminAgreements.filter(agreement=>agreement.status === 'Completed').length;
  const targetGold = DATA.adminAgreements.reduce((sum,agreement)=>sum+agreement.targetGold,0);
  const ownedGold = DATA.adminAgreements.reduce((sum,agreement)=>sum+agreement.ownedGold,0);
  return `<div class="grid g-4 admin-management-stats">
    ${shopStatTile('doc', DATA.adminStats.agreements.toLocaleString(), 'Platform Agreements', '+56')}
    ${shopStatTile('clock', active, 'Active in Current View')}
    ${shopStatTile('check', completed, 'Completed in Current View')}
    ${shopStatTile('gauge', `${ownedGold.toFixed(2)} g / ${targetGold.toFixed(2)} g`, 'Gold Progress in Current View')}
  </div>
  <div class="admin-list-toolbar"><div><h2>Agreement Management</h2><p>Track each customer's target jewelry gold and confirmed owned-gold progress.</p></div><div class="u-flex u-gap-10 admin-filter-controls"><input class="field" id="admin-agreement-search" placeholder="Search agreement, customer, shop, or product" oninput="filterAdminRecords('admin-agreements-table',this.value,document.getElementById('admin-agreement-status').value)"/><select class="field" id="admin-agreement-status" onchange="filterAdminRecords('admin-agreements-table',document.getElementById('admin-agreement-search').value,this.value)"><option value="all">All statuses</option><option>Active</option><option>Pending</option><option>Paused</option><option>Completed</option></select></div></div>
  <div class="card admin-table-card"><table class="dtable" id="admin-agreements-table"><thead><tr><th>Agreement</th><th>Customer and Shop</th><th>Product</th><th>Plan</th><th>Gold Progress</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead><tbody>
    ${DATA.adminAgreements.map(agreement=>{ const progress = Math.min(100,agreement.ownedGold/agreement.targetGold*100); return `<tr data-admin-record data-status="${agreement.status}"><td class="mono tmeta">${agreement.id}</td><td><div class="tname">${agreement.customer}</div><div class="tmeta">${agreement.shop}</div></td><td>${agreement.product}</td><td>${agreement.plan}</td><td><div class="agreement-progress"><div class="u-flex"><span class="mono">${grams(agreement.ownedGold)} / ${grams(agreement.targetGold)}</span><b>${progress.toFixed(1)}%</b></div><div class="progress"><span style="width:${progress}%"></span></div></div></td><td class="admin-status-cell">${statusBadge(agreement.status)}</td><td class="tmeta">${agreement.updated}</td><td><button class="btn btn-outline btn-sm" onclick="toast('Opening ${agreement.id}')">View</button> ${agreement.status !== 'Completed' ? `<button class="btn btn-outline btn-sm" onclick="toggleAdminAgreement(this,'${agreement.id}')">${agreement.status === 'Paused' ? 'Resume' : 'Pause'}</button>` : ''}</td></tr>`}).join('')}
  </tbody></table><div class="admin-empty" hidden>No agreements match these filters.</div></div>`;
}

function filterAdminProducts(){
  const table = document.getElementById('admin-products-table');
  if(!table) return;
  const query = document.getElementById('admin-product-search').value.trim().toLowerCase();
  const category = document.getElementById('admin-product-category').value;
  const status = document.getElementById('admin-product-status').value;
  const rows = [...table.querySelectorAll('[data-admin-product]')];
  rows.forEach(row=>row.hidden = !((!query || row.textContent.toLowerCase().includes(query)) && (category === 'all' || row.dataset.category === category) && (status === 'all' || row.dataset.status === status)));
  table.closest('.admin-table-card').querySelector('.admin-empty').hidden = rows.some(row=>!row.hidden);
}
function toggleAdminProduct(button, name){
  const row = button.closest('[data-admin-product]');
  const publishing = row.dataset.status === 'Hidden';
  row.dataset.status = publishing ? 'Published' : 'Hidden';
  row.querySelector('.admin-status-cell').innerHTML = statusBadge(row.dataset.status);
  button.textContent = publishing ? 'Hide' : 'Publish';
  button.className = `btn ${publishing ? 'btn-danger-outline' : 'btn-outline'} btn-sm`;
  toast(`${name} ${publishing ? 'published' : 'hidden'}`);
}
function toggleAdminAgreement(button, id){
  const row = button.closest('[data-admin-record]');
  const resuming = row.dataset.status === 'Paused';
  row.dataset.status = resuming ? 'Active' : 'Paused';
  row.querySelector('.admin-status-cell').innerHTML = statusBadge(row.dataset.status);
  button.textContent = resuming ? 'Pause' : 'Resume';
  toast(`${id} ${resuming ? 'resumed' : 'paused'}`);
}
window.filterAdminProducts = filterAdminProducts;
window.toggleAdminProduct = toggleAdminProduct;
window.toggleAdminAgreement = toggleAdminAgreement;

function adminUsers(){
  const active = DATA.adminUsers.filter(user=>user.status === 'Active').length;
  const customers = DATA.adminUsers.filter(user=>user.role === 'Customer').length;
  return `<div class="grid g-4 admin-management-stats">
    ${shopStatTile('users', DATA.adminStats.customers.toLocaleString(), 'Total Users', '+128')}
    ${shopStatTile('check', active, 'Active in Current View')}
    ${shopStatTile('bag', customers, 'Customers in Current View')}
    ${shopStatTile('store', DATA.adminUsers.filter(user=>user.role === 'Shop Owner').length, 'Shop Owners in Current View')}
  </div>
  <div class="admin-list-toolbar"><div><h2>User Management</h2><p>Review customer and shop-owner accounts, activity, and access status.</p></div><div class="u-flex u-gap-10 admin-filter-controls"><input class="field" id="admin-user-search" placeholder="Search name, email, or ID" oninput="filterAdminRecords('admin-users-table',this.value,document.getElementById('admin-user-status').value)"/><select class="field" id="admin-user-status" onchange="filterAdminRecords('admin-users-table',document.getElementById('admin-user-search').value,this.value)"><option value="all">All statuses</option><option>Active</option><option>Pending</option><option>Suspended</option></select></div></div>
  <div class="card admin-table-card"><table class="dtable" id="admin-users-table"><thead><tr><th>User</th><th>Role</th><th>Joined</th><th>Agreements</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    ${DATA.adminUsers.map(user=>`<tr data-admin-record data-status="${user.status}"><td><div class="tname">${user.name}</div><div class="tmeta">${user.id} · ${user.contact}</div></td><td><span class="badge ${user.role === 'Shop Owner' ? 'badge-gold' : 'badge-muted'}">${user.role}</span></td><td class="tmeta">${user.joined}</td><td class="mono">${user.agreements}</td><td class="admin-status-cell">${statusBadge(user.status)}</td><td><button class="btn btn-outline btn-sm" onclick="toast('Opening ${user.name} account')">View</button> <button class="btn ${user.status === 'Suspended' ? 'btn-outline' : 'btn-danger-outline'} btn-sm" onclick="toggleAdminRecord(this,'${user.name}')">${user.status === 'Suspended' ? 'Restore' : 'Suspend'}</button></td></tr>`).join('')}
  </tbody></table><div class="admin-empty" hidden>No users match these filters.</div></div>`;
}

function adminShops(){
  return `<div class="grid g-4 admin-management-stats">
    ${shopStatTile('store', DATA.adminStats.shops, 'Total Shops', '+3')}
    ${shopStatTile('check', DATA.adminShops.filter(shop=>shop.verification === 'Verified').length, 'Verified in Current View')}
    ${shopStatTile('clock', DATA.adminShops.filter(shop=>shop.verification === 'Pending').length, 'Awaiting Verification')}
    ${shopStatTile('bag', DATA.adminShops.reduce((sum,shop)=>sum+shop.products,0), 'Published Products')}
  </div>
  <div class="admin-list-toolbar"><div><h2>Shop Management</h2><p>Manage partner profiles, verification status, catalogs, and marketplace access.</p></div><div class="u-flex u-gap-10 admin-filter-controls"><input class="field" id="admin-shop-search" placeholder="Search shop, owner, area, or ID" oninput="filterAdminRecords('admin-shops-table',this.value,document.getElementById('admin-shop-status').value)"/><select class="field" id="admin-shop-status" onchange="filterAdminRecords('admin-shops-table',document.getElementById('admin-shop-search').value,this.value)"><option value="all">All statuses</option><option>Active</option><option>Under Review</option><option>Suspended</option></select></div></div>
  <div class="card admin-table-card"><table class="dtable" id="admin-shops-table"><thead><tr><th>Shop</th><th>Location</th><th>Products</th><th>Agreements</th><th>Verification</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    ${DATA.adminShops.map(shop=>`<tr data-admin-record data-status="${shop.status}"><td><div class="tname">${shop.name}</div><div class="tmeta">${shop.id} · ${shop.owner}</div></td><td class="tmeta">${shop.area}</td><td class="mono">${shop.products}</td><td class="mono">${shop.agreements}</td><td><span class="badge ${shop.verification === 'Verified' ? 'badge-green' : 'badge-warn'}">${shop.verification}</span></td><td class="admin-status-cell">${statusBadge(shop.status)}</td><td><button class="btn btn-outline btn-sm" onclick="toast('Opening ${shop.name} profile')">View</button> ${shop.verification === 'Pending' ? `<button class="btn btn-gold btn-sm" onclick="toast('${shop.name} approved')">Approve</button>` : ''}<button class="btn btn-danger-outline btn-sm" onclick="toggleAdminRecord(this,'${shop.name}')">Suspend</button></td></tr>`).join('')}
  </tbody></table><div class="admin-empty" hidden>No shops match these filters.</div></div>`;
}

function filterAdminRecords(tableId, query, status){
  const table = document.getElementById(tableId);
  if(!table) return;
  const normalized = query.trim().toLowerCase();
  const rows = [...table.querySelectorAll('[data-admin-record]')];
  rows.forEach(row=>row.hidden = !((!normalized || row.textContent.toLowerCase().includes(normalized)) && (status === 'all' || row.dataset.status === status)));
  const empty = table.closest('.admin-table-card').querySelector('.admin-empty');
  empty.hidden = rows.some(row=>!row.hidden);
}
function toggleAdminRecord(button, name){
  const row = button.closest('[data-admin-record]');
  const restoring = row.dataset.status === 'Suspended';
  row.dataset.status = restoring ? 'Active' : 'Suspended';
  row.querySelector('.admin-status-cell').innerHTML = statusBadge(row.dataset.status);
  button.textContent = restoring ? 'Suspend' : 'Restore';
  button.className = `btn ${restoring ? 'btn-danger-outline' : 'btn-outline'} btn-sm`;
  toast(`${name} ${restoring ? 'restored' : 'suspended'}`);
}
window.filterAdminRecords = filterAdminRecords;
window.toggleAdminRecord = toggleAdminRecord;

function adminC2C(){
  return `<div class="card"><table class="dtable">
    <thead><tr><th>Listing</th><th>Price</th><th>Seller</th><th>Reason</th><th>Action</th></tr></thead>
    <tbody>${DATA.c2c.map(c=>`
      <tr><td class="tname">${c.title}</td><td class="mono">${bdt(c.price)}</td><td>${c.seller}</td><td class="tmeta">${c.reason||'Not provided'}</td>
      <td><button class="btn btn-outline btn-sm" onclick="toast('Hidden')">Hide</button> <button class="btn btn-outline btn-sm" onclick="toast('Restored')">Restore</button> <button class="btn btn-danger-outline btn-sm" onclick="toast('Suspended')">Suspend</button></td></tr>`).join('')}
    </tbody></table></div>`;
}

function adminCommissions(){
  return `<div class="card"><table class="dtable">
    <thead><tr><th>Shop</th><th>Period</th><th>Qualifying Sales</th><th>%</th><th>Commission</th><th>Settlement Status</th><th>Action</th></tr></thead>
    <tbody>${DATA.commissionRecon.map(c=>`
      <tr><td class="tname">${c.shop}</td><td>${c.period}</td><td class="mono">${bdt(c.sales)}</td><td>${c.pct}%</td><td class="mono">${bdt(c.commission)}</td><td>${statusBadge(c.settlement)}</td><td><span class="link-view" onclick="toast('Reconciling ${c.shop}')">Reconcile</span></td></tr>`).join('')}
    </tbody></table></div>`;
}

function adminTransactions(){
  return `
  <div class="u-flex u-gap-10" style="margin-bottom:16px">
    <span class="filter-chip active">All</span><span class="filter-chip">Installment</span><span class="filter-chip">Direct</span><span class="filter-chip">C2C</span>
  </div>
  <div class="card"><table class="dtable">
    <thead><tr><th>Record ID</th><th>Parties</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th><th></th></tr></thead>
    <tbody>${DATA.platformTx.map(t=>`
      <tr><td class="mono tmeta">${t.id}</td><td style="font-size:12px">${t.parties}</td><td>${t.type}</td><td class="mono">${bdt(t.amount)}</td><td>${statusBadge(t.status)}</td><td class="tmeta">${t.date}</td><td><span class="link-view">${icon('eye')}</span></td></tr>`).join('')}
    </tbody></table></div>`;
}

function adminAudit(){
  return `<div class="card"><table class="dtable">
    <thead><tr><th>Actor</th><th>Action</th><th>Affected record</th><th>Time</th></tr></thead>
    <tbody>${DATA.auditLog.map(a=>`
      <tr><td class="tname">${a.actor}</td><td>${a.action}</td><td class="mono tmeta">${a.record}</td><td class="tmeta">${a.time}</td></tr>`).join('')}
    </tbody></table></div>`;
}

function adminReports(){
  return `<div class="report-toolbar admin-report-toolbar">
    <div><h2>Platform Reports</h2><p>Monitor marketplace growth, gold accumulation, partner activity, commissions, and C2C performance.</p></div>
    <div class="u-flex u-gap-10"><select class="field report-period" aria-label="Report period" onchange="updateAdminReportPeriod(this)"><option>Last 30 days</option><option>Last 90 days</option><option>This year</option><option>Custom period</option></select><button class="btn btn-gold" onclick="toast('Preparing platform report export')">${icon('download')} Export All</button></div>
  </div>
  <div class="grid g-4 report-summary">
    ${shopStatTile('coins', bdt(8420000), 'Marketplace Value', '+14.8%')}
    ${shopStatTile('doc', '1,842', 'Active Agreements', '+56')}
    ${shopStatTile('gauge', '4,286 g', 'Target Gold Recorded', '+318 g')}
    ${shopStatTile('percent', bdt(485000), 'Commission Due', '+9.2%')}
  </div>

  <div class="grid g-2 admin-report-grid">
    <article class="card report-card"><div class="card-head"><div><div class="card-title">Marketplace Performance</div><div class="card-sub">Platform purchase and agreement activity</div></div><button class="btn btn-outline btn-sm" onclick="toast('Marketplace report downloaded')">Download</button></div><div class="card-pad ai-signal-list"><div><span>Purchase requests submitted</span><b>684</b></div><div><span>Requests accepted</span><b>471</b></div><div><span>Agreement conversion rate</span><b>68.9%</b></div><div><span>Average jewelry value</span><b>${bdt(78500)}</b></div><div><span>Completed agreements</span><b>126</b></div></div></article>
    <article class="card report-card"><div class="card-head"><div><div class="card-title">Gold Accumulation</div><div class="card-sub">Target and confirmed customer gold records</div></div><button class="btn btn-outline btn-sm" onclick="toast('Gold accumulation report downloaded')">Download</button></div><div class="card-pad ai-signal-list"><div><span>Target gold recorded</span><b>4,286 g</b></div><div><span>Gold credited to customers</span><b>2,148 g</b></div><div><span>Average agreement completion</span><b>50.1%</b></div><div><span>Confirmed payment records</span><b>3,926</b></div><div><span>Awaiting shop confirmation</span><b>42</b></div></div></article>
    <article class="card report-card"><div class="card-head"><div><div class="card-title">Partner Shops</div><div class="card-sub">Verification, catalogs, and fulfillment</div></div><button class="btn btn-outline btn-sm" onclick="toast('Partner report downloaded')">Download</button></div><div class="card-pad ai-signal-list"><div><span>Active partner shops</span><b>126</b></div><div><span>Verification applications</span><b>5 pending</b></div><div><span>Published products</span><b>1,436</b></div><div><span>Orders fulfilled</span><b>892</b></div><div><span>Average fulfillment time</span><b>4.6 days</b></div></div></article>
    <article class="card report-card"><div class="card-head"><div><div class="card-title">Users and C2C</div><div class="card-sub">Customer growth and member marketplace activity</div></div><button class="btn btn-outline btn-sm" onclick="toast('User and C2C report downloaded')">Download</button></div><div class="card-pad ai-signal-list"><div><span>Total customers</span><b>5,248</b></div><div><span>New customers</span><b>128</b></div><div><span>Active C2C listings</span><b>214</b></div><div><span>Owned-gold listings</span><b>86</b></div><div><span>Jewelry listings</span><b>128</b></div></div></article>
  </div>

  <div class="card admin-report-table"><div class="card-head"><div><div class="card-title">Partner Performance</div><div class="card-sub">Highest marketplace activity during the selected period</div></div><button class="btn btn-outline btn-sm" onclick="toast('Partner performance exported')">${icon('download')} Export</button></div><table class="dtable"><thead><tr><th>Partner Shop</th><th>Qualifying Sales</th><th>Agreements</th><th>Gold Credited</th><th>Fulfilled Orders</th><th>Commission</th><th>Status</th></tr></thead><tbody>
    <tr><td class="tname">Golden Trust</td><td class="mono">${bdt(2450000)}</td><td>184</td><td class="mono">486.2 g</td><td>146</td><td class="mono">${bdt(49000)}</td><td>${statusBadge('Active')}</td></tr>
    <tr><td class="tname">Aurelia Jewellers</td><td class="mono">${bdt(2180000)}</td><td>162</td><td class="mono">421.8 g</td><td>128</td><td class="mono">${bdt(43600)}</td><td>${statusBadge('Active')}</td></tr>
    <tr><td class="tname">Pearl Jewels</td><td class="mono">${bdt(1920000)}</td><td>143</td><td class="mono">374.5 g</td><td>112</td><td class="mono">${bdt(38400)}</td><td>${statusBadge('Active')}</td></tr>
    <tr><td class="tname">Raj Jewellers</td><td class="mono">${bdt(1460000)}</td><td>109</td><td class="mono">286.1 g</td><td>91</td><td class="mono">${bdt(29200)}</td><td>${statusBadge('Active')}</td></tr>
  </tbody></table></div>

  <div class="grid g-3 report-export-grid">
    <button class="card card-pad report-export-card" onclick="toast('Financial report downloaded')">${icon('coins')}<span><b>Financial Report</b><small>Marketplace value, commissions, and settlement status</small></span>${icon('download')}</button>
    <button class="card card-pad report-export-card" onclick="toast('Operational report downloaded')">${icon('settings')}<span><b>Operational Report</b><small>Agreements, confirmations, orders, and fulfillment</small></span>${icon('download')}</button>
    <button class="card card-pad report-export-card" onclick="toast('Gold ledger report downloaded')">${icon('book')}<span><b>Gold Ledger Report</b><small>Target gold, credited weight, rates, and progress</small></span>${icon('download')}</button>
  </div>
  <div class="notice report-notice">${icon('help','notice-icon')}<span>Reports represent MIDAS marketplace records. Payments occur outside the platform and should be reconciled against partner-shop evidence before financial use.</span></div>`;
}
function updateAdminReportPeriod(select){
  toast('Report period updated to '+select.options[select.selectedIndex].text);
}
window.updateAdminReportPeriod = updateAdminReportPeriod;

function adminPlatformSettings(){
  let settings = {};
  try { settings = JSON.parse(localStorage.getItem('midas-platform-settings') || '{}'); } catch(e) {}
  const value = (key, fallback) => settings[key] ?? fallback;
  const selected = (key, option, fallback) => value(key, fallback) === option ? 'selected' : '';
  const checked = (key, fallback=true) => value(key, fallback) ? 'checked' : '';
  return `<form class="platform-settings" onsubmit="savePlatformSettings(event)">
    <div class="platform-settings-header"><div><h2>Platform Settings</h2><p>Configure marketplace-wide rules and operational preferences.</p></div><div class="u-flex u-gap-10"><span class="settings-save-state" id="settings-save-state">Changes are saved locally</span><button class="btn btn-gold" type="submit">Save Settings</button></div></div>

    <section class="card settings-section"><div class="card-head"><div><div class="card-title">Marketplace and Commission</div><div class="card-sub">Commercial rules applied to partner activity.</div></div></div><div class="card-pad settings-form-grid">
      <div><label class="field-label" for="platform-commission">Partner commission (%)</label><input class="field" id="platform-commission" name="commissionRate" type="number" min="0" max="100" step="0.1" value="${value('commissionRate','2.0')}" required/><div class="field-help">Applied to qualifying partner sales.</div></div>
      <div><label class="field-label" for="platform-currency">Display currency</label><select class="field" id="platform-currency" name="currency"><option value="BDT" ${selected('currency','BDT','BDT')}>BDT · Bangladeshi Taka</option></select></div>
      <div><label class="field-label" for="platform-min-shop-products">Minimum published products</label><input class="field" id="platform-min-shop-products" name="minimumProducts" type="number" min="0" step="1" value="${value('minimumProducts','3')}"/></div>
      <div><label class="field-label" for="platform-settlement">Commission settlement cycle</label><select class="field" id="platform-settlement" name="settlementCycle"><option value="monthly" ${selected('settlementCycle','monthly','monthly')}>Monthly</option><option value="biweekly" ${selected('settlementCycle','biweekly','monthly')}>Every two weeks</option><option value="weekly" ${selected('settlementCycle','weekly','monthly')}>Weekly</option></select></div>
    </div></section>

    <section class="card settings-section"><div class="card-head"><div><div class="card-title">Gold Accumulation</div><div class="card-sub">Rate source and confirmation rules for credited gold.</div></div></div><div class="card-pad settings-form-grid">
      <div><label class="field-label" for="platform-rate-source">Gold-rate provider</label><select class="field" id="platform-rate-source" name="rateProvider"><option value="trendline" ${selected('rateProvider','trendline','trendline')}>Trendline API</option></select><div class="field-help">Payment-time rates are retained with each confirmed record.</div></div>
      <div><label class="field-label" for="platform-rate-refresh">Rate refresh interval</label><select class="field" id="platform-rate-refresh" name="rateRefresh"><option value="5" ${selected('rateRefresh','5','15')}>Every 5 minutes</option><option value="15" ${selected('rateRefresh','15','15')}>Every 15 minutes</option><option value="30" ${selected('rateRefresh','30','15')}>Every 30 minutes</option><option value="60" ${selected('rateRefresh','60','15')}>Every hour</option></select></div>
      <div><label class="field-label" for="platform-confirmation-window">Confirmation window (hours)</label><input class="field" id="platform-confirmation-window" name="confirmationWindow" type="number" min="1" max="168" value="${value('confirmationWindow','24')}"/></div>
      <div><label class="field-label" for="platform-rate-fallback">If live rate is unavailable</label><select class="field" id="platform-rate-fallback" name="rateFallback"><option value="pause" ${selected('rateFallback','pause','pause')}>Pause gold credit</option><option value="latest" ${selected('rateFallback','latest','pause')}>Use latest recorded rate</option><option value="manual" ${selected('rateFallback','manual','pause')}>Require admin rate</option></select></div>
      <label class="setting-toggle"><input type="checkbox" name="shopConfirmationRequired" ${checked('shopConfirmationRequired')}/><span><b>Require shop confirmation</b><small>Gold is credited only after the partner confirms receipt.</small></span></label>
      <label class="setting-toggle"><input type="checkbox" name="preserveRateHistory" ${checked('preserveRateHistory')}/><span><b>Preserve rate history</b><small>Keep the exact conversion rate used for every gold credit.</small></span></label>
    </div></section>

    <section class="card settings-section"><div class="card-head"><div><div class="card-title">C2C Marketplace</div><div class="card-sub">Controls for jewelry and owned-gold listings.</div></div></div><div class="card-pad settings-form-grid">
      <div><label class="field-label" for="platform-listing-duration">Listing duration</label><select class="field" id="platform-listing-duration" name="listingDuration"><option value="15" ${selected('listingDuration','15','30')}>15 days</option><option value="30" ${selected('listingDuration','30','30')}>30 days</option><option value="60" ${selected('listingDuration','60','30')}>60 days</option></select></div>
      <div><label class="field-label" for="platform-c2c-limit">Maximum active listings per user</label><input class="field" id="platform-c2c-limit" name="maximumListings" type="number" min="1" max="100" value="${value('maximumListings','10')}"/></div>
      <label class="setting-toggle"><input type="checkbox" name="allowJewelryListings" ${checked('allowJewelryListings')}/><span><b>Allow physical jewelry listings</b><small>Customers may publish jewelry they own.</small></span></label>
      <label class="setting-toggle"><input type="checkbox" name="allowOwnedGoldListings" ${checked('allowOwnedGoldListings')}/><span><b>Allow owned-gold listings</b><small>Customers may list confirmed gold from their MIDAS balance.</small></span></label>
      <label class="setting-toggle"><input type="checkbox" name="moderateNewListings" ${checked('moderateNewListings',false)}/><span><b>Review new listings before publication</b><small>New C2C listings remain pending until reviewed.</small></span></label>
      <label class="setting-toggle"><input type="checkbox" name="preventOverListing" ${checked('preventOverListing')}/><span><b>Enforce owned-gold balance</b><small>Users cannot list more accumulated gold than they currently own.</small></span></label>
    </div></section>

    <section class="card settings-section"><div class="card-head"><div><div class="card-title">Security and Data</div><div class="card-sub">Session controls, audit history, and account protection.</div></div></div><div class="card-pad settings-form-grid">
      <div><label class="field-label" for="platform-session">Admin session timeout</label><select class="field" id="platform-session" name="sessionTimeout"><option value="15" ${selected('sessionTimeout','15','30')}>15 minutes</option><option value="30" ${selected('sessionTimeout','30','30')}>30 minutes</option><option value="60" ${selected('sessionTimeout','60','30')}>1 hour</option></select></div>
      <div><label class="field-label" for="platform-retention">Audit-log retention</label><select class="field" id="platform-retention" name="auditRetention"><option value="365" ${selected('auditRetention','365','730')}>1 year</option><option value="730" ${selected('auditRetention','730','730')}>2 years</option><option value="1825" ${selected('auditRetention','1825','730')}>5 years</option></select></div>
      <label class="setting-toggle"><input type="checkbox" name="adminTwoFactor" ${checked('adminTwoFactor')}/><span><b>Require admin two-factor authentication</b><small>All administrative accounts must complete a second verification step.</small></span></label>
      <label class="setting-toggle"><input type="checkbox" name="loginAlerts" ${checked('loginAlerts')}/><span><b>Unusual login alerts</b><small>Notify administrators when account access appears unusual.</small></span></label>
    </div></section>

    <section class="card settings-section"><div class="card-head"><div><div class="card-title">Platform Availability</div><div class="card-sub">Control customer and partner access during planned work.</div></div></div><div class="card-pad"><label class="setting-toggle danger-toggle"><input type="checkbox" name="maintenanceMode" ${checked('maintenanceMode',false)}/><span><b>Maintenance mode</b><small>Prevent non-admin access while platform maintenance is underway.</small></span></label></div></section>
  </form>`;
}
function savePlatformSettings(event){
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  ['shopConfirmationRequired','preserveRateHistory','allowJewelryListings','allowOwnedGoldListings','moderateNewListings','preventOverListing','adminTwoFactor','loginAlerts','maintenanceMode'].forEach(name=>data[name]=form.elements[name].checked);
  localStorage.setItem('midas-platform-settings',JSON.stringify(data));
  const state = document.getElementById('settings-save-state');
  if(state) state.textContent = 'Saved just now';
  toast('Platform settings saved');
}
window.savePlatformSettings = savePlatformSettings;
