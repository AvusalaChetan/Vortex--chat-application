import {useEffect, useMemo, useState} from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/Shared/Table";
import {Avatar, Stack} from "@mui/material";
import {sampleDashboardData} from "../../constants/sampleData";
import {transformImage} from "../../lib/featurs";
import Profile from "../../components/Shared/Profile";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    headerClassName: "table-header",
  },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 150,
    headerClassName: "table-header",
    renderCell: (params) => {
      return <Profile avatar={params.row.avatar} max={100} />;
    },
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => {
      return <Profile avatar={params.row.members} groupChat={true} max={3} />;
    },
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "creator",
    headerName: "Created by",
    headerClassName: "table-header",
    width: 200,
    // renderCell:(params) => console.log("creator params:", params.row.creator)
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={params.row.creator.avatar} alt={params.row.creator.name} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  const row = useMemo(
    () =>
      sampleDashboardData.chats.map((i) => ({
        ...i,
        id: i._id,
        avatar: i.avatar.map((img) => transformImage(img, 50)),
        members: i.members.map((member) => transformImage(member.avatar, 50)),
        creator:{
          name: i.creator.name,
          avatar:transformImage(i.creator.avatar,50)
        }
      })),
    []
  );

  useEffect(() => {
    setRows(row);
  }, [row]);

  return (
    <AdminLayout>
      <Table heading={"All chats"} columns={columns} row={rows} />
    </AdminLayout>
  );
};

export default ChatManagement;
