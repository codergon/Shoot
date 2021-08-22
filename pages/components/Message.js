import moment from "moment";
import { auth } from "../../firebase";
import sty from "../../styles/Chat.module.css";
import ProgressiveImage from "react-progressive-image";
import { useAuthState } from "react-firebase-hooks/auth";
import Linkify from "react-linkify";

import ReactPlayer from "react-player/lazy";
import { useEffect, useState } from "react";

const Message = ({ user, message, fileFirst }) => {
  const [userCurr] = useAuthState(auth);

  var player, audioPlayer, canvaser;
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loadedAudio, setLoadedAudio] = useState(false);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    setPlaying((slug) => !slug);
  };

  const handleProgress = (state) => {
    setPlayed(Math.floor(state.playedSeconds));
  };

  const handleDuration = (state) => {
    setDuration(Math.floor(state));
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const playAudio = () => {
    if (!audioPlayer?.src) {
      return;
    }

    if (!isPlaying && loadedAudio) {
      audioPlayer.play();
      setIsPlaying(true);
    } else {
      audioPlayer.pause();
      setIsPlaying(false);
    }
  };

  const [audioDuration, setAudioDuration] = useState(null);
  const [audioPlayed, setAudioPlayed] = useState(null);

  useEffect(() => {
    if (message?.mediaType == "audio") {
      var au = document.createElement("audio");
      au.src = message?.chatMedia;

      au.addEventListener(
        "loadedmetadata",
        function () {
          setAudioDuration(au.duration);
          setAudioPlayed(au.played?.length);
        },
        false
      );
    }
  }, [message?.chatMedia]);

  var au = document.createElement("audio");
  au.src = message?.chatMedia;

  useEffect(() => {
    if (message?.mediaType == "audio") {
      audioPlayer.src = message?.chatMedia;
      console.log(audioPlayer?.played?.length);

      au.addEventListener(
        "loadedmetadata",
        function () {
          setAudioPlayed(au.played?.length);
        },
        false
      );
    }
  }, [audioPlayed, audioPlayer?.played?.length]);

  return user == userCurr.email ? (
    !message.file ? (
      <div
        className={sty.msgCoverYou}
        onDoubleClick={() => console.log("good")}
      >
        <div className={sty.msgItemCont}>
          <div className={sty.msgItem}>
            <div className={sty.msgCont}>
              <Linkify>
                <p class="messageText">{message.message}</p>
              </Linkify>
            </div>
            <div className={sty.msgTime}>
              <p>{moment(message.timestamp).format("hh:mm a")}</p>
            </div>
          </div>
        </div>
      </div>
    ) : !(message?.mediaType == "audio") ? (
      <div className={sty.msgCoverYou}>
        <div
          className={sty.msgItemCont}
          style={{ maxWidth: message?.mediaType == "video" && "250px" }}
        >
          <div className={sty.msgItemMedia}>
            <div className={sty.msgCont}>
              <div
                className={sty.msgContMedia}
                style={{ width: message?.mediaType == "video" && "auto" }}
              >
                {message?.mediaType == "image" ? (
                  <ProgressiveImage
                    src={message.chatMedia ? message.chatMedia : fileFirst}
                    placeholder={
                      fileFirst
                        ? fileFirst
                        : "https://i.postimg.cc/cLwhZx4P/noise.png"
                    }
                  >
                    {(src, loading) => (
                      <img
                        src={src}
                        alt="Img"
                        style={{
                          borderRadius: !message.message ? "4px" : null,
                        }}
                      />
                    )}
                  </ProgressiveImage>
                ) : (
                  message?.mediaType == "video" && (
                    <>
                      <ReactPlayer
                        ref={(el) => {
                          player = el;
                        }}
                        onEnded={() => {
                          player.seekTo(0, "fraction");
                          setPlaying(false);
                        }}
                        playing={playing}
                        width="100%"
                        height="auto"
                        onProgress={handleProgress}
                        onDuration={handleDuration}
                        url={message.chatMedia ? message.chatMedia : fileFirst}
                        style={{
                          borderRadius: !message.message ? "4px" : null,
                          cursor: "pointer",
                        }}
                      />
                      <div
                        style={{
                          top: "0px",
                          width: "100%",
                          height: "100%",
                          zIndex: "100",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "transparent",
                          position: "absolute",
                          cursor: "pointer",
                        }}
                        onClick={handlePlayPause}
                      >
                        {!playing && (
                          <div
                            style={{
                              color: "#fff",
                              width: "50px",
                              height: "50px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "100%",
                              border: "1px solid #fff",
                            }}
                          >
                            <i class="uil uil-play"></i>
                          </div>
                        )}
                      </div>
                    </>
                  )
                )}

                {message.message && (
                  <div className={sty.msgWtMed}>
                    <p>{message.message}</p>
                  </div>
                )}
              </div>
            </div>

            <div
              className={sty.msgTime}
              style={{
                justifyContent:
                  message?.mediaType == "video" && "space-between",
              }}
            >
              {message?.mediaType == "video" && (
                <p
                  style={{
                    fontSize: message?.mediaType == "video" && "12px",
                    fontFamily: message?.mediaType == "video" && "author3",
                    letterSpacing: "1px",
                    color: message.message
                      ? null
                      : message?.mediaType == "video"
                      ? "#000"
                      : "#fff",
                    mixBlendMode: message.message
                      ? null
                      : !(message?.mediaType == "video") && "difference",
                  }}
                >
                  {`${
                    Math.floor(played / 60) < 10
                      ? "0" + Math.floor(played / 60).toString() + ":"
                      : Math.floor(played / 60).toString() + ":"
                  }${
                    played % 60 < 10
                      ? "0" + (played % 60).toString()
                      : (played % 60).toString()
                  }
                  `}
                  |
                  {Math.floor(duration / 60) < 10
                    ? ` 0${Math.floor(duration / 60)}:${duration % 60}`
                    : ` ${Math.floor(duration / 60)}:${duration % 60}`}
                </p>
              )}

              <p
                style={{
                  fontSize: message?.mediaType == "video" && "12px",
                  fontFamily: message?.mediaType == "video" && "author3",
                  color: message.message
                    ? null
                    : message?.mediaType == "video"
                    ? "#000"
                    : "#fff",
                  mixBlendMode: message.message
                    ? null
                    : !(message?.mediaType == "video") && "difference",
                }}
              >
                {moment(message.timestamp).format("hh:mm a")}
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div
        className={sty.msgCoverYou}
        onDoubleClick={() => console.log("good")}
      >
        <div className={sty.msgItemCont}>
          <div
            className={sty.msgItem}
            style={{
              padding: "5px",
              background: "#fff",
              borderBottomRightRadius: "15px",
            }}
          >
            <div className={sty.msgCont}>
              <div
                style={{
                  height: "45px",
                  width: "110px",
                  display: "flex",
                  borderRadius: "10px",
                  overflow: "hidden",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "45px",
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    marginRight: "5px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={playAudio}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      fontSize: "18px",
                      color: "#ffffff",
                      paddingTop: "2px",
                      paddingLeft: "2px",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      borderRadius: "100%",
                      background: "#2b0fff",
                    }}
                  >
                    <i class={isPlaying ? "uil uil-pause" : "uil uil-play"}></i>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingBottom: "10px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      fontFamily: "author2",
                      textAlign: "center",
                    }}
                  >
                    {/* {`${
                  Math.floor(audioPlayed / 60) < 10
                    ? "0" + Math.floor(audioPlayed / 60).toString() + ":"
                    : Math.floor(audioPlayed / 60).toString() + ":"
                }${
                  audioPlayed % 60 < 10
                    ? "0" + (audioPlayed % 60).toString()
                    : (audioPlayed % 60).toString()
                }
                  `}
                | */}
                    {Math.floor(audioDuration / 60) < 10
                      ? ` 0${Math.floor(audioDuration / 60)}:${
                          Math.floor(audioDuration % 60) < 10
                            ? "0" + Math.floor(audioDuration % 60).toString()
                            : Math.floor(audioDuration % 60)
                        }`
                      : ` ${Math.floor(audioDuration / 60)}:${Math.floor(
                          audioDuration % 60
                        )}`}
                  </p>
                </div>

                <audio
                  src={message.chatMedia && message.chatMedia}
                  hidden
                  onLoadedData={() => setLoadedAudio(true)}
                  onEnded={playAudio}
                  ref={(el) => {
                    audioPlayer = el;
                  }}
                />
              </div>
            </div>
            <div
              className={sty.msgTime}
              style={{
                padding: "0px 10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-between",
              }}
            >
              <p>{moment(message.timestamp).format("hh:mm a")}</p>
            </div>
          </div>
        </div>
      </div>
    )
  ) : !message.file ? (
    <div className={sty.msgCover}>
      <div className={sty.msgItemCont}>
        <div className={sty.msgItem}>
          <div className={sty.msgCont}>
            <Linkify>
              <p class="messageText">{message.message}</p>
            </Linkify>
          </div>
          <div className={sty.msgTime}>
            <p>{moment(message.timestamp).format("hh:mm a")}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={sty.msgCover}>
      <div className={sty.msgItemCont}>
        <div className={sty.msgItemMedia}>
          <div className={sty.msgCont}>
            <div className={sty.msgContMedia}>
              <ProgressiveImage
                src={message.chatMedia ? message.chatMedia : fileFirst}
                placeholder={
                  fileFirst
                    ? fileFirst
                    : "https://i.postimg.cc/cLwhZx4P/noise.png"
                }
              >
                {(src, loading) => (
                  <img
                    src={src}
                    alt="Img"
                    style={{ borderRadius: !message.message ? "4px" : null }}
                  />
                )}
              </ProgressiveImage>
              {message.message && (
                <div className={sty.msgWtMed}>
                  <p>{message.message}</p>
                </div>
              )}
            </div>
          </div>

          <div className={sty.msgTime}>
            <p
              style={{
                color: message.message ? null : "#fff",
                mixBlendMode: message.message ? null : "difference",
              }}
            >
              {moment(message.timestamp).format("hh:mm a")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
