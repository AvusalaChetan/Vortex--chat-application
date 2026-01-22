import jwt from "jsonwebtoken";

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({_id: user._id,email:user.email},process.env.JWT_SECRET);
  const cookieOption = {
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
    httpOnly: true,
    secure: true,
  };
  return res.status(code).cookie("vortex-token", token, cookieOption).json({
    success: true,
    message,
  });
};

const emitEvent = (req, event, users,data) => {
  console.log("emitting event", event, users);
}


const deletFilesFromcloudinary = async (public_ids) => {


}




export {sendToken, emitEvent,deletFilesFromcloudinary};
