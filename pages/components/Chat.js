import moment from "moment";
import Router, { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import sty from "../../styles/Chat.module.css";
import getRecipientEmail from "../utils/getRecipientEmail";

const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [senderSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const recipient = senderSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    Router.push(`/direct/${id}`, `/direct/${id}`, { shallow: true });
  };

  var lastMsgRef =
    messagesSnapshot?.docs[messagesSnapshot?.docs.length - 1]?.data();
  var lastMssg = {
    lastTime: lastMsgRef?.timestamp
      ? moment(lastMsgRef?.timestamp).format("h:mm a")
      : null,
    lastMessage: lastMsgRef?.message,
    isLastFile: lastMsgRef?.file,
  };

  return (
    <div
      className={sty.ctt}
      onClick={enterChat}
      id={router.query.id == id ? sty.ctt_active : null}
    >
      <div className={sty.ctt_img_cont}>
        <div
          className={sty.ctt_img}
          style={{
            backgroundImage: recipient ? `url(${recipient?.photoURL})` : null,
          }}
        ></div>
      </div>

      <div className={sty.mssg_det}>
        <div className={sty.mssg_det_row}>
          <p className={sty.sender_name}>
            {recipient?.name ? recipient?.name : recipientEmail}
          </p>
          {/* {item?.unRead > 0 && (
            <p className={sty.unread_mssg}>{item?.unRead}</p>
          )} */}
        </div>
        <div className={sty.mssg_det_row}>
          <p className={sty.lt_mssg}>
            {!!lastMssg?.isLastFile && (
              <i
                class="uil uil-files-landscapes-alt"
                style={{ marginRight: "4px", color: "#4831D4" }}
              ></i>
            )}
            {!!lastMssg?.isLastFile ? "Media" : lastMssg?.lastMessage}
          </p>

          {lastMssg?.lastTime && (
            <p className={sty.mssg_time}>{lastMssg?.lastTime}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
