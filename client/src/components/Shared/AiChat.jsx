import {Grid, Stack, IconButton, Typography, Box} from "@mui/material";
import {useState} from "react";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import {InputBox} from "../../components/StyledComponent";

const AiChat = ({isMobileDialog = false}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log("AI Message:", message);
    setMessage("");
  };

  return (
    <Grid
      size={6}
      sx={{
        height: "100%",
        width: "100%",
        display: isMobileDialog ? "flex" : {xs: "none", md: "flex"},
        flexDirection: "column",
      }}
    >
      {/* Header */}
      {!isMobileDialog && (
        <Box
          sx={{
            py: 1.5,
            px: 2,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h6"
            color="primary.main"
            textAlign="center"
            fontWeight={600}
          >
            AI Chat Assistant
          </Typography>
        </Box>
      )}

      {/* Messages Container */}
      <Stack
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          bgcolor: "background.default",
          p: 2,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))`,
        }}
      >
        {/* Messages will be rendered here */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">
            Start a conversation with AI...
          </Typography>
        </Box>
      </Stack>

      {/* Input Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          p: 1.5,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            color="primary"
            size="small"
            sx={{p: 1}}
            // onClick={handleFileOpen}
          >
            <AttachFileIcon fontSize="small" />
          </IconButton>

          <Box flex={1}>
            <InputBox
              placeholder="Chat with AI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                fontSize: {xs: "0.875rem", sm: "0.95rem"},
                padding: {xs: "0.625rem 0.875rem", sm: "0.75rem 1rem"},
              }}
            />
          </Box>

          <IconButton
            type="submit"
            color="primary"
            size="small"
            disabled={!message.trim()}
            sx={{p: 1}}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Grid>
  );
};

export default AiChat;
