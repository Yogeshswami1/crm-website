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
 Select
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
import { toast } from 'react-toastify';


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


// const handleAddOrUpdateContact = async (values) => {
//   try {
//     if (currentContact) {
//       // Update existing contact
//       const response = await axios.put(`${apiUrl}/api/contact/${currentContact._id}`, values);
//       const updatedContacts = originalContacts.map((contact) =>
//         contact._id === currentContact._id ? response.data : contact
//       );
//       setOriginalContacts(updatedContacts);
//       setContacts(updatedContacts);
//       message.success("Contact updated successfully!");
//     } else {
//       // Add new contact
//       const response = await axios.post(`${apiUrl}/api/contact/add`, values);
//       const newContact = {
//         ...response.data,
//         date: values.date.format("DD/MM/YYYY"),
//       };
//       const updatedContacts = [...originalContacts, newContact];
//       setOriginalContacts(updatedContacts);
//       setContacts(updatedContacts);
//       message.success("Contact added successfully!");
//     }
//     setIsModalVisible(false);
//     form.resetFields();
//   } catch (error) {
//     console.error(currentContact ? "Error updating contact:" : "Error adding contact:", error);
//     message.error(currentContact ? "Failed to update contact. Please try again." : "Failed to add contact. Please try again.");
//   }
// };


const handleAddOrUpdateContact = async (values) => {
  try {
    // Prepend "WB" to the enrollmentId value
    const enrollmentIdWithPrefix = `WB${values.enrollmentId}`;

    // Create a contact data object with the modified enrollmentId
    const contactData = {
      ...values,
      enrollmentId: enrollmentIdWithPrefix,
      date: values.date.format("YYYY/MM/DD"),
    };

    if (currentContact) {
      // Update existing contact
      const response = await axios.put(`${apiUrl}/api/contact/${currentContact._id}`, contactData);
      const updatedContacts = originalContacts.map((contact) =>
        contact._id === currentContact._id ? response.data : contact
      );
      setOriginalContacts(updatedContacts);
      setContacts(updatedContacts);
      toast.success("Contact updated successfully!");
    } else {
      // Add new contact
      const response = await axios.post(`${apiUrl}/api/contact/add`, contactData);
      const newContact = {
        ...response.data,
        date: values.date.format("YYYY/MM/DD"),
      };
      const updatedContacts = [...originalContacts, newContact];
      setOriginalContacts(updatedContacts);
      setContacts(updatedContacts);
      toast.success("Contact added successfully!");
    }
    setIsModalVisible(false);
    form.resetFields();
  } catch (error) {
    console.error(currentContact ? "Error updating contact:" : "Error adding contact:", error);
    toast.error(currentContact ? "Failed to update contact. Please try again." : "Failed to add contact. Please try again.");
  }
};


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
    
    toast.success(
      `File uploaded and contacts imported successfully! ${response.data.skippedEntriesCount} entries were skipped.`
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    setUploading(false);
    toast.error("Failed to upload file and import contacts. Please try again.");
  }
};


 const uploadProps = {
   name: "file",
   beforeUpload: (file) => {
     const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
     if (!isCSV) {
       toast.error("You can only upload CSV files!");
     }
     return isCSV;
   },
   onChange: (info) => {
     if (info.file.status === "done") {
       toast.success(`${info.file.name} file uploaded successfully.`);
     } else if (info.file.status === "error") {
       toast.error(`${info.file.name} file upload failed.`);
     }
   },
   customRequest: ({ file }) => {
     handleUpload(file);
   },
 };


 const handleDelete = async (id) => {
   try {
     await axios.delete(`${apiUrl}/api/contact/${id}`);
     toast.success("Contact deleted successfully");
     fetchContacts();
   } catch (error) {
     console.error("Error deleting contact:", error);
     toast.error("Failed to delete contact");
   }
 };


 const handleDeleteSelected = async () => {
   try {
     if (selectedRowKeys.length === 0) {
       toast.warning("Please select contacts to delete.");
       return;
     }


     await axios.delete(`${apiUrl}/api/contact/delete-multiple`, {
       data: { ids: selectedRowKeys.filter((key) => key !== null) },
     });


     toast.success("Selected contacts deleted successfully");
     fetchContacts();
     setSelectedRowKeys([]);
   } catch (error) {
     console.error("Error deleting selected contacts:", error);
     toast.error("Failed to delete selected contacts");
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
   toast.success("Filters applied successfully!");
 };


 const resetFilters = () => {
   filterForm.resetFields();
   setContacts(originalContacts);
   setIsFilterModalVisible(false);
   toast.success("Filters reset successfully!");
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
     render: (text) => moment(text).format("YYYY/MM/DD"),
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
     date: currentContact ? moment(currentContact.date, "YYYY/MM/DD") : moment(),
   }}
   onFinish={handleAddOrUpdateContact}
 >
   <Form.Item
  label="Enrollment ID"
  name="enrollmentId"
  rules={[{ required: true, message: "Please input the Enrollment ID!" }]}
>
  <Input addonBefore="WB" placeholder="Enter the ID number" />
</Form.Item>

   <Form.Item
     label="Date"
     name="date"
     rules={[{ required: true, message: "Please select the date!" }]}
   >
     <DatePicker format="YYYY/MM/DD" />
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
  initialValue="WEBSITE" // Set default value to "WEBSITE"
  rules={[{ required: true, message: "Please select the service!" }]}
>
  <Input disabled value="WEBSITE" /> {/* Display and disable the input */}
</Form.Item>

<Form.Item
  label="Manager's Position"
  name="managerPosition"
  rules={[{ required: true, message: "Please select the manager's position!" }]}
>
  <Select placeholder="Select a position">
    {[...Array(20)].map((_, index) => (
      <Select.Option key={`TL${index + 1}`} value={`TL${index + 1}`}>
        TL{index + 1}
      </Select.Option>
    ))}
  </Select>
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


