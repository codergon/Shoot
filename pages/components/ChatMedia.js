import SharedMedia from "./SharedMedia";
import sty from "../../styles/Chat.module.css";
import { auth, db, storage } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import Emojis from "./Emojis";
import Notes from "./Notes";

import { useRef, useState } from "react";

const ChatMedia = ({ thisUser, addEmoji, messages, refresh, EmoClosed }) => {
  const [user] = useAuthState(auth);
  const [receiver] = useCollection(
    db.collection("users").where("email", "==", user.email)
  );

  const recipient = receiver?.docs?.[0]?.data();

  const closeEmo = () => {
    EmoClosed();
    $("#emo_table").animate({ left: "100%" }, 200);
  };

  const openNotes = () => {
    $("#notes_sect").animate({ left: "0px" }, 200);
  };

  const [wallPaperModal, setIsOpenWallpaper] = useState(false);
  const openWallpaperModal = () => setIsOpenWallpaper(true);
  const closeWallpaperModal = () => {
    setPicToAdd(null);
    setIsOpenWallpaper(false);
  };

  const [senderSnapshot] = useCollection(
    db.collection("users").where("email", "==", user.email)
  );

  const presentUser = senderSnapshot?.docs?.[0]?.data();

  const picPickerRef = useRef(null);
  const [picToAdd, setPicToAdd] = useState(null);

  const addWallPaper = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setPicToAdd(readerEvent.target.result);
    };
  };

  const updateWallpaper = () => {
    if (!!picToAdd) {
      const uploadTask = storage
        .ref(`wallpapers/${user.uid}`)
        .putString(picToAdd, "data_url");

      uploadTask.on(
        "state_change",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => console.log(error),
        () => {
          storage
            .ref("wallpapers")
            .child(user.uid)
            .getDownloadURL()
            .then((url) => {
              db.collection("users").doc(user.uid).set(
                {
                  wallpaper: url,
                },
                { merge: true }
              );
            })
            .then(() => {
              closeWallpaperModal();
            });
        }
      );
    }
  };

  return (
    <div className={sty.ctmedia}>
      {wallPaperModal && (
        <div
          style={{
            zIndex: "1",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <div
            style={{
              width: "80%",
              padding: "0px",
              display: "flex",
              minHeight: "100px",
              background: "#fff",
              position: "relative",
              overflow: "hidden",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <input
              ref={picPickerRef}
              hidden
              onChange={addWallPaper}
              type="file"
              multiple={false}
              accept="image/*"
            />
            <img
              src={picToAdd ? picToAdd : presentUser?.wallpaper}
              alt=""
              style={{
                width: "100%",
                marginBottom: "20px",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
              }}
            />

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {picToAdd ? (
                <div
                  style={{
                    color: "#fff",
                    fontSize: "15px",
                    display: "flex",
                    borderRadius: "70px",
                    padding: "10px 17px",
                    flexDirection: "row",
                    alignItems: "center",
                    background: "#4831D4",
                    cursor: "pointer",
                    justifyContent: "space-between",
                  }}
                  onClick={updateWallpaper}
                >
                  <i
                    class="uil uil-cloud-check"
                    style={{
                      color: "#eee",
                      fontSize: "16px",
                      marginRight: "7px",
                    }}
                  ></i>
                  <p>Update Image</p>
                </div>
              ) : (
                <div
                  style={{
                    color: "#fff",
                    fontSize: "15px",
                    display: "flex",
                    borderRadius: "70px",
                    padding: "10px 17px",
                    flexDirection: "row",
                    alignItems: "center",
                    background: "#4831D4",
                    cursor: "pointer",
                    justifyContent: "space-between",
                  }}
                  onClick={() => picPickerRef.current.click()}
                >
                  <i
                    class="uil uil-plus"
                    style={{
                      color: "#eee",
                      marginRight: "7px",
                    }}
                  ></i>
                  <p>Change Wallpaper</p>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => picPickerRef.current.click()}
              >
                <i
                  class="uil uil-sync"
                  style={{
                    color: "#4831D4",
                    fontSize: "16px",
                    borderRadius: "70px",
                    padding: "6px 6px 4px 6px",
                    border: "1px solid #4831D4",
                  }}
                ></i>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={closeWallpaperModal}
              >
                <i
                  class="uil uil-times"
                  style={{
                    color: "#4831D4",
                    fontSize: "16px",
                    borderRadius: "70px",
                    padding: "6px 6px 4px 6px",
                    border: "1px solid #4831D4",
                  }}
                ></i>
              </div>
            </div>

            {/*  */}
          </div>
        </div>
      )}

      <div className={sty.ctmed_col1}>
        <div className={sty.ctt_dets}>
          <div className={sty.ctt_ppic_cover}>
            <div className={sty.ctt_ppic_cont}>
              <div
                className={sty.ctt_ppic}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage: `url(${
                    thisUser?.photoURL ? thisUser?.photoURL : thisUser?.photoURL
                  })`,
                }}
              >
                {!thisUser?.photoURL && (
                  <i
                    class="uil uil-anchor"
                    style={{ color: "#555", fontSize: "20px" }}
                  ></i>
                )}
              </div>
            </div>
            <div className={sty.ctt_ppic_cur}>
              <div
                className={sty.ctt_ppic}
                style={{
                  backgroundImage: recipient
                    ? `url(${recipient?.photoURL})`
                    : null,
                }}
              ></div>
            </div>
          </div>

          <div className={sty.ctt_name}>
            <p>{thisUser?.name}</p>
          </div>
          <div className={sty.ctt_status}>
            {true ? (
              <p>
                active now
                <i
                  class="fas fa-plug"
                  style={{
                    color: "#0DBF8B",
                    marginLeft: "4px",
                    fontSize: "11px",
                  }}
                ></i>
              </p>
            ) : (
              <p>
                active hours ago
                <i
                  class="fas fa-plug"
                  style={{
                    color: "#ff7142",
                    marginLeft: "4px",
                    fontSize: "11px",
                  }}
                ></i>
              </p>
            )}
          </div>
        </div>
        <div className={sty.acties}>
          <div className={sty.notif}>
            <p>Mute notification</p>
            <i class="uil uil-toggle-off" style={{ fontSize: "17px" }}></i>
          </div>

          <div className={sty.colorSch}>
            <p>Customize color scheme </p>
            <div
              className={sty.curWall}
              style={{ width: "10px", height: "10px", background: "#4831d4" }}
            ></div>
          </div>

          <div className={sty.notes} onClick={openNotes}>
            <p>Notes you share</p>
            <i class="uil uil-notes" style={{ fontSize: "17px" }}></i>
          </div>
        </div>

        <div className={sty.wallpp} onClick={openWallpaperModal}>
          <p>Change wallpaper</p>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              //  background: "#4831d4"
              backgroundImage: `url(${presentUser?.wallpaper})`,
            }}
          ></div>
        </div>

        <SharedMedia messages={messages} refresh={refresh} />
      </div>
      <div className={sty.ctmed_col3} id="notes_sect">
        <Notes />
      </div>
      <div className={sty.ctmed_col2} id="emo_table">
        <div className={sty.emo_sect_hedr}>
          <p>Emojis</p>
          <i class="uil uil-times" onClick={closeEmo}></i>
        </div>
        <Emojis addEmoji={addEmoji} />
      </div>
    </div>
  );
};

export default ChatMedia;
