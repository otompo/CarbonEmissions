import React, { useState, useEffect, useContext } from "react";
import { Menu, Button, Layout } from "antd";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import {
  PushpinOutlined,
  CameraOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  BgColorsOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";

const { SubMenu } = Menu;
const { Sider } = Layout;

const AdminNav = () => {
  const router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  // hooks
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth > 800) {
      setCollapsed(false);
    }
  }, [onlyWidth < 800]);

  const activeName = (name) => `${current === name && "active"}`;

  const handleLogout = () => {
    // remove from local storage
    localStorage.removeItem("auth");
    // remove from context
    setAuth({
      user: null,
      token: "",
    });
    // redirect to login
    router.push("/");
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["2", "6", "7", "9", "11", "14"]}
        // defaultOpenKeys={["16"]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<SettingOutlined />}>
          <Link href="/admin" legacyBehavior>
            <a className={activeName("/admin")}>Dashboard</a>
          </Link>
        </Menu.Item>

        {/* users */}
        <Menu.Item key="13" icon={<UserSwitchOutlined />}>
          <Link href="/admin/staff" legacyBehavior>
            <a className={activeName("/admin/staff")}>Manage Staff</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="15" icon={<UserOutlined />}>
          <Link href={`/admin/partners`} legacyBehavior>
            <a className={activeName(`/admin/partners`)}>Manage Partness</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="19" icon={<SettingOutlined />}>
          <Link href="/admin/settings" legacyBehavior>
            <a className={activeName("/admin/settings")}>Manage Settings</a>
          </Link>
        </Menu.Item>
        {/* profile */}
        <Menu.Item key="14" icon={<UserOutlined />}>
          <Link href={`/admin/profile`} legacyBehavior>
            <a className={activeName(`/admin/profile`)}>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          style={{ marginBottom: 150 }}
          key="20"
          icon={<LogoutOutlined style={{ color: "red" }} />}
        >
          <p
            onClick={handleLogout}
            className="mt-2 text-danger "
            style={{ cursor: "pointer" }}
          >
            Logout
          </p>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;
