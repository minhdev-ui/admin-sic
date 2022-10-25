import { Stack, Typography } from "@mui/material";
import { Input, Radio, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Role } from "../../../constant";
import config from "../../../db.config";
import { RollbackOutlined } from "@ant-design/icons";

const DetailUser = () => {
  const route = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    route.id &&
      axios.get(`${config.API_URL}/api/admin/${route.id}`).then((res) => {
        setData(res.data);
      });
  }, [route.id]);
  const history = useHistory();

  return (
    <Stack sx={{ color: "#000", padding: "10px 20px" }}>
      <Stack
        sx={{
          width: "50px",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          cursor: "pointer",
        }}
        onClick={() => history.goBack()}
      >
        <RollbackOutlined />
      </Stack>
      <Stack
        marginTop={4}
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
            Account Detail
          </Typography>
        </Stack>
        <Stack>
          <Stack width={300}>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: 500,
                marginBottom: "10px",
              }}
            >
              Avatar
            </Typography>
            <Stack
              height={200}
              position="relative"
              sx={{
                backgroundImage: data.image
                  ? `url("${data.image}")`
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
            ></Stack>
          </Stack>
          <form>
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
                <Input name="msv" value={data.msv} disabled />
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
                <Input name="name" value={data.name} disabled />
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
                <Input name="username" value={data.username} disabled />
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
                  value={data.password}
                  type="password"
                  disabled
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
                  defaultValue={data.role}
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
                  <Input value={data.token} width="fit-content" disabled />
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
                  <Radio.Group name="gender" value={data.gender} disabled>
                    <Radio value={0}>Nam</Radio>
                    <Radio value={1}>Nữ</Radio>
                  </Radio.Group>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DetailUser;
