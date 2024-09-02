// import React, { useEffect, useState } from 'react';
// import { Card, Table, Input, Typography } from 'antd';
// import axios from 'axios';
// import './Dash.css';

// const { Search } = Input;
// const { Title } = Typography;

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Dash = () => {
//   const [userData, setUserData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     axios.get(`${apiUrl}/api/contact/get`)
//       .then(response => {
//         const websiteServiceData = response.data.filter(item => item.service === 'WEBSITE');
//         setUserData(websiteServiceData);
//         setFilteredData(websiteServiceData);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

//   const handleSearch = value => {
//     const filtered = userData.filter(item => item.enrollmentId.includes(value));
//     setFilteredData(filtered);
//   };

//   const paymentColumns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     },
//     {
//       title: 'Stage 1 Payment',
//       children: [
//         {
//           title: 'Amount',
//           dataIndex: ['payment', 'stage1', 'amount'],
//           key: 'stage1PaymentAmount',
//         },
//         {
//           title: 'Status',
//           dataIndex: ['payment', 'stage1', 'status'],
//           key: 'stage1PaymentStatus',
//         },
//       ],
//     },
//     {
//       title: 'Stage 2 Payment',
//       children: [
//         {
//           title: 'Amount',
//           dataIndex: ['payment', 'stage2', 'amount'],
//           key: 'stage2PaymentAmount',
//         },
//         {
//           title: 'Status',
//           dataIndex: ['payment', 'stage2', 'status'],
//           key: 'stage2PaymentStatus',
//         },
//       ],
//     },
//     {
//       title: 'Stage 3 Payment',
//       children: [
//         {
//           title: 'Amount',
//           dataIndex: ['payment', 'stage3', 'amount'],
//           key: 'stage3PaymentAmount',
//         },
//         {
//           title: 'Status',
//           dataIndex: ['payment', 'stage3', 'status'],
//           key: 'stage3PaymentStatus',
//         },
//       ],
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <Card title="Welcome Accountant" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//         <Title level={4} style={{ textAlign: 'center' }}>Payment Table</Title>
//         <Search
//           placeholder="Search by Enrollment ID"
//           onSearch={handleSearch}
//           enterButton
//           style={{ width: "15rem", marginBottom: '20px' }}
//         />
//         <Table
//           columns={paymentColumns}
//           dataSource={filteredData}
//           rowKey="enrollmentId"
//           pagination={{ pageSize: 10 }}
//           className="custom-table"
//         />
//       </Card>
//     </div>
//   );
// };

// export default Dash;

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

  const handleSearch = (value, key) => {
    const filtered = userData.filter(item => item[key].toLowerCase().includes(value.toLowerCase()));
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Search
            placeholder="Search by Enrollment ID"
            onSearch={(value) => handleSearch(value, 'enrollmentId')}
            enterButton
            style={{ width: "15rem" }}
          />
          <Search
            placeholder="Search by Name"
            onSearch={(value) => handleSearch(value, 'name')}
            enterButton
            style={{ width: "15rem" }}
          />
          <Search
            placeholder="Search by Email"
            onSearch={(value) => handleSearch(value, 'email')}
            enterButton
            style={{ width: "15rem" }}
          />
          <Search
            placeholder="Search by Primary Contact"
            onSearch={(value) => handleSearch(value, 'primaryContact')}
            enterButton
            style={{ width: "15rem" }}
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
