import { TryCatch } from "../middlewares/error.js";
import { userModel } from "../models/userModel.js";
import { MessageModel } from "../models/messageModel.js";
import { ChatModel } from "../models/chatModel.js";
import jwt from "jsonwebtoken";

const adminLogin = TryCatch(async (req, res, next) => {
  const { secretKey } = req.body;

  const isMatch = secretKey === process.env.ADMIN_SECRET_KEY;

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid Secret Key",
    });
  }

  const token = jwt.sign({ secretKey }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("vortex-adminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  return res.status(200).json({
    success: true,
    message: "Admin login successful,WELLCOME ADMIN",
  });
})


const adminLogOut = TryCatch(async (req, res, next) => {

  res.clearCookie("vortex-adminToken");

  return res.status(200).json({
    success: true,
    message: "Admin logout successful",
  });
})


const getAdminData = TryCatch(async(req,res,next)=>{
  return res.status(200).json({
    admin:true,
  })
})



const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await userModel.find({});

  const transformedUsers = await Promise.all(
    users.map(async ({ _id, name, username, avatar }) => {
      const [groups, friends] = await Promise.all([
        ChatModel.countDocuments({ groupChat: true, members: _id }),
        ChatModel.countDocuments({ groupChat: false, members: _id }),
      ]);

      return {
        name,
        username,
        avatar: avatar && avatar.url ? avatar.url : null,
        _id,
        groups,
        friends,
      };
    }),
  );

  return res.status(200).json({
    success: true,
    users: transformedUsers,
  });
});

const allChats = TryCatch(async (req, res, next) => {
  const chats = await ChatModel.find({})
    .populate("members", "name  avatar")
    .populate("creator", "name  avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ members, _id, groupChat, creator, name }) => {
      const totalMembers = await MessageModel.countDocuments({ chat: _id });
      return {
        _id,
        groupChat,
        name: groupChat ? name : null,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        members: members.map(({ _id, name, avatar }) => ({
          _id,
          name,
          avatar: avatar.url,
        })),
        creator: {
          name: creator?.name || "none",
          avatar: creator?.avatar.url || "",
          _id: creator?._id || "none",
        },
        totalMembers: totalMembers,
      };
    }),
  );

  return res.status(200).json({
    success: true,
    transformedChats,
  });
});

const allMessages = TryCatch(async (req, res, next) => {
  const messages = await MessageModel.find({}).populate(
    "sender",
    "name  avatar",
  );

  const transformedMessages = await Promise.all(
    messages.map(
      async ({ content, attachment, _id, sender, chat, createdAt }) => {
        const chatDetails =
          await ChatModel.findById(chat).select("name groupChat");
        return {
          content,
          attachments: attachment,
          _id,
          sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
          },
          chat: chatDetails
            ? {
              _id: chat,
              name: chatDetails.name,
              groupChat: chatDetails.groupChat,
            }
            : {
              _id: chat,
              name: "Deleted Chat",
              groupChat: false,
            },
          createdAt,
        };
      },
    ),
  );

  return res.status(200).json({
    success: true,
    messages: transformedMessages,
  });
});

const getDashboardStats = TryCatch(async (req, res, next) => {
  const [groupsCount, usersCount, messagesCount, totalChatsCount] =
    await Promise.all([
      ChatModel.countDocuments({ groupChat: true }),
      userModel.countDocuments({}),
      MessageModel.countDocuments({}),
      ChatModel.countDocuments({}),
    ]);

  const today = new Date();

  const last7day = new Date();
  last7day.setDate(last7day.getDate() - 7);

  const last7DaysMessages = await MessageModel.find({
    createdAt: { $gte: last7day, $lte: today },
  }).select("createdAt");

  const dayInMilliseconds = 24 * 60 * 60 * 1000;

  const messages = new Array(7).fill(0);

  last7DaysMessages.forEach((message) => {
    const index = Math.floor(
      (today.getDate() - new Date(message.createdAt).getDate()) /
      dayInMilliseconds,
    );
    messages[6 - index]++;
  });

  const stats = {
    totalUsers: usersCount,
    totalGroups: groupsCount,
    totalMessages: messagesCount,
    totalChats: totalChatsCount,
    messagesChat: messages
  };

  return res.status(200).json({
    success: true,
    stats,
  });
});



export { getAllUsers, allChats, allMessages, getDashboardStats, adminLogin, adminLogOut,getAdminData };
