import {Stack, Typography, Box} from "@mui/material";
import {Link} from "../StyledComponent";
import {memo} from "react";
import Profile from "./Profile";
import {sampleChats} from "../../constants/sampleData";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessagesAlert,
  index = 0,
  handleDleteChat,
}) => {
  
  const avatarUrl = Array.isArray(avatar)
    ? avatar[0] && (avatar[0].url || avatar[0].src)
    : avatar && (avatar.url || avatar.src);

  return (
    <Link
      sx={{
        padding: 0,
        margin: 0,
        height: "5rem",
        width: "100%",
      }}
      to={`/chat/${_id}`}
      //onContextMenu use for right click
      onContextMenu={(e) => handleDleteChat(e, _id, groupChat)}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "#222222ff" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5rem",
          }}
        >
          <Profile
            avatar={avatar}
            groupChat={groupChat}
            max={4}
          />

          <Stack style={{display: "flex", flexDirection: "column"}}>
            <Typography style={{fontWeight: 600}}>{name}</Typography>
            {newMessagesAlert && (
              <Typography>{newMessagesAlert.count} New Messages</Typography>
            )}
          </Stack>
        </div>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
              bgcolor: "green",
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
