import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Input, message, Select } from 'antd';
import axios from 'axios';
import InstagramModal from './InstagramModal';
import FacebookModal from './FacebookModal';
import PinterestModal from './PinterestModal';
import MediumModal from './MediumModal';
import QuoraModal from './QuoraModal';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;


const SocialMediaTable = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [isInstagramModalVisible, setIsInstagramModalVisible] = useState(false);
  const [isFacebookModalVisible, setIsFacebookModalVisible] = useState(false);
  const [isPinterestModalVisible, setIsPinterestModalVisible] = useState(false);
  const [isMediumModalVisible, setIsMediumModalVisible] = useState(false);
  const [isQuoraModalVisible, setIsQuoraModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
      const franchiseContacts = response.data.filter(contact => contact.service === 'FRANCHISE');
      const sortedData = franchiseContacts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setData(sortedData);
    } catch (error) {
      message.error("Failed to fetch data");
    }
  };

  const showContactModal = (record) => {
    setSelectedContact(record);
    setIsModalVisible(true);
  };

  const showInstagramModal = (record) => {
    setSelectedContact(record);
    setIsInstagramModalVisible(true);
  };

  const showFacebookModal = (record) => {
    setSelectedContact(record);
    setIsFacebookModalVisible(true);
  };

  const showPinterestModal = (record) => {
    setSelectedContact(record);
    setIsPinterestModalVisible(true);
  };

  const showMediumModal = (record) => {
    setSelectedContact(record);
    setIsMediumModalVisible(true);
  };

  const showQuoraModal = (record) => {
    setSelectedContact(record);
    setIsQuoraModalVisible(true);
  };

  const handleBrandNameChange = async (e, record) => {
    try {
      const updatedBrandNameSocial = e.target.value;
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { brandNameSocial: updatedBrandNameSocial });
      message.success("Brand name updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update brand name");
    }
  };

  const handlePostWithDateChange = async (value, record) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { postWithDate: value });
      message.success("Post with Date status updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const columns = [
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
      fixed: "left",
      width: 100,
      render: (text, record) => (
        <a onClick={() => showContactModal(record)}>{text}</a>
      ),
    },
    {
      title: "Brand Name",
      dataIndex: "brandNameSocial",
      key: "brandNameSocial",
      width: 120,
      render: (text, record) => (
        <Input
          defaultValue={text}
          onBlur={(e) => handleBrandNameChange(e, record)}
        />
      ),
    },
    {
      title: "Instagram",
      key: "instagram",
      width: 150,
      render: (text, record) => (
        <Button onClick={() => showInstagramModal(record)}>Edit Instagram</Button>
      ),
    },
    {
        title: "Facebook",
        key: "facebook",
        width: 150,
        render: (text, record) => (
          <Button onClick={() => showFacebookModal(record)}>Edit Facebook</Button>
        ),
      },
      {
        title: "Post With Date",
        key: "postWithDate",
        width: 150,
        render: (text, record) => (
          <Select
            defaultValue={record.postWithDate || "Not Done"}
            style={{ width: 120 }}
            onChange={(value) => handlePostWithDateChange(value, record)}
          >
            <Option value="Done">Done</Option>
            <Option value="Not Done">Not Done</Option>
          </Select>
        ),
      },
      {
        title: "Pinterest",
        key: "pinterest",
        width: 150,
        render: (text, record) => (
          <Button onClick={() => showPinterestModal(record)}>Edit Pinterest</Button>
        ),
      },
      {
        title: "Medium",
        key: "medium",
        width: 150,
        render: (text, record) => (
          <Button onClick={() => showMediumModal(record)}>Edit Medium</Button>
        ),
      },
      {
        title: "Quora",
        key: "quora",
        width: 150,
        render: (text, record) => (
          <Button onClick={() => showQuoraModal(record)}>Edit Quora</Button>
        ),
      },
  ];

  return (
    <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
      <Table columns={columns} dataSource={data} rowKey="_id" scroll={{ y: 800 }} sticky />
      <Modal
        title="Contact Information"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Name: {selectedContact.name}</p>
        <p>Email: {selectedContact.email}</p>
        <p>Primary Contact: {selectedContact.primaryContact}</p>
        <p>Secondary Contact: {selectedContact.secondaryContact}</p>
      </Modal>
      <InstagramModal
        visible={isInstagramModalVisible}
        onCancel={() => setIsInstagramModalVisible(false)}
        contact={selectedContact}
        onUpdate={fetchData}  // Pass fetchData to refresh data after update
      />
       <FacebookModal
        visible={isFacebookModalVisible}
        onCancel={() => setIsFacebookModalVisible(false)}
        contact={selectedContact}
        onUpdate={fetchData}  // Pass fetchData to refresh data after update
      />
      <PinterestModal
        visible={isPinterestModalVisible}
        onCancel={() => setIsPinterestModalVisible(false)}
        contact={selectedContact}
        onUpdate={fetchData}  // Pass fetchData to refresh data after update
      />
      <MediumModal
        visible={isMediumModalVisible}
        onCancel={() => setIsMediumModalVisible(false)}
        contact={selectedContact}
        onUpdate={fetchData}  // Pass fetchData to refresh data after update
      />
       <QuoraModal
        visible={isQuoraModalVisible}
        onCancel={() => setIsQuoraModalVisible(false)}
        contact={selectedContact}
        onUpdate={fetchData}  // Pass fetchData to refresh data after update
      />
    </div>
  );
};

export default SocialMediaTable;
