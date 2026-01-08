import {useRef, useState} from "react";
import {IconButton, Typography, Box, Stack, Divider} from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import FileMenu from "../components/dialogs/FileMenu";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  MoreVert as MoreVertIcon,
  Wallpaper,
  AutoAwesome,
  Image,
  Palette,
} from "@mui/icons-material";
import {InputBox} from "../components/StyledComponent";
import {sampleMessages} from "../constants/sampleData";
import MessageComponenets from "../components/Shared/MessageComponenets";
import {v4 as uuidV4} from "uuid";

const user = {
  name: "a.chetan",
  _id: "2",
};

const Chart = () => {
  const containerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleFileOpen = (e) => {
    setFileMenuAnchor(e.currentTarget);
  };

  const handleFileClose = () => {
    setFileMenuAnchor(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setMessage("");
  };

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={1}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          // backgroundImage: `url("/imgs/coder.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 2,
        }}
      >
        {/* message container */}
        {sampleMessages.map((message) => (
          <MessageComponenets key={uuidV4()} message={message} user={user} />
        ))}
      </Stack>
      <form
        onSubmit={submitHandler}
        style={{
          height: "10%",
          // border:'1px solid red',
          width: {sm: "95vw", lg: "50%"},
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          px={1}
          sx={{
            // border:'1px solid red',
            mx: "auto",
            marginTop: "0.5rem",
            height: "100%",
          }}
        >
          <IconButton color="primary" onClick={handleFileOpen}>
            <AttachFileIcon />
          </IconButton>

          <Stack flex={1}>
            <InputBox
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Stack>

          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>

          <IconButton color="primary.text">
            <MoreVertIcon onClick={() => setIsOpen(!isOpen)} />
            <MoreOptions isOpen={isOpen}  />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId="testChatId" />
    </>
  );
};


const MoreOptions = ({isOpen, setIsOpen}) => {
  const menuItems = [
    {
      icon: <Wallpaper fontSize="small" />,
      label: "Chat Background",
      action: () => console.log("Chat Background clicked"),
    },
    {
      icon: <Palette fontSize="small" />,
      label: "Set Chat Theme",
      action: () => console.log("Set Theme clicked"),
    },
    {
      icon: <AutoAwesome fontSize="small" />,
      label: "AI Text Generation",
      action: () => console.log("AI Text clicked"),
    },
    {
      icon: <Image fontSize="small" />,
      label: "Image Generation",
      action: () => console.log("Image Gen clicked"),
    },
  ];

  return (
    <>
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            bottom: "4rem",
            transform: "translateX(-50%)",
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            minWidth: "220px",
            zIndex: 1000,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
            animation: "slideUp 0.2s ease-out",
            "@keyframes slideUp": {
              from: {
                opacity: 0,
                transform: "translateX(-50%) translateY(10px)",
              },
              to: {
                opacity: 1,
                transform: "translateX(-50%) translateY(0)",
              },
            },
          }}
        >
          <Stack spacing={0}>
            {menuItems.map((item, index) => (
              <Box key={index}>
                <Box
                  onClick={item.action}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "action.hover",
                      "& .MuiTypography-root": {
                        color: "primary.main",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "primary.main",
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: "text.secondary",
                      display: "flex",
                      transition: "all 0.2s",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "text.primary",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
                {index < menuItems.length - 1 && <Divider />}
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default AppLayout(Chart);
