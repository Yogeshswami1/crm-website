import React, { useState, useEffect } from 'react';
import { Table, Switch, Button, Modal, Form, Input, InputNumber, Select, message, List } from 'antd';
import axios from 'axios';
import moment from 'moment';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;

const Stageincomponent = () => {
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [onboardingStatusModalVisible, setOnboardingStatusModalVisible] = useState(false);
  const [idPassModalVisible, setIdPassModalVisible] = useState(false);
  const [listingsModalVisible, setListingsModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [currentState, setCurrentState] = useState('');
  const [currentOnboardingStatus, setCurrentOnboardingStatus] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [currentListings, setCurrentListings] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('silver');

const [gtinDescriptionModalVisible, setGtinDescriptionModalVisible] = useState(false);

const [currentGstDescription, setCurrentGstDescription] = useState('');
const [currentGtinDescription, setCurrentGtinDescription] = useState('');

const [gst, setGst] = useState('');
const [isGstModalVisible, setIsGstModalVisible] = useState(false);
const [gstDescription, setGstDescription] = useState('');
const [record, setRecord] = useState(null);
const [isOnboardingModalVisible, setIsOnboardingModalVisible] = useState(false);
  const [onboardingDescription, setOnboardingDescription] = useState('');

  const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState('');
  const [currentRecord, setCurrentRecord] = useState(null);

  const [brandNameValues, setBrandNameValues] = useState({});

  const [isIdPassModalVisible, setIsIdPassModalVisible] = useState(false);
  const [form] = Form.useForm();


  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const managerId = localStorage.getItem("managerId");
  //     const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
  //     const processedData = response.data.map((item) => ({
  //       ...item,
  //       brandName: extractStatus(item.brandName) || '', // Ensure brandName is included and has a fallback if undefined
  //       simpleStatus: {
  //         gst: item.gst?.startsWith('Yes') ? 'Yes' : 'No',
  //         onboardingStatus: item.onboardingStatus?.startsWith('Done') ? 'Done' : 'Pending',
  //         accountOpenIn: item.accountOpenIn?.startsWith('Opened') ? 'Opened' : 'Not Opened',
  //         gtin: item.gtin?.startsWith('Approved') ? 'Approved' : 'Pending',
  //         launchDateIn: item.launchDateIn?.startsWith('Done') ? 'Done' : 'Not Done',
  //         addRegionIn: item.addRegionIn?.startsWith('Done') ? 'Done' : 'Not Done',
  //         fbaIn: item.fbaIn?.startsWith('Done') ? 'Done' : 'Not Done',
  //         cvcIn: item.cvcIn?.startsWith('Done') ? 'Done' : 'Pending',
  //         stage2Completion: item.stage2Completion?.startsWith('Done') ? 'Done' : 'Pending',
  //       }
  //     }));
      
  //     // Set the brandName values for the input fields
  //     const brandNameValues = processedData.reduce((acc, item) => {
  //       acc[item._id] = item.brandName;
  //       return acc;
  //     }, {});
  
  //     setBrandNameValues(brandNameValues);
  //     setData(processedData);
  //   } catch (error) {
  //     message.error("Failed to fetch data");
  //   }
  // };

  // const fetchData = async () => {
  //   try {
  //     const managerId = localStorage.getItem("managerId");
  //     const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
  
  //     // Process the data and include brandName with a fallback if undefined
  //     const processedData = response.data.map((item) => ({
  //       ...item,
  //       brandName: item.brandName || '', // Ensure brandName is included and has a fallback if undefined
  //       simpleStatus: {
  //         gst: item.gst?.startsWith('Yes') ? 'Yes' : 'No',
  //         onboardingStatus: item.onboardingStatus?.startsWith('Done') ? 'Done' : 'Pending',
  //         accountOpenIn: item.accountOpenIn?.startsWith('Opened') ? 'Opened' : 'Not Opened',
  //         gtin: item.gtin?.startsWith('Approved') ? 'Approved' : 'Pending',
  //         launchDateIn: item.launchDateIn?.startsWith('Done') ? 'Done' : 'Not Done',
  //         addRegionIn: item.addRegionIn?.startsWith('Done') ? 'Done' : 'Not Done',
  //         fbaIn: item.fbaIn?.startsWith('Done') ? 'Done' : 'Not Done',
  //         cvcIn: item.cvcIn?.startsWith('Done') ? 'Done' : 'Pending',
  //         stage2Completion: item.stage2Completion?.startsWith('Done') ? 'Done' : 'Pending',
  //       }
  //     }));
  
  //     // Filter out entries where archive is either "false", empty, null, or undefined
  //     const filteredData = processedData.filter(item => item.archive === "false" || item.archive === "" || item.archive === null || item.archive === undefined &&
  //       item.service === "AMAZON") ;
  
  //     // Set the brandName values for the input fields
  //     const brandNameValues = filteredData.reduce((acc, item) => {
  //       acc[item._id] = item.brandName;
  //       return acc;
  //     }, {});
  
  //     setBrandNameValues(brandNameValues);
  //     setData(filteredData);
  //   } catch (error) {
  //     message.error("Failed to fetch data");
  //   }
  // };
  

  const fetchData = async () => {
    try {
      const managerId = localStorage.getItem("managerId");
      const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
  
      // Process the data and include brandName with a fallback if undefined
      const processedData = response.data.map((item) => ({
        ...item,
        brandName: item.brandName || '', // Ensure brandName is included and has a fallback if undefined
        simpleStatus: {
          gst: item.gst?.startsWith('Yes') ? 'Yes' : 'No',
          onboardingStatus: item.onboardingStatus?.startsWith('Done') ? 'Done' : 'Pending',
          accountOpenIn: item.accountOpenIn?.startsWith('Opened') ? 'Opened' : 'Not Opened',
          gtin: item.gtin?.startsWith('Approved') ? 'Approved' : 'Pending',
          launchDateIn: item.launchDateIn?.startsWith('Done') ? 'Done' : 'Not Done',
          addRegionIn: item.addRegionIn?.startsWith('Done') ? 'Done' : 'Not Done',
          fbaIn: item.fbaIn?.startsWith('Done') ? 'Done' : 'Not Done',
          cvcIn: item.cvcIn?.startsWith('Done') ? 'Done' : 'Pending',
          stage2Completion: item.stage2Completion?.startsWith('Done') ? 'Done' : 'Pending',
        }
      }));
  
      // Filter out entries where archive is either "false", empty, null, or undefined
      const filteredData = processedData.filter(
        item =>
          (item.archive === "false" || item.archive === "" || item.archive === null || item.archive === undefined) &&
          item.service === "AMAZON"
      );
  
      // Sort the filtered data in descending order by enrollmentId
      const sortedData = filteredData.sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
  
      // Set the brandName values for the input fields
      const brandNameValues = sortedData.reduce((acc, item) => {
        acc[item._id] = item.brandName;
        return acc;
      }, {});
  
      setBrandNameValues(brandNameValues);
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

  const getSwitchState = (fieldValue) => {
    return fieldValue && fieldValue.startsWith('Done');
  };


  //gst modal
  const handleGstChange = async (value, record) => {
    setGst(value);
    setRecord(record);
    if (value === 'No') {
      setIsGstModalVisible(true);
    } else {
      try {
        await axios.put(`${apiUrl}/api/contact/${record._id}`, { gst: value });
        message.success("GST updated successfully");
        fetchData();
      } catch (error) {
        message.error("Failed to update GST");
      }
    }
  };

  const handleGstModalOk = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { gst: 'No', gstDescription });
      message.success("GST updated successfully");
      setIsGstModalVisible(false);
      fetchData();
    } catch (error) {
      message.error("Failed to update GST");
      setIsGstModalVisible(false);
    }
  };

  const handleGstModalCancel = () => {
    setIsGstModalVisible(false);
  };


//onboarding modal
const handleOnboardingChange = async (value, record) => {
  setRecord(record);
  if (value === 'Pending') {
    setIsOnboardingModalVisible(true);
  } else {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { onboardingStatus: value });
      message.success("Onboarding Status updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update Onboarding Status");
    }
  }
};

