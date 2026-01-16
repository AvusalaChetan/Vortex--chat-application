import {AvatarGroup, Stack, Avatar} from "@mui/material";
import {v4 as uuidv4} from "uuid";

const Profile = ({avatar = [], groupChat = false, max = 4}) => {
  const avatarsToShow = groupChat ? avatar.slice(0, max) : avatar.slice(0, 1);
  return (
    <Stack direction="row" spacing={0.5}>
      <AvatarGroup max={max} sx={{"& .MuiAvatar-root": {marginLeft: "-25px"}}}>
        {avatarsToShow.map((img, idx) => (
          <Avatar
            key={uuidv4()}
            src={img}
            sx={{
              width: "2.5rem",
              height: "2.5rem",
              border: "2px solid white",
              bgcolor: "grey.500",
            }}
            loading="lazy"
          />
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default Profile;
