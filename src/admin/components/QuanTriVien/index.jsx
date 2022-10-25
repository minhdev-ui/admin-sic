import { Button, Paper, Stack, TableContainer, Modal } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
// import CommingSoon from "../../../components/CommingSoon"
// import db from "../../../db.config";
import { EyeFilled, SwapOutlined } from "@ant-design/icons";
import { Form, Input, Radio, Modal as ModalCreate, Table, Tag } from "antd";
import { Error } from "mongoose";
import Image from "../../../components/elements/Image";
import createNotification from "../../../components/elements/Nofication";
import config from "../../../db.config";
import Loading from "../../../utils/Loading";
import generateUUID from "../../store/uuid";
import { useHistory } from "react-router-dom";
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
          deviceLogin: 0,
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
      <ModalCreate
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
      </ModalCreate>
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
  const [preview, setPreview] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
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
    <>
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
              title: "Avatar",
              dataIndex: ["image"],
              render: (value) => (
                <Stack
                  position="relative"
                  sx={{
                    maxWidth: 50,
                    maxHeight: 50,
                    borderRadius: "50%",
                    overflow: "hidden",
                    ":hover": {
                      ".overlay-img": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Image
                    src={value ?? "/img/blank_image.jpg"}
                    width={50}
                    height={50}
                    style={{
                      maxWidth: 50,
                      maxHeight: 50,
                    }}
                  />
                  <Stack
                    className="overlay-img"
                    position="absolute"
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      inset: 0,
                      opacity: 0,
                      transition: "all .3s",
                    }}
                    component="label"
                  >
                    <EyeFilled
                      onClick={() => setPreview(value)}
                      style={{
                        fontSize: "16px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    />
                  </Stack>
                </Stack>
              ),
            },
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
              title: "Chức Vụ",
              dataIndex: ["role"],
            },
            {
              title: "Trạng Thái",
              dataIndex: ["deviceLogin"],
              render(value) {
                return value > 0 ? (
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
                  <Stack direction="row" gap={2}>
                    <EyeFilled
                      style={{
                        color: "#1F51FF",
                      }}
                      onClick={() => history.push(`Quan-tri-vien/${value}`)}
                    />
                  </Stack>
                );
              },
            },
          ]}
        />
      </TableContainer>
      {preview && (
        <Modal
          open
          onClose={() => setPreview(undefined)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 1280,
              height: 800,
              objectFit: "contain",
            }}
          >
            <Image
              src={preview}
              style={{
                aspectRatio: "16/9",
              }}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default QTV;
