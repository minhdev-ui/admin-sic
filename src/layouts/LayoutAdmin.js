import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Store, { sideBar } from "../admin/store";
import avatarMale from "../assets/images/admin/avatar.png";
import avatarFemale from "../assets/images/admin/girlAva.png";
import avatarGuest from "../assets/images/admin/avatarGuest.png";
import Image from "../components/elements/Image";
import Logo from "../components/layout/partials/Logo";
import { Dropdown } from "antd";
import axios from "axios";
import config from "../db.config";
import { Stack, Typography } from "@mui/material";

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
                  localStorage.removeItem("token");
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
  const [detailAcc, setDetailAcc] = useState({});
  const [tokenAdmin, setTokenAdmin] = useState(localStorage.getItem("token"));
  console.log(tokenAdmin);
  const items = [
    getItem("Dashboard", "/Dashboard", <PieChartOutlined />),
    getItem(
      "Admin",
      "/Quan-tri-vien",
      <DesktopOutlined />,
      tokenAdmin === "undefined" ? true : false
    ),
    getItem(
      "Bài Viết/Sự Kiện",
      "/Blog-Event",
      <UserOutlined />,
      tokenAdmin === "undefined" ? true : false
    ),
    getItem(
      "Contact",
      "/contact",
      <ContactsOutlined />,
      tokenAdmin === "undefined" ? true : false
    ),
  ];
  useEffect(() => {
    if (tokenAdmin) {
      axios
        .get(`${config.API_URL}/api/admin?token=${tokenAdmin}`)
        .then((res) => setDetailAcc(...res.data));
    } else {
      return;
    }
    setTokenAdmin(localStorage.getItem("token"));
  }, [tokenAdmin]);

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
          defaultSelectedKeys={["/"]}
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
              <Stack direction='row' gap={2} alignItems='center'>
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
                <Typography color={'#fff'} fontSize={16}>{detailAcc.name}</Typography>
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
