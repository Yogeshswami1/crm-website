import React, { useState, useEffect } from 'react';
import { Table, Switch, Button, Modal, Input, Form, message, Upload, Select, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import PaymentModal from './PaymentModal';
import ServerPurchaseModal from './ServerPurchaseModal';
import DomainClaimModal from './DomainClaimModal';
import DomainMailVerificationModal from './DomainMailVerificationModal';
import WebsiteUploadedModal from './WebsiteUploadedModal';

const { Option } = Select;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Stage3website = () => {
  const [data, setData] = useState([]);
  const [isIdPassModalVisible, setIsIdPassModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const [paymentGatewayValues, setPaymentGatewayValues] = useState({});
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [uploadedDocumentPath, setUploadedDocumentPath] = useState(null);
  const [domainClaimValues, setDomainClaimValues] = useState({});

  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
const [selectedTemplate, setSelectedTemplate] = useState('');

const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
const [currentRecord, setCurrentRecord] = useState(null);
const [serverPurchaseModalVisible, setServerPurchaseModalVisible] = useState(false);
const [selectedRecord, setSelectedRecord] = useState(null);
const [domainClaimModalVisible, setDomainClaimModalVisible] = useState(false);
const [domainMailVerificationModalVisible, setDomainMailVerificationModalVisible] = useState(false);
const [websiteUploadedModalVisible, setWebsiteUploadedModalVisible] = useState(false);




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
          serverPurchase: item.serverPurchase?.startsWith('Done') ? 'Done' : 'Not Done',
          domainMailVerification: item.domainMailVerification?.startsWith('Done') ? 'Done' : 'Not Done',
          websiteUploaded: item.websiteUploaded?.startsWith('Done') ? 'Done' : 'Not Done',
          readyToHandover: item.readyToHandover?.startsWith('Done') ? 'Done' : 'Not Done',
          stage3Completion: item.stage3Completion?.startsWith('Done') ? 'Done' : 'Not Done',
        }
      }));
  
      // Filter and sort data by enrollmentId in descending order
      const filteredData = processedData
        .filter(item => item.stage2Completion?.startsWith('Done') && !item.archive?.startsWith('true'))
        .sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
  
      // Set filtered data to state
      setData(filteredData);
  
      // Set initial values for paymentGateway and domainClaim
      const initialPaymentGatewayValues = filteredData.reduce((acc, record) => {
        acc[record._id] = record.paymentGateway || '';
        return acc;
      }, {});
      setPaymentGatewayValues(initialPaymentGatewayValues);
  
      const initialDomainClaimValues = filteredData.reduce((acc, record) => {
        acc[record._id] = record.domainClaim || '';
        return acc;
      }, {});
      setDomainClaimValues(initialDomainClaimValues);
  
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data");
    }
  };
  
  
  

  const handleToggleChange = async (record, field, checked) => {
    const value = checked
      ? `Done (updated on ${new Date().toISOString()})`
      : `Not Done (updated on ${new Date().toISOString()})`;

    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { [field]: value });
      message.success("Field updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update field");
    }
  };

  const handleOpenIdPassModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      id: record.idAndPassWebsite?.id || '',
      pass: record.idAndPassWebsite?.pass || ''
    });
    setIsIdPassModalVisible(true);
  };

  const handleIdPassModalOk = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${currentRecord._id}`, {
        idAndPassWebsite: {
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
 

  // Utility function to determine the switch state
  const getSwitchState = (fieldValue) => {
    return fieldValue ? fieldValue.startsWith('Done') : false;
  };

  const handlePaymentGatewayChange = async (recordId, value) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${recordId}`, { paymentGateway: value });
      message.success("Payment Gateway updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update Payment Gateway");
    }
  };

  const handleInputChange = (recordId, value) => {
    setPaymentGatewayValues(prev => ({ ...prev, [recordId]: value }));
  };

  const handleInputBlur = (recordId) => {
    handlePaymentGatewayChange(recordId, paymentGatewayValues[recordId]);
  };


  const handleCancel = () => {
    setIsDetailModalVisible(false);
    setIsPaymentModalVisible(false);
    setCurrentRecord(null);
  };

  const handleUpload = async (info) => {
    if (info.file.status === 'done') {
      // Ensure the backend response includes the document path
      const { response } = info.file;
      setUploadedDocumentPath(response.filePath); // Store the document path from the response
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  
  const handlePaymentSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${currentRecord._id}`, {
        'payment.stage3': {
          amount: values.amount,
          paymentMode: values.paymentMode,
          document: uploadedDocumentPath || currentRecord.payment?.stage3?.document,
          status: values.status,
        },
      });
      message.success("Payment details updated successfully");
      fetchData();
      handleCancel();
    } catch (error) {
      message.error("Failed to update payment details");
    }
  };


  const handleDomainClaimChange = async (recordId, value) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${recordId}`, { domainClaim: value });
      message.success("Domain Claim updated successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to update Domain Claim");
    }
  };
  
  const handleDomainClaimInputChange = (recordId, value) => {
    setDomainClaimValues(prev => ({ ...prev, [recordId]: value }));
  };
  
  const handleDomainClaimInputBlur = (recordId) => {
    handleDomainClaimChange(recordId, domainClaimValues[recordId]);
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
        message.success('Template sent successfully');
        fetchData();
        setSelectedTemplate(templateName); // Mark the template as sent
      } else {
        message.error('Failed to send template');
      }
    } catch (error) {
      message.error('Failed to send template');
    }
  };



  const handleOpenPaymentModal = (record) => {
    setCurrentRecord(record);
    setIsPaymentModalVisible(true);
  };

  const handleCancelPaymentModal = () => {
    setIsPaymentModalVisible(false);
    setCurrentRecord(null);
  };

  const openServerPurchaseModal = (record) => {
    setSelectedRecord(record);
    setServerPurchaseModalVisible(true);
  };

  const handleCancelServerPurchaseModal = () => {
    setServerPurchaseModalVisible(false);
    setSelectedRecord(null);
  };

  const openDomainClaimModal = (record) => {
    setSelectedRecord(record);
    setDomainClaimModalVisible(true);
  };

  const handleCancelDomainClaimModal = () => {
    setDomainClaimModalVisible(false);
    setSelectedRecord(null);
  };

  const openDomainMailVerificationModal = (record) => {
    setSelectedRecord(record);
    setDomainMailVerificationModalVisible(true);
  };

  const handleCancelDomainMailVerificationModal = () => {
    setDomainMailVerificationModalVisible(false);
    setSelectedRecord(null);
  };

  const openWebsiteUploadedModal = (record) => {
    setSelectedRecord(record);
    setWebsiteUploadedModalVisible(true);
  };

  const handleCancelWebsiteUploadedModal = () => {
    setWebsiteUploadedModalVisible(false);
    setSelectedRecord(null);
  };

  
  const serverColumns = [
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
      fixed: 'left',
      width: 100,
    },
    {
      title: 'Stage 3 Payment',
      key: 'stage3Payment',
      render: (text, record) => (
        <Button onClick={() => handleOpenPaymentModal(record)}>Stage 3 Payment</Button>
      ),
    },
    {
      title: 'Server Purchase',
      dataIndex: 'serverPurchase',
      render: (text, record) => (
        <Button onClick={() => openServerPurchaseModal(record)}>
          Edit Server Purchase
        </Button>
      ),
    },
    {
      title: 'Domain Claim',
      dataIndex: 'domainClaim',
      render: (text, record) => (
        <Button onClick={() => openDomainClaimModal(record)}>
          Edit Domain Claim
        </Button>
      ),
    },
    {
      title: "Domain Claim",
      dataIndex: "domainClaim",
      key: "domainClaim",
      width: 120,
      render: (text, record) => (
        <Input
        style={{width:"9rem"}}
          value={domainClaimValues[record._id] || ''}
          onChange={(e) => handleDomainClaimInputChange(record._id, e.target.value)}
          onBlur={() => handleDomainClaimInputBlur(record._id)}
        />
      ),
    },
    {
      title: 'Domain Mail Verification',
      dataIndex: 'domainMailVerification',
      render: (text, record) => (
        <Button onClick={() => openDomainMailVerificationModal(record)}>
          Edit Domain Mail Verification
        </Button>
      ),
    },
    {
      title: "Domain Mail Verification",
      dataIndex: "domainMailVerification",
      key: "domainMailVerification",
      width: 190,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.domainMailVerification === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(text)}
          onChange={(checked) => handleToggleChange(record, "domainMailVerification", checked)}
        />
      ),
    },
    {
      title: 'Website Uploaded',
      dataIndex: 'websiteUploaded',
      render: (text, record) => (
        <Button onClick={() => openWebsiteUploadedModal(record)}>
          Edit Website Uploaded
        </Button>
      ),
    },
    {
      title: "Website Uploaded",
      dataIndex: "websiteUploaded",
      key: "websiteUploaded",
      width: 150,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.websiteUploaded === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(text)}
          onChange={(checked) => handleToggleChange(record, "websiteUploaded", checked)}
        />
      ),
    },
    {
      title: "ID & Pass",
      dataIndex: "idAndPassWebsite",
      key: "idAndPassWebsite",
      width: 100,
      render: (text, record) => (
        <div>
          {record.idAndPassWebsite?.id ? (
            <div onClick={() => handleOpenIdPassModal(record)} style={{ cursor: "pointer", color: "#1890ff" }}>
              <p><strong>ID:</strong> {record.idAndPassWebsite.id}</p>
              <p><strong>Pass:</strong> {record.idAndPassWebsite.pass}</p>
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
      title: "Payment Gateway",
      dataIndex: "paymentGateway",
      key: "paymentGateway",
      width: 150,
      render: (text, record) => (
        <Input
          value={paymentGatewayValues[record._id] || ''}
          onChange={(e) => handleInputChange(record._id, e.target.value)}
          onBlur={() => handleInputBlur(record._id)}
        />
      ),
    },
    {
      title: "Ready to Handover",
      dataIndex: "readyToHandover",
      key: "readyToHandover",
      width: 160,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.readyToHandover === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(text)}
          onChange={(checked) => handleToggleChange(record, "readyToHandover", checked)}
        />
      ),
    },
     {
      title: "Stage 3 Completion",
      dataIndex: "stage3Completion",
      key: "stage3Completion",
      width: 160,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.stage3Completion === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(text)}
          onChange={(checked) => handleToggleChange(record, "stage3Completion", checked)}
        />
      ),
    },
  ];

  const formatDate = (dateString) => {
    return moment(dateString).format('DD-MM-YYYY');
  };

  return (
    <>
      
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
      <Table columns={serverColumns} dataSource={data} rowKey="_id" scroll={{ x: 'max-content', y: 601 }} sticky />
    </div>

      {/* payment modal */}

      <PaymentModal
        visible={isPaymentModalVisible}
        onCancel={handleCancelPaymentModal}
        record={currentRecord}
        apiUrl={apiUrl}
        fetchData={fetchData}
      />

      {/* server purchase modal */}

      <ServerPurchaseModal
  visible={serverPurchaseModalVisible}
  onCancel={handleCancelServerPurchaseModal}
  record={selectedRecord}
  fetchData={fetchData} // A function to refresh the data after upload
/>

      {/* domain claim modal */}

      <DomainClaimModal
  visible={domainClaimModalVisible}
  onCancel={handleCancelDomainClaimModal}
  record={selectedRecord}
  fetchData={fetchData} // A function to refresh the data after upload
/>

      {/* domain mail verification */}

      <DomainMailVerificationModal
  visible={domainMailVerificationModalVisible}
  onCancel={handleCancelDomainMailVerificationModal}
  record={selectedRecord}
  fetchData={fetchData} // A function to refresh the data after upload
/>

    {/* website uploaded modal */}

    <WebsiteUploadedModal
  visible={websiteUploadedModalVisible}
  onCancel={handleCancelWebsiteUploadedModal}
  record={selectedRecord}
  fetchData={fetchData} // A function to refresh the data after upload
/>
       
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
        title="Stage 3 Payment"
        open={isPaymentModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          initialValues={{
            amount: currentRecord?.payment?.stage3?.amount || '',
            paymentMode: currentRecord?.payment?.stage3?.paymentMode || '',
            status: currentRecord?.payment?.stage3?.status || '',
          }}
          onFinish={handlePaymentSave}
        >
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please input the amount' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="paymentMode"
            label="Payment Mode"
            rules={[{ required: true, message: 'Please select the payment mode' }]}
          >
            <Select>
              <Option value="Cash">Cash</Option>
              <Option value="Phonepay">Phonepay</Option>
              <Option value="Paytm">Paytm</Option>
              <Option value="Google Pay">Google Pay</Option>
              <Option value="Credit Card">Credit Card</Option>
              <Option value="Debit Card">Debit Card</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status' }]}
          >
            <Select>
              <Option value="Done">Done</Option>
              <Option value="Not Done">Not Done</Option>
            </Select>
          </Form.Item>
         
        </Form>
      </Modal>

      
    </>
  );
};

export default Stage3website;
