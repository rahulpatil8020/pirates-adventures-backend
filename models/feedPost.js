import mongoose from "mongoose";

const feedPostSchema = mongoose.Schema({
  title: String,
  details: String,
  createdBy: String,
  creatorName: String,
  tags: [String],
  image: String,
  likedBy: [String],
  likes: {
    type: Number,
    default: 0,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

const FeedPost = mongoose.model("FeedPost", feedPostSchema);

export default FeedPost;
