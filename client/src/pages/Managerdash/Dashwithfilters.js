import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col } from 'antd';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const DashWithFilters = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const managerId = localStorage.getItem("managerId");

  useEffect(() => {
    if (managerId) {
      // Fetch total users and user data
      axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
        .then(response => {
          setUserData(response.data); // Assuming API returns an array of user objects
          setFilteredData(response.data); // Initially set filteredData to be the same as userData
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [managerId]); // Ensure useEffect runs when managerId changes

  const columns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  // Filtering Logic
  const filterFbaNotDone = () => {
    const filtered = userData.filter(user => !user.fbaIn || user.fbaIn.startsWith('Not Done'));
    setFilteredData(filtered);
  };

  const filterLaunchDateNotDone = () => {
    const filtered = userData.filter(user => !user.launchDateIn || user.launchDateIn.startsWith('Not Done'));
    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setFilteredData(userData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col>
          <Button onClick={filterFbaNotDone}>FBA Not Done</Button>
        </Col>
        <Col>
          <Button onClick={filterLaunchDateNotDone}>Launch Date Not Done</Button>
        </Col>
        <Col>
          <Button onClick={resetFilters}>Reset Filters</Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={filteredData} rowKey="enrollmentId" />
      
    </div>
  );
};

export default DashWithFilters;
