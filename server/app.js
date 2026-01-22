import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import connectDB from "./utils/db.js";
import {errorMiddleWare} from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import chatsRoutes from "./routes/chatsRoutes.js";
{ // import seeders
  /*
import {createUser} from "./seeders/userSeed.js";
import {
  createSinglechat,
  createMessages,
  createMessagesInAChat,
} from "./seeders/chat.js";
 */
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;
const monogURI = process.env.MONGODB_URI;
connectDB(monogURI);

// createUser(10) // ussed to create dummy users
// createSinglechat(10); // used to create single chats
// createGroupChat(10); // used to create group chats
// createMessagesInAChat("696cad4093e2ee61bbea704c",50) // used to create messages in a particular chat

app.use("/user", userRoutes);
app.use("/chat", chatsRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
