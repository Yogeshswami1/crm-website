// import React, { useEffect, useState } from 'react';
// import { Card, Table, Input, Typography, Modal, message, Switch } from 'antd';
// import axios from 'axios';
// import './Dash.css';
// import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';

// const { Search } = Input;
// const { Title } = Typography;

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Dash = () => {
//   const [userData, setUserData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);

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

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
//       setContacts(response.data);
//       setFilteredContacts(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       message.error("Failed to load data. Please try again.");
//     }
//   };

//   const handleSearch = (value) => {
//     const filteredUserData = userData.filter(item => {
//       const enrollmentIdMatch = item.enrollmentId.toLowerCase().includes(value.toLowerCase());
//       const nameMatch = item.name.toLowerCase().includes(value.toLowerCase());
//       const emailMatch = item.email.toLowerCase().includes(value.toLowerCase());
//       const primaryContactMatch = item.primaryContact.toLowerCase().includes(value.toLowerCase());

//       return enrollmentIdMatch || nameMatch || emailMatch || primaryContactMatch;
//     });

//     const filteredContactData = contacts.filter(contact => {
//       const enrollmentIdMatch = contact.enrollmentId.toLowerCase().includes(value.toLowerCase());
//       const nameMatch = contact.name.toLowerCase().includes(value.toLowerCase());
//       const emailMatch = contact.email.toLowerCase().includes(value.toLowerCase());
//       const primaryContactMatch = contact.primaryContact.toLowerCase().includes(value.toLowerCase());

//       return enrollmentIdMatch || nameMatch || emailMatch || primaryContactMatch;
//     });

//     setFilteredData(filteredUserData); // For Payment Table
//     setFilteredContacts(filteredContactData); // For Contact Table
//   };

//   const handleEnrollmentClick = (record) => {
//     setSelectedContact(record);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setSelectedContact(null);
//   };

//   const handleBillsToggle = async (record, checked) => {
//     const updatedStatus = checked ? 'Sent' : 'Not Sent';
//     try {
//       await axios.put(`${apiUrl}/api/contact/updatebills/${record._id}`, {
//         billsSent: checked
//       });
//       message.success(`Bills status updated to ${updatedStatus} for ${record.name}`);
//       fetchContacts();  // Refresh the data
//     } catch (error) {
//       console.error("Error updating bills status:", error);
//       message.error("Failed to update bills status. Please try again.");
//     }
//   };

//   const paymentColumns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//       render: (text, record) => <a onClick={() => handleEnrollmentClick(record)}>{text}</a>,
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
//         {
//           title: 'Payment Date',  // New Column for Payment Date
//           dataIndex: ['payment', 'stage1', 'date'],  // Updated to point to 'date'
//           key: 'stage1PaymentDate',
//           render: (text) => (text ? new Date(text).toLocaleDateString() : 'N/A'),  // Format date
//         },
//         {
//           title: 'Payment Mode',  // New Column for Payment Mode
//           dataIndex: ['payment', 'stage1', 'paymentMode'],  // Updated to point to 'paymentMode'
//           key: 'stage1PaymentMode',
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
//         {
//           title: 'Payment Date',  // New Column for Payment Date
//           dataIndex: ['payment', 'stage2', 'date'],  // Updated to point to 'date'
//           key: 'stage2PaymentDate',
//           render: (text) => (text ? new Date(text).toLocaleDateString() : 'N/A'),  // Format date
//         },
//         {
//           title: 'Payment Mode',  // New Column for Payment Mode
//           dataIndex: ['payment', 'stage2', 'paymentMode'],  // Updated to point to 'paymentMode'
//           key: 'stage2PaymentMode',
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
//         {
//           title: 'Payment Date',  // New Column for Payment Date
//           dataIndex: ['payment', 'stage3', 'date'],  // Updated to point to 'date'
//           key: 'stage3PaymentDate',
//           render: (text) => (text ? new Date(text).toLocaleDateString() : 'N/A'),  // Format date
//         },
//         {
//           title: 'Payment Mode',  // New Column for Payment Mode
//           dataIndex: ['payment', 'stage3', 'paymentMode'],  // Updated to point to 'paymentMode'
//           key: 'stage3PaymentMode',
//         },
//       ],
//     },
//   ];

 

//   const contactColumns = [
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//       render: (text) => new Date(text).toLocaleDateString(),
//     },
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Mobile Number',
//       dataIndex: 'primaryContact',
//       key: 'primaryContact',
//     },
//     {
//       title: 'Email ID',
//       dataIndex: 'email',
//       key: 'email',
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
//     {
//       title: 'State',
//       dataIndex: 'state',
//       key: 'state',
//       render: (text) => (text ? text : 'Not Provided'),
//     },
//     {
//       title: 'Legality',
//       dataIndex: 'legality',
//       key: 'legality',
//       render: (text) => (text && text !== 'Not Done' ? text : 'Not Done'),
//     },
//     {
//       title: 'Legality Link',
//       dataIndex: 'legalityLink',
//       key: 'legalityLink',
//       render: (text, record) => (
//         text ? (
//           <div>
//             <a href={text} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
//               <EyeOutlined style={{ fontSize: '18px', color: '#1890ff' }} title="View Document" />
//             </a>
//             <a
//               href={text}
//               download
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <DownloadOutlined style={{ fontSize: '18px', color: '#52c41a' }} title="Download Document" />
//             </a>
//           </div>
//         ) : 'No Link Available'
//       ),
//     },
//     {
//       title: 'Bills',
//       key: 'billsSent',
//       render: (text, record) => (
//         <Switch
//           checked={record.billsSent}
//           onChange={(checked) => handleBillsToggle(record, checked)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="dash-container">
//       <Title level={2}>Payment Overview</Title>
//       <Search placeholder="Search..." onSearch={handleSearch} enterButton style={{ marginBottom: '20px' }} />
//       <Card>
//         <Table
//           columns={paymentColumns}
//           dataSource={filteredData}
//           pagination={false}
//           rowKey="enrollmentId"
//         />
//       </Card>
//       <Title level={2} style={{ marginTop: '40px' }}>Contact Information</Title>
//       <Card>
//         <Table
//           columns={contactColumns}
//           dataSource={filteredContacts}
//           pagination={false}
//           rowKey="_id"
//         />
//       </Card>
//       <Modal
//         title="Contact Details"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         {selectedContact && (
//           <div>
//             <p><strong>Name:</strong> {selectedContact.name}</p>
//             <p><strong>Enrollment ID:</strong> {selectedContact.enrollmentId}</p>
//             <p><strong>Email:</strong> {selectedContact.email}</p>
//             <p><strong>Mobile Number:</strong> {selectedContact.primaryContact}</p>
//             <p><strong>GST Number:</strong> {selectedContact.gstNumber || 'N/A'}</p>
//             <p><strong>GST:</strong> {selectedContact.gst || 'N/A'}</p>
//             <p><strong>State:</strong> {selectedContact.state || 'Not Provided'}</p>
//             <p><strong>Legality:</strong> {selectedContact.legality || 'Not Done'}</p>
//             <p><strong>Legality Link:</strong> <a href={selectedContact.legalityLink} target="_blank" rel="noopener noreferrer">{selectedContact.legalityLink}</a></p>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Dash;
// import React, { useEffect, useState } from 'react';
// import { Card, Table, Input, Typography, Modal, message, Switch, Button } from 'antd';
// import axios from 'axios';
// import './Dash.css';
// import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';

// const { Search } = Input;
// const { Title } = Typography;

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Dash = () => {
//   const [userData, setUserData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [activeSection, setActiveSection] = useState('payment'); // For toggling between sections
//   const [dataSource, setDataSource] = useState([]);

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

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
//       setContacts(response.data);
//       setFilteredContacts(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       message.error("Failed to load data. Please try again.");
//     }
//   };

//   const handleSearch = (value) => {
//     const filteredUserData = userData.filter(item => {
//       const enrollmentIdMatch = item.enrollmentId.toLowerCase().includes(value.toLowerCase());
//       const nameMatch = item.name.toLowerCase().includes(value.toLowerCase());
//       const emailMatch = item.email.toLowerCase().includes(value.toLowerCase());
//       const primaryContactMatch = item.primaryContact.toLowerCase().includes(value.toLowerCase());

//       return enrollmentIdMatch || nameMatch || emailMatch || primaryContactMatch;
//     });

//     const filteredContactData = contacts.filter(contact => {
//       const enrollmentIdMatch = contact.enrollmentId.toLowerCase().includes(value.toLowerCase());
//       const nameMatch = contact.name.toLowerCase().includes(value.toLowerCase());
//       const emailMatch = contact.email.toLowerCase().includes(value.toLowerCase());
//       const primaryContactMatch = contact.primaryContact.toLowerCase().includes(value.toLowerCase());

//       return enrollmentIdMatch || nameMatch || emailMatch || primaryContactMatch;
//     });

//     setFilteredData(filteredUserData); // For Payment Table
//     setFilteredContacts(filteredContactData); // For Contact Table
//   };

//   const handleEnrollmentClick = (record) => {
//     setSelectedContact(record);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setSelectedContact(null);
//   };

//   const handleBillsToggle = async (record, checked) => {
//     const updatedStatus = checked ? 'Sent' : 'Not Sent';
//     try {
//       await axios.put(`${apiUrl}/api/contact/updatebills/${record._id}`, {
//         billsSent: checked
//       });
//       message.success(`Bills status updated to ${updatedStatus} for ${record.name}`);
//       fetchContacts();  // Refresh the data
//     } catch (error) {
//       console.error("Error updating bills status:", error);
//       message.error("Failed to update bills status. Please try again.");
//     }
//   };
// const handleLegalityToggle = async (record, checked) => {
//   const updatedStatus = checked ? 'Completed' : 'Pending';
//   try {
//     await axios.put(`${apiUrl}/api/contact/updatelegality/${record._id}`, {
//       legalityStatus: checked
//     });
//     message.success(`Legality status updated to ${updatedStatus} for ${record.name}`);
//     fetchContacts(); // Refresh the data
//   } catch (error) {
//     console.error("Error updating legality status:", error);
//     message.error("Failed to update legality status. Please try again.");
//   }
// };


// const paymentColumns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//       render: (text, record) => <a onClick={() => handleEnrollmentClick(record)}>{text}</a>,
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
//         {
//           title: 'Payment Date',
//           dataIndex: ['payment', 'stage1', 'date'],
//           key: 'stage1PaymentDate',
//           render: (text) => (text ? new Date(text).toLocaleDateString() : 'N/A'),
//         },
//         {
//           title: 'Payment Mode',
//           dataIndex: ['payment', 'stage1', 'paymentMode'],
//           key: 'stage1PaymentMode',
//         },
//       ],
//     },
//         {
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
//         {
//           title: 'Payment Date',  // New Column for Payment Date
//           dataIndex: ['payment', 'stage2', 'date'],  // Updated to point to 'date'
//           key: 'stage2PaymentDate',
//           render: (text) => (text ? new Date(text).toLocaleDateString() : 'N/A'),  // Format date
//         },
//         {
//           title: 'Payment Mode',  // New Column for Payment Mode
//           dataIndex: ['payment', 'stage2', 'paymentMode'],  // Updated to point to 'paymentMode'
//           key: 'stage2PaymentMode',
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
//         {
//           title: 'Payment Date',  // New Column for Payment Date
//           dataIndex: ['payment', 'stage3', 'date'],  // Updated to point to 'date'
//           key: 'stage3PaymentDate',
//           render: (text) => (text ? new Date(text).toLocaleDateString() : 'N/A'),  // Format date
//         },
//         {
//           title: 'Payment Mode',  // New Column for Payment Mode
//           dataIndex: ['payment', 'stage3', 'paymentMode'],  // Updated to point to 'paymentMode'
//           key: 'stage3PaymentMode',
//         },
//       ],
//     },
//   ];
  

//   const contactColumns = [
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//       render: (text) => new Date(text).toLocaleDateString(),
//     },
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     },
//         {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Mobile Number',
//       dataIndex: 'primaryContact',
//       key: 'primaryContact',
//     },
//     {
//       title: 'Email ID',
//       dataIndex: 'email',
//       key: 'email',
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
//     {
//       title: 'State',
//       dataIndex: 'state',
//       key: 'state',
//       render: (text) => (text ? text : 'Not Provided'),
//     },
//     {
//       title: 'TL Position Name',
//       dataIndex: 'managerId',
//       key: 'tlPositionName',
//       render: (text) => (text && text.position ? text.position : 'Not Provided'),
//     },
//     {
//       title: 'Legality',
//       dataIndex: 'legality',
//       key: 'legality',
//       render: (text) => (text && text !== 'Not Done' ? text : 'Not Done'),
//     },
//     {
//       title: 'Legality Link',
//       dataIndex: 'legalityLink',
//       key: 'legalityLink',
//       render: (text, record) => (
//         text ? (
//           <div>
//             <a href={text} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
//               <EyeOutlined style={{ fontSize: '18px', color: '#1890ff' }} title="View Document" />
//             </a>
//             <a
//               href={text}
//               download
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <DownloadOutlined style={{ fontSize: '18px', color: '#52c41a' }} title="Download Document" />
//             </a>
//           </div>
//         ) : 'No Link Available'
//       ),
//     },
//     {
//       title: 'Legality Status',
//       key: 'legalityStatus',
//       render: (text, record) => (
//         <Switch
//           checked={record.legalityStatus}
//           onChange={(checked) => handleLegalityToggle(record, checked)}
//         />
//       ),
//     },
    
  
//     {
//       title: 'Bills',
//       key: 'billsSent',
//       render: (text, record) => (
//         <Switch
//           checked={record.billsSent}
//           onChange={(checked) => handleBillsToggle(record, checked)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="dash-container">
//       <Title level={2}>Accountant Dashboard</Title>

//       {/* Toggle buttons for sections */}
//       <div style={{ marginBottom: '20px' }}>
//         <Button
//           type={activeSection === 'payment' ? 'primary' : 'default'}
//           onClick={() => setActiveSection('payment')}
//           style={{ marginRight: '10px' }}
//         >
//           Payment Section
//         </Button>
//         <Button
//           type={activeSection === 'contact' ? 'primary' : 'default'}
//           onClick={() => setActiveSection('contact')}
//         >
//           Contact Section
//         </Button>
//       </div>

//       {/* Payment Section */}
//    {/* Payment Section */}
//    {activeSection === 'payment' && (
//       <>
//         <Search placeholder="Search Payment..." onSearch={handleSearch} enterButton style={{ marginBottom: '20px' }} />
//         <Card>
//           <div style={{ overflowX: 'auto' }}>
//             {/* <Table
//               columns={paymentColumns}
//               dataSource={filteredData}
//               pagination={false}
//               rowKey="enrollmentId"
//               scroll={{ x: 'max-content' }} // Allow horizontal scrolling
//             /> */}
//             <Table
//   columns={paymentColumns}
//   dataSource={filteredData}
//   pagination={false}
//   rowKey="enrollmentId"
//   scroll={{ x: 1500 }} // Set to the total width you expect
// />

//           </div>
//         </Card>
//       </>
//     )}

//        {/* Contact Section */}
//     {activeSection === 'contact' && (
//       <>
//         <Search placeholder="Search Contact..." onSearch={handleSearch} enterButton style={{ marginBottom: '20px' }} />
//         <Card>
//           <div style={{ overflowX: 'auto' }}>
//             <Table
//               columns={contactColumns}
//               dataSource={filteredContacts}
//               pagination={false}
//               rowKey="_id"
//               scroll={{ x: 'max-content' }} // Allow horizontal scrolling
//             />
//           </div>
//         </Card>
//       </>
//     )}
//       <Modal
//         title="Contact Details"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         {selectedContact && (
//           <div>
//             <p><strong>Name:</strong> {selectedContact.name}</p>
//             <p><strong>Enrollment ID:</strong> {selectedContact.enrollmentId}</p>
//             <p><strong>Email:</strong> {selectedContact.email}</p>
//             <p><strong>Mobile Number:</strong> {selectedContact.primaryContact}</p>
//             <p><strong>Email:</strong> {selectedContact.email}</p>
//             <p><strong>GST:</strong> {selectedContact.gst || 'N/A'}</p>
//             <p><strong>GST Number:</strong> {selectedContact.gstNumber || 'N/A'}</p>
//             <p><strong>State:</strong> {selectedContact.state || 'Not Provided'}</p>
//             <p><strong>TL Position Name:</strong> {selectedContact.managerId?.position || 'Not Provided'}</p>
//             {/* More contact details... */}
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Dash;















import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Typography, Modal, Switch, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './Dash.css';








const { Search } = Input;
const { Title } = Typography;








const apiUrl = process.env.REACT_APP_BACKEND_URL;








const Dash = () => {
const [userData, setUserData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedContact, setSelectedContact] = useState(null);








const [legalityStatus, setLegalityStatus] = useState(selectedContact?.legalityStatus || 'false');
const [billSent, setBillSent] = useState(selectedContact?.billSent || 'false');
const fetchContacts = () => {
  axios.get(`${apiUrl}/api/contact/getcontact`)
    .then(response => {
      // Filter by 'WEBSITE' service
      const websiteServiceData = response.data.filter(item => item.service === 'WEBSITE');








      // Sort data by enrollmentId in descending order
      const sortedData = websiteServiceData.sort((a, b) => {
        // Extract numeric part from enrollmentId (e.g., WB100 -> 100)
        const aId = parseInt(a.enrollmentId.replace(/[^\d]/g, ''), 10);
        const bId = parseInt(b.enrollmentId.replace(/[^\d]/g, ''), 10);








        return bId - aId; // Sort in descending order based on the numeric part
      });








      setUserData(sortedData);
      setFilteredData(sortedData);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
};








// Call fetchContacts on component mount
useEffect(() => {
 if (selectedContact) {
   setBillSent(selectedContact.billsSent === 'true' ? 'true' : 'false');
   setLegalityStatus(selectedContact.legalityStatus === 'true' ? 'true' : 'false');
 }
}, [selectedContact]);






// For fetching contacts only once when the component mounts
useEffect(() => {
 fetchContacts();
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












const handleLegalityStatusChange = async (record, checked) => {
 const updatedStatus = checked ? 'true' : 'false';
  // Update local state for live UI feedback
 setLegalityStatus(updatedStatus);


 try {
   await axios.put(`${apiUrl}/api/contact/${record._id}`, {
     legalityStatus: updatedStatus, // Send updated status to backend
   });
   message.success(`Legality status updated to ${updatedStatus} for ${record.name}`);
   fetchContacts(); // Optionally refresh the data from the server
 } catch (error) {
   console.error("Error updating legality status:", error);
   message.error("Failed to update legality status. Please try again.");
 }
};


const handleBillSentChange = async (record, checked) => {
 const updatedStatus = checked ? 'true' : 'false';


 // Update local state for live UI feedback
 setBillSent(updatedStatus);


 try {
   await axios.put(`${apiUrl}/api/contact/${record._id}`, {
     billsSent: updatedStatus, // Send updated status to backend
   });
   message.success(`Bills status updated to ${updatedStatus} for ${record.name}`);
   fetchContacts();  // Optionally refresh the data from the server
 } catch (error) {
   console.error("Error updating bills status:", error);
   message.error("Failed to update bills status. Please try again.");
 }
};




const paymentColumns = [
 {
   title: 'Enrollment ID',
   dataIndex: 'enrollmentId',
   key: 'enrollmentId',
   width: 130,
   render: (text, record) => {
     let backgroundColor = '';
      // Check conditions for legalityStatus and billsSent
     if (record.legalityStatus === 'true' && record.billsSent === 'true') {
       // Both statuses true, split background (half yellow, half green)
       backgroundColor = 'linear-gradient(90deg, yellow 70%, lightgreen 30%)';
     } else if (record.legalityStatus === 'true') {
       // Only legalityStatus true, full yellow background
       backgroundColor = 'yellow';
     } else if (record.billsSent === 'true') {
       // Only billsSent true, full green background
       backgroundColor = 'lightgreen';
     }
      // Apply the background color (gradient or solid)
     return (
       <a
         onClick={() => handleEnrollmentClick(record)}
         style={{ background: backgroundColor, padding: '5px', borderRadius: '4px', display: 'inline-block', width: '100%' }} // Apply the gradient and other styles
       >
         {text}
       </a>
     );
   },
 },
   {
    title: 'Stage 1 Payment',
    children: [
     {
       title: 'Date',
       dataIndex: ['payment', 'stage1', 'date'],
       key: 'stage1PaymentDate',
       render: (date) => date ? moment(date).format('DD-MM-YYYY') : 'N/A',
     },     
     {
       title: 'Mode',
       dataIndex: ['payment', 'stage1', 'paymentMode'],
       key: 'stage1PaymentAmount',
     },
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
       title: 'Date',
       dataIndex: ['payment', 'stage2', 'date'],
       key: 'stage2PaymentDate',
       render: (date) => date ? moment(date).format('DD-MM-YYYY') : 'N/A',
     },
    
     {
       title: 'Mode',
       dataIndex: ['payment', 'stage2', 'paymentMode'],
       key: 'stage2PaymentAmount',
     },
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
       title: 'Date',
       dataIndex: ['payment', 'stage3', 'date'],
       key: 'stage3PaymentDate',
       render: (date) => date ? moment(date).format('DD-MM-YYYY') : 'N/A',
     },
    
     {
       title: 'Mode',
       dataIndex: ['payment', 'stage3', 'paymentMode'],
       key: 'stage3PaymentAmount',
     },
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








const dataSource = [
  {
    key: '1',
    label: 'Date',
    value: selectedContact?.date ? moment(selectedContact.date).format('DD-MM-YYYY') : 'N/A',
  },
  {
    key: '2',
    label: 'Enrollment ID',
    value: selectedContact?.enrollmentId || 'N/A',
  },
  {
    key: '3',
    label: 'Name',
    value: selectedContact?.name || 'N/A',
  },
  {
    key: '4',
    label: 'Primary Contact',
    value: selectedContact?.primaryContact || 'N/A',
  },
  {
    key: '5',
    label: 'Email',
    value: selectedContact?.email || 'N/A',
  },
  {
    key: '6',
    label: 'GST',
    value: selectedContact?.gst || 'N/A',
  },
  {
    key: '7',
    label: 'GST Number',
    value: selectedContact?.gstNumber || 'N/A',
  },
  {
    key: '8',
    label: 'State',
    value: selectedContact?.state || 'N/A',
  },
  {
    key: '9',
    label: 'Manager',
    value: selectedContact?.managerId?.position || 'N/A', // Safely access nested property
  },
  {
    key: '10',
    label: 'Legality',
    value: selectedContact?.legality || 'N/A',
  },
  {
    key: '11',
    label: 'Legality Link',
    value: selectedContact?.legalityLink ? (
      <a href={selectedContact.legalityLink} target="_blank" rel="noopener noreferrer">Open Legality Link</a>
    ) : 'N/A',
  },
  {
   key: '12',
   label: 'Legality Status',
   value: (
     <Switch
       checked={legalityStatus === 'true'}
       onChange={(checked) => handleLegalityStatusChange(selectedContact, checked)}
       checkedChildren="true"
       unCheckedChildren="false"
     />
   ),
 },
 {
   key: '13',
   label: 'Bill Sent',
   value: (
     <Switch
       checked={billSent === 'true'}
       onChange={(checked) => handleBillSentChange(selectedContact, checked)}
       checkedChildren="true"
       unCheckedChildren="false"
     />
   ),
 },




];








const columns = [
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];
return (
  <div style={{ maxHeight: '1000px', overflowY: 'auto',padding: '20px' }}>
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
       <Table
         dataSource={dataSource}
         columns={columns}
         pagination={false} // Disable pagination
         showHeader={false} // Hide the header
       />
     </Modal>
   
      )}
    </Card>
  </div>
);
};








export default Dash;

































