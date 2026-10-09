// Akashvani (All India Radio) Kolkata live HLS streams. These are public
// state-broadcaster streams (via radio-browser.info); re-verified reachable
// and CORS-open at build time. Rainbow carries the Mahalaya broadcast and is
// the default "live" station; the others are here so the tuning dial has
// somewhere real to go.
export const STATIONS = [
  {
    id: 'rainbow',
    name: 'FM Rainbow',
    tagline: 'Carries Mahalaya — Mahishasuramardini',
    url: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio058/hlspbaudio05864kbps.m3u8',
    dial: 0.18,
  },
  {
    id: 'geetanjali',
    name: 'Geetanjali',
    tagline: 'Bengali music & features',
    url: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio055/hlspbaudio05564kbps.m3u8',
    dial: 0.44,
  },
  {
    id: 'maitree',
    name: 'Maitree',
    tagline: 'News & entertainment',
    url: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio245/hlspbaudio24564kbps.m3u8',
    dial: 0.68,
  },
  {
    id: 'fmGold',
    name: 'FM Gold',
    tagline: 'Classic Hindi & Bengali hits',
    url: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio057/hlspbaudio05764kbps.m3u8',
    dial: 0.9,
  },
];

export const DEFAULT_STATION_ID = 'rainbow';

export function stationById(id) {
  return STATIONS.find(s => s.id === id) || STATIONS[0];
}
