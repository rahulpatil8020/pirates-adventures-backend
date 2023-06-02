import mongoose from "mongoose";

const ChatRoomSchema = mongoose.Schema({
  name: String,
  adventure: String,
  chats: [Object],
});

const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);

export default ChatRoom;
