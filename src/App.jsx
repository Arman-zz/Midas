import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { initializeLegacy } from './data/mockData'
import AppRouter from './routes/AppRouter'

const translations = {
  'Prototype Navigator': 'প্রোটোটাইপ নেভিগেটর',
  'Public Site': 'পাবলিক সাইট',
  Customer: 'গ্রাহক',
  'Shop Owner': 'দোকান মালিক',
  Admin: 'অ্যাডমিন',
  Home: 'হোম',
  Marketplace: 'মার্কেটপ্লেস',
  'How it works': 'কীভাবে কাজ করে',
  'C2C Gold': 'ব্যক্তি থেকে ব্যক্তি স্বর্ণ',
  'Become a Partner': 'অংশীদার হোন',
  'Log in': 'লগ ইন',
  'Create account': 'অ্যাকাউন্ট তৈরি করুন',
  'Non-custodial by design': 'অধিকারহীন ডিজাইন',
  'Gold ownership, recorded, not held.': 'স্বর্ণের মালিকানা, রেকর্ড করা হয়েছে, ধরা হয় না।',
  'Find shops near you': 'আপনার কাছে দোকান খুঁজুন',
  'See how it works': 'কীভাবে কাজ করে দেখুন',
  'MIDAS does not process, hold, guarantee, or refund money. All payments are made directly between customers and partner shops, outside the platform.': 'MIDAS টাকা প্রক্রিয়া করে না, ধরে রাখে না, গ্যারান্টি দেয় না এবং ফেরত দেয় না। সমস্ত পেমেন্ট সরাসরি গ্রাহক ও অংশীদার দোকানের মধ্যে করা হয়, প্ল্যাটফর্মের বাইরে।',
  'Verified Purity': 'যাচাইকৃত বিশুদ্ধতা',
  'Partner shops': 'অংশীদার দোকান',
  '126 approved': '১২৬ অনুমোদিত',
  'Commission recorded': 'কমিশন রেকর্ড করা হয়েছে',
  'Customers discover and buy. Shops fulfil and confirm. Every action lands in the same non-custodial record.': 'গ্রাহকেরা পণ্য খুঁজে কেনেন। দোকান মালিকেরা অর্ডার পূরণ ও নিশ্চিত করেন। প্রতিটি কার্যক্রম একই স্বচ্ছ রেকর্ডে সংরক্ষিত হয়।',
  'গ্রাহকs discover and buy. দোকান owners fulfil and confirm. Every action lands in the same non-custodial record.': 'গ্রাহকেরা পণ্য খুঁজে কেনেন। দোকান মালিকেরা অর্ডার পূরণ ও নিশ্চিত করেন। প্রতিটি কার্যক্রম একই স্বচ্ছ রেকর্ডে সংরক্ষিত হয়।',
  'Customers': 'গ্রাহকেরা',
  'Shop owners': 'দোকান মালিকেরা',
  'Shops': 'দোকানসমূহ',
  'discover and buy.': 'পণ্য খুঁজে কেনেন।',
  'fulfil and confirm.': 'অর্ডার পূরণ ও নিশ্চিত করেন।',
  'Every action lands in the same non-custodial record.': 'প্রতিটি কার্যক্রম একই স্বচ্ছ রেকর্ডে সংরক্ষিত হয়।',
  'Customer to customer gold, safely framed.': 'গ্রাহক থেকে গ্রাহক স্বর্ণ, নিরাপদভাবে ফ্রেম করা।',
  'Every record, honestly labelled.': 'প্রতিটি রেকর্ড সততার সঙ্গে লেবেল করা হয়েছে।',
  "Submitted isn't the same as Confirmed. We never blur that line.": 'জমা দেওয়া নিশ্চিতকরণের সমান নয়। আমরা কখনোই সেই রেখা অস্পষ্ট করি না।',
  'An installment is due. Nothing has happened yet.': 'একটি কিস্তি বাকি আছে। এখনো কিছু হয়নি।',
  'Customer recorded a payment they made directly to the shop.': 'গ্রাহক দোকানে সরাসরি প্রদত্ত একটি পেমেন্ট রেকর্ড করেছেন।',
  'The shop verified receipt. Only this increases paid progress.': 'দোকান রসিদ যাচাই করেছে। শুধুমাত্র এটাই প্রদত্ত অগ্রগতি বাড়ায়।',
  'Either party flagged a mismatch for review.': 'যেকোনো পক্ষ পর্যালোচনায় অমিল চিহ্নিত করেছে।',
  'Non-custodial by design, since v1': 'v1 থেকে অধিকারহীন ডিজাইন',
  Overview: 'সারসংক্ষেপ',
  'Find Shops Near Me': 'কাছাকাছি দোকান খুঁজুন',
  'Browse Jewelry': 'গহনা দেখুন',
  'My Installments': 'আমার কিস্তি',
  'My Purchases': 'আমার কেনাকাটা',
  'C2C Marketplace': 'C2C মার্কেটপ্লেস',
  Messages: 'বার্তা',
  Notifications: 'বিজ্ঞপ্তি',
  Help: 'সহায়তা',
  Settings: 'সেটিংস',
  'Shop Profile': 'দোকানের প্রোফাইল',
  Products: 'পণ্য',
  'Purchase Requests': 'ক্রয় অনুরোধ',
  Installments: 'কিস্তি',
  'Payment Confirmations': 'পেমেন্ট নিশ্চিতকরণ',
  'Commission Statements': 'কমিশন বিবরণী',
  Disputes: 'বিরোধ',
  'Partner Approvals': 'অংশীদার অনুমোদন',
  Users: 'ব্যবহারকারী',
  Shops: 'দোকান',
  Agreements: 'চুক্তি',
  Transactions: 'লেনদেন',
  Commissions: 'কমিশন',
  Reports: 'রিপোর্ট',
  'Audit Logs': 'অডিট লগ',
  'Platform Settings': 'প্ল্যাটফর্ম সেটিংস',
  Search: 'খুঁজুন',
  'Search shops, products, agreements…': 'দোকান, পণ্য বা চুক্তি খুঁজুন…',
  Verified: 'যাচাইকৃত',
  'Verified Partner': 'যাচাইকৃত অংশীদার',
  'View all': 'সব দেখুন',
  'View Statement': 'বিবরণী দেখুন',
  Confirm: 'নিশ্চিত করুন',
  Reject: 'প্রত্যাখ্যান',
  Accept: 'গ্রহণ করুন',
  Review: 'পর্যালোচনা',
  Edit: 'সম্পাদনা',
  Cancel: 'বাতিল',
  'Submit Record': 'রেকর্ড জমা দিন',
  'Record payment': 'পেমেন্ট রেকর্ড করুন',
  'Add Product': 'পণ্য যোগ করুন',
  'Send Inquiry': 'অনুসন্ধান পাঠান',
  'Send Purchase Request': 'ক্রয় অনুরোধ পাঠান',
  Total: 'মোট',
  Paid: 'পরিশোধিত',
  Remaining: 'বাকি',
  'Next due': 'পরবর্তী তারিখ',
  Amount: 'পরিমাণ',
  Status: 'অবস্থা',
  Date: 'তারিখ',
  Action: 'কর্ম',
  Product: 'পণ্য',
  Price: 'মূল্য',
  Weight: 'ওজন',
  Purity: 'বিশুদ্ধতা',
  Shop: 'দোকান',
  Seller: 'বিক্রেতা',
  All: 'সব',
  Published: 'প্রকাশিত',
  Draft: 'খসড়া',
  Archived: 'আর্কাইভ করা',
  Scheduled: 'নির্ধারিত',
  Submitted: 'জমা হয়েছে',
  Confirmed: 'নিশ্চিত',
  Settled: 'নিষ্পত্তি হয়েছে',
  'Not Settled': 'নিষ্পত্তি হয়নি',
  'Under Review': 'পর্যালোচনাধীন',
  'Opening create listing form': 'নতুন তালিকা ফর্ম খোলা হচ্ছে',
  'My dashboard': 'আমার ড্যাশবোর্ড',
  'Gold ownership,': 'স্বর্ণের মালিকানা,',
  recorded: 'রেকর্ডকৃত',
  ', not held.': ', সংরক্ষিত নয়।',
  'MIDAS connects you with verified partner jewelry shops nearby for direct or installment purchases. We track every agreement and payment record, but your money always moves directly between you and the shop.': 'MIDAS আপনাকে নিকটস্থ যাচাইকৃত অংশীদার জুয়েলারি দোকানের সঙ্গে সরাসরি বা কিস্তিতে কেনাকাটার জন্য যুক্ত করে। আমরা প্রতিটি চুক্তি ও পেমেন্ট রেকর্ড অনুসরণ করি, তবে আপনার অর্থ সবসময় সরাসরি আপনার ও দোকানের মধ্যে লেনদেন হয়।',
  'Gold progress': 'স্বর্ণের অগ্রগতি',
  '41.0% secured': '৪১.০% অর্জিত',
  'One platform, two roles, one ledger.': 'একটি প্ল্যাটফর্ম, দুটি ভূমিকা, একটি হিসাব।',
  'For Customers': 'গ্রাহকদের জন্য',
  'Discover, compare, buy': 'খুঁজুন, তুলনা করুন, কিনুন',
  'Find approved shops near you, compare products and installment terms, and track every payment record in one place.': 'নিকটস্থ অনুমোদিত দোকান খুঁজুন, পণ্য ও কিস্তির শর্ত তুলনা করুন এবং সব পেমেন্ট রেকর্ড এক জায়গায় দেখুন।',
  'For Shop Owners': 'দোকান মালিকদের জন্য',
  'Confirm, manage, grow': 'নিশ্চিত করুন, পরিচালনা করুন, এগিয়ে যান',
  'Manage your catalog, accept purchase requests, confirm externally received payments, and review commission statements on your terms.': 'আপনার ক্যাটালগ পরিচালনা করুন, ক্রয়ের অনুরোধ গ্রহণ করুন, বাইরে প্রাপ্ত পেমেন্ট নিশ্চিত করুন এবং কমিশন বিবরণী পর্যালোচনা করুন।',
  'Gold Chain, 22"': 'স্বর্ণের চেইন, ২২ ইঞ্চি',
  'Bangle Set, 2pc': 'চুড়ির সেট, ২টি',
  '2.5 g 22K MIDAS Gold': '২.৫ গ্রাম ২২কে MIDAS স্বর্ণ',
  '5 g 22K MIDAS Gold': '৫ গ্রাম ২২কে MIDAS স্বর্ণ',
  '1.75 g 21K MIDAS Gold': '১.৭৫ গ্রাম ২১কে MIDAS স্বর্ণ',
  'Mirpur, Dhaka': 'মিরপুর, ঢাকা',
  'Dhanmondi, Dhaka': 'ধানমন্ডি, ঢাকা',
  'Mohammadpur, Dhaka': 'মোহাম্মদপুর, ঢাকা',
  'Platform': 'প্ল্যাটফর্ম',
  'Support': 'সহায়তা',
  'Company': 'কোম্পানি',
  'Non-custodial Payment Help': 'সরাসরি পেমেন্ট সহায়তা',
  'C2C Safety Guide': 'C2C নিরাপত্তা নির্দেশিকা',
  'FAQ': 'সাধারণ প্রশ্ন',
  'Contact support': 'সহায়তায় যোগাযোগ করুন',
  'Legal & policies': 'আইন ও নীতিমালা',
  'Privacy': 'গোপনীয়তা',
  'Terms': 'শর্তাবলি',
  'A location-aware marketplace connecting customers with approved partner jewelry shops. MIDAS records agreements and progress. It never receives, holds, or moves customer money.': 'অবস্থানভিত্তিক একটি মার্কেটপ্লেস, যা গ্রাহকদের অনুমোদিত অংশীদার জুয়েলারি দোকানের সঙ্গে যুক্ত করে। MIDAS চুক্তি ও অগ্রগতি রেকর্ড করে। এটি কখনো গ্রাহকের অর্থ গ্রহণ, সংরক্ষণ বা স্থানান্তর করে না।',
  '© 2026 MIDAS. Bangladesh · v3.1': '© ২০২৬ MIDAS। বাংলাদেশ · সংস্করণ ৩.১',
  'MIDAS is non-custodial. Payments are completed directly between customers and partner shops.': 'MIDAS গ্রাহকের অর্থ সংরক্ষণ করে না। পেমেন্ট সরাসরি গ্রাহক ও অংশীদার দোকানের মধ্যে সম্পন্ন হয়।',
  'Progress': 'অগ্রগতি',
  'paid progress': 'পরিশোধের অগ্রগতি',
}

