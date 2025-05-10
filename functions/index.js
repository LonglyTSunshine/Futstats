const functions = require('firebase-functions');
const admin     = require('firebase-admin');
const fetch     = require('node-fetch');

admin.initializeApp();
const db = admin.firestore();

// 改成你申请到的足球数据 API
const API_URL = 'https://api.football-data.org/v4/matches';
const API_KEY = 'YOUR_API_KEY_HERE';  // ← 在此填入你的 API Key

exports.syncMatches = functions
  .runWith({ memory: '256MB', timeoutSeconds: 60 })
  .pubsub.schedule('every 5 minutes')    
  .onRun(async (context) => {
    try {
      const res = await fetch(API_URL, {
        headers: { 'X-Auth-Token': API_KEY }
      });
      if (!res.ok) {
        console.error('API 返回状态码', res.status);
        return null;
      }

      const data = await res.json();
      const batch = db.batch();

      // 假设 data.matches 是比赛数组
      data.matches.forEach(match => {
        const id     = `${match.id}`;
        const docRef = db.collection('matches').doc(id);
        batch.set(docRef, {
          time:   match.utcDate,
          teams:  `${match.homeTeam.name} vs ${match.awayTeam.name}`,
          score:  `${match.score.fullTime.home} - ${match.score.fullTime.away}`,
          status: match.status,            // SCHEDULED / LIVE / FINISHED
          league: match.competition.name   // e.g. "Premier League"
        }, { merge: true });
      });

      await batch.commit();
      console.log(`⚽ 已同步 ${data.matches.length} 场比赛`);
    } catch (e) {
      console.error('同步出错', e);
    }
    return null;
  });
