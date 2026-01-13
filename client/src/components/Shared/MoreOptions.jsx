import {Box, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Wallpaper, AutoAwesome, Image, Settings} from "@mui/icons-material";

const MoreOptions = ({isOpen, visibilityOfSetting}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const options = [
    {
      Icon: Wallpaper,
      title: "Chat background",
      action: () => console.log("Chat background"),
    },
    {Icon: AutoAwesome, title: "AI text", action: () => console.log("AI text")},
    {
      Icon: Image,
      title: "Image generation",
      action: () => console.log("Image generation"),
    },
    {
      Icon: Settings,
      title: "Settings",
      action: () => {
        visibilityOfSetting();
      },
    },
  ];

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: { xs: "3rem", sm: "3.5rem" },
        right: { xs: 0, sm: 0 },
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        border: "1px solid",
        borderColor: "divider",
        minWidth: { xs: 180, sm: 220 },
        maxWidth: { xs: "85vw", sm: "none" },
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
              gap: { xs: 1, sm: 1.25 },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 1, sm: 1.25 },
              cursor: "pointer",
              transition: "all 0.15s ease",
              "&:hover": {
                bgcolor: "action.hover",
                "& .option-icon, & .option-text": {color: "primary.main"},
              },
            }}
          >
            <Box
              className="option-icon"
              sx={{color: "text.secondary", display: "flex"}}
            >
              <Icon fontSize={isMobile ? "small" : "medium"} />
            </Box>
            <Typography
              className="option-text"
              variant="body2"
              sx={{
                fontWeight: 500, 
                color: "text.primary",
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
              }}
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
