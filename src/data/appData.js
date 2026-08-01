export const shops = [
  {
    id: 'sh-01',
    name: 'Diamond Plaza — Dhanmondi',
    area: 'Shimanto Shambhar, Level 3, Shop 3102, Jigatola, Dhanmondi, Dhaka',
    rating: 4.8,
    reviews: 86,
    lat: 23.7386,
    lng: 90.3754,
    image: 'https://www.diamondplazabd.com/public/images/logo-123236256640924.jpg',
  },
  {
    id: 'sh-02',
    name: 'Diamond World — Gulshan',
    area: 'Tower of Aakash, 54 Gulshan Avenue, Gulshan 1, Dhaka 1212',
    rating: 4.9,
    reviews: 214,
    lat: 23.7808,
    lng: 90.4167,
    image:
      'https://diamondworldltd.s3.amazonaws.com/images/Diamond-World/dw_logo_500px_x_300px.png',
  },
  {
    id: 'sh-03',
    name: 'Carat World',
    area: 'Shops 7–8, Block B, Level 7, Bashundhara City, Panthapath, Dhaka',
    rating: 4.7,
    reviews: 64,
    lat: 23.7508,
    lng: 90.3906,
    image: 'https://www.caratworld.com.bd/meta2.jpg',
  },
  {
    id: 'sh-04',
    name: 'Al-Amin Jewellers — Uttara',
    area: 'Shops 26–27, 1st Floor, Amir Complex, Uttara Model Town, Dhaka',
    rating: 4.6,
    reviews: 103,
    lat: 23.8759,
    lng: 90.3795,
    image:
      'https://www.alaminjewellers.com/wp-content/uploads/2025/03/ordinary-life-scene-from-mall-america-1400x785.jpg',
  },
  {
    id: 'sh-05',
    name: 'Diamond Plaza — Mirpur',
    area: 'Level 3, Shop 22, Mirpur DOHS Shopping Complex, Mirpur 12, Dhaka 1216',
    rating: 4.5,
    reviews: 51,
    lat: 23.8358,
    lng: 90.3678,
    image: 'https://www.diamondplazabd.com/public/images/logo-123236256640924.jpg',
  },
  {
    id: 'sh-06',
    name: 'Diamond Plaza — Bashundhara',
    area: 'Block B, Level 7, Shop 10, Bashundhara City Shopping Complex, Dhaka',
    rating: 4.7,
    reviews: 129,
    lat: 23.7508,
    lng: 90.3906,
    image: 'https://www.diamondplazabd.com/public/images/logo-123236256640924.jpg',
  },
]

export const seedProducts = [
  {
    id: 'p-01',
    name: '22K Gold Necklace',
    category: 'Necklaces',
    shop: shops[0].name,
    price: 125000,
    weight: '12.45 g',
    purity: '22K',
    minimumInstallment: 5000,
    image: '/images/demo-gold-necklace.jpg',
    inStock: true,
  },
  {
    id: 'p-02',
    name: 'Gold Bangle (22K)',
    category: 'Bangles',
    shop: shops[1].name,
    price: 78000,
    weight: '8.20 g',
    purity: '22K',
    minimumInstallment: 3000,
    image: '/images/gold-bangle-set.png',
    inStock: true,
  },
  {
    id: 'p-05',
    name: 'Gold Chain 22"',
    category: 'Chains',
    shop: shops[4].name,
    price: 145000,
    weight: '15.60 g',
    purity: '22K',
    minimumInstallment: 5000,
    image: '/images/gold-chain.png',
    inStock: true,
  },
  {
    id: 'p-07',
    name: 'Gold Ring, Solitaire Halo',
    category: 'Rings',
    shop: shops[0].name,
    price: 56000,
    weight: '5.4 g',
    purity: '22K',
    minimumInstallment: 2500,
    image: '/images/demo-gold-ring.jpg',
    inStock: true,
  },
]

export const installment = {
  shop: shops[0].name,
  product: 'Gold Necklace (22K)',
  targetGoldGrams: 12.45,
  purity: '22K',
  nextDue: '15 Aug 2025',
  nextAmount: 10000,
  currentTrendlineRate: 10150,
  schedule: [
    { n: 1, due: '15 Apr 2025', amount: 10000, goldRate: 9520, status: 'Confirmed' },
    { n: 2, due: '15 May 2025', amount: 10000, goldRate: 9680, status: 'Confirmed' },
    { n: 3, due: '15 Jun 2025', amount: 10000, goldRate: 9810, status: 'Confirmed' },
    { n: 4, due: '15 Jul 2025', amount: 20000, goldRate: 10020, status: 'Confirmed' },
    { n: 5, due: '15 Aug 2025', amount: 10000, status: 'Scheduled' },
    { n: 6, due: '15 Sep 2025', amount: 20000, status: 'Scheduled' },
  ],
}

export const activity = [
  { title: 'Payment recorded', meta: `${shops[0].name} · BDT 10,000`, when: '1 Aug' },
  { title: 'Shop visited', meta: shops[1].name, when: '31 Jul' },
  { title: 'Message received', meta: shops[2].name, when: '30 Jul' },
]

export const confirmations = [
  {
    customer: 'Midas Customer',
    agreement: 'AG-2025-0481',
    amount: 25000,
    date: 'May 23, 2025 · 10:15 AM',
  },
  {
    customer: 'Rahman Khan',
    agreement: 'AG-2025-0476',
    amount: 18500,
    date: 'May 23, 2025 · 09:42 AM',
  },
  {
    customer: 'Tahmina Akter',
    agreement: 'AG-2025-0472',
    amount: 30000,
    date: 'May 22, 2025 · 07:30 PM',
  },
  {
    customer: 'Mehedi Hasan',
    agreement: 'AG-2025-0468',
    amount: 12000,
    date: 'May 22, 2025 · 05:10 PM',
  },
]

export const requests = [
  {
    customer: 'Midas Customer',
    product: '22K Gold Necklace, 12.45 g',
    type: 'Installment',
    amount: 150000,
    date: 'May 23, 2025',
  },
  {
    customer: 'Rahman Khan',
    product: 'Gold Bangles Set, 2pc',
    type: 'Direct',
    amount: 95000,
    date: 'May 22, 2025',
  },
]

export const c2cListings = [
  {
    id: 'c1',
    title: 'Gold Chain, 22"',
    price: 145000,
    seller: 'User_3190',
    area: 'Mirpur, Dhaka',
    image: '/images/gold-chain.png',
  },
  {
    id: 'c2',
    title: 'Bangle Set, 2pc',
    price: 64000,
    seller: 'User_2210',
    area: 'Dhanmondi, Dhaka',
    image: '/images/gold-bangle-set.png',
  },
]

export const formatBDT = (value) => `BDT ${Number(value).toLocaleString('en-US')}`
export function installmentSummary() {
  const confirmed = installment.schedule.filter((row) => row.status === 'Confirmed')
  const goldOwned = confirmed.reduce((sum, row) => sum + row.amount / row.goldRate, 0)
  return {
    goldOwned,
    progress: Math.min(100, (goldOwned / installment.targetGoldGrams) * 100),
    spent: confirmed.reduce((sum, row) => sum + row.amount, 0),
  }
}
