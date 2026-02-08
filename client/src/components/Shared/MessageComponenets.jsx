import {memo} from "react";
import {Paper, Typography, Stack, Box, Avatar, Chip} from "@mui/material";
import {fileFormat} from "../../lib/featurs";
import RenderAttachments from "./RenderAttachments";
import {MdOutlineFileDownload as MdOutlineFileDownloadIcon} from "react-icons/md";
import {IoCheckmarkDone} from "react-icons/io5";

const MessageComponents = ({message, user}) => {
  const {sender, attachments, content, createdAt} = message;
  const sameSender = sender?._id === user?._id;
  const formattedTime = new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Stack
      direction="row"
      justifyContent={sameSender ? "flex-end" : "flex-start"}
      sx={{mb: 2, px: {xs: 1, sm: 2}}}
    >
      {!sameSender && (
        <Avatar
          sx={{
            width: 36,
            height: 36,
            mr: 1.5,
            bgcolor: "primary.main",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          {sender?.name?.charAt(0).toUpperCase()}
        </Avatar>
      )}

      <Stack
        spacing={0.5}
        sx={{
          maxWidth: {xs: "85%", sm: "75%", md: "65%"},
          alignItems: sameSender ? "flex-end" : "flex-start",
        }}
      >
        {!sameSender && (
          <Typography
            variant="caption"
            sx={{
              px: 1,
              color: "text.secondary",
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          >
            {sender?.name}
          </Typography>
        )}
        <Paper
          elevation={0}
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: sameSender
              ? "18px 18px 4px 18px"
              : "18px 18px 18px 4px",
            bgcolor: sameSender
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
              : "#f1f3f5",
            color: "text.primary",
            position: "relative",
            boxShadow: sameSender
              ? "0 2px 8px rgba(102, 126, 234, 0.3)"
              : "0 2px 8px rgba(0, 0, 0, 0.08)",
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: sameSender
                ? "0 4px 12px rgba(102, 126, 234, 0.4)"
                : "0 4px 12px rgba(0, 0, 0, 0.12)",
            },
          }}
        >
          {content && (
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.5,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontSize: "0.9375rem",
              }}
            >
              {content}
            </Typography>
          )}

          {Array.isArray(attachments) && attachments.length > 0 && (
            <Stack spacing={1.5} mt={content ? 1.5 : 0}>
              <Attachments attachment={attachments} sameSender={sameSender} />
            </Stack>
          )}

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            justifyContent="flex-end"
            sx={{mt: 0.5}}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.6875rem",
                opacity: sameSender ? 0.85 : 0.65,
                color: sameSender ? "inherit" : "text.secondary",
              }}
            >
              {formattedTime}
            </Typography>
            {sameSender && (
              <IoCheckmarkDone
                size={14}
                style={{opacity: 0.85, marginLeft: 2}}
              />
            )}
          </Stack>
        </Paper>
      </Stack>

      {sameSender && (
        <Avatar
          sx={{
            width: 36,
            height: 36,
            ml: 1.5,
            bgcolor: "primary.dark",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          {sender?.name?.charAt(0).toUpperCase()}
        </Avatar>
      )}
    </Stack>
  );
};

const Attachments = memo(({attachment, sameSender}) => {
  const handleDownload = (url, fileName) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "download";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {attachment.map((file, idx) => {
        const url = file.url;
        const fileType = fileFormat(url);
        const fileName = url.split("/").pop() || "file";

        return (
          <Box
            key={idx}
            sx={{
              position: "relative",
              display: "inline-block",
              borderRadius: "12px",
              overflow: "hidden",
              bgcolor: sameSender
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.04)",
              border: "1px solid",
              borderColor: sameSender
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.08)",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
              },
              "&:hover .download-overlay": {
                opacity: 1,
              },
            }}
          >
            <Box
              component="a"
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{textDecoration: "none", display: "block"}}
            >
              <RenderAttachments file={fileType} url={url} />
            </Box>

            {/* Download overlay */}
            <Box
              className="download-overlay"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDownload(url, fileName);
              }}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(0, 0, 0, 0.6)",
                opacity: 0,
                transition: "opacity 0.2s ease",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            >
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "50%",
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <MdOutlineFileDownloadIcon size={24} color="#1976d2" />
              </Box>
            </Box>

            {/* File name chip */}
            <Chip
              label={
                fileName.length > 20 ? fileName.slice(0, 20) + "..." : fileName
              }
              size="small"
              sx={{
                position: "absolute",
                bottom: 8,
                left: 8,
                bgcolor: sameSender
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(0, 0, 0, 0.75)",
                color: sameSender ? "primary.main" : "white",
                fontSize: "0.75rem",
                height: 24,
                maxWidth: "calc(100% - 16px)",
                "& .MuiChip-label": {
                  px: 1,
                },
              }}
            />
          </Box>
        );
      })}
    </>
  );
});

export default memo(MessageComponents);
