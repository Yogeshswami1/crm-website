// import React, { useState, useEffect } from 'react';
// import { Button, message, Modal, Input, Table, Select } from 'antd';
// import axios from 'axios';
// import { AlignRightOutlined, MessageOutlined, WhatsAppOutlined } from '@ant-design/icons';
// import Chat from './Chat';
// import './Floatingbutton.css';

// const { Option } = Select;
// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const FloatingButton = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [chatModalVisible, setChatModalVisible] = useState(false);
//   const [wabaModalVisible, setWabaModalVisible] = useState(false);
//   const [enrollmentIds, setEnrollmentIds] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [templates, setTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState('');
//   const [searchText, setSearchText] = useState('');
//   const managerId = localStorage.getItem("managerId");

//   useEffect(() => {
//     fetchTemplates();
//     fetchEnrollmentIds();
//   }, []);

//   const fetchTemplates = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/whatsapp/get-templates`);
//       setTemplates(response.data);
//     } catch (error) {
//       console.error('Error fetching templates:', error);
//       message.error('Error fetching templates.');
//     }
//   };

//   const fetchEnrollmentIds = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
//       setEnrollmentIds(response.data);
//       setFilteredData(response.data);
//     } catch (error) {
//       console.error('Error fetching enrollment IDs:', error);
//       message.error('Error fetching enrollment IDs.');
//     }
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleChatClick = () => {
//     setChatModalVisible(true);
//   };

//   const handleWABAClick = () => {
//     setWabaModalVisible(true);
//   };

//   const handleCancelChat = () => {
//     setChatModalVisible(false);
//   };

//   const handleCancelWABA = () => {
//     setWabaModalVisible(false);
//   };

//   const handleSendTemplate = async () => {
//     if (!selectedTemplate) {
//       message.error('Please select a template.');
//       return;
//     }

//     const selectedContacts = enrollmentIds.filter(contact => selectedRowKeys.includes(contact.enrollmentId));

//     try {
//       await Promise.all(selectedContacts.map(contact => {
//         let to = contact.primaryContact;
//         if (to.length === 10) {
//           to = `+91${to}`;
//         }

//         return axios.post(`${apiUrl}/api/whatsapp/send-template-message`, {
//           to,
//           language: 'en',
//           templateName: selectedTemplate,
//           contactId: contact._id,
//         });
//       }));

//       message.success("Templates sent successfully");
//       fetchEnrollmentIds(); // Fetch the updated data to reflect changes in the UI
//       setSelectedRowKeys([]); // Clear selection
//     } catch (error) {
//       message.error("Failed to send templates");
//     }
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchText(value);
//     const filtered = enrollmentIds.filter(contact =>
//       contact.enrollmentId.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const columns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     }
//   ];

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: setSelectedRowKeys,
//   };

//   return (
//     <div className="floating-container">
//       <Button
//         type="primary"
//         shape="circle"
//         icon={<AlignRightOutlined />}
//         size="large"
//         className="floating-button"
//         onClick={toggleMenu}
//       />
//       {isOpen && (
//         <div className="floating-menu">
//           <Button
//             type="default"
//             icon={<MessageOutlined />}
//             size="large"
//             className="floating-menu-item"
//             onClick={handleChatClick}
//           >
//             Chat
//           </Button>
//           <Button
//             type="default"
//             icon={<WhatsAppOutlined />}
//             size="large"
//             className="floating-menu-item"
//             onClick={handleWABAClick}
//           >
//             DoubleTick
//           </Button>
//         </div>
//       )}
//       <Modal
//         title="Chat"
//         visible={chatModalVisible}
//         onCancel={handleCancelChat}
//         footer={null}
//       >
//         <Chat />
//       </Modal>
//       <Modal
//         title="Send WABA Message"
//         visible={wabaModalVisible}
//         onCancel={handleCancelWABA}
//         footer={null}
//       >
//         <Input
//           placeholder="Search by Enrollment ID"
//           value={searchText}
//           onChange={handleSearch}
//           style={{ marginBottom: 16 }}
//         />
//         <Select
//           style={{ width: '100%', marginBottom: 16 }}
//           placeholder="Select a template"
//           onChange={value => setSelectedTemplate(value)}
//         >
//           {templates.map(template => (
//             <Option key={template.name} value={template.name}>
//               {template.name}
//             </Option>
//           ))}
//         </Select>
//         <Table
//           rowSelection={rowSelection}
//           columns={columns}
//           dataSource={filteredData.map((id) => ({
//             enrollmentId: id.enrollmentId,
//             primaryContact: id.primaryContact,
//             _id: id._id // Assuming _id is the unique identifier
//           }))}
//           rowKey="enrollmentId"
//         />
//         <Button
//           type="primary"
//           style={{ marginTop: 16 }}
//           onClick={handleSendTemplate}
//         >
//           Send Template to Selected
//         </Button>
//       </Modal>
//     </div>
//   );
// };

// export default FloatingButton;


import React, { useState, useEffect } from 'react';
import { Button, message, Modal, Input, Table, Select } from 'antd';
import axios from 'axios';
import { AlignRightOutlined, MessageOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Chat from './Chat';
import './Floatingbutton.css';

const { Option } = Select;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [wabaModalVisible, setWabaModalVisible] = useState(false);
  const [enrollmentIds, setEnrollmentIds] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [managerService, setManagerService] = useState('');
  const managerId = localStorage.getItem('managerId');

  useEffect(() => {
    fetchManagerDetails();
    fetchTemplates();
    fetchEnrollmentIds();
  }, []);

  const fetchManagerDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/managers/${managerId}`);
      setManagerService(response.data.service);
    } catch (error) {
      console.error('Error fetching manager details:', error);
      message.error('Error fetching manager details.');
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/whatsapp/get-templates`);
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
      message.error('Error fetching templates.');
    }
  };

  const fetchEnrollmentIds = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
      setEnrollmentIds(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching enrollment IDs:', error);
      message.error('Error fetching enrollment IDs.');
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChatClick = () => {
    setChatModalVisible(true);
  };

  const handleWABAClick = () => {
    setWabaModalVisible(true);
  };

  const handleCancelChat = () => {
    setChatModalVisible(false);
  };

  const handleCancelWABA = () => {
    setWabaModalVisible(false);
  };

  const handleSendTemplate = async () => {
    if (!selectedTemplate) {
      message.error('Please select a template.');
      return;
    }

    const selectedContacts = enrollmentIds.filter(contact => selectedRowKeys.includes(contact.enrollmentId));

    try {
      await Promise.all(selectedContacts.map(contact => {
        let to = contact.primaryContact;
        if (to.length === 10) {
          to = `+91${to}`;
        }

        return axios.post(`${apiUrl}/api/whatsapp/send-template-message`, {
          to,
          language: 'en',
          templateName: selectedTemplate,
          contactId: contact._id,
        });
      }));

      message.success('Templates sent successfully');
      fetchEnrollmentIds(); // Fetch the updated data to reflect changes in the UI
      setSelectedRowKeys([]); // Clear selection
    } catch (error) {
      message.error('Failed to send templates');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = enrollmentIds.filter(contact =>
      contact.enrollmentId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    }
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  if (managerService !== 'WEBSITE') {
    return null;
  }

  return (
    <div className="floating-container">
      <Button
        type="primary"
        shape="circle"
        icon={<AlignRightOutlined />}
        size="large"
        className="floating-button"
        onClick={toggleMenu}
      />
      {isOpen && (
        <div className="floating-menu">
          <Button
            type="default"
            icon={<MessageOutlined />}
            size="large"
            className="floating-menu-item"
            onClick={handleChatClick}
          >
            Chat
          </Button>
          <Button
            type="default"
            icon={<WhatsAppOutlined />}
            size="large"
            className="floating-menu-item"
            onClick={handleWABAClick}
          >
            DoubleTick
          </Button>
        </div>
      )}
      <Modal
        title="Chat"
        visible={chatModalVisible}
        onCancel={handleCancelChat}
        footer={null}
      >
        <Chat />
      </Modal>
      <Modal
        title="Send WABA Message"
        visible={wabaModalVisible}
        onCancel={handleCancelWABA}
        footer={null}
      >
        <Input
          placeholder="Search by Enrollment ID"
          value={searchText}
          onChange={handleSearch}
          style={{ marginBottom: 16 }}
        />
        <Select
          style={{ width: '100%', marginBottom: 16 }}
          placeholder="Select a template"
          onChange={value => setSelectedTemplate(value)}
        >
          {templates.map(template => (
            <Option key={template.name} value={template.name}>
              {template.name}
            </Option>
          ))}
        </Select>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData.map(id => ({
            enrollmentId: id.enrollmentId,
            primaryContact: id.primaryContact,
            _id: id._id // Assuming _id is the unique identifier
          }))}
          rowKey="enrollmentId"
        />
        <Button
          type="primary"
          style={{ marginTop: 16 }}
          onClick={handleSendTemplate}
        >
          Send Template to Selected
        </Button>
      </Modal>
    </div>
  );
};

export default FloatingButton;

