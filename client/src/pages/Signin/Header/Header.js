import React, { useEffect, useRef } from "react";
import { Layout } from "antd";
import logo from "../../../assets/logo.png";
import font from "../../../assets/terminator.TTF";

const { Header } = Layout;

const HeaderComponent = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    // Add class to trigger animation once on page load
    if (headingRef.current) {
      headingRef.current.classList.add('animate-heading');
    }
  }, []);

  return (
    <Header
      style={{
        position: "fixed", // Fixed position at the top
        width: "100%", // Full width
        top: 0,
        left: 0,
        zIndex: 10, // Ensure it's above other content
        display: "flex", // Flexbox for layout
        alignItems: "center", // Center items vertically
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for light color scheme
        height: "64px", // Header height
        justifyContent: "center", // Center the content horizontally
        borderBottomLeftRadius: "20px", // Rounded bottom left corner
        borderBottomRightRadius: "20px", // Rounded bottom right corner
        overflow: "hidden", // Ensure content does not overflow the rounded corners
        background: "rgba(255, 255, 255, 0.3)", // More transparent background
        backdropFilter: "blur(10px)", // Optional: Add a blur effect to the background
        padding: "0 20px", // Padding for left and right
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          position: "relative", // For absolute positioning of the heading
        }}
      >
        <div
          style={{
            position: "absolute", // Position logo absolutely
            left: "20px", // Align logo to the left
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="Brand Logo"
            style={{
              height: "70px", // Logo size
              marginRight: "15px", // Space between logo and heading
            }}
          />
        </div>
        <div
          style={{
            marginLeft: "20px", // Ensure there's space for the logo
            display: "flex",
            justifyContent: "center",
            flex: 1, // Allows the heading container to take the remaining space
          }}
        >
          <h1
            ref={headingRef} // Reference to apply animation
            style={{
              margin: 0,
              fontSize: "1.5em", // Font size
              fontFamily: "'Terminator', sans-serif", // Font family
              fontWeight: "bold", // Font weight
              color: "#333333", // Darker text color
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)", // Light shadow for readability
            }}
          >
            Saumic Craft CRM
          </h1>
        </div>
      </div>
      <style>
        {`
          @font-face {
            font-family: 'Terminator';
            src: url(${font}) format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          @keyframes headingAnimation {
            0% {
              transform: scale(0.9);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-heading {
            animation: headingAnimation 1s ease-out;
          }
        `}
      </style>
    </Header>
  );
};

export default HeaderComponent;
