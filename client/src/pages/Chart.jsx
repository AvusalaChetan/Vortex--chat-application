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
          backgroundImage: `url("/imgs/tree.png")`,
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
            <MoreOptions isOpen={isOpen} />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId="testChatId" />
    </>
  );
};

export default AppLayout(Chart);
