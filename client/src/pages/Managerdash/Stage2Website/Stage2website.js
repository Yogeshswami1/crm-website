import React, { useState, useEffect } from 'react';
import { Table, Select, Button, Modal, Input, Upload, message, Row, Col, Form, Switch, List } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';



import Stage2PaymentModal from './Stage2PaymentModal';
import CatFileModal from './CatFileModal';
import ProductFileModal from './ProductFileModal';
import LogoModal from './LogoModal';
import BannerModal from './BannerModal';
import GalleryModal from './GalleryModal';
import Stage2CompletionModal from './Stage2CompletionModal';


const { Option } = Select;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const StageMedia = () => {
  const [data, setData] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
const [remarks, setRemarks] = useState([]);
 const [newRemark, setNewRemark] = useState('');
 const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);


 const [isCatFileModalVisible, setIsCatFileModalVisible] = useState(false);
 const [productFileModalVisible, setProductFileModalVisible] = useState(false);
 const [selectedRecord, setSelectedRecord] = useState(null);
 const [logoModalVisible, setLogoModalVisible] = useState(false);
 const [bannerModalVisible, setBannerModalVisible] = useState(false);
 const [galleryModalVisible, setGalleryModalVisible] = useState(false);
 const [stage2CompletionModalVisible, setStage2CompletionModalVisible] = useState(false);


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
          catFile: item.catFile?.startsWith('Done') ? 'Done' : 'Not Done',
          productFile: item.productFile?.startsWith('Done') ? 'Done' : 'Not Done',
          logo: item.logo?.startsWith('Done') ? 'Done' : 'Not Done',
          banner: item.banner?.startsWith('Done') ? 'Done' : 'Not Done',
          gallery: item.gallery?.startsWith('Done') ? 'Done' : 'Not Done',
          stage2Completion: item.stage2Completion?.startsWith('Done') ? 'Done' : 'Not Done',
        }
      }));
  
      // Filter and sort data by enrollmentId in descending order
      const filteredData = processedData
        .filter(item => item.stage1Completion?.startsWith('Done') && !item.archive?.startsWith('true'))
        .sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
  
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data");
    }
  };

  const handleOpenPaymentModal = (record) => {
    setCurrentRecord(record);
    setIsPaymentModalVisible(true);
  };

  const handleCancel = () => {
    setIsPaymentModalVisible(false);
    setCurrentRecord(null);
    setIsRemarksModalVisible(false);
    setNewRemark('');
    setIsCatFileModalVisible(false);
  };

  const handleSendTemplate = async (templateName) => {
    if (!currentRecord) return;
  
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
        message.success('Template sent successfully');
        fetchData();
        // setSelectedTemplate(templateName);
      } else {
        message.error('Failed to send template');
      }
    } catch (error) {
      message.error('Failed to send template');
    }
  };

  const handleDeleteRemark = async (remark) => {
    const updatedRemarks = remarks.filter(r => r._id !== remark._id);
    try {
      await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
      message.success("Remark deleted successfully");
      setRemarks(updatedRemarks);
      fetchData();
    } catch (error) {
      message.error("Failed to delete remark");
    }
  };

  const handleAddRemark = async () => {
    if (!newRemark) {
      message.error('Remark cannot be empty');
      return;
    }
    try {
      const updatedRemarks = [...remarks, { text: newRemark, date: new Date() }];
      await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
      message.success("Remark added successfully");
      setRemarks(updatedRemarks);
      setNewRemark('');
      fetchData();
    } catch (error) {
      message.error("Failed to add remark");
    }
  };

  const handleOpenRemarksModal = (record) => {
    setCurrentRecord(record);
    setRemarks(record.remarks || []);
    setIsRemarksModalVisible(true);
  };




  const handleOpenCatFileModal = (record) => {
    setCurrentRecord(record);
    setIsCatFileModalVisible(true);
  };

  const openProductFileModal = (record) => {
    setSelectedRecord(record);
    setProductFileModalVisible(true);
  };

  const handleCancelProductFileModal = () => {
    setProductFileModalVisible(false);
    setSelectedRecord(null);
  };

  const openLogoModal = (record) => {
    setSelectedRecord(record);
    setLogoModalVisible(true);
  };

  const handleCancelLogoModal = () => {
    setLogoModalVisible(false);
    setSelectedRecord(null);
  };

  const openBannerModal = (record) => {
    setSelectedRecord(record);
    setBannerModalVisible(true);
  };

