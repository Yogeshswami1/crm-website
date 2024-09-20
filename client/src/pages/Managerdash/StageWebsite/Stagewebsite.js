// import React, { useState, useEffect } from 'react';
// import { Table, Modal, Input, Button, List } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import Callmodal from "./Callmodal";
// import { toast } from "react-toastify";
// import Stage1PaymentModal from './Stage1PaymentModal';
// import LegalityModal from './LegalityModal';
// import OnboardingVideoCallModal from './OnboardingVideoCallModal';
// import IDCardModal from './IDCardModal';
// import ThemeModal from './ThemeModal';
// import Stage1CompletionModal from './Stage1CompletionModal';

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Stagewebsite = (record) => {
//   const [data, setData] = useState([]);
//   const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
//   const [isContactModalVisible, setIsContactModalVisible] = useState(false);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [remarks, setRemarks] = useState([]);
//   const [newRemark, setNewRemark] = useState('');
//   const [visibleModal, setVisibleModal] = useState(null);
//   const [selectedRecord, setSelectedRecord] = useState(null);
  
// const openModal = (modalType, record) => {
//   setSelectedRecord(record);
//   setVisibleModal(modalType);
// };
  
// const closeModal = () => setVisibleModal(null);


//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const managerId = localStorage.getItem("managerId");
  
//       if (!managerId) {
//         throw new Error("Manager ID not found in local storage");
//       }
  
//       const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
  
//       if (response.status !== 200) {
//         throw new Error(`Failed to fetch data: Status code ${response.status}`);
//       }
  
//       // Process data
//       const processedData = response.data.map((item) => ({
//         ...item,
//         simpleStatus: {
//           legality: item.legality?.startsWith('Done') ? 'Done' : 'Not Done',
//           ovc: item.ovc?.startsWith('Done') ? 'Done' : 'Not Done',
//           idCard: item.idCard?.startsWith('Done') ? 'Done' : 'Not Done',
//           stage1Completion: item.stage1Completion?.startsWith('Done') ? 'Done' : 'Not Done',
//         }
//       }));
  
//       // Filter and sort data by enrollmentId in descending order
//       const filteredData = processedData
//         .filter(item => item.callDone?.startsWith('true') && !item.archive?.startsWith('true'))
//         .sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
  
//       setData(filteredData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
  
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           console.error("Response error:", error.response.data);
//           toast.error(`Error: ${error.response.data.message || "Failed to fetch data"}`);
//         } else if (error.request) {
//           console.error("No response received:", error.request);
//           toast.error("No response from server. Please check your network connection.");
//         } else {
//           console.error("Request setup error:", error.message);
//           toast.error(`Error setting up request: ${error.message}`);
//         }
//       } else {
//         console.error("General error:", error.message);
//         toast.error(`Error: ${error.message}`);
//       }
//     }
//   };
  

//   const handleOpenRemarksModal = (record) => {
//     setCurrentRecord(record);
//     setRemarks(record.remarks || []);
//     setIsRemarksModalVisible(true);
//   };

//   const handleOpenContactModal = (record) => {
//     setCurrentRecord(record);
//     setIsContactModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsRemarksModalVisible(false);
//     setIsContactModalVisible(false);
//     setCurrentRecord(null);
//     setNewRemark('');
//   };


//   const handleAddRemark = async () => {
//     if (!newRemark) {
//       toast.error('Remark cannot be empty');
//       return;
//     }
//     try {
//       const updatedRemarks = [...remarks, { text: newRemark, date: new Date() }];
//       await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
//       toast.success("Remark added successfully");
//       setRemarks(updatedRemarks);
//       setNewRemark('');
//       fetchData();
//     } catch (error) {
//       toast.error("Failed to add remark");
//     }
//   };

//   const handleDeleteRemark = async (remark) => {
//     const updatedRemarks = remarks.filter(r => r._id !== remark._id);
//     try {
//       await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
//       toast.success("Remark deleted successfully");
//       setRemarks(updatedRemarks);
//       fetchData();
//     } catch (error) {
//       toast.error("Failed to delete remark");
//     }
//   };

  
//   const stageColumns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//       render: (text) => moment(text).format('DD-MM-YYYY'),
//     },
//     {
//       title: "Enrollment ID",
//       dataIndex: "enrollmentId",
//       key: "enrollmentId",
//       fixed: 'left',
//       render: (text, record) => (
//         <Button type="link" onClick={() => handleOpenContactModal(record)}>
//           {text}
//         </Button>
//       ),
//     },
//     {
//       title: "Stage 1 Payment",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.payment?.stage1?.status === "Done" ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('payment', record)}
//         >
//           Edit Payment
//         </Button>
//       ),
//     },    
//     {
//       title: "Legality",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.legality === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('legality', record)}
//         >
//           Legality
//         </Button>
//       ),
//     },    
//     {
//       title: "OVC",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.ovc === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('videoCall', record)}
//         >
//           Onboarding Video Call
//         </Button>
//       ),
//     },  
//     {
//       title: "ID Card",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.idCard === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('idCard', record)}
//         >
//           ID Card
//         </Button>
//       ),
//     },  
//     {
//       title: "Theme",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.theme ? '#90EE90' : undefined }}  // Light green if selectedTheme has a value
//           onClick={() => openModal('theme', record)}
//         >
//           Theme
//         </Button>
//       ),
//     },    
//     {
//       title: "Stage 1 Completion",
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.stage1Completion === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
//           onClick={() => openModal('stageCompletion', record)}
//         >
//           Stage 1 Completion
//         </Button>
//       ),
//     },  
//     {
//       title: "Remarks",
//       key: "remarks",
//       render: (text, record) => (
//         <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
//       ),
//     }
//   ];

//   return (
//     <div>
//       <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
//       <Table columns={stageColumns} dataSource={data} rowKey="_id" scroll={{ x: 'max-content', y: 601 }} sticky />
//       </div>

//       {/* payment stage 1 modal */}

//       {visibleModal === 'payment' && (
//         <Stage1PaymentModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//       {/* legality modal */}

//       {visibleModal === 'legality' && (
//         <LegalityModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//       {/* onboarding video call modal */}

//       {visibleModal === 'videoCall' && (
//         <OnboardingVideoCallModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//       {/* id card modal */}

//       {visibleModal === 'idCard' && (
//         <IDCardModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//       {/* theme modal */}

//       {visibleModal === 'theme' && (
//         <ThemeModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

//       {/* stage 1 completion modal */}

//       {visibleModal === 'stageCompletion' && (
//         <Stage1CompletionModal
//           visible={true}
//           onCancel={closeModal}
//           record={selectedRecord}
//           fetchData={fetchData}
//         />
//       )}

     
// {/* Remarks Modal */}

//       <Modal
//         title="Remarks"
//         open={isRemarksModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <List
//           dataSource={remarks}
//           renderItem={(item) => (
//             <List.Item
//               actions={[<Button onClick={() => handleDeleteRemark(item)}>Delete</Button>]}
//             >
//               <List.Item.Meta
//                 title={moment(item.date).format('DD-MM-YYYY')}
//                 description={item.text}
//               />
//             </List.Item>
//           )}
//         />
//         <Input.TextArea
//           rows={4}
//           value={newRemark}
//           onChange={(e) => setNewRemark(e.target.value)}
//         />
//         <Button type="primary" onClick={handleAddRemark}>Add Remark</Button>
//       </Modal>

//       <Callmodal
//         visible={isContactModalVisible}
//         onCancel={handleCancel}
//         record={currentRecord}
//       />
//     </div>
//   );
// };

// export default Stagewebsite;

import React, { useState, useEffect } from 'react';
import { Table, Modal, Input, Button, List } from 'antd';
import axios from 'axios';
import moment from 'moment';
import Callmodal from "./Callmodal";
import { toast } from "react-toastify";
import Stage1PaymentModal from './Stage1PaymentModal';
import LegalityModal from './LegalityModal';
import OnboardingVideoCallModal from './OnboardingVideoCallModal';
import IDCardModal from './IDCardModal';
import ThemeModal from './ThemeModal';
import Stage1CompletionModal from './Stage1CompletionModal';
import './StageCss.css';
import SocialContentModal from './SocialContentModal';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Stagewebsite = (record) => {
  const [data, setData] = useState([]);
  const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState('');
  const [visibleModal, setVisibleModal] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  const openModal = (modalType, record) => {
    setSelectedRecord(record);
    setVisibleModal(modalType);
  };
  
  const closeModal = () => setVisibleModal(null);

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const managerId = localStorage.getItem("managerId");
  
  //     if (!managerId) {
  //       throw new Error("Manager ID not found in local storage");
  //     }
  
  //     const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
  
  //     if (response.status !== 200) {
  //       throw new Error(`Failed to fetch data: Status code ${response.status}`);
  //     }
  
  //     // Process data
  //     const processedData = response.data.map((item) => ({
  //       ...item,
  //       simpleStatus: {
  //         legality: item.legality?.startsWith('Done') ? 'Done' : 'Not Done',
  //         ovc: item.ovc?.startsWith('Done') ? 'Done' : 'Not Done',
  //         idCard: item.idCard?.startsWith('Done') ? 'Done' : 'Not Done',
  //         stage1Completion: item.stage1Completion?.startsWith('Done') ? 'Done' : 'Not Done',
  //       }
  //     }));
  
  //     // Filter and sort data by enrollmentId in descending order
  //     const filteredData = processedData
  //       .filter(item => item.callDone?.startsWith('true') && !item.archive?.startsWith('true'))
  //       .sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
  
  //     setData(filteredData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  
  //     if (axios.isAxiosError(error)) {
  //       if (error.response) {
  //         console.error("Response error:", error.response.data);
  //         toast.error(`Error: ${error.response.data.message || "Failed to fetch data"}`);
  //       } else if (error.request) {
  //         console.error("No response received:", error.request);
  //         toast.error("No response from server. Please check your network connection.");
  //       } else {
  //         console.error("Request setup error:", error.message);
  //         toast.error(`Error setting up request: ${error.message}`);
  //       }
  //     } else {
  //       console.error("General error:", error.message);
  //       toast.error(`Error: ${error.message}`);
  //     }
  //   }
  // };

 
 
  const fetchData = async () => {
    try {
      const managerId = localStorage.getItem("managerId");
  
      if (!managerId) {
        throw new Error("Manager ID not found in local storage");
      }
  
      const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
  
      if (response.status !== 200) {
        throw new Error(`Failed to fetch data: Status code ${response.status}`);
      }
  
      // Process data and set default values for missing fields
      const processedData = response.data.map((item) => ({
        ...item,
        legality: item.legality || 'Not Done',  // Default to 'Not Done' if missing
        ovc: item.ovc || 'Not Done',            // Default to 'Not Done' if missing
        idCard: item.idCard || 'Not Done',      // Default to 'Not Done' if missing
        socialMedia: item.socialMedia || 'Not Done',  // Default to 'Not Done' if missing

        stage1Completion: item.stage1Completion || 'Not Done', // Default to 'Not Done' if missing
        payment: {
          stage1: {
            status: item.payment?.stage1?.status || 'Not Done',  // Handle nested payment status
          },
        },
      }));
  
      // Filter and sort data by enrollmentId in descending order
      const filteredData = processedData
        .filter(item => item.callDone?.startsWith('true') && !item.archive?.startsWith('true'))
        .sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
  
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
  
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Response error:", error.response.data);
          toast.error(`Error: ${error.response.data.message || "Failed to fetch data"}`);
        } else if (error.request) {
          console.error("No response received:", error.request);
          toast.error("No response from server. Please check your network connection.");
        } else {
          console.error("Request setup error:", error.message);
          toast.error(`Error setting up request: ${error.message}`);
        }
      } else {
        console.error("General error:", error.message);
        toast.error(`Error: ${error.message}`);
      }
    }
  };
  
 
  const handleOpenRemarksModal = (record) => {
    setCurrentRecord(record);
    setRemarks(record.remarks || []);
    setIsRemarksModalVisible(true);
  };

  const handleOpenContactModal = (record) => {
    setCurrentRecord(record);
    setIsContactModalVisible(true);
  };

  const handleCancel = () => {
    setIsRemarksModalVisible(false);
    setIsContactModalVisible(false);
    setCurrentRecord(null);
    setNewRemark('');
  };

  const handleAddRemark = async () => {
    if (!newRemark) {
      toast.error('Remark cannot be empty');
      return;
    }
    try {
      const updatedRemarks = [...remarks, { text: newRemark, date: new Date() }];
      await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
      toast.success("Remark added successfully");
      setRemarks(updatedRemarks);
      setNewRemark('');
      fetchData();
    } catch (error) {
      toast.error("Failed to add remark");
    }
  };

  const handleDeleteRemark = async (remark) => {
    const updatedRemarks = remarks.filter(r => r._id !== remark._id);
    try {
      await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
      toast.success("Remark deleted successfully");
      setRemarks(updatedRemarks);
      fetchData();
    } catch (error) {
      toast.error("Failed to delete remark");
    }
  };

  // Check if more than 7 days have passed and stage1Completion is not done
  const isOverdue = (record) => {
    const date = moment(record.date);
    const currentDate = moment();
    const sevenDaysPassed = currentDate.diff(date, 'days') > 7;
    const stage1CompletionNotDone = !record.stage1Completion || record.stage1Completion === 'Not Done';
    return sevenDaysPassed && stage1CompletionNotDone;
  };

  const stageColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format('DD-MM-YYYY'),
    },
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
      fixed: 'left',
      render: (text, record) => (
        <Button type="link" onClick={() => handleOpenContactModal(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Stage 1 Payment",
      dataIndex: "payment.stage1.status",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record?.payment?.stage1?.status === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.payment?.stage1?.status === "Done" ? '#90EE90' : undefined }}
          onClick={() => openModal('payment', record)}
        >
          Edit Payment
        </Button>
      ),
    },
    {
      title: "Legality",
      dataIndex: "legality",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.legality === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.legality === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('legality', record)}
        >
          Legality
        </Button>
      ),
    },
    {
      title: "OVC",
      dataIndex: "ovc",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.ovc === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.ovc === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('videoCall', record)}
        >
          Onboarding Video Call
        </Button>
      ),
    },
    {
      title: "ID Card",
      dataIndex: "idCard",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.idCard === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.idCard === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('idCard', record)}
        >
          ID Card
        </Button>
      ),
    },
    {
      title: "Social Media Content",
      dataIndex: "socialMediaContent",
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.socialMedia === value,
    
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.socialMedia === 'Completed' ? '#90EE90' : undefined }}
          onClick={() => openModal('socialMediaContent', record)}  // Trigger modal
        >
          Social Media Content
        </Button>
      ),
    }
    
