import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

const Sidenav = ({ color, role }) => {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <div className="sidenav">
      <div className="brand" style={{marginBottom:"2rem"}}>
        <img src={logo} alt="" />
        <span>Saumic Craft CRM</span>
      </div>
      
      <Menu theme="light" mode="inline" selectedKeys={[page]} >
        
        {role === "admin" && (
          <>
            <Menu.Item key="home">
              <NavLink to="/home">
                <span className="label">Admin Dashboard</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="services">
              <NavLink to="/services">
                <span className="label">Services</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="contact" >
              <NavLink to="/contact">
                <span className="label">Contacts</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="managertab">
              <NavLink to="/managertab">
                <span className="label">Manager Tab</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="assignmenttab">
              <NavLink to="/assignmenttab">
                <span className="label">Assignment Tab</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="accountanttab">
              <NavLink to="/accountanttab">
                <span className="label">Accountant Tab</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="supervisortab">
              <NavLink to="/supervisortab">
                <span className="label">Supervisor Tab</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="telesalestab">
              <NavLink to="/telesalestab">
                <span className="label">Telesales Tab</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="rmdtab">
              <NavLink to="/rmdtab">
                <span className="label">RMD Tab</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="socialtab">
              <NavLink to="/socialtab">
                <span className="label">Social Media Manager Tab</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="useridpass">
              <NavLink to="/useridpass">
                <span className="label">User ID & Pass</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="admintodo">
              <NavLink to="/admintodo">
                <span className="label">Admin TO DO List</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="dashwithfilters">
            <NavLink to="/dashwithfilters">
              <span className="label">Dash With Filters</span>
            </NavLink>
          </Menu.Item>
            
          
            <Menu.Item key="lms">
             <a href="https://lms.saumiccraft.com/" target="_blank" >
             <span className="label">LMS</span>
             </a>
            </Menu.Item>
            <Menu.Item key="lms">
             <a href="https://support.saumiccraft.com/" target="_blank" >
             <span className="label">Support Portal</span>
             </a>
            </Menu.Item>
           
          </>
        )}
        {role === "manager" && (
          <>
          <Menu.Item key="managerdashboard">
            <NavLink to="/managerdashboard">
              <span className="label">Manager Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="franchisedashboard">
            <NavLink to="/franchisedashboard">
              <span className="label">Franchise Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="tasktab">
            <NavLink to="/tasktab">
              <span className="label">Task Tab</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="managersetpassword">
            <NavLink to="/managersetpassword">
              <span className="label">User ID & PASS</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="dashwithfilters">
            <NavLink to="/dashwithfilters">
              <span className="label">Dash With Filters</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="managertodo">
            <NavLink to="/managertodo">
              <span className="label">Manager TO DO</span>
            </NavLink>
          </Menu.Item>
          
          <Menu.Item key="lms">
          <a href="https://lms.saumiccraft.com/" target="_blank" >
          <span className="label">LMS</span>
          </a>
         </Menu.Item>
         <Menu.Item key="supportportal">
             <a href="https://support.saumiccraft.com/" target="_blank" >
             <span className="label">Support Portal</span>
             </a>
            </Menu.Item>
         </>
        )}
        {role === "user" && (
          <>
          <Menu.Item key="userdashboard">
            <NavLink to="/userdashboard">
              <span className="label">User Dashboard</span>
            </NavLink>
          </Menu.Item>
          
          <Menu.Item key="lms">
          <a href="https://lms.saumiccraft.com/" target="_blank" >
          <span className="label">LMS</span>
          </a>
         </Menu.Item>
         <Menu.Item key="supportportal">
             <a href="https://support.saumiccraft.com/" target="_blank" >
             <span className="label">Support Portal</span>
             </a>
            </Menu.Item>

          </>
        )}
        {role === "accountant" && (
          <>
          <Menu.Item key="accountantdashboard">
            <NavLink to="/accountantdashboard">
              <span className="label">Accountant Dashboard</span>
            </NavLink>
          </Menu.Item>

          </>
        )}
        {role === "supervisor" && (
          <>
          <Menu.Item key="supervisordashboard">
            <NavLink to="/supervisordashboard">
              <span className="label">Supervisor Dashboard</span>
            </NavLink>
          </Menu.Item>

          </>
        )}
        {role === "telesales" && (
          <>
          <Menu.Item key="telesalesdashboard">
            <NavLink to="/telesalesdashboard">
              <span className="label">Dashboard</span>
            </NavLink>
          </Menu.Item>

          </>
        )}
        {role === "rmd" && (
          <>
          <Menu.Item key="rmddashboard">
            <NavLink to="/rmddashboard">
              <span className="label">Dashboard</span>
            </NavLink>
          </Menu.Item>

          </>
        )}

{role === "social" && (
          <>
          <Menu.Item key="socialdashboard">
            <NavLink to="/socialdashboard">
              <span className="label">Dashboard</span>
            </NavLink>
          </Menu.Item>

          </>
        )}
        
      </Menu>
    </div>
  );
};

export default Sidenav;
