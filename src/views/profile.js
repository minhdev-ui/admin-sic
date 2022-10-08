import { IconButton, Stack, Typography } from "@mui/material";
import { Button, Input, Radio, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect } from "react";
import { useState } from "react";
import { Role } from "../constant";
import { CameraOutlined, SyncOutlined, UploadOutlined } from "@ant-design/icons";
import { Box } from "@mui/system";


const Profile = () => {
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("account")).username
  );
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("account")).email
  );
  const [fullName, setFullName] = useState(
    JSON.parse(localStorage.getItem("account")).name
  );
  const [msv, setMsv] = useState(
    JSON.parse(localStorage.getItem("account")).msv
  );
  const [password, setPassword] = useState(
    JSON.parse(localStorage.getItem("account")).password
  );
  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("account")).role
  );
  const [token] = useState(JSON.parse(localStorage.getItem("account")).token);
  const [gender, setGender] = useState(
    JSON.parse(localStorage.getItem("account")).gender
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
        <Stack>
          <Stack width="20%" height={200} position='relative' sx={{
            backgroundImage: 'url("/img/blank_image.jpg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            ':hover': {
              '.overlay-img': {
                opacity: 1
              }
            }
          }}>
            <Stack className="overlay-img" position='absolute' direction='column' justifyContent={'center'} alignItems='center' sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              inset: 0,
              opacity: 0,
              transition: 'all .3s',
            }} component="label">
              <CameraOutlined style={{fontSize: '28px', color: '#fff', cursor: 'pointer'}}/>
              <Box
                component='input'
                type='file'
                accept='image/png, image/jpeg'
                hidden
                width={100}
                height={300}
              />
            </Stack>
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
              <Input value={msv} />
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
              <Input value={fullName} />
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
              <Input value={email || ""} />
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
              <Input value={password} type="password" />
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
              <Select defaultValue={role}>
                {Role.map((item, i) => (
                  <Option key={i} value={item}>
                    {item}
                  </Option>
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
                <Input value={token} width="fit-content" disabled />
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
                <Radio.Group value={gender}>
                  <Radio value={0}>Nam</Radio>
                  <Radio value={1}>Nữ</Radio>
                </Radio.Group>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          width="100%"
          direction={"row"}
          alignItems="center"
          justifyContent="flex-end"
          gap={1}
        >
          <Button type="primary" danger>
            Cancel
          </Button>
          <Button type="primary" icon={<SyncOutlined />}>
            Update Account
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Profile;
