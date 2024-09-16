// import React, { useState, useEffect } from 'react';
// import { Card, Row, Col, Table, Input, Modal, Button } from 'antd';
// import axios from 'axios';
// import TemplateModal from './TemplateModal'; // Import the template modal
// import Timesheet from './Timesheet'; // Import the timesheet modal

// const { Search } = Input;

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Template = () => {
//   const [userData, setUserData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
//   const [isTimesheetModalVisible, setIsTimesheetModalVisible] = useState(false);
//   const [currentRecord, setCurrentRecord] = useState(null);

//   useEffect(() => {
//     const managerId = localStorage.getItem('managerId');
//     axios
//       .get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
//       .then(response => {
//         const sortedData = response.data.sort((a, b) =>
//           b.enrollmentId.localeCompare(a.enrollmentId)
//         );
//         setUserData(sortedData);
//         setFilteredData(sortedData);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

//   const handleSearch = value => {
//     const filtered = userData.filter(item => item.enrollmentId.includes(value));
//     setFilteredData(filtered);
//   };

//   const openTemplateModal = record => {
//     setCurrentRecord(record);
//     setIsTemplateModalVisible(true);
//   };

//   const openTimesheetModal = record => {
//     setCurrentRecord(record);
//     setIsTimesheetModalVisible(true);
//   };

//   const closeTemplateModal = () => {
//     setIsTemplateModalVisible(false);
//     setCurrentRecord(null);
//   };

//   const closeTimesheetModal = () => {
//     setIsTimesheetModalVisible(false);
//     setCurrentRecord(null);
//   };

//   const handleTimesheetSave = (values) => {
//     console.log('Timesheet data saved:', values);
//     // You can handle the save logic here, such as sending data to the backend.
//   };

//   const columns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     },
//     {
//       title: 'Templates',
//       key: 'templates',
//       render: (text, record) => (
//         <Button type="primary" onClick={() => openTemplateModal(record)}>
//           Open Templates
//         </Button>
//       ),
//     },
//     {
//       title: 'Highlights',
//       key: 'highlights',
//       render: (text, record) => (
//         <Button type="primary" onClick={() => openTimesheetModal(record)}>
//           Select Highlights
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <Row gutter={16}>
//         <Col span={24}>
//           <Card
//             title="Templates Table"
//             style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
//           >
//             <Search
//               placeholder="Search by Enrollment ID"
//               onSearch={handleSearch}
//               enterButton
//               style={{ width: '15rem', marginBottom: '20px' }}
//             />
//             <Table columns={columns} dataSource={filteredData} rowKey="enrollmentId" />
//           </Card>
//         </Col>
//       </Row>

//       {/* Modal for templates */}
//       {isTemplateModalVisible && currentRecord && (
//         <TemplateModal
//           visible={isTemplateModalVisible}
//           onClose={closeTemplateModal}
//           currentRecord={currentRecord}
//           apiUrl={apiUrl}
//         />
//       )}

//       {/* Modal for Timesheet (Highlights) */}
//       {isTimesheetModalVisible && currentRecord && (
//         <Timesheet
//           visible={isTimesheetModalVisible}
//           onClose={closeTimesheetModal}
//           onSave={handleTimesheetSave}
//         />
//       )}
//     </div>
//   );
// };

// export default Template;
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Input, Modal, Button } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TemplateModal from './TemplateModal';
import Timesheet from './Timesheet'; 

