import {Link} from "../StyledComponent";
import {memo} from "react";
import Profile from "./Profile";

import {Stack, Typography, Box, Paper} from "@mui/material";
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
  return (
    <Link
      sx={{
        padding: 0,
        margin: 0,
        width: "100%",
        mt:'0.4rem',
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDleteChat(e, _id, groupChat)}
    >
      <Paper
        elevation={sameSender ? 4 : 1}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.2,
          py: 0.7,
          bgcolor: sameSender ? "#222" : "background.paper",
          color: sameSender ? "white" : "unset",
          borderRadius: 2,
          minHeight: 44,
          position: "relative",
          boxShadow: sameSender ? 4 : 1,
          transition: "background 0.2s",
        }}
      >
        <Profile avatar={avatar} groupChat={groupChat} max={3} />
        <Stack direction="column" sx={{minWidth: 0, flex: 1}}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "0.93rem",
              lineHeight: 1.1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          {newMessagesAlert && (
            <Typography sx={{fontSize: "0.75rem", color: "#90caf9"}}>
              {newMessagesAlert.count} New Messages
            </Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              right: 10,
              transform: "translateY(-50%)",
              bgcolor: "green",
            }}
          />
        )}
      </Paper>
    </Link>
  );
};

export default memo(ChatItem);
