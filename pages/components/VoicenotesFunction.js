import React from "react";
import sty from "../../styles/Chat.module.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth, db, storage } from "../../firebase";
import firebase from "firebase";
import moment from "moment";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Voicenotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: "",
      isBlocked: false,
      hoverBorder: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  sendvn = (vnToAdd) => {
    console.log(vnToAdd);
  };

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);

        const file = new File(buffer, "music.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (readerEvent) => {
          this.sendvn(readerEvent.target.result);
        };

        this.setState({ blobURL, isRecording: false });
      })
      .catch((e) => console.log(e));
  };

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }

  render() {
    return (
      <div
        style={{
          zIndex: 100,
          backgroundColor: "#282c34",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "calc(10px + 2vmin)",
          color: "white",
        }}
      >
        <>
          <div
            className={sty.vn_cont}
            onClick={() => {
              if (this.state.isRecording) {
                this.stop();
              } else {
                this.start();
              }
            }}
            style={{
              borderRadius: "100%",
              background: "transparent",
              border: "1px solid #1900ffdf",
              transform: !this.state.isRecording && "scale(1)",
              animation: !this.state.isRecording && "none",
              transition: this.state.isRecording ? "all 0.7s" : "all 0.3s",
            }}
            onMouseEnter={() => this.setState({ hoverBorder: true })}
            onMouseLeave={() => this.setState({ hoverBorder: false })}
          >
            <div
              style={{
                display: "flex",
                borderRadius: "100%",
                alignItems: "center",
                justifyContent: "center",
                width: "calc(100% - 4px)",
                height: "calc(100% - 4px)",
                border:
                  this.state.hoverBorder &&
                  !this.state.isRecording &&
                  "1px solid #1900ffaf",
                fontSize: this.state.isRecording ? "14px" : "16px",
                color: this.state.isRecording ? "#ddd" : "#1900ff",
                background: this.state.isRecording ? "#1900ff" : "transparent",
              }}
            >
              <i class="fas fa-microphone-alt"></i>
            </div>
          </div>

          {/* {mediaBlobUrl && <audio src={mediaBlobUrl} hidden id="testAudio" />} */}
        </>
      </div>
    );
  }
}

export default Voicenotes;
