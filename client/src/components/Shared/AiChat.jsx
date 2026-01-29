import {Grid, Stack, IconButton, Typography, Box, Fade, Paper, Avatar} from "@mui/material";
import {useState} from "react";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  SmartToy as SmartToyIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material";
import {InputBox} from "../../components/StyledComponent";

const AiChat = ({isMobileDialog = false}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      text: message,
      timestamp: new Date()
    }]);
    
    console.log("AI Message:", message);
    setMessage("");
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'ai',
        text: 'I received your message! This is a placeholder response.',
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <Grid
      size={6}
      sx={{
        height: "100%",
        width: "100%",
        display: isMobileDialog ? "flex" : {xs: "none", md: "flex"},
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(72, 187, 120, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(66, 153, 225, 0.08) 0%, transparent 50%)
          `,
          animation: "gradient 15s ease infinite",
          "@keyframes gradient": {
            "0%, 100%": {
              opacity: 1,
            },
            "50%": {
              opacity: 0.8,
            },
          },
        }}
      />

      {/* Header */}
      {!isMobileDialog && (
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            py: 2,
            px: 3,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            backdropFilter: "blur(10px)",
            background: (theme) => 
              `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: (theme) => 
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                animation: "pulse 2s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": {
                    transform: "scale(1)",
                    opacity: 1,
                  },
                  "50%": {
                    transform: "scale(1.05)",
                    opacity: 0.9,
                  },
                },
              }}
            >
              <SmartToyIcon sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                background: (theme) => 
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI Assistant
            </Typography>
            <AutoAwesomeIcon 
              sx={{ 
                color: "primary.main", 
                fontSize: 20,
                animation: "sparkle 3s ease-in-out infinite",
                "@keyframes sparkle": {
                  "0%, 100%": {
                    opacity: 0.5,
                    transform: "rotate(0deg)",
                  },
                  "50%": {
                    opacity: 1,
                    transform: "rotate(180deg)",
                  },
                },
              }} 
            />
          </Stack>
        </Box>
      )}

      {/* Messages Container */}
      <Stack
        sx={{
          position: "relative",
          zIndex: 1,
          flexGrow: 1,
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          bgcolor: "background.default",
          p: 3,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            bgcolor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "divider",
            borderRadius: "10px",
            "&:hover": {
              bgcolor: "action.hover",
            },
          },
        }}
        spacing={2}
      >
        {messages.length === 0 ? (
          // Empty State
          <Fade in timeout={800}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: (theme) => 
                    `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "float 3s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": {
                      transform: "translateY(0px)",
                    },
                    "50%": {
                      transform: "translateY(-10px)",
                    },
                  },
                }}
              >
                <SmartToyIcon sx={{ fontSize: 50, color: "primary.main" }} />
              </Box>
              
              <Stack spacing={1} alignItems="center">
                <Typography 
                  variant="h6" 
                  fontWeight={600}
                  color="text.primary"
                >
                  Welcome to AI Assistant
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  textAlign="center"
                  sx={{ maxWidth: 300 }}
                >
                  Ask me anything! I'm here to help with your questions and tasks.
                </Typography>
              </Stack>

              {/* Suggested Prompts */}
              <Stack spacing={1} sx={{ width: "100%", maxWidth: 400 }}>
                {[
                  "💡 Explain a concept",
                  "✍️ Help me write something",
                  "🔍 Research a topic",
                ].map((prompt, idx) => (
                  <Paper
                    key={idx}
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: "action.hover",
                        transform: "translateX(4px)",
                      },
                    }}
                    onClick={() => setMessage(prompt.split(" ").slice(1).join(" "))}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {prompt}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Fade>
        ) : (
          // Messages
          messages.map((msg, idx) => (
            <Fade in key={idx} timeout={300}>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                }}
              >
                {msg.type === "ai" && (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      background: (theme) => 
                        `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    }}
                  >
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
                
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: msg.type === "user" 
                      ? "primary.main" 
                      : "background.paper",
                    color: msg.type === "user" ? "white" : "text.primary",
                    border: msg.type === "ai" ? "1px solid" : "none",
                    borderColor: "divider",
                    boxShadow: msg.type === "user" 
                      ? "0 4px 12px rgba(0,0,0,0.1)" 
                      : "none",
                  }}
                >
                  <Typography variant="body2">
                    {msg.text}
                  </Typography>
                </Paper>
                
                {msg.type === "user" && (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "grey.700",
                    }}
                  >
                    U
                  </Avatar>
                )}
              </Stack>
            </Fade>
          ))
        )}
      </Stack>

      {/* Input Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "relative",
          zIndex: 1,
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          p: 2,
          backdropFilter: "blur(10px)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 1,
            borderRadius: 3,
            border: "2px solid",
            borderColor: message.trim() ? "primary.main" : "divider",
            transition: "all 0.2s",
            "&:focus-within": {
              borderColor: "primary.main",
              boxShadow: (theme) => `0 0 0 3px ${theme.palette.primary.main}20`,
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              color="primary"
              size="medium"
              sx={{
                transition: "all 0.2s",
                "&:hover": {
                  transform: "rotate(15deg)",
                  bgcolor: "action.hover",
                },
              }}
            >
              <AttachFileIcon fontSize="medium" />
            </IconButton>

            <Box flex={1}>
              <InputBox
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  fontSize: "0.95rem",
                  padding: "0.75rem 1rem",
                  border: "none",
                  "&:focus": {
                    outline: "none",
                    border: "none",
                  },
                }}
                autoComplete="off"
              />
            </Box>

            <IconButton
              type="submit"
              disabled={!message.trim()}
              sx={{
                bgcolor: message.trim() ? "primary.main" : "action.disabledBackground",
                color: "white",
                width: 40,
                height: 40,
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "scale(1.05)",
                },
                "&:disabled": {
                  bgcolor: "action.disabledBackground",
                  color: "action.disabled",
                },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Paper>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            textAlign: "center",
            mt: 1,
            fontSize: "0.7rem",
          }}
        >
          Powered by AI • Press Enter to send
        </Typography>
      </Box>
    </Grid>
  );
};

export default AiChat;