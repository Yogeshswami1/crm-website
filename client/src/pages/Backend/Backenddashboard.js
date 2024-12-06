




// import React, { useEffect, useState } from "react";
// import { Table, Button } from "antd";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// import PaymentGatewayMediumModal from "./PaymentGatewayMediumModal";
// import PaymentIntegrationModal from "./PaymentIntegrationModal";
// import PaypalIntegrationModal from "./PaypalIntegrationModal";
// import ChangesModalBox from "./ChangesModalBox"; // Import the new modal

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const UserDataTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const history = useHistory();

//   const [visibleModal, setVisibleModal] = useState(null);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [changes, setChanges] = useState([]);

//   const openModal = (modalType, record) => {
//     setSelectedRecord(record);
//     setVisibleModal(modalType);
//   };

//   const closeModal = () => setVisibleModal(null);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         toast.error("No user logged in");
//         history.push("/login");
//         return;
//       }

//       const decodedToken = jwtDecode(token);
//       const { id } = decodedToken;

//       const userResponse = await axios.get(`${apiUrl}/api/backend`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const backendUsers = userResponse.data;

//       if (Array.isArray(backendUsers)) {
//         const currentUser = backendUsers.find(
//           (user) => user.id === id || user._id === id
//         );

//         if (!currentUser) {
//           toast.error("Backend user not found for logged-in user ID");
//           return;
//         }

//         const backendUserId = currentUser.id || currentUser._id;

//         const contactResponse = await axios.get(`${apiUrl}/api/contact/getcontact`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             backendUser: backendUserId,
//           },
//         });

//         const filteredContacts = contactResponse.data.filter(
//           (contact) => contact.backendUser === backendUserId
//         );

//         setData(filteredContacts);
//       } else {
//         toast.error("Unexpected response format from backend API");
//       }
//     } catch (error) {
//       toast.error("Failed to fetch data");
//       console.error("Error during fetch:", error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const fetchChangesForContacts = async (record) => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/changes/getChanges`, {
//         params: { contactIds: record._id }, // Sending only the contact ID directly
//       });
//       setChanges(response.data); // Set changes data
//       openModal("changesModal", record); // Open modal after fetching changes
//     } catch (error) {
//       console.error("Error fetching changes:", error);
//       toast.error("Failed to load changes.");
//     }
//   };
  

//   useEffect(() => {
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
//       title: "Manager",
//       dataIndex: ["managerId", "position"],
//       key: "manager",
//       render: (manager) => (manager ? manager : "No Manager"),
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
//           style={{ backgroundColor: record?.legality === "Done" ? "#90EE90" : undefined }}
//           onClick={() => openModal("paymentGatewayMedium", record)}
//         >
//           Show
//         </Button>
//       ),
//     },
//     {
//       title: "Payment Integration",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.legality === "Done" ? "#90EE90" : undefined }}
//           onClick={() => openModal("paymentIntegration", record)}
//         >
//           Show
//         </Button>
//       ),
//     },
//     {
//       title: "Paypal Integration",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.legality === "Done" ? "#90EE90" : undefined }}
//           onClick={() => openModal("paypalIntegration", record)}
//         >
//           Show
//         </Button>
//       ),
//     },
//     {
//       title: "Changes", // New Changes column
//       render: (text, record) => (
//         <Button onClick={() => fetchChangesForContacts(record)}>View Changes</Button>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />

//       {visibleModal === "paymentGatewayMedium" && (
//         <PaymentGatewayMediumModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//       {visibleModal === "paymentIntegration" && (
//         <PaymentIntegrationModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//       {visibleModal === "paypalIntegration" && (
//         <PaypalIntegrationModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//       {visibleModal === "changesModal" && (
//         <ChangesModalBox
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//         />
//       )}
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
import GSTModal from "./GSTModal";






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
      const response = await axios.get(`${apiUrl}/api/changes/${record.enrollmentId}`);
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
      render: (text, record) => (
        <Button
          style={{
            backgroundColor:
              record?.gst === 'Done' ? '#90EE90' :
              record?.gst === 'Not Done' ? '#FFB6C1' : 'transparent',  // Light green for 'Done', light red for 'Not Done', transparent for blank
          }}
          onClick={() => openModal('gst', record)}
        >
          Show
        </Button>
      ),
    },
 
 
 
 
    {
      title: "Payment Gateway Medium",
      render: (text, record) => (
        <Button
          style={{
            backgroundColor: record?.paymentGatewayMedium ? '#90EE90' : undefined,  // Light green if paymentGatewayMedium has a value
          }}
          onClick={() => openModal('paymentGatewayMedium', record)}
        >
          Show
        </Button>
      ),
    },
 
 
 
 
    {
      title: "Payment Integration",
      render: (text, record) => {
        console.log("Payment Integration Value:", record?.paymentIntegration); // Log to debug
        return (
          <Button
            style={{
              backgroundColor: record?.paymentIntegration === 'Approved'
                ? '#90EE90' // Light green
                : record?.paymentIntegration === 'Applied'
                ? '#FFD700' // Yellow
                : record?.paymentIntegration === 'Rejected'
                ? '#FF6347' // Red
                : undefined, // Default
            }}
            onClick={() => openModal('paymentIntegration', record)}
          >
            {record?.paymentIntegration || "No Status"}
          </Button>
        );
      },
    }
    // {
    //   title: "Payment Integration",
    //   render: (text, record) => (
    //     <Button
    //       style={{
    //         backgroundColor: record?.paymentIntegration === 'Done'
    //           ? '#90EE90' // Light green for Done
    //           : record?.paymentIntegration === 'Not Done'
    //           ? '#FF6347' // Red for Not Done
    //           : undefined, // Default
    //       }}
    //       onClick={() => openModal('paymentIntegration', record)} // Function to open modal
    //     >
    //       {record?.paymentIntegration || "No Status"} {/* Display current status */}
    //     </Button>
    //   ),
    // },
    
    
,
{
  title: "Paypal Integration",
  render: (text, record) => (
    <Button
      style={{
        backgroundColor: record?.paypalIntegration === 'Done'
          ? '#90EE90' // Light green for Done
          : record?.paypalIntegration === 'Not Done'
          ? '#FF6347' // Red for Not Done
          : undefined, // Default if no matching value
      }}
      onClick={() => openModal('paypalIntegration', record)} // Function to open modal
    >
      {record?.paypalIntegration || "No Status"} {/* Display current status */}
    </Button>
  ),
},

// {
//   title: "Paypal Integration",
//   render: (text, record) => (
//     <Button
//       style={{
//         backgroundColor: record?.paypalIntegration === 'Approved'
//           ? '#90EE90' // Light green for Approved
//           : record?.paypalIntegration === 'Applied'
//           ? '#FFD700' // Yellow for Applied
//           : record?.paypalIntegration === 'Rejected'
//           ? '#FF6347' // Red for Rejected
//           : undefined, // Default
//       }}
//       onClick={() => openModal('paypalIntegration', record)} // Function to open modal
//     >
//       {record?.paypalIntegration || "No Status"} {/* Display current status */}
//     </Button>
//   ),
// },

 
 
 
 
 
 
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
      {visibleModal === 'gst' && (
       <GSTModal
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
    changes={changes} // Pass changes data to modal
    record={selectedRecord} // Pass the selected record
    fetchChanges={() => fetchChangesForContacts(selectedRecord)} // Pass the fetch function
  />
)}

    </>
  );
};

export default UserDataTable;
