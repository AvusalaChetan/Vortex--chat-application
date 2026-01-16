import {useEffect, useMemo, useState} from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {Avatar, Stack, Box} from "@mui/material";
import Table from "../../components/Shared/Table";
import {sampleDashboardData} from "../../constants/sampleData";
import {fileFormat, transformImage} from "../../lib/featurs";
import moment from "moment";

import RenderAttachments from "../../components/Shared/RenderAttachments";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    headerClassName: "table-header",
  },
  {
    field: "attachments",
    headerName: "Attachments",
    width: 250,
    headerClassName: "table-header",
    renderCell: (params) => {
      const {attachments} = params.row;
      return attachments?.length > 0 ? (
        <Stack direction="row" gap={1} flexWrap="wrap">
          {attachments.map((i, idx) => {
            const url = i.url;
            const file = fileFormat(url);

            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  overflow: "hidden",
                  marginY: "5px",
                  borderRadius: "8px",
                }}
              >
                <a
                  href={url}
                  download={true}
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RenderAttachments file={file} url={url} />
                </a>
              </Box>
            );
          })}
        </Stack>
      ) : (
        "No Attachments"
      );
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    width: 200,
    headerClassName: "table-header",
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar alt={params.value.name} src={params.value.avatar} />
        <span> {params.value.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupsChat",
    headerName: "Groups Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageMagnagement = () => {
  const [rows, setRows] = useState([]);

  const row = useMemo(
    () =>
      sampleDashboardData.message.map((m) => ({
        ...m,
        id: m._id,
        attachments:
          m.attachments && m.attachments.length > 0
            ? m.attachments.map((att) => ({
                ...att,
                url: transformImage(att.url),
              }))
            : [],
        content: m.content || "",
        sender: {
          name: m.sender.name,
          avatar: m.sender.avatar
            ? transformImage(m.sender.avatar)
            : m.sender.name.charAt(0).toUpperCase(),
        },
        chat: m.chat,
        createdAt: moment(m.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      })),
    []
  );

  useEffect(() => {
    setRows(row);
  }, [row]);

  return (
    <AdminLayout>
      <Table
        heading={"All Messages"}
        columns={columns}
        row={rows}
        rowHeight={170}
      />
    </AdminLayout>
  );
};
export default MessageMagnagement;