const handleCancelBannerModal = () => {
  setBannerModalVisible(false);
  setSelectedRecord(null);
};

const openGalleryModal = (record) => {
  setSelectedRecord(record);
  setGalleryModalVisible(true);
};
 
const handleCancelGalleryModal = () => {
  setGalleryModalVisible(false);
  setSelectedRecord(null);
};

const openStage2CompletionModal = (record) => {
  setSelectedRecord(record);
  setStage2CompletionModalVisible(true);
};

const handleCancelStage2CompletionModal = () => {
  setStage2CompletionModalVisible(false);
  setSelectedRecord(null);
};

  const mediaColumns = [
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
      fixed: 'left',
      width: 100,
    },
    {
      title: "Stage 2 Payment",
      key: "stage2Payment",
      width: 100,
      render: (text, record) => (
        <Button onClick={() => handleOpenPaymentModal(record)}>Stage 2 Payment</Button>
      ),
    },
    {
      title: 'Cat File',
      dataIndex: 'catFile',
      render: (text, record) => (
        <Button onClick={() => handleOpenCatFileModal(record)}>
          Edit Cat File
        </Button>
      ),
    },
    {
      title: 'Product File',
      dataIndex: 'productFile',
      render: (text, record) => (
        <Button onClick={() => openProductFileModal(record)}>
          Edit Product File
        </Button>
      ),
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      render: (text, record) => (
        <Button onClick={() => openLogoModal(record)}>
          Edit Logo File
        </Button>
      ),
    },
    {
      title: 'Banner',
      dataIndex: 'banner',
      render: (text, record) => (
        <Button onClick={() => openBannerModal(record)}>
          Edit Banner File
        </Button>
      ),
    },
    {
      title: 'Gallery',
      dataIndex: 'gallery',
      render: (text, record) => (
        <Button onClick={() => openGalleryModal(record)}>
          Edit Gallery File
        </Button>
      ),
    },
    {
      title: "Remarks",
      key: "remarks",
      render: (text, record) => (
        <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
      ),
    },
    {
      title: 'Stage 2 Completion',
      dataIndex: 'stage2Completion',
      render: (text, record) => (
        <Button onClick={() => openStage2CompletionModal(record)}>
          Edit Stage 2 Completion 
        </Button>
      ),
    },
  ];

  return (
    <>
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
        <Table columns={mediaColumns} dataSource={data} rowKey="_id" scroll={{ x: 'max-content', y: 601 }} sticky />
      </div>

      {/* Stage 2 payment */}

      <Stage2PaymentModal
        visible={isPaymentModalVisible}
        onCancel={handleCancel}
        record={currentRecord}
        fetchData={fetchData} // Pass the fetchData function to refresh the data after saving
      />

      {/* cat file */}

      <CatFileModal
        visible={isCatFileModalVisible}
        onCancel={handleCancel}
        record={currentRecord}
        fetchData={fetchData} // Refresh the data after saving
      />

      {/* product file */}

      <ProductFileModal
  visible={productFileModalVisible}
  onCancel={handleCancelProductFileModal}
  record={selectedRecord}
  fetchData={fetchData} // A function to refresh the data after upload
/>

      {/* logo modal */}

      <LogoModal
  visible={logoModalVisible}
  onCancel={handleCancelLogoModal}
  record={selectedRecord}
  fetchData={fetchData} // A function to refresh the data after upload
/>

      {/* banner modal */}

      <BannerModal
  visible={bannerModalVisible}
  onCancel={handleCancelBannerModal}
  record={selectedRecord}
  fetchData={fetchData} // Function to refresh the data after the upload
/>

      {/* gallery modal */}

      <GalleryModal
  visible={galleryModalVisible}
  onCancel={handleCancelGalleryModal}
  record={selectedRecord}
  fetchData={fetchData} // Function to refresh the data after the upload
/>

      {/* stage 2 completio modal */}

      <Stage2CompletionModal
  visible={stage2CompletionModalVisible}
  onCancel={handleCancelStage2CompletionModal}
  record={selectedRecord}
  fetchData={fetchData} // Function to refresh the data after the upload
/>


      {/* remarks modal */}
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

    </>
  );
};

export default StageMedia;
