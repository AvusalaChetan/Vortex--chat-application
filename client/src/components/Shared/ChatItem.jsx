import { Avatar, Badge, Chip, Paper, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { Link } from "../StyledComponent";

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
        textDecoration: "none",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDleteChat(e, _id, groupChat)}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2,
          py: 1.5,
          mb: 0.5,
          bgcolor: sameSender 
            ? "rgba(25, 118, 210, 0.12)" 
            : "transparent",
          borderRadius: 2,
          position: "relative",
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            bgcolor: sameSender 
              ? "rgba(25, 118, 210, 0.18)" 
              : "action.hover",
            transform: "translateX(4px)",
          },
        }}
      >
        {/* Avatar with online status */}
        <Badge
          overlap="circular"
          anchorOrigin={{vertical: "bottom", horizontal: "right"}}
          variant="dot"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: isOnline ? "#44b700" : "transparent",
              color: isOnline ? "#44b700" : "transparent",
              boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
              width: 12,
              height: 12,
              borderRadius: "50%",  
              "&::after": isOnline ? {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                animation: "ripple 1.2s infinite ease-in-out",
                content: '""',
              } : {},
            },
            "@keyframes ripple": {
              "0%": {
                transform: "scale(.8)",
                opacity: 1,
              },
              "100%": {
                transform: "scale(2.4)",
                opacity: 0,
              },
            },
          }}
        >
          <Avatar
            src={avatar?.url || ""}
            alt={name}
            sx={{
              width: 48,
              height: 48,
              border: sameSender ? "2px solid" : "none",
            }}
          />
        </Badge>

        {/* Chat info */}
        <Stack 
          direction="column" 
          sx={{
            minWidth: 0, 
            flex: 1,
            gap: 0.3,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: sameSender ? 600 : 500,
              fontSize: "0.95rem",
              color: sameSender ? "text.primary" : "text.primary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          
          {newMessagesAlert && newMessagesAlert.count > 0 && (
            <Typography 
              variant="caption" 
              sx={{
                fontSize: "0.75rem",
                color: "primary.main",
                fontWeight: 500,
              }}
            >
              {newMessagesAlert.count} new {newMessagesAlert.count === 1 ? 'message' : 'messages'}
            </Typography>
          )}
        </Stack>

        {/* Unread count badge */}
        {newMessagesAlert && newMessagesAlert.count > 0 && (
          <Chip
            label={newMessagesAlert.count}
            size="small"
            sx={{
              height: 24,
              minWidth: 24,
              fontSize: "0.75rem",
              fontWeight: 600,
              bgcolor: "primary.main",
              color: "white",
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />
        )}

      
      </Paper>
    </Link>
  );
};

export default memo(ChatItem);