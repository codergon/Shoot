import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ChatMedia from "../components/ChatMedia";
import ChatSidebar from "../components/ChatSidebar";
import MessageList from "../components/MessageList";
import sty from "../../styles/Chat.module.css";

import BackGround from "../components/BackGround";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import SiteLogo from "../components/SiteLogo";
import MainSidebar from "../components/MainSidebar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Direct = ({ chat, messages, chatList }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [uArr, setUArr] = useState([]);

  const getUsers = async () => {
    const refe = db.collection("chats").doc(router.query.id);
    const chatRes = await refe.get();
    setUArr(chatRes?.data()?.users ? [...chatRes?.data()?.users] : []);
  };

  useEffect(() => {
    getUsers();
  }, [router]);

  const [senderSnapshot] = useCollection(
    db
      .collection("users")
      .where(
        "email",
        "==",
        getRecipientEmail(uArr, user) ? getRecipientEmail(uArr, user) : null
      )
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
      {/* <BackGround /> */}
      {/* <Navbar /> */}

      <div className={sty.chat_container}>
        <MainSidebar />
        <ChatSidebar chatList={chatList} />
        <MessageList messages={messages} recipient={recipient} />
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
    users: chatRes?.data()?.users ? [...chatRes?.data()?.users] : [],
  };

  const chLt = await db
    .collection("chats")
    .where("users", "array-contains", "atakerekester@gmail.com")
    .get();
  const chLtRn = chLt?.docs.map((chat) => ({
    lastTime: chat.data()?.timestamp ? chat.data()?.timestamp : 0,
    chatData: {
      chatId: chat.id,
      chatUsers: chat.data().users,
    },
  }));

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
      chatList: JSON.stringify(chLtRn),
    },
  };
}
