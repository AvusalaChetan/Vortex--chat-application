import {useCallback, useEffect, useRef, useState} from "react";
import {IconButton, Skeleton, Stack} from "@mui/material";
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
import {getSocket} from "../Socket";
import {useChatDetailsQuery} from "../redux/apis/api";
import {NEW_MESSAGE} from "../../../server/constants/events";
import {useSocketEvents} from "6pp";
import { useErrors } from "../hooks/hook";

const Chart = ({chatId, user}) => {
  const containerRef = useRef(null);

  const soket = getSocket();
  const chatDetails = useChatDetailsQuery({chatId, skip: !chatId});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const errors = [{isError: chatDetails.isError, error: chatDetails.error}];
  const members = chatDetails?.data?.chat?.members || [];
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileOpen = (e) => {
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log("Submitting message:", message);
    soket.emit(NEW_MESSAGE, {message, chatId, members});
    setMessage("");
  };

  const newMessageHandler = useCallback(({message}) => {
    console.log("New message received in component:", message);
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const eventHandlers = {[NEW_MESSAGE]: newMessageHandler};

  useSocketEvents(soket, eventHandlers);
  useErrors(errors)

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
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
          p: {xs: 0.75, sm: 1},
        }}
      >
        {/* message container */}
        {messages.map((message) => (
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
          spacing={{xs: 0.5, sm: 1}}
          sx={{
            px: {xs: 0.5, sm: 1},
            py: {xs: 0.75, sm: 1},
            mt: {xs: 0.5, sm: 0.75},
          }}
        >
          <IconButton
            color="primary"
            onClick={handleFileOpen}
            size="small"
            sx={{
              p: {xs: 0.75, sm: 1},
            }}
          >
            <AttachFileIcon fontSize="small" />
          </IconButton>

          <Stack flex={1} sx={{minWidth: 0}}>
            <InputBox
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                fontSize: {xs: "0.8rem", sm: "0.95rem"},
                padding: {xs: "0.625rem 0.875rem", sm: "0.75rem 1rem"},
              }}
            />
          </Stack>

          <IconButton
            type="submit"
            color="primary"
            size="small"
            sx={{
              p: {xs: 0.75, sm: 1},
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>

          <IconButton
            color="primary.text"
            size="small"
            sx={{
              p: {xs: 0.75, sm: 1},
            }}
          >
            <MoreVertIcon fontSize="small" onClick={() => setIsOpen(!isOpen)} />
            <MoreOptions isOpen={isOpen} />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId="testChatId" />
    </Stack>
  );
};

export default AppLayout(Chart);
