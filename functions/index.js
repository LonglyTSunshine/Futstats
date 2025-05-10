// functions/index.js
const functions = require('firebase-functions');
// ← 这里改为解构 syncAll 而非 syncMatches
const { syncAll } = require('./sync');

exports.syncMatches = functions
  .runWith({ timeoutSeconds: 300 })
  .pubsub
  .schedule('every 1 hours')
  .onRun(async () => {
    await syncAll();
    return null;
  });
