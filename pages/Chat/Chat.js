import { useRouter } from "next/router";
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

  const recipient = senderSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/direct/${id}`);
  };

  return (
    <div className={sty.ctt} onClick={enterChat}>
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
          {/* <p className={sty.lt_mssg}>{item?.lastMssg}</p> */}
          {/* <p className={sty.mssg_time}>{item?.timeSent}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
