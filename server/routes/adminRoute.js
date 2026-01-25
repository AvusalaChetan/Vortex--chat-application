import express from "express";
import {getAdminData,adminLogin, getAllUsers ,allChats,allMessages,getDashboardStats,adminLogOut} from "../controllers/adminContorller.js";
import {adminLoignValidator,validateHandler} from "../lib/validators.js";
import { isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/verify/login",adminLoignValidator(),validateHandler,adminLogin)
router.get("/logout",adminLogOut)


// only admin can access the below routes

router.get("/",isAdmin,getAdminData)

router.get("/users",isAdmin,getAllUsers)
router.get("/chats",isAdmin,allChats)
router.get("/messages",isAdmin,allMessages)
router.get("/stats",isAdmin,getDashboardStats)


export default router;