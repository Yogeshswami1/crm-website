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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, Typography, Alert, Form, Spin, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const ChangesTable = () => {
  const [changes, setChanges] = useState([]);
  const [changeText, setChangeText] = useState('');
  const [remainingChanges, setRemainingChanges] = useState(3);
  const [managerPosition, setManagerPosition] = useState('');
  const [loading, setLoading] = useState(true);
  const [enrollmentId, setEnrollmentId] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const id = localStorage.getItem('enrollmentId');
      setEnrollmentId(id);
      try {
        const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${id}`);
        const userDetails = response.data;
        setManagerPosition(userDetails.managerPosition || 'Not available');
        fetchChanges(id);
      } catch (error) {
        console.error('Error fetching user details: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [apiUrl]);

  const fetchChanges = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/changes/?enrollmentId=${id}`);
      // Handle response based on the data structure
      if (response.data && Array.isArray(response.data)) {
        setChanges(response.data);
      } else if (response.data && response.data.changes) {
        setChanges(response.data.changes);
      }
      setRemainingChanges(3 - response.data.changes.length);
    } catch (error) {
      console.error('Error fetching changes: ', error);
    }
  };
  

  const addChange = async () => {
    if (remainingChanges > 0 && changeText.trim()) {
      const newChange = { 
        enrollmentId,
        managerPosition,
        description: changeText.trim(), // Ensure 'description' key
        status: 'Pending'
      };

      console.log("Payload being sent:", newChange); // Log the payload for debugging

      try {
        const response = await axios.post(`${apiUrl}/api/changes`, newChange);
        console.log("Added change response:", response.data); // Debug: check the response
        setChanges([...changes, { ...response.data, key: changes.length + 1 }]);
        setChangeText('');
        setRemainingChanges(remainingChanges - 1);
        message.success('Change added successfully');
      } catch (error) {
        console.error('Error adding change: ', error);
        message.error('Failed to add change');
      }
    }
  };

  const columns = [
    {
      title: 'Serial Number',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Manager Position',
      dataIndex: 'managerPosition',
      key: 'managerPosition',
    },
    {
      title: 'Change Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Change Description',
      dataIndex: 'description', // Ensure this matches the backend response field
      key: 'description',
    },
  ];
  
  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
            <Col>
              <Title level={4}>List of Changes</Title>
            </Col>
            <Col>
              <Alert message={`Remaining changes: ${remainingChanges}`} type="info" showIcon />
            </Col>
          </Row>
          <Table
            dataSource={changes.map((change, index) => ({
              ...change,
              key: index + 1,
              managerPosition,
            }))}
            columns={columns}
            pagination={false}
            style={{ marginBottom: '20px' }}
          />
          <Form layout="inline" onFinish={addChange}>
            <Form.Item>
              <Input
                value={changeText}
                onChange={(e) => setChangeText(e.target.value)}
                placeholder="Describe the change..."
                disabled={remainingChanges === 0}
                style={{ width: '300px' }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addChange}
                disabled={remainingChanges === 0 || !changeText.trim()}
              >
                Add Change
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default ChangesTable;
