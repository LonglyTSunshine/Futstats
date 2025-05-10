
const admin = require('firebase-admin');
const fetch = require('node-fetch');


const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

(async () => {
  try {
    const res = await fetch('https://api.football-data.org/v4/matches', {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
    });
    if (!res.ok) throw new Error(`API 返回 ${res.status}`);
    const data = await res.json();

    const batch = db.batch();
    data.matches.forEach(match => {
      const doc = db.collection('matches').doc(String(match.id));
      batch.set(doc, {
        time:   match.utcDate,
        teams:  `${match.homeTeam.name} vs ${match.awayTeam.name}`,
        score:  `${match.score.fullTime.home} - ${match.score.fullTime.away}`,
        status: match.status,            
        league: match.competition.name   
      }, { merge: true });
    });
    await batch.commit();
    console.log(`同步了 ${data.matches.length} 场比赛`);
  } catch (err) {
    console.error('同步失败', err);
  }
})();
