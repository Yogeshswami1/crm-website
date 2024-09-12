import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import PaymentModal from './PaymentModal';
import ServerPurchaseModal from './ServerPurchaseModal';
import DomainClaimModal from './DomainClaimModal';
import DomainMailVerificationModal from './DomainMailVerificationModal';
import WebsiteUploadedModal from './WebsiteUploadedModal';
import PaymentGatewayModal from './PaymentGatewayModal';
import Ready2HandoverModal from './Ready2HandoverModal';
import Stage3CompletionModal from './Stage3CompletionModal';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Stage3website = (record) => {
  const [data, setData] = useState([]);
  const [isIdPassModalVisible, setIsIdPassModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);


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
      // setPaymentGatewayValues(initialPaymentGatewayValues);
  
      const initialDomainClaimValues = filteredData.reduce((acc, record) => {
        acc[record._id] = record.domainClaim || '';
        return acc;
      }, {});
      // setDomainClaimValues(initialDomainClaimValues);
  
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data");
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
        // setSelectedTemplate(templateName);
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
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.payment?.stage3?.status === "Done" ? '#90EE90' : undefined }}  // Light green hex code
          onClick={() => openModal('payment', record)}
        >
          Edit Payment
        </Button>
      ),
    },    
    {
      title: "Server Purchase",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.serverPurchase === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
          onClick={() => openModal('server', record)}
        >
          Server Purchase
        </Button>
      ),
    },   
    {
      title: "Domain Claim",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.domainClaim ? '#90EE90' : undefined }}  // Light green if selectedTheme has a value
          onClick={() => openModal('domainclaim', record)}
        >
          Domain Claim
        </Button>
      ),
    },    
    {
      title: "Domain Mail Verification",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.domainMailVerification === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
          onClick={() => openModal('domainmail', record)}
        >
          Domain Mail Verification
        </Button>
      ),
    },   
    {
      title: "Website Uploaded",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.websiteUploaded === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
          onClick={() => openModal('websiteuploaded', record)}
        >
          Website Uploaded
        </Button>
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
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.paymentGateway ? '#90EE90' : undefined }}  // Light green if selectedTheme has a value
          onClick={() => openModal('paymentgateway', record)}
        >
          Payment Gateway
        </Button>
      ),
    },    
    {
      title: "Ready To Handover",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.readyToHandover === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
          onClick={() => openModal('ready2handover', record)}
        >
          Ready To Handover
        </Button>
      ),
    },   
    {
      title: "Stage 3 Completion",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record?.stage3Completion === 'Done' ? '#90EE90' : undefined }}  // Light green hex code
          onClick={() => openModal('stage3completion', record)}
        >
          Stage 3 Completion
        </Button>
      ),
    },   
  ];


  return (
    <>
      
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
      <Table columns={serverColumns} dataSource={data} rowKey="_id" scroll={{ x: 'max-content', y: 601 }} sticky />
    </div>

      {/* payment modal */}

      {visibleModal === 'payment' && (
        <PaymentModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* server purchase modal */}

{visibleModal === 'server' && (
        <ServerPurchaseModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* domain claim modal */}

{visibleModal === 'domainclaim' && (
        <DomainClaimModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

      {/* domain mail verification */}

{visibleModal === 'domainmail' && (
        <DomainMailVerificationModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

    {/* website uploaded modal */}

{visibleModal === 'websiteuploaded' && (
        <WebsiteUploadedModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{/* payment gateway modal */}
       
{visibleModal === 'paymentgateway' && (
        <PaymentGatewayModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{/* ready to handover modal */}

{visibleModal === 'ready2handover' && (
        <Ready2HandoverModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{/* stage 3 completion modal */}

{visibleModal === 'stage3completion' && (
        <Stage3CompletionModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

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
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="pass"
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>      
    </>
  );
};

export default Stage3website;