const { Search } = Input;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Template = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [isTimesheetModalVisible, setIsTimesheetModalVisible] = useState(false);
  const [isViewHighlightsModalVisible, setIsViewHighlightsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [highlightsTasks, setHighlightsTasks] = useState([]); // Store only the tasks data

  useEffect(() => {
    const managerId = localStorage.getItem('managerId');
    axios
      .get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
      .then(response => {
        const sortedData = response.data.sort((a, b) =>
          b.enrollmentId.localeCompare(a.enrollmentId)
        );
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

  const openTemplateModal = record => {
    setCurrentRecord(record);
    setIsTemplateModalVisible(true);
  };

  const openTimesheetModal = record => {
    setCurrentRecord(record);
    setIsTimesheetModalVisible(true);
  };

  const openViewHighlightsModal = (record) => {
    setCurrentRecord(record);
  
    // Fetch all timesheets for the enrollmentId
    axios
      .get(`${apiUrl}/api/timesheets/${record.enrollmentId}`)
      .then((response) => {
        // Collect tasks from all entries for this enrollmentId
        const allTasks = response.data.reduce((acc, entry) => {
          return [...acc, ...entry.tasks];
        }, []);
  
        setHighlightsTasks(allTasks); // Store all tasks in state
        setIsViewHighlightsModalVisible(true); // Show the modal with tasks data
      })
      .catch((error) => {
        console.error('Error fetching highlights:', error);
      });
  };

  const closeTemplateModal = () => {
    setIsTemplateModalVisible(false);
    setCurrentRecord(null);
  };

  const closeTimesheetModal = () => {
    setIsTimesheetModalVisible(false);
    setCurrentRecord(null);
  };

  const closeViewHighlightsModal = () => {
    setIsViewHighlightsModalVisible(false);
    setHighlightsTasks([]); // Clear tasks data
  };

  const handleTimesheetSave = tasks => {
    const managerId = localStorage.getItem('managerId');
    const enrollmentId = currentRecord.enrollmentId;
  
    axios
      .post(`${apiUrl}/api/timesheets/create`, { managerId, enrollmentId, tasks })
      .then(response => {
        console.log('Timesheet created:', response.data);
        setIsTimesheetModalVisible(false);
  
        // Display success notification with Toastify
        toast.success('Task assign successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(error => {
        console.error('Error creating timesheet:', error);
  
        // Display error notification with Toastify
        toast.error('Error creating timesheet!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
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
        <Button type="primary" onClick={() => openTemplateModal(record)}>
          Open Templates
        </Button>
      ),
    },
    {
      title: 'Assign Task',
      key: 'highlights',
      render: (text, record) => (
        <Button type="primary" onClick={() => openTimesheetModal(record)}>
          Assign Task
        </Button>
      ),
    },
    {
      title: 'View Tasks', // New column
      key: 'viewHighlights',
      render: (text, record) => (
        <Button type="default" onClick={() => openViewHighlightsModal(record)}>
          View Tasks
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="Templates Table"
            style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          >
            <Search
              placeholder="Search by Enrollment ID"
              onSearch={handleSearch}
              enterButton
              style={{ width: '15rem', marginBottom: '20px' }}
            />
            <Table columns={columns} dataSource={filteredData} rowKey="enrollmentId" />
          </Card>
        </Col>
      </Row>

      {/* Modal for templates */}
      {isTemplateModalVisible && currentRecord && (
        <TemplateModal
          visible={isTemplateModalVisible}
          onClose={closeTemplateModal}
          currentRecord={currentRecord}
          apiUrl={apiUrl}
        />
      )}

      {/* Modal for Timesheet (Highlights) */}
      {isTimesheetModalVisible && currentRecord && (
        <Timesheet
          visible={isTimesheetModalVisible}
          onClose={closeTimesheetModal}
          onSave={handleTimesheetSave}
        />
      )}

      {/* Modal for viewing highlights */}
      <Modal
        visible={isViewHighlightsModalVisible}
        title={`Highlights for ${currentRecord?.enrollmentId}`}
        onCancel={closeViewHighlightsModal}
        footer={[
          <Button key="close" onClick={closeViewHighlightsModal}>
            Close
          </Button>,
        ]}
      >
        {highlightsTasks.length > 0 ? (
          highlightsTasks.map((task, index) => (
            <div key={index}>
              <p><strong>Start Date:</strong> {new Date(task.taskDate).toLocaleDateString()}</p>
              <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              <p><strong>Text:</strong> {task.status}</p>
              <p><strong>Status:</strong> {task.worked}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No highlights available</p>
        )}
      </Modal>
    </div>
  );
};

export default Template;
