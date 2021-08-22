import firebase from "firebase";

import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7CHIkwSzuwLxi4D9HIHA6RVaQvFQdlVs",
  authDomain: "shoot-662b3.firebaseapp.com",
  projectId: "shoot-662b3",
  storageBucket: "shoot-662b3.appspot.com",
  messagingSenderId: "506342906704",
  appId: "1:506342906704:web:95d146b8ca18cd4735ea55",
};

const app = !firebase.apps?.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const storage = firebase.storage();
var provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
