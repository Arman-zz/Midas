const CHAT_API_URL = import.meta.env.VITE_MIDAS_CHAT_API_URL

const topics = [
  {
    match: ['installment', 'plan', 'কিস্তি'],
    answer:
      'Choose jewelry in the Marketplace and select “Request Installment Plan.” The shop must approve it before progress starts. You can have only one pending or active plan at a time.',
  },
  {
    match: ['payment', 'pay', 'টাকা', 'পেমেন্ট'],
    answer:
      'MIDAS never receives money. Pay directly at your partner shop. After the shop records the payment, its value is converted to gold using the current recorded gold rate.',
  },
  {
    match: ['progress', 'gold own', 'owned', '100%', 'অগ্রগতি'],
    answer:
      'Your progress is based on confirmed gold weight: gold you own divided by the jewelry target weight. At 100%, the plan completes and the shop is notified.',
  },
  {
    match: ['marketplace', 'jewelry', 'jewellery', 'গহনা'],
    answer:
      'The Marketplace contains jewelry uploaded by partner shops. Open an item to review its shop, purity, weight, and price, then request an installment plan.',
  },
  {
    match: ['c2c', 'resale', 'sell'],
    answer:
      'C2C is for member to member jewelry resale only. MIDAS does not process or guarantee those transactions, so inspect the item and meet safely.',
  },
  {
    match: ['shop', 'near', 'location', 'দোকান'],
    answer:
      'Open Partner Shops to browse available shops and their locations. Payments and jewelry collection happen directly at the selected shop.',
  },
  {
    match: ['hello', 'hi', 'hey', 'হ্যালো'],
    answer:
      'Hello! I can help with installment plans, shop payments, gold progress, marketplace jewelry, and C2C safety. What would you like to know?',
  },
]

function localAnswer(message, role) {
  const text = message.toLowerCase()
  const topic = topics.find((item) => item.match.some((keyword) => text.includes(keyword)))
  if (topic) return topic.answer
  if (role === 'shop') {
    return 'I can help you review installment requests, record shop received payments, manage products, and understand customer gold progress. Try asking about one of those topics.'
  }
  return 'I can help you find jewelry, request an installment plan, understand confirmed gold progress, or use C2C safely. Please ask about one of those topics.'
}

export async function getChatReply({ message, messages, role, signal }) {
  if (!CHAT_API_URL) return localAnswer(message, role)

  try {
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, messages: messages.slice(-8), role }),
      signal,
    })
    if (!response.ok) throw new Error('Assistant service unavailable')
    const payload = await response.json()
    if (!payload.reply?.trim()) throw new Error('Assistant returned an empty response')
    return payload.reply.trim()
  } catch (error) {
    if (error.name === 'AbortError') throw error
    return localAnswer(message, role)
  }
}
