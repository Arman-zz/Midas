import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import AppRouter from './routes/AppRouter'
import Chatbot from './components/common/Chatbot'

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
  'MIDAS does not process, hold, guarantee, or refund money. All payments are made directly between customers and partner shops, outside the platform.':
    'MIDAS টাকা প্রক্রিয়া করে না, ধরে রাখে না, গ্যারান্টি দেয় না এবং ফেরত দেয় না। সমস্ত পেমেন্ট সরাসরি গ্রাহক ও অংশীদার দোকানের মধ্যে করা হয়, প্ল্যাটফর্মের বাইরে।',
  'Verified Purity': 'যাচাইকৃত বিশুদ্ধতা',
  'Partner shops': 'অংশীদার দোকান',
  '126 approved': '১২৬ অনুমোদিত',
  'Commission recorded': 'কমিশন রেকর্ড করা হয়েছে',
  'Customers discover and buy. Shops fulfil and confirm. Every action lands in the same non-custodial record.':
    'গ্রাহকেরা পণ্য খুঁজে কেনেন। দোকান মালিকেরা অর্ডার পূরণ ও নিশ্চিত করেন। প্রতিটি কার্যক্রম একই স্বচ্ছ রেকর্ডে সংরক্ষিত হয়।',
  'গ্রাহকs discover and buy. দোকান owners fulfil and confirm. Every action lands in the same non-custodial record.':
    'গ্রাহকেরা পণ্য খুঁজে কেনেন। দোকান মালিকেরা অর্ডার পূরণ ও নিশ্চিত করেন। প্রতিটি কার্যক্রম একই স্বচ্ছ রেকর্ডে সংরক্ষিত হয়।',
  Customers: 'গ্রাহকেরা',
  'Shop owners': 'দোকান মালিকেরা',
  Shops: 'দোকানসমূহ',
  'discover and buy.': 'পণ্য খুঁজে কেনেন।',
  'fulfil and confirm.': 'অর্ডার পূরণ ও নিশ্চিত করেন।',
  'Every action lands in the same non-custodial record.':
    'প্রতিটি কার্যক্রম একই স্বচ্ছ রেকর্ডে সংরক্ষিত হয়।',
  'Customer to customer gold, safely framed.': 'গ্রাহক থেকে গ্রাহক স্বর্ণ, নিরাপদভাবে ফ্রেম করা।',
  'Every record, honestly labelled.': 'প্রতিটি রেকর্ড সততার সঙ্গে লেবেল করা হয়েছে।',
  "Submitted isn't the same as Confirmed. We never blur that line.":
    'জমা দেওয়া নিশ্চিতকরণের সমান নয়। আমরা কখনোই সেই রেখা অস্পষ্ট করি না।',
  'An installment is due. Nothing has happened yet.': 'একটি কিস্তি বাকি আছে। এখনো কিছু হয়নি।',
  'Customer recorded a payment they made directly to the shop.':
    'গ্রাহক দোকানে সরাসরি প্রদত্ত একটি পেমেন্ট রেকর্ড করেছেন।',
  'The shop verified receipt. Only this increases paid progress.':
    'দোকান রসিদ যাচাই করেছে। শুধুমাত্র এটাই প্রদত্ত অগ্রগতি বাড়ায়।',
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
  'MIDAS connects you with verified partner jewelry shops nearby for direct or installment purchases. We track every agreement and payment record, but your money always moves directly between you and the shop.':
    'MIDAS আপনাকে নিকটস্থ যাচাইকৃত অংশীদার জুয়েলারি দোকানের সঙ্গে সরাসরি বা কিস্তিতে কেনাকাটার জন্য যুক্ত করে। আমরা প্রতিটি চুক্তি ও পেমেন্ট রেকর্ড অনুসরণ করি, তবে আপনার অর্থ সবসময় সরাসরি আপনার ও দোকানের মধ্যে লেনদেন হয়।',
  'Gold progress': 'স্বর্ণের অগ্রগতি',
  '41.0% secured': '৪১.০% অর্জিত',
  'One platform, two roles, one ledger.': 'একটি প্ল্যাটফর্ম, দুটি ভূমিকা, একটি হিসাব।',
  'For Customers': 'গ্রাহকদের জন্য',
  'Discover, compare, buy': 'খুঁজুন, তুলনা করুন, কিনুন',
  'Find approved shops near you, compare products and installment terms, and track every payment record in one place.':
    'নিকটস্থ অনুমোদিত দোকান খুঁজুন, পণ্য ও কিস্তির শর্ত তুলনা করুন এবং সব পেমেন্ট রেকর্ড এক জায়গায় দেখুন।',
  'For Shop Owners': 'দোকান মালিকদের জন্য',
  'Confirm, manage, grow': 'নিশ্চিত করুন, পরিচালনা করুন, এগিয়ে যান',
  'Manage your catalog, accept purchase requests, confirm externally received payments, and review commission statements on your terms.':
    'আপনার ক্যাটালগ পরিচালনা করুন, ক্রয়ের অনুরোধ গ্রহণ করুন, বাইরে প্রাপ্ত পেমেন্ট নিশ্চিত করুন এবং কমিশন বিবরণী পর্যালোচনা করুন।',
  'Gold Chain, 22"': 'স্বর্ণের চেইন, ২২ ইঞ্চি',
  'Bangle Set, 2pc': 'চুড়ির সেট, ২টি',
  '2.5 g 22K MIDAS Gold': '২.৫ গ্রাম ২২কে MIDAS স্বর্ণ',
  '5 g 22K MIDAS Gold': '৫ গ্রাম ২২কে MIDAS স্বর্ণ',
  '1.75 g 21K MIDAS Gold': '১.৭৫ গ্রাম ২১কে MIDAS স্বর্ণ',
  'Mirpur, Dhaka': 'মিরপুর, ঢাকা',
  'Dhanmondi, Dhaka': 'ধানমন্ডি, ঢাকা',
  'Mohammadpur, Dhaka': 'মোহাম্মদপুর, ঢাকা',
  Platform: 'প্ল্যাটফর্ম',
  Support: 'সহায়তা',
  Company: 'কোম্পানি',
  'Non-custodial Payment Help': 'সরাসরি পেমেন্ট সহায়তা',
  'C2C Safety Guide': 'C2C নিরাপত্তা নির্দেশিকা',
  FAQ: 'সাধারণ প্রশ্ন',
  'Contact support': 'সহায়তায় যোগাযোগ করুন',
  'Legal & policies': 'আইন ও নীতিমালা',
  Privacy: 'গোপনীয়তা',
  Terms: 'শর্তাবলি',
  'A location-aware marketplace connecting customers with approved partner jewelry shops. MIDAS records agreements and progress. It never receives, holds, or moves customer money.':
    'অবস্থানভিত্তিক একটি মার্কেটপ্লেস, যা গ্রাহকদের অনুমোদিত অংশীদার জুয়েলারি দোকানের সঙ্গে যুক্ত করে। MIDAS চুক্তি ও অগ্রগতি রেকর্ড করে। এটি কখনো গ্রাহকের অর্থ গ্রহণ, সংরক্ষণ বা স্থানান্তর করে না।',
  '© 2026 MIDAS. Bangladesh · v3.1': '© ২০২৬ MIDAS। বাংলাদেশ · সংস্করণ ৩.১',
  'MIDAS is non-custodial. Payments are completed directly between customers and partner shops.':
    'MIDAS গ্রাহকের অর্থ সংরক্ষণ করে না। পেমেন্ট সরাসরি গ্রাহক ও অংশীদার দোকানের মধ্যে সম্পন্ন হয়।',
  Progress: 'অগ্রগতি',
  'paid progress': 'পরিশোধের অগ্রগতি',
  'My dashboard': 'আমার ড্যাশবোর্ড',
  'Welcome back': 'আবার স্বাগতম',
  'Secure account access': 'নিরাপদ অ্যাকাউন্ট প্রবেশ',
  'Mobile number or email': 'মোবাইল নম্বর অথবা ইমেইল',
  Password: 'পাসওয়ার্ড',
  Show: 'দেখুন',
  Hide: 'লুকান',
  'Remember me': 'আমাকে মনে রাখুন',
  'Forgot password?': 'পাসওয়ার্ড ভুলে গেছেন?',
  'New to MIDAS?': 'MIDAS-এ নতুন?',
  'Create your account': 'আপনার অ্যাকাউন্ট তৈরি করুন',
  'Already registered?': 'ইতিমধ্যে নিবন্ধিত?',
  'Full name': 'পূর্ণ নাম',
  Email: 'ইমেইল',
  'Mobile number': 'মোবাইল নম্বর',
  'Account Settings': 'অ্যাকাউন্ট সেটিংস',
  'Save changes': 'পরিবর্তন সংরক্ষণ করুন',
  'National ID (NID)': 'জাতীয় পরিচয়পত্র (NID)',
  'Recent Activity': 'সাম্প্রতিক কার্যক্রম',
  'Transaction History': 'লেনদেনের ইতিহাস',
  'No recent activity': 'কোনো সাম্প্রতিক কার্যক্রম নেই',
  'No transactions yet': 'এখনও কোনো লেনদেন নেই',
  'Recommended Jewelry': 'প্রস্তাবিত গহনা',
  'Partner Shops Near You': 'আপনার কাছাকাছি অংশীদার দোকান',
  'Active Installment': 'সক্রিয় কিস্তি',
  'No active plan': 'কোনো সক্রিয় পরিকল্পনা নেই',
  'Waiting for shop approval': 'দোকানের অনুমোদনের অপেক্ষায়',
  'Upcoming Due': 'আসন্ন কিস্তি',
  'Target jewelry gold': 'লক্ষ্য গহনার স্বর্ণ',
  'Gold you own': 'আপনার মালিকানাধীন স্বর্ণ',
  'Gold target': 'স্বর্ণের লক্ষ্য',
  'Confirmed gold': 'নিশ্চিত স্বর্ণ',
  'Total paid': 'মোট পরিশোধিত',
  'Active Agreement': 'সক্রিয় চুক্তি',
  'Installment schedule': 'কিস্তির সময়সূচি',
  'Payment record applications': 'পেমেন্ট রেকর্ডের আবেদন',
  'Apply for payment record': 'পেমেন্ট রেকর্ডের জন্য আবেদন করুন',
  'Apply for a payment record': 'পেমেন্ট রেকর্ডের জন্য আবেদন করুন',
  'Apply to add the payment to your record': 'আপনার রেকর্ডে পেমেন্ট যোগ করার আবেদন করুন',
  'Paid directly at the shop?': 'দোকানে সরাসরি পরিশোধ করেছেন?',
  'Invoice ID': 'ইনভয়েস আইডি',
  'Shop response': 'দোকানের উত্তর',
  'Awaiting shop review': 'দোকানের পর্যালোচনার অপেক্ষায়',
  'Payment added to your record': 'পেমেন্ট আপনার রেকর্ডে যোগ হয়েছে',
  'Send to shop for approval': 'অনুমোদনের জন্য দোকানে পাঠান',
  'Loading plans…': 'পরিকল্পনা লোড হচ্ছে…',
  'Loading products…': 'পণ্য লোড হচ্ছে…',
  'Loading listings…': 'তালিকা লোড হচ্ছে…',
  'Loading payment records…': 'পেমেন্ট রেকর্ড লোড হচ্ছে…',
  'No payment record applications yet.': 'এখনও কোনো পেমেন্ট রেকর্ডের আবেদন নেই।',
  'No payments yet. Your plan starts at 0%.':
    'এখনও কোনো পেমেন্ট নেই। আপনার পরিকল্পনা ০% থেকে শুরু হবে।',
  'Jewelry Marketplace': 'গহনার মার্কেটপ্লেস',
  'Marketplace Products': 'মার্কেটপ্লেস পণ্য',
  'Products uploaded by partner shops.': 'অংশীদার দোকানগুলোর আপলোড করা পণ্য।',
  'No products match your search.': 'আপনার অনুসন্ধানের সঙ্গে কোনো পণ্য মেলেনি।',
  'No jewelry matches your search.': 'আপনার অনুসন্ধানের সঙ্গে কোনো গহনা মেলেনি।',
  'Search results': 'অনুসন্ধানের ফলাফল',
  Category: 'বিভাগ',
  'In Stock': 'স্টকে আছে',
  'Out of Stock': 'স্টকে নেই',
  'C2C Listings': 'C2C তালিকা',
  'Create listing': 'তালিকা তৈরি করুন',
  'Create a C2C listing': 'একটি C2C তালিকা তৈরি করুন',
  'Asking price (BDT)': 'চাওয়া মূল্য (BDT)',
  'Publish listing': 'তালিকা প্রকাশ করুন',
  Area: 'এলাকা',
  'Business profile': 'ব্যবসায়িক প্রোফাইল',
  'Partner eligibility': 'অংশীদার হওয়ার যোগ্যতা',
  'Partner access': 'অংশীদার প্রবেশাধিকার',
  'Verification documents': 'যাচাইকরণ নথি',
  'Verification required': 'যাচাইকরণ প্রয়োজন',
  'Verification under review': 'যাচাইকরণ পর্যালোচনাধীন',
  'Verified MIDAS Partner': 'যাচাইকৃত MIDAS অংশীদার',
  'Registered shop name': 'নিবন্ধিত দোকানের নাম',
  'Owner or authorized person': 'মালিক বা অনুমোদিত ব্যক্তি',
  'Business phone': 'ব্যবসায়িক ফোন',
  'Business email': 'ব্যবসায়িক ইমেইল',
  'Trade license number': 'ট্রেড লাইসেন্স নম্বর',
  'Full business address': 'ব্যবসার পূর্ণ ঠিকানা',
  'Opening hours': 'খোলার সময়',
  'Customer-facing description': 'গ্রাহকের জন্য বিবরণ',
  'Save business profile': 'ব্যবসায়িক প্রোফাইল সংরক্ষণ করুন',
  'Get verified': 'যাচাইকরণ সম্পন্ন করুন',
  Verified: 'যাচাইকৃত',
  'Pending review': 'পর্যালোচনাধীন',
  'Not verified': 'যাচাই করা হয়নি',
  'Marketplace Products': 'মার্কেটপ্লেস পণ্য',
  'Add marketplace product': 'মার্কেটপ্লেসে পণ্য যোগ করুন',
  'Product photo *': 'পণ্যের ছবি *',
  'Product name': 'পণ্যের নাম',
  'Stock status': 'স্টকের অবস্থা',
  'Upload to marketplace': 'মার্কেটপ্লেসে আপলোড করুন',
  'Installment requests': 'কিস্তির আবেদন',
  'Customer installments': 'গ্রাহকের কিস্তি',
  'Payment records awaiting approval': 'অনুমোদনের অপেক্ষায় থাকা পেমেন্ট রেকর্ড',
  'Review & approve': 'পর্যালোচনা ও অনুমোদন',
  'Record customer payment': 'গ্রাহকের পেমেন্ট রেকর্ড করুন',
  'Amount paid': 'পরিশোধিত অর্থ',
  'Payment date': 'পেমেন্টের তারিখ',
  'Applied gold rate (BDT per gram)': 'প্রয়োগকৃত স্বর্ণের দর (প্রতি গ্রাম BDT)',
  'Approve payment & convert to gold': 'পেমেন্ট অনুমোদন ও স্বর্ণে রূপান্তর করুন',
  'Customer Payment Records': 'গ্রাহকের পেমেন্ট রেকর্ড',
  'Run your shop from one place': 'এক জায়গা থেকে আপনার দোকান পরিচালনা করুন',
  'Requests to review': 'পর্যালোচনার আবেদন',
  'Payments recorded': 'রেকর্ডকৃত পেমেন্ট',
  'Marketplace products': 'মার্কেটপ্লেস পণ্য',
  'Commission due': 'প্রদেয় কমিশন',
  'Needs your attention': 'আপনার মনোযোগ প্রয়োজন',
  'Quick management': 'দ্রুত ব্যবস্থাপনা',
  'Active installment plans': 'সক্রিয় কিস্তি পরিকল্পনা',
  'Recent payment records': 'সাম্প্রতিক পেমেন্ট রেকর্ড',
  'Operational Insights': 'পরিচালনাগত অন্তর্দৃষ্টি',
  'Refresh insights': 'অন্তর্দৃষ্টি হালনাগাদ করুন',
  Payments: 'পেমেন্টসমূহ',
  Inventory: 'মজুত',
  Plans: 'পরিকল্পনাসমূহ',
  'Administration overview': 'প্রশাসনিক সারসংক্ষেপ',
  'Platform operations': 'প্ল্যাটফর্ম পরিচালনা',
  'Verification queue': 'যাচাইকরণ সারি',
  'Verified partners': 'যাচাইকৃত অংশীদার',
  'Recorded payment value': 'রেকর্ডকৃত পেমেন্ট মূল্য',
  'Commission exposure': 'কমিশনের পরিমাণ',
  'Open plan requests': 'খোলা পরিকল্পনার আবেদন',
  'Active C2C listings': 'সক্রিয় C2C তালিকা',
  'Products in stock': 'স্টকে থাকা পণ্য',
  'Platform Reports': 'প্ল্যাটফর্ম প্রতিবেদন',
  'Platform intelligence': 'প্ল্যাটফর্ম বিশ্লেষণ',
  'Gold credited': 'জমাকৃত স্বর্ণ',
  'Verified partner coverage': 'যাচাইকৃত অংশীদার পরিধি',
  'Marketplace readiness': 'মার্কেটপ্লেস প্রস্তুতি',
  'Partner marketplace performance': 'অংশীদার মার্কেটপ্লেস কার্যকারিতা',
  'Platform Settings': 'প্ল্যাটফর্ম সেটিংস',
  'Administration controls': 'প্রশাসনিক নিয়ন্ত্রণ',
  'Fees and installment rules': 'ফি ও কিস্তির নিয়ম',
  'Partner verification': 'অংশীদার যাচাইকরণ',
  'Commission rate': 'কমিশনের হার',
  'Minimum installment': 'সর্বনিম্ন কিস্তি',
  'Payment edit window': 'পেমেন্ট সম্পাদনার সময়সীমা',
  'Save platform settings': 'প্ল্যাটফর্ম সেটিংস সংরক্ষণ করুন',
  Users: 'ব্যবহারকারীরা',
  Agreements: 'চুক্তিসমূহ',
  Transactions: 'লেনদেনসমূহ',
  Rejected: 'প্রত্যাখ্যাত',
  Completed: 'সম্পন্ন',
  Approved: 'অনুমোদিত',
  Pending: 'অপেক্ষমাণ',
  Decision: 'সিদ্ধান্ত',
  'Decision recorded': 'সিদ্ধান্ত রেকর্ড হয়েছে',
  'No notifications.': 'কোনো বিজ্ঞপ্তি নেই।',
  'Mark all read': 'সব পঠিত হিসেবে চিহ্নিত করুন',
  'MIDAS Assistant': 'MIDAS সহকারী',
  'Need more help?': 'আরও সাহায্য প্রয়োজন?',
  'Contact support': 'সহায়তায় যোগাযোগ করুন',
  'Gold ownership,': 'স্বর্ণের মালিকানা,',
  recorded: 'রেকর্ডকৃত',
  ', not held.': ', সংরক্ষিত নয়।',
  'The trusted gold marketplace': 'বিশ্বস্ত স্বর্ণের মার্কেটপ্লেস',
  'Explore the marketplace': 'মার্কেটপ্লেস ঘুরে দেখুন',
  'Jewelry uploaded by MIDAS partner shops.': 'MIDAS অংশীদার দোকানের আপলোড করা গহনা।',
  'View all jewelry →': 'সব গহনা দেখুন →',
  'One platform, two roles, one ledger.': 'একটি প্ল্যাটফর্ম, দুটি ভূমিকা, একটি হিসাব।',
  'Customers discover and buy. Shop owners accept and confirm. Every action lands in the same non-custodial record.':
    'গ্রাহকেরা পণ্য খুঁজে কেনেন। দোকান মালিকেরা গ্রহণ ও নিশ্চিত করেন। প্রতিটি কার্যক্রম একই স্বচ্ছ রেকর্ডে সংরক্ষিত হয়।',
  'Find partner shops near you, compare products and installment terms, and track every payment record.':
    'কাছাকাছি অংশীদার দোকান খুঁজুন, পণ্য ও কিস্তির শর্ত তুলনা করুন এবং প্রতিটি পেমেন্ট রেকর্ড অনুসরণ করুন।',
  'Upload your catalog, accept purchase requests, confirm payments, and review commission statements.':
    'আপনার ক্যাটালগ আপলোড করুন, ক্রয়ের আবেদন গ্রহণ করুন, পেমেন্ট নিশ্চিত করুন এবং কমিশনের বিবরণ পর্যালোচনা করুন।',
  'Every record, honestly labelled.': 'প্রতিটি রেকর্ড সততার সঙ্গে চিহ্নিত।',
  "Submitted isn't the same as Confirmed. We never blur that line.":
    'জমা দেওয়া আর নিশ্চিত হওয়া এক নয়। আমরা কখনো এই পার্থক্য অস্পষ্ট করি না।',
  'An installment is due. Nothing has happened yet.': 'একটি কিস্তির সময় হয়েছে। এখনও কিছু ঘটেনি।',
  'The customer recorded a direct payment.': 'গ্রাহক একটি সরাসরি পেমেন্ট রেকর্ড করেছেন।',
  'The shop verified receipt. Gold progress increases.':
    'দোকান রসিদ যাচাই করেছে। স্বর্ণের অগ্রগতি বৃদ্ধি পেয়েছে।',
  'Either party flagged a mismatch for review.':
    'যেকোনো পক্ষ পর্যালোচনার জন্য একটি অসঙ্গতি চিহ্নিত করেছে।',
  'For Customers': 'গ্রাহকদের জন্য',
  'For Shop Owners': 'দোকান মালিকদের জন্য',
  'Discover, compare, buy': 'খুঁজুন, তুলনা করুন, কিনুন',
  'Confirm, manage, grow': 'নিশ্চিত করুন, পরিচালনা করুন, এগিয়ে যান',
  Scheduled: 'নির্ধারিত',
  Submitted: 'জমা দেওয়া',
  Confirmed: 'নিশ্চিত',
  Disputed: 'বিতর্কিত',
  'Verified Purity': 'যাচাইকৃত বিশুদ্ধতা',
  'Gold progress': 'স্বর্ণের অগ্রগতি',
  'Partner shops': 'অংশীদার দোকান',
  approved: 'অনুমোদিত',
  secured: 'অর্জিত',
}

