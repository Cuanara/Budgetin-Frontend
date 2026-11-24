import type { WishlistItem } from '../../types/wishlist'

export const WISHLIST_MOCK: WishlistItem[] = [
  {
    id: '1',
    name: 'Sepatu lari',
    price: 850000,
    saved: 850000,
    link: 'https://tokopedia.com/sepatu-lari',
    delayDays: 7,
    dayElapsed: 3,
    createdAt: '2026-11-16',
    savings: [],
  },
  {
    id: '2',
    name: 'Headphone nirkabel',
    price: 3800000,
    saved: 2350000,
    link: 'https://tokopedia.com/headphone-nirkabel',
    delayDays: 14,
    dayElapsed: 14,
    createdAt: '2026-11-05',
    savings: [],
  },
  {
    id: '3',
    name: 'Tas ransel',
    price: 600000,
    saved: 180000,
    delayDays: 7,
    dayElapsed: 5,
    createdAt: '2026-11-12',
    savings: [
      { id: 's1', amount: 100000, date: '2026-11-14' },
      { id: 's2', amount: 80000, date: '2026-11-16' },
    ],
  },
]