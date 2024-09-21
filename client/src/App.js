// // App.js

// import React from "react";
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import Home from "./pages/Home";
// import Platform from "./pages/Platform";
// import Billing from "./pages/Billing";
// import Managertab from "./pages/Managertab";
// import Userdashboard from "./pages/Userdashboard";
// import Services from "./pages/Services";
// import Profile from "./pages/Profile";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import Main from "./components/layout/Main";
// import Support from "./pages/Support";
// import Learnings from "./pages/Learnings";
// import Ordawlt from "./pages/Ordawlt";
// import Contact from "./pages/Contact";
// import Assignmenttab from "./pages/Assignmenttab";
// import Managerdashboard from "./pages/Managerdashboard";
// import Useridpass from "./pages/Useridpass";
// import Tasktab from "./pages/Tasktab";
// import { UserProvider, useUser } from "./UserContext";
// import "antd/dist/antd.css";
// import "./assets/styles/main.css";
// import "./assets/styles/responsive.css";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { user } = useUser();
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// };

// function App() {
//   return (
//     <UserProvider>
//       <Router>
//         <div className="App">
//           <Switch>
//             <Route path="/sign-up" exact component={SignUp} />
//             <Route path="/" exact component={SignIn} />
//             <Main>
//               <ProtectedRoute exact path="/home" component={Home} />
//               <ProtectedRoute exact path="/managertab" component={Managertab} />
//               <ProtectedRoute exact path="/services" component={Services} />
//               <ProtectedRoute exact path="/useridpass" component={Useridpass} />
//               <ProtectedRoute exact path="/userdashboard" component={Userdashboard} />
//               <ProtectedRoute exact path="/platform" component={Platform} />
//               <ProtectedRoute exact path="/tasktab" component={Tasktab} />
//               <ProtectedRoute exact path="/billing" component={Billing} />
//               <ProtectedRoute exact path="/assignmenttab" component={Assignmenttab} />
//               <ProtectedRoute exact path="/managerdashboard" component={Managerdashboard} />
//               <ProtectedRoute exact path="/support" component={Support} />
//               <ProtectedRoute exact path="/profile" component={Profile} />
//               <ProtectedRoute exact path="/learnings" component={Learnings} />
//               <ProtectedRoute exact path="/ordawlt" component={Ordawlt} />
//               <ProtectedRoute exact path="/contact" component={Contact} />
//             </Main>
//           </Switch>
//         </div>
//       </Router>
//     </UserProvider>
//   );
// }

// export default App;


import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Managertab from "./pages/Managertab";
import Userdashboard from "./pages/Userdash/Userdashboard";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/Signin/SignIn";
import Main from "./components/layout/Main";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Assignmenttab from "./pages/Assignmenttab";
import Managerdashboard from "./pages/Managerdash/Managerdashboard";
import Useridpass from "./pages/Useridpass";
import { UserProvider } from "./UserContext";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
// import ProtectedRoute from "./ProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

import Managersetpassword from "./pages/Managerdash/Managersetpassword";

import Accountanttab from "./pages/Accountanttab";
import Supervisortab from "./pages/Supervisortab";
import Telesalestab from "./pages/Telesalestab";
import Rmdtab from "./pages/Rmdtab";
import Socialtab from "./pages/Socialmediatab";

import Accountantdashboard from "./pages/Accountant/Accountantdashboard";
import Telesalesdashboard from "./pages/Telesales/Dashboard";
import Waba from "./pages/Managerdash/Waba";
import Rmddashboard from "./pages/RMD/Rmddashboard";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Switch>
            {/* <Route path="/sign-up" exact component={SignUp} /> */}
            <Route path="/" exact component={SignIn} />
            <Main>
              <ProtectedRoute exact path="/home" component={Home} roles={['admin']} />
              <ProtectedRoute exact path="/managertab" component={Managertab} roles={['manager','admin']} />
              <ProtectedRoute exact path="/services" component={Services} roles={['admin']} />
              <ProtectedRoute exact path="/useridpass" component={Useridpass} roles={['admin']} />
              <ProtectedRoute exact path="/userdashboard" component={Userdashboard} roles={['user','admin']} />
              <ProtectedRoute exact path="/platform" component={Platform} roles={['admin', 'manager', 'user']} />
              <ProtectedRoute exact path="/assignmenttab" component={Assignmenttab} roles={['admin']} />
              <ProtectedRoute exact path="/managerdashboard" component={Managerdashboard} roles={['manager']} />
              <ProtectedRoute exact path="/support" component={Support} roles={['admin', 'user', 'manager']} />
              <ProtectedRoute exact path="/profile" component={Profile} roles={['admin', 'user', 'manager']} />
              <ProtectedRoute exact path="/contact" component={Contact} roles={['admin']} />
              <ProtectedRoute exact path="/managersetpassword" component={Managersetpassword} roles={['manager']} />
              <ProtectedRoute exact path="/waba" component={Waba} roles={['manager']} />

              <ProtectedRoute exact path="/accountanttab" component={Accountanttab} roles={['admin']} />
              <ProtectedRoute exact path="/supervisortab" component={Supervisortab} roles={['admin']} />
              <ProtectedRoute exact path="/telesalestab" component={Telesalestab} roles={['admin']} />
              <ProtectedRoute exact path="/rmdtab" component={Rmdtab} roles={['admin']} />
              <ProtectedRoute exact path="/socialtab" component={Socialtab} roles={['admin']} />

              <ProtectedRoute exact path="/accountantdashboard" component={Accountantdashboard} roles={['accountant']} />
              <ProtectedRoute exact path="/telesalesdashboard" component={Telesalesdashboard} roles={['telesales']} />
              <ProtectedRoute exact path="/rmddashboard" component={Rmddashboard} roles={['rmd']} />
              
            
            </Main>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;