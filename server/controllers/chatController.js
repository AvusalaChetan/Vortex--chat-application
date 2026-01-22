import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMembers } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { ChatModel } from "../models/chatModel.js";
import { userModel } from "../models/userModel.js";
import { MessageModel } from "../models/messageModel.js";
import { deletFilesFromcloudinary, emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { el } from "@faker-js/faker";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2)
    return next(
      new ErrorHandler("group chat must have at least 3 memebers", 400),
    );

  const allMembers = [...members, req.userId];
  await ChatModel.create({
    name,
    groupChat: true,
    creator: req.userId,
    members: allMembers,
  });
  emitEvent(req, ALERT, allMembers, `${name} Group Chat Created`);
  emitEvent(req, REFETCH_CHATS, members);
  return res.status(201).json({
    success: true,
    message: "Group Chat Created Successfully",
  });
});

const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await ChatModel.find({ members: req.userId }).populate(
    "members",
    "name email avatar",
  );

  const transformedChats = chats.map(
    ({ _id, name, groupChat, members, lastMessage, createdAt, updatedAt }) => {
      const otherMembers = getOtherMembers(members, req.userId);

      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map((member) => member.avatar.url)
          : [otherMembers.avatar.url],
        name: groupChat ? name : otherMembers.name,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.userId.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
        createdAt,
        updatedAt,
      };
    },
  );

  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await ChatModel.find({
    members: req.userId,
    groupChat: true,
  }).populate("members", "name email avatar");

  const groups = chats.map(
    ({ _id, name, members, groupChat, createdAt, updatedAt }) => {
      return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        createdAt,
        updatedAt,
      };
    },
  );

  return res.status(200).json({
    success: true,
    groups,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;
  const chat = await ChatModel.findById(chatId);

  if (!members || members.length === 0)
    return next(
      new ErrorHandler("Please provide at least one member to add", 400),
    );

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("this is not a groupd chat ", 400));
  if (chat.creator.toString() !== req.userId.toString())
    return next(new ErrorHandler("only group admin can add members", 403));

  const allNewMembersPromise = members.map((i) =>
    userModel.findById(i, "name email "),
  );
  const allNewMembers = await Promise.all(allNewMembersPromise);
  const uniqueMembers = allNewMembers.filter(
    (i) => i && !chat.members.includes(i._id),
  );

  chat.members.push(...uniqueMembers.map((i) => i._id));

  if (chat.members.length > 100)
    return next(new ErrorHandler("group chat members cannot exceed 100", 400));

  await chat.save();
  const allUsersName = allNewMembers.map((i) => i.name).join(", ");
  emitEvent(req, ALERT, chat.members, `${allUsersName} added in the group `);
  emitEvent(req, REFETCH_CHATS, chat.members);

  console.log(allUsersName);
  return res.status(200).json({
    success: true,
    // allUsersName,
    message: "Members added successfully",
  });
});

const removeMembers = TryCatch(async (req, res, next) => {
  const { chatId, userId } = req.body;

  const [chat, userThatWillBeRemoved] = await Promise.all([
    ChatModel.findById(chatId),
    userModel.findById(userId, "name email "),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("this is not a group chat ", 400));

  if (chat.members.length <= 3)
    return next(
      new ErrorHandler("group chat must have at least 3 members", 400),
    );

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString(),
  );

  await chat.save();
  emitEvent(
    req,
    ALERT,
    chat.members,
    `${userThatWillBeRemoved.name} removed from the group`,
  );
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members removed successfully",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  console.log(chatId);
  const chat = await ChatModel.findById(chatId);

  if (!chat) return next(new ErrorHandler("chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("this is not a group chat", 400));

  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.userId.toString(),
  );

  if (chat.creator.toString() === req.userId.toString()) {
    const randomEle = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[randomEle];
    chat.creator = newCreator;
  }

  chat.members = remainingMembers;

  const [user] = await Promise.all([
    userModel.findById(req.userId, "name "),
    chat.save(),
  ]);

  emitEvent(req, ALERT, chat.members, `user ${user.name} left the group`);
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members removed successfully",
  });
});

