import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Logo from "../components/layout/partials/Logo";
import Store from "../admin/store";
import createNotification from "../components/elements/Nofication";
import axios from "axios";
import config from "../db.config";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
// import createNotification from "../components/elements/Nofication";
const SchemaLogin = Yup.object().shape({
  username: Yup.string().required("Vui lòng điền trường này"),
  password: Yup.string().required("Vui lòng điền trường này"),
});
const Login = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    axios.get(`${config.API_URL}/api/admin`).then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  let history = useHistory();

  const [show, setShow] = useState(false)
//   const [password, setPassword] = useState('');

  const passwordCom = ({ field }) => {
    return (
        <Stack position='relative' direction='row' alignItems='center' justifyContent='space-between'>
            <input type={show ? 'text' : 'password'} name='password' placeholder=" " {...field} />
            <Box position='absolute' right={0} top={5} sx={{zIndex: 10, cursor: 'pointer', padding: '0 10px'}} onClick={() => setShow(!show)}>
                {show ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </Box>
        </Stack>
    )
  }

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
            if (
              data.find(
                (item) =>
                  item.msv === values.username &&
                  item.password === values.password
              )
            ) {
              const tokenLogin = data.find(
                (item) =>
                  item.msv === values.username &&
                  item.password === values.password
              );
              console.log(tokenLogin)
              createNotification("success", {
                message: "Đăng Nhập Thành Công",
                duration: 2,
              });
              localStorage.setItem("token", tokenLogin.token);
              history.push("/");
            } else {
              createNotification("error", {
                message: "Lỗi Đăng Nhập",
                duration: 2,
              });
            }
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
                <Field name="password" component={passwordCom}/>
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
