import React, { useState, useEffect } from 'react';
import { Table, Button, Input, message, Select } from 'antd';
import axios from 'axios';
import CodeSelectionModal from './CodeSelectionModal';
import AmazonINModal from './AmazonINModal';
import AmazonCOMModal from './AmazonCOMModal';
import FlipkartModal from './FlipkartModal';
import MeeshoModal from './MeeshoModal';
import EbayModal from './EbayModal';
import moment from 'moment';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;


const ContactComponent = () => {
  const [data, setData] = useState([]);
  const [isCodeModalVisible, setIsCodeModalVisible] = useState(false);
  const [isAmazonModalVisible, setIsAmazonModalVisible] = useState(false);
  const [isAmazonComModalVisible, setIsAmazonComModalVisible] = useState(false);
  const [isFlipkartModalVisible, setIsFlipkartModalVisible] = useState(false);
  const [isMeeshoModalVisible, setIsMeeshoModalVisible] = useState(false);
  const [isEbayModalVisible, setIsEbayModalVisible] = useState(false);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssignedContacts();
  }, []);

  const fetchAssignedContacts = async () => {
    try {
      setLoading(true);
      const managerId = localStorage.getItem('managerId');
      const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
      const filteredData = response.data.filter(contact => contact.service === 'FRANCHISE');
      setData(filteredData);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch contacts');
      setLoading(false);
    }
  };
  

  const handleBrandInBlur = async (value, record) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { brandNameFranchise: value });
      message.success("Brand Name updated successfully");
      fetchAssignedContacts();  // Fetch data again if needed
    } catch (error) {
      message.error("Failed to update Brand Name");
    }
  };


  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    { title: 'Enrollment ID', dataIndex: 'enrollmentId', key: 'enrollmentId' },
    {
      title: "Brand Name",
      dataIndex: "brandNameFranchise",
      key: "brandNameFranchise",
      render: (text, record) => (
        <Input
          defaultValue={text}
          onBlur={(e) => handleBrandInBlur(e.target.value, record)}
          style={{ width: 150 }}
        />
      ),
    },
    {
      title: 'Logo',
      key: 'logo',
      render: (text, record) => (
        <Select
          value={record.logo}
          onChange={(value) => handleLogoStatusChange(record._id, value)}
          style={{ width: '100%' }}
        >
          <Option value="Done">Done</Option>
          <Option value="Not Done">Not Done</Option>
        </Select>
      ),
    },
    
    {
      title: 'Code Selection',
      key: 'codeSelection',
      render: (text, record) => (
        <Button onClick={() => handleOpenCodeModal(record.enrollmentId)}>
          Select Code
        </Button>
      ),
    },
    {
      title: 'AMAZON.IN',
      key: 'amazonIN',
      render: (text, record) => (
        <Button onClick={() => handleOpenAmazonModal(record.enrollmentId)}>
          AMAZON.IN
        </Button>
      ),
    },
    {
      title: 'AMAZON.COM',
      key: 'amazonCOM',
      render: (text, record) => (
        <Button onClick={() => handleOpenAmazonComModal(record.enrollmentId)}>
          AMAZON.COM
        </Button>
      ),
    },
    {
      title: 'Flipkart',
      key: 'flipkart',
      render: (text, record) => (
        <Button onClick={() => handleOpenFlipkartModal(record.enrollmentId)}>
          Flipkart
        </Button>
      ),
    },
    {
      title: 'Meesho',
      key: 'meesho',
      render: (text, record) => (
        <Button onClick={() => handleOpenMeeshoModal(record.enrollmentId)}>
          Meesho
        </Button>
      ),
    },
    {
      title: 'Ebay',
      key: 'ebay',
      render: (text, record) => (
        <Button onClick={() => handleOpenEbayModal(record.enrollmentId)}>
          Ebay
        </Button>
      ),
    },
  ];

  
  
  const handleLogoStatusChange = async (id, logo) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${id}`, { logo });
      message.success('Logo status updated successfully');
  
      // Update the state immediately after the successful API call
      setData(prevData =>
        prevData.map(contact =>
          contact._id === id ? { ...contact, logo } : contact
        )
      );
    } catch (error) {
      message.error('Failed to update logo status');
    }
  };
  
  

  const handleOpenCodeModal = (enrollmentId) => {
    setSelectedEnrollmentId(enrollmentId);
    setIsCodeModalVisible(true);
  };

  const handleCloseCodeModal = () => {
    setIsCodeModalVisible(false);
    setSelectedEnrollmentId(null);
  };

  const handleOpenAmazonModal = (enrollmentId) => {
    setSelectedEnrollmentId(enrollmentId);
    setIsAmazonModalVisible(true);
  };

  const handleCloseAmazonModal = () => {
    setIsAmazonModalVisible(false);
    setSelectedEnrollmentId(null);
  };

  const handleOpenAmazonComModal = (enrollmentId) => {
    setSelectedEnrollmentId(enrollmentId);
    setIsAmazonComModalVisible(true);
  };

  const handleCloseAmazonComModal = () => {
    setIsAmazonComModalVisible(false);
    setSelectedEnrollmentId(null);
  };

  const handleOpenFlipkartModal = (enrollmentId) => {
    setSelectedEnrollmentId(enrollmentId);
    setIsFlipkartModalVisible(true);
  };

  const handleCloseFlipkartModal = () => {
    setIsFlipkartModalVisible(false);
    setSelectedEnrollmentId(null);
  };

  const handleOpenMeeshoModal = (enrollmentId) => {
    setSelectedEnrollmentId(enrollmentId);
    setIsMeeshoModalVisible(true);
  };

  const handleCloseMeeshoModal = () => {
    setIsMeeshoModalVisible(false);
    setSelectedEnrollmentId(null);
  };

  const handleOpenEbayModal = (enrollmentId) => {
    setSelectedEnrollmentId(enrollmentId);
    setIsEbayModalVisible(true);
  };

  const handleCloseEbayModal = () => {
    setIsEbayModalVisible(false);
    setSelectedEnrollmentId(null);
  };


  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="_id" loading={loading} />
      {isCodeModalVisible && (
        <CodeSelectionModal
          visible={isCodeModalVisible}
          onCancel={handleCloseCodeModal}
          enrollmentId={selectedEnrollmentId}
        />
      )}
      {isAmazonModalVisible && (
        <AmazonINModal
          visible={isAmazonModalVisible}
          onCancel={handleCloseAmazonModal}
          enrollmentId={selectedEnrollmentId}
        />
      )}
       {isAmazonComModalVisible && (
        <AmazonCOMModal
          visible={isAmazonComModalVisible}
          onCancel={handleCloseAmazonComModal}
          enrollmentId={selectedEnrollmentId}
        />
      )}
       {isFlipkartModalVisible && (
        <FlipkartModal
          visible={isFlipkartModalVisible}
          onCancel={handleCloseFlipkartModal}
          enrollmentId={selectedEnrollmentId}
        />
      )}
       {isMeeshoModalVisible && (
        <MeeshoModal
          visible={isMeeshoModalVisible}
          onCancel={handleCloseMeeshoModal}
          enrollmentId={selectedEnrollmentId}
        />
      )}
       {isEbayModalVisible && (
        <EbayModal
          visible={isEbayModalVisible}
          onCancel={handleCloseEbayModal}
          enrollmentId={selectedEnrollmentId}
        />
      )}
    </div>
  );
};

export default ContactComponent;
