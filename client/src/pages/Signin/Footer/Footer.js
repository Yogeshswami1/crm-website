import React from "react";
import { Layout, Menu } from "antd";
import "./Footer.css"; // Add custom CSS for Footer

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="footer-custom">
      {/* <Menu mode="horizontal" className="footer-menu">
        <Menu.Item>Company</Menu.Item>
        <Menu.Item>About Us</Menu.Item>
      </Menu> */}
      <p className="copyright">Copyright © 2024 Saumic Craft. All Rights Reserved</p>
    </Footer>
  );
};

export default FooterComponent;
