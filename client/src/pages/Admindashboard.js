import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Card, Avatar, Spin, Modal, Row, Col, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AmazonTable from './Amazontable';
import WebsiteTable from './Websitetable';
import './Home.css';

const { Header, Content } = Layout;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [serviceType, setServiceType] = useState('');

  useEffect(() => {
    // Fetch managers data
    axios.get(`${apiUrl}/api/managers/get`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (manager) => {
    console.log('Manager object:', manager); // Debugging step

    if (!manager || !manager._id) {
      message.error("Manager ID is undefined.");
      return;
    }

    // Fetch users data based on manager ID
    axios.get(`${apiUrl}/api/managers/getcontact/${manager._id}`)
      .then(response => {
        setModalData(response.data);
        setSelectedManager(manager);
        setServiceType(manager.service); // Set service type for conditional rendering
        setIsModalVisible(true);
      })
      .catch(error => {
        console.error("There was an error fetching the users data!", error);
        message.error("Failed to load assigned contacts. Please try again.");
      });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalData([]);
    setSelectedManager(null);
    setServiceType('');
  };

  return (
    <Layout className="dashboard-layout">
      {/* <Header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </Header> */}
      <Content className="dashboard-content">
        {loading ? (
          <div className="spinner">
            <Spin size="large" />
          </div>
        ) : (
          <div className="manager-grid">
            <Row gutter={16}>
              {data.map(item => (
                <Col span={24} sm={12} md={8} lg={6} key={item._id}>
                  <Card
                    title={item.name}
                    className="manager-card"
                    extra={<Avatar icon={<UserOutlined />} />}
                    onClick={() => handleCardClick(item)}
                  >
                    <div>
                      <p><strong>Position:</strong> {item.position}</p>
                      <p><strong>Status:</strong> {item.status}</p>
                      <p><strong>Service:</strong> {item.service}</p>
                      <p><strong>Contact Number:</strong> {item.contactNumber}</p>
                      <p><strong>Date of Joining:</strong> {item.dateOfJoining}</p>
                      <p><strong>Email:</strong> {item.email}</p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Content>
      <Modal
        title={`Assigned Users for ${selectedManager ? selectedManager.name : ''}`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {serviceType === 'AMAZON' ? (
          <AmazonTable data={modalData} />
        ) : serviceType === 'WEBSITE' ? (
          <WebsiteTable data={modalData} />
        ) : null}
      </Modal>
    </Layout>
  );
};

export default AdminDashboard;
