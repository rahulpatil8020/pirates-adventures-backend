import AdventurePost from "../models/adventure.js";
import mongoose from "mongoose";
// Controller to get All Adventure Posts
export const getAllAdventurePosts = async (req, res) => {
  try {
    const adventurePosts = await AdventurePost.find(); // Will give all Adventure Posts
    res.status(200).json(adventurePosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to create an Adventure Post
export const createAdventurePost = async (req, res) => {
  const adventurePost = req.body; // We can send data from frontend to backend using the req (request) parameter
  // req.body has all the data we send to the backend through the request. In this case we're sending adventurePost data.
  const newAdventurePost = new AdventurePost(adventurePost);

  try {
    await newAdventurePost.save();
    res.status(201).json(newAdventurePost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Controller to get a specific Adventure Post based on the Id that's been sent through req.body
export const getAdventurePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id ${id}`);
    const adventurePost = await AdventurePost.findById(id);
    res.status(200).json(adventurePost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to update a specific Adventure Post based on the Id that's been sent through req. body
export const updateAdventurePost = async (req, res) => {
  const adventurePost = req.body;
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    const updatedAdventurePost = adventurePost;
    await AdventurePost.findByIdAndUpdate(id, updatedAdventurePost, {
      new: true,
    });
    res.status(200).json(updatedAdventurePost);
  } catch (error) {
    console.log(error);
  }
};

// Controller to delete a specific Adventure Post based on the Id that's been sent thorugh req.body
export const deleteAdventurePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await AdventurePost.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

//Controller for adding and Adventurer in an adventure

export const addAdventureParticipant = async (req, res) => {
  const { id } = req.params;
  const { userId, userName } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const adventurePost = await AdventurePost.findById(id);
    if (
      adventurePost?.adventureParticipants?.some(
        (adventureParticipant) => adventureParticipant.userId == userId
      )
    ) {
      const updatedPost = await AdventurePost.findByIdAndUpdate(
        id,
        {
          adventureParticipants: adventurePost?.adventureParticipants.filter(
            (user) => user.userId != userId
          ),
          adventureParticipantsCount:
            adventurePost.adventureParticipantsCount - 1,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      // console.log(adventurePost);
      const updatedPost = await AdventurePost.findByIdAndUpdate(
        id,
        {
          adventureParticipants: [
            ...adventurePost.adventureParticipants,
            { userId: userId, userName: userName },
          ],
          adventureParticipantsCount:
            adventurePost.adventureParticipantsCount + 1,
        },
        { new: true }
      );
      // console.log(updatedPost);
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const likeAdventurePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    const adventurePost = await AdventurePost.findById(id);
    if (adventurePost?.likedBy?.includes(userId)) {
      const updatedPost = await AdventurePost.findByIdAndUpdate(
        id,
        {
          likes: adventurePost.likes - 1,
          likedBy: adventurePost?.likedBy.filter((user) => user != userId),
        },

        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      const updatedPost = await AdventurePost.findByIdAndUpdate(
        id,
        {
          likes: adventurePost.likes + 1,
          likedBy: [...adventurePost.likedBy, userId],
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    console.log(error.message);
  }
};
