import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Row, Col, Spin } from 'antd';
import moment from 'moment';
import './Dashboard.css';

const { Title, Text } = Typography;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const enrollmentId = localStorage.getItem('enrollmentId');

      if (enrollmentId) {
        try {
          const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
          setUserDetails(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('No enrollmentId found in local storage');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (!userDetails) {
    return <Text>No user details found.</Text>;
  }

  return (
    <div className="dashboard-container">
      {/* Welcome Card */}
      <Card className="welcome-card" bordered={false}>
        <Title level={2} style={{ color: '#fff' }}>Welcome To Our Franchise</Title>
        <Text style={{ color: '#fff', fontSize: '16px' }}>We are glad to have you on board!</Text>
      </Card>

      {/* User Details and Available Codes */}
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} md={12}>
          <Card className="user-details-card" bordered={false}>
            <Title level={4} style={{ marginBottom: '20px' }}>User Details</Title>
            <div className="user-details-content">
              <div>
                <Text strong>Enrollment ID:</Text>
                <Text>{userDetails.enrollmentId}</Text>
              </div>
              <div>
                <Text strong>Date:</Text>
                <Text>{moment(userDetails.date).format('DD-MM-YYYY')}</Text>
              </div>
              <div>
                <Text strong>Name:</Text>
                <Text>{userDetails.name}</Text>
              </div>
              <div>
                <Text strong>Email:</Text>
                <Text>{userDetails.email}</Text>
              </div>
              <div>
                <Text strong>Service:</Text>
                <Text>{userDetails.service}</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className="available-codes-card" bordered={false}>
            <Title level={4} style={{ marginBottom: '20px' }}>Available Codes</Title>
            <ul className="codes-list">
              {userDetails.items.map((item, index) => (
                <li key={index} className="code-item">
                  <div>
                    <Text strong>{index + 1}.</Text> {/* Serial Number */}
                  </div>
                  <div>
                    <Text strong>SKU:</Text> <Text>{item.sku}</Text>
                  </div>
                  <div>
                    <Text strong>Quantity:</Text> <Text>{item.quantity}</Text>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
