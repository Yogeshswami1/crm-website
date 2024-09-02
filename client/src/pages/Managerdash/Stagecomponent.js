import React, { useState, useEffect } from 'react';
import { Table, Switch, Select, message, Modal, Button, Input, List } from 'antd';
import axios from 'axios';
import moment from 'moment';


const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;
const { Search } = Input;


const Stagecomponent = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [searchText, setSearchText] = useState('');
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState('');
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  

  // const fetchData = async () => {
  //   try {
  //     const managerId = localStorage.getItem("managerId");
  //     const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
      
  //     // Process the data
  //     const processedData = response.data.map((item) => ({
  //       ...item,
  //       simpleStatus: {
  //         ovc: item.ovc?.startsWith('Done') ? 'Done' : 'Not Done',
  //         legality: item.legality?.startsWith('Done') ? 'Done' : 'Not Done',
  //         idCard: item.idCard?.startsWith('Done') ? 'Done' : 'Not Done',
  //         training: item.training?.startsWith('Done') ? 'Done' : 'Not Done',
  //         ebook: item.ebook?.startsWith('Done') ? 'Done' : 'Not Done',
  //         supportPortal: item.supportPortal?.startsWith('Done') ? 'Done' : 'Not Done',
  //         walletPortal: item.walletPortal?.startsWith('Done') ? 'Done' : 'Not Done',
  //         gallery: item.gallery?.startsWith('Done') ? 'Done' : 'Not Done',
  //         stage1Completion: item.stage1Completion?.startsWith('Done') ? 'Done' : 'Not Done',
  //       }
  //     }));
  
  //     // Debugging: Log the processed data to see the archive values
  //     console.log("Processed Data:", processedData);
  
  //     // Filter out entries where archive is either "false", empty, null, or undefined, and service is AMAZON
  //     const filteredData = processedData.filter(
  //       item =>
  //         (item.archive === "false" || item.archive === "" || item.archive === null || item.archive === undefined) &&
  //         item.service === "AMAZON"
  //     );
  
  //     console.log("Filtered Data:", filteredData);
  
  //     setData(filteredData);
  //   } catch (error) {
  //     message.error("Failed to fetch data");
  //   }
  // };

  const fetchData = async () => {
    try {
      const managerId = localStorage.getItem("managerId");
      const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
      
      // Process the data
      const processedData = response.data.map((item) => ({
        ...item,
        simpleStatus: {
          ovc: item.ovc?.startsWith('Done') ? 'Done' : 'Not Done',
          legality: item.legality?.startsWith('Done') ? 'Done' : 'Not Done',
          idCard: item.idCard?.startsWith('Done') ? 'Done' : 'Not Done',
          training: item.training?.startsWith('Done') ? 'Done' : 'Not Done',
          ebook: item.ebook?.startsWith('Done') ? 'Done' : 'Not Done',
          supportPortal: item.supportPortal?.startsWith('Done') ? 'Done' : 'Not Done',
          walletPortal: item.walletPortal?.startsWith('Done') ? 'Done' : 'Not Done',
          gallery: item.gallery?.startsWith('Done') ? 'Done' : 'Not Done',
          stage1Completion: item.stage1Completion?.startsWith('Done') ? 'Done' : 'Not Done',
        }
      }));
  
      // Debugging: Log the processed data to see the archive values
      console.log("Processed Data:", processedData);
  
      // Filter out entries where archive is either "false", empty, null, or undefined, and service is AMAZON
      const filteredData = processedData.filter(
        item =>
          (item.archive === "false" || item.archive === "" || item.archive === null || item.archive === undefined) &&
          item.service === "AMAZON"
      );
  
      // Sort the filtered data in descending order by enrollmentId
      const sortedData = filteredData.sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
  
      console.log("Filtered & Sorted Data:", sortedData);
  
      setData(sortedData);
    } catch (error) {
      message.error("Failed to fetch data");
    }
  };
  
  
  
  
  
  const handleToggleChange = async (record, field, checked) => {
    const value = checked ? `Done (updated on ${new Date().toISOString()})` : `Not Done (updated on ${new Date().toISOString()})`;
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { [field]: value });
      message.success("Field updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update field");
    }
  };


  const handleCategoryChange = async (record, category) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { category });
      message.success("Category updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update category");
    }
  };


  const getSwitchState = (fieldValue) => {
    return fieldValue && fieldValue.startsWith('Done');
  };


  const extractStatus = (text) => {
    if (!text) return "Unknown";
    return text.split(" ")[0];
  };


  const showContactModal = (record) => {
    setSelectedContact(record);
    setIsModalVisible(true);
  };


  const handleOk = () => {
    setIsModalVisible(false);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setIsRemarksModalVisible(false);
    setCurrentRecord(null);
    setNewRemark('');
  };

  const maskContact = (contact) => {
    if (!contact) return '';
    return contact.slice(0, -3).replace(/./g, '*') + contact.slice(-3);
  };


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };


  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Search
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onSearch={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <span className="anticon anticon-search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      console.log(`Filtering ${dataIndex} for value: ${value}`);
      console.log(`Record ${dataIndex}: ${record[dataIndex]}`);
      return record[dataIndex] && record[dataIndex].split(" ")[0] === value;
    },
  });


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

  const handleOpenRemarksModal = (record) => {
    setCurrentRecord(record);
    setRemarks(record.remarks || []);
    setIsRemarksModalVisible(true);
  };

  

  const stageColumns = [
    { title: "Date", dataIndex: "date", key: "date", render: (text) => moment(text).format('DD-MM-YYYY') },
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
      fixed: 'left',
      width: 120,
      ...getColumnSearchProps('enrollmentId'),
      render: (text, record) => (
        <a onClick={() => showContactModal(record)}>{text}</a>
      ),
    },
    {
      title: "OVC",
      dataIndex: "ovc",
      key: "ovc",
      width: 100,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.ovc === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.ovc)}
          onChange={(checked) => handleToggleChange(record, "ovc", checked)}
        />
      ),
    },
        {
      title: "Legality",
      dataIndex: "legality",
      key: "legality",
      width: 100,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.legality === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.legality)}
          onChange={(checked) => handleToggleChange(record, "legality", checked)}
        />
      ),
    },
    {
      title: "ID Card",
      dataIndex: "idCard",
      key: "idCard",
      width: 100,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.idCard === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.idCard)}
          onChange={(checked) => handleToggleChange(record, "idCard", checked)}
        />
      ),
    },
    {
      title: "Training",
      dataIndex: "training",
      key: "training",
      width: 100,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.training === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.training)}
          onChange={(checked) => handleToggleChange(record, "training", checked)}
        />
      ),
    },
    {
      title: "Ebook",
      dataIndex: "ebook",
      key: "ebook",
      width: 100,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.ebook === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.ebook)}
          onChange={(checked) => handleToggleChange(record, "ebook", checked)}
        />
      ),
    },
    {
      title: "Support Portal",
      dataIndex: "supportPortal",
      key: "supportPortal",
      width: 130,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.supportPortal === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.supportPortal)}
          onChange={(checked) => handleToggleChange(record, "supportPortal", checked)}
        />
      ),
    },
    {
      title: "Wallet Portal",
      dataIndex: "walletPortal",
      key: "walletPortal",
      width: 120,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.walletPortal === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.walletPortal)}
          onChange={(checked) => handleToggleChange(record, "walletPortal", checked)}
        />
      ),
    },
    {
      title: "Gallery",
      dataIndex: "gallery",
      key: "gallery",
      width: 100,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.gallery === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.gallery)}
          onChange={(checked) => handleToggleChange(record, "gallery", checked)}
        />
      ),
    },
    {
      title: "Stage Completion",
      dataIndex: "stage1Completion",
      key: "stage1Completion",
      width: 140,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.stage1Completion === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.stage1Completion)}
          onChange={(checked) => handleToggleChange(record, "stage1Completion", checked)}
        />
      ),
    },
    {
      title: "Remarks",
      key: "remarks",
      width: 100,
      render: (text, record) => (
        <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 100,
      render: (text, record) => (
        <Select value={text} onChange={(value) => handleCategoryChange(record, value)} style={{ width: 120 }}>
          <Option value="Silver">Silver</Option>
          <Option value="Gold">Gold</Option>
          <Option value="Poison">Poison</Option>
        </Select>
      ),
    },
  ];
 


  return (
    <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
      <Table columns={stageColumns} dataSource={data} rowKey="_id" scroll={{ x: 'max-content', y: 601 }} sticky/>
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
      <Modal
        title="Contact Information"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Name: {selectedContact.name}</p>
        <p>Email: {selectedContact.email}</p>
        <p>Primary Contact: {maskContact(selectedContact.primaryContact)}</p>
        <p>Secondary Contact: {maskContact(selectedContact.secondaryContact)}</p>
      </Modal>
    </div>
  );
};


export default Stagecomponent;



