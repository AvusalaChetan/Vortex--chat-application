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

  
  return (
    <Stack width={w} direction={"column"}>
      {chats?.map((data) => {
        const {avatar, _id, name, groupChat, members} = data;

        const alerts = newMessagesAlert
          ? Array.isArray(newMessagesAlert)
            ? newMessagesAlert
            : [newMessagesAlert]
          : [];

        const newMessage = alerts.find(({chatId}) => chatId === _id);
        const isOnline = members?.some(() => onlineUsers.includes(_id));

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
