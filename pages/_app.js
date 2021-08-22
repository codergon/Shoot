import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import firebase from "firebase";
import Login from "./Auth/Login";
import Loading from "./components/Loading";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [load, setLoad] = useState(true);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1700);
  }, [loading]);

  useEffect(() => {
    if (user) {
      // db.collection("users").doc(user.uid).set(
      //   {
      //     email: user.email,
      //     name: "Yasmeen Tariq",
      //     lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      //     photoURL:
      //       "https://i.postimg.cc/L8ZHmndH/tumblr-p5933jj6b-I1wbdiu1o1-640.jpg",
      //   },
      //   { merge: true }
      // );
    }
  }, [user]);

  if (loading) return <Loading />;
  if (load) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
