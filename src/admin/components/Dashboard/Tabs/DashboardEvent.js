import {
  Paper, TableContainer
} from "@mui/material";
import { Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
// import db from "../../../../db.config";
import { AiFillDelete } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { BsFillPenFill } from "react-icons/bs";
import createNotification from "../../../../components/elements/Nofication";
import config from "../../../../db.config";
import DetailArticle from "../../Blog/DetailArticle";

const DashboardEvent = () => {
  // For Detail Page
  const columns = [
    {
      title: "ID Blog",
      align: "center",
      dataIndex: ["_id"],
      ellipsis: true,
    },
    {
      title: "Tiêu Đề",
      align: "center",
      dataIndex: ["shortDes"],
      ellipsis: true,
    },
    {
      title: "Tác Giả",
      align: "center",
      dataIndex: ["author"],
    },
    {
      title: "Phân Trang",
      align: "center",
      dataIndex: ["categorize"],
      ellipsis: true,
    },
    {
      title: "Tags",
      align: "center",
      dataIndex: ["tags"],
      render(value) {
        return (
          <div>
            {value.map((item, i) => (
              <Tag key={i} color={"blue"}>
                {item}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "Action",
      align: "center",
      dataIndex: ["_id"],
      render(value) {
        return (
          <div className="article_admin_list_option">
            <AiFillDelete
              className="article_admin_option delete"
              onClick={() => {
                handleDeleteArticle(value);
              }}
            ></AiFillDelete>
            <BiDetail
              className="article_admin_option"
              onClick={() => {
                setShowDetail(!showDetail);
                handleGetDetailData(value);
              }}
            ></BiDetail>
            <BsFillPenFill
              className="article_admin_option"
              // onClick={() =>
            ></BsFillPenFill>
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  useEffect(() => {
    handleGetData();
  }, []);

  const handleDeleteArticle = (_id) => {
    axios
      .get(`${config.API_URL}/api/article/delete/${_id}`)
      .then((res) =>
        res.status === 200
          ? createNotification("success", { message: "Xóa Thành Công" })
          : createNotification("error", { message: "Lỗi" })
      )
      .catch((err) => console.log(err));
    handleGetData();
  };

  const handleGetData = () => {
    setLoading(true);
    axios
      .get(`${config.API_URL}/api/article`, { params: { categorize: "Event" } })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  };

  const handleGetDetailData = (_id) => {
    axios.get(`${config.API_URL}/api/article/${_id}`).then((res) => {
      if (res.status === 200) {
        setDetail(res.data);
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table
        dataSource={data}
        loading={loading}
        columns={columns}
        pagination={{ pageSize: 5 }}
      ></Table>
      {showDetail && <DetailArticle post={detail} />}
    </TableContainer>
  );
};

export default DashboardEvent;
