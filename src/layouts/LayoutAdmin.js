import {
  ContactsOutlined,
  EditOutlined,
  HomeOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Stack, Typography } from "@mui/material";
import { Dropdown, Layout, Menu } from "antd";
import axios from "axios";
import classNames from "classnames";
import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useHistory, useLocation } from "react-router-dom";
import Store, { sideBar } from "../admin/store";
import avatarMale from "../assets/images/admin/avatar.png";
import avatarGuest from "../assets/images/admin/avatarGuest.png";
import avatarFemale from "../assets/images/admin/girlAva.png";
import Image from "../components/elements/Image";
import Logo from "../components/layout/partials/Logo";
import config from "../db.config";

const { Sider } = Layout;

function getItem(label, key, icon, disabled) {
  return {
    key,
    icon,
    disabled,
    label,
  };
}

const Setting = ({ obj, history }) => {
  const getDetailData = async (token) => {
    const response = await axios.get(
      `${config.API_URL}/api/admin/?token=${token}`
    );
    return response;
  };

  const checkLogout = (token) => {
    if (token) {
      const response = getDetailData(token);
      response.then((res) => {
        axios.patch(`${config.API_URL}/api/admin/${res?.data[0]._id}`, {
          deviceLogin:
            res?.data[0].deviceLogin > 0 ? res?.data[0].deviceLogin - 1 : 0,
        });
      });
    }
  };

  const handleSetting = () => {
    history.push("/account/profile");
  };
  return (
    <Menu
      items={[
        {
          label: <div>Username: {obj?.username ?? "Guest"}</div>,
          key: "username",
        },
        {
          label: <div>Name: {obj?.name ?? "Guest"}</div>,
          key: "name",
        },
        {
          label: obj ? <div onClick={handleSetting}>Setting</div> : <div></div>,
        },
        {
          icon: (
            <Stack
              direction="row"
              sx={{
                width: "100%",
              }}
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                if (confirm("Bạn muốn đăng xuất?")) {
                  Store.setState({ status: false });
                  checkLogout(localStorage.getItem("token"));
                  localStorage.removeItem("token");
                  localStorage.removeItem("account");
                  history.push("/loginAdmin");
                }
              }}
            >
              <span>Logout: </span>
              <HiOutlineLogout className="admin-icon--logout" />
            </Stack>
          ),
        },
      ]}
    />
  );
};

const LayoutAdmin = ({ children }) => {
  const classes = classNames("site-admin");
  const history = useHistory();
  const [collapse, setCollapse] = useState(false);
  const [detailAcc] = useState(
    JSON.parse(localStorage.getItem("account")) || {}
  );
  const [tokenAdmin] = useState(localStorage.getItem("token"));
  const location = useLocation();
  const items = [
    getItem("Home", "/", <HomeOutlined />),
    getItem("Dashboard", "/Dashboard", <PieChartOutlined />),
    getItem(
      "Admin",
      "/Quan-tri-vien",
      <UserOutlined />,
      tokenAdmin === "undefined" ? true : false
    ),
    getItem(
      "Bài Viết/Sự Kiện",
      "/Blog-Event",
      <EditOutlined />,
      tokenAdmin === "undefined" ? true : false
    ),
    getItem(
      "Contact",
      "/contact",
      <ContactsOutlined />,
      tokenAdmin === "undefined" ? true : false
    ),
  ];

  return (
    <section className={classes}>
      <Sider
        collapsible
        collapsed={collapse}
        onCollapse={(value) => setCollapse(value)}
      >
        <div className="sidebar_logo">
          <Logo />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          items={items}
          mode="inline"
          onSelect={(key) => {
            sideBar.setState({ active: key.key });
            history.push(key.key);
          }}
        />
      </Sider>
      {/* <SideBar children={sideBarAdmin}/> */}
      <div className="site-main-admin">
        <div className="site-header-admin">
          <div className="admin-icons">
            <FaBell className="admin-icon" />
          </div>
          <div className="header-admin-user">
            <Dropdown
              overlay={<Setting obj={detailAcc} history={history} />}
              trigger={["click"]}
              overlayStyle={{ fontSize: "16px" }}
            >
              <Stack direction="row" gap={2} alignItems="center">
                <div className="user-avatar">
                  <Image
                    src={
                      detailAcc
                        ? detailAcc.gender === 0
                          ? avatarMale
                          : avatarFemale
                        : avatarGuest
                    }
                    width={35}
                    height={35}
                    alt="user"
                  />
                </div>
                <Typography color={"#fff"} fontSize={16}>
                  {detailAcc?.name || "Guest"}
                </Typography>
              </Stack>
            </Dropdown>
          </div>
        </div>
        <main className="main-admin-content">{children}</main>
      </div>
    </section>
  );
};

export default LayoutAdmin;
