

// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import {
//   Row,
//   Col,
//   Card,
//   Table,
//   message,
//   Button,
//   Modal,
//   Form,
//   Input,
//   DatePicker,
//   Upload,
//   Select,
//   Popconfirm,
// } from "antd";
// import {
//   PlusOutlined,
//   UploadOutlined,
//   DeleteOutlined,
//   EditOutlined,
//   ExclamationCircleOutlined,
//   DownloadOutlined,
// } from "@ant-design/icons";
// import axios from "axios";
// import Sample from "./Sample.csv";
// import "./Contact.css";


// const { confirm } = Modal;
// const { Option } = Select; // Destructure Option from Select

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const initialContactData = [];

// function Contact() {
//   const [contacts, setContacts] = useState(initialContactData);
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [currentContact, setCurrentContact] = useState(null);
//   const [services, setServices] = useState([]);
//   const [minEnrollmentId, setMinEnrollmentId] = useState("");
//   const [maxEnrollmentId, setMaxEnrollmentId] = useState("");
//   const [singleEnrollmentId, setSingleEnrollmentId] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [filteredContacts, setFilteredContacts] = useState(initialContactData);
//   const [selectedService, setSelectedService] = useState("");

//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchContacts();
//     fetchServices();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/get`);
//       setContacts(response.data);
//       setFilteredContacts(response.data); // Initialize filteredContacts
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       message.error("Failed to load data. Please try again.");
//     }
//   };
  
//   const fetchServices = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/services/get`);
//       const serviceNames = response.data.map((service) => service.serviceName);
//       setServices(serviceNames);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//       message.error("Failed to load services. Please try again.");
//     }
//   };

//   const handleView = (record) => {
//     setCurrentContact(record);
//     setIsModalVisible(true);
//     form.setFieldsValue({
//       ...record,
//       date: moment(record.date, "DD/MM/YYYY"),
//     });
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//     setCurrentContact(null);
//     form.resetFields();
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setCurrentContact(null);
//     form.resetFields();
//   };

//   const handleAddOrUpdateContact = async (values) => {
//     try {
//       // Check if the service exists
//       if (!services.includes(values.service)) {
//         message.error("Service does not exist. Please select a valid service.");
//         return;
//       }
  
//       if (currentContact) {
//         const response = await axios.put(
//           `${apiUrl}/api/contact/${currentContact._id}`,
//           values
//         );
//         const updatedContacts = contacts.map((contact) =>
//           contact._id === currentContact._id ? response.data : contact
//         );
//         setContacts(updatedContacts);
//         setFilteredContacts(updatedContacts); // Update filteredContacts as well
//         message.success("Contact updated successfully!");
//       } else {
//         const response = await axios.post(`${apiUrl}/api/contact/add`, values);
//         const newContact = {
//           ...response.data,
//           date: values.date.format("DD/MM/YYYY"),
//         };
//         const updatedContacts = [ newContact,...contacts];
//         setContacts(updatedContacts);
//         setFilteredContacts(updatedContacts); // Update filteredContacts as well
//         message.success("Contact added successfully!");
//       }
//       setIsModalVisible(false);
//     } catch (error) {
//       console.error(
//         currentContact ? "Error updating contact:" : "Error adding contact:",
//         error
//       );
//       message.error(
//         currentContact
//           ? "Failed to update contact. Please try again."
//           : "Failed to add contact. Please try again."
//       );
//     }
//   };
  
//   const handleUpload = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
  
//     try {
//       setUploading(true);
//       const response = await axios.post(`${apiUrl}/api/upload/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setUploading(false);
  
//       // Format the date correctly
//       const newContacts = response.data.contacts.map(contact => ({
//         ...contact,
//         date: moment(contact.date).format("DD/MM/YYYY"), // Ensure correct date format
//       }));
  
//       // Update both contacts and filteredContacts state
//       const updatedContacts = [...contacts, ...newContacts];
//       setContacts(updatedContacts);
//       setFilteredContacts(updatedContacts);
  
