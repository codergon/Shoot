import SharedMedia from "./SharedMedia";
import sty from "../../styles/Chat.module.css";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const ChatMedia = ({ data, thisUser }) => {
  const [user] = useAuthState(auth);
  const [receiver] = useCollection(
    db.collection("users").where("email", "==", user.email)
  );

  const recipient = receiver?.docs?.[0]?.data();

  return (
    <div className={sty.ctmedia}>
      <div className={sty.ctt_dets}>
        <div className={sty.ctt_ppic_cover}>
          <div className={sty.ctt_ppic_cont}>
            <div
              className={sty.ctt_ppic}
              style={{ backgroundImage: `url(${thisUser?.photoURL})` }}
            ></div>
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
          {data?.user_status ? (
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
        {/* <div className={sty.calls}>
          <div className={sty.ph_calls}>
            <i
              class="uil uil-phone"
              style={{
                marginTop: "1px",
                marginRight: "3px",
              }}
            ></i>
            <p>Voice Call</p>
          </div>
          <div className={sty.vd_calls}>
            <i
              class="uil uil-video"
              style={{
                fontSize: "16px",
                marginTop: "1px",
                marginRight: "3px",
              }}
            ></i>
            <p>Video Call</p>
          </div>
        </div> */}

        <div className={sty.notif}>
          <p>Mute notification</p>
          <i class="uil uil-toggle-off" style={{ fontSize: "17px" }}></i>
        </div>

        <div className={sty.wallpp}>
          <p>Customize color scheme </p>
          <div
            className={sty.curWall}
            style={{ backgroundImage: `url(${thisUser?.wallpaper})` }}
          ></div>
        </div>

        <div className={sty.notes}>
          <p>Notes you share</p>
          {/* <i class="uil uil-arrow-up-right"></i> */}
          {/* <i class="uil uil-angle-right"></i> */}
          <i class="uil uil-notes" style={{ fontSize: "17px" }}></i>
        </div>
      </div>

      <SharedMedia data={data} />
    </div>
  );
};

export default ChatMedia;
