import {compare} from "bcrypt";
import {userModel} from "../models/userModel.js";
import {sendToken} from "../utils/features.js";
import {TryCatch} from "../middlewares/error.js";
import {ErrorHandler} from "../utils/utility.js";

const register = TryCatch(async (req, res, next) => {
  const {email, name, username, password, bio} = req.body;
  const avatar = {
    public_id: "kkkk",
    url: "lkasdf",
  };
  const user = await userModel.create({
    name, bio, username, email, password, avatar,
  });
  sendToken(res, user, 201, "User created successfully");
});

const login = TryCatch(async (req, res, next) => {
  const {username, password} = req.body;
  if (!username || !password) return next(new ErrorHandler('All fields required', 400))

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


const getMyProfile = TryCatch(async (req, res,next) => {
  const user = await userModel.findById(req.userId);
  if (!user) return next(new ErrorHandler('User not found', 404));
  res.status(200).json({success: true, user});
});

export {register, login, logout, getMyProfile};
