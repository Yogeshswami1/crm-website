


// import React, { useEffect, useState } from 'react';
// import { Card, Table, Input, Typography, message, Modal, Button,Select } from 'antd';
// import axios from 'axios';

// const { Search } = Input;
// const { Title } = Typography;
// const { Option } = Select;

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const BackendDashboard = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [changes, setChanges] = useState({}); // State to store changes by enrollment ID
//   const [selectedChanges, setSelectedChanges] = useState([]); // Store changes for the selected contact
//   const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
//   const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null); // Store selected enrollment ID

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
//       setContacts(response.data);
//       setFilteredContacts(response.data);
//       // Fetch changes for each contact
//       await fetchChangesForContacts(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       message.error("Failed to load data. Please try again.");
//     }
//   };

//   const fetchChangesForContacts = async (contacts) => {
//     try {
//       const changesPromises = contacts.map(contact => 
//         axios.get(`${apiUrl}/api/changes/${contact.enrollmentId}`) // Fetch changes by enrollment ID
//       );
//       const results = await Promise.all(changesPromises);
//       const changesData = {};
      
//       results.forEach((result, index) => {
//         changesData[contacts[index].enrollmentId] = result.data; // Store changes by enrollment ID
//       });
      
//       setChanges(changesData); // Update state with changes data
//     } catch (error) {
//       console.error("Error fetching changes:", error);
//       message.error("Failed to load changes. Please try again.");
//     }
//   };

//   const handleSearch = (value) => {
//     const filteredData = contacts.filter(contact => {
//       const enrollmentIdMatch = contact.enrollmentId?.toLowerCase().includes(value.toLowerCase());
//       const contactNoMatch = contact.primaryContact?.toLowerCase().includes(value.toLowerCase());
//       const managerMatch = contact.managerId?.position?.toLowerCase().includes(value.toLowerCase()) || false;
//       const gstMatch = contact.gst?.toLowerCase().includes(value.toLowerCase()) || false;
//       const gstNumberMatch = contact.gstNumber?.toLowerCase().includes(value.toLowerCase()) || false;

//       return enrollmentIdMatch || contactNoMatch || managerMatch || gstMatch || gstNumberMatch;
//     });

//     setFilteredContacts(filteredData);
//   };

//   const handleOpenModal = (enrollmentId) => {
//     setSelectedEnrollmentId(enrollmentId);
//     setSelectedChanges(changes[enrollmentId] || []);
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     setSelectedChanges([]);
//     setSelectedEnrollmentId(null);
//   };

//   const handleStatusUpdate = async (id, newStatus) => {
//     try {
//       // Sending PUT request to update the change status
//       const response = await axios.put(`${apiUrl}/api/changes/${id}/status`, { changeStatus: newStatus });
  
//       // Check if the response is successful
//       if (response.status === 200) {
//         message.success('Status updated successfully!');
  
//         // Optionally, refetch the changes or update the state directly with the new status
//         const updatedChange = response.data; // This should contain the updated change details
  
//         // Update local state to reflect the updated change status
//         setChanges(prevChanges => 
//           prevChanges.map(change => 
//             change._id === id ? updatedChange : change
//           )
//         );
  
//         // Refetch the changes for the selected enrollment if necessary
//         await fetchChangesForContacts(filteredContacts); 
  
//         // Update the selected changes in modal if applicable
//         setSelectedChanges(changes[selectedEnrollmentId]); // Ensure this references the updated state
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//       message.error('Failed to update status.');
//     }
//   };
  

//     const handleUpdateChange = async (key, column, value) => {
//     const newContacts = [...filteredContacts];
//     const index = newContacts.findIndex((contact) => contact._id === key); // Use _id for unique identification
      
//     if (index !== -1) {
//       newContacts[index][column] = value; // Update the respective column value
//       setFilteredContacts(newContacts); // Update the state with the new contacts array
  
//       try {
//         // Send the updated data to the backend
//         await axios.put(`${apiUrl}/api/contact/update/${key}`, {
//           [column]: value // Send the specific updated field to the backend
//         });
//         message.success("Data updated successfully!");
//       } catch (error) {
//         console.error("Error updating data:", error);
//         message.error("Failed to update data.");
//       }
//     }
//   };
  
  
//   const pgMediumOptions = ['Instamojo', 'Razorpay', 'Cvenue'];
//   const pgIntegrationOptions = ['Approved', 'Applied', 'Rejected'];
//   const paypalIntegrationOptions = ['Approved', 'Applied', 'Rejected'];


//   const columns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     },
//     {
//       title: 'Contact No.',
//       dataIndex: 'primaryContact',
//       key: 'primaryContact',
//     },
//     {
//       title: 'Manager Position',
//       dataIndex: 'managerId',
//       key: 'managerPosition',
//       render: (managerId) => (managerId && managerId.position ? managerId.position : 'N/A'),
//     },
//     {
//       title: 'GST',
//       dataIndex: 'gst',
//       key: 'gst',
//       render: (text) => (text ? text : 'N/A'),
//     },
//     {
//       title: 'GST Number',
//       dataIndex: 'gstNumber',
//       key: 'gstNumber',
//       render: (text) => (text ? text : 'N/A'),
//     },
//         {
//         title: 'PG Medium',
//         dataIndex: 'pgMedium',
//         key: 'pgMedium',
//         render: (value, record) => (
//           <Select
//             defaultValue={value}
//             style={{ width: 120 }}
//             onChange={(selectedValue) => handleUpdateChange(record._id, 'pgMedium', selectedValue)}
//           >
//             {pgMediumOptions.map(option => (
//               <Option key={option} value={option}>{option}</Option>
//             ))}
//           </Select>
//         ),
//       },
//       {
//         title: 'PG Integration',
//         dataIndex: 'pgIntegration',
//         key: 'pgIntegration',
//         render: (value, record) => (
//           <Select
//             defaultValue={value}
//             style={{ width: 120 }}
//             onChange={(selectedValue) => handleUpdateChange(record._id, 'pgIntegration', selectedValue)}
//           >
//             {pgIntegrationOptions.map(option => (
//               <Option key={option} value={option}>{option}</Option>
//             ))}
//           </Select>
//         ),
//       },
//       {
//         title: 'PayPal Integration',
//         dataIndex: 'paypalIntegration',
//         key: 'paypalIntegration',
//         render: (value, record) => (
//           <Select
//             defaultValue={value}
//             style={{ width: 120 }}
//             onChange={(selectedValue) => handleUpdateChange(record._id, 'paypalIntegration', selectedValue)}
//           >
//             {paypalIntegrationOptions.map(option => (
//               <Option key={option} value={option}>{option}</Option>
//             ))}
//           </Select>
//         ),
//       },
   
//     {
//       title: 'Changes',
//       key: 'changes',
//       render: (text, record) => (
//         <Button onClick={() => handleOpenModal(record.enrollmentId)}>View Changes</Button>
//       ),
//     },
//   ];

//   return (
//     <div className="backend-dashboard-container">
//       <Title level={2}>Backend Dashboard</Title>
//       <Search placeholder="Search..." onSearch={handleSearch} enterButton style={{ marginBottom: '20px' }} />
//       <Card>
//         <Table
//           columns={columns}
//           dataSource={filteredContacts}
//           pagination={false}
//           rowKey="_id"
//         />
//       </Card>

//       <Modal
//         title={`Changes for Enrollment ID: ${selectedEnrollmentId}`}
//         visible={modalVisible}
//         onCancel={handleCloseModal}
//         footer={null}
//       >
//         {selectedChanges.length > 0 ? (
//           selectedChanges.map((change, index) => (
//             <div key={index}>
//               <p>{change.changeDescription}</p>
//               <Button onClick={() => handleStatusUpdate(index, 'done')} style={{ marginRight: '10px' }}>Done</Button>
//               <Button onClick={() => handleStatusUpdate(index, 'not done')}>Not Done</Button>
//               <hr />
//             </div>
//           ))
//         ) : (
//           <p>No changes available.</p>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default BackendDashboard;


