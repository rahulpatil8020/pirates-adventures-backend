import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id ${id}`);

    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
  } catch (error) {}
};

export const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    if (user) {
      await User.deleteOne(id);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(id);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token, user });
      } else {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
    } else return res.status(404).json({ message: "User Doesn't Exist" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (password !== confirmPassword)
      return res.status(409).json({ message: "Passwords don't match" });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addAdventure = async (req, res) => {
  const { id } = req.params;
  const { adventureId } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id ${id}`);

    const user = await User.findById(id);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        adventures: [...user.adventures, adventureId],
      },
      { new: true }
    );
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
};