function normalizeText(value) {
  return value.replaceAll('\u2014', '-').replaceAll('\u2013', '-').replaceAll('\u2010', '-')
}

function translateText(text, language) {
  if (language === 'en') return text
  const normalized = normalizeText(text)
  const exact = translations[text] || translations[normalized]
  if (exact) return exact
  return Object.entries(translations)
    .sort((a, b) => b[0].length - a[0].length)
    .reduce((value, [english, bangla]) => value.replaceAll(english, bangla), normalized)
}

const originals = new WeakMap()

function translateTree(root, language) {
  if (!root) return
  root.closest?.('[data-language-switch]') || translateNode(root, language)
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node
  while ((node = walker.nextNode())) {
    if (!node.parentElement?.closest('[data-language-switch]')) translateNode(node, language)
  }
  root.querySelectorAll?.('input[placeholder]').forEach((input) => {
    const original = input.dataset.originalPlaceholder || input.placeholder
    input.dataset.originalPlaceholder = original
    input.placeholder = language === 'bn' ? translateText(original, language) : original
  })
}

function translateNode(node, language) {
  if (node.nodeType !== Node.TEXT_NODE) return
  const original = originals.get(node) ?? node.nodeValue
  originals.set(node, original)
  if (language === 'en') {
    node.nodeValue = original
    return
  }
  const trimmed = original.trim()
  if (!trimmed) return
  const translated = translateText(trimmed, language)
  node.nodeValue = original.replace(trimmed, translated)
}

