import { Table, Tag, Modal } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import config from "../../../db.config";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Stack } from "@mui/material";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    handleGetData();
  }, []);
  const handleGetData = () => {
    axios.get(`${config.API_URL}/api/contact`).then((res) => {
      setLoading(false);
      setData(res.data);
    });
  };
  const handleReaded = (id) => {
    axios
      .patch(`${config.API_URL}/api/contact/${id}`, { readed: true })
      .then(() => handleGetData());
  };
  const handleDelete = (id) => {
    axios
      .get(`${config.API_URL}/api/contact/delete/${id}`)
      .then(() => handleGetData());
  };
  const handleGetDetail = (id) => {
    axios
      .get(`${config.API_URL}/api/contact/${id}`)
      .then((res) => res.status === 200 && setDetail(res.data));
  };

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false)
  }
  return (
    <>
      <Table
        dataSource={data}
        loading={loading}
        columns={[
          {
            title: "Họ Tên",
            dataIndex: ["name"],
          },
          {
            title: "Email",
            dataIndex: ["email"],
          },
          {
            title: "Lời Nhắn",
            dataIndex: ["message"],
          },
          {
            title: "Status",
            dataIndex: ["readed"],
            render(value) {
              return value ? (
                <Tag color={"green"}>{"Đã Đọc"}</Tag>
              ) : (
                <Tag color={"volcano"}>{"Chưa Đọc"}</Tag>
              );
            },
          },
          {
            title: "Action",
            dataIndex: ["_id"],
            render(value) {
              return (
                <Stack direction="row" gap="10px">
                  <EyeOutlined
                    style={{ color: "blue" }}
                    onClick={() => {
                      handleOpenModal()
                      handleGetDetail(value)
                      handleReaded(value);
                    }}
                  />
                  <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={() => handleDelete(value)}
                  />
                </Stack>
              );
            },
          },
        ]}
      />
      {open ? (
        <Modal visible={open} title={'Lời Nhắn'} onOk={handleCloseModal} onCancel={handleCloseModal}>
          <p>{detail?.message}</p>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default Contact;
