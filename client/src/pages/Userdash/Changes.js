// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Input, Row, Col, Typography, Alert, Form, Spin, message } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// const { Title } = Typography;
// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const ChangesTable = () => {
//   const [changes, setChanges] = useState([]);
//   const [changeText, setChangeText] = useState('');
//   const [remainingChanges, setRemainingChanges] = useState(3);
//   const [managerPosition, setManagerPosition] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [enrollmentId, setEnrollmentId] = useState('');

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const id = localStorage.getItem('enrollmentId');
//       setEnrollmentId(id);
//       try {
//         const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${id}`);
//         const userDetails = response.data;
//         setManagerPosition(userDetails.managerPosition || 'Not available');
//         fetchChanges(id);
//       } catch (error) {
//         console.error('Error fetching user details: ', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [apiUrl]);

//   const fetchChanges = async (id) => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/changes/?enrollmentId=${id}`);
//       setChanges(response.data);
//       setRemainingChanges(3 - response.data.length);
//     } catch (error) {
//       console.error('Error fetching changes: ', error);
//     }
//   };
//   const addChange = async () => {
//     if (remainingChanges > 0 && changeText.trim()) {
//       const newChange = { 
//         enrollmentId,
//         managerPosition,
//         description: changeText.trim(), // Changed from 'change' to 'description'
//         status: 'Pending'
//       };
  
//       console.log("Payload being sent:", newChange); // Log the payload for debugging
  
//       try {
//         const response = await axios.post(`${apiUrl}/api/changes`, newChange);
//         setChanges([...changes, { ...response.data, key: changes.length + 1 }]);
//         setChangeText('');
//         setRemainingChanges(remainingChanges - 1);
//         message.success('Change added successfully');
//       } catch (error) {
//         console.error('Error adding change: ', error);
//         message.error('Failed to add change');
//       }
//     }
//   };
  

//   const columns = [
//     {
//       title: 'Serial Number',
//       dataIndex: 'key',
//       key: 'key',
//     },
//     {
//       title: 'Manager Position',
//       dataIndex: 'managerPosition',
//       key: 'managerPosition',
//     },
//     {
//       title: 'Change Status',
//       dataIndex: 'status',
//       key: 'status',
//     },
//     {
//       title: 'Change Description',
//       dataIndex: 'change',
//       key: 'change',
//     },
//   ];

//   return (
//     <div>
//       {loading ? (
//         <Spin size="large" />
//       ) : (
//         <>
//           <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
//             <Col>
//               <Title level={4}>List of Changes</Title>
//             </Col>
//             <Col>
//               <Alert message={`Remaining changes: ${remainingChanges}`} type="info" showIcon />
//             </Col>
//           </Row>
//           <Table
//             dataSource={changes.map((change, index) => ({
//               ...change,
//               key: index + 1,
//               managerPosition,
//             }))}
//             columns={columns}
//             pagination={false}
//             style={{ marginBottom: '20px' }}
//           />
//           <Form layout="inline" onFinish={addChange}>
//             <Form.Item>
//               <Input
//                 value={changeText}
//                 onChange={(e) => setChangeText(e.target.value)}
//                 placeholder="Describe the change..."
//                 disabled={remainingChanges === 0}
//                 style={{ width: '300px' }}
//               />
//             </Form.Item>
//             <Form.Item>
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={addChange}
//                 disabled={remainingChanges === 0 || !changeText.trim()}
//               >
//                 Add Change
//               </Button>
//             </Form.Item>
//           </Form>
//         </>
//       )}
//     </div>
//   );
// };

// export default ChangesTable;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Input, Row, Col, Typography, Alert, Form, Spin, message } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// const { Title } = Typography;
// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const ChangesTable = () => {
//   const [changes, setChanges] = useState([]);
//   const [changeText, setChangeText] = useState('');
//   const [remainingChanges, setRemainingChanges] = useState(3);
//   const [managerPosition, setManagerPosition] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [enrollmentId, setEnrollmentId] = useState('');

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const id = localStorage.getItem('enrollmentId');
//       setEnrollmentId(id);
//       try {
//         const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${id}`);
//         const userDetails = response.data;
//         setManagerPosition(userDetails.managerPosition || 'Not available');
//         fetchChanges(id);
//       } catch (error) {
//         console.error('Error fetching user details: ', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [apiUrl]);

//   const fetchChanges = async (id) => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/changes/?enrollmentId=${id}`);
//       // Handle response based on the data structure
//       if (response.data && Array.isArray(response.data)) {
//         setChanges(response.data);
//       } else if (response.data && response.data.changes) {
//         setChanges(response.data.changes);
//       }
//       setRemainingChanges(3 - response.data.changes.length);
//     } catch (error) {
//       console.error('Error fetching changes: ', error);
//     }
//   };
  

//   const addChange = async () => {
//     if (remainingChanges > 0 && changeText.trim()) {
//       const newChange = { 
//         enrollmentId,
//         managerPosition,
//         description: changeText.trim(), // Ensure 'description' key
//         status: 'Pending'
//       };

//       console.log("Payload being sent:", newChange); // Log the payload for debugging

//       try {
//         const response = await axios.post(`${apiUrl}/api/changes`, newChange);
//         console.log("Added change response:", response.data); // Debug: check the response
//         setChanges([...changes, { ...response.data, key: changes.length + 1 }]);
//         setChangeText('');
//         setRemainingChanges(remainingChanges - 1);
//         message.success('Change added successfully');
//       } catch (error) {
//         console.error('Error adding change: ', error);
//         message.error('Failed to add change');
//       }
//     }
//   };

