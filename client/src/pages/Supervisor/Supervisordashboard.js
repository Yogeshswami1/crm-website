import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Select, Spin, message } from 'antd';
import AmazonTable from './Amazon';
import WebsiteTable from './Website';
import "./Style.css";

const { Content } = Layout;
const { Option } = Select;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Supervisordashboard = () => {
  const [loading, setLoading] = useState(true);
  const [managers, setManagers] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [serviceType, setServiceType] = useState('');

  useEffect(() => {
    // Fetch managers data
    axios.get(`${apiUrl}/api/managers/get`)
      .then(response => {
        setManagers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  const handleManagerSelect = (managerId) => {
    const selected = managers.find(manager => manager._id === managerId);
    console.log('Selected Manager:', selected); // Debugging step

    if (!selected || !selected._id) {
      message.error("Manager ID is undefined.");
      return;
    }

    // Fetch users data based on manager ID
    axios.get(`${apiUrl}/api/managers/getcontact/${selected._id}`)
      .then(response => {
        setModalData(response.data);
        setSelectedManager(selected);
        setServiceType(selected.service); // Set service type for conditional rendering
      })
      .catch(error => {
        console.error("There was an error fetching the users data!", error);
        message.error("Failed to load assigned contacts. Please try again.");
      });
  };

  return (
    <Layout className="dashboard-layout">
      <Content className="dashboard-content">
        {loading ? (
          <div className="spinner">
            <Spin size="large" />
          </div>
        ) : (
          <div className="manager-select">
            <Select
              placeholder="Select a Manager"
              style={{ width: 300 }}
              onChange={handleManagerSelect}
            >
              {managers.map(manager => (
                <Option key={manager._id} value={manager._id}>
                  {manager.name} - {manager.service}
                </Option>
              ))}
            </Select>
          </div>
        )}

        {selectedManager && (
          <div className="assigned-users">
            <h2>Assigned Users for {selectedManager.name}</h2>
            {serviceType === 'AMAZON' ? (
              <AmazonTable data={modalData} />
            ) : serviceType === 'WEBSITE' ? (
              <WebsiteTable data={modalData} />
            ) : (
              <p>No data available for the selected service.</p>
            )}
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default Supervisordashboard;
