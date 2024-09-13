import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Input, Modal, Button } from 'antd';
import axios from 'axios';
import TemplateModal from './TemplateModal'; // Import the modal component

const { Search } = Input;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Template = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  

  
  useEffect(() => {
    const managerId = localStorage.getItem("managerId");
    axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
      .then(response => {
        const sortedData = response.data.sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
        setUserData(sortedData);
        setFilteredData(sortedData);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleSearch = value => {
    const filtered = userData.filter(item => item.enrollmentId.includes(value));
    setFilteredData(filtered);
  };

  const openModal = (record) => {
    setCurrentRecord(record);  // Set the current record when modal opens
    setIsModalVisible(true);   // Show the modal
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  const columns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Templates',
      key: 'templates',
      render: (text, record) => (
        <Button type="primary" onClick={() => openModal(record)}>
          Open Templates
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Templates Table" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Search
              placeholder="Search by Enrollment ID"
              onSearch={handleSearch}
              enterButton
              style={{ width: "15rem", marginBottom: '20px' }}
            />
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="enrollmentId"
            />
          </Card>
        </Col>
      </Row>

      {/* Modal for templates */}
      {isModalVisible && currentRecord && (
        <TemplateModal 
          visible={isModalVisible} 
          onClose={closeModal} 
          currentRecord={currentRecord} 
          apiUrl={apiUrl}
        />
      )}
    </div>
  );
};

export default Template;
