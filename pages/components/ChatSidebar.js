import sty from "../../styles/Chat.module.css";
import { contacts } from "../Mock";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import * as EmailValidator from "email-validator";
import Chat from "./Chat";
import { useEffect } from "react";
import _ from "lodash";

const ChatSidebar = ({ chatList }) => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnaphot] = useCollection(userChatRef);

  useEffect(() => {
    var usersList = [];

    db.collection("users")
      .where("email", "!=", user.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          usersList.push(doc.data().email);
        });
        createChat(usersList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  const createChat = (usersArr) => {
    db.collection("chats")
      .where("users", "array-contains", user.email)
      .get()
      .then((querySnapshot) => {
        var chatSeen = [];
        querySnapshot.forEach((doc) => {
          var chatsList = doc
            .data()
            .users.filter((item) => item !== user.email);
          chatSeen.push(...chatsList);
        });
        return chatSeen;
      })
      .then((chatSeen) => {
        return usersArr.filter((value) => !chatSeen.includes(value));
      })
      .then((filteredArray) => {
        filteredArray.map((slug) => {
          db.collection("chats").add({
            users: [user.email, slug],
          });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const chatSort = chatSnaphot?.docs.map((chat) => ({
    lastTime: chat.data()?.timestamp ? chat.data()?.timestamp : 0,
    chatData: chat,
  }));
  const chatCompSorting = _.orderBy(
    chatSort,
    ["lastTime", "chatData"],
    ["desc", "desc"]
  );
  const chatCompSorted = chatCompSorting?.map((chat) => (
    <Chat
      id={chat.chatData.id}
      key={chat.chatData.id}
      users={chat.chatData.data().users}
    />
  ));

  const chatSort2 = JSON.parse(chatList)?.map((chat) => ({
    lastTime: chat?.lastTime ? chat?.lastTime : 0,
    chatData: chat.chatData,
  }));
  const chatCompSorting2 = _.orderBy(
    chatSort2,
    ["lastTime", "chatData"],
    ["desc", "desc"]
  );
  const chatCompSorted2 = chatCompSorting2?.map((chat) => (
    <Chat
      id={chat.chatData.chatId}
      key={chat.chatData.chatId}
      users={chat.chatData.chatUsers}
    />
  ));

  return (
    <div className={sty.ctts}>
      {/*  Contacts Header*/}
      <div className={sty.ctts_header}>
        <div className={sty.srch_ctt_cont}>
          <i class="uil uil-search" />
          <input
            type="text"
            className={sty.srchCtt}
            placeholder="Search through contacts"
          />
        </div>
        <div className={sty.ctt_moreOpt}>
          <i class="uil uil-ellipsis-v" />
        </div>
      </div>

      {/* Contacts List */}
      <div className={sty.ctt_list}>
        {chatSnaphot ? chatCompSorted : chatCompSorted2}
      </div>

      {/* Add Contact */}
      <div className={sty.add_ctt}>
        <p>
          <i class="uil uil-plus" style={{ marginRight: "7px" }}></i> Add
          contact
        </p>
      </div>
    </div>
  );
};

export default ChatSidebar;
