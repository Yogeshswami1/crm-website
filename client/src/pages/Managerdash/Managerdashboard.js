import React, { useState, useEffect } from "react";
import { Select, Radio, message } from "antd";
import Dash from "./Dash";
import FloatingButton from "./Float/Floatingbutton";
import Stagewebsite from "./StageWebsite/Stagewebsite";
import Stage2website from "./Stage2Website/Stage2website";
import Stage3website from "./Stage3Website/Stage3website";
import axios from "axios";
import Mainwebsite from "./Mainwebsite";
import ArchiveTable from "./Archivetable";
import Template from "./Templates/Template";

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
    if (serviceType === "WEBSITE") {
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
          {serviceType === "WEBSITE" && (
            <>
              <Radio.Button value="dashwebsite">Dashboard</Radio.Button>
              <Radio.Button value="mainwebsite">Main</Radio.Button>
              <Radio.Button value="stage1Website">Stage 1 (WEBSITE)</Radio.Button>
              <Radio.Button value="stage2Website">Stage 2 (WEBSITE)</Radio.Button>
              <Radio.Button value="stage3Website">Stage 3 (WEBSITE)</Radio.Button>
              <Radio.Button value="templates">Templates</Radio.Button>
            </>
          )}
        </Radio.Group>
      </div>

      {activeTab === "dashwebsite" && <Dash />}
      {activeTab === "archiveTable" && <ArchiveTable />}
      {activeTab === "mainwebsite" && <Mainwebsite />}
      {activeTab === "stage1Website" && <Stagewebsite />}
      {activeTab === "stage2Website" && <Stage2website />}
      {activeTab === "stage3Website" && <Stage3website />}
      {activeTab === "templates" && <Template />}

      <FloatingButton />
    </div>
  );
};

export default Managerdashboard;