,    
    {
      title: "Theme",
      dataIndex: "theme",
      filters: [
        { text: 'Selected', value: 'selected' },
        { text: 'Not Selected', value: 'notSelected' },
      ],
      onFilter: (value, record) => (record.theme ? 'selected' : 'notSelected') === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.theme ? '#90EE90' : undefined }}
          onClick={() => openModal('theme', record)}
        >
          Theme
        </Button>
      ),
    },
    {
      title: "Stage 1 Completion",
      dataIndex: "stage1Completion",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.stage1Completion === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.stage1Completion === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('stageCompletion', record)}
        >
          Stage 1 Completion
        </Button>
      ),
    },
    {
      title: "Remarks",
      key: "remarks",
      render: (text, record) => (
        <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
      ),
    }
  ];
  
  
  return (
    <div>
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
        <Table 
          columns={stageColumns} 
          dataSource={data} 
          rowKey="_id" 
          scroll={{ x: 'max-content', y: 601 }} 
          sticky 
          rowClassName={(record) => isOverdue(record) ? 'row-overdue' : ''}  // Apply class if overdue
        />
      </div>

      {/* Modals */}

      {visibleModal === 'payment' && (
        <Stage1PaymentModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {visibleModal === 'legality' && (
        <LegalityModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {visibleModal === 'videoCall' && (
        <OnboardingVideoCallModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {visibleModal === 'idCard' && (
        <IDCardModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}
          {visibleModal === 'socialMediaContent' && (
  <SocialContentModal
    visible={true}
    onCancel={closeModal}
    record={selectedRecord}
    fetchData={fetchData}
  />
)}

      {visibleModal === 'theme' && (
        <ThemeModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {visibleModal === 'stageCompletion' && (
        <Stage1CompletionModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* Remarks Modal */}
      <Modal
        title="Remarks"
        open={isRemarksModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <List
          dataSource={remarks}
          renderItem={(item) => (
            <List.Item
              actions={[<Button onClick={() => handleDeleteRemark(item)}>Delete</Button>]}
            >
              <List.Item.Meta
                title={moment(item.date).format('DD-MM-YYYY')}
                description={item.text}
              />
            </List.Item>
          )}
        />
        <Input.TextArea
          rows={4}
          value={newRemark}
          onChange={(e) => setNewRemark(e.target.value)}
        />
        <Button type="primary" onClick={handleAddRemark}>Add Remark</Button>
      </Modal>

      <Callmodal
        visible={isContactModalVisible}
        onCancel={handleCancel}
        record={currentRecord}
      />
    </div>
  );
};

export default Stagewebsite;
