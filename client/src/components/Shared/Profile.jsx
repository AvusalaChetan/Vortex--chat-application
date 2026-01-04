import {AvatarGroup, Stack, Avatar} from "@mui/material";
import {v4 as uuidv4} from "uuid";

const Profile = ({avatar = [], groupChat = false, max =4}) => {
  const avatarsToShow = groupChat ? avatar.slice(0, max) : avatar.slice(0, 1);
  return (
    <Stack direction="row" spacing={0.5}>
      <AvatarGroup max={max}>
        {avatarsToShow.map((img, idx) => (
          <Avatar
            key={uuidv4()}
            src={img}
            sx={{
              width: "3rem",
              height: "3rem",
              border: "1px solid white",
              position: "relative",
              left: idx * -25,
              zIndex: avatar.length + idx,
              bgcolor: "grey.500",
              boxShadow: 3,
            }}
          />
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default Profile;