export default function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('midas-language') || 'en')
  const [languageSlot, setLanguageSlot] = useState(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      initializeLegacy()
    }
  }, [])

  useEffect(() => {
    const updateSlot = () => setLanguageSlot(document.getElementById('language-switch-slot'))
    updateSlot()
    const observer = new MutationObserver(updateSlot)
    observer.observe(document.getElementById('app'), { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    localStorage.setItem('midas-language', language)
    document.documentElement.lang = language === 'bn' ? 'bn' : 'en'
    document.body.classList.toggle('bangla', language === 'bn')
    translateTree(document.getElementById('app'), language)

    const observer = new MutationObserver((mutations) => {
      if (language !== 'bn') return
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => translateTree(node, language)))
    })
    observer.observe(document.getElementById('root'), { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [language])

  const languageButton = (
    <button
        type="button"
        className="language-switch"
        data-language-switch
        aria-label={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
        onClick={() => setLanguage((current) => (current === 'en' ? 'bn' : 'en'))}
      >
        <span aria-hidden="true">{language === 'en' ? 'অ' : 'A'}</span>
        {language === 'en' ? 'বাংলা' : 'English'}
    </button>
  )

  return (
    <>
      {languageSlot ? createPortal(languageButton, languageSlot) : languageButton}
      <AppRouter />
      <div id="toast" className="toast" role="status" aria-live="polite" />
    </>
  )
}
