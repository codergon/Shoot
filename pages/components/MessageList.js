import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db, storage } from "../../firebase";
import sty from "../../styles/Chat.module.css";
import ChatMedia from "./ChatMedia";
import firebase from "firebase";
import Message from "./Message";
import moment from "moment";

import Voicenotes from "./Voicenotes";

const MessageList = ({ messages, recipient }) => {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [user] = useAuthState(auth);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const base64MimeType = (encoded) => {
    var result = null;

    if (typeof encoded !== "string") {
      return result;
    }
    var mime = encoded.match(/data:([a-zA-Z0-9]+).*,.*/);

    if (mime && mime.length) {
      result = mime[1];
    }

    return result;
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!recipient) {
      return;
    }

    if (!!Number(e.keyCode) && e.keyCode !== 13) {
      return;
    }

    // Updates Last Seen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    if (!input && !fileToAdd) return;

    db.collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .add({
        timestamp: moment().valueOf(),
        message: input,
        user: user.email,
        file: !!fileToAdd,
      })
      .then((doc) => {
        if (fileToAdd) {
          const uploadTask = storage
            .ref(`media/${doc.id}`)
            .putString(fileToAdd, "data_url");

          const typeOfFile = base64MimeType(fileToAdd);

          removeFile();

          uploadTask.on(
            "state_change",
            (snapshot) => {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // console.log("Upload is " + progress + "% done");
              // switch (snapshot.state) {
              //   case firebase.storage.TaskState.PAUSED:
              //     console.log("Upload is paused");
              //     break;
              //   case firebase.storage.TaskState.RUNNING:
              //     console.log("Upload is running");
              //     break;
              // }
              if (progress === 100) {
                removeFileFirst();
              }
            },
            (error) => console.log(error),
            () => {
              // Upload completes

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
                        mediaType: typeOfFile,
                      },
                      { merge: true }
                    );
                })
                .then(() => {
                  console.log("done");
                  setRefresh((prevRef) => !prevRef);
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
    setInput("");
  };

  const userTyping = (val) => {
    setInput(val);
    if (val.trim().length > 0) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  };
  useEffect(() => {
    userTyping(input);
  }, [input]);

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp,
          }}
          fileFirst={fileFirst}
          scrollToBottom={scrollToBottom}
        />
      ));
    }
    return JSON.parse(messages).map((message) => (
      <Message
        key={message.id}
        user={message.user}
        message={{
          message: message.message,
          timestamp: message.timestamp,
        }}
        fileFirst={fileFirst}
      />
    ));
  };

  const [senderSnapshot] = useCollection(
    db.collection("users").where("email", "==", user.email)
  );

  const thisUser = senderSnapshot?.docs?.[0]?.data();

  const addEmoji = (Emo) => {
    setInput(input + Emo);
  };

  const [emoOpened, setEmoOpened] = useState(false);
  const OpenEmo = () => {
    setEmoOpened(true);
    $("#emo_table").animate({ left: "0px" }, 200);
  };

  const EmoClosed = () => {
    setEmoOpened(false);
  };

  var messagesEnd;
  const scrollToBottom = () => {
    messagesEnd?.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  useEffect(() => {
    scrollToBottom();
  }, []);

  const filePickerRef = useRef(null);
  const [fileFirst, setFileFirst] = useState(null);
  const [fileToAdd, setFileToAdd] = useState(null);

  const addFileToMsg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setFileToAdd(readerEvent.target.result);
      setFileFirst(readerEvent.target.result);
    };
  };

  const removeFile = () => {
    setFileToAdd(null);
  };
  const removeFileFirst = () => {
    setFileFirst(null);
  };

  useEffect(() => {
    var linkInText = document.querySelectorAll(".messageText a");
    linkInText.forEach((item) => item.setAttribute("target", "_blank"));
  }, []);

  return (
    <>
      <div className={sty.chtrm}>
        <div className={sty.chtrm_cont}>
          <div
            className={sty.mssgInnBack}
            style={{
              backgroundImage: `url(${thisUser?.wallpaper})`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                opacity: 0.4,
                backgroundImage: "url(../img/noise.png)",
              }}
            />
          </div>
          {/* Message Scroll */}
          <div className={sty.msgLTm}>
            <p>{moment().format("dddd: MMMM Do, YYYY.")}</p>
          </div>

          <div className={sty.msg_scr}>
            <div className={sty.msg_scr_inn}>
              <div className={sty.mssgsInn}>
                <div className={sty.mssgInnCoverBack}>
                  {showMessages()}

                  <div
                    style={{
                      height: "60px",
                    }}
                    ref={(el) => {
                      messagesEnd = el;
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className={sty.msg_input}>
            <div className={sty.msgInpCont}>
              <div className={sty.actbuttons}>
                <div
                  className={sty.act_butt}
                  onClick={() => filePickerRef.current.click()}
                >
                  <i class="uil uil-calendar-alt"></i>
                </div>

                <div
                  className={sty.act_butt}
                  onClick={() => filePickerRef.current.click()}
                >
                  <i class="uil uil-folder-plus"></i>
                </div>

                <div
                  className={sty.act_butt}
                  onClick={() => filePickerRef.current.click()}
                >
                  <i class="uil uil-image-plus"></i>
                </div>
              </div>
              <input
                ref={filePickerRef}
                hidden
                onChange={addFileToMsg}
                type="file"
                multiple={true}
                // accept="image/*"
              />

              <input
                autoComplete="off"
                id="snd_mssg_input_"
                type="text"
                value={input}
                onKeyUp={sendMessage}
                onChange={(e) => userTyping(e.target.value)}
                className={sty.message_input}
                placeholder="Shoot your messages here......."
              />

              <div className={sty.emoVoice}>
                <div
                  className={sty.emo_cont}
                  onClick={OpenEmo}
                  style={{
                    borderRadius: "100%",
                    border: emoOpened && "1px solid #333",
                    color: emoOpened && "#333",
                    paddingTop: "2px",
                  }}
                >
                  <i class="uil uil-smile-wink"></i>
                </div>
                {typing || fileToAdd ? (
                  <div className={sty.sendMsg} onClick={sendMessage}>
                    <div className={sty.send_cont}>
                      <i class="uil uil-message"></i>
                    </div>
                  </div>
                ) : null}

                {typing || fileToAdd ? null : (
                  <Voicenotes
                    scrollToBottom={scrollToBottom}
                    recipient={recipient}
                  />
                )}
              </div>
            </div>
            {fileToAdd && (
              <div className={sty.file_prev_cont}>
                <div className={sty.file_prev}>
                  <div className={sty.file_prev_inn}>
                    <img src={fileToAdd} alt="" />
                  </div>
                </div>
                <div className={sty.remove_image}>
                  <div className={sty.rm_main} onClick={removeFile}>
                    <i
                      class="uil uil-times"
                      style={{
                        width: "22px",
                        height: "22px",
                        fontSize: "14px",
                        display: "flex",
                        paddingTop: "1px",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        background: "#000",
                        marginRight: "7px",
                        borderRadius: "100%",
                      }}
                    />
                    <p>Remove image</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ChatMedia
        thisUser={recipient}
        addEmoji={addEmoji}
        messages={messages}
        EmoClosed={EmoClosed}
        refresh={refresh}
      />
    </>
  );
};

export default MessageList;
