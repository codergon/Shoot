import React from "react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import sty from "../../styles/Auth.module.css";
import { auth, provider } from "../../firebase";
import * as EmailValidator from "email-validator";
import * as PasswordValidator from "password-validator";

import * as THREE from "three";

const Login = () => {
  const [isValidEmail, setValidMail] = useState(true);
  const [isValidPass, setValidPass] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const showPassword = () => setShowPass(!showPass);
  const signInWithMail = () => {
    var PassValidator = new PasswordValidator();
    PassValidator.is()
      .min(8)
      .is()
      .max(100)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits(1)
      .has()
      .not()
      .spaces()
      .is()
      .not()
      .oneOf(["Passw0rd", "Password123"]);
    if (!EmailValidator.validate($("#log_email").val())) {
      setValidMail(false);
    } else {
      setValidMail(true);
    }
    if (!PassValidator.validate($("#log_pass").val())) {
      setValidPass(false);
    } else {
      setValidPass(true);
    }

    if (
      PassValidator.validate($("#log_pass").val()) &&
      EmailValidator.validate($("#log_email").val())
    ) {
      auth
        .signInWithEmailAndPassword($("#log_email").val(), $("#log_pass").val())
        .catch((error) => console.log(error));
    } else {
      console.log("Nuh ready");
      return;
    }
  };

  useEffect(() => {
    var camera, scene, renderer, width, height;

    var sphere;

    function start() {
      var geometry = new THREE.SphereGeometry(1, 13, 13);
      var material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
      });
      sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      if ($("#three_showcase").width() < $(window).width()) {
        camera.position.z = 5;
      } else {
        camera.position.z = 3;
      }

      update();
    }

    function update() {
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.002;

      requestAnimationFrame(update);
      renderer.render(scene, camera);
    }

    function onEnable() {
      width = $("#three_showcase").width();
      height = $("#three_showcase").height();

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(
        $("#three_showcase").width(),
        $("#three_showcase").height()
      );
      renderer.setPixelRatio(
        window.devicePixelRatio ? window.devicePixelRatio : 1
      );
      $(".three_showcase").append(renderer.domElement);

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
      camera.position.set(0, 0, 500);
      scene.add(camera);

      // maxHeight = 500;
    }

    onEnable();
    start();
  }, []);

  return (
    <>
      <div className={sty.back_grad}>
        <div
          className={sty.back_grd1}
          style={{
            backgroundImage: "url(img/f5f0a678567627.5ca8943e7acf9.jpg)",
          }}
        ></div>
        <div
          className={sty.back_grd2}
          style={{ backgroundImage: "url(img/noise.png)" }}
        ></div>
      </div>

      <Header headerTitle="Shoot | Sign In" />
      <div className={sty.coverAll}>
        <div
          className={sty.sideDeco}
          style={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            class="three_showcase"
            id="three_showcase"
            style={{ height: "100%", width: "100%", marginLeft: "12vw" }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "15vh",
              fontSize: "26px",
              fontFamily: "author2",
              // textAlign: "center",
              lineHeight: "30px",
            }}
          >
            Hi there!! 👋 <br />
            Connect with beautiful people around the globe
          </div>
        </div>

        <div className={sty.login_container}>
          <div className={sty.log_cont_inn}>
            <div className={sty.logHead}>
              <div className={sty.logLogo}>
                <p>Sh</p>
                <i class="uil uil-bowling-ball"></i>
                <i class="uil uil-bowling-ball"></i>
                <p>t</p>
              </div>
            </div>

            <div className={sty.login_sect}>
              <div className={sty.log_em}>
                <div className={sty.log_email_cont}>
                  <input
                    type="email"
                    id="log_email"
                    className={sty.log_email}
                    placeholder="Email or phone number"
                  />
                </div>
                {!isValidEmail && (
                  <div className={sty.warn_email}>
                    <p>Email not valid</p>
                  </div>
                )}
                <div className={sty.log_pass_cont}>
                  <input
                    type={showPass ? "text" : "password"}
                    id="log_pass"
                    className={sty.log_pass}
                    placeholder="Password"
                  />
                  <div onClick={showPassword}>
                    {showPass ? (
                      <i class="uil uil-eye"></i>
                    ) : (
                      <i class="uil uil-eye-slash"></i>
                    )}
                  </div>
                </div>
                {!isValidPass && (
                  <div className={sty.warn_pass}>
                    <p>
                      Password not valid. <br /> Must contain lowercase,
                      uppercase letters & digits without spaces.
                    </p>
                  </div>
                )}
                <button className={sty.log_butt} onClick={signInWithMail}>
                  Log in to your account
                  <i
                    class="uil uil-angle-right"
                    style={{ marginLeft: "2px", marginTop: "2px" }}
                  ></i>
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  margin: "25px 0px 20px",
                  flexDirection: "row",
                  alignItems: "center",
                  fontFamily: "author3",
                  justifyContent: "center",
                }}
              >
                &nbsp; OR &nbsp;
              </div>

              <div className={sty.log_oth}>
                <button className={sty.log_goog}>
                  <i class="fab fa-google"></i>
                  <p>Sign in with Google</p>
                </button>
                <button className={sty.log_twi}>
                  <i class="uil uil-twitter"></i>
                  <p>Sign in with Twitter</p>
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  margin: "20px 0px 20px",
                  flexDirection: "row",
                  alignItems: "center",
                  fontFamily: "author2",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{ borderBottom: "1px solid #777", cursor: "pointer" }}
                >
                  Forgot password?
                </p>
              </div>
            </div>
          </div>
          <div className={sty.priv_pol}>
            <p style={{ cursor: "pointer" }}>Privacy Policy</p>
            <p style={{ cursor: "pointer" }}>Copyright@Shoot 2021</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
