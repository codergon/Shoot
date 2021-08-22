import React from "react";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import sty from "../../styles/Chat.module.css";
import { useCollection } from "react-firebase-hooks/firestore";

const SharedMediaNav = ({ scrollMediaTab }) => {
  return (
    <nav className={sty.shd_med_nav}>
      <button
        className={(sty.nav_img, sty.nav_current)}
        onClick={() => scrollMediaTab(0)}
      >
        <i
          class="uil uil-images"
          style={{ fontSize: "17px", color: "#555" }}
        ></i>
      </button>
      <button className={sty.nav_vid} onClick={() => scrollMediaTab(1)}>
        <i class="uil uil-headphones" style={{ fontSize: "17px" }}></i>
      </button>
      <button className={sty.nav_doc} onClick={() => scrollMediaTab(2)}>
        <i class="uil uil-layers" style={{ fontSize: "17px" }}></i>
      </button>
      <button className={sty.nav_doc} onClick={() => scrollMediaTab(3)}>
        <i class="uil uil-link" style={{ fontSize: "17px" }}></i>
      </button>
    </nav>
  );
};

const SharedMedia = ({ messages, refresh }) => {
  const router = useRouter();
  const [medArr, setMedArr] = useState([]);
  const [scrollTo, setScrollTo] = useState(0);

  const scrollMediaTab = (pos) => setScrollTo(pos);

  const checky = async () => {
    const ref = db.collection("chats").doc(router.query.id);
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
    const medDiscovered = messages
      .filter((item) => !!item.chatMedia)
      .map((item) => item.chatMedia);

    setMedArr(medDiscovered);
  };

  useEffect(() => {
    checky();
  }, [refresh, router.query.id]);

  return (
    <div className={sty.shd_med_cover}>
      <div className={sty.shd_md_hd}>Shared Media</div>
      <SharedMediaNav scrollMediaTab={scrollMediaTab} />

      <div style={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
        <div style={{ width: "400%", display: "flex", flexDirection: "row" }}>
          <div
            className={sty.shd_med}
            style={{
              transform: `translateX(calc(-100% * ${scrollTo}))`,
              transitionDuration: "0.4s",
            }}
          >
            {medArr?.map((item, index) => {
              return (
                <div className={sty.img_item_cont} key={index}>
                  <div
                    className={sty.img_item}
                    style={{ backgroundImage: `url(${item})` }}
                  ></div>
                </div>
              );
            })}
          </div>
          <div
            className={sty.shd_med}
            style={{
              transform: `translateX(calc(-100% * ${scrollTo}))`,
              transitionDuration: "0.4s",
            }}
          >
            {medArr?.map((item, index) => {
              return (
                <div className={sty.img_item_cont} key={index}>
                  <div
                    className={sty.img_item}
                    style={{ backgroundImage: `url(${item})` }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedMedia;
