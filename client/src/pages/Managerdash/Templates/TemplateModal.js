import React, { useEffect, useState } from 'react';
import { Modal, Table, Button } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const TemplateModal = ({ visible, onClose, currentRecord, apiUrl}) => {
  const [managerName, setManagerName] = useState(''); 

  
  useEffect(() => {
    const managerId = localStorage.getItem('managerId');

    
    const storedManagerName = localStorage.getItem('managerName');

    if (storedManagerName) {
      setManagerName(storedManagerName); 
    } else if (managerId) {
      const fetchManagerName = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/managers/${managerId}`);
          if (response.status === 200 && response.data) {
            setManagerName(response.data.name); 
            localStorage.setItem('managerName', response.data.name);
          }
        } catch (error) {
          console.error('Failed to fetch manager name:', error);
        }
      };
      fetchManagerName();
    }
  }, [apiUrl]);

  const handleSendTemplate = async (templateName) => {
    try {
      let primaryContact = currentRecord.primaryContact;
      if (/^\d{10}$/.test(primaryContact)) {
        primaryContact = `+91${primaryContact}`;
      }

      // Define placeholders based on the template
      let placeholders = [];
      if (templateName === '1_message') {
        placeholders = [managerName];
      } else if (templateName === 'id_card') {
        placeholders = [managerName]; 
      }

      const response = await axios.post(`${apiUrl}/api/whatsapp/send-template-message`, {
        to: primaryContact,
        language: 'en',
        templateName,
        contactId: currentRecord._id,
        placeholders, // Pass placeholders for templates that need them
      });

      if (response.status === 200) {
        toast.success('Template sent successfully');
      } else {
        toast.error('Failed to send template');
      }
    } catch (error) {
      toast.error('Failed to send template');
    }
  };

  // Define table columns
  const columns = [
    {
      title: 'Serial No',
      dataIndex: 'serialNo',
      key: 'serialNo',
      align: 'center',
    },
    {
      title: 'Template Name',
      dataIndex: 'templateName',
      key: 'templateName',
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
    },
  ];

  // Define table data
  const dataSource = [
    {
      key: '1',
      serialNo: '1',
      templateName: '1_message',
      action: (
        <Button
          onClick={() => handleSendTemplate('1_message')}
          style={{
            backgroundColor: currentRecord.template1Sent ? 'green' : '',
            color: currentRecord.template1Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '2',
      serialNo: '2',
      templateName: 'client_information_form',
      action: (
        <Button
          onClick={() => handleSendTemplate('client_information_form')}
          style={{
            backgroundColor: currentRecord.template2Sent ? 'green' : '',
            color: currentRecord.template2Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '3',
      serialNo: '3',
      templateName: 'id_card',
      action: (
        <Button
          onClick={() => handleSendTemplate('id_card')}
          style={{
            backgroundColor: currentRecord.template3Sent ? 'green' : '',
            color: currentRecord.template3Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '4',
      serialNo: '4',
      templateName: 'performa_invoice_1',
      action: (
        <Button
          onClick={() => handleSendTemplate('performa_invoice_1')}
          style={{
            backgroundColor: currentRecord.template4Sent ? 'green' : '',
            color: currentRecord.template4Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '5',
      serialNo: '5',
      templateName: 'theme',
      action: (
        <Button
          onClick={() => handleSendTemplate('theme')}
          style={{
            backgroundColor: currentRecord.template5Sent ? 'green' : '',
            color: currentRecord.template5Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '6',
      serialNo: '6',
      templateName: 'theme1',
      action: (
        <Button
          onClick={() => handleSendTemplate('theme1')}
          style={{
            backgroundColor: currentRecord.template6Sent ? 'green' : '',
            color: currentRecord.template6Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '7',
      serialNo: '7',
      templateName: 'theme_2_new',
      action: (
        <Button
          onClick={() => handleSendTemplate('theme_2_new')}
          style={{
            backgroundColor: currentRecord.template7Sent ? 'green' : '',
            color: currentRecord.template7Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '8',
      serialNo: '8',
      templateName: 'theme_3_new',
      action: (
        <Button
          onClick={() => handleSendTemplate('theme_3_new')}
          style={{
            backgroundColor: currentRecord.template8Sent ? 'green' : '',
            color: currentRecord.template8Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '9',
      serialNo: '9',
      templateName: 'finalize_the_theme',
      action: (
        <Button
          onClick={() => handleSendTemplate('finalize_the_theme')}
          style={{
            backgroundColor: currentRecord.template9Sent ? 'green' : '',
            color: currentRecord.template9Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '10',
      serialNo: '10',
      templateName: 'pending',
      action: (
        <Button
          onClick={() => handleSendTemplate('pending')}
          style={{
            backgroundColor: currentRecord.template10Sent ? 'green' : '',
            color: currentRecord.template10Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '11',
      serialNo: '11',
      templateName: '1stage_to_2stage',
      action: (
        <Button
          onClick={() => handleSendTemplate('1stage_to_2stage')}
          style={{
            backgroundColor: currentRecord.template11Sent ? 'green' : '',
            color: currentRecord.template11Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '12',
      serialNo: '12',
      templateName: 'payment_pending',
      action: (
        <Button
          onClick={() => handleSendTemplate('payment_pending')}
          style={{
            backgroundColor: currentRecord.template12Sent ? 'green' : '',
            color: currentRecord.template12Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '13',
      serialNo: '13',
      templateName: 'gallery_access',
      action: (
        <Button
          onClick={() => handleSendTemplate('gallery_access')}
          style={{
            backgroundColor: currentRecord.template13Sent ? 'green' : '',
            color: currentRecord.template13Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '14',
      serialNo: '14',
      templateName: 'category_selection_new',
      action: (
        <Button
          onClick={() => handleSendTemplate('category_selection_new')}
          style={{
            backgroundColor: currentRecord.template14Sent ? 'green' : '',
            color: currentRecord.template14Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '15',
      serialNo: '15',
      templateName: 'logo_file_v2',
      action: (
        <Button
          onClick={() => handleSendTemplate('logo_file_v2')}
          style={{
            backgroundColor: currentRecord.template15Sent ? 'green' : '',
            color: currentRecord.template15Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '16',
      serialNo: '16',
      templateName: 'banners_v2',
      action: (
        <Button
          onClick={() => handleSendTemplate('banners_v2')}
          style={{
            backgroundColor: currentRecord.template16Sent ? 'green' : '',
            color: currentRecord.template16Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '17',
      serialNo: '17',
      templateName: 'domain_and_server',
      action: (
        <Button
          onClick={() => handleSendTemplate('domain_and_server')}
          style={{
            backgroundColor: currentRecord.template17Sent ? 'green' : '',
            color: currentRecord.template17Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '18',
      serialNo: '18',
      templateName: 'website_is_live',
      action: (
        <Button
          onClick={() => handleSendTemplate('website_is_live')}
          style={{
            backgroundColor: currentRecord.template18Sent ? 'green' : '',
            color: currentRecord.template18Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '19',
      serialNo: '19',
      templateName: 'handover_new',
      action: (
        <Button
          onClick={() => handleSendTemplate('handover_new')}
          style={{
            backgroundColor: currentRecord.template19Sent ? 'green' : '',
            color: currentRecord.template19Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '20',
      serialNo: '20',
      templateName: 'cc_avenue',
      action: (
        <Button
          onClick={() => handleSendTemplate('cc_avenue')}
          style={{
            backgroundColor: currentRecord.template20Sent ? 'green' : '',
            color: currentRecord.template20Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '21',
      serialNo: '21',
      templateName: 'payment_gateway_active',
      action: (
        <Button
          onClick={() => handleSendTemplate('payment_gateway_active')}
          style={{
            backgroundColor: currentRecord.template21Sent ? 'green' : '',
            color: currentRecord.template21Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    {
      key: '22',
      serialNo: '22',
      templateName: 'ccavenue',
      action: (
        <Button
          onClick={() => handleSendTemplate('ccavenue')}
          style={{
            backgroundColor: currentRecord.template22Sent ? 'green' : '',
            color: currentRecord.template22Sent ? 'white' : '',
          }}
        >
          Send
        </Button>
      ),
    },
    // Add more templates if necessary
  ];

  return (
    <Modal
      title="Select a Template"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <p>Select a template to send to {currentRecord.enrollmentId}:</p>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        rowKey="key"
        size="middle"
      />
    </Modal>
  );
};

export default TemplateModal;
