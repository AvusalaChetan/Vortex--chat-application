import {Button, styled} from "@mui/material";
import {
  FileOpen as FileOpenIcon,
  Description as DocumentIcon,
  TableChart as SpreadsheetIcon,
  Slideshow as PresentationIcon,
  FolderZip as ArchiveIcon,
  Error as ErrorIcon,
  // Download,
} from "@mui/icons-material";
import {transformImage} from "../../lib/featurs";
import {Box, Stack, Typography} from "@mui/material";

// Styled components
const StyledImage = styled("img")({
  //   width: "100%",
  height: "150px",
  objectFit: "contain",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  backgroundColor: "rgba(255,255,255,0.9)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
});

const StyledVideo = styled("video")({
  width: {lg: "100%", sm: "100%", xs: "200px"},
  height: "100%",
  border: "1px solid red",
  borderRadius: "8px",
  backgroundColor: "#000",
  objectFit: "cover",
});

const StyledAudio = styled("audio")({
  borderRadius: "8px",
  outline: "none",
});

const FilePreviewBox = styled(Box)({
  width: "200px",
  height: "150px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(200,210,230,0.3)",
  border: "1px solid rgba(100,150,200,0.3)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "all 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(150,180,220,0.4)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transform: "translateY(-2px)",
  },
});

const IconWrapper = styled(Stack)({
  alignItems: "center",
  gap: "8px",
  color: "#666",
});

const RenderAttachments = ({file, url}) => {
  switch (file) {
    case "video":
      return (
        <Box
          sx={{
            width: "200px",
            height: "150px",
            borderRadius: 1,
            // overflow: "hidden",
          }}
        >
          <StyledVideo src={url} controls preload="metadata" />
        </Box>
      );

    case "audio":
      return (
        <Box sx={{width: "200px"}}>
          <StyledAudio src={url} controls preload="metadata" />
        </Box>
      );

    case "image":
      return (
        <>
          <StyledImage
            src={transformImage(url, 200)}
            alt="attachment"
          />
        </>
      );

    case "pdf":
      return (
        <FilePreviewBox
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{textDecoration: "none"}}
        >
          <IconWrapper>
            <FileOpenIcon sx={{fontSize: 48, color: "#d32f2f"}} />
            <Typography variant="caption" sx={{fontWeight: "bold"}}>
              PDF
            </Typography>
          </IconWrapper>
        </FilePreviewBox>
      );

    case "document":
      return (
        <FilePreviewBox
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{textDecoration: "none"}}
        >
          <IconWrapper>
            <DocumentIcon sx={{fontSize: 48, color: "#1976d2"}} />
            <Typography variant="caption" sx={{fontWeight: "bold"}}>
              DOC
            </Typography>
          </IconWrapper>
        </FilePreviewBox>
      );

    case "spreadsheet":
      return (
        <FilePreviewBox
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{textDecoration: "none"}}
        >
          <IconWrapper>
            <SpreadsheetIcon sx={{fontSize: 48, color: "#388e3c"}} />
            <Typography variant="caption" sx={{fontWeight: "bold"}}>
              SHEET
            </Typography>
          </IconWrapper>
        </FilePreviewBox>
      );

    case "presentation":
      return (
        <FilePreviewBox
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{textDecoration: "none"}}
        >
          <IconWrapper>
            <PresentationIcon sx={{fontSize: 48, color: "#f57c00"}} />
            <Typography variant="caption" sx={{fontWeight: "bold"}}>
              PPT
            </Typography>
          </IconWrapper>
        </FilePreviewBox>
      );

    case "archive":
      return (
        <FilePreviewBox
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{textDecoration: "none"}}
        >
          <IconWrapper>
            <ArchiveIcon sx={{fontSize: 48, color: "#7b1fa2"}} />
            <Typography variant="caption" sx={{fontWeight: "bold"}}>
              ZIP
            </Typography>
          </IconWrapper>
        </FilePreviewBox>
      );

    default:
      return (
        <FilePreviewBox
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{textDecoration: "none"}}
        >
          <IconWrapper>
            <ErrorIcon sx={{fontSize: 48, color: "#999"}} />
            <Typography variant="caption" sx={{fontWeight: "bold"}}>
              FILE
            </Typography>
          </IconWrapper>
        </FilePreviewBox>
      );
  }
};

export default RenderAttachments;
