import { auth } from "../../firebase";

const Navbar = () => {
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className="navbar">
      <div className="site_logo">
        <p>Sh</p>
        <i class="uil uil-bowling-ball"></i>
        <i class="uil uil-bowling-ball"></i>
        <p>t</p>
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <ul className="nav_act_butt">
          <li>
            <i class="uil uil-cell" style={{ marginRight: "7px" }}></i>
            <p>shots</p>
          </li>
          <li>
            <i class="far fa-bell"></i>
            <p>notifications</p>
          </li>
          <li>
            <i
              class="uil uil-circle-layer"
              style={{ marginTop: "1px", fontSize: "18px" }}
            ></i>
            <p>explore</p>
          </li>
        </ul>
        <div className="current_user" onClick={signOut}>
          <p>Wiliams</p>
          <i class="fas fa-sort-down"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
