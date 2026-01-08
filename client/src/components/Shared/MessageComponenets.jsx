import {memo, useState} from "react";
import {Paper, Typography, Stack, Box} from "@mui/material";
import {fileFormat} from "../../lib/featurs";
import RenderAttachments from "./RenderAttachments";
import {MdOutlineFileDownload as MdOutlineFileDownloadIcon} from "react-icons/md";

const MessageComponenets = ({message, user}) => {
  const {sender, attachments, content, createdAt} = message;
  const sameSender = sender?._id === user?._id;
  return (
    <Paper
      key={message._id}
      elevation={6}
      sx={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        px: 2,
        py: 1.5,
        borderRadius: 2,
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        transform: "translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
        },
        maxWidth: {xs: "100%", sm: "80%", md: "70%"},
      }}
    >
      <Typography
        variant="body1"
        color="primary.main"
        fontWeight="bold"
        sx={{
          alignContent: "flex-start",
        }}
      >
        {sender.name}
      </Typography>
      <Typography variant="body1" color="text.primary">
        {content}
      </Typography>
      <br />
      {Array.isArray(message.attachments) && message.attachments.length > 0 && (
        <Stack direction="column" spacing={2} mt={2}>
          <AttachMents attachment={message.attachments} />
        </Stack>
      )}
      <br />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: "right",
        }}
      >
        {new Date(createdAt).toLocaleString()}
      </Typography>
    </Paper>
  );
};

const AttachMents = memo(({attachment}) => {
  const handleDownload = (url, fileName) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {attachment.map((file, idx) => {
        const url = file.url;
        const fileType = fileFormat(url);
        const fileName = url.split("/").pop();

        return (
          <Box
            key={idx}
            sx={{
              position: "relative",
              display: "inline-block",
              "&:hover .download-icon": {
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
            <Box
              className="download-icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDownload(url, fileName);
              }}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "50%",
                padding: "6px",
                cursor: "pointer",
                opacity: 0,
                transition: "opacity 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
              }}
            >
              <MdOutlineFileDownloadIcon size={20} color="white" />
            </Box>
          </Box>
        );
      })}
    </>
  );
});
export default memo(MessageComponenets);
