import React from "react";
import { useEffect, useState } from "react";
import sty from "../../styles/Chat.module.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth, db, storage } from "../../firebase";
import firebase from "firebase";
import moment from "moment";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const VoicenotesFunction = ({ scrollToBottom, recipient }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [blobURL, setBlobUrl] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [hoverBorder, setHoverBorder] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const start = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const sendvn = (vnToAdd) => {
    if (!recipient) {
      return;
    }

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    if (!vnToAdd) return;

    db.collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .add({
        timestamp: moment().valueOf(),
        message: "",
        user: user.email,
        file: true,
      })
      .then((doc) => {
        if (vnToAdd) {
          const uploadTask = storage
            .ref(`media/${doc.id}`)
            .putString(vnToAdd, "data_url");

          uploadTask.on(
            "state_change",
            (snapshot) => {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              if (progress === 100) {
                // console.log("done inserting in storage");
              }
            },
            (error) => console.log(error),
            () => {
              storage
                .ref("media")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("chats")
                    .doc(router.query.id)
                    .collection("messages")
                    .doc(doc.id)
                    .set(
                      {
                        chatMedia: url,
                        mediaType: "audio",
                      },
                      { merge: true }
                    );
                })
                .then(() => {
                  // console.log("done with audio");
                });
            }
          );
        }
      });

    db.collection("chats").doc(router.query.id).set(
      {
        timestamp: moment().valueOf(),
      },
      { merge: true }
    );
    scrollToBottom();
  };

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);

        const file = new File(buffer, "music.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (readerEvent) => {
          sendvn(readerEvent.target.result);
        };

        setBlobUrl(blobURL);
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setIsBlocked(false);
      },
      () => {
        console.log("Permission Denied");
        setIsBlocked(true);
      }
    );
  }, []);

  return (
    <div
      style={{
        zIndex: 100,
      }}
    >
      <>
        <div
          className={sty.vn_cont}
          onClick={() => {
            if (isRecording) {
              stop();
            } else {
              start();
            }
          }}
          style={{
            borderRadius: "100%",
            background: "transparent",
            border: "1px solid #1900ffdf",
            transform: !isRecording && "scale(1)",
            animation: !isRecording && "none",
            transition: isRecording ? "all 0.7s" : "all 0.3s",
          }}
          onMouseEnter={() => setHoverBorder(true)}
          onMouseLeave={() => setHoverBorder(false)}
        >
          <div
            style={{
              display: "flex",
              borderRadius: "100%",
              alignItems: "center",
              justifyContent: "center",
              width: "calc(100% - 4px)",
              height: "calc(100% - 4px)",
              border: hoverBorder && !isRecording && "1px solid #1900ffaf",
              fontSize: isRecording ? "14px" : "16px",
              color: isRecording ? "#ddd" : "#1900ff",
              background: isRecording ? "#1900ff" : "transparent",
            }}
          >
            <i class="fas fa-microphone-alt"></i>
          </div>
        </div>
      </>
    </div>
  );
};

export default VoicenotesFunction;
