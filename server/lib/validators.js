import { body, validationResult, check, param, query } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const newGroupChatValidator = () => [
    body("name", "please enter a group name").notEmpty(),
    body("members", "please enter members")
        .notEmpty()
        .withMessage("Members must be an array with at least 2 members")
        .isArray({ min: 1, max: 299 })
        .withMessage("Members must be an array with at least 2 members and at most 300 members"),
];
const addMembersValidator = () => [
    body("chatId", "please enter a chat id").notEmpty(),
    body("members", "please enter members")
        .notEmpty()
        .withMessage("Members must be an array with at least 2 members")
        .isArray({ min: 2, max: 300 })
        .withMessage("Members must be an array with at least 2 members and at most 300 members"),
];
const reomoveMembersValidator = () => [
    body("chatId", "please enter a chat id").notEmpty(),
    body("userId", "please enter user id").notEmpty()
];


const sendAttachmentsValidator = () => [
    param("id", "please enter a chat id").notEmpty(),
    check("files").notEmpty().isArray({ min: 1 ,max:5}).withMessage("please upload at least one file and maximum 5 files"),
];
const getMessagesValidator = () => [
    param("id", "please enter a chat id").notEmpty(),
    query("page").notEmpty().optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
];

const chatIdValidator = () => [
    param("id", "please enter a chat id").notEmpty(),
];

const renameValidator = () => [
    param("id", "please enter a chat id").notEmpty(),
    body("name", "please enter a new name").notEmpty(),
];

const registerValidator = () => [
    body("name", "Name is required").notEmpty(),
    body("username", "Username is required").notEmpty(),
    body("email", "Please enter a valid email address").isEmail().withMessage("Please enter a valid email address"),
    body("bio", "Bio is required").notEmpty(),
    body("password", "Password must be at least 6 characters long")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    check("avatar").notEmpty().withMessage("Avatar is required"),
];

const loginValidator = () => [
    body("username", "Username is required").notEmpty(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

const sendReqValidator = () => [
    body("userId", "userID is required").notEmpty(),
];
const acceptReqValidator = () => [
    body("requestId", "request ID is required").notEmpty(),
    body("accept").notEmpty().withMessage('Accept field is required').isBoolean().withMessage("accept must be a boolean value"),
];

const validateHandler = (req, res, next) => {
    const errors = validationResult(req);
    const errMessage = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
    if (errors.isEmpty()) return next();
    else next(new ErrorHandler(errMessage, 400));
};


export {
    registerValidator,
    loginValidator,
    validateHandler,
    newGroupChatValidator,
    addMembersValidator, 
    reomoveMembersValidator,
    sendAttachmentsValidator,
    getMessagesValidator,
    chatIdValidator,
    renameValidator,
    sendReqValidator,
    acceptReqValidator,
};
