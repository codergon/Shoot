<div className={sty.msgCoverYou} onDoubleClick={() => console.log("good")}>
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
            width: "220px",
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
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <canvas
              id="canvaser"
              style={{ width: "100%", height: "40px" }}
            ></canvas>
          </div>
        </div>
      </div>
      <div
        className={sty.msgTime}
        style={{
          padding: "0px 10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            fontFamily: "author2",
          }}
        >
          01:28 | 21:56
        </p>
        <p>{moment().format("hh:mm a")}</p>
      </div>
    </div>
  </div>
</div>;
