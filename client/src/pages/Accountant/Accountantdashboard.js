// import React, { useState, useEffect } from 'react';
// import { Radio } from 'antd';
// import Dash from './Dash';
// import Franchise from './Franchise';
// import Amazon from './Amazon';

// const Accountantdashboard = () => {
//   const [view, setView] = useState('website'); // Set default value to 'website'

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <Radio.Group 
//         onChange={(e) => setView(e.target.value)} 
//         value={view} 
//         style={{ marginBottom: '20px', display: 'flex' }}
//       >      
//         <Radio.Button value="website">Website</Radio.Button>            
//         {/* <Radio.Button value="franchise">Franchise</Radio.Button>             */}
//         {/* <Radio.Button value="amazon">Amazon</Radio.Button>             */}
//       </Radio.Group>
//       {view === 'website' && <Dash />}
//       {view === 'franchise' && <Franchise />}
//       {view === 'amazon' && <Amazon />}
//     </div>
//   );
// };

// export default Accountantdashboard;


import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Typography, Modal } from 'antd';
import axios from 'axios';
import './Dash.css';

const { Search } = Input;
const { Title } = Typography;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Dash = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/api/contact/get`)
      .then(response => {
        const websiteServiceData = response.data.filter(item => item.service === 'WEBSITE');
        setUserData(websiteServiceData);
        setFilteredData(websiteServiceData);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  // Single search function across multiple fields
  const handleSearch = (value) => {
    const filtered = userData.filter(item => {
      const enrollmentIdMatch = item.enrollmentId.toLowerCase().includes(value.toLowerCase());
      const nameMatch = item.name.toLowerCase().includes(value.toLowerCase());
      const emailMatch = item.email.toLowerCase().includes(value.toLowerCase());
      const primaryContactMatch = item.primaryContact.toLowerCase().includes(value.toLowerCase());

      // Return true if any of the fields match the search value
      return enrollmentIdMatch || nameMatch || emailMatch || primaryContactMatch;
    });
    setFilteredData(filtered);
  };

  const handleEnrollmentClick = (record) => {
    setSelectedContact(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedContact(null);
  };

  const paymentColumns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
      render: (text, record) => <a onClick={() => handleEnrollmentClick(record)}>{text}</a>,
    },
    {
      title: 'Stage 1 Payment',
      children: [
        {
          title: 'Amount',
          dataIndex: ['payment', 'stage1', 'amount'],
          key: 'stage1PaymentAmount',
        },
        {
          title: 'Status',
          dataIndex: ['payment', 'stage1', 'status'],
          key: 'stage1PaymentStatus',
        },
      ],
    },
    {
      title: 'Stage 2 Payment',
      children: [
        {
          title: 'Amount',
          dataIndex: ['payment', 'stage2', 'amount'],
          key: 'stage2PaymentAmount',
        },
        {
          title: 'Status',
          dataIndex: ['payment', 'stage2', 'status'],
          key: 'stage2PaymentStatus',
        },
      ],
    },
    {
      title: 'Stage 3 Payment',
      children: [
        {
          title: 'Amount',
          dataIndex: ['payment', 'stage3', 'amount'],
          key: 'stage3PaymentAmount',
        },
        {
          title: 'Status',
          dataIndex: ['payment', 'stage3', 'status'],
          key: 'stage3PaymentStatus',
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Welcome Accountant" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Title level={4} style={{ textAlign: 'center' }}>Payment Table</Title>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Search
            placeholder="Search by Enrollment ID, Name, Email, or Primary Contact"
            onSearch={handleSearch}
            enterButton
            style={{ width: "30rem" }}
          />
        </div>
        <Table
          columns={paymentColumns}
          dataSource={filteredData}
          rowKey="enrollmentId"
          className="custom-table"
        />
        {selectedContact && (
          <Modal
            title="Contact Details"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Primary Contact:</strong> {selectedContact.primaryContact}</p>
            <p><strong>Secondary Contact:</strong> {selectedContact.secondaryContact}</p>
          </Modal>
        )}
      </Card>
    </div>
  );
};

export default Dash;
