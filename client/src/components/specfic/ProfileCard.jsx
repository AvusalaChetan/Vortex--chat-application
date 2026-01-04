import {Avatar, Stack, Typography} from "@mui/material";

const ProfileCard = () => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{
        color: "white",
      }}
    >
      <Avatar
        sx={{
          width: 90,
          height: 90,
          bgcolor: "grey.500",
          boxShadow: 2,
          mx: "auto",
        }}
      />
      <ProfileDetails heading={"bio"} text={"This is sample bio text"} />
      <ProfileDetails heading={"username"} text={"@chetan_2005"} />
      <ProfileDetails heading={"name"} text={"chetan"} />
    </Stack>
  );
};

const ProfileDetails = ({text, Icon, heading}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        color: "white",
        textAlign: "left",
        borderRadius: 1,
        px: 1.5,
        py: 0.5,
        boxShadow: 1,
        minWidth: 120,
        mb: 0.5,
      }}
    >
      {Icon && (
        <Box sx={{mr: 1, display: "flex", alignItems: "center"}}>{Icon}</Box>
      )}
      <Stack direction="column" sx={{flex: 1}}>
        <Typography sx={{color: "#bdbdbd", fontSize: "0.85rem"}}>
          {heading}
        </Typography>
        <Typography variant="body2" sx={{fontWeight: 500, fontSize: "0.95rem"}}>
          {text}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ProfileCard;
