import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import createNotification from "../components/elements/Nofication";
import Logo from "../components/layout/partials/Logo";
import config from "../db.config";
// import createNotification from "../components/elements/Nofication";
const SchemaLogin = Yup.object().shape({
  username: Yup.string().required("Vui lòng điền trường này"),
  password: Yup.string().required("Vui lòng điền trường này"),
});
const Login = () => {
  const [data, setData] = useState([]);
  const [detailData, setDetailData] = useState({});
  const getData = () => {
    axios.get(`${config.API_URL}/api/admin`).then((res) => {
      setData(res.data);
    });
  };
  const getDetailData = async (token) => {
    const response = await axios.get(
      `${config.API_URL}/api/admin/?token=${token}`
    );
    return response;
  };
  const checkLogin = (token) => {
    if (token) {
      const response = getDetailData(token);
      response.then((res) => {
        console.log(res.data);
        axios.patch(`${config.API_URL}/api/admin/${res?.data[0]._id}`, {
          deviceLogin: res?.data[0].deviceLogin + 1,
        });
      });
    }
  };

  let history = useHistory();

  const [show, setShow] = useState(false);
  //   const [password, setPassword] = useState('');

  const passwordCom = ({ field }) => {
    return (
      <Stack
        position="relative"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <input
          type={show ? "text" : "password"}
          name="password"
          placeholder=" "
          {...field}
        />
        <Box
          position="absolute"
          right={0}
          top={5}
          sx={{ zIndex: 10, cursor: "pointer", padding: "0 10px" }}
          onClick={() => setShow(!show)}
        >
          {show ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </Box>
      </Stack>
    );
  };

  return (
    <div className="login-section">
      <div className="login-section-container">
        <div className="login-header">
          <Logo />
          <h1>Login Admin</h1>
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={SchemaLogin}
          onSubmit={(values) => {
            axios.get(`${config.API_URL}/api/admin`).then((res) => {
              if (
                res.data.find(
                  (item) =>
                    item.msv === values.username &&
                    item.password === values.password
                ) ||
                (values.username === "admin" && values.password === "admin")
              ) {
                const tokenLogin =
                  res.data.find(
                    (item) =>
                      item.msv === values.username &&
                      item.password === values.password
                  ) || null;
                console.log(tokenLogin);
                createNotification("success", {
                  message: "Đăng Nhập Thành Công",
                  duration: 2,
                });

                if (tokenLogin?.token !== null) {
                  localStorage.setItem("token", tokenLogin?.token);
                  localStorage.setItem("account", JSON.stringify(tokenLogin))
                  checkLogin(tokenLogin?.token);
                }
                history.push("/");
              } else {
                createNotification("error", {
                  message: "Lỗi Đăng Nhập",
                  duration: 2,
                });
              }
            });
          }}
        >
          {({ errors, touched }) => (
            <Form className="form-login">
              <div className="form-login-input">
                <label htmlFor="username" className="title">
                  Username
                </label>
                <Field name="username" placeholder=" " />
                {errors.username && touched.username ? (
                  <div className="errorMessage">{errors.username}</div>
                ) : (
                  <div className="errorMessage"></div>
                )}
              </div>
              <div className="form-login-input">
                <label htmlFor="password" className="title">
                  Password
                </label>
                <Field name="password" component={passwordCom} />
                {errors.password && touched.password ? (
                  <div className="errorMessage">{errors.password}</div>
                ) : (
                  <div className="errorMessage"></div>
                )}
              </div>
              <div>
                <button type="submit" className="login-btn">
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
