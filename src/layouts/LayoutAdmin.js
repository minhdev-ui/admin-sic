import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  ContactsOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Store, { sideBar } from "../admin/store";
import avatar from "../assets/images/admin/avatar.png";
import Image from "../components/elements/Image";
import Logo from "../components/layout/partials/Logo";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "/Dashboard", <PieChartOutlined />),
  getItem("Admin", "/Quan-tri-vien", <DesktopOutlined />),
  getItem("Bài Viết/Sự Kiện", "/Blog-Event", <UserOutlined />),
  getItem("Contact", "/contact", <ContactsOutlined />),
];

const LayoutAdmin = ({ children }) => {
  const classes = classNames("site-admin");
  const history = useHistory();
  const [collapse, setCollapse] = useState(false);
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
          defaultSelectedKeys={['/']}
          items={items}
          mode='inline'
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
            <div className="user-avatar">
              <Image src={avatar} width={35} height={35} alt="user" />
            </div>
            <HiOutlineLogout
              className="admin-icon--logout"
              onClick={() => {
                Store.setState({ status: false });
                // eslint-disable-next-line no-restricted-globals
                confirm("Bạn muốn đăng xuất?") &&
                  localStorage.removeItem("token");
                setTimeout(() => {
                  history.push("/loginAdmin");
                }, 500);
              }}
            />
          </div>
        </div>
        <main className="main-admin-content">{children}</main>
      </div>
    </section>
  );
};

export default LayoutAdmin;
