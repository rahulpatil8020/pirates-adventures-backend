import FeedPost from "../models/feedPost.js";
import mongoose from "mongoose";
// Controller to get All Adventure Posts
export const getAllFeedPosts = async (req, res) => {
  try {
    const feedPost = await FeedPost.find(); // Will give all Adventure Posts
    res.status(200).json(feedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to create an Adventure Post
export const createFeedPost = async (req, res) => {
  const feedPost = req.body; // We can send data from frontend to backend using the req (request) parameter
  // req.body has all the data we send to the backend through the request. In this case we're sending adventurePost data.
  const newFeedPost = new FeedPost(feedPost);

  try {
    await newFeedPost.save();
    res.status(201).json(newFeedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Controller to get a specific Adventure Post based on the Id that's been sent through req.body
export const getFeedPost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id ${id}`);
    const feedPost = await FeedPost.findById(id);
    res.status(200).json(feedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to update a specific Adventure Post based on the Id that's been sent through req. body
export const updateFeedPost = async (req, res) => {
  const feedPost = req.body;
  const { id } = req.params;

  try {
    // console.log("ehu", feedPost);
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    const updatedFeedPost = feedPost;
    await FeedPost.findByIdAndUpdate(id, updatedFeedPost, { new: true });
    res.status(200).json(updatedFeedPost);
  } catch (error) {
    console.log(error.message);
  }
};

// Controller to delete a specific Adventure Post based on the Id that's been sent thorugh req.body
export const deleteFeedPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    await FeedPost.findByIdAndRemove(id);

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeFeedPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    const feedPost = await FeedPost.findById(id);
    if (feedPost?.likedBy?.includes(userId)) {
      const updatedPost = await FeedPost.findByIdAndUpdate(
        id,
        {
          likes: feedPost.likes - 1,
          likedBy: feedPost?.likedBy.filter((user) => user != userId),
        },

        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      const updatedPost = await FeedPost.findByIdAndUpdate(
        id,
        { likes: feedPost.likes + 1, likedBy: [...feedPost.likedBy, userId] },
        { new: true }
      );
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    console.log(error.message);
  }
};
