import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const Emojis = ({ addEmoji }) => {
  return (
    <div>
      <Picker
        style={{
          height: "100%",
          height: "95vh",
          width: "100%",
          border: "none",
          outline: "none",
          fontFamily: "author3",
        }}
        set="google"
        title={""}
        emoji={""}
        onSelect={(emoji) => addEmoji(emoji.native.toString())}
        showPreview={false}
        enableFrequentEmojiSort={true}
        emojiTooltip={false}
      />
    </div>
  );
};

export default Emojis;
