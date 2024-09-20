import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, message, List } from 'antd';
import axios from 'axios';
import moment from 'moment';
import Stage2PaymentModal from './Stage2PaymentModal';
import CatFileModal from './CatFileModal';
import ProductFileModal from './ProductFileModal';
import LogoModal from './LogoModal';
import BannerModal from './BannerModal';
import GalleryModal from './GalleryModal';
import Stage2CompletionModal from './Stage2CompletionModal';
// import SocialContentModal from './SocialContentModal1';
import SocialContentModal from './SocialContentModal1';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const StageMedia = (record) => {
  const [data, setData] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
const [remarks, setRemarks] = useState([]);
 const [newRemark, setNewRemark] = useState('');
 const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
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
        catFile: item.catFile?.startsWith('Done') ? 'Done' : 'Not Done',
        productFile: item.productFile?.startsWith('Done') ? 'Done' : 'Not Done',
        logo: item.logo?.startsWith('Done') ? 'Done' : 'Not Done',
        banner: item.banner?.startsWith('Done') ? 'Done' : 'Not Done',
        gallery: item.gallery?.startsWith('Done') ? 'Done' : 'Not Done',
        stage2Completion: item.stage2Completion?.startsWith('Done') ? 'Done' : 'Not Done',
        socialMedia1: item.socialMedia1?.startsWith('Completed') ? 'Completed' : 'Not Done',
        payment: {
          stage2: {
            status: item.payment?.stage2?.status === 'Done' ? 'Done' : 'Not Done',
          },
        },
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

  const handleCancel = () => {
    setCurrentRecord(null);
    setIsRemarksModalVisible(false);
    setNewRemark('');
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
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => (record?.payment?.stage2?.status || 'Not Done') === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.payment?.stage2?.status === "Done" ? '#90EE90' : undefined }}
          onClick={() => openModal('stage2payment', record)}
        >
          Edit Payment
        </Button>
      ),
    },
    {
      title: "CAT File",
      dataIndex: "catFile",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.catFile === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.catFile === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('catFile', record)}
        >
          CAT File
        </Button>
      ),
    },
    {
      title: "Product File",
      dataIndex: "productFile",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.productFile === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.productFile === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('productFile', record)}
        >
          Product File
        </Button>
      ),
    },
    {
      title: "Logo",
      dataIndex: "logo",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.logo === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.logo === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('logo', record)}
        >
          Logo
        </Button>
      ),
    },
    {
      title: "Banner",
      dataIndex: "banner",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.banner === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.banner === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('banner', record)}
        >
          Banner
        </Button>
      ),
    },
    {
      title: "Social Media Content",
      dataIndex: "socialMedia1",
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.socialMedia1 === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.socialMedia1 === 'Completed' ? '#90EE90' : undefined }}
          onClick={() => openModal('socialMediaContent', record)}
        >
          Social Media Content
        </Button>
      ),
    },
    {
      title: "Gallery",
      dataIndex: "gallery",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.gallery === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.gallery === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('gallery', record)}
        >
          Gallery
        </Button>
      ),
    },
    {
      title: "Stage 2 Completion",
      dataIndex: "stage2Completion",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.stage2Completion === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.stage2Completion === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('stage2completion', record)}
        >
          Stage 2 Completion
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
  ];
  

  return (
    <>
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
        <Table columns={mediaColumns} dataSource={data} rowKey="_id" scroll={{ x: 'max-content', y: 601 }} sticky />
      </div>

      {/* Stage 2 payment */}

      {visibleModal === 'stage2payment' && (
        <Stage2PaymentModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* cat file */}

      {visibleModal === 'catFile' && (
        <CatFileModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* product file */}

{visibleModal === 'productFile' && (
        <ProductFileModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* logo modal */}

{visibleModal === 'logo' && (
        <LogoModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* banner modal */}

{visibleModal === 'banner' && (
        <BannerModal
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

      {/* gallery modal */}

{visibleModal === 'gallery' && (
        <GalleryModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* stage 2 completio modal */}

{visibleModal === 'stage2completion' && (
        <Stage2CompletionModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}


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
