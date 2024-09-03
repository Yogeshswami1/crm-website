// import { Menu } from "antd";
// import { NavLink, useLocation } from "react-router-dom";
// import logo from "../../assets/logo.png";

// const Sidenav = ({ color, role }) => {
//   const { pathname } = useLocation();
//   const page = pathname.replace("/", "");

//   return (
//     <div className="sidenav">
//       <div className="brand" style={{marginBottom:"2rem"}}>
//         <img src={logo} alt="" />
//         <span>Saumic Craft CRM</span>
//       </div>
      
//       <Menu theme="light" mode="inline" selectedKeys={[page]} >
        
//         {role === "admin" && (
//           <>
//             <Menu.Item key="home">
//               <NavLink to="/home">
//                 <span className="label">Admin Dashboard</span>
//               </NavLink>
//             </Menu.Item>
//             <Menu.Item key="contact" >
//               <NavLink to="/contact">
//                 <span className="label">Contacts</span>
//               </NavLink>
//             </Menu.Item>
//             <Menu.Item key="managertab">
//               <NavLink to="/managertab">
//                 <span className="label">Manager Tab</span>
//               </NavLink>
//             </Menu.Item>
//             <Menu.Item key="assignmenttab">
//               <NavLink to="/assignmenttab">
//                 <span className="label">Assignment Tab</span>
//               </NavLink>
//             </Menu.Item>
//             <Menu.Item key="accountanttab">
//               <NavLink to="/accountanttab">
//                 <span className="label">Accountant Tab</span>
//               </NavLink>
//             </Menu.Item>
//             <Menu.Item key="telesalestab">
//               <NavLink to="/telesalestab">
//                 <span className="label">Telesales Tab</span>
//               </NavLink>
//             </Menu.Item>
//             <Menu.Item key="useridpass">
//               <NavLink to="/useridpass">
//                 <span className="label">User ID & Pass</span>
//               </NavLink>
//             </Menu.Item>
           
//           </>
//         )}
//         {role === "manager" && (
//           <>
//           <Menu.Item key="managerdashboard">
//             <NavLink to="/managerdashboard">
//               <span className="label">Manager Dashboard</span>
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="franchisedashboard">
//             <NavLink to="/franchisedashboard">
//               <span className="label">Franchise Dashboard</span>
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="tasktab">
//             <NavLink to="/tasktab">
//               <span className="label">Task Tab</span>
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="managersetpassword">
//             <NavLink to="/managersetpassword">
//               <span className="label">User ID & PASS</span>
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="dashwithfilters">
//             <NavLink to="/dashwithfilters">
//               <span className="label">Dash With Filters</span>
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="managertodo">
//             <NavLink to="/managertodo">
//               <span className="label">Manager TO DO</span>
//             </NavLink>
//           </Menu.Item>
          
//          </>
//         )}
//         {role === "user" && (
//           <>
//           <Menu.Item key="userdashboard">
//             <NavLink to="/userdashboard">
//               <span className="label">User Dashboard</span>
//             </NavLink>
//           </Menu.Item>

//           </>
//         )}
//         {role === "accountant" && (
//           <>
//           <Menu.Item key="accountantdashboard">
//             <NavLink to="/accountantdashboard">
//               <span className="label">Accountant Dashboard</span>
//             </NavLink>
//           </Menu.Item>

//           </>
//         )}
//         {role === "supervisor" && (
//           <>
//           <Menu.Item key="supervisordashboard">
//             <NavLink to="/supervisordashboard">
//               <span className="label">Supervisor Dashboard</span>
//             </NavLink>
//           </Menu.Item>

//           </>
//         )}
//         {role === "telesales" && (
//           <>
//           <Menu.Item key="telesalesdashboard">
//             <NavLink to="/telesalesdashboard">
//               <span className="label">Dashboard</span>
//             </NavLink>
//           </Menu.Item>

//           </>
//         )}
        
        
//       </Menu>
//     </div>
//   );
// };

// export default Sidenav;
import React, { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  FileDoneOutlined,
  DollarOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.png";
import "./Sidenav.css";

const Sidenav = ({ role }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <div className={`sidenav ${collapsed ? "collapsed" : ""}`}>
      <div className="brand">
        <img src={logo} alt="Logo" className="brand-logo" />
        {!collapsed && <span className="brand-name">Saumic Craft CRM</span>}
      </div>
      <Button 
        type="primary" 
        onClick={toggleCollapse} 
        className="collapse-button"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[page]}
        className="sidenav-menu"
        inlineCollapsed={collapsed}
      >
        {role === "admin" && (
          <>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <NavLink to="/home">Admin Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key="contact" icon={<TeamOutlined />}>
              <NavLink to="/contact">Contacts</NavLink>
            </Menu.Item>
            <Menu.Item key="managertab" icon={<FileDoneOutlined />}>
              <NavLink to="/managertab">Manager Tab</NavLink>
            </Menu.Item>
            <Menu.Item key="assignmenttab" icon={<SettingOutlined />}>
              <NavLink to="/assignmenttab">Assignment Tab</NavLink>
            </Menu.Item>
            <Menu.Item key="accountanttab" icon={<DollarOutlined />}>
              <NavLink to="/accountanttab">Accountant Tab</NavLink>
            </Menu.Item>
            <Menu.Item key="telesalestab" icon={<ProfileOutlined />}>
              <NavLink to="/telesalestab">Telesales Tab</NavLink>
            </Menu.Item>
            <Menu.Item key="useridpass" icon={<ProfileOutlined />}>
              <NavLink to="/useridpass">User ID & Pass</NavLink>
            </Menu.Item>
          </>
        )}
        {role === "manager" && (
          <>
            <Menu.Item key="managerdashboard" icon={<HomeOutlined />}>
              <NavLink to="/managerdashboard">Manager Dashboard</NavLink>
            </Menu.Item>
           
            <Menu.Item key="managersetpassword" icon={<SettingOutlined />}>
              <NavLink to="/managersetpassword">User ID & Pass</NavLink>
            </Menu.Item>
           
          </>
        )}
        {role === "user" && (
          <Menu.Item key="userdashboard" icon={<HomeOutlined />}>
            <NavLink to="/userdashboard">User Dashboard</NavLink>
          </Menu.Item>
        )}
        {role === "accountant" && (
          <Menu.Item key="accountantdashboard" icon={<DollarOutlined />}>
            <NavLink to="/accountantdashboard">Accountant Dashboard</NavLink>
          </Menu.Item>
        )}
        {role === "supervisor" && (
          <Menu.Item key="supervisordashboard" icon={<ProfileOutlined />}>
            <NavLink to="/supervisordashboard">Supervisor Dashboard</NavLink>
          </Menu.Item>
        )}
        {role === "telesales" && (
          <Menu.Item key="telesalesdashboard" icon={<ProfileOutlined />}>
            <NavLink to="/telesalesdashboard">Telesales Dashboard</NavLink>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default Sidenav;