function normalizeText(value) {
  return value
    .replaceAll('\u2014', ' ')
    .replaceAll('\u2013', ' ')
    .replaceAll('\u2010', ' ')
    .replace(/(?<=\p{L})-(?=\p{L})/gu, ' ')
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
const appliedTranslations = new WeakMap()

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
  const current = node.nodeValue
  const lastApplied = appliedTranslations.get(node)
  if (
    !originals.has(node) ||
    (language === 'bn' && (lastApplied === undefined || current !== lastApplied))
  ) {
    originals.set(node, current)
  }
  const original = originals.get(node)
  originals.set(node, original)
  if (language === 'en') {
    if (node.nodeValue !== original) node.nodeValue = original
    appliedTranslations.delete(node)
    return
  }
  const trimmed = original.trim()
  if (!trimmed) return
  const translated = translateText(trimmed, language)
  const nextValue = original.replace(trimmed, translated)
  if (node.nodeValue !== nextValue) node.nodeValue = nextValue
  appliedTranslations.set(node, nextValue)
}

export default function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('midas-language') || 'en')
  const [languageSlot, setLanguageSlot] = useState(null)
  useEffect(() => {
    const updateSlot = () => setLanguageSlot(document.getElementById('language-switch-slot'))
    updateSlot()
    const observer = new MutationObserver(updateSlot)
    observer.observe(document.getElementById('root'), { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    localStorage.setItem('midas-language', language)
    document.documentElement.lang = language === 'bn' ? 'bn' : 'en'
    document.body.classList.toggle('bangla', language === 'bn')
    translateTree(document.getElementById('root'), language)

    const observer = new MutationObserver((mutations) => {
      if (language !== 'bn') return
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') translateNode(mutation.target, language)
        else mutation.addedNodes.forEach((node) => translateTree(node, language))
      })
    })
    observer.observe(document.getElementById('root'), {
      childList: true,
      characterData: true,
      subtree: true,
    })
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
      <Chatbot />
    </>
  )
}
