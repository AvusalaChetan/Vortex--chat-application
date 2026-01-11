import {Box, Stack, Typography} from "@mui/material";
import {Wallpaper, AutoAwesome, Image, Settings} from "@mui/icons-material";

const options = [
  {Icon: Wallpaper, title: "Chat background", action: () => console.log("Chat background")},
  {Icon: AutoAwesome, title: "AI text", action: () => console.log("AI text")},
  {Icon: Image, title: "Image generation", action: () => console.log("Image generation")},
  {Icon: Settings, title: "Settings", action: () => console.log("Settings")},
];

const MoreOptions = ({isOpen}) => {
  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "3.5rem",
        right: 0,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        border: "1px solid",
        borderColor: "divider",
        minWidth: 220,
        zIndex: 1200,
        overflow: "hidden",
      }}
    >
      <Stack spacing={0}>
        {options.map(({Icon, title, action}) => (
          <Box
            key={title}
            onClick={action}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              px: 2,
              py: 1.25,
              cursor: "pointer",
              transition: "all 0.15s ease",
              "&:hover": {
                bgcolor: "action.hover",
                "& .option-icon, & .option-text": {color: "primary.main"},
              },
            }}
          >
            <Box className="option-icon" sx={{color: "text.secondary", display: "flex"}}>
              <Icon fontSize="small" />
            </Box>
            <Typography
              className="option-text"
              variant="body2"
              sx={{fontWeight: 500, color: "text.primary"}}
            >
              {title}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default MoreOptions;
