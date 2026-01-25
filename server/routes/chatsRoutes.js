import express from "express";
import {isAuthenticated} from "../middlewares/auth.js";
// import {attachmentMulter} from "../middlewares/multer.js";
import {
  addMembers,
  deletChat,
  getChatDetails,
  getMessage,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMembers,
  renameGroup,
  sendAttachment,
} from "../controllers/chatController.js";
import {
  addMembersValidator,
  chatIdValidator,
  getMessagesValidator,
  newGroupChatValidator,
  reomoveMembersValidator,
  sendAttachmentsValidator,
  validateHandler,
  renameValidator,
} from "../lib/validators.js";
import {attachmentMulter} from "../middlewares/multer.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupChatValidator(), validateHandler, newGroupChat);
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
router.put("/addmembers", addMembersValidator(), validateHandler, addMembers);
router.put(
  "/removemembers",
  reomoveMembersValidator(),
  validateHandler,
  removeMembers,
);
router.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

// send attachment route
router.post(
  "/message/",
  attachmentMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachment,
);
router.get("/message/:id", getMessagesValidator(), validateHandler, getMessage);

router
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deletChat);

export default router;
