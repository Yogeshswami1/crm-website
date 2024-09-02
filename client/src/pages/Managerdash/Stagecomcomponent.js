import React, { useState, useEffect } from "react";
import { Table, Button, Select, Modal, message, Input, Form, InputNumber, List } from "antd";
import axios from "axios";
import moment from "moment";


const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;

const StageComComponent = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState({});
  const [selectedRecord, setSelectedRecord] = useState({});
  const [storeName, setStoreName] = useState("");
  const [idAndPassCom, setIdAndPassCom] = useState({ id: "", pass: "" });
  const [stateCom, setStateCom] = useState("");
  const [currentListings, setCurrentListings] = useState(0);
  const [listingsModalVisible, setListingsModalVisible] = useState(false);

  const [description, setDescription] = useState("");
const [descriptionField, setDescriptionField] = useState("");
const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
const [remarks, setRemarks] = useState([]);
const [newRemark, setNewRemark] = useState('');
const [currentRecord, setCurrentRecord] = useState(null);

// const fetchData = async () => {
//   try {
//     const managerId = localStorage.getItem("managerId");
//     const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
//     const processedData = response.data.map((item) => ({
//       ...item,
//       simpleStatus: {
//         documentStatus: item.documentStatus && item.documentStatus.startsWith('Done') ? 'Done' : 'Not Done',
//         accountOpenCom: item.accountOpenCom && item.accountOpenCom.startsWith('Opened') ? 'Opened' : 'Not Opened',
//         videoKyc: item.videoKyc && item.videoKyc.startsWith('Done') ? 'Done' : 'Not Done',
//         launchDateCom: item.launchDateCom && item.launchDateCom.startsWith('Done') ? 'Done' : 'Not Done',
//         nia: item.nia && item.nia.startsWith('Done') ? 'Done' : 'Not Done',
//         addCredit: item.addCredit && item.addCredit.startsWith('Done') ? 'Done' : 'Not Done',
//         fbaCom: item.fbaCom && item.fbaCom.startsWith('Done') ? 'Done' : 'Not Done',
//         cvcCom: item.cvcCom && item.cvcCom.startsWith('Done') ? 'Done' : 'Not Done',
//         stage3Completion: item.stage3Completion && item.stage3Completion.startsWith('Done') ? 'Done' : 'Not Done',
       
//       }
//     }));
//     setData(processedData);
//   } catch (error) {
//     message.error("Failed to fetch data");
//   }
// };

// const fetchData = async () => {
//   try {
//     const managerId = localStorage.getItem("managerId");
//     const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);

//     // Process the data
//     const processedData = response.data.map((item) => ({
//       ...item,
//       simpleStatus: {
//         documentStatus: item.documentStatus?.startsWith('Done') ? 'Done' : 'Not Done',
//         accountOpenCom: item.accountOpenCom?.startsWith('Opened') ? 'Opened' : 'Not Opened',
//         videoKyc: item.videoKyc?.startsWith('Done') ? 'Done' : 'Not Done',
//         launchDateCom: item.launchDateCom?.startsWith('Done') ? 'Done' : 'Not Done',
//         nia: item.nia?.startsWith('Done') ? 'Done' : 'Not Done',
//         addCredit: item.addCredit?.startsWith('Done') ? 'Done' : 'Not Done',
//         fbaCom: item.fbaCom?.startsWith('Done') ? 'Done' : 'Not Done',
//         cvcCom: item.cvcCom?.startsWith('Done') ? 'Done' : 'Not Done',
//         stage3Completion: item.stage3Completion?.startsWith('Done') ? 'Done' : 'Not Done',
//       }
//     }));

