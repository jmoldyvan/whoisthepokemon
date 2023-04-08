import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const serviceAccountKey = loadJSON('./serviceAccountKey.json');

// import serviceAccountKey from './serviceAccountKey.json' assert { type: "json" };
 
const app = initializeApp({
    credential: cert(serviceAccountKey),
  });
  
  const auth = getAuth(app);


export default auth