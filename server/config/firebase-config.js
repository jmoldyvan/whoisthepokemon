let initializeApp = require('firebase-admin/app')
let cert = require('firebase-admin/app')

let serviceAccountKey = require('./serviceAccountKey.json')

const app = initializeApp({
    credential: cert(serviceAccountKey),
  });
  
  const auth = getAuth(app);

  
module.exports = auth