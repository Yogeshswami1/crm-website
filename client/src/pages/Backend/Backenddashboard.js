
// import React, { useEffect, useState } from 'react';
// import { Card, Table, Input, Typography, message, Modal, Button } from 'antd';
// import axios from 'axios';

// const { Title } = Typography;

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const BackendDashboard = ({ selectedEnrollmentId }) => {
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [changes, setChanges] = useState({});
//   const [selectedChanges, setSelectedChanges] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     if (selectedEnrollmentId) {
//       fetchContacts(selectedEnrollmentId);
//     }
//   }, [selectedEnrollmentId]);

//   const fetchContacts = async (enrollmentId) => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/getcontact/${enrollmentId}`);
//       setContacts([response.data]); // Set the specific contact data in an array
//       setFilteredContacts([response.data]);
//       await fetchChangesForContacts([response.data]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       message.error("Failed to load data. Please try again.");
//     }
//   };

//   const fetchChangesForContacts = async (contacts) => {
//     const contactIds = contacts.map(contact => contact._id);
//     try {
//       const response = await axios.get(`${apiUrl}/api/changes/getChanges`, { params: { contactIds } });
//       setChanges(response.data);
//     } catch (error) {
//       console.error("Error fetching changes:", error);
//       message.error("Failed to load changes.");
//     }
//   };

//   const handleOpenModal = (enrollmentId) => {
//     const selectedContactChanges = changes[enrollmentId] || [];
//     setSelectedChanges(selectedContactChanges);
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//   };

//   const handleStatusUpdate = async (index, status) => {
//     const selectedChange = selectedChanges[index];
//     try {
//       await axios.post(`${apiUrl}/api/changes/updateStatus`, {
//         changeId: selectedChange._id,
//         status,
//       });
//       message.success("Status updated successfully!");
//       // Refresh the changes data after updating status
//       await fetchChangesForContacts(filteredContacts);
//     } catch (error) {
//       console.error("Error updating status:", error);
//       message.error("Failed to update status.");
//     }
//   };

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
//     {
//       title: 'PG Medium',
//       dataIndex: 'pgMedium',
//       key: 'pgMedium',
//       render: (text) => (text ? text : 'N/A'), // Keep functionality as is
//     },
//     {
//       title: 'PG Integration',
//       dataIndex: 'pgIntegration',
//       key: 'pgIntegration',
//       render: (text) => (text ? text : 'N/A'), // Keep functionality as is
//     },
//     {
//       title: 'PayPal Integration',
//       dataIndex: 'paypalIntegration',
//       key: 'paypalIntegration',
//       render: (text) => (text ? text : 'N/A'), // Keep functionality as is
//     },
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







// import React, { useEffect, useState } from "react";
// import { Table, Button } from "antd";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";
// import {jwtDecode} from "jwt-decode";


// import PaymentGatewayMediumModal from "./PaymentGatewayMediumModal";


// const apiUrl = process.env.REACT_APP_BACKEND_URL;


// const UserDataTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const history = useHistory();


//   const [visibleModal, setVisibleModal] = useState(null);
//   const [selectedRecord, setSelectedRecord] = useState(null);


//   const openModal = (modalType, record) => {
//     setSelectedRecord(record);
//     setVisibleModal(modalType);
//   };
 //   const closeModal = () => setVisibleModal(null);


//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // Step 1: Get the token from localStorage
//         const token = localStorage.getItem("token");


//         if (!token) {
//           toast.error("No user logged in");
//           history.push("/login");
//           return;
//         }


//         console.log("Extracted token from localStorage:", token);


//         // Step 2: Decode the token to get the user ID
//         const decodedToken = jwtDecode(token);
//         console.log("Decoded Token Data:", decodedToken);
//         const { id, role } = decodedToken;


//         console.log("Logged-in User ID from token:", id);
//         console.log("User role from token:", role);


//         // Step 3: Use the token to fetch the backend user information
//         console.log("Fetching backend user information...");
//         const userResponse = await axios.get(`${apiUrl}/api/backend/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });


//         console.log("Backend User API Response:", userResponse.data);


//         if (!userResponse || !userResponse.data) {
//           toast.error("Failed to fetch backend user");
//           return;
//         }


//         const backendUsers = userResponse.data;


//         if (Array.isArray(backendUsers)) {
//           console.log("List of backend users received:", backendUsers);


//           // Step 4: Find the backend user matching the ID from the token
//           const currentUser = backendUsers.find(user => user.id === id || user._id === id);


//           if (!currentUser) {
//             toast.error("Backend user not found for logged-in user ID");
//             console.log("Error: No matching backend user found for the ID:", id);
//             return;
//           }


//           const backendUserId = currentUser.id || currentUser._id;
//           console.log("Matched Backend User ID:", backendUserId);


//           // Step 5: Fetch the contact data filtered by the matched backendUserId
//           console.log(`Fetching contacts for backend user: ${backendUserId}`);
//           const contactResponse = await axios.get(`${apiUrl}/api/contact/getcontact`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             params: {
//               backendUser: backendUserId, // Pass the backendUser id to filter contacts
//             },
//           });


//           console.log("Contacts API Response:", contactResponse.data);


//           const allContacts = contactResponse.data;


//           // Step 6: Filter contacts to only include entries where backendUser matches the backendUserId
//           const filteredContacts = allContacts.filter(contact => {
//             const match = contact.backendUser === backendUserId;
//             console.log(
//               `Filtering contact with backendUser ${contact.backendUser} - Matches: ${match}`
//             );
//             return match;
//           });


//           console.log("Filtered contacts after matching backendUser ID:", filteredContacts);


//           // Set the filtered data
//           setData(filteredContacts);
//         } else {
//           toast.error("Unexpected response format from backend API");
//         }
//       } catch (error) {
//         toast.error("Failed to fetch data");
//         console.error("Error during fetch:", error.response ? error.response.data : error.message);
//       } finally {
//         setLoading(false);
//       }
//     };


//     fetchData();
//   }, [history]);


//   const columns = [
//     {
//       title: "Enrollment ID",
//       dataIndex: "enrollmentId",
//       key: "enrollmentId",
//     },
//     {
//       title: "Primary Contact",
//       dataIndex: "primaryContact",
//       key: "primaryContact",
//     },
//     {
//       title: 'Manager',
//       dataIndex: ['managerId', 'position'],
//       key: 'manager',
//       render: (manager) => (manager ? manager : 'No Manager'),
//     },
//     {
//       title: "GST",
//       dataIndex: "gst",
//       key: "gst",
//     },
//     {
//       title: "GST Number",
//       dataIndex: "gstNumber",
//       key: "gstNumber",
//     },
//     {
//       title: "Payment Gateway Medium",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.legality === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('paymentGatewayMedium', record)}
//         >
//           Show
//         </Button>
//       ),
//     },   
//   ];


//   return (
//     <>
//     <Table
//       columns={columns}
//       dataSource={data}
//       loading={loading}
//       rowKey="id"
//     />








//     {visibleModal === 'paymentGatewayMedium' && (
//       <PaymentGatewayMediumModal
//         visible={true}
//         onCancel={closeModal}
//         record={selectedRecord}
//         fetchData={fetchData}
//       />
//     )}
//     </>
//   );
// };


// export default UserDataTable;




import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import PaymentGatewayMediumModal from "./PaymentGatewayMediumModal";
import PaymentIntegrationModal from "./PaymentIntegrationModal";
import PaypalIntegrationModal from "./PaypalIntegrationModal";
import ChangesModalBox from "./ChangesModalBox"; // Import the new modal

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const UserDataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [visibleModal, setVisibleModal] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [changes, setChanges] = useState([]);

  const openModal = (modalType, record) => {
    setSelectedRecord(record);
    setVisibleModal(modalType);
  };

  const closeModal = () => setVisibleModal(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No user logged in");
        history.push("/login");
        return;
      }

      const decodedToken = jwtDecode(token);
      const { id } = decodedToken;

      const userResponse = await axios.get(`${apiUrl}/api/backend`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const backendUsers = userResponse.data;

      if (Array.isArray(backendUsers)) {
        const currentUser = backendUsers.find(
          (user) => user.id === id || user._id === id
        );

        if (!currentUser) {
          toast.error("Backend user not found for logged-in user ID");
          return;
        }

        const backendUserId = currentUser.id || currentUser._id;

        const contactResponse = await axios.get(`${apiUrl}/api/contact/getcontact`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            backendUser: backendUserId,
          },
        });

        const filteredContacts = contactResponse.data.filter(
          (contact) => contact.backendUser === backendUserId
        );

        setData(filteredContacts);
      } else {
        toast.error("Unexpected response format from backend API");
      }
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error("Error during fetch:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchChangesForContacts = async (record) => {
    try {
      const response = await axios.get(`${apiUrl}/api/changes/getChanges`, {
        params: { contactIds: record._id }, // Sending only the contact ID directly
      });
      setChanges(response.data); // Set changes data
      openModal("changesModal", record); // Open modal after fetching changes
    } catch (error) {
      console.error("Error fetching changes:", error);
      toast.error("Failed to load changes.");
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [history]);

  const columns = [
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
    },
    {
      title: "Primary Contact",
      dataIndex: "primaryContact",
      key: "primaryContact",
    },
    {
      title: "Manager",
      dataIndex: ["managerId", "position"],
      key: "manager",
      render: (manager) => (manager ? manager : "No Manager"),
    },
    {
      title: "GST",
      dataIndex: "gst",
      key: "gst",
    },
    {
      title: "GST Number",
      dataIndex: "gstNumber",
      key: "gstNumber",
    },
    {
      title: "Payment Gateway Medium",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.legality === "Done" ? "#90EE90" : undefined }}
          onClick={() => openModal("paymentGatewayMedium", record)}
        >
          Show
        </Button>
      ),
    },
    {
      title: "Payment Integration",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.legality === "Done" ? "#90EE90" : undefined }}
          onClick={() => openModal("paymentIntegration", record)}
        >
          Show
        </Button>
      ),
    },
    {
      title: "Paypal Integration",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.legality === "Done" ? "#90EE90" : undefined }}
          onClick={() => openModal("paypalIntegration", record)}
        >
          Show
        </Button>
      ),
    },
    {
      title: "Changes", // New Changes column
      render: (text, record) => (
        <Button onClick={() => fetchChangesForContacts(record)}>View Changes</Button>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />

      {visibleModal === "paymentGatewayMedium" && (
        <PaymentGatewayMediumModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {visibleModal === "paymentIntegration" && (
        <PaymentIntegrationModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {visibleModal === "paypalIntegration" && (
        <PaypalIntegrationModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {visibleModal === "changesModal" && (
        <ChangesModalBox
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
        />
      )}
    </>
  );
};

export default UserDataTable;
