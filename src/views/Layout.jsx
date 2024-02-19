import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Tag } from "antd";
import BreadcrumbNow from "@/components/BreadcrumbNow";
import styled from "styled-components";

const { Header, Sider, Content } = Layout;
const Layoutes = styled(Layout)`
  height: 100vh;
  overflow: hidden;
  .ant-layout-sider.ant-layout-sider-dark.siderKuang {
    flex: 0 0 250px !important;
    max-width: 250px !important;
    min-width: 250px !important;
    width: 250px !important;
  }
  .ant-layout-sider.ant-layout-sider-dark.siderSong {
    flex: 0 0 80px !important;
    max-width: 80px !important;
    min-width: 80px !important;
    width: 80px !important;
  }

  .siderKuang::-webkit-scrollbar {
    display: none;
  }
  .ant-layout-header {
    padding: 0;
  }
`;
// route_display
// function highlight() {}

const Home = () => {
  // const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  let [breadcrumbs, setBreadcrumbs] = useState([
    {
      name: "首页",
      path: "/home/index",
    },
  ]);
  let [highlight, setHighlight] = useState("首页");
  let items = [];

  const routers = JSON.parse(window.sessionStorage.getItem("routers"));

  function flatten(arr, flay = true) {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      const path = !flay
        ? arr[i].path.charAt() === "/"
          ? arr[i].path.slice(1)
          : arr[i].path
        : arr[i].path;
      // console.log(path);
      data.push({
        key: path,
        title: arr[i].meta.title,
        label: arr[i].meta.title,
        path: path,
        icon: "",
        component: arr[i].component,
        children: arr[i].children ? flatten(arr[i].children, false) : "",
      });
    }
    return data;
  }

  if (routers) {
    routers.unshift({ meta: { title: "首页" }, path: "/home/index" });
    routers.push({ meta: { title: "个人中心" }, path: "/user/profile" });
    items = [...flatten(routers)];
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function routeJump(e) {
    let luji = e.keyPath.reverse().join("/");
    generateBreadcrumbs(items, e, luji);
    navigate(luji);

    // if (e.keyPath[0][0] === "/") {
    //   let url = e.keyPath[1] + e.keyPath[0];
    //   console.log(url);
    //   navigate(url);
    // } else {
    //   if (e.keyPath[2]) {
    //     let url = e.keyPath[2] + "/" + e.keyPath[1] + "/" + e.keyPath[0];
    //     console.log(url);
    //     navigate(url);
    //   } else {
    //     let url = e.keyPath[1] + "/" + e.keyPath[0];
    //     console.log(url);
    //     navigate(url);
    //   }
    // }
  }

  const generateBreadcrumbs = (data, e, luji) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === e.key) {
        let arr = [
          ...breadcrumbs,
          {
            name: data[i].title,
            path: luji,
            gao: e.key,
          },
        ];

        const uniqueArr = [
          ...new Map(arr.map((item) => [item.name, item])).values(),
        ];
        setBreadcrumbs(uniqueArr);
        setHighlight(data[i].title);
      }
      if (data[i].children) {
        generateBreadcrumbs(data[i].children, e, luji);
      }
    }
  };

  return (
    <Layoutes className="h-[100vh]">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={collapsed ? "siderSong" : "siderKuang"}
        style={{
          overflow: "auto",
          height: "100vh",
        }}
      >
        <div className=" demo-logo-vertical font-bold text-[20px] h-[60px] text-[white] text-center flex justify-center items-center p-[10px] ">
          {collapsed ? (
            <img
              src="https://pe.xzzl120.com/assets/logo.1c4bdeb5.png"
              className="w-[40px] h-[43px] rounded-full"
              alt=""
            />
          ) : (
            <>
              <img
                src="https://pe.xzzl120.com/assets/logo.1c4bdeb5.png"
                className="w-[40px] h-[43px] rounded-full"
                alt=""
              />
              <span className="text-[20px]">西藏康城肿瘤医院</span>
            </>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={highlight}
          items={items}
          onClick={routeJump}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            color: "#fff",
            background: "#fff",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <BreadcrumbNow data={items}></BreadcrumbNow>
        </Header>
        <div
          className="tagsView-container flex "
          style={{ borderBottom: "1px solid #4f5052", height: "40px" }}
        >
          {/* 循环渲染 */}
          {breadcrumbs.map((item, index) => (
            <Tag
              key={index}
              closable
              style={{ backgroundColor: item.name === highlight ? "red" : "" }}
              className=" flex justify-center items-center"
              onClick={() => {
                navigate(item.path);
                setHighlight(item.name);
              }}
              onClose={(e) => {
                let newTag = breadcrumbs.filter(
                  (items) => items.name !== item.name
                );
                console.log(newTag);
                setBreadcrumbs(newTag);
                console.log(breadcrumbs.length);
                console.log(index);
                if (breadcrumbs.length - 1 === index) {
                  navigate(newTag[newTag.length - 1].path);
                  setHighlight(newTag[newTag.length - 1].name);
                } else {
                  navigate(newTag[index].path);
                  setHighlight(newTag[index].name);
                }

                console.log(item.name);

                e.preventDefault();
                // handleClose(item.name);
              }}
            >
              {item.name}
            </Tag>
          ))}
        </div>
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
            height: "100vh",
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layoutes>
  );
};
export default Home;