const handleOnboardingModalOk = async () => {
  try {
    await axios.put(`${apiUrl}/api/contact/${record._id}`, { onboardingStatus: 'pending', onboardingDescription });
    message.success("Onboarding Status updated successfully");
    setIsOnboardingModalVisible(false);
    fetchData();
  } catch (error) {
    message.error("Failed to update Onboarding Status");
    setIsOnboardingModalVisible(false);
  }
};

const handleOnboardingModalCancel = () => {
  setIsOnboardingModalVisible(false);
};

const showOnboardingDescriptionModal = (record) => {
  setRecord(record);
  setIsOnboardingModalVisible(true);
};


  const handleShippingChange = async (value, record) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { shipping: value });
      message.success("Shipping updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update shipping");
    }
  };

  const handleAccountOpenChange = async (value, record) => {
    const updatedValue = value === "Opened" ? "Opened" : "Not Opened";
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { accountOpenIn: updatedValue });
      message.success("Account Open status updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update Account Open status");
    }
  };

  const showStateModal = (record) => {
    setSelectedRecord(record);
    setCurrentState(record.state || "");
    setStateModalVisible(true);
  };

  
  

  const handleStateOk = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${selectedRecord._id}`, { state: currentState });
      message.success("State updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update state");
    }
    setStateModalVisible(false);
    setCurrentState("");
  };

  const handleStateCancel = () => {
    setStateModalVisible(false);
    setCurrentState("");
  };

  const showOnboardingStatusModal = (record) => {
    setSelectedRecord(record);
    setCurrentOnboardingStatus(record.onboardingStatus || "");
    setOnboardingStatusModalVisible(true);
  };

  const handleOnboardingStatusOk = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${selectedRecord._id}`, { onboardingStatus: currentOnboardingStatus });
      message.success("Onboarding status updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update onboarding status");
    }
    setOnboardingStatusModalVisible(false);
    setCurrentOnboardingStatus("");
  };

  const handleOnboardingStatusCancel = () => {
    setOnboardingStatusModalVisible(false);
    setCurrentOnboardingStatus("");
  };
  

  const handleIdPassOk = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${selectedRecord._id}`, {
        idAndPassIn: { id: currentId, pass: currentPass },
      });
      message.success("ID and Pass updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update ID and Pass");
    }
    setIdPassModalVisible(false);
    setCurrentId("");
    setCurrentPass("");
  };

  const handleIdPassCancel = () => {
    setIdPassModalVisible(false);
    setCurrentId("");
    setCurrentPass("");
  };

  const showListingsModal = (record) => {
    setSelectedRecord(record);
    setCurrentListings(record.listingsIn || 0);
    setListingsModalVisible(true);
  };

  const handleListingsOk = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${selectedRecord._id}`, { listingsIn: currentListings });
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

  const showCategoryModal = (record) => {
    setSelectedRecord(record);
    setCurrentCategory(record.category || 'silver');
    setCategoryModalVisible(true);
  };

  const showGstDescriptionModal = (record) => {
    setSelectedRecord(record);
    setCurrentGstDescription(record.gstDescription || '');
  };
  
  

    
  const handleCategoryOk = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${selectedRecord._id}`, { category: currentCategory });
      message.success("Category updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update Category");
    }
    setCategoryModalVisible(false);
    setCurrentCategory('silver');
  };

  const handleCategoryCancel = () => {
    setCategoryModalVisible(false);
    setCurrentCategory('silver');
  };

  //gtin
  const handleGtinDescriptionOk = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${selectedRecord._id}`, { gtinDescription: currentGtinDescription, gtin: 'Pending' });
      message.success("GTIN description updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update GTIN description");
    }
    setGtinDescriptionModalVisible(false);
    setCurrentGtinDescription('');
  };
  
  
  
  const handleGtinChange = async (value, record) => {
    if (value === 'Pending') {
      setSelectedRecord(record);
    } else {
      try {
        await axios.put(`${apiUrl}/api/contact/${record._id}`, { gtin: value });
        message.success("GTIN updated successfully");
        fetchData();
      } catch (error) {
        message.error("Failed to update GTIN");
      }
    }
  };

  const extractStatus = (text) => {
    if (!text) return "Unknown";
    return text.split(" ")[0];
  };

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

  const handleLaunchDateChange = async (value, record) => {
    const updatedValue = value === 'Done' ? 'Done' : 'Not Done';
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { launchDateIn: updatedValue });
      message.success('Launch Date updated successfully');
      fetchData();
    } catch (error) {
      message.error('Failed to update Launch Date');
    }
  };

  const handleGTINChange = async (value, record) => {
    const updatedValue = value === 'Approved' ? 'Approved' : 'Pending';
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { gtin: updatedValue });
      message.success('GTIN updated successfully');
      fetchData();
    } catch (error) {
      message.error('Failed to update GTIN');
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

  const handleGstNumberBlur = async (value, record) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { gstNumber: value });
      message.success("GST Number updated successfully");
      fetchData();  // Fetch data again if needed
    } catch (error) {
      message.error("Failed to update GST Number");
    }
  };


  const handleBrandNameBlur = async (value, record) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { brandName: value });
      message.success("Brand Name updated successfully");
      fetchData();  // Fetch data again if needed
    } catch (error) {
      message.error("Failed to update Brand Name");
    }
  };

  const handleStateInBlur = async (value, record) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { state: value });
      message.success("State updated successfully");
      fetchData();  // Fetch data again if needed
    } catch (error) {
      message.error("Failed to update State");
    }
  };


  const handleListingsBlur = async (value, record) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { listingsIn: value });
      message.success("Listings updated successfully");
      fetchData();  // Fetch data again if needed
    } catch (error) {
      message.error("Failed to update Listings");
    }
  };


  const handleOpenIdPassModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      id: record.idAndPassIn?.id || '',
      pass: record.idAndPassIn?.pass || ''
    });
    setIsIdPassModalVisible(true);
  };

  const handleIdPassModalOk = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${currentRecord._id}`, {
        idAndPassIn: {
          id: values.id,
          pass: values.pass
        }
      });
      message.success("ID and Password updated successfully");
      setIsIdPassModalVisible(false);
      fetchData();
    } catch (error) {
      message.error("Failed to update ID and Password");
    }
  };

  const handleIdPassModalCancel = () => {
    setIsIdPassModalVisible(false);
    setCurrentRecord(null);
  };

  //cvc and stage completion
  const handleCvcInChange = async (value, record) => {
    setRecord(record);
      try {
        await axios.put(`${apiUrl}/api/contact/${record._id}`, { cvcIn: value });
        message.success("CVC Status updated successfully");
        fetchData();
      } catch (error) {
        message.error("Failed to update CVC Status");
      }
    
  };

  const handleStageChange = async (value, record) => {
    setRecord(record);
      try {
        await axios.put(`${apiUrl}/api/contact/${record._id}`, { stage2Completion: value });
        message.success("Stage Status updated successfully");
        fetchData();
      } catch (error) {
        message.error("Failed to update Stage Status");
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
  const stageInColumns = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId", fixed: 'left', width: 100, },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (text, record) => (
        <Input
          defaultValue={text}
          onBlur={(e) => handleStateInBlur(e.target.value, record)}
          style={{ width: 150 }}
        />
      ),
    },
    {
      title: "GST",
      dataIndex: "gst",
      key: "gst",
      filters: [
        { text: 'Yes', value: 'Yes' },
        { text: 'No', value: 'No' },
      ],
      onFilter: (value, record) => record.simpleStatus.gst === value,
      render: (text, record) => {
        // Extract the status and date from the text if needed
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Yes' ? 'lightgreen' : 'transparent';
    
        return (
          <div
            style={{
              backgroundColor,
              padding: '5px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '165px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleGstChange(value, record)}
              style={{ width: '100%' }}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
            {status === "No" && (
              showGstDescriptionModal(record)
            )}
          </div>
        );
      },
    },  
    {
      title: "GST Number",
      dataIndex: "gstNumber",
      key: "gstNumber",
      render: (text, record) => (
        <Input
          defaultValue={text}
          onBlur={(e) => handleGstNumberBlur(e.target.value, record)}
          style={{ width: 150 }}
        />
      ),
    },
    {
      title: "Onboarding Status",
      dataIndex: "onboardingStatus",
      key: "onboardingStatus",
      width: 150,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.simpleStatus.onboardingStatus === value,
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
              onChange={(value) => handleOnboardingChange(value, record)}
              style={{ width: '100%' }}
            >
              <Option value="Pending">Pending</Option>
              <Option value="Done">Done</Option>
            </Select>
            {status === "Pending" && (
              <Button
                onClick={() => showOnboardingDescriptionModal(record)}
                style={{ marginLeft: '8px' }}
              >
                Description
              </Button>
            )}
          </div>
        );
      },
    },    
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
      render: (text, record) => (
        <Input
          defaultValue={text}
          onBlur={(e) => handleBrandNameBlur(e.target.value, record)}
          style={{ width: 150 }}
        />
      ),
    },
    {
      title: "Account Open",
      dataIndex: "accountOpenIn",
      key: "accountOpenIn",
      filters: [
        { text: 'Opened', value: 'Opened' },
        { text: 'Not Opened', value: 'Not Opened' },
      ],
      onFilter: (value, record) => record.simpleStatus.accountOpenIn === value,
      render: (text, record) => {
        // Extract the status and date from the text
        const [status, date] = text ? text.split(' (updated on ') : [];
        const formattedDate = date ? date.slice(0, -1) : ''; // Remove the closing parenthesis
    
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
              width: '190px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${new Date(formattedDate).toLocaleDateString("en-GB")})` : ''}`}
              onChange={(value) => handleAccountOpenChange(value, record)}
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
      dataIndex: "idAndPassIn",
      key: "idAndPassIn",
      width: 100,
      render: (text, record) => (
        <div>
          {record.idAndPassIn?.id ? (
            <div onClick={() => handleOpenIdPassModal(record)} style={{ cursor: "pointer", color: "#1890ff" }}>
              <p><strong>ID:</strong> {record.idAndPassIn.id}</p>
              <p><strong>Pass:</strong> {record.idAndPassIn.pass}</p>
            </div>
          ) : (
            <Button onClick={() => handleOpenIdPassModal(record)}>
              Set ID & Pass
            </Button>
          )}
        </div>
      ),
    },
    {
      title: 'GTIN',
      dataIndex: 'gtin',
      key: 'gtin',
      filters: [
        { text: 'Approved', value: 'Approved' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.simpleStatus.gtin === value,
      render: (text, record) => {
        // Extract the status and date from the text
        const parts = text ? text.split(' (updated on ') : [];
        const status = parts[0] || '';
        const datePart = parts[1] ? parts[1].slice(0, -1) : ''; // Remove the closing parenthesis
    
        // Format the date if available
        const formattedDate = datePart ? new Date(datePart).toLocaleDateString("en-GB") : '';
    
        // Determine background color based on status
        const backgroundColor = status === 'Approved' ? 'lightgreen' : 'transparent';
    
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
              onChange={(value) => handleGTINChange(value, record)}
              style={{ width: '100%' }}
            >
              <Option value="Approved">Approved</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </div>
        );
      },
    },    
    // {
    //   title: "Listings",
    //   dataIndex: "listingsIn",
    //   key: "listingsIn",
    //   render: (text, record) => (
    //     <Button onClick={() => showListingsModal(record)}>
    //       {extractStatus(record.listingsIn || "Set Listings")}
    //     </Button>
    //   ),
    // },
    {
      title: "Listings",
      dataIndex: "listingsIn",
      key: "listingsIn",
      render: (text, record) => (
        <Input
          defaultValue={text}
          onBlur={(e) => handleListingsBlur(e.target.value, record)}
          style={{ width: 150 }}
        />
      ),
    },
    {
      title: 'Launch Date',
      dataIndex: 'launchDateIn',
      key: 'launchDateIn',
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.launchDateIn === value,
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
              onChange={(value) => handleLaunchDateChange(value, record)}
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
      title: "Add Region",
      dataIndex: "addRegionIn",
      key: "addRegionIn",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.addRegionIn === value,
      render: (text, record) => (
        <Switch
        checked={getSwitchState(record.addRegionIn)}
        onChange={(checked) => handleToggleChange(record, "addRegionIn", checked)}
      />
      ),
    },
    {
      title: "Shipping",
      dataIndex: "shipping",
      key: "shipping",
      render: (text, record) => (
        <Select
          value={extractStatus(record.shipping)}
          onChange={(value) => handleShippingChange(value, record)}
          style={{ width: 120 }}
        >
          <Option value="Easy Ship">Easy Ship</Option>
          <Option value="Self Ship">Self Ship</Option>
        </Select>
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
    {
      title: "FBA",
      dataIndex: "fbaIn",
      key: "fbaIn",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.fbaIn === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.fbaIn)}
          onChange={(checked) => handleToggleChange(record, "fbaIn", checked)}
        />
      ),
    },
    {
      title: "CVC",
      dataIndex: "cvcIn",
      key: "cvcIn",
      width: 150,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.simpleStatus.cvcIn === value,
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
              onChange={(value) => handleCvcInChange(value, record)}
              style={{ width: '100%' }}
            >
              <Option value="Pending">Pending</Option>
              <Option value="Done">Done</Option>
            </Select>
          </div>
        );
      },
    },   
    {
      title: "Stage In Completion",
      dataIndex: "stage2Completion",
      key: "stage2Completion",
      width: 150,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.simpleStatus.stage2Completion === value,
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
              onChange={(value) => handleStageChange(value, record)}
              style={{ width: '100%' }}
            >
              <Option value="Pending">Pending</Option>
              <Option value="Done">Done</Option>
            </Select>
          </div>
        );
      },
    },   
  ];

  

  return (
    <>
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
      <Table columns={stageInColumns} dataSource={data} rowKey="_id"  scroll={{ x: 'max-content', y: 601 }} sticky  />
      </div>
      
      <Modal
        title="Update State"
        open={stateModalVisible}
        onOk={handleStateOk}
        onCancel={handleStateCancel}
      >
        <Form>
          <Form.Item label="State IN">
            <Input
              value={currentState}
              onChange={(e) => setCurrentState(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

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

      <Modal
        title="Update Onboarding Status"
        open={onboardingStatusModalVisible}
        onOk={handleOnboardingStatusOk}
        onCancel={handleOnboardingStatusCancel}
      >
        <Form>
          <Form.Item label="Onboarding Status">
            <Input
              value={currentOnboardingStatus}
              onChange={(e) => setCurrentOnboardingStatus(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Provide GST Description"
        visible={isGstModalVisible}
        onOk={handleGstModalOk}
        onCancel={handleGstModalCancel}
      >
        <Input
          placeholder="Enter description"
          value={gstDescription}
          onChange={(e) => setGstDescription(e.target.value)}
        />
      </Modal>

      <Modal
        title="Provide Onboarding Description"
        visible={isOnboardingModalVisible}
        onOk={handleOnboardingModalOk}
        onCancel={handleOnboardingModalCancel}
      >
        <Input
          placeholder="Enter description"
          value={onboardingDescription}
          onChange={(e) => setOnboardingDescription(e.target.value)}
        />
      </Modal>



{/* id and pass modal */}
<Modal
        title="Set ID & Pass"
        open={isIdPassModalVisible}
        onOk={() => form.submit()}
        onCancel={handleIdPassModalCancel}
      >
        <Form form={form} onFinish={handleIdPassModalOk}>
          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: 'Please input the ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="pass"
            rules={[{ required: true, message: 'Please input the Password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update ID & Pass"
        open={idPassModalVisible}
        onOk={handleIdPassOk}
        onCancel={handleIdPassCancel}
      >
        <Form>
          <Form.Item label="ID">
            <Input
              value={currentId}
              onChange={(e) => setCurrentId(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Pass">
            <Input
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>


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

     
      <Modal
        title="Update Category"
        open={categoryModalVisible}
        onOk={handleCategoryOk}
        onCancel={handleCategoryCancel}
      >
        <Form>
          <Form.Item label="Category">
            <Select
              value={currentCategory}
              onChange={(value) => setCurrentCategory(value)}
            >
              <Option value="silver">Silver</Option>
              <Option value="gold">Gold</Option>
              <Option value="poison">Poison</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

     
    </>
  );
};

export default Stageincomponent;
