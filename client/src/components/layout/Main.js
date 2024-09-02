// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Layout, Drawer, Affix } from "antd";
// import Sidenav from "./Sidenav";
// import Header from "./Header";
// import Footer from "./Footer";
// import { useUser } from "../../UserContext.js";

// const { Header: AntHeader, Content, Sider } = Layout;

// function Main({ children }) {
//   const [visible, setVisible] = useState(false);
//   const [placement, setPlacement] = useState("right");
//   const [sidenavColor, setSidenavColor] = useState("#1890ff");
//   const [sidenavType, setSidenavType] = useState("transparent");
//   const [fixed, setFixed] = useState(false);
//   const { user } = useUser(); // Get the user from context
//   const role = user ? user.role : null; // Extract the role

//   const openDrawer = () => setVisible(!visible);
//   const handleSidenavType = (type) => setSidenavType(type);
//   const handleSidenavColor = (color) => setSidenavColor(color);
//   const handleFixedNavbar = (type) => setFixed(type);

//   let { pathname } = useLocation();
//   pathname = pathname.replace("/", "");

//   useEffect(() => {
//     if (pathname === "rtl") {
//       setPlacement("left");
//     } else {
//       setPlacement("right");
//     }
//   }, [pathname]);

//   return (
//     <Layout
//       className={`layout-dashboard ${
//         pathname === "profile" ? "layout-profile" : ""
//       } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
//     >
//       <Drawer
//         title={false}
//         placement={placement === "right" ? "left" : "right"}
//         closable={false}
//         onClose={() => setVisible(false)}
//         open={visible}
//         key={placement === "right" ? "left" : "right"}
//         width={250}
//         className={`drawer-sidebar ${
//           pathname === "rtl" ? "drawer-sidebar-rtl" : ""
//         } `}
//       >
//         <Layout
//           className={`layout-dashboard ${
//             pathname === "rtl" ? "layout-dashboard-rtl" : ""
//           }`}
//         >
//           <Sider
//             trigger={null}
//             width={250}
//             theme="light"
//             className={`sider-primary ant-layout-sider-primary ${
//               sidenavType === "#fff" ? "active-route" : ""
//             }`}
//             style={{ background: sidenavType }}
//           >
//             <Sidenav color={sidenavColor} role={role} />
//           </Sider>
//         </Layout>
//       </Drawer>
//       <Sider
//         breakpoint="lg"
//         collapsedWidth="0"
//         onCollapse={(collapsed, type) => {
//           console.log(collapsed, type);
//         }}
//         trigger={null}
//         width={250}
//         theme="light"
//         className={`sider-primary ant-layout-sider-primary ${
//           sidenavType === "#fff" ? "active-route" : ""
//         }`}
//         style={{ background: sidenavType }}
//       >
//         <Sidenav color={sidenavColor} role={role} />
//       </Sider>
//       <Layout>
//         {fixed ? (
//           <Affix>
//             <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
//               <Header
//                 onPress={openDrawer}
//                 name={pathname}
//                 subName={pathname}
//                 handleSidenavColor={handleSidenavColor}
//                 handleSidenavType={handleSidenavType}
//                 handleFixedNavbar={handleFixedNavbar}
//               />
//             </AntHeader>
//           </Affix>
//         ) : (
//           <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
//             <Header
//               onPress={openDrawer}
//               name={pathname}
//               subName={pathname}
//               handleSidenavColor={handleSidenavColor}
//               handleSidenavType={handleSidenavType}
//               handleFixedNavbar={handleFixedNavbar}
//             />
//           </AntHeader>
//         )}
//         <Content className="content-ant">{children}</Content>
//         <Footer />
//       </Layout>
//     </Layout>
//   );
// }

// export default Main;
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix, Button } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import { useUser } from "../../UserContext.js";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import "./Main.css";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { user } = useUser();
  const role = user ? user.role : null;

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      {isMobile ? (
        <Drawer
          title={false}
          placement={placement === "right" ? "left" : "right"}
          closable={false}
          onClose={() => setVisible(false)}
          open={visible}
          key={placement === "right" ? "left" : "right"}
          width={250}
          className={`drawer-sidebar ${
            pathname === "rtl" ? "drawer-sidebar-rtl" : ""
          } `}
        >
          <Sidenav color={sidenavColor} role={role} />
        </Drawer>
      ) : (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
          trigger={null}
          collapsedWidth={0}
          width={250}
          theme="light"
          className={`sider-primary ant-layout-sider-primary ${
            sidenavType === "#fff" ? "active-route" : ""
          }`}
          style={{ background: sidenavType }}
        >
          <Sidenav color={sidenavColor} role={role} />
        </Sider>
      )}

      <Layout
        className={`site-layout ${collapsed ? "content-expanded" : ""}`}
      >
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        )}
        <Content className="content-ant">
          <Button
            type="primary"
            onClick={isMobile ? openDrawer : toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed || isMobile ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
