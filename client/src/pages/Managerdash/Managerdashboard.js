import React, { useState, useEffect } from "react";
import { Select, Radio, message } from "antd";
import Dash from "./Dash";
import Stagecomponent from "./Stagecomponent";
import Stageincomponent from "./Stageincomponent";
import Stagecomcomponent from "./Stagecomcomponent";
import FloatingButton from "../Float/Floatingbutton";
import Stagewebsite from "./Stagewebsite";
import Stage2website from "./Stage2website";
import Stage3website from "./Stage3website";
import axios from "axios";
import Dashamazon from "./Dashamazon";
import Mainwebsite from "./Mainwebsite";
import ArchiveTable from "./Archivetable";

const apiUrl = process.env.REACT_APP_BACKEND_URL

const Managerdashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [serviceType, setServiceType] = useState(null);

  useEffect(() => {
    const storedServiceType = localStorage.getItem("serviceType");
    if (storedServiceType) {
      setServiceType(storedServiceType);
      setDefaultTab(storedServiceType);
    } else {
      const fetchManagerService = async () => {
        try {
          const managerId = localStorage.getItem("managerId");
          if (managerId) {
            const response = await axios.get(`${apiUrl}/api/managers/${managerId}`);
            setServiceType(response.data.service);
            localStorage.setItem("serviceType", response.data.service);
            setDefaultTab(response.data.service);
          }
        } catch (error) {
          console.error("Error fetching manager service type:", error);
          message.error("Failed to fetch manager service type");
        }
      };
      fetchManagerService();
    }
  }, []);

  const setDefaultTab = (serviceType) => {
    if (serviceType === "AMAZON") {
      setActiveTab("dashamazon");
    } else if (serviceType === "WEBSITE") {
      setActiveTab("dashwebsite");
    }
  };

  const handleTabChange = (e) => {
    setActiveTab(e.target.value);
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <div style={{ marginBottom: 16 }}>
        <Radio.Group onChange={handleTabChange} value={activeTab}>
          
          {serviceType === "AMAZON" && (
            <>
              <Radio.Button value="dashamazon">Dashboard</Radio.Button>
              <Radio.Button value="stage1">Stage 1 (AMAZON)</Radio.Button>
              <Radio.Button value="stage2In">Stage 2 (IN)</Radio.Button>
              <Radio.Button value="stage2Com">Stage 2 (COM)</Radio.Button>
              <Radio.Button value="archiveTable">Archive</Radio.Button>
            </>
          )}
          {serviceType === "WEBSITE" && (
            <>
              <Radio.Button value="dashwebsite">Dashboard</Radio.Button>
              <Radio.Button value="mainwebsite">Main</Radio.Button>
              <Radio.Button value="stage1Website">Stage 1 (WEBSITE)</Radio.Button>
              <Radio.Button value="stage2Website">Stage 2 (WEBSITE)</Radio.Button>
              <Radio.Button value="stage3Website">Stage 3 (WEBSITE)</Radio.Button>
            </>
          )}
        </Radio.Group>
      </div>

      {activeTab === "dashwebsite" && <Dash />}
      {activeTab === "dashamazon" && <Dashamazon />}
      {activeTab === "stage1" && <Stagecomponent />}
      {activeTab === "stage2In" && <Stageincomponent />}
      {activeTab === "stage2Com" && <Stagecomcomponent />}
      {activeTab === "archiveTable" && <ArchiveTable />}
      {activeTab === "mainwebsite" && <Mainwebsite />}
      {activeTab === "stage1Website" && <Stagewebsite />}
      {activeTab === "stage2Website" && <Stage2website />}
      {activeTab === "stage3Website" && <Stage3website />}

      <FloatingButton />
    </div>
  );
};

export default Managerdashboard;
