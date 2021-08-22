import sty from "../../styles/Chat.module.css";

const closeNotes = () => {
  $("#notes_sect").animate({ left: "100%" }, 200);
};

const Notes = () => {
  return (
    <>
      <div className={sty.nt_sect_hedr}>
        <p></p>
        <i class="uil uil-times" onClick={closeNotes}></i>
      </div>
      <div className={sty.nt_hdr}>
        <p>
          UR - N
          <i
            class="uil uil-notes"
            style={{ marginLeft: "1px", marginRight: "2px", fontSize: "22px" }}
          ></i>
          TES
        </p>
        <p>Go through notes you share here</p>
      </div>
      <div className={sty.nt_list_sect}>
        <div className={sty.nt_item} style={{ background: "#5f83af" }}>
          <textarea placeholder="We think, mistakenly, that success is the result of the amount of time we put in at work, instead of the quality of time we put in."></textarea>
        </div>
        <div className={sty.nt_item} style={{ background: "#ffcf7d" }}>
          <textarea placeholder="Entrepreneurship is a great leveler. The wonderful thing is that money is not the sole currency when it comes to starting a business; drive, determination, passion and hard work are all free and more valuable than a pot of cash. ~ Richard Branson, Serial entrepreneur"></textarea>
        </div>
      </div>
      <div className={sty.add_nt}>
        <p>Create new note</p>
        <div className={sty.nt_add_col}>
          <i class="fas fa-circle" style={{ color: "#ffcf7d" }}></i>
          <i class="fas fa-circle" style={{ color: "#e02626" }}></i>
          <i class="fas fa-circle" style={{ color: "#808080" }}></i>
          <i class="fas fa-circle" style={{ color: "#ffe035" }}></i>
          <i class="fas fa-circle" style={{ color: "#5f83af" }}></i>
          <i class="fas fa-circle" style={{ color: "#02ce0c" }}></i>
          <i class="fas fa-circle" style={{ color: "#ce028a" }}></i>
        </div>
      </div>
    </>
  );
};

export default Notes;
