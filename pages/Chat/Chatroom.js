import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MessageList from "./MessageList";
import ChatSidebar from "./ChatSidebar";
import sty from "../../styles/Chat.module.css";

import { mockData } from "../Mock";
import BackGround from "../components/BackGround";
import ChatMedia from "./ChatMedia";

const Chatroom = () => {
  const data = mockData[1];
  const you = mockData[0];

  return (
    <>
      <Header headerTitle="Shoot | Messaging and Calls" />
      <BackGround />
      <Navbar />

      <div className={sty.chat_container}>
        <ChatSidebar />
        <MessageList />
        <ChatMedia data={data} you={you} />
      </div>
    </>
  );
};

export default Chatroom;
