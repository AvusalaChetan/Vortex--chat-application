import {useEffect, useMemo, useState} from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/Shared/Table";
import {Avatar} from "@mui/material";
import {sampleDashboardData} from "../../constants/sampleData";
import {transformImage} from "../../lib/featurs";

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
    renderCell: (params) => <Avatar src={params.row.avatar} alt={params.row.name} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];
const UserManagement = () => {
  const [rows, setRows] = useState([]);

   const row = useMemo(() =>sampleDashboardData.users.map((i) => ({
      ...i,
      id: i._id,
      avatar: transformImage(i.avatar),
    })), []);

    
  useEffect(() => {
    setRows(row);
  }, [row]);
  console.log("rows:", rows);

  return (
    <AdminLayout>
      <Table heading={"All Users"} columns={columns} row={rows} />
    </AdminLayout>
  );
};

export default UserManagement;
