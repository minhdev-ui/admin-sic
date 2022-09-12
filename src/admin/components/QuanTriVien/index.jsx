import {
  Button,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
// import CommingSoon from "../../../components/CommingSoon"
// import db from "../../../db.config";
import * as Yup from "yup";
import Loading from "../../../utils/Loading";
import config from "../../../db.config";
import createNotification from "../../../components/elements/Nofication";
import generateUUID from "../../store/uuid";
import { Table, Tag } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Upload,
} from "antd";
import { Error } from "mongoose";
const QTV = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(generateUUID());
  useEffect(() => {
    getData();
  }, []);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const getData = () => {
    axios.get(`${config.API_URL}/api/admin`).then((res) => {
      setData(res.data);
    });
  };
  const checkToken = () => {
    const Token = data.find((item) => item.token === token);
    Token ? setToken(generateUUID()) : setToken(token);
    return token;
  };
  const checkMsv = (msv) => {
    const check = data.find((item) => item.msv === msv);
    return check === undefined ? false : true;
  };
  const handleSubmit = async (obj) => {
    if (checkMsv(msv)) {
      createNotification("error", { message: "Msv này hiện đã là admin" });
    } else {
      axios
        .post(`${config.API_URL}/api/admin/add`, {
          ...obj,
          online: false,
          token: checkToken(),
        })
        .then((res) =>
          res.status === 200
            ? createNotification("success", { message: "Đã Thêm Thành Công" })
            : createNotification("error", { message: "Lỗi" })
        )
        .catch((err) => console.log(Error));
    }
    handleCloseModal();
    getData();
  };
  const [msv, setMsv] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState(0);
  const [classs, setClasss] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Button
        variant="contained"
        sx={{
          marginBottom: "15px",
        }}
        onClick={handleOpenModal}
      >
        New <AiFillPlusCircle />
      </Button>
      <Modal
        visible={openModal}
        title={`Thông Tin Của Admin`}
        okText="Create"
        onCancel={handleCloseModal}
        destroyOnClose
        closable={false}
        maskClosable={false}
        onOk={() =>
          handleSubmit({
            msv: msv,
            name: name,
            username: username,
            password: password,
            gender: gender,
            role: "Admin",
          })
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // onValuesChange={onFormLayoutChange}
          // disabled={componentDisabled}
        >
          {/* <Form.Item label="Ảnh" valuePropName="fileList">
                  <input
                    type="file"
                    className="input file"
                    onChange={(e) => {
                      handlePreviewImage(e);
                      handleUploadImage(e.target.files[0], setImg);
                    }}
                  />
                  {imagePreview && (
                    <div className="article_image_preview">
                      <img src={imagePreview.preview} alt="" width="300px" />
                    </div>
                  )}
                </Form.Item> */}
          <Form.Item label="Mã SV">
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <Input value={msv} onChange={(e) => setMsv(e.target.value)} />{" "}
            </div>
          </Form.Item>
          <Form.Item label="Họ Tên">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Tài Khoản">
            <Input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Mật Khẩu">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Giới Tính">
            <Radio.Group
              onChange={(e) => setGender(e.target.value)}
              name="radiogroup"
              value={gender}
            >
              <Radio value={0}> Nam </Radio>
              <Radio value={1}> Nữ </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Lớp">
            <Input
              maxLength={10}
              width={100}
              value={classs}
              onChange={(e) => setClasss(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      {data ? (
        <TableQTV />
      ) : (
        <Box
          height="70vh"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Loading />
        </Box>
      )}
    </>
  );
};

const TableQTV = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let adminDetailOnline;
  useEffect(() => {
    getData();
  }, []);
  const swapStatus = (value) => {
    handAdminDetail(value).then(() => {
      axios
        .patch(`${config.API_URL}/api/admin/${value}`, {
          online: !adminDetailOnline,
        })
        .then(() => getData());
    });
  };
  const handAdminDetail = async (value) => {
    await axios.get(`${config.API_URL}/api/admin/${value}`).then((res) => {
      adminDetailOnline = res.data.online;
    });
  };
  const getData = () => {
    setLoading(true);
    axios.get(`${config.API_URL}/api/admin`).then((res) => {
      setLoading(false);
      setData(res.data);
    });
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "65vh", position: "relative" }}
    >
      <Table
        loading={loading}
        dataSource={data}
        pagination={false}
        columns={[
          {
            title: "MSV",
            dataIndex: ["msv"],
          },
          {
            title: "Họ Tên",
            dataIndex: ["name"],
          },
          {
            title: "UserName",
            dataIndex: ["username"],
          },
          {
            title: "Password",
            dataIndex: ["password"],
          },
          {
            title: "Chức Vụ",
            dataIndex: ["role"],
          },
          {
            title: "Trạng Thái",
            dataIndex: ["online"],
            render(value) {
              return value ? (
                <Tag color="green">Online</Tag>
              ) : (
                <Tag color="red">Offline</Tag>
              );
            },
          },
          {
            title: "Tùy Chọn",
            dataIndex: ["_id"],
            render(value) {
              return (
                <>
                  <SwapOutlined onClick={() => swapStatus(value)} />
                </>
              );
            },
          },
        ]}
      />
    </TableContainer>
  );
};

export default QTV;
