import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Card, Spin, Select, message } from 'antd';
import WebsiteTable from './WebsiteTable'; // Your newly created WebsiteTable component

const { Header, Content } = Layout;
const { Option } = Select;
const apiUrl = process.env.REACT_APP_BACKEND_URL;
const ManagerData = () => {
  const [loading, setLoading] = useState(true);
  const [managers, setManagers] = useState([]); // List of all managers
  const [selectedManager, setSelectedManager] = useState(null); // Selected manager
  const [assignedUsers, setAssignedUsers] = useState([]); // Contacts/Users assigned to the selected manager
  const [serviceType, setServiceType] = useState(''); // Service type for the selected manager

  // Fetch all managers when the component mounts
  useEffect(() => {
    axios.get(`${apiUrl}/api/managers/get`)
      .then(response => {
        setManagers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching managers:", error);
        setLoading(false);
      });
  }, []);

  // Handle manager selection
  const handleManagerSelect = (managerId) => {
    const manager = managers.find(item => item._id === managerId);
    if (!manager) {
      message.error("Manager not found.");
      return;
    }

    // Fetch assigned users based on the selected manager
    axios.get(`${apiUrl}/api/managers/getcontact/${manager._id}`)
      .then(response => {
        setAssignedUsers(response.data);
        setSelectedManager(manager);
        setServiceType(manager.service); // Set the service type for the manager
      })
      .catch(error => {
        console.error("Error fetching assigned users:", error);
        message.error("Failed to load assigned users. Please try again.");
      });
  };

  return (
    <Layout className="manager-layout" style={{ minHeight: '100vh', overflow: 'auto',marginLeft: "2rem"}}>
      <Header className="manager-header" style={{ backgroundImage: 'linear-gradient(90deg, #FC6076, #FF9A44, #EF9D43, #E75516)', padding: '0 20px' }}>
        <h1 className="heading-animation" style={{ color: '#FFFFFF', textAlign: 'center', margin: 0 }}>
          {selectedManager ? `Manager: ${selectedManager.name}` : 'Select a Manager to View Data'}
        </h1>
      </Header>

      <div className="search-bar" style={{ padding: '20px', textAlign: 'center' }}>
        <Select
          placeholder="Select a manager"
          onChange={handleManagerSelect}
          style={{ width: '50%', minWidth: '200px', margin: '0 auto', display: 'block' }}
          size="large"
        >
          {managers.map(manager => (
            <Option key={manager._id} value={manager._id}>
              {manager.name} - {manager.position}
            </Option>
          ))}
        </Select>
      </div>

      <Content className="manager-content" style={{ padding: '20px', width: '90rem', overflowX: 'auto', marginLeft: "-1rem" }}>
        {loading ? (
          <div className="spinner" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : selectedManager ? (
          <Card
            title={`Details for ${selectedManager.name}`}
            style={{ width: '100%', margin: '20px 0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            headStyle={{ backgroundColor: '#f0f2f5', borderRadius: '8px 8px 0 0' }}
          >
            <p><strong>Position:</strong> {selectedManager.position}</p>
            <p><strong>Status:</strong> {selectedManager.status}</p>
            <p><strong>Service:</strong> {selectedManager.service}</p>
            <p><strong>Contact Number:</strong> {selectedManager.contactNumber}</p>
            <p><strong>Date of Joining:</strong> {new Date(selectedManager.dateOfJoining).toLocaleDateString()}</p>
            <p><strong>Email:</strong> {selectedManager.email}</p>
            <h3>Assigned Users</h3>
            <div style={{ width: '100%' }}>
              {serviceType ? (
                <WebsiteTable data={assignedUsers} /> // Render WebsiteTable component with assigned users
              ) : (
                <p>No users assigned or data available.</p>
              )}
            </div>
          </Card>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>Please select a manager to see the details.</div>
        )}
      </Content>
    </Layout>
  );
};

export default ManagerData;