// send attachment
const sendAttachment = TryCatch(async (req, res, next) => {
  const chatId = req.body.chatId;

  const [chat, me] = await Promise.all([
    // me means the sender of attachment or file
    ChatModel.findById(chatId),
    userModel.findById(req.userId, "name "),
  ]);
  if (!chat) return next(new ErrorHandler("chat not found", 404));

  const files = req.file || [];
  if (files.length < 1)
    return next(new ErrorHandler("please provide a valid attachment", 400));

  // upload file here
  const attachments = [];

  const messageForDB = {
    content: "",
    sender: me._id,
    chat: chatId,
    attachments,
  };

  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: me._id,
      name: me.name,
    },
  };
  const message = await MessageModel.create(messageForDB);

  emitEvent(req, NEW_ATTACHMENT, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
    chatId,
  });

  return res.status(200).json({
    success: true,
    message,
  });
});

const getChatDetails = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await ChatModel.findById(req.params.id)
      .populate("members", "name email avatar")
      .lean();

    if (!chat) return next(new ErrorHandler("chat not found", 404));

    chat.members = chat.members.map(({ _id, name, email, avatar }) => {
      return { _id, name, email, avatar };
    });

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await ChatModel.findById(req.params.id);
    if (!chat) return next(new ErrorHandler("chat not found", 404));

    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { name } = req.body;
  const chat = await ChatModel.findById(chatId);

  if (!chat) return next(new ErrorHandler("chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("this is not a group chat", 400));

  if (chat.creator.toString() !== req.userId.toString())
    return next(new ErrorHandler("only group admin can rename the group", 403));

  chat.name = name || chat.name;
  await chat.save();
  emitEvent(req, REFETCH_CHATS, chat.members, `group renamed to ${name}`);
  return res.status(200).json({
    success: true,
    message: "group renamed successfully",
  });
});

const deletChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  if (!chatId) return next(new ErrorHandler("please provide chat id", 400));
  const chat = await ChatModel.findById(chatId);
  if (!chat) return next(new ErrorHandler("chat not found", 404));

  const members = chat.members;

  if (chat.groupChat && chat.creator.toString() !== req.userId.toString())
    return next(new ErrorHandler("only group admin can delete the group", 403));

  if (!chat.groupChat && !chat.members.includes(req.userId.toString()))
    return next(new ErrorHandler("you are not a member of this chat", 403));

  const messagesWithAttachments = await MessageModel.find({
    chat: chatId,
    attachment: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  messagesWithAttachments.forEach(({ attachments }) =>
    attachments.forEach(({ public_id }) => public_ids.push(public_id))
  )

  await Promise.all([deletFilesFromcloudinary(public_ids), ChatModel.deleteOne(),
  MessageModel.deleteMany({ chat: chatId })
  ])

  emitEvent(req, REFETCH_CHATS, members)


  return res.status(200).json({
    success: true,
    message: "deleted  successfully",
  });
});


const getMessage = TryCatch(async (req, res, next) => {

  const chatId = req.params.id;
  const { page = 1 } = req.query;
  const resultPerPage = 20;
  const skip = (page - 1) * resultPerPage;
  const [messages] = await Promise.all([
    MessageModel.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(resultPerPage)
      .populate("sender", "name")
      .populate("chat")
      .lean(),
    MessageModel.countDocuments({ chat: chatId }),

  ])
  const toltalPages = Math.ceil(messages.length / resultPerPage);
  return res.status(200).json({
    success: true,
    toltalPages,
    messages,
  });

});


export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMembers,
  leaveGroup,
  sendAttachment,
  getChatDetails,
  renameGroup,
  deletChat,
  getMessage
};
