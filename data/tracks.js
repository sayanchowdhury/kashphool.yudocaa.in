// Curated playlist data. Each entry references a public YouTube video by id;
// playback happens through YouTube's own embedded player (js/radio.js), so no
// audio is re-hosted here — this file only stores factual metadata (title,
// artist, running time) about publicly available recordings.
//
// cover: built from YouTube's own thumbnail CDN, so it never needs a local asset.
const ytCover = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const TRACKS = {
  mahalaya: [
    {
      id: 'yt-mahalaya-full',
      yt: 'YQyo8QeoYhc',
      title: 'Mahishasuramardini · Full broadcast',
      artist: 'Birendra Krishna Bhadra · Saregama',
      kind: 'mahalaya',
      dur: 5358,
    },
  ],
  chandi: [
    { id: 'c1', yt: '6ZCfPaz28_U', title: 'Ya Chandi', artist: 'Chorus', dur: 96 },
    { id: 'c2', yt: 'Zzi8ib_jFec', title: 'Simhastha Sashisekhara', artist: 'Chorus', dur: 55 },
    { id: 'c3', yt: '2Zqlb00ttCU', title: 'Bajlo Tomar Aalor Benu (with narration)', artist: 'Supriti Ghosh', dur: 264 },
    { id: 'c4', yt: 'MgRe-FltkYo', title: 'Tabo Achintya Rupa-Charita-Mahima', artist: 'Manabendra Mukherjee', dur: 238 },
    { id: 'c5', yt: '4Dt1gbgfGYY', title: 'Aham Rudrebhirvasubhischara', artist: 'Chorus', dur: 240 },
    { id: 'c6', yt: 'y1BxrvXleT8', title: 'Jayanati Mangala Kali', artist: 'Chorus', dur: 31 },
    { id: 'c7', yt: 'h5O3igngxCU', title: 'Jatajutasamayuktam Ardhendukrita-Sekharam', artist: 'Chorus', dur: 266 },
    { id: 'c8', yt: 'rxdEEnCRSgU', title: 'Namo Chandi Namo Chandi', artist: 'Bimal Bhushan', dur: 183 },
    { id: 'c9', yt: 'qdx842oMwnA', title: 'Ma Go Tabu Beene Sangeeta', artist: 'Sumitra Sen', dur: 212 },
    { id: 'c10', yt: 'zuVw7KFPQnk', title: 'He Chinmoyi', artist: 'Tarun Banerjee', dur: 176 },
    { id: 'c11', yt: '_RmN29SHVS8', title: 'Ogo Amar Agamani-Alo', artist: 'Sipra Basu', dur: 200 },
  ].map(t => ({ ...t, kind: 'chandi' })),
  pujo: [
    { yt: 'CLdcGCxFfds', title: 'Dugga Elo', artist: 'Monali Thakur, Guddu', dur: 147 },
    { yt: '3Gg0GP8DxhU', title: 'Dugga Ma', artist: 'Arijit Singh, Arindom', dur: 270 },
    { yt: 'EDfxdED-uRE', title: 'Baja Sanai Aar Baja Re Dhol', artist: 'Abhijeet, Nilakshi Bhattacharya', dur: 284 },
    { yt: 'E_6K3no0PD0', title: 'Shundori Komola', artist: 'Armaan Malik, Antara Mitra', dur: 194 },
    { yt: 'id5_3dKvEBg', title: 'Dhak Baja Kashor Baja', artist: 'Shreya Ghoshal, Jeet Gannguli', dur: 265 },
    { yt: 'NAUA2LM9hZc', title: 'Elo Je Maa', artist: 'Abhijeet', dur: 308 },
    { yt: 'z4Vc5wHoLiY', title: 'Dhaker Taley', artist: 'Abhijeet, Parineeta, Sudipto', dur: 283 },
    { yt: 'XyatKcoBrPw', title: 'Bolo Dugga Elo', artist: 'Sunidhi Chauhan, Kaushik-Guddu', dur: 199 },
    { yt: '3E_qefwPA0E', title: 'Joy Joy Durga Maa', artist: 'Abhijit Bhattacharya, Jeet Gannguli, Shaan', dur: 209 },
    { yt: 'bQtuffhU6_4', title: 'Esho Maa Durga', artist: 'Shamik Guha Roy, Suman Mickey Chatterjee', dur: 236 },
    { yt: 'EbcdDXEPukk', title: 'Aigiri Nandini (Rock Version)', artist: 'Sowrabha, Samarthan, Ramprakash', dur: 296 },
    { yt: 'p_hqO0sJh-I', title: 'Ailo Uma Barite', artist: 'Antara Nandy, Monami Ghosh', dur: 233 },
    { yt: 'aUO_yI7Hcfo', title: 'Pujor Gaan', artist: 'Poushali Bhattacharya, Abritte Talukdar', dur: 284 },
    { yt: '4h5DXcN6cd4', title: 'Aamaar Dugga', artist: 'Monali Thakur, Tyohaar, Anindya Chatterjee', dur: 199 },
    { yt: 'asdoVzpUFsE', title: 'Gouri Elo (from "Raktabeej")', artist: 'Dohar, Tirtha Bhattacharya', dur: 236 },
    { yt: 'sto9TBxGibE', title: 'Jago Uma', artist: 'Rupankar Bagchi, Anupam Roy', dur: 317 },
    { yt: 'haJg9VgzMM0', title: 'Pujo Pujo Gondho', artist: 'Anupam Roy', dur: 167 },
    { yt: 'Ev1NLm7Kd4g', title: 'Egiye De', artist: 'Arijit Singh, Madhubanti Bagchi, Arindom', dur: 254 },
    { yt: '-L34Afos8MQ', title: 'Shudhu Tomari Jonyo', artist: 'Arijit Singh', dur: 200 },
    { yt: 'jZc7DGsZkY0', title: 'Aashona', artist: 'Arijit Singh, Prashmita Paul, Arindom', dur: 244 },
    { yt: 'QMyj2QHZXBU', title: 'Tumi Aashe Paashe', artist: 'Monali Thakur, Nakash Aziz', dur: 262 },
    { yt: 'dJHzCyjCsLU', title: 'Hey Shokha', artist: 'Somlata Acharyya Chowdhury, Arindom', dur: 264 },
    { yt: 'mDEzESGA0h8', title: 'Chaarpashe Aalo Hok', artist: 'Indraadip Dasgupta, Kaushiki Chakraborty', dur: 694 },
    { yt: '7GYJcXSLwYo', title: 'O Thakur', artist: 'Upal Sengupta, Prosmita Pal', dur: 171 },
    { yt: 'QvhNGDZhJvE', title: 'Kalo Jole Kuchla Tole', artist: 'Iman Chakraborty', dur: 263 },
    { yt: 'd-NMikRHMQQ', title: 'Pujar Gaan (from "Hooligaanism")', artist: 'Hooligaanism, Anirban Bhattacharya', dur: 393 },
    { yt: 'wLVkrgkoPro', title: 'Mahishasura Mardhini', artist: 'Sri Vardhini, Sharath', dur: 353 },
    { yt: 'NwjbjGQXkdU', title: 'Dushtu Kokil', artist: 'Kona, Akassh', dur: 211 },
    { yt: 'G2tTYmSzR6U', title: 'Mala Re', artist: 'Jeet Gannguli', dur: 248 },
  ].map((t, i) => ({ ...t, id: 'p' + (i + 1), kind: 'pujo' })),
};

// Flat list with cover art filled in, plus the hidden live-radio pseudo-track
// that the player falls back to when nothing else is selected.
export const LIVE_TRACK = { id: 'live', title: "Akashvani FM Rainbow — Live", artist: 'All India Radio, Kolkata', kind: 'live', live: true };

export function allTracks() {
  return [LIVE_TRACK, ...TRACKS.mahalaya, ...TRACKS.chandi, ...TRACKS.pujo].map(t => (
    t.yt ? { ...t, cover: ytCover(t.yt) } : t
  ));
}

export function trackById(id) {
  return allTracks().find(t => t.id === id);
}