//     // Filter out entries where archive is either "false", empty, null, or undefined
//     const filteredData = processedData.filter(item => 
//       item.archive === "false" || item.archive === "" || item.archive === null || item.archive === undefined
//       &&
//       item.service === "AMAZON");

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
        documentStatus: item.documentStatus?.startsWith('Done') ? 'Done' : 'Not Done',
        accountOpenCom: item.accountOpenCom?.startsWith('Opened') ? 'Opened' : 'Not Opened',
        videoKyc: item.videoKyc?.startsWith('Done') ? 'Done' : 'Not Done',
        launchDateCom: item.launchDateCom?.startsWith('Done') ? 'Done' : 'Not Done',
        nia: item.nia?.startsWith('Done') ? 'Done' : 'Not Done',
        addCredit: item.addCredit?.startsWith('Done') ? 'Done' : 'Not Done',
        fbaCom: item.fbaCom?.startsWith('Done') ? 'Done' : 'Not Done',
        cvcCom: item.cvcCom?.startsWith('Done') ? 'Done' : 'Not Done',
        stage3Completion: item.stage3Completion?.startsWith('Done') ? 'Done' : 'Not Done',
      }
    }));

    // Filter out entries where archive is either "false", empty, null, or undefined
    const filteredData = processedData.filter(item => 
      (item.archive === "false" || item.archive === "" || item.archive === null || item.archive === undefined) &&
      item.service === "AMAZON"
    );

    // Sort the filtered data in descending order by enrollmentId
    const sortedData = filteredData.sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));

    setData(sortedData);
  } catch (error) {
    message.error("Failed to fetch data");
  }
};



  useEffect(() => {
    fetchData();
  }, []);

  // Helper function to extract store name and format date
  const extractStoreNameAndFormatDate = (text) => {
    if (!text) return "Unknown";
    const parts = text.split(" (updated on ");
    const storeName = parts[0];
    const date = parts[1]?.slice(0, -1); // Remove the closing parenthesis
    if (date) {
      const formattedDate = new Date(date).toLocaleDateString("en-GB");
      return `${storeName} (${formattedDate})`;
    }
    return storeName;
  };
  
  
  const handleDropdownChange = (record, field, value) => {
    const descriptionRequired = 
      (field === 'videoKyc' && (value === 'Not Done' || value === 'Pending')) ||
      (field === 'deduct' && (value === 'Pending' || value === 'Error')) ||
      (field === 'addCredit' && value === 'Not Done');
  
    const updatedRecord = { ...record, [field]: value };
  
    setSelectedRecord(updatedRecord);
  
    if (descriptionRequired) {
      setDescriptionField(field);
      showDescriptionModal(updatedRecord, field);
    } else {
      updateField(updatedRecord, field, value);
    }
  };
  
  const updateField = async (record, field, value) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { [field]: value });
      message.success("Field updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update field");
    }
  };
  
  const handleDescriptionOk = async () => {
    const updatedRecord = {
      ...selectedRecord,
      [`${descriptionField}Description`]: description,
      [descriptionField]: selectedRecord[descriptionField]
    };
  
    try {
      await axios.put(`${apiUrl}/api/contact/${selectedRecord._id}`, updatedRecord);
      message.success("Field and description updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update field and description");
    }
  
    setDescriptionModalVisible(false);
    setDescription("");
  };

  const showDescriptionModal = (record, field) => {
    setSelectedRecord(record);
    setDescription(record[`${field}Description`] || "");
    setDescriptionField(field);
    setDescriptionModalVisible(true);
  };
  
  const handleDescriptionCancel = () => {
    setDescriptionModalVisible(false);
    setDescription("");
  };
  // const handleDropdownChange = async (record, field, value) => {
  //   try {
  //     await axios.put(`${apiUrl}/api/contact/${record._id}`, { [field]: value });
  //     message.success("Field updated successfully");
  //     fetchData();
  //   } catch (error) {
  //     message.error("Failed to update field");
  //   }
  // };

  const showStateComModal = (record) => {
    setSelectedRecord(record);
    setStateCom(record.stateCom || "");
    setModalVisible((prevState) => ({ ...prevState, stateCom: true }));
  };

  const handleStateComOk = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${selectedRecord._id}`, { stateCom });
      message.success("State updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update state");
    }
    setModalVisible((prevState) => ({ ...prevState, stateCom: false }));
    setStateCom("");
  };

  const showStoreNameModal = (record) => {
    setSelectedRecord(record);
    setStoreName(record.storeName || "");
    setModalVisible((prevState) => ({ ...prevState, storeName: true }));
  };

  const handleStoreNameOk = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${selectedRecord._id}`, { storeName });
      message.success("Store Name updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update Store Name");
    }
    setModalVisible((prevState) => ({ ...prevState, storeName: false }));
    setStoreName("");
  };

  const showIdAndPassComModal = (record) => {
    setSelectedRecord(record);
    setIdAndPassCom(record.idAndPassCom || { id: "", pass: "" });
    setModalVisible((prevState) => ({ ...prevState, idAndPassCom: true }));
  };

  const handleIdAndPassComOk = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${selectedRecord._id}`, { idAndPassCom });
      message.success("ID and Pass COM updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update ID and Pass COM");
    }
    setModalVisible((prevState) => ({ ...prevState, idAndPassCom: false }));
    setIdAndPassCom({ id: "", pass: "" });
  };

  const handleIdAndPassComCancel = () => {
    setModalVisible((prevState) => ({ ...prevState, idAndPassCom: false }));
    setIdAndPassCom({ id: "", pass: "" });
  };

  const showListingsModal = (record) => {
    setSelectedRecord(record);
    setCurrentListings(record.listingsCom || 0);
    setListingsModalVisible(true);
  };

  const handleListingsOk = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${selectedRecord._id}`, { listingsCom: currentListings });
      message.success("Listings updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update Listings");
    }
    setListingsModalVisible(false);
    setCurrentListings(0);
  };

  const handleListingsCancel = () => {
    setListingsModalVisible(false);
    setCurrentListings(0);
  };

  const handleCategoryChange = async (record, value) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { category: value });
      message.success("Category updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update Category");
    }
  };

  const extractStatus = (text) => {
    if (!text) return "Unknown";
    return text.split(" ")[0];
  };

  const handleSendTemplate = async (record) => {
    let to = record.primaryContact;
    if (to.length === 10) {
      to = `+91${to}`;
    }
  
    try {
      // Update the record with template3Sent set to true before sending the request
      record.template3Sent = true;
  
      await axios.post(`${apiUrl}/api/whatsapp/send-template-message`, {
        to,
        language: 'en',
        templateName: 'august_metting',
        contactId: record._id,
        template3Sent: true, // Include template1Sent in the payload
      });
      message.success("Template sent successfully");
      fetchData(); // Fetch the updated data to reflect changes in the UI
    } catch (error) {
      message.error("Failed to send template");
    }
  };

  const handleOpenRemarksModal = (record) => {
    setCurrentRecord(record);
    setRemarks(record.remarks || []);
    setIsRemarksModalVisible(true);
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

  const handleCancel = () => {
    setIsRemarksModalVisible(false);
    setCurrentRecord(null);
    setNewRemark('');
  };

  const stage2ComColumns = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId", fixed: 'left', width: 100,},
    {
      title: "Document Status",
      dataIndex: "documentStatus",
      key: "documentStatus",
      width: 150,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.documentStatus === value,
      render: (text, record) => {
        // Extract the status and date from the text
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Done' ? 'lightgreen' : 'transparent';
    
        return (
          <div
            style={{
              backgroundColor,
              padding: '5px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '180px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, "documentStatus", value)}
              style={{ width: '100%' }}
            >
              <Option value="Done">Done</Option>
              <Option value="Not Done">Not Done</Option>
            </Select>
          </div>
        );
      },
    },    
    {
      title: "Store Name",
      dataIndex: "storeName",
      key: "storeName",
      render: (text, record) => (
        <Button onClick={() => showStoreNameModal(record)}>
          {extractStatus(record.storeName)}
        </Button>
      ),
    },
    {
      title: "Account Open Com",
      dataIndex: "accountOpenCom",
      key: "accountOpenCom",
      filters: [
        { text: 'Opened', value: 'Opened' },
        { text: 'Not Opened', value: 'Not Opened' },
      ],
      onFilter: (value, record) => record.simpleStatus.accountOpenCom === value,
      render: (text, record) => {
        // Extract the status and date from the text
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Opened' ? 'lightgreen' : 'transparent';
    
        return (
          <div
            style={{
              backgroundColor,
              padding: '5px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '200px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, "accountOpenCom", value)}
              style={{ width: '100%' }}
            >
              <Option value="Opened">Opened</Option>
              <Option value="Not Opened">Not Opened</Option>
            </Select>
          </div>
        );
      },
    },    
    {
      title: "ID & Pass",
      dataIndex: "idAndPassCom",
      key: "idAndPassCom",
      render: (text, record) => (
        <Button onClick={() => showIdAndPassComModal(record)}>
          {record.idAndPassCom ? `${record.idAndPassCom.id}/${record.idAndPassCom.pass}` : "Set ID & Pass"}
        </Button>
      ),
    },
    {
      title: "Video KYC",
      dataIndex: "videoKyc",
      key: "videoKyc",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.simpleStatus.videoKyc === value,
      render: (text, record) => {
        // Extract the status and date from the text
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Done' ? 'lightgreen' : 'transparent';
    
        return (
          <div
            style={{
              backgroundColor,
              padding: '5px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '180px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, "videoKyc", value)}
              style={{ width: '100%' }}
            >
              <Option value="Done">Done</Option>
              <Option value="Not Done">Not Done</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </div>
        );
      },
    },    
    {
      title: "1$ Deduct",
      dataIndex: "deduct",
      key: "deduct",
      render: (text, record) => {
        // Extract the status and date from the text
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Deducted' ? 'lightgreen' : 'transparent';
    
        return (
          <div
            style={{
              backgroundColor,
              padding: '5px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '210px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, "deduct", value)}
              style={{ width: '100%' }}
            >
              <Option value="Deducted">Deducted</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Error">Error</Option>
            </Select>
          </div>
        );
      },
    },    
    {
      title: "Listings",
      dataIndex: "listingsCom",
      key: "listingsCom",
      render: (text, record) => (
        <Button onClick={() => showListingsModal(record)}>
          {extractStatus(record.listingsCom || "Set Listings")}
        </Button>
      ),
    },
    {
      title: "Launch Date Com",
      dataIndex: "launchDateCom",
      key: "launchDateCom",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.launchDateCom === value,
      render: (text, record) => {
        // Extract the status and date from the text
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Done' ? 'lightgreen' : 'transparent';
    
        return (
          <div
            style={{
              backgroundColor,
              padding: '5px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '180px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, "launchDateCom", value)}
              style={{ width: '100%' }}
            >
              <Option value="Done">Done</Option>
              <Option value="Not Done">Not Done</Option>
            </Select>
          </div>
        );
      },
    },    
    {
      title: "NIA",
      dataIndex: "nia",
      key: "nia",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.nia === value,
      render: (text, record) => {
        // Extract the status and date from the text
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Done' ? 'lightgreen' : 'transparent';
    
        return (
          <div
            style={{
              backgroundColor,
              padding: '5px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '180px', // Adjust as needed
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, "nia", value)}
              style={{ width: '100%' }}
            >
              <Option value="Done">Done</Option>
              <Option value="Not Done">Not Done</Option>
            </Select>
          </div>
        );
      },
    },    
    {
      title: "50$ Add Credit",
      dataIndex: "addCredit",
      key: "addCredit",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.addCredit === value,
      render: (text, record) => {
        // Extract the status and date from the text
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Done' ? 'lightgreen' : 'transparent';
    
        return (
          <div
            style={{
              backgroundColor,
              padding: '5px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '180px', // Adjust as needed
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, "addCredit", value)}
              style={{ width: '100%' }}
            >
              <Option value="Done">Done</Option>
              <Option value="Not Done">Not Done</Option>
            </Select>
          </div>
        );
      },
    },    
    {
      title: "FBA Com",
      dataIndex: "fbaCom",
      key: "fbaCom",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.fbaCom === value,
      render: (text, record) => {
        // Extract the status and date from the text
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Done' ? 'lightgreen' : 'transparent';
    
        return (
          <div
            style={{
              backgroundColor,
              padding: '5px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '180px', // Adjust width as needed
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, "fbaCom", value)}
              style={{ width: '100%' }}
            >
              <Option value="Done">Done</Option>
              <Option value="Not Done">Not Done</Option>
            </Select>
          </div>
        );
      },
    },    
    {
      title: "CVC Com",
      dataIndex: "cvcCom",
      key: "cvcCom",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.cvcCom === value,
      render: (text, record) => {
        // Extract the status and date from the text
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Done' ? 'lightgreen' : 'transparent';
    
        return (
          <div
            style={{
              backgroundColor,
              padding: '5px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '180px', // Adjust width as needed
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, "cvcCom", value)}
              style={{ width: '100%' }}
            >
              <Option value="Done">Done</Option>
              <Option value="Not Done">Not Done</Option>
            </Select>
          </div>
        );
      },
    },    
    {
      title: "Stage Com Completion",
      dataIndex: "stage3Completion",
      key: "stage3Completion",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.stage3Completion === value,
      render: (text, record) => {
        // Extract the status and date from the text
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Done' ? 'lightgreen' : 'transparent';
    
        return (
          <div
            style={{
              backgroundColor,
              padding: '5px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '180px', // Adjust width as needed
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, "stage3Completion", value)}
              style={{ width: '100%' }}
            >
              <Option value="Done">Done</Option>
              <Option value="Not Done">Not Done</Option>
            </Select>
          </div>
        );
      },
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
      render: (text, record) => (
        <Select value={extractStatus(record.category)} onChange={(value) => handleCategoryChange(record, value)}>
          <Option value="Gold">Gold</Option>
          <Option value="Silver">Silver</Option>
          <Option value="Poison">Poison</Option>
        </Select>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Button
    //       type="primary"
    //       style={{ backgroundColor: record.template3Sent ? 'green' : '' }}
    //       onClick={() => handleSendTemplate(record)}
    //     >
    //       {record.template3Sent ? 'Template Sent' : 'Send Template'}
    //     </Button>
    //   ),
    // },
  ];

  return (
    <>
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
        <Table columns={stage2ComColumns} dataSource={data} rowKey="_id"  scroll={{ x: 'max-content', y: 601 }} sticky />
      </div>


      {/* description */}

      <Modal
      title="Update Description"
      open={descriptionModalVisible}
      onOk={handleDescriptionOk}
      onCancel={handleDescriptionCancel}
    >
      <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
    </Modal>
      
      {/* Modal for Store Name */}
      <Modal
        title="Update Store Name"
        open={modalVisible.storeName}
        onOk={handleStoreNameOk}
        onCancel={() => setModalVisible((prevState) => ({ ...prevState, storeName: false }))}
      >
        <Input
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
      </Modal>

      {/* remark modal */}
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


      {/* Modal for ID & Pass Com */}
      <Modal title="ID & PASS COM" visible={modalVisible.idAndPassCom} onOk={handleIdAndPassComOk} onCancel={handleIdAndPassComCancel}>
        <Input placeholder="ID" value={idAndPassCom.id} onChange={(e) => setIdAndPassCom({ ...idAndPassCom, id: e.target.value })} />
        <Input placeholder="Pass" value={idAndPassCom.pass} onChange={(e) => setIdAndPassCom({ ...idAndPassCom, pass: e.target.value })} />
      </Modal>

      {/* Modal for Listings */}
      <Modal
        title="Update Listings"
        open={listingsModalVisible}
        onOk={handleListingsOk}
        onCancel={handleListingsCancel}
      >
        <Form>
          <Form.Item label="Listings">
            <InputNumber
              value={currentListings}
              onChange={(value) => setCurrentListings(value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StageComComponent;
