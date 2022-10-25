import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Input, Radio, Select } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import createNotification from "../components/elements/Nofication";
import { Role } from "../constant";
import dbConfig from "../db.config";
import handleUploadImage from "../utils/uploadImage";

const Profile = () => {
  const [account] = useState(JSON.parse(localStorage.getItem("account")));
  const [url, setUrl] = useState(
    JSON.parse(localStorage.getItem("account")).image ?? ""
  );

  const SchemaProfile = Yup.object().shape({
    username: Yup.string().required("Tài khoản không được để trống!"),
    password: Yup.string().required("Mật khẩu không được để trống!"),
    msv: Yup.string().required("Mã Sinh Viên Không được để trống!"),
    name: Yup.string().required("Họ và tên không được để trống!"),
  });

  const onSubmit = (values) => {
    axios
      .patch(`${dbConfig.API_URL}/api/admin/${values._id}`, {
        ...values,
        image: url,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("account", JSON.stringify(values));
          createNotification("success", {
            message: "Update successfully!",
          });
        } else {
          createNotification("error", {
            message: "Update failure!",
          });
        }
      })
      .catch((err) => {
        createNotification("error", {
          message: err,
        });
      })
      .finally(() => {
        formik.setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: account,
    validationSchema: SchemaProfile,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const isDisabled = useMemo(() => {
    return Boolean(Object.keys(formik.errors).length || formik.isSubmitting);
  }, [formik.errors, formik.isSubmitting]);

  return (
    <Stack sx={{ color: "#000", padding: "10px 20px" }}>
      <Stack
        sx={{
          padding: "10px 30px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <Stack>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              padding: "20px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            Account Setting
          </Typography>
        </Stack>
        <Stack>
          <Stack
            width="20%"
            height={200}
            position="relative"
            sx={{
              backgroundImage: url
                ? `url("${url}")`
                : 'url("/img/blank_image.jpg")',
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              ":hover": {
                ".overlay-img": {
                  opacity: 1,
                },
              },
            }}
          >
            <Stack
              className="overlay-img"
              position="absolute"
              direction="column"
              justifyContent={"center"}
              alignItems="center"
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                inset: 0,
                opacity: 0,
                transition: "all .3s",
              }}
              component="label"
            >
              <CameraOutlined
                style={{ fontSize: "28px", color: "#fff", cursor: "pointer" }}
              />
              {/* <Box
                component="img"
                src={formik.values["image"].preview}
                zIndex={999}
                width="100%"
              /> */}
              <Box
                component="input"
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                hidden
                width={100}
                height={300}
                onChange={(e) => {
                  formik.setFieldValue("image", e.target.files[0]);
                  handleUploadImage(e.target.files[0], setUrl);
                }}
              />
            </Stack>
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <Stack
              direction="row"
              flexWrap={"wrap"}
              justifyContent="space-between"
              sx={{ padding: "20px 0" }}
              rowGap={4}
            >
              <Stack width="45%">
                <Typography
                  component={"label"}
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: "10px",
                  }}
                >
                  Mã Sinh Viên
                </Typography>
                <Input
                  name="msv"
                  value={formik.values["msv"]}
                  onChange={formik.handleChange}
                />
              </Stack>
              <Stack width="45%">
                <Typography
                  component={"label"}
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: "10px",
                  }}
                >
                  Họ Tên
                </Typography>
                <Input
                  name="name"
                  value={formik.values["name"]}
                  onChange={formik.handleChange}
                />
              </Stack>
              <Stack width="45%">
                <Typography
                  component={"label"}
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: "10px",
                  }}
                >
                  Username
                </Typography>
                <Input
                  name="username"
                  value={formik.values["username"]}
                  onChange={formik.handleChange}
                />
              </Stack>
              <Stack width="45%">
                <Typography
                  component={"label"}
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: "10px",
                  }}
                >
                  Password
                </Typography>
                <Input
                  name="password"
                  value={formik.values["password"]}
                  type="password"
                  onChange={formik.handleChange}
                />
              </Stack>
              <Stack width="45%">
                <Typography
                  component={"label"}
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: "10px",
                  }}
                >
                  Chức Vụ
                </Typography>
                <Select
                  defaultValue={formik.values["role"]}
                  // onChange={formik.handleChange}
                  disabled
                >
                  {Role.map((item, i) => (
                    <Select.Option key={i} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Stack>
              <Stack width="60%" direction={"row"} alignItems="center" gap={5}>
                <Stack width="50%">
                  <Typography
                    component={"label"}
                    sx={{
                      fontSize: 16,
                      fontWeight: 500,
                      marginBottom: "10px",
                    }}
                  >
                    Token
                  </Typography>
                  <Input
                    value={formik.values["token"]}
                    width="fit-content"
                    disabled
                  />
                </Stack>
                <Stack>
                  <Typography
                    component={"label"}
                    sx={{
                      fontSize: 16,
                      fontWeight: 500,
                      marginBottom: "10px",
                    }}
                  >
                    Giới Tính
                  </Typography>
                  <Radio.Group
                    name="gender"
                    value={formik.values["gender"]}
                    onChange={formik.handleChange}
                  >
                    <Radio value={0}>Nam</Radio>
                    <Radio value={1}>Nữ</Radio>
                  </Radio.Group>
                </Stack>
              </Stack>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isDisabled}
                fontSize={16}
              >
                {formik.isSubmitting && <LoadingOutlined />}
                <Typography
                  component="span"
                  sx={{
                    color: "#fff",
                    fontSize: "14px",
                    padding: "0 10px",
                  }}
                >
                  Update
                </Typography>
              </Button>
            </Stack>
          </form>
        </Stack>

        {/* <Button variant="outline" color="error">
              Cancel
            </Button> */}
      </Stack>
    </Stack>
  );
};

export default Profile;
