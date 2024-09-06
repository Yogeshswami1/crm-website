import React, { useState, useEffect } from 'react';
import { Table, Switch, Button, Modal, Input, Form, message, Upload, Select, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Stage3website = () => {
  const [data, setData] = useState([]);
  const [isIdPassModalVisible, setIsIdPassModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const [paymentGatewayValues, setPaymentGatewayValues] = useState({});
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [uploadedDocumentPath, setUploadedDocumentPath] = useState(null);
  const [domainClaimValues, setDomainClaimValues] = useState({});

  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
const [selectedTemplate, setSelectedTemplate] = useState('');

 

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
  
  //     // Filter and sort data by enrollmentId in descending order
  //     const filteredData = response.data
  //       .filter(item => item.stage2Completion && item.stage2Completion.startsWith('Done'))
  //       .sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
  
  //     setData(filteredData);
  
  //     const initialPaymentGatewayValues = filteredData.reduce((acc, record) => {
  //       acc[record._id] = record.paymentGateway || '';
  //       return acc;
  //     }, {});
  //     setPaymentGatewayValues(initialPaymentGatewayValues);
  
  //     const initialDomainClaimValues = filteredData.reduce((acc, record) => {
  //       acc[record._id] = record.domainClaim || '';
  //       return acc;
  //     }, {});
  //     setDomainClaimValues(initialDomainClaimValues);
  
  //   } catch (error) {
  //     message.error("Failed to fetch data");
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

  const handleOpenPaymentModal = (record) => {
    setCurrentRecord(record);
    setIsPaymentModalVisible(true);
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

  
  const serverColumns = [
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
      fixed: 'left',
      width: 100,
    },
    {
      title: "Stage 3 Payment",
      key: "stage3Payment",
      width: 100,
      render: (text, record) => (
        <Button onClick={() => handleOpenPaymentModal(record)}>Stage 3 Payment</Button>
      ),
    },
    {
      title: "Server Purchase",
      dataIndex: "serverPurchase",
      key: "serverPurchase",
      width: 150,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.serverPurchase === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(text)}
          onChange={(checked) => handleToggleChange(record, "serverPurchase", checked)}
        />
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
    // {
    //   title: "Send Template",
    //   key: "sendTemplate",
    //   width: 100,
    //   render: (text, record) => (
    //     <Button onClick={() => {
    //       setCurrentRecord(record);
    //       setIsTemplateModalVisible(true);
    //       setSelectedTemplate(''); // Reset the selected template
    //     }}>
    //       Send Template
    //     </Button>
    //   ),
    // },
    
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
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <Button onClick={() => viewDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const formatDate = (dateString) => {
    return moment(dateString).format('DD-MM-YYYY');
  };

  const viewDetails = (record) => {
    const formatStatus = (status) => {

      if (typeof status !== 'string') {
        return 'Unknown'; // or return an appropriate default value
      }
      const match = status.match(/Done \(updated on (.*)\)/);
      if (match) {
        return `Done (${formatDate(match[1])})`;
      }
      return status;
    };

    Modal.info({
      title: 'Details',
      content: (
        <div>
          <p><strong>Enrollment ID:</strong> {record.enrollmentId}</p>
          <p><strong>Payment Amount:</strong> {currentRecord?.payment?.stage3?.amount}</p>
          <p><strong>Payment Mode:</strong> {(currentRecord?.payment?.stage3?.paymentMode)}</p>
          <p><strong>Payment Status:</strong> {(currentRecord?.payment?.stage3?.status)}</p>
          <p><strong>Server Purchase:</strong> {formatStatus(record.serverPurchase)}</p>
          <p><strong>Domain Claim:</strong> {formatStatus(record.domainClaim)}</p>
          <p><strong>Domain Mail Verification:</strong> {formatStatus(record.domainMailVerification)}</p>
          <p><strong>Website Uploaded:</strong> {formatStatus(record.websiteUploaded)}</p>
          <p><strong>Payment Gateway:</strong> {record.paymentGateway}</p>
          <p><strong>Ready to Handover:</strong> {formatStatus(record.readyToHandover)}</p>
          <p><strong>Stage 3 Completion:</strong> {formatStatus(record.stage3Completion)}</p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <>
      
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
      <Table columns={serverColumns} dataSource={data} rowKey="_id" scroll={{ x: 'max-content', y: 601 }} sticky />
    </div>
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

      {/* template modal */}

      <Modal
  title="Send Template"
  open={isTemplateModalVisible}
  onCancel={() => setIsTemplateModalVisible(false)}
  footer={null}
>
  {currentRecord && (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Button
          type={currentRecord.template24Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('moving_on_third_stage')}
          style={{ width: '100%' }}
        >
          Moving To Stage 3
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template25Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('domain_not_sended')}
          style={{ width: '100%' }}
        >
          Domain Not Sended
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template26Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('payment_reminder')}
          style={{ width: '100%' }}
        >
          Payment Reminder
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template27Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('domain_and_server')}
          style={{ width: '100%' }}
        >
          Domain & Server
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template28Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('website_is_live')}
          style={{ width: '100%' }}
        >
          Website Is Live
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template29Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('handover_new')}
          style={{ width: '100%' }}
        >
          Handover
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template30Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('maxmind')}
          style={{ width: '100%' }}
        >
          Maxmind
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template31Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('changes')}
          style={{ width: '100%' }}
        >
          Changes
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template32Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('changes_done')}
          style={{ width: '100%' }}
        >
          Changes Done
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template33Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('calling_issue_v2')}
          style={{ width: '100%' }}
        >
          Calling Issue V2
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template34Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('dispatch_manager')}
          style={{ width: '100%' }}
        >
          Dispatch Manager
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template35Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('manager_is_on_leave')}
          style={{ width: '100%' }}
        >
          Manager Is On Leave
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template36Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('letter_of_completion')}
          style={{ width: '100%' }}
        >
          Letter Of Completion
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template37Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('feedback_form')}
          style={{ width: '100%' }}
        >
          Feedback Form
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template38Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('cc_avenue')}
          style={{ width: '100%' }}
        >
          CC Avenue
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template39Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('payment_gateway_active')}
          style={{ width: '100%' }}
        >
          Payment Gateway Active
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template40Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('ccavenue')}
          style={{ width: '100%' }}
        >
          CCAVENUE
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template41Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('_video_1')}
          style={{ width: '100%' }}
        >
          Video 1
        </Button>
      </Col>
    </Row>
  )}
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
          <Form.Item label="Upload Document">
            <Upload
              name="document"
              action={`${apiUrl}/api/upload`}
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      
    </>
  );
};

export default Stage3website;
