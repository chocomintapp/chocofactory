import firebase from "firebase";

import firebaseJson from "../../../../firebase.json";

const firebaseConfig = {
  // MEMO: Here we don't want to affect the production's analytics.
  production: {
    apiKey: "AIzaSyCHZ8KnF2Im82fgDcZCVR3A1RhE5lL1Knc",
    authDomain: "chocofactory-prod.firebaseapp.com",
    projectId: "chocofactory-prod",
    storageBucket: "chocofactory-prod.appspot.com",
    messagingSenderId: "99996618413",
    appId: "1:99996618413:web:28ae3fb7084c618b3b8024",
    measurementId: "G-MC9DDCTH55",
  },
  development: {
    apiKey: "AIzaSyCHZ8KnF2Im82fgDcZCVR3A1RhE5lL1Knc",
    authDomain: "chocofactory-prod.firebaseapp.com",
    projectId: "chocofactory-prod",
    storageBucket: "chocofactory-prod.appspot.com",
    messagingSenderId: "99996618413",
    appId: "1:99996618413:web:28ae3fb7084c618b3b8024",
    measurementId: "G-EEBR0XMRM0", // MEMO: Temporary measurement ID
  },
};

const nodeEnv = process.env.NODE_ENV;
const app = firebase.initializeApp(firebaseConfig[nodeEnv === "production" ? "production" : "development"]);

const analytics = app.analytics();
const firestore = app.firestore();
const functions = app.functions(firebaseJson.region);
const auth = app.auth();

if (nodeEnv === "development") {
  firestore.settings({
    host: `localhost:${firebaseJson.emulators.firestore.port}`,
    ssl: false,
  });
  functions.useEmulator("localhost", firebaseJson.emulators.functions.port);
  auth.useEmulator(`http://localhost:${firebaseJson.emulators.auth.port}`);
}

export const DB_VIRSION = process.env.REACT_APP_DB_VIRSION ? process.env.REACT_APP_DB_VIRSION : "v0";

export { analytics, firestore, functions, auth };
