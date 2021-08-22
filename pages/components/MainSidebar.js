import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import SiteLogo from "./SiteLogo";
import sty from "../../styles/Chat.module.css";

const MainSidebar = ({ ppic }) => {
  const [user] = useAuthState(auth);
  const [senderSnapshot] = useCollection(
    db.collection("users").where("email", "==", user.email)
  );

  const thisUser = senderSnapshot?.docs?.[0]?.data();

  return (
    <div className={sty.main_sd}>
      <SiteLogo />
      <div className={sty.msd_list}>
        <div className={sty.msd_item}>
          <div className={sty.msd_item_ppic}>
            {/* <i class="uil uil-user"></i> */}
            <div
              className={sty.msd_ppic}
              style={{ backgroundImage: `url(${thisUser?.photoURL})` }}
            ></div>
          </div>
          <p>YOU</p>
        </div>
        <div className={sty.msd_item}>
          <div className={sty.msd_item_icon}>
            <i class="uil uil-estate"></i>
          </div>
          <p>HOME</p>
        </div>
        <div className={sty.msd_item}>
          <div className={sty.msd_item_icon}>
            <i class="uil uil-analysis"></i>
          </div>
          <p>TRND</p>
        </div>
        <div className={sty.msd_item}>
          <div className={sty.msd_item_icon}>
            <i class="far fa-bell"></i>
          </div>
          <p>NOTI</p>
        </div>
        {/* <div className={sty.msd_item}msg_item_active"> */}
        <div className="msd_item msg_item_active">
          <div className={sty.msd_item_icon}>
            <i class="uil uil-message"></i>
          </div>
          <p>MSSG</p>
        </div>
        <div className={sty.msd_item}>
          <div className={sty.msd_item_icon}>
            <i class="uil uil-cog"></i>
          </div>
          <p>SETS</p>
        </div>
      </div>
      <div className={sty.msd_out}>
        <p>
          <i class="uil uil-user-arrows"></i> Switch User
        </p>
      </div>
    </div>
  );
};

export default MainSidebar;
