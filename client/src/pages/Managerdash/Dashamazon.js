import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Dashamazon = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const managerId = localStorage.getItem("managerId");

  useEffect(() => {
    if (managerId) {
      axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
        .then(response => {
          setUserData(response.data);
          setFilteredData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [managerId]);

  const accountOpenInCount = filteredData.filter(item => item.accountOpenIn?.startsWith('Opened')).length;
  const accountOpenComCount = filteredData.filter(item => item.accountOpenCom?.startsWith('Opened')).length;

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Total Users" value={filteredData.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Account Open .IN" value={accountOpenInCount} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Account Open .COM" value={accountOpenComCount} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashamazon;
