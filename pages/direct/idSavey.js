import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ChatMedia from "../Chat/ChatMedia";
import ChatSidebar from "../components/ChatSidebar";
import MessageList from "../components/MessageList";
import sty from "../../styles/Chat.module.css";

import { mockData } from "../Mock";
import BackGround from "../components/BackGround";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";

const Direct = ({ chat, messages }) => {
  const data = mockData[1];
  const you = mockData[0];

  const [user] = useAuthState(auth);
  const [senderSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const recipient = senderSnapshot?.docs?.[0]?.data();

  return (
    <>
      <Header
        headerTitle={`Shoot | Chats: ${
          recipient?.name
            ? recipient?.name
            : getRecipientEmail(chat.users, user)
        }`}
      />
      <BackGround />
      <Navbar />

      <div className={sty.chat_container}>
        <ChatSidebar chat={chat} />
        <MessageList messages={messages} />
      </div>
    </>
  );
};

export default Direct;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  // Get messages ready on server
  const msgRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = msgRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp,
    }));

  // Prep chats ready on server
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    users: [...chatRes.data().users],
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
