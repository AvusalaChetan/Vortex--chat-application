import express from "express";
import {
  getMyProfile,
  login,
  logout,
  register,
  searchUser,
} from "../controllers/userController.js";
import {singleAvatar} from "../middlewares/multer.js";
import {isAuthenticated} from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", singleAvatar, register);
router.post("/login", login);
router.get("/logout", logout);

router.use(isAuthenticated);

router.get("/profile", getMyProfile);
router.get("/search", searchUser);

export default router;
