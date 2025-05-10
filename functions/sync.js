const admin = require('firebase-admin');
const fetch = require('node-fetch');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const API_KEY = '956b286c4a3b4766a723f85d83c945fb';

async function sync() {
  const res = await fetch('https://api.football-data.org/v4/matches', {
    headers: { 'X-Auth-Token': API_KEY }
  });
  const json = await res.json();
  if (!Array.isArray(json.matches)) {
    console.error('No matches array', json);
    return;
  }
  const batch = db.batch();
  json.matches.forEach(m => {
    batch.set(
      db.collection('matches').doc(String(m.id)),
      {
        time:   new Date(m.utcDate).toLocaleTimeString(),
        teams:  `${m.homeTeam.name} vs ${m.awayTeam.name}`,
        score:  m.score.fullTime.home !== null
                  ? `${m.score.fullTime.home} - ${m.score.fullTime.away}`
                  : '',
        status: m.status,
        league: m.competition.name
      },
      { merge: true }
    );
  });
  await batch.commit();
  console.log(`Synced ${json.matches.length} matches`);
}

sync().catch(console.error);
