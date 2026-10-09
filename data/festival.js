// Edit this file each year: Mahalaya's date, the broadcast window, and the
// Puja day dates. Times are IST (+05:30). Reckoning cross-checked against
// public 2026 panchang sources (Mahalaya 10 Oct; Shashthi 16 Oct; Saptami
// 17–18 Oct; Ashtami 19 Oct; Nabami 20 Oct; Dashami 21 Oct) — exact tithi
// instants vary by local panchang, so treat these as calendar dates, not
// to-the-minute ritual timings.
export const MAHALAYA_ISO = '2026-10-10T04:00:00+05:30';
export const BROADCAST_HOURS = 2;

export const DAYS = [
  {
    id: 'mahalaya',
    bn: 'মহালয়া',
    en: 'Mahalaya',
    from: '2026-10-10',
    highlight: true,
    ritual: "Chandipath on the radio before dawn — the invocation that calls the goddess to begin her journey home. Not one of the five Puja days itself, but the morning that opens the season.",
  },
  {
    id: 'shashthi',
    bn: 'ষষ্ঠী',
    en: 'Shashthi',
    from: '2026-10-16',
    ritual: 'Bodhon: the goddess is ritually woken in the bilva tree, then the face of the idol is unveiled (Kolabou not yet bathed). Pandal-hopping unofficially begins tonight.',
  },
  {
    id: 'saptami',
    bn: 'সপ্তমী',
    en: 'Saptami',
    from: '2026-10-17',
    to: '2026-10-18',
    ritual: 'Nabapatrika Snan at dawn: nine plants bound as "Kolabou" are bathed in the river and installed beside Ganesh. The main puja formally begins.',
  },
  {
    id: 'ashtami',
    bn: 'অষ্টমী',
    en: 'Ashtami',
    from: '2026-10-19',
    ritual: 'The most austere day: Kumari Puja honours a young girl as the living goddess, and Sandhi Puja — 108 lamps, 108 lotuses — spans the exact junction of Ashtami into Nabami.',
  },
  {
    id: 'nabami',
    bn: 'নবমী',
    en: 'Nabami',
    from: '2026-10-20',
    ritual: 'Maha Nabami: havan (fire sacrifice) and the last full day of worship, often the biggest feast of the five days before the goodbyes of tomorrow.',
  },
  {
    id: 'dashami',
    bn: 'বিজয়া দশমী',
    en: 'Bijaya Dashami',
    from: '2026-10-21',
    ritual: 'Sindoor Khela — married women smear each other with vermilion — precedes the idol\'s procession to the river for Bisarjan (immersion), sending the goddess home with the promise "Aschhe bochor abar hobe."',
  },
];
