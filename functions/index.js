const functions = require('firebase-functions');
const admin     = require('firebase-admin');

// Initialize the Admin SDK
admin.initializeApp();

// Import and run your sync logic when the function triggers
exports.syncMatches = functions
  .runWith({ timeoutSeconds: 300 })        // give yourself a little more time
  .pubsub
  .schedule('every 1 hours')
  .onRun(async () => {
    const { syncMatches } = require('./sync');
    await syncMatches();
    return null;
  });
