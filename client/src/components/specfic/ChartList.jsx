import {Stack} from "@mui/material";
import ChatItem from "../Shared/ChatItem";

const ChartList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [],
  handleDleteChat,
}) => {
  // Safety check - ensure chats is an array
  const chatList = Array.isArray(chats) ? chats : [];

  return (
    <Stack width={w} direction={"column"}>
      {chatList?.map((data) => {
        const {avatar, _id, name, groupChat, members} = data;

        const alerts = newMessagesAlert
          ? Array.isArray(newMessagesAlert)
            ? newMessagesAlert
            : [newMessagesAlert]
          : [];

        const newMessage = alerts.find(({chatId}) => chatId === _id);
        // Fix: Check if any member is in onlineUsers array
        const isOnline = members?.some((memberId) =>
          onlineUsers.includes(memberId),
        );

        return (
          <ChatItem
            newMessagesAlert={newMessage}
            isOnline={isOnline}
            avatar={avatar}
            key={_id}
            _id={_id}
            name={name}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDleteChat={handleDleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChartList;
