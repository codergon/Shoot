import React from "react";
import sty from "../../styles/Chat.module.css";

const SharedMediaNav = () => {
  return (
    <nav className={sty.shd_med_nav}>
      <button className={(sty.nav_img, sty.nav_current)}>
        <i
          class="uil uil-images"
          style={{ fontSize: "17px", color: "#555" }}
        ></i>
      </button>
      <button className={sty.nav_vid}>
        <i class="uil uil-headphones" style={{ fontSize: "17px" }}></i>
      </button>
      <button className={sty.nav_doc}>
        <i class="uil uil-layers" style={{ fontSize: "17px" }}></i>
      </button>
      <button className={sty.nav_doc}>
        <i class="uil uil-link" style={{ fontSize: "17px" }}></i>
      </button>
    </nav>
  );
};

const SharedMedia = ({ data }) => {
  return (
    <div className={sty.shd_med_cover}>
      <div className={sty.shd_md_hd}>Shared Media</div>
      <SharedMediaNav />
      <div className={sty.shd_med}>
        {data?.shd_imgs?.map((item, index) => {
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
  );
};

export default SharedMedia;
