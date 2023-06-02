import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import adventureRoutes from "./routes/adventures.js";
import userRoutes from "./routes/users.js";
import feedPostRoutes from "./routes/feedPosts.js";
import chatRoomRoutes from "./routes/chatRoom.js";
import getAPIKey from "./routes/apiKeys.js";
import dotenv from "dotenv";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

// Using '/adventures' means that each of the request comming from adventureRoutes will have /adventures as prefix.
// This means we have to hit localhost::8000/adventures to get the adventures data instead of localhost::8000/
app.use("/adventures", adventureRoutes);
app.use("/users", userRoutes);
app.use("/feedPosts", feedPostRoutes);
app.use("/apiKeys", getAPIKey);
app.use("/chatRooms", chatRoomRoutes);

const PORT = process.env.PORT || 8000;
const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose.set("strictQuery", true);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is listening on Port: ${PORT}`))
  )
  .catch((error) => console.log(error));
