import sty from "../../styles/Chat.module.css";

const MessageList = () => {
  return (
    <div className={sty.chtrm}>
      <div className={sty.chtrm_cont}>
        {/* Message Scroll */}
        <div className={sty.msg_scr}>
          <div className={sty.msg_scr_inn}>
            <div className={sty.msgLTm}>
              <p>Wednesday, June 12, 2021</p>
            </div>

            <div className={sty.msgCover}>
              <div className={sty.msgItemCont}>
                <div className={sty.msgItem}>
                  <div className={sty.msgCont}>
                    <p>
                      Multiply 😜 second you Good gathered for. Male open years.
                      Gathered earth, days kind beast. You're seasons wherein
                      upon face days them tree gathering which his isn't. Face
                      firmament face saying place place darkness made.👌
                    </p>
                  </div>
                  <div className={sty.msgTime}>
                    <p>1:40 pm</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={sty.msgCoverYou}>
              <div className={sty.msgItemCont}>
                <div className={sty.msgItem}>
                  <div className={sty.msgCont}>
                    <p>Yeah 🤞🤞</p>
                  </div>
                  <div className={sty.msgTime}>
                    <p>2:40 pm</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={sty.msgCoverYou}>
              <div className={sty.msgItemCont}>
                <div className={sty.msgItemMedia}>
                  <div className={sty.msgCont}>
                    <div className={sty.msgContMedia}>
                      <img
                        src="img/tumblr_p5933jj6bI1wbdiu1o1_640.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={sty.msgTime}>
                    <p>2:41 pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className={sty.msg_input}>
          <div className={sty.actbuttons}>
            <div className={sty.act_butt}>
              <i class="uil uil-calendar-alt"></i>
            </div>
            <div className={sty.act_butt}>
              <i class="uil uil-folder-plus"></i>
            </div>
            <div className={sty.act_butt}>
              <i class="uil uil-image-plus"></i>
            </div>
          </div>

          <input
            type="text"
            className={sty.message_input}
            placeholder="Shoot your messages here......."
          />

          <div className={sty.emoVoice}>
            <div className={sty.emo_cont}>
              <i class="uil uil-smile-wink"></i>
            </div>
            <div className={sty.vn_cont}>
              <i class="uil uil-microphone"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
