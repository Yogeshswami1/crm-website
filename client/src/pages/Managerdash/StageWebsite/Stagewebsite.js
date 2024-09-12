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
  
      // Process data
      const processedData = response.data.map((item) => ({
        ...item,
        simpleStatus: {
          legality: item.legality?.startsWith('Done') ? 'Done' : 'Not Done',
          ovc: item.ovc?.startsWith('Done') ? 'Done' : 'Not Done',
          idCard: item.idCard?.startsWith('Done') ? 'Done' : 'Not Done',
          stage1Completion: item.stage1Completion?.startsWith('Done') ? 'Done' : 'Not Done',
        }
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

  

  const handleSendTemplate = async (templateName) => {
    try {
      // Prefix primaryContact with +91 if it's 10 digits long
      let primaryContact = currentRecord.primaryContact;
      if (/^\d{10}$/.test(primaryContact)) {
        primaryContact = `+91${primaryContact}`;
      }
  
      const response = await axios.post(`${apiUrl}/api/whatsapp/send-template-message`, {
        to: primaryContact,
        language: 'en', // adjust the language if needed
        templateName,
        contactId: currentRecord._id,
      });
  
      if (response.status === 200) {
        toast.success('Template sent successfully');
        fetchData();
        // setSelectedTemplate(templateName); 
      } else {
        toast.error('Failed to send template');
      }
    } catch (error) {
      toast.error('Failed to send template');
    }
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
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.payment?.stage1?.status === "Done" ? '#90EE90' : undefined }}  // Light green hex code
          onClick={() => openModal('payment', record)}
        >
          Edit Payment
        </Button>
      ),
    },    
    {
      title: "Legality",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.legality === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
          onClick={() => openModal('legality', record)}
        >
          Legality
        </Button>
      ),
    },    
    {
      title: "OVC",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.ovc === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
          onClick={() => openModal('videoCall', record)}
        >
          Onboarding Video Call
        </Button>
      ),
    },  
    {
      title: "ID Card",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.idCard === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
          onClick={() => openModal('idCard', record)}
        >
          ID Card
        </Button>
      ),
    },  
    {
      title: "Theme",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.theme ? '#90EE90' : undefined }}  // Light green if selectedTheme has a value
          onClick={() => openModal('theme', record)}
        >
          Theme
        </Button>
      ),
    },    
    {
      title: "Stage 1 Completion",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.stage1Completion === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
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
      <Table columns={stageColumns} dataSource={data} rowKey="_id" scroll={{ x: 'max-content', y: 601 }} sticky />
      </div>

      {/* payment stage 1 modal */}

      {visibleModal === 'payment' && (
        <Stage1PaymentModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* legality modal */}

      {visibleModal === 'legality' && (
        <LegalityModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* onboarding video call modal */}

      {visibleModal === 'videoCall' && (
        <OnboardingVideoCallModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* id card modal */}

      {visibleModal === 'idCard' && (
        <IDCardModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* theme modal */}

      {visibleModal === 'theme' && (
        <ThemeModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* stage 1 completion modal */}

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
