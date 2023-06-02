import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  adventures: {
    type: [String],
    default: [],
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  posts: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
