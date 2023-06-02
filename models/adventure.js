import mongoose from "mongoose";

const adventureSchema = mongoose.Schema({
  title: String,
  details: String,
  createdBy: String,
  creatorName: String,
  tags: [String],
  image: String,
  location: String,
  likes: { type: Number, default: 0 },
  likedBy: [String],
  adventureParticipants: [Object],
  adventureParticipantsCount: {
    type: Number,
    default: 1,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  adventureDate: {
    type: Date,
    default: new Date(),
  },
});

const AdventurePost = mongoose.model("AdventurePost", adventureSchema);

export default AdventurePost;
