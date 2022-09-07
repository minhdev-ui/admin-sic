import {
  Button,
  Modal,
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
import { Field, Form, Formik } from "formik";
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
const QTV = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(generateUUID());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const formStyle = {
    width: "40%",
    padding: "45px 25px",
    backgroundColor: "#191A2E",
    borderRadius: "8px",
  };
  const getData = () => {
    setLoading(true);
    axios.get(`${config.API_URL}/api/admin`).then((res) => {
      setLoading(false);
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
    axios.post(`${config.API_URL}/api/admin/add`, {
      ...obj,
      online: false,
      token: checkToken(),
    });
  };
  const refresh = () => {
    getData();
  };
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
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={{
            msv: "",
            name: "",
            username: "",
            password: "",
            role: "",
          }}
          validationSchema={Yup.object({
            msv: Yup.string().required("Vui Lòng Điền Trường Này"),
            name: Yup.string().required("Vui Lòng Điền Trường Này"),
            username: Yup.string().required("Vui Lòng Điền Trường Này"),
            password: Yup.string().required("Vui Lòng Điền Trường Này"),
            role: Yup.string().required("Vui Lòng Điền Trường Này"),
          })}
          onSubmit={(values) => {
            checkMsv()
              ? createNotification("error", { message: "Đã Đăng Ký" })
              : handleSubmit(values)
                  .then(
                    createNotification("success", {
                      message: "Thêm Thành Công",
                    })
                  )
                  .catch((err) => {
                    createNotification("error", { message: "Lỗi" });
                    console.log(err);
                  });
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form style={formStyle}>
                <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                  Create Admin
                </Typography>
                <Stack direction="row" gap="50px">
                  <Stack
                    direction="column"
                    sx={{
                      gap: "20px",
                    }}
                  >
                    <Box>
                      <label>Mã Sinh Viên</label>
                      <Field
                        style={{ padding: "5px 15px" }}
                        type="text"
                        id="msv"
                        placeholder=""
                        name="msv"
                      />
                      {errors.msv && touched.msv ? (
                        <span className="errorMessage">{errors.msv}</span>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box>
                      <label>Họ Tên</label>
                      <Field
                        style={{ padding: "5px 15px" }}
                        type="text"
                        id="name"
                        placeholder=""
                        name="name"
                      />
                      {errors.name && touched.name ? (
                        <span className="errorMessage">{errors.name}</span>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box>
                      <label>UserName</label>
                      <Field
                        style={{ padding: "5px 15px" }}
                        type="text"
                        id="username"
                        placeholder=""
                        name="username"
                      />
                      {errors.username && touched.username ? (
                        <span className="errorMessage">{errors.username}</span>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Stack>
                  <Stack
                    direction="column"
                    sx={{
                      gap: "20px",
                    }}
                  >
                    <Box>
                      <label>Password</label>
                      <Field
                        style={{ padding: "5px 15px" }}
                        type="text"
                        id="password"
                        placeholder=""
                        name="password"
                      />
                      {errors.password && touched.password ? (
                        <span className="errorMessage">{errors.password}</span>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box>
                      <label>Chức Vụ</label>
                      <Field
                        style={{ padding: "5px 15px" }}
                        type="text"
                        id="role"
                        placeholder=""
                        name="role"
                      />
                      {errors.role && touched.role ? (
                        <span className="errorMessage">{errors.role}</span>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Stack>
                </Stack>
                <Stack>
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ marginTop: "20px" }}
                    type="submit"
                  >
                    Create Admin
                  </Button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
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
    getData()
  }, [])
  const swapStatus = (value) => {
    handAdminDetail(value).then(() => {
      axios.patch(`${config.API_URL}/api/admin/${value}`, {
        online: !adminDetailOnline
      }).then(() => getData())
    })
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
