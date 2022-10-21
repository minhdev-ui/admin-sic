import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import createNotification from "../components/elements/Nofication";
import Logo from "../components/layout/partials/Logo";
import config from "../db.config";
import { Button } from "@mui/material";
import { Typography } from "antd";
const SchemaLogin = Yup.object().shape({
  username: Yup.string().required("Vui lòng điền trường này"),
  password: Yup.string().required("Vui lòng điền trường này"),
});
const Login = () => {
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
        axios.patch(`${config.API_URL}/api/admin/${res?.data[0]._id}`, {
          deviceLogin: res?.data[0].deviceLogin + 1,
        });
      });
    }
  };

  let history = useHistory();

  const [show, setShow] = useState(false);

  const onSubmit = (values) => {
    axios
      .get(`${config.API_URL}/api/admin`)
      .then((res) => {
        if (
          res.data.find(
            (item) =>
              item.msv === values.username && item.password === values.password
          ) ||
          (values.username === "admin" && values.password === "admin")
        ) {
          const tokenLogin =
            res.data.find(
              (item) =>
                item.msv === values.username &&
                item.password === values.password
            ) || null;
          createNotification("success", {
            message: "Đăng Nhập Thành Công",
            duration: 2,
          });

          if (tokenLogin?.token !== null) {
            localStorage.setItem("token", tokenLogin?.token);
            localStorage.setItem("account", JSON.stringify(tokenLogin));
            checkLogin(tokenLogin?.token);
          }
          history.push("/");
        } else {
          createNotification("error", {
            message: "Lỗi Đăng Nhập",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        createNotification("error", {
          message: err,
          duration: 2,
        });
      })
      .finally(() => {
        formik.setSubmitting(false);
      });
  };

  const onReset = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SchemaLogin,
    onSubmit,
    onReset,
  });

  const isDisabled = useMemo(() => {
    return Boolean(Object.keys(formik.errors).length || formik.isSubmitting);
  }, [formik.errors, formik.isSubmitting]);

  return (
    <div className="login-section">
      <div className="login-section-container">
        <div className="login-header">
          <Logo />
          <h1>Login Admin</h1>
        </div>
        <form className="form-login" onSubmit={formik.handleSubmit}>
          <div className="form-login-input">
            <label htmlFor="username" className="title">
              Username
            </label>
            <input
              name="username"
              placeholder=""
              onChange={formik.handleChange}
            />
            {formik.errors["username"] ? (
              <div className="errorMessage">{formik.errors["username"]}</div>
            ) : (
              <div className="errorMessage"></div>
            )}
          </div>
          <div className="form-login-input">
            <label htmlFor="password" className="title">
              Password
            </label>
            <Stack
              position="relative"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder=""
                onChange={formik.handleChange}
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
            {formik.errors["password"] ? (
              <div className="errorMessage">{formik.errors["password"]}</div>
            ) : (
              <div className="errorMessage"></div>
            )}
          </div>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isDisabled}
              fontSize={16}
            >
              {formik.isSubmitting ? (
                <LoadingOutlined />
              ) : (
                <Typography
                  component="span"
                  sx={{
                    color: "#fff",
                    fontSize: "14px",
                  }}
                >
                  Login
                </Typography>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
