import {compare} from "bcrypt";
import {NEW_FRIEND_REQUEST, REFETCH_CHATS} from "../constants/events.js";
import {TryCatch} from "../middlewares/error.js";
import {ChatModel} from "../models/chatModel.js";
import {RequestModel} from "../models/requestModel.js";
import {userModel} from "../models/userModel.js";
import {emitEvent, sendToken} from "../utils/features.js";
import {ErrorHandler} from "../utils/utility.js";
import {getOtherMembers} from "../lib/helper.js";

const register = TryCatch(async (req, res, next) => {
  const {email, name, username, password, bio} = req.body;

  const file = req.file;
  console.log("file:", file);
  if(!file) return next(new ErrorHandler("Avatar is required",400));
  
  const existingUser = await userModel.findOne({$or: [{email}, {username}]});
  if (existingUser)
    return next(new ErrorHandler("User already exists", 400));

  const avatar = {
    public_id: "kkkk",
    url: "lkasdf",
  };
  const user = await userModel.create({
    name,
    bio,
    username,
    email,
    password,
    avatar,
  });
  sendToken(res, user, 201, "User created successfully");
});

const login = TryCatch(async (req, res, next) => {
  const {username, password} = req.body;
  if (!username || !password)
    return next(new ErrorHandler("All fields required", 400));

  const user = await userModel.findOne({username}).select("+password");
  if (!user) return next(new ErrorHandler("invalid Username or password", 404));
  const isMatch = await compare(password, user.password);
  if (!isMatch)
    return next(new ErrorHandler("invalid username or password", 404));
  sendToken(res, user, 200, `wellcome back ${user.name}`); // set the token
});

const logout = TryCatch(async (req, res) => {
  res
    .status(200)
    .clearCookie("vortex-token", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    })
    .json({success: true, message: "logged out successfully"});
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await userModel.findById(req.userId);
  if (!user) return next(new ErrorHandler("User not found", 404));
  res.status(200).json({success: true, user});
});

const searchUser = TryCatch(async (req, res, next) => {
  const {name = ""} = req.query;
  if (!name) return next(new ErrorHandler("Name query is required", 400));

  // Find all chats where the user is a member
  const myChats = await ChatModel.find({groupChat: false, members: req.userId});
  // Collect all user IDs from these chats (including self)
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  // Find users who are NOT in the chat list and match the name
  const allUsersExceptMeAndFriends = await userModel.find({
    _id: {$nin: allUsersFromMyChats},
    name: {$regex: name, $options: "i"},
  });

  const users = allUsersExceptMeAndFriends.map(({_id, name, avatar}) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  res.status(200).json({
    success: true,
    // allUsersExceptMeAndFriends,
    users,
  });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const {userId} = req.body;
  const request = await RequestModel.findOne({
    $or: [
      {sender: req.userId, receiver: userId},
      {receiver: req.userId, sender: userId},
    ],
  });

  if (request) return next(new ErrorHandler("Request already sent", 400));

  await RequestModel.create({
    sender: req.userId,
    receiver: userId,
  });

  emitEvent(req, NEW_FRIEND_REQUEST, [userId]);

  res.status(200).json({success: true, message: "Friend request sent"});
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const {requestId, accept} = req.body;
  const request = await RequestModel.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");
  if (!request) return next(new ErrorHandler("Request not found", 404));

  if (request.receiver._id.toString() !== req.userId.toString()) {
    return next(
      new ErrorHandler("You are not authorized to accept this request", 403),
    );
  }
  if (!accept) {
    await request.deleteOne();
    return res
      .status(200)
      .json({success: true, message: "Friend request rejected"});
  }
  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    ChatModel.create({
      members,
      name: `${request.sender.name} & ${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, [request.sender._id]);

  res.status(200).json({
    success: true,
    message: "Friend request accepted",
    senderId: request.sender._id,
  });
});

const getMyNotifications = TryCatch(async (req, res, next) => {
  const requests = await RequestModel.find({receiver: req.userId}).populate(
    "sender",
    "name avatar",
  );

  const allRequests = requests.map((req) => ({
    _id: req._id,
    sender: {
      _id: req.sender._id,
      name: req.sender.name,
      avatar: req.sender.avatar.url,
    },
    createdAt: req.createdAt,
  }));

  return res.status(200).json({success: true, requests: allRequests});
});

const getMyFriends = TryCatch(async (req, res, next) => {
  const chatId = req.query.chatId;

  const chats = await ChatModel.find({
    members: req.userId,
    groupChat: false,
  }).populate("members", "name avatar");

  if (!chats) return next(new ErrorHandler("Chat not found", 404));
  const friends = chats.map(({members}) => {
    const otherMembers = getOtherMembers(members, req.userId);
    return {
      _id: otherMembers._id,
      name: otherMembers.name,
      avatar: otherMembers.avatar.url,
    };
  });

  if (chatId) {
    const chat = await ChatModel.findById(chatId);
    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id),
    );
    return res.status(200).json({success: true, friends: availableFriends});
  } else {
    return res.status(200).json({success: true, friends});
  }
});

export {
  acceptFriendRequest,
  getMyNotifications,
  getMyProfile,
  login,
  logout,
  register,
  searchUser,
  sendFriendRequest,
  getMyFriends,
};
