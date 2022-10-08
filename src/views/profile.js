import { Stack, Typography } from "@mui/material";
import { Button, Input, Radio, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React from "react";
import { useState } from "react";
import { Role } from "../constant";
import { SyncOutlined } from "@ant-design/icons";

const Profile = () => {
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("account")).username
  );
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
            <Input value={username} />
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
            <Input value={username} />
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
            <Input value={username} />
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
              Email
            </Typography>
            <Input value={username} />
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
            <Input value={username} />
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
            <Select>
              {Role.map((item, i) => (
                <Option key={i} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Stack>
          <Stack width="45%" direction={'row'} alignItems='center' gap={5}>
            <Stack>
              <Typography
                component={"label"}
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  marginBottom: "10px",
                }}
              >
                Lớp
              </Typography>
              <Input value={username} />
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
              <Radio.Group>
                <Radio value='Nam'>Nam</Radio>
                <Radio value='Nữ'>Nữ</Radio>
              </Radio.Group>
            </Stack>
          </Stack>
        </Stack>
        <Stack width="100%" direction={'row'} alignItems='center' justifyContent='flex-end' gap={1}>
            <Button type="primary" danger>Cancel</Button>
            <Button type="primary" icon={<SyncOutlined/>}>Update Account</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Profile;
