import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles

ReactDOM.render(
  <BrowserRouter>
    <App />
    <ToastContainer /> {/* Add ToastContainer here */}
  </BrowserRouter>,
  document.getElementById("root")
);