//   const columns = [
//     {
//       title: 'Serial Number',
//       dataIndex: 'key',
//       key: 'key',
//     },
//     {
//       title: 'Manager Position',
//       dataIndex: 'managerPosition',
//       key: 'managerPosition',
//     },
//     {
//       title: 'Change Status',
//       dataIndex: 'status',
//       key: 'status',
//     },
//     {
//       title: 'Change Description',
//       dataIndex: 'description', // Ensure this matches the backend response field
//       key: 'description',
//     },
//   ];
  
//   return (
//     <div>
//       {loading ? (
//         <Spin size="large" />
//       ) : (
//         <>
//           <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
//             <Col>
//               <Title level={4}>List of Changes</Title>
//             </Col>
//             <Col>
//               <Alert message={`Remaining changes: ${remainingChanges}`} type="info" showIcon />
//             </Col>
//           </Row>
//           <Table
//             dataSource={changes.map((change, index) => ({
//               ...change,
//               key: index + 1,
//               managerPosition,
//             }))}
//             columns={columns}
//             pagination={false}
//             style={{ marginBottom: '20px' }}
//           />
//           <Form layout="inline" onFinish={addChange}>
//             <Form.Item>
//               <Input
//                 value={changeText}
//                 onChange={(e) => setChangeText(e.target.value)}
//                 placeholder="Describe the change..."
//                 disabled={remainingChanges === 0}
//                 style={{ width: '300px' }}
//               />
//             </Form.Item>
//             <Form.Item>
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={addChange}
//                 disabled={remainingChanges === 0 || !changeText.trim()}
//               >
//                 Add Change
//               </Button>
//             </Form.Item>
//           </Form>
//         </>
//       )}
//     </div>
//   );
// };

// export default ChangesTable;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, message, Card, Row, Col ,Button} from 'antd';
import './Changes.css'; // Import your CSS file for custom styles

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Changes = ({ enrollmentId }) => {
  const [contacts, setContacts] = useState([]);
  const [changes, setChanges] = useState([]);
  const [serialNumber, setSerialNumber] = useState(1);
  const [changeDescription, setChangeDescription] = useState('');

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load data. Please try again.");
    }
  };

  const fetchChangesByEnrollmentId = async () => {
    try {
      if (enrollmentId) {
        const response = await axios.get(`${apiUrl}/api/changes/${enrollmentId}`);
        setChanges(response.data);
        const latestChange = response.data.reduce((max, change) => {
          return change.serialNumber > max ? change.serialNumber : max;
        }, 0);
        setSerialNumber(latestChange + 1);
      } else {
        message.error("Enrollment ID is missing.");
      }
    } catch (error) {
      console.error("Error fetching changes:", error);
      message.error("Failed to load changes. Please try again.");
    }
  };

  const addChange = async (description) => {
    if (changes.length < 3) {
      const newChange = {
        serialNumber,
        managerPosition: contacts[0]?.managerId.position || 'N/A',
        changeStatus: 'Pending',
        changeDescription: description,
        enrollmentId,
      };

      try {
        const response = await axios.post(`${apiUrl}/api/changes`, newChange);
        setChanges([...changes, response.data]);
        setSerialNumber((prevSerialNumber) => prevSerialNumber + 1);
        setChangeDescription('');
      } catch (error) {
        console.error("Error saving change:", error);
        message.error("Failed to add change. Please try again.");
      }
    } else {
      message.error("You can only add up to 3 changes.");
    }
  };

  const handleInputChange = (event) => {
    setChangeDescription(event.target.value);
  };

  const handleStatusChange = (serialNumber) => {
    const updatedChanges = changes.map((change) => {
      if (change.serialNumber === serialNumber) {
        // Toggle status
        const newStatus =
          change.changeStatus === 'Pending'
            ? 'In Progress'
            : change.changeStatus === 'In Progress'
            ? 'Completed'
            : 'Pending';
        return { ...change, changeStatus: newStatus };
      }
      return change;
    });
    setChanges(updatedChanges);
  };

  useEffect(() => {
    fetchContacts();
    fetchChangesByEnrollmentId();
  }, [enrollmentId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'green';
      case 'In Progress':
        return 'orange';
      case 'Pending':
      default:
        return 'red';
    }
  };

  const columns = [
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      align: 'center',
    },
    {
      title: 'Manager Position',
      dataIndex: 'managerPosition',
      key: 'managerPosition',
      align: 'center',
      responsive: ['md'],
    },
    {
      title: 'Change Status',
      dataIndex: 'changeStatus',
      key: 'changeStatus',
      align: 'center',
      render: (status) => (
        <div
          className="status-box"
          style={{
            backgroundColor: getStatusColor(status),
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={() => handleStatusChange(status)}
        >
          {status}
        </div>
      ),
    },
    {
      title: 'Change Description',
      dataIndex: 'changeDescription',
      key: 'changeDescription',
      align: 'center',
    },
  ];

  return (
    <div className="changes-container">
      <h2 className="changes-title">Changes Dashboard</h2>
      <Card className="changes-card" hoverable>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={18}>
            <Input
              placeholder="Change Description"
              value={changeDescription}
              onChange={handleInputChange}
              className="changes-input"
            />
          </Col>
          <Col xs={24} md={6}>
            <Button
              type="primary"
              onClick={() => addChange(changeDescription)}
              block
              className="changes-button"
            >
              Add Change
            </Button>
          </Col>
        </Row>
      </Card>
      <Card title="Changes List" bordered={false} className="changes-list-card">
        <Table
          dataSource={changes}
          columns={columns}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 600 }}
        />
      </Card>
    </div>
  );
};

export default Changes;
