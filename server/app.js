import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import connectDB from "./utils/db.js";
import {errorMiddleWare} from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import {v4 as uuidv4} from "uuid";
import cors from "cors";
import {v2 as cloudinary} from "cloudinary";

import {Server} from "socket.io";
import {createServer} from "http";

import userRoutes from "./routes/userRoutes.js";
import chatsRoutes from "./routes/chatsRoutes.js";
import adminRoutes from "./routes/adminRoute.js";

// import seeders

// import {createUser} from "./seeders/userSeed.js";
// import {
//   createSinglechat,
//   createMessages,
//   createMessagesInAChat,
//   createGroupChat,
// } from "./seeders/chat.js";

//import events constants
import {NEW_MESSAGE, NEW_MESSAGE_ALERT} from "./constants/events.js";
import {getSockets} from "./lib/helper.js";
import {MessageModel} from "./models/messageModel.js";
import {soketAuthenticator} from "./middlewares/auth.js";

import {corsOptions} from "./constants/config.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const monogURI = process.env.MONGODB_URI;
connectDB(monogURI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// createUser(10) // ussed to create dummy users
// createSinglechat(5);
//  // used to create single chats
// createGroupChat(5);
//  // used to create group chats
// createMessagesInAChat("697634c3473ff61040b168fe",50) // used to create messages in a particular chat

const userSocketIds = new Map();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatsRoutes);
app.use("/api/v1/admin", adminRoutes);

// socktet io connection

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await soketAuthenticator(err, socket, next),
  );
});

io.on("connection", (socket) => {
  const user = socket.user;
  userSocketIds.set(user._id.toString(), socket.id);

  socket.on(NEW_MESSAGE, async ({chatId, members, message}) => {
    console.log("New message received on server:", {chatId, members, message});
    const messageForRealTime = {
      _id: uuidv4(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      content: message,
      members: members,
      createdAt: new Date().toISOString(),
    };
    console.log("messageForRealTime ", messageForRealTime.members);

    const messageForDB = {
      content: message,
      chat: chatId,
      sender: user._id,
    };

    const membersSockets = getSockets(members);

    io.to(membersSockets).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });

    io.to(membersSockets).emit(NEW_MESSAGE_ALERT, {chatId});

    try {
      await MessageModel.create(messageForDB);
      console.log("Message saved to DB", messageForDB);
    } catch (error) {
      console.log("Error saving message to DB:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    userSocketIds.delete(user._id.toString());
  });
});

app.use(errorMiddleWare);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${envMode} mode`);
});

export {envMode, userSocketIds};
