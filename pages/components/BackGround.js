import sty from "../../styles/Chat.module.css";

const BackGround = () => {
  return (
    <div className={sty.back_grad}>
      <div className={sty.back_grd1}>
        <div className={sty.back_grad_ball1}></div>
        <div className={sty.back_grad_ball2}></div>
      </div>
      <div
        className={sty.back_grd2}
        style={{ backgroundImage: "url(img/noise.png)" }}
      ></div>
    </div>
  );
};

export default BackGround;
