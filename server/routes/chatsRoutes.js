import express from "express";
import {isAuthenticated} from "../middlewares/auth.js";
// import {attachmentMulter} from "../middlewares/multer.js";
import {attachmentMulter} from '../middlewares/multer.js'
import {
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
} from "../controllers/chatController.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupChat);
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
router.put("/addmembers", addMembers);
router.put("/removemembers", removeMembers);
router.delete("/leave/:id", leaveGroup);

// send attachment route
router.post("/message/",attachmentMulter, sendAttachment);
router.get("/message/:id",getMessage);

router.route("/:id").get(getChatDetails)
.put(renameGroup).delete(deletChat);

export default router;
