import {useRef, useState} from "react";
import {IconButton, Stack, } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import FileMenu from "../components/dialogs/FileMenu";
import MoreOptions from "../components/Shared/MoreOptions";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  MoreVert as MoreVertIcon,
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
  const [isOpen, setIsOpen] = useState(false);

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
    <Stack
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        spacing={1}
        sx={{
          flexGrow: 1,
          overflowX: "hidden",
          overflowY: "auto",
          backgroundImage: `url("/imgs/tree.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 2,
          p: { xs: 0.75, sm: 1 },
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
          flexShrink: 0,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1 }}
          sx={{
            px: { xs: 0.5, sm: 1 },
            py: { xs: 0.75, sm: 1 },
            mt: { xs: 0.5, sm: 0.75 },
          }}
        >
          <IconButton 
            color="primary" 
            onClick={handleFileOpen}
            size="small"
            sx={{ 
              p: { xs: 0.75, sm: 1 },
            }}
          >
            <AttachFileIcon fontSize="small" />
          </IconButton>

          <Stack flex={1} sx={{ minWidth: 0 }}>
            <InputBox
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.95rem" },
                padding: { xs: "0.625rem 0.875rem", sm: "0.75rem 1rem" },
              }}
            />
          </Stack>

          <IconButton 
            type="submit" 
            color="primary"
            size="small"
            sx={{ 
              p: { xs: 0.75, sm: 1 },
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>

          <IconButton 
            color="primary.text"
            size="small"
            sx={{ 
              p: { xs: 0.75, sm: 1 },
            }}
          >
            <MoreVertIcon 
              fontSize="small" 
              onClick={() => setIsOpen(!isOpen)} 
            />
            <MoreOptions isOpen={isOpen} />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId="testChatId" />
    </Stack>
  );
};

export default AppLayout(Chart);