import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Typography, message, Modal, Button } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const BackendDashboard = ({ selectedEnrollmentId }) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [changes, setChanges] = useState({});
  const [selectedChanges, setSelectedChanges] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedEnrollmentId) {
      fetchContacts(selectedEnrollmentId);
    }
  }, [selectedEnrollmentId]);

  const fetchContacts = async (enrollmentId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/getcontact/${enrollmentId}`);
      setContacts([response.data]); // Set the specific contact data in an array
      setFilteredContacts([response.data]);
      await fetchChangesForContacts([response.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load data. Please try again.");
    }
  };

  const fetchChangesForContacts = async (contacts) => {
    const contactIds = contacts.map(contact => contact._id);
    try {
      const response = await axios.get(`${apiUrl}/api/changes/getChanges`, { params: { contactIds } });
      setChanges(response.data);
    } catch (error) {
      console.error("Error fetching changes:", error);
      message.error("Failed to load changes.");
    }
  };

  const handleOpenModal = (enrollmentId) => {
    const selectedContactChanges = changes[enrollmentId] || [];
    setSelectedChanges(selectedContactChanges);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleStatusUpdate = async (index, status) => {
    const selectedChange = selectedChanges[index];
    try {
      await axios.post(`${apiUrl}/api/changes/updateStatus`, {
        changeId: selectedChange._id,
        status,
      });
      message.success("Status updated successfully!");
      // Refresh the changes data after updating status
      await fetchChangesForContacts(filteredContacts);
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status.");
    }
  };

  const columns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Contact No.',
      dataIndex: 'primaryContact',
      key: 'primaryContact',
    },
    {
      title: 'Manager Position',
      dataIndex: 'managerId',
      key: 'managerPosition',
      render: (managerId) => (managerId && managerId.position ? managerId.position : 'N/A'),
    },
    {
      title: 'GST',
      dataIndex: 'gst',
      key: 'gst',
      render: (text) => (text ? text : 'N/A'),
    },
    {
      title: 'GST Number',
      dataIndex: 'gstNumber',
      key: 'gstNumber',
      render: (text) => (text ? text : 'N/A'),
    },
    {
      title: 'PG Medium',
      dataIndex: 'pgMedium',
      key: 'pgMedium',
      render: (text) => (text ? text : 'N/A'), // Keep functionality as is
    },
    {
      title: 'PG Integration',
      dataIndex: 'pgIntegration',
      key: 'pgIntegration',
      render: (text) => (text ? text : 'N/A'), // Keep functionality as is
    },
    {
      title: 'PayPal Integration',
      dataIndex: 'paypalIntegration',
      key: 'paypalIntegration',
      render: (text) => (text ? text : 'N/A'), // Keep functionality as is
    },
    {
      title: 'Changes',
      key: 'changes',
      render: (text, record) => (
        <Button onClick={() => handleOpenModal(record.enrollmentId)}>View Changes</Button>
      ),
    },
  ];

  return (
    <div className="backend-dashboard-container">
      <Title level={2}>Backend Dashboard</Title>
      <Card>
        <Table
          columns={columns}
          dataSource={filteredContacts}
          pagination={false}
          rowKey="_id"
        />
      </Card>

      <Modal
        title={`Changes for Enrollment ID: ${selectedEnrollmentId}`}
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedChanges.length > 0 ? (
          selectedChanges.map((change, index) => (
            <div key={index}>
              <p>{change.changeDescription}</p>
              <Button onClick={() => handleStatusUpdate(index, 'done')} style={{ marginRight: '10px' }}>Done</Button>
              <Button onClick={() => handleStatusUpdate(index, 'not done')}>Not Done</Button>
              <hr />
            </div>
          ))
        ) : (
          <p>No changes available.</p>
        )}
      </Modal>
    </div>
  );
};

export default BackendDashboard;
