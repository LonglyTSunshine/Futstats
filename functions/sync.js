// functions/sync.js
const admin    = require('firebase-admin');
const fetch    = require('node-fetch');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const API_KEY = '956b286c4a3b4766a723f85d83c945fb';

async function syncAll() {
  // 1. 拉取赛事数据
  const res  = await fetch('https://api.football-data.org/v4/matches', {
    headers: { 'X-Auth-Token': API_KEY }
  });
  const json = await res.json();
  if (!Array.isArray(json.matches)) {
    console.error('No matches array', json);
    return;
  }

  const batch = db.batch();

  // 2. 原有：写 matches、schedules、playerStats、playerComparisons
  json.matches.forEach(m => {
    const id = String(m.id);

    // 2.1 Live Scores
    batch.set(
      db.collection('matches').doc(id),
      {
        time:   new Date(m.utcDate).toLocaleTimeString(),
        teams:  `${m.homeTeam.name} vs ${m.awayTeam.name}`,
        score:  m.score.fullTime.home != null
                ? `${m.score.fullTime.home} - ${m.score.fullTime.away}`
                : '',
        status: m.status,
        league: m.competition.name
      },
      { merge: true }
    );

    // 2.2 Match Schedule
    batch.set(
      db.collection('schedules').doc(id),
      {
        dateTime: m.utcDate,
        teams:    `${m.homeTeam.name} vs ${m.awayTeam.name}`,
        league:   m.competition.name,
        location: m.venue || ''
      },
      { merge: true }
    );

    // 2.3 Player Stats（演示用）
    batch.set(
      db.collection('playerStats').doc(`${id}-home`),
      {
        player:  m.homeTeam.name,
        goals:   m.score.fullTime.home  || 0,
        assists: 0
      },
      { merge: true }
    );
    batch.set(
      db.collection('playerStats').doc(`${id}-away`),
      {
        player:  m.awayTeam.name,
        goals:   m.score.fullTime.away  || 0,
        assists: 0
      },
      { merge: true }
    );

    // 2.4 Player Comparisons（演示用）
    batch.set(
      db.collection('playerComparisons').doc(`${m.homeTeam.name}-vs-${m.awayTeam.name}`),
      {
        player: m.homeTeam.name,
        statA:  m.score.fullTime.home  || 0,
        statB:  m.score.fullTime.away  || 0
      },
      { merge: true }
    );
  });

  // 3. 新增：根据所有比赛计算积分榜
  /**
   * 我们用一个对象来累积每支球队的战绩：
   *   { [teamName]: { team, played, won, drawn, lost, points } }
   */
  const standingsMap = {};

  json.matches.forEach(m => {
    const home = m.homeTeam.name;
    const away = m.awayTeam.name;
    // 如果 fullTime 为 null，就当 0 处理
    const hG = m.score.fullTime.home ?? 0;
    const aG = m.score.fullTime.away ?? 0;

    // 初始化两队
    if (!standingsMap[home]) {
      standingsMap[home] = { team: home,   played: 0, won: 0, drawn: 0, lost: 0, points: 0 };
    }
    if (!standingsMap[away]) {
      standingsMap[away] = { team: away,   played: 0, won: 0, drawn: 0, lost: 0, points: 0 };
    }

    // 都算一场出场
    standingsMap[home].played++;
    standingsMap[away].played++;

    // 判断胜平负
    if (hG > aG) {
      standingsMap[home].won++;
      standingsMap[home].points += 3;
      standingsMap[away].lost++;
    } else if (hG < aG) {
      standingsMap[away].won++;
      standingsMap[away].points += 3;
      standingsMap[home].lost++;
    } else {
      // 平局
      standingsMap[home].drawn++;
      standingsMap[away].drawn++;
      standingsMap[home].points++;
      standingsMap[away].points++;
    }
  });

  // 写回 Firestore 的 standings 集合
  Object.values(standingsMap).forEach(s => {
    batch.set(
      db.collection('standings').doc(s.team),
      s,
      { merge: true }
    );
  });

  // 4. 提交批量
  await batch.commit();
  console.log(`Synced ${json.matches.length} matches + schedules + stats + comparisons + ${Object.keys(standingsMap).length} standings`);
}

// 导出给 Cloud Function 调用
module.exports = { syncAll };

// 允许直接用 `node sync.js` 手动执行
if (require.main === module) {
  syncAll().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
