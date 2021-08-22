import Header from "./Header";

const Loading = () => {
  return (
    <div className="loading_cont">
      <Header headerTitle="Shoot | Messaging and Calls" />

      <div className="back_grad">
        <div className="back_grd1">
          <div className="back_grad_ball1"></div>
          <div className="back_grad_ball2"></div>
        </div>
        <div
          className="back_grd2"
          style={{ backgroundImage: "url(img/noise.png)" }}
        ></div>
      </div>

      <div
        style={{
          color: "#555",
          fontSize: "2rem",
          letterSpacing: "0.03rem",
          display: "flex",
          overflow: "hidden",
          alignItems: "center",
          fontFamily: "bespoke",
          flexDirection: "row",
          textTransform: "uppercase",
          justifyContent: "center",
        }}
      >
        <p>Sh</p>
        <i
          class="uil uil-bowling-ball"
          style={{
            width: "1.65rem",
            height: "1.65rem",
            fontSize: "1.6rem",
            background: "#555",
            display: "flex",
            color: "#eee",
            borderRadius: "100%",
            alignItems: "center",
            margin: "0px 0.08rem",
            justifyContent: "center",
          }}
        ></i>
        <i
          class="uil uil-bowling-ball"
          style={{
            width: "1.65rem",
            height: "1.65rem",
            fontSize: "1.6rem",
            background: "#555",

            display: "flex",
            color: "#eee",
            borderRadius: "100%",
            alignItems: "center",
            margin: "0px 0.08rem",
            justifyContent: "center",
          }}
        ></i>
        <p>t</p>
      </div>
    </div>
  );
};

export default Loading;
