import express from "express";
import {singleAvatar} from "../middlewares/multer.js";
import {isAuthenticated} from "../middlewares/auth.js";

import {
  login,
  logout,
  register,
  searchUser,
  getMyProfile,
  sendFriendRequest,
    acceptFriendRequest,
getMyNotifications,
getMyFriends

} from "../controllers/userController.js";
import {
  registerValidator,
  validateHandler,
  loginValidator,
  sendReqValidator,
  acceptReqValidator,
} from "../lib/validators.js";
const router = express.Router();

router.post(
  "/register",
  singleAvatar,
  registerValidator(),
  validateHandler,
  register,
);

router.post("/login", loginValidator(), validateHandler, login);
router.get("/logout", logout);

router.use(isAuthenticated);

router.get("/profile", getMyProfile);
router.get("/search", searchUser);
router.put(
  "/sendrequest",
  sendReqValidator(),
  validateHandler,
  sendFriendRequest,
);
router.put(
  "/acceptrequest",
  acceptReqValidator(),
  validateHandler,
  acceptFriendRequest,
);
router.get(
  "/notifications",
  getMyNotifications,
);
router.get(
  "/friend",
  getMyFriends,
);

export default router;
