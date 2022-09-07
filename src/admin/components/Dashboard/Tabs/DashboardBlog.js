import {
  Button,
  FormLabel,
  IconButton,
  Input,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Table, Tag } from "antd";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useEffect, useState } from "react";
// import db from "../../../../db.config";
import config from "../../../../db.config";
import { Tags } from "../../../../utils/tags";

const DashboardBlog = () => {
  // For Detail Page
  const [showDetailArticle, setShowDetailArticle] = useState(false); // show detail

  const [searchValue, setSearchValue] = useState("");

  const columns = [
    {
      title: "ID Blog",
      align: 'center',
      dataIndex: ["_id"],
      ellipsis: true,
    },
    {
      title: "Tiêu Đề",
      align: 'center',
      dataIndex: ["shortDes"],
    },
    {
      title: "Tác Giả",
      align: 'center',
      dataIndex: ["author"],
    },
    {
      title: "Phân Trang",
      align: 'center',
      dataIndex: ["categorize"],
      ellipsis: true,
    },
    {
      title: "Tags",
      align: 'center',
      dataIndex: ["tags"],
      render(value) {
        return(
          <div>
            {value.map((item, i) => (
              <Tag key={i} color={Tags[item]}>{item}</Tag>
            ))}
          </div>
        )
      },
    },
    {
      title: "Action",
      align: 'center',
      dataIndex: ["_id"],
      ellipsis: true,
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    setLoading(true)
    axios
      .get(`${config.API_URL}/api/article`, { params: { categorize: "Blog" } })
      .then((res) => {
        setData(res.data)
        setLoading(false)
      });
  };

  return (
    <TableContainer component={Paper}>
      {/* <Table sx={{ minWidth: 650, margin: 0 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "#6B6DFF",
              "th": {
                color: "#fff",
              },
            }}
          >
            <TableRow>
              <TableCell align="center">ID Blog</TableCell>
              <TableCell align="center">Tiêu đề</TableCell>
              <TableCell align="center">Phân trang</TableCell>
              <TableCell align="center">Tuỳ chọn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 && data ? (
              data
                .filter((value) => {
                  if (searchValue === "") {
                    return value;
                  } else if (
                    value.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((row, index) => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.categorize}</TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableCell colSpan={4} align="center">
                Hiện không có bài viết nào!
              </TableCell>
            )}
          </TableBody>
        </Table> */}
      <Table dataSource={data} loading={loading} columns={columns}></Table>
    </TableContainer>
  );
};

export default DashboardBlog;