//       message.success(
//         `File uploaded and contacts imported successfully! ${response.data.skippedEntriesCount} entries were skipped.`
//       );
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setUploading(false);
//       message.error("Failed to upload file and import contacts. Please try again.");
//     }
//   };
  

//   const uploadProps = {
//     name: "file",
//     beforeUpload: (file) => {
//       const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
//       if (!isCSV) {
//         message.error("You can only upload CSV files!");
//       }
//       return isCSV;
//     },
//     onChange: (info) => {
//       if (info.file.status === "done") {
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (info.file.status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     customRequest: ({ file }) => {
//       handleUpload(file);
//     },
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${apiUrl}/api/contact/${id}`);
//       message.success("Contact deleted successfully");
//       fetchContacts();
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//       message.error("Failed to delete contact");
//     }
//   };

//   const handleDeleteSelected = async () => {
//     try {
//       if (selectedRowKeys.length === 0) {
//         message.warning("Please select contacts to delete.");
//         return;
//       }

//       const response = await axios.delete(`${apiUrl}/api/contact/delete-multiple`, {
//         data: { ids: selectedRowKeys.filter((key) => key !== null) },
//       });

//       message.success("Selected contacts deleted successfully");
//       fetchContacts();
//       setSelectedRowKeys([]);
//     } catch (error) {
//       console.error("Error deleting selected contacts:", error);
//       message.error("Failed to delete selected contacts");
//     }
//   };

//   const handleFilterContacts = () => {
//     let filtered = contacts;
  
//     // Filter by Single Enrollment ID
//     if (singleEnrollmentId) {
//       filtered = filtered.filter((contact) =>
//         contact.enrollmentId
//           ? contact.enrollmentId.toUpperCase().includes(singleEnrollmentId.toUpperCase())
//           : false
//       );
//     }
//     if (phoneNumber) {
//       filtered = filtered.filter((contact) =>
//         contact.primaryContact
//           ? contact.primaryContact.includes(phoneNumber)
//           : false
//       );
//     }
//     // Filter by Phone Number
   
//     // Filter by Enrollment ID Range
//     if (minEnrollmentId && maxEnrollmentId) {
//       filtered = filtered.filter((contact) => {
//         const contactId = contact.enrollmentId ? contact.enrollmentId.toUpperCase() : "";
//         return contactId >= minEnrollmentId.toUpperCase() && contactId <= maxEnrollmentId.toUpperCase();
//       });
//     }
//     if (selectedService) {
//       filtered = filtered.filter((contact) =>
//         contact.service ? contact.service === selectedService : false
//       );
//     }
  
//     setFilteredContacts(filtered);
//   };
  
//   const handleResetFilters = () => {
//     setMinEnrollmentId("");
//     setMaxEnrollmentId("");
//     setSingleEnrollmentId("");
//     setPhoneNumber("");
//     setFilteredContacts(contacts);
//   };

//   const columns = [
//     {
//       title: "Enrollment ID",
//       dataIndex: "enrollmentId",
//       key: "enrollmentId",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//       render: (text) => moment(text).format("DD/MM/YYYY"),
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Primary Contact",
//       dataIndex: "primaryContact",
//       key: "primaryContact",
//     },
//     {
//       title: "Secondary Contact",
//       dataIndex: "secondaryContact",
//       key: "secondaryContact",
//     },
    
//     {
//       title: "Service",
//       dataIndex: "service",
//       key: "service",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <span>
//           <Button
//             type="link"
//             onClick={() => handleView(record)}
//             icon={<EditOutlined />}
//           >
//             Edit
//           </Button>
//           <Popconfirm
//             title="Are you sure you want to delete this contact?"
//             onConfirm={() => handleDelete(record._id)}
//             icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
//           >
//             <Button type="link" icon={<DeleteOutlined />} danger>
//               Delete
//             </Button>
//           </Popconfirm>
//         </span>
//       ),
//     },
//   ];

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: setSelectedRowKeys,
//   };

//   return (
//     <>
//       <div className="contact-container">
//         <Row gutter={[16, 16]}>
//           <Col span={24}>
//             <Card
//               title="Contacts"
//               extra={
//                 <Button
//                   type="primary"
//                   icon={<PlusOutlined />}
//                   onClick={showModal}
//                 >
//                   Add Contact
//                 </Button>
//               }
//             >
//               <div className="contact-actions">
//                 <Popconfirm
//                   title="Are you sure you want to delete selected contacts?"
//                   onConfirm={handleDeleteSelected}
//                   icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
//                 >
//                   <Button
//                     type="danger"
//                     icon={<DeleteOutlined />}
//                     disabled={selectedRowKeys.length === 0}
//                   >
//                     Delete Selected
//                   </Button>
//                 </Popconfirm>
//                 <Upload {...uploadProps}>
//                   <Button
//                     icon={<UploadOutlined />}
//                     style={{ marginLeft: 8 }}
//                     loading={uploading}
//                   >
//                     Upload Contacts
//                   </Button>
//                 </Upload>
//                 <a href={Sample} download="Sample.csv">
//                   <Button
//                     icon={<DownloadOutlined />}
//                     style={{ marginLeft: 8 }}
//                   >
//                     Download Sample
//                   </Button>
//                 </a>
//               </div>
//               <div className="filter-section">
//                 <Input
//                   placeholder="Single Enrollment ID"
//                   value={singleEnrollmentId}
//                   onChange={(e) => setSingleEnrollmentId(e.target.value)}
//                   style={{ width: 200, marginRight: 8 }}
//                 />
//                 <Input
//   placeholder="Phone Number"
//   value={phoneNumber}
//   onChange={(e) => setPhoneNumber(e.target.value)}
//   style={{ width: 200, marginRight: 8 }}
// />

              
//                 <Input
//                   placeholder="Min Enrollment ID"
//                   value={minEnrollmentId}
//                   onChange={(e) => setMinEnrollmentId(e.target.value)}
//                   style={{ width: 200, marginRight: 8 }}
//                 />
//                 <Input
//                   placeholder="Max Enrollment ID"
//                   value={maxEnrollmentId}
//                   onChange={(e) => setMaxEnrollmentId(e.target.value)}
//                   style={{ width: 200, marginRight: 8 }}
//                 />
//                 <Select
//     placeholder="Select Service"
//     value={selectedService}
//     onChange={(value) => setSelectedService(value)}
//     style={{ width: 200, marginRight: 8 }}
//   >
//     {services.map((service) => (
//       <Option key={service} value={service}>
//         {service}
//       </Option>
//     ))}
//   </Select>
//                 <Button type="primary" onClick={handleFilterContacts}>
//                   Filter
//                 </Button>
//                 <Button onClick={handleResetFilters} style={{ marginLeft: 8 }}>
//                   Reset
//                 </Button>
//               </div>
//               <Table
//                 rowSelection={rowSelection}
//                 columns={columns}
//                 dataSource={filteredContacts}
//                 rowKey="_id"
//                 pagination={{ pageSize: 10 }}
//               />
//             </Card>
//           </Col>
//         </Row>
//       </div>

//       <Modal
//         title={currentContact ? "Edit Contact" : "Add Contact"}
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleAddOrUpdateContact}
//           initialValues={
//             currentContact
//               ? {
//                   ...currentContact,
//                   date: moment(currentContact.date, "DD/MM/YYYY"),
//                 }
//               : {}
//           }
//         >
//           <Form.Item
//             label="Enrollment ID"
//             name="enrollmentId"
//             rules={[{ required: true, message: "Please input the Enrollment ID!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Date"
//             name="date"
//             rules={[{ required: true, message: "Please select the date!" }]}
//           >
//             <DatePicker format="DD/MM/YYYY" />
//           </Form.Item>
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: "Please input the name!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: "Please input the email!" }]}
//           >
//             <Input type="email" />
//           </Form.Item>
//           <Form.Item
//             label="Primary Contact"
//             name="primaryContact"
//             rules={[{ required: true, message: "Please input the primary contact!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item label="Secondary Contact" name="secondaryContact">
//             <Input />
//           </Form.Item>
         
//           <Form.Item
//             label="Service"
//             name="service"
//             rules={[{ required: true, message: "Please input the service!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Manager's Position"
//             name="managerPosition"
//             rules={[{ required: true, message: "Please input the manager's position!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
//               {currentContact ? "Update" : "Add"}
//             </Button>
//             <Button onClick={handleCancel}>Cancel</Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// }

// export default Contact;

import React, { useState, useEffect } from "react";
import moment from "moment";
import {
 Row,
 Col,
 Card,
 Table,
 message,
 Button,
 Modal,
 Form,
 Input,
 DatePicker,
 Upload,
 Popconfirm,
} from "antd";
import {
 PlusOutlined,
 UploadOutlined,
 DeleteOutlined,
 EditOutlined,
 ExclamationCircleOutlined,
 DownloadOutlined,
 FilterOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Sample from "./Sample.csv";
import "./Contact.css";


const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { confirm } = Modal;


const initialContactData = [];


function Contact() {
 const [originalContacts, setOriginalContacts] = useState(initialContactData);
 const [contacts, setContacts] = useState(initialContactData);
 const [selectedRowKeys, setSelectedRowKeys] = useState([]);
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
 const [uploading, setUploading] = useState(false);
 const [currentContact, setCurrentContact] = useState(null);
 const [services, setServices] = useState([]);
 const [form] = Form.useForm();
 const [filterForm] = Form.useForm();


 useEffect(() => {
   fetchContacts();
   fetchServices();
 }, []);


 const fetchContacts = async () => {
   try {
     const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
     setOriginalContacts(response.data);
     setContacts(response.data);
   } catch (error) {
     console.error("Error fetching data:", error);
     message.error("Failed to load data. Please try again.");
   }
 };

// const fetchContacts = async () => {
//   try {
//     const response = await axios.get(`${apiUrl}/api/contact/get`);
//     const contactsWithDate = response.data.map(contact => ({
//       ...contact,
//       createdAt: new Date(contact.createdAt)
//     }));
//     const sortedContacts = contactsWithDate.sort((a, b) => b.createdAt - a.createdAt);
//     setOriginalContacts(sortedContacts);
//     setContacts(sortedContacts);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     message.error("Failed to load data. Please try again.");
//   }
// };



 const fetchServices = async () => {
   try {
     const response = await axios.get(`${apiUrl}/api/services/get`);
     const serviceNames = response.data.map(service => service.serviceName);
     setServices(serviceNames);
   } catch (error) {
     console.error("Error fetching services:", error);
     message.error("Failed to load services. Please try again.");
   }
 };


 const handleView = (record) => {
   setCurrentContact(record);
   setIsModalVisible(true);
   form.setFieldsValue({
     ...record,
     date: moment(record.date, "DD/MM/YYYY"),
   });
 };


 const showModal = () => {
   setIsModalVisible(true);
   setCurrentContact(null);
   form.resetFields();
 };


 const handleCancel = () => {
   setIsModalVisible(false);
   setCurrentContact(null);
   form.resetFields();
 };


//  const handleAddOrUpdateContact = async (values) => {
//    try {
//      // Check for unique Enrollment ID
//      if (originalContacts.some(contact => contact.enrollmentId === values.enrollmentId)) {
//        message.error("Enrollment ID must be unique. Please enter a different Enrollment ID.");
//        return;
//      }
//       // Check for unique Primary Contact in a particular service
//      if (originalContacts.some(contact => contact.service === values.service && contact.primaryContact === values.primaryContact)) {
//        message.error(`Primary Contact for the service ${values.service} must be unique. Please enter a different Primary Contact.`);
//        return;
//      }
//       if (currentContact) {
//        const response = await axios.put(`${apiUrl}/api/contact/${currentContact._id}`, values);
//        setOriginalContacts(
//          originalContacts.map((contact) =>
//            contact._id === currentContact._id ? response.data : contact
//          )
//        );
//        message.success("Contact updated successfully!");
//      } else {
//        const response = await axios.post(`${apiUrl}/api/contact/add`, values);
//        const newContact = {
//          ...response.data,
//          date: values.date.format("DD/MM/YYYY"),
//        };
//        setOriginalContacts([...originalContacts, newContact]);
//        message.success("Contact added successfully!");
//      }
//      setContacts(originalContacts);
//      setIsModalVisible(false);
//    } catch (error) {
//      console.error(currentContact ? "Error updating contact:" : "Error adding contact:", error);
//      message.error(currentContact ? "Failed to update contact. Please try again." : "Failed to add contact. Please try again.");
//    }
//  };

const handleAddOrUpdateContact = async (values) => {
  try {
    if (currentContact) {
      // Update existing contact
      const response = await axios.put(`${apiUrl}/api/contact/${currentContact._id}`, values);
      const updatedContacts = originalContacts.map((contact) =>
        contact._id === currentContact._id ? response.data : contact
      );
      setOriginalContacts(updatedContacts);
      setContacts(updatedContacts);
      message.success("Contact updated successfully!");
    } else {
      // Add new contact
      const response = await axios.post(`${apiUrl}/api/contact/add`, values);
      const newContact = {
        ...response.data,
        date: values.date.format("DD/MM/YYYY"),
      };
      const updatedContacts = [...originalContacts, newContact];
      setOriginalContacts(updatedContacts);
      setContacts(updatedContacts);
      message.success("Contact added successfully!");
    }
    setIsModalVisible(false);
    form.resetFields();
  } catch (error) {
    console.error(currentContact ? "Error updating contact:" : "Error adding contact:", error);
    message.error(currentContact ? "Failed to update contact. Please try again." : "Failed to add contact. Please try again.");
  }
};




//  const handleUpload = async (file) => {
//    const formData = new FormData();
//    formData.append("file", file);


//    try {
//      setUploading(true);
//      const response = await axios.post(
//        `${apiUrl}/api/upload/upload`,
//        formData,
//        {
//          headers: {
//            "Content-Type": "multipart/form-data",
//          },
//        }
//      );
//      setUploading(false);
//      setOriginalContacts([...originalContacts, ...response.data.contacts]);
//      setContacts([...originalContacts, ...response.data.contacts]);
//      message.success(
//        `File uploaded and contacts imported successfully! ${response.data.skippedEntriesCount} entries were skipped.`
//      );
//    } catch (error) {
//      console.error("Error uploading file:", error);
//      setUploading(false);
//      message.error("Failed to upload file and import contacts. Please try again.");
//    }
//  };
const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    setUploading(true);
    const response = await axios.post(
      `${apiUrl}/api/upload/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setUploading(false);
    
    // Sort the contacts in descending order before updating the state
    const sortedContacts = response.data.contacts.sort((a, b) => b._id.localeCompare(a._id));
    
    setOriginalContacts([...sortedContacts, ...originalContacts]);
    setContacts([...sortedContacts, ...originalContacts]);
    
    message.success(
      `File uploaded and contacts imported successfully! ${response.data.skippedEntriesCount} entries were skipped.`
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    setUploading(false);
    message.error("Failed to upload file and import contacts. Please try again.");
  }
};


 const uploadProps = {
   name: "file",
   beforeUpload: (file) => {
     const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
     if (!isCSV) {
       message.error("You can only upload CSV files!");
     }
     return isCSV;
   },
   onChange: (info) => {
     if (info.file.status === "done") {
       message.success(`${info.file.name} file uploaded successfully.`);
     } else if (info.file.status === "error") {
       message.error(`${info.file.name} file upload failed.`);
     }
   },
   customRequest: ({ file }) => {
     handleUpload(file);
   },
 };


 const handleDelete = async (id) => {
   try {
     await axios.delete(`${apiUrl}/api/contact/${id}`);
     message.success("Contact deleted successfully");
     fetchContacts();
   } catch (error) {
     console.error("Error deleting contact:", error);
     message.error("Failed to delete contact");
   }
 };


 const handleDeleteSelected = async () => {
   try {
     if (selectedRowKeys.length === 0) {
       message.warning("Please select contacts to delete.");
       return;
     }


     await axios.delete(`${apiUrl}/api/contact/delete-multiple`, {
       data: { ids: selectedRowKeys.filter((key) => key !== null) },
     });


     message.success("Selected contacts deleted successfully");
     fetchContacts();
     setSelectedRowKeys([]);
   } catch (error) {
     console.error("Error deleting selected contacts:", error);
     message.error("Failed to delete selected contacts");
   }
 };


 const applyFilters = (values) => {
   const filteredContacts = originalContacts.filter((contact) => {
     const { enrollmentId, service, primaryContact, name, email } = values;
     return (
       (!enrollmentId || contact.enrollmentId.includes(enrollmentId)) &&
       (!service || contact.service === service) &&
       (!primaryContact || contact.primaryContact.includes(primaryContact)) &&
       (!name || contact.name.includes(name)) &&
       (!email || contact.email.includes(email))
     );
   });


   setContacts(filteredContacts);
   setIsFilterModalVisible(false);
   message.success("Filters applied successfully!");
 };


 const resetFilters = () => {
   filterForm.resetFields();
   setContacts(originalContacts);
   setIsFilterModalVisible(false);
   message.success("Filters reset successfully!");
 };


 const columns = [
   {
     title: "Enrollment ID",
     dataIndex: "enrollmentId",
     key: "enrollmentId",
   },
   {
     title: "Date",
     dataIndex: "date",
     key: "date",
     render: (text) => moment(text).format("DD/MM/YYYY"),
   },
   {
     title: "Name",
     dataIndex: "name",
     key: "name",
   },
   {
     title: "Email",
     dataIndex: "email",
     key: "email",
   },
   {
     title: "Primary Contact",
     dataIndex: "primaryContact",
     key: "primaryContact",
   },
   {
     title: "Secondary Contact",
     dataIndex: "secondaryContact",
     key: "secondaryContact",
   },
   {
     title: "Service",
     dataIndex: "service",
     key: "service",
   },
   {
    title: "Manager Position",
    dataIndex: ["managerId", "position"],
    key: "managerPosition",
  },


   {
     title: "Action",
     key: "action",
     render: (_, record) => (
       <span>
         <Button type="link" onClick={() => handleView(record)} icon={<EditOutlined />}>
           Edit
         </Button>
         <Popconfirm
           title="Are you sure you want to delete this contact?"
           onConfirm={() => handleDelete(record._id)}
           icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
         >
           <Button type="link" icon={<DeleteOutlined />} danger>
             Delete
           </Button>
         </Popconfirm>
       </span>
     ),
   },
 ];


 const rowSelection = {
   selectedRowKeys,
   onChange: setSelectedRowKeys,
 };


 return (
   <>
     <div className="contact-container">
       <Row gutter={[16, 16]}>
         <Col span={24}>
           <Card
             title="Contacts"
             extra={
               <>
                 <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                   Add Contact
                 </Button>
                 <Button
                   type="default"
                   icon={<FilterOutlined />}
                   onClick={() => setIsFilterModalVisible(true)}
                   style={{ marginLeft: 8 }}
                 >
                   Filters
                 </Button>
                 <Button
                   type="danger"
                   icon={<DeleteOutlined />}
                   onClick={handleDeleteSelected}
                   disabled={!selectedRowKeys.length}
                   style={{ marginLeft: 8 }}
                 >
                   Delete Selected
                 </Button>
                 <a href={Sample} download>
                   <Button
                     type="primary"
                     icon={<DownloadOutlined />}
                     style={{ marginLeft: 8 }}
                   >
                     Sample CSV
                   </Button>
                 </a>
                 <Upload {...uploadProps} showUploadList={false}>
                   <Button
                     type="primary"
                     icon={<UploadOutlined />}
                     loading={uploading}
                     style={{ marginLeft: 8 }}
                   >
                     Upload CSV
                   </Button>
                 </Upload>
               </>
             }
           >
             <Table
               rowSelection={rowSelection}
               columns={columns}
               dataSource={contacts}
               rowKey="_id"
             />
           </Card>
         </Col>
       </Row>

<Modal
 title={currentContact ? "Edit Contact" : "Add Contact"}
 visible={isModalVisible}
 onCancel={handleCancel}
 footer={null}
>
 <Form
   form={form}
   initialValues={{
     ...currentContact,
     date: currentContact ? moment(currentContact.date, "DD/MM/YYYY") : moment(),
   }}
   onFinish={handleAddOrUpdateContact}
 >
   <Form.Item
     label="Enrollment ID"
     name="enrollmentId"
     rules={[{ required: true, message: "Please input the Enrollment ID!" }]}
   >
     <Input />
   </Form.Item>
   <Form.Item
     label="Date"
     name="date"
     rules={[{ required: true, message: "Please select the date!" }]}
   >
     <DatePicker format="DD/MM/YYYY" />
   </Form.Item>
   <Form.Item
     label="Name"
     name="name"
     rules={[{ required: true, message: "Please input the name!" }]}
   >
     <Input />
   </Form.Item>
   <Form.Item
     label="Email"
     name="email"
     rules={[
       { required: true, message: "Please input the email!" },
       { type: "email", message: "Please enter a valid email!" },
     ]}
   >
     <Input />
   </Form.Item>
   <Form.Item
     label="Primary Contact"
     name="primaryContact"
     rules={[
       { required: true, message: "Please input the primary contact!" },
     ]}
   >
     <Input />
   </Form.Item>
   <Form.Item
     label="Secondary Contact"
     name="secondaryContact"
   >
     <Input />
   </Form.Item>
   <Form.Item
     label="Service"
     name="service"
     rules={[{ required: true, message: "Please select the service!" }]}
   >
     <Input />
   </Form.Item>
   <Form.Item
     label="Manager's Position"
     name="managerPosition"
     rules={[{ required: true, message: "Please input the manager's position!" }]}
   >
     <Input />
   </Form.Item>
   <Form.Item>
     <Button type="primary" htmlType="submit">
       {currentContact ? "Update" : "Add"}
     </Button>
   </Form.Item>
 </Form>
</Modal>




       <Modal
         title="Apply Filters"
         visible={isFilterModalVisible}
         onCancel={() => setIsFilterModalVisible(false)}
         footer={null}
       >
         <Form form={filterForm} onFinish={applyFilters}>
           <Form.Item label="Enrollment ID" name="enrollmentId">
             <Input placeholder="Enter Enrollment ID" />
           </Form.Item>
           <Form.Item label="Service" name="service">
             <Input placeholder="Enter Service" />
           </Form.Item>
           <Form.Item label="Primary Contact" name="primaryContact">
             <Input placeholder="Enter Primary Contact" />
           </Form.Item>
           <Form.Item label="Name" name="name">
             <Input placeholder="Enter Name" />
           </Form.Item>
           <Form.Item label="Email" name="email">
             <Input placeholder="Enter Email" />
           </Form.Item>
           <Form.Item>
             <Button type="primary" htmlType="submit">
               Apply Filters
             </Button>
             <Button
               type="default"
               onClick={resetFilters}
               style={{ marginLeft: 8 }}
             >
               Reset Filters
             </Button>
           </Form.Item>
         </Form>
       </Modal>
     </div>
   </>
 );
}


export default Contact;


