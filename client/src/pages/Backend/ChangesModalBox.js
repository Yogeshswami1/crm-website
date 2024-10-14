// import React, { useEffect, useState } from "react";
// import { Modal, Spin, Alert } from "antd";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ChangesModalBox = ({ visible, onCancel, record }) => {
//   const [changes, setChanges] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchChanges = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/api/contact/changes/${record.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setChanges(response.data.changes || []);
//     } catch (error) {
//       toast.error("Failed to fetch changes");
//       console.error("Error fetching changes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (record && visible) {
//       fetchChanges();
//     }
//   }, [record, visible]);

//   return (
//     <Modal
//       visible={visible}
//       onCancel={onCancel}
//       title="Changes"
//       footer={null}
//     >
//       {loading ? (
//         <Spin />
//       ) : changes.length > 0 ? (
//         <ul>
//           {changes.map((change, index) => (
//             <li key={index}>{change}</li>
//           ))}
//         </ul>
//       ) : (
//         <Alert message="No changes found" type="info" />
//       )}
//     </Modal>
//   );
// };

// export default ChangesModalBox;


import React, { useState } from "react";
import { Modal, Alert, List, Button, Spin, message } from "antd";
import axios from "axios";

const ChangesModalBox = ({ visible, onCancel, changes, record, fetchChanges }) => {
  const [loadingStatusUpdate, setLoadingStatusUpdate] = useState(false);

  const handleStatusUpdate = async (changeId) => {
    try {
      setLoadingStatusUpdate(true);
      const token = localStorage.getItem("token");

      // Make API request to update the status to "Done"
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/changes/${changeId}`,
        { changeStatus: "Done" }, // Make sure this key matches what the backend expects
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      message.success("Status updated to Done!");

      // Re-fetch changes to get the updated data
      fetchChanges();
    }catch (error) {
      if (error.response) {
        // Check if it's an actual error response from the server
        console.error("Response error:", error.response);
        message.error(`Failed to update status: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received:", error.request);
        message.error("Failed to update status: No response from server");
      } else {
        // Something else went wrong
        console.error("Error updating status:", error.message);
        message.error(`Failed to update status: ${error.message}`);
      }
    }
     finally {
      setLoadingStatusUpdate(false);
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={`Changes for Enrollment ID: ${record?.enrollmentId || ""}`}
      footer={null}
    >
      {changes.length > 0 ? (
        <List
          dataSource={changes}
          renderItem={(change) => (
            <List.Item key={change._id}>
              <List.Item.Meta
                title={`Serial Number: ${change.serialNumber}`}
                description={
                  <>
                    <p><strong>Status:</strong> {change.changeStatus}</p>
                    <p><strong>Description:</strong> {change.changeDescription}</p>
                  </>
                }
              />
              {/* Status Update Button */}
              <Button
                type="primary"
                disabled={change.changeStatus === "Done" || loadingStatusUpdate}
                onClick={() => handleStatusUpdate(change._id)}
              >
                {loadingStatusUpdate ? <Spin /> : "Mark as Done"}
              </Button>
            </List.Item>
          )}
        />
      ) : (
        <Alert message="No changes found" type="info" />
      )}
    </Modal>
  );
};

export default ChangesModalBox;
