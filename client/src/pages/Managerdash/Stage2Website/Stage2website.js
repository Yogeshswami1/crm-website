import React, { useState, useEffect } from 'react';
import { Table, Select, Button, Modal, Input, Upload, message, Row, Col, Form, Switch, List } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const StageMedia = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);
  const [uploadedDocumentPath, setUploadedDocumentPath] = useState(null);
  const [description, setDescription] = useState('');
  const [descriptionField, setDescriptionField] = useState('');

  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
const [selectedTemplate, setSelectedTemplate] = useState('');

const [remarks, setRemarks] = useState([]);
 const [newRemark, setNewRemark] = useState('');
 const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);




  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
  
  //     // Filter and sort data by enrollmentId in descending order
  //     const filteredData = response.data
  //       .filter(item => item.stage1Completion && item.stage1Completion.startsWith('Done'))
  //       .sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
  
  //     setData(filteredData);
  
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

  const handleDropdownChange = (record, field, value) => {
    if (value === 'Not Done') {
      setCurrentRecord(record);
      setDescriptionField(field);
      setIsDescriptionModalVisible(true);
    } else {
      handleToggleChange(record, field, true);
    }
  };

  const handleDescriptionSave = async () => {
    const value = `Not Done (updated on ${new Date().toISOString()}): ${description}`;
    try {
      await axios.put(`${apiUrl}/api/contact/${currentRecord._id}`, { [descriptionField]: value });
      message.success("Field updated successfully");
      fetchData();
      setIsDescriptionModalVisible(false);
      setDescription('');
    } catch (error) {
      message.error("Failed to update field");
    }
  };
  const handleOpenModal = (record) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  const handleOpenPaymentModal = (record) => {
    setCurrentRecord(record);
    setIsPaymentModalVisible(true);
  };

  const handleCancel = () => {
    setIsDetailModalVisible(false);
    setIsPaymentModalVisible(false);
    setIsDescriptionModalVisible(false);
    setCurrentRecord(null);
    setIsRemarksModalVisible(false);
    setNewRemark('');
  };

  const getSwitchState = (fieldValue) => {
    return fieldValue ? fieldValue.startsWith('Done') : false;
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
        'payment.stage2': {
          amount: values.amount,
          paymentMode: values.paymentMode,
          document: uploadedDocumentPath || currentRecord.payment?.stage2?.document,
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
        setSelectedTemplate(templateName); // Mark the template as sent
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
      title: "Cat File",
      dataIndex: "catFile",
      key: "catFile",
      width: 100,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.catFile === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.catFile)}
          onChange={(checked) => handleToggleChange(record, "catFile", checked)}
        />
      ),
    },
    {
      title: "Product File",
      dataIndex: "productFile",
      key: "productFile",
      width: 100,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.productFile === value,
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
              width: '120px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, 'productFile', value)}
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
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: 100,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.logo === value,
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
              width: '100px',
            }}
          >
            <Select
              value={`${status}${formattedDate ? ` (${formattedDate})` : ''}`}
              onChange={(value) => handleDropdownChange(record, 'logo', value)}
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
      title: "Banner",
      dataIndex: "banner",
      key: "banner",
      width: 100,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.banner === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.banner)}
          onChange={(checked) => handleToggleChange(record, "banner", checked)}
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
      title: "Remarks",
      key: "remarks",
      render: (text, record) => (
        <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
      ),
    },
    {
      title: "Stage 2 Completion",
      dataIndex: "stage2Completion",
      key: "stage2Completion",
      width: 160,
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.stage2Completion === value,
      render: (text, record) => (
        <Switch
          checked={getSwitchState(record.stage2Completion)}
          onChange={(checked) => handleToggleChange(record, "stage2Completion", checked)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Button onClick={() => handleOpenModal(record)}>
          View/Update
        </Button>
      ),
    }
  ];

  const formatDate = (dateString) => {
    return moment(dateString).format('DD-MM-YYYY');
  };

  const formatField = (field) => {
    if (!field) return 'N/A';

    const match = field.match(/(Done|Not Done) \(updated on ([\d\-T:.Z]+)\)/);
    if (match) {
      const status = match[1];
      const originalDate = match[2];
      const formattedDate = moment(originalDate, "YYYY-MM-DDTHH:mm:ss.SSSZ").format('DD-MM-YYYY');
      return `${status} (updated on ${formattedDate})`;
    }

    return field;
  };

  return (
    <>
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
        <Table columns={mediaColumns} dataSource={data} rowKey="_id" scroll={{ x: 'max-content', y: 601 }} sticky />
      </div>

      <Modal
        title="Details"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p><strong>Enrollment ID:</strong> {currentRecord?.enrollmentId}</p>
        <p><strong>Payment Amount:</strong> {(currentRecord?.payment?.stage2?.amount)}</p>
        <p><strong>Payment Mode:</strong> {(currentRecord?.payment?.stage2?.paymentMode)}</p>
        <p><strong>Payment Status:</strong> {(currentRecord?.payment?.stage2?.status)}</p>
        <p><strong>Sub Domain:</strong> {currentRecord?.subDomain}</p>
        <p><strong>Cat File:</strong> {formatField(currentRecord?.catFile)}</p>
        <p><strong>Product File:</strong> {formatField(currentRecord?.productFile)}</p>
        <p><strong>Logo:</strong> {formatField(currentRecord?.logo)}</p>
        <p><strong>Banner:</strong> {formatField(currentRecord?.banner)}</p>
        <p><strong>Gallery:</strong> {formatField(currentRecord?.gallery)}</p>
        <p><strong>Stage 2 Completion:</strong> {formatField(currentRecord?.stage2Completion)}</p>
       
      </Modal>

      <Modal
        title="Stage 2 Payment"
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
            amount: currentRecord?.payment?.stage2?.amount || '',
            paymentMode: currentRecord?.payment?.stage2?.paymentMode || '',
            status: currentRecord?.payment?.stage2?.status || '',
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
          type={currentRecord.template13Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('moving_to_stage_second')}
          style={{ width: '100%' }}
        >
          Moving To Stage 2
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template14Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('2nd_installment_reminder')}
          style={{ width: '100%' }}
        >
          2nd Installment Reminder
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template15Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('payment_due')}
          style={{ width: '100%' }}
        >
          Payment Due
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template16Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('banners')}
          style={{ width: '100%' }}
        >
          Banners
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template17Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('logo_file')}
          style={{ width: '100%' }}
        >
          Logo File
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template18Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('forgalleryaccess')}
          style={{ width: '100%' }}
        >
          Gallery Access
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template19Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('categor_selection')}
          style={{ width: '100%' }}
        >
          Category Selection
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template20Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('websitelearning')}
          style={{ width: '100%' }}
        >
          Website Learning
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template21Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('calling_status')}
          style={{ width: '100%' }}
        >
          Calling Status
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template22Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('week_off')}
          style={{ width: '100%' }}
        >
          Week Off
        </Button>
      </Col>
      <Col span={24}>
        <Button
          type={currentRecord.template23Sent ? 'primary' : 'default'}
          onClick={() => handleSendTemplate('manager_is_on_leave')}
          style={{ width: '100%' }}
        >
          Manager Is On Leave
        </Button>
      </Col>
    </Row>
  )}
</Modal>

      <Modal
        title="Description"
        open={isDescriptionModalVisible}
        onCancel={handleCancel}
        onOk={handleDescriptionSave}
      >
        <Form>
          <Form.Item label="Description">
            <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StageMedia;
