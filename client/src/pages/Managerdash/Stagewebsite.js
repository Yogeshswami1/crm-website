import React, { useState, useEffect } from 'react';
import { Table, Select, Modal, Form, Input, Button, message, List, Row, Col, Switch } from 'antd';
import axios from 'axios';
import moment from 'moment';
import Callmodal from "./Callmodal";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;

const Stagewebsite = () => {
  const [data, setData] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [uploadedDocumentPath, setUploadedDocumentPath] = useState(null);
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState('');
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  

  const [isLegalityModalVisible, setIsLegalityModalVisible] = useState(false);
const [legalityDescription, setLegalityDescription] = useState('');
const [legalityStatus, setLegalityStatus] = useState(false);
  

  

  const [form] = Form.useForm();

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
  
  
  const handleFieldChange = async (record, field, value) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { [field]: value });
      toast.success("Field updated successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to update field");
    }
  };

  const handleThemeChange = async (record, theme) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, { theme });
      toast.success("Theme updated successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to update theme");
    }
  };

  const handleOpenDetailModal = (record) => {
    setCurrentRecord(record);
    setIsDetailModalVisible(true);
  };

  const handleOpenPaymentModal = (record) => {
    setCurrentRecord(record);
    setIsPaymentModalVisible(true);
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
    setIsDetailModalVisible(false);
    setIsPaymentModalVisible(false);
    setIsRemarksModalVisible(false);
    setIsContactModalVisible(false);
    setCurrentRecord(null);
    setNewRemark('');
  };

  const getSwitchState = (fieldValue) => {
    return fieldValue ? fieldValue.startsWith('Done') : false;
  };

  const handleUpload = async (info) => {
    if (info.file.status === 'done') {
      const { response } = info.file;
      setUploadedDocumentPath(response.filePath);
      toast.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === 'error') {
      toast.error(`${info.file.name} file upload failed.`);
    }
  };

  const handlePaymentSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${currentRecord._id}`, {
        'payment.stage1': {
          amount: values.amount,
          paymentMode: values.paymentMode,
          document: uploadedDocumentPath || currentRecord.payment?.stage1?.document,
          status: values.status,
        },
      });
      toast.success("Payment details updated successfully");
      fetchData();
      handleCancel();
    } catch (error) {
      toast.error("Failed to update payment details");
    }
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

  const formatThemeText = (text) => {
    if (typeof text !== 'string' || !text.includes(' (updated on ')) {
      return text;
    }
  
    const [theme, date] = text.split(' (updated on ');
    if (!date) {
      return text;
    }
  
    const formattedDate = moment(date.replace(')', '')).format('DD-MM-YYYY');
    return `${theme} (${formattedDate})`;
  };

  const maskContact = (contact) => {
    if (!contact) return 'N/A';
    if (contact.length > 3) {
      return `****${contact.slice(-3)}`;
    }
    return contact;
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
        setSelectedTemplate(templateName); // Mark the template as sent
      } else {
        toast.error('Failed to send template');
      }
    } catch (error) {
      toast.error('Failed to send template');
    }
  };


  const handleOpenLegalityModal = (record) => {
    setCurrentRecord(record);
    setLegalityDescription(record.legalityDescription || '');
    setLegalityStatus(record.simpleStatus.legality === 'Done');
    setIsLegalityModalVisible(true);
  };

  const handleLegalitySave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${currentRecord._id}`, {
        legality: legalityStatus ? 'Done' : 'Not Done',
        legalityDescription,
      });
      toast.success("Legality details updated successfully");
      fetchData();
      setIsLegalityModalVisible(false);
    } catch (error) {
      toast.error("Failed to update legality details");
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
      key: "stage1Payment",
      render: (text, record) => (
        <Button onClick={() => handleOpenPaymentModal(record)}>Stage 1 Payment</Button>
      ),
    }, 
    {
      title: "Legality",
      dataIndex: "legality",
      key: "legality",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.legality === value,
      render: (text, record) => {
        const backgroundColor = record.simpleStatus.legality === 'Done' ? 'lightgreen' : 'transparent';
        return (
          <div style={{ backgroundColor, padding: '5px', borderRadius: '4px' }}>
            <Button onClick={() => handleOpenLegalityModal(record)}>
              {record.simpleStatus.legality}
            </Button>
          </div>
        );
      },
    },    
    {
      title: "Onboarding Video Call",
      dataIndex: "ovc",
      key: "ovc",
      width: 170,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.ovc === value,
      render: (text, record) => {
        // Extract the status and date from the text if needed
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
              width: '165px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleFieldChange(record, 'ovc', value)}
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
      title: "ID Card",
      dataIndex: "idCard",
      key: "idCard",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.idCard === value,
      render: (text, record) => {
        // Extract the status and date from the text if needed
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
              width: '165px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleFieldChange(record, 'idCard', value)}
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
      title: "Theme",
      dataIndex: "theme",
      key: "theme",
      render: (text, record) => (
        <Select defaultValue={formatThemeText(text)} onChange={(value) => handleThemeChange(record, value)}>
          <Option value="Theme 1">Theme 1</Option>
          <Option value="Theme 2">Theme 2</Option>
          <Option value="Theme 3">Theme 3</Option>
        </Select>
      ),
    },
    {
      title: "Stage 1 Completion",
      dataIndex: "stage1Completion",
      key: "stage1Completion",
      width: 170,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.stage1Completion === value,
      render: (text, record) => {
        // Extract the status and date from the text if needed
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
              width: '165px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleFieldChange(record, 'stage1Completion', value)}
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
      render: (text, record) => (
        <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handleOpenDetailModal(record)}>Show Details</Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
      <Table columns={stageColumns} dataSource={data} rowKey="_id" scroll={{ x: 'max-content', y: 601 }} sticky />
      </div>

      <Modal
        title="Payment Stage 1"
        open={isPaymentModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handlePaymentSave} initialValues={{
          amount: currentRecord?.payment?.stage1?.amount,
          paymentMode: currentRecord?.payment?.stage1?.paymentMode,
          document: currentRecord?.payment?.stage1?.document,
          status: currentRecord?.payment?.stage1?.status,
        }}>
          <Form.Item name="amount" label="Amount">
            <Input />
          </Form.Item>
          <Form.Item name="paymentMode" label="Payment Mode">
            <Select>
              <Option value="Cash">Cash</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
              <Option value="Online">Online</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Option value="Pending">Pending</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>


{/* legality modal */}
<Modal
  title="Legality Details"
  open={isLegalityModalVisible}
  onCancel={() => setIsLegalityModalVisible(false)}
  onOk={handleLegalitySave}
>
  <Form layout="vertical">
    <Form.Item label="Legality Status">
      <Switch 
        checked={legalityStatus} 
        onChange={(checked) => setLegalityStatus(checked)} 
        checkedChildren="Done" 
        unCheckedChildren="Not Done"
      />
    </Form.Item>
    <Form.Item label="Legality Description">
      <Input.TextArea 
        value={legalityDescription} 
        onChange={(e) => setLegalityDescription(e.target.value)} 
        rows={4}
      />
    </Form.Item>
  </Form>
</Modal>

      
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
          type={currentRecord.template1Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('new_whatsapp_update')}
          style={{ width: '100%' }}
        >
          New WhatsApp Update
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template2Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('id_card')}
          style={{ width: '100%' }}
        >
          ID Card
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template3Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('performa_invoice')}
          style={{ width: '100%' }}
        >
          Performa Invoice
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template4Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('theme_t1')}
          style={{ width: '100%' }}
        >
          Theme 1
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template5Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('theme_t2')}
          style={{ width: '100%' }}
        >
          Theme 2
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template6Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('theme_t3')}
          style={{ width: '100%' }}
        >
          Theme 3
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template7Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('theme_selections')}
          style={{ width: '100%' }}
        >
          Theme Selections
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template8Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('time_schedule_schedule')}
          style={{ width: '100%' }}
        >
          Time Schedule
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template9Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('calling_issue')}
          style={{ width: '100%' }}
        >
          Calling Issue
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template10Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('manager_is_on_leave')}
          style={{ width: '100%' }}
        >
          Manager Is On Leave
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template11Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('rank')}
          style={{ width: '100%' }}
        >
          Rank
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template12Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('wp_optimizer')}
          style={{ width: '100%' }}
        >
          WP Optimizer
        </Button>
      </Col>
    </Row>
  )}
</Modal>

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

      <Modal
        title="Details"
        visible={isDetailModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {currentRecord && (
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input value={currentRecord.name} readOnly />
            </Form.Item>
            <Form.Item label="Email">
              <Input value={currentRecord.email} readOnly />
            </Form.Item>
            <Form.Item label="Primary Contact">
              <Input value={currentRecord.primaryContact} readOnly />
            </Form.Item>
            <Form.Item label="Secondary Contact">
              <Input value={currentRecord.secondaryContact} readOnly />
            </Form.Item>
            {/* Add other fields as needed */}
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Stagewebsite;
