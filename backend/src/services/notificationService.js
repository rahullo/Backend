const getFirebaseAdmin = require('../config/firebase');

async function sendMulticastNotification(tokens, title, body, data = {}) {
  if (!tokens?.length) return;

  const admin = getFirebaseAdmin();
  await admin.messaging().sendEachForMulticast({
    tokens,
    notification: { title, body },
    data,
  });
}

module.exports = { sendMulticastNotification };
