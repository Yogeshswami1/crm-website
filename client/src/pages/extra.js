// import React, { useState, useEffect } from "react";
// import { Table, Space, Button, Modal, Form, Input, message, Switch, Select, DatePicker } from "antd";
// import axios from "axios";

// const { Option } = Select;

// const Managerdashboard = () => {
//   const [data, setData] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [recordToEdit, setRecordToEdit] = useState(null);
//   const [enrollmentId, setEnrollmentId] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [legalityModalVisible, setLegalityModalVisible] = useState(false);
//   const [legalityDate, setLegalityDate] = useState(null);
//   const [selectedRecord, setSelectedRecord] = useState(null);

//   const managerId = localStorage.getItem('managerId');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const columns = [
//     {
//       title: "Enrollment ID",
//       dataIndex: "enrollmentId",
//       key: "enrollmentId",
//     },
//     {
//       title: "Tasks",
//       dataIndex: "tasks",
//       key: "tasks",
//       render: (tasks) => (
//         <ul>
//           {tasks.map((task, index) => (
//             <li key={index}>{task.description}</li>
//           ))}
//         </ul>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Space size="middle">
//           <Button type="primary" onClick={() => handleEdit(record)}>
//             Edit
//           </Button>
//           <Button type="danger" onClick={() => handleDelete(record)}>
//             Delete
//           </Button>
//           <Button
//             type="primary"
//             onClick={() => handleStatusChange(record, "Done")}
//             disabled={record.status === "Done"}
//           >
//             Done
//           </Button>
//           <Button
//             type="default"
//             onClick={() => handleStatusChange(record, "Pending")}
//             disabled={record.status === "Pending"}
//           >
//             Pending
//           </Button>
//           <Button
//             type="default"
//             onClick={() => handleStatusChange(record, "Error")}
//             disabled={record.status === "Error"}
//           >
//             Error
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   const stageColumns = [
//     { title: "Date", dataIndex: "date", key: "date" },
//     { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
//     { title: "Manager Position", dataIndex: "position", key: "position" },
//     { title: "ID Card", dataIndex: "idCard", key: "idCard", render: (text, record) => (<Switch checked={record.idCard === "Yes"} onChange={(checked) => handleToggleChange(record, 'idCard', checked)} />) },
//     { title: "Training", dataIndex: "training", key: "training", render: (text, record) => (<Switch checked={record.training === "Yes"} onChange={(checked) => handleToggleChange(record, 'training', checked)} />) },
//     { title: "Ebook", dataIndex: "ebook", key: "ebook", render: (text, record) => (<Switch checked={record.ebook === "Yes"} onChange={(checked) => handleToggleChange(record, 'ebook', checked)} />) },
//     { title: "Support Portal", dataIndex: "supportPortal", key: "supportPortal", render: (text, record) => (<Switch checked={record.supportPortal === "Yes"} onChange={(checked) => handleToggleChange(record, 'supportPortal', checked)} />) },
//     { title: "Wallet Portal", dataIndex: "walletPortal", key: "walletPortal", render: (text, record) => (<Switch checked={record.walletPortal === "Yes"} onChange={(checked) => handleToggleChange(record, 'walletPortal', checked)} />) },
//     { title: "Gallery", dataIndex: "gallery", key: "gallery", render: (text, record) => (<Switch checked={record.gallery === "Yes"} onChange={(checked) => handleToggleChange(record, 'gallery', checked)} />) },
//     {
//       title: "Legality",
//       dataIndex: "legality",
//       key: "legality",
//       render: (text, record) => (
//         <Button type="default" onClick={() => showLegalityModal(record)}>
//           {record.legality ? `Done (${record.legality})` : "Not Done"}
//         </Button>
//       ),
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//       render: (text, record) => (
//         <Select value={record.category} onChange={(value) => handleCategoryChange(record, value)}>
//           <Option value="Silver">Silver</Option>
//           <Option value="Gold">Gold</Option>
//           <Option value="Platinum">Platinum</Option>
//         </Select>
//       ),
//     },
//   ];

//   const stage2InColumns = [
//     { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
//     { title: "State IN", dataIndex: "state", key: "state" },
//     { title: "GST", dataIndex: "gst", key: "gst" },
//     { title: "Onboarding_Status", dataIndex: "onboardingStatus", key: "onboardingStatus" },
//     { title: "Brand Name", dataIndex: "brandname", key: "brandname" },
//     { title: "Account Open", dataIndex: "accountOpenIn", key: "accountOpenIn" },
//     { title: "ID & PASS IN", dataIndex: "idAndPassIn", key: "idAndPassIn" },
//     { title: "GTIN", dataIndex: "gtin", key: "gtin" },
//     { title: "Listings IN", dataIndex: "listingsIn", key: "listingsIn" },
//     { title: "Launch Date", dataIndex: "launchDateIn", key: "launchDateIn" },
//     { title: "Add Region", dataIndex: "region", key: "region" },
//     { title: "Shipping", dataIndex: "shipping", key: "shipping" },
//     { title: "Category", dataIndex: "category", key: "category" },
//     { title: "FBA", dataIndex: "fbaIn", key: "fbaIn" },
//   ];

//   const stage2ComColumns = [
//     { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
//     { title: "State COM", dataIndex: "statecom", key: "statecom" },
//     { title: "Document", dataIndex: "document", key: "document" },
//     { title: "Store Name", dataIndex: "storeName", key: "storeName" },
//     { title: "Account Open", dataIndex: "accountOpenCom", key: "accountOpenCom" },
//     { title: "ID & PASS COM", dataIndex: "idAndPassCom", key: "idAndPassCom" },
//     { title: "Video KYC", dataIndex: "videoKyc", key: "videoKyc" },
//     { title: "1$ Deduct", dataIndex: "deduct", key: "deduct" },
//     { title: "Listings COM", dataIndex: "listingsCom", key: "listingsCom" },
//     { title: "Launch Date", dataIndex: "launchDateCom", key: "launchDateCom" },
//     { title: "NIA", dataIndex: "nia", key: "nia" },
//     { title: "50$ Add Credit", dataIndex: "addCredit", key: "addCredit" },
//     { title: "FBA", dataIndex: "fbaCom", key: "fbaCom" },
//     { title: "Category", dataIndex: "category", key: "category" },
//   ];

//   const fetchData = async () => {
//     try {
//       console.log("m", managerId);
//       const response = await axios.get(`http://localhost:8000/api/contact/getall?managerId=${managerId}`);
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   const showModal = (editMode, record) => {
//     setEditMode(editMode);
//     setRecordToEdit(record);
//     setVisible(true);
//     if (editMode && record) {
//       setEnrollmentId(record.enrollmentId);
//       setTasks([...record.tasks]);
//     } else {
//       setEnrollmentId("");
//       setTasks([]);
//     }
//   };

//   const handleCancel = () => {
//     setVisible(false);
//     setEditMode(false);
//     setRecordToEdit(null);
//     setEnrollmentId("");
//     setTasks([]);
//   };

//   const handleEnrollmentIdChange = (e) => {
//     setEnrollmentId(e.target.value);
//   };

//   const handleAddTask = () => {
//     setTasks([...tasks, { description: "", status: "Pending" }]);
//   };

//   const handleTaskChange = (index, value) => {
//     const newTasks = [...tasks];
//     newTasks[index] = { ...newTasks[index], description: value };
//     setTasks(newTasks);
//   };

//   const handleFormSubmit = async () => {
//     if (data.some((item) => item.enrollmentId === enrollmentId && (!editMode || (editMode && recordToEdit._id !== item._id)))) {
//       message.error("Enrollment ID already exists");
//       return;
//     }

//     if (editMode && recordToEdit) {
//       try {
//         await axios.put(
//           `http://localhost:8000/api/task/update/${recordToEdit._id}`,
//           { enrollmentId, tasks }
//         );
//         const updatedData = data.map((item) => {
//           if (item._id === recordToEdit._id) {
//             return { ...item, enrollmentId, tasks };
//           }
//           return item;
//         });
//         setData(updatedData);
//         message.success("Tasks updated successfully");
//       } catch (error) {
//         console.error("Error updating tasks: ", error);
//         message.error("Failed to update tasks");
//       }
//     } else {
//       try {
//         await axios.post("http://localhost:8000/api/task/create", {
//           enrollmentId,
//           tasks,
//         });
//         fetchData();
//         message.success("Tasks added successfully");
//       } catch (error) {
//         console.error("Error adding tasks: ", error);
//         message.error("Failed to add tasks");
//       }
//     }
//     setVisible(false);
//     setEditMode(false);
//     setRecordToEdit(null);
//     setEnrollmentId("");
//     setTasks([]);
//   };

//   const handleEdit = (record) => {
//     showModal(true, record);
//   };

//   const handleDelete = async (record) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/task/delete/${record._id}`);
//       const updatedData = data.filter((item) => item._id !== record._id);
//       setData(updatedData);
//       message.success("Task deleted successfully");
//     } catch (error) {
//       console.error("Error deleting task: ", error);
//       message.error("Failed to delete task");
//     }
//   };

//   const handleStatusChange = async (record, status) => {
//     try {
//       await axios.patch(
//         `http://localhost:8000/api/task/status/${record._id}`,
//         { status }
//       );
//       const updatedData = data.map((item) => {
//         if (item._id === record._id) {
//           return { ...item, status };
//         }
//         return item;
//       });
//       setData(updatedData);
//       message.success(`Status updated to ${status}`);
//     } catch (error) {
//       console.error(`Error updating status to ${status}: `, error);
//       message.error(`Failed to update status to ${status}`);
//     }
//   };

//   const handleToggleChange = async (record, field, checked) => {
//     const value = checked ? "Yes" : "No";
//     try {
//       await axios.patch(`http://localhost:8000/api/contact/update/${record._id}`, { [field]: value });
//       const updatedData = data.map((item) => {
//         if (item._id === record._id) {
//           return { ...item, [field]: value };
//         }
//         return item;
//       });
//       setData(updatedData);
//       message.success(`${field} updated to ${value}`);
//     } catch (error) {
//       console.error(`Error updating ${field} to ${value}: `, error);
//       message.error(`Failed to update ${field} to ${value}`);
//     }
//   };

//   const handleCategoryChange = async (record, value) => {
//     try {
//       await axios.patch(`http://localhost:8000/api/contact/update/${record._id}`, { category: value });
//       const updatedData = data.map((item) => {
//         if (item._id === record._id) {
//           return { ...item, category: value };
//         }
//         return item;
//       });
//       setData(updatedData);
//       message.success(`Category updated to ${value}`);
//     } catch (error) {
//       console.error(`Error updating category to ${value}: `, error);
//       message.error(`Failed to update category to ${value}`);
//     }
//   };

//   const showLegalityModal = (record) => {
//     setSelectedRecord(record);
//     setLegalityDate(record.legality);
//     setLegalityModalVisible(true);
//   };

//   const handleLegalityModalCancel = () => {
//     setLegalityModalVisible(false);
//     setSelectedRecord(null);
//     setLegalityDate(null);
//   };

//   const handleLegalityDateChange = (date, dateString) => {
//     setLegalityDate(dateString);
//   };

//   const handleLegalitySave = async () => {
//     if (!selectedRecord) return;
//     try {
//       await axios.patch(`http://localhost:8000/api/contact/update/${selectedRecord._id}`, { legality: legalityDate });
//       const updatedData = data.map((item) => {
//         if (item._id === selectedRecord._id) {
//           return { ...item, legality: legalityDate };
//         }
//         return item;
//       });
//       setData(updatedData);
//       message.success(`Legality date updated to ${legalityDate}`);
//       setLegalityModalVisible(false);
//       setSelectedRecord(null);
//       setLegalityDate(null);
//     } catch (error) {
//       console.error(`Error updating legality date: `, error);
//       message.error(`Failed to update legality date`);
//     }
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: 16 }}>
//         <Button type={activeTab === "dashboard" ? "primary" : "default"} onClick={() => setActiveTab("dashboard")}>
//           Dashboard
//         </Button>
//         <Button type={activeTab === "tasks" ? "primary" : "default"} onClick={() => setActiveTab("tasks")}>
//           Tasks
//         </Button>
//         <Button type={activeTab === "stage1" ? "primary" : "default"} onClick={() => setActiveTab("stage1")}>
//           STAGE1
//         </Button>
//         <Button type={activeTab === "stage2in" ? "primary" : "default"} onClick={() => setActiveTab("stage2in")}>
//           STAGE2(IN)
//         </Button>
//         <Button type={activeTab === "stage2com" ? "primary" : "default"} onClick={() => setActiveTab("stage2com")}>
//           STAGE2(COM)
//         </Button>
//       </div>
//       {activeTab === "tasks" && (
//         <div>
//           <Button type="primary" onClick={() => showModal(false, null)}>
//             Add Tasks
//           </Button>
//           <Table columns={columns} dataSource={data} rowKey="_id" />
//         </div>
//       )}

//       {activeTab === "dashboard" && (
//         <div>
//           {/* Render the dashboard content here */}
//         </div>
//       )}

//       {activeTab === "stage1" && (
//         <Table columns={stageColumns} dataSource={data} rowKey="_id" />
//       )}

//       {activeTab === "stage2in" && (
//         <div>
//           <Table columns={stage2InColumns} dataSource={data} rowKey="_id" />
//         </div>
//       )}

//       {activeTab === "stage2com" && (
//         <div>
//           <Table columns={stage2ComColumns} dataSource={data} rowKey="_id" />
//         </div>
//       )}

//       <Modal
//         title={editMode ? "Edit Tasks" : "Add Tasks"}
//         open={visible}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="cancel" onClick={handleCancel}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleFormSubmit}>
//             Submit
//           </Button>,
//         ]}
//       >
//         <Form>
//           <Form.Item label="Enrollment ID">
//             <Input value={enrollmentId} onChange={handleEnrollmentIdChange} />
//           </Form.Item>
//           {tasks.map((task, index) => (
//             <Form.Item label={`Task ${index + 1}`} key={index}>
//               <Input
//                 value={task.description}
//                 onChange={(e) => handleTaskChange(index, e.target.value)}
//               />
//             </Form.Item>
//           ))}
//           <Button type="dashed" onClick={handleAddTask} style={{ width: "100%" }}>
//             Add Task
//           </Button>
//         </Form>
//       </Modal>

//       <Modal
//         title="Legality Status"
//         open={legalityModalVisible}
//         onCancel={handleLegalityModalCancel}
//         footer={[
//           <Button key="cancel" onClick={handleLegalityModalCancel}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleLegalitySave}>
//             Save
//           </Button>,
//         ]}
//       >
//         <div>
//           {selectedRecord && selectedRecord.legality ? (
//             <p>Current Legality Date: {selectedRecord.legality}</p>
//           ) : (
//             <p>No Legality Date Set</p>
//           )}
//           <DatePicker onChange={handleLegalityDateChange} />
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Managerdashboard;


import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Form, Input, message, Switch, Select, DatePicker, InputNumber, TabPane, Tabs, callback } from "antd";
import axios from "axios";
import moment from 'moment';

const { Option } = Select;

const Managerdashboard = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [enrollmentId, setEnrollmentId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [legalityModalVisible, setLegalityModalVisible] = useState(false);
  const [legalityDate, setLegalityDate] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // New state variables for STAGE2(IN)
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [gstModalVisible, setGstModalVisible] = useState(false);
  const [onboardingStatusModalVisible, setOnboardingStatusModalVisible] = useState(false);
  const [brandNameModalVisible, setBrandNameModalVisible] = useState(false);
  const [idPassModalVisible, setIdPassModalVisible] = useState(false);
  const [launchDateModalVisible, setLaunchDateModalVisible] = useState(false);

  const [currentState, setCurrentState] = useState("");
  const [currentGst, setCurrentGst] = useState(false);
  const [currentOnboardingStatus, setCurrentOnboardingStatus] = useState("");
  const [currentBrandName, setCurrentBrandName] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [currentLaunchDate, setCurrentLaunchDate] = useState(null);

  // New state variables for STAGE2(COM)
  const [stateCom, setStateCom] = useState("");
  const [documentStatus, setDocumentStatus] = useState({ creditCard: null, bankStatement: null });
  const [storeName, setStoreName] = useState("");
  const [accountOpenCom, setAccountOpenCom] = useState(false);
  const [idAndPassCom, setIdAndPassCom] = useState({ id: "", pass: "" });
  const [videoKyc, setVideoKyc] = useState(false);
  const [deduct, setDeduct] = useState(false);
  const [listingsCom, setListingsCom] = useState(0);
  const [launchDateCom, setLaunchDateCom] = useState(null);
  const [nia, setNia] = useState(false);
  const [addCredit, setAddCredit] = useState(false);
  const [fbaCom, setFbaCom] = useState(false);
  const [category, setCategory] = useState("");

  const managerId = localStorage.getItem('managerId');

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
    },
    // {
    //   title: "Tasks",
    //   dataIndex: "tasks",
    //   key: "tasks",
    //   render: (tasks) => (
    //     <ul>
    //       {tasks.map((task, index) => (
    //         <li key={index}>{task.description}</li>
    //       ))}
    //     </ul>
    //   ),
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record)}>
            Delete
          </Button>
          <Button
            type="primary"
            onClick={() => handleStatusChange(record, "Done")}
            disabled={record.status === "Done"}
          >
            Done
          </Button>
          <Button
            type="default"
            onClick={() => handleStatusChange(record, "Pending")}
            disabled={record.status === "Pending"}
          >
            Pending
          </Button>
          <Button
            type="default"
            onClick={() => handleStatusChange(record, "Error")}
            disabled={record.status === "Error"}
          >
            Error
          </Button>
        </Space>
      ),
    },
  ];

  const stageColumns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
    { title: "ID Card", dataIndex: "idCard", key: "idCard", render: (text, record) => (<Switch checked={record.idCard === "Yes"} onChange={(checked) => handleToggleChange(record, 'idCard', checked)} />) },
    { title: "Training", dataIndex: "training", key: "training", render: (text, record) => (<Switch checked={record.training === "Yes"} onChange={(checked) => handleToggleChange(record, 'training', checked)} />) },
    { title: "Ebook", dataIndex: "ebook", key: "ebook", render: (text, record) => (<Switch checked={record.ebook === "Yes"} onChange={(checked) => handleToggleChange(record, 'ebook', checked)} />) },
    { title: "Support Portal", dataIndex: "supportPortal", key: "supportPortal", render: (text, record) => (<Switch checked={record.supportPortal === "Yes"} onChange={(checked) => handleToggleChange(record, 'supportPortal', checked)} />) },
    { title: "Wallet Portal", dataIndex: "walletPortal", key: "walletPortal", render: (text, record) => (<Switch checked={record.walletPortal === "Yes"} onChange={(checked) => handleToggleChange(record, 'walletPortal', checked)} />) },
    { title: "Gallery", dataIndex: "gallery", key: "gallery", render: (text, record) => (<Switch checked={record.gallery === "Yes"} onChange={(checked) => handleToggleChange(record, 'gallery', checked)} />) },
    {
      title: "Legality",
      dataIndex: "legality",
      key: "legality",
      render: (text, record) => (
        <Button type="default" onClick={() => showLegalityModal(record)}>
          {record.legality ? `Done (${record.legality})` : "Not Done"}
        </Button>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record) => (
        <Select value={record.category} onChange={(value) => handleCategoryChange(record, value)}>
          <Option value="Silver">Silver</Option>
          <Option value="Gold">Gold</Option>
          <Option value="Platinum">Platinum</Option>
        </Select>
      ),
    },
  ];

  const stage2InColumns = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
    { title: "State IN", dataIndex: "state", key: "state", render: (text, record) => (<Button onClick={() => showStateModal(record)}>{record.state || "Set State"}</Button>) },
    { title: "GST", dataIndex: "gst", key: "gst", render: (text, record) => (<Switch checked={record.gst === "Yes"} onChange={(checked) => handleGstChange(record, checked)} />) },
    { title: "Onboarding Status", dataIndex: "onboardingStatus", key: "onboardingStatus", render: (text, record) => (<Button onClick={() => showOnboardingStatusModal(record)}>{record.onboardingStatus || "Not Done"}</Button>) },
    { title: "Brand Name", dataIndex: "brandName", key: "brandName", render: (text, record) => (<Button onClick={() => showBrandNameModal(record)}>{record.brandName || "Set Brand Name"}</Button>) },
    { title: "Account Open", dataIndex: "accountOpenIn", key: "accountOpenIn", render: (text, record) => (<Switch checked={record.accountOpenIn === "Yes"} onChange={(checked) => handleToggleChange(record, 'accountOpenIn', checked)} />) },
    { title: "ID & PASS IN", dataIndex: "idAndPassIn", key: "idAndPassIn", render: (text, record) => (<Button onClick={() => showIdPassModal(record)}>{record.idAndPassIn || "Set ID & Pass"}</Button>) },
    { title: "Listings", dataIndex: "listings", key: "listings", render: (text, record) => (<InputNumber min={0} value={record.listings} onChange={(value) => handleListingsChange(record, value)} />) },
    { title: "Launch Date IN", dataIndex: "launchDateIn", key: "launchDateIn", render: (text, record) => (<Button onClick={() => showLaunchDateModal(record)}>{record.launchDateIn ? moment(record.launchDateIn).format('YYYY-MM-DD') : "Set Date"}</Button>) },
  ];

  const stage2ComColumns = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
    { title: "State COM", dataIndex: "stateCom", key: "stateCom", render: (text, record) => (<Button onClick={() => showStateComModal(record)}>{record.stateCom || "Set State"}</Button>) },
    { title: "Document Status", dataIndex: "documentStatus", key: "documentStatus", render: (text, record) => (<Button onClick={() => showDocumentStatusModal(record)}>{record.documentStatus ? `${record.documentStatus.creditCard ? "CC" : "No CC"}, ${record.documentStatus.bankStatement ? "BS" : "No BS"}` : "Set Document Status"}</Button>) },
    { title: "Store Name", dataIndex: "storeName", key: "storeName", render: (text, record) => (<Button onClick={() => showStoreNameModal(record)}>{record.storeName || "Set Store Name"}</Button>) },
    { title: "Account Open COM", dataIndex: "accountOpenCom", key: "accountOpenCom", render: (text, record) => (<Switch checked={record.accountOpenCom === "Yes"} onChange={(checked) => handleToggleChange(record, 'accountOpenCom', checked)} />) },
    { title: "ID & PASS COM", dataIndex: "idAndPassCom", key: "idAndPassCom", render: (text, record) => (<Button onClick={() => showIdPassComModal(record)}>{record.idAndPassCom ? `${record.idAndPassCom.id}/${record.idAndPassCom.pass}` : "Set ID & Pass"}</Button>) },
    { title: "Video KYC", dataIndex: "videoKyc", key: "videoKyc", render: (text, record) => (<Switch checked={record.videoKyc === "Yes"} onChange={(checked) => handleToggleChange(record, 'videoKyc', checked)} />) },
    { title: "Deduct", dataIndex: "deduct", key: "deduct", render: (text, record) => (<Switch checked={record.deduct === "Yes"} onChange={(checked) => handleToggleChange(record, 'deduct', checked)} />) },
    { title: "Listings COM", dataIndex: "listingsCom", key: "listingsCom", render: (text, record) => (<InputNumber min={0} value={record.listingsCom} onChange={(value) => handleListingsComChange(record, value)} />) },
    { title: "Launch Date COM", dataIndex: "launchDateCom", key: "launchDateCom", render: (text, record) => (<Button onClick={() => showLaunchDateComModal(record)}>{record.launchDateCom ? moment(record.launchDateCom).format('YYYY-MM-DD') : "Set Date"}</Button>) },
    { title: "NIA", dataIndex: "nia", key: "nia", render: (text, record) => (<Switch checked={record.nia === "Yes"} onChange={(checked) => handleToggleChange(record, 'nia', checked)} />) },
    { title: "Add Credit", dataIndex: "addCredit", key: "addCredit", render: (text, record) => (<Switch checked={record.addCredit === "Yes"} onChange={(checked) => handleToggleChange(record, 'addCredit', checked)} />) },
    { title: "FBA COM", dataIndex: "fbaCom", key: "fbaCom", render: (text, record) => (<Switch checked={record.fbaCom === "Yes"} onChange={(checked) => handleToggleChange(record, 'fbaCom', checked)} />) },
    { title: "Category", dataIndex: "category", key: "category", render: (text, record) => (<Select value={record.category} onChange={(value) => handleCategoryChange(record, value)}><Option value="Silver">Silver</Option><Option value="Gold">Gold</Option><Option value="Platinum">Platinum</Option></Select>) },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/managerDashboardData");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      message.error("Failed to fetch data.");
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setRecordToEdit(record);
    setVisible(true);
  };

  const handleGstChange = (value) => {
  // Update the state with the new GST value
  setRecordToEdit((prevRecord) => ({
    ...prevRecord,
    gst: value,
  }));
};

  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://localhost:5000/api/managerDashboardData/${record._id}`);
      message.success("Record deleted successfully.");
      fetchData();
    } catch (error) {
      console.error("Error deleting record: ", error);
      message.error("Failed to delete record.");
    }
  };

  const handleStatusChange = async (record, status) => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${record._id}`, { status });
      message.success(`Status updated to ${status}.`);
      fetchData();
    } catch (error) {
      console.error("Error updating status: ", error);
      message.error("Failed to update status.");
    }
  };

  const handleToggleChange = async (record, field, checked) => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${record._id}`, { [field]: checked ? "Yes" : "No" });
      message.success(`${field} updated.`);
      fetchData();
    } catch (error) {
      console.error(`Error updating ${field}: `, error);
      message.error(`Failed to update ${field}.`);
    }
  };

  const handleCategoryChange = async (record, category) => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${record._id}`, { category });
      message.success(`Category updated to ${category}.`);
      fetchData();
    } catch (error) {
      console.error("Error updating category: ", error);
      message.error("Failed to update category.");
    }
  };

  const handleListingsChange = async (record, value) => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${record._id}`, { listings: value });
      message.success("Listings updated.");
      fetchData();
    } catch (error) {
      console.error("Error updating listings: ", error);
      message.error("Failed to update listings.");
    }
  };

  const handleListingsComChange = async (record, value) => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${record._id}`, { listingsCom: value });
      message.success("Listings COM updated.");
      fetchData();
    } catch (error) {
      console.error("Error updating listings COM: ", error);
      message.error("Failed to update listings COM.");
    }
  };

  const showLegalityModal = (record) => {
    setSelectedRecord(record);
    setLegalityDate(record.legality ? moment(record.legality) : null);
    setLegalityModalVisible(true);
  };

  const showStateModal = (record) => {
    setSelectedRecord(record);
    setCurrentState(record.state || "");
    setStateModalVisible(true);
  };

  const showGstModal = (record) => {
    setSelectedRecord(record);
    setCurrentGst(record.gst === "Yes");
    setGstModalVisible(true);
  };

  const showOnboardingStatusModal = (record) => {
    setSelectedRecord(record);
    setCurrentOnboardingStatus(record.onboardingStatus || "");
    setOnboardingStatusModalVisible(true);
  };

  const showBrandNameModal = (record) => {
    setSelectedRecord(record);
    setCurrentBrandName(record.brandName || "");
    setBrandNameModalVisible(true);
  };

  const showIdPassModal = (record) => {
    setSelectedRecord(record);
    setCurrentId(record.idAndPassIn?.id || "");
    setCurrentPass(record.idAndPassIn?.pass || "");
    setIdPassModalVisible(true);
  };

  const showLaunchDateModal = (record) => {
    setSelectedRecord(record);
    setCurrentLaunchDate(record.launchDateIn ? moment(record.launchDateIn) : null);
    setLaunchDateModalVisible(true);
  };

  const showStateComModal = (record) => {
    setSelectedRecord(record);
    setStateCom(record.stateCom || "");
    setStateModalVisible(true);
  };

  const showDocumentStatusModal = (record) => {
    setSelectedRecord(record);
    setDocumentStatus(record.documentStatus || { creditCard: null, bankStatement: null });
    setGstModalVisible(true);
  };

  const showStoreNameModal = (record) => {
    setSelectedRecord(record);
    setStoreName(record.storeName || "");
    setOnboardingStatusModalVisible(true);
  };

  const showIdPassComModal = (record) => {
    setSelectedRecord(record);
    setIdAndPassCom(record.idAndPassCom || { id: "", pass: "" });
    setIdPassModalVisible(true);
  };

  const showLaunchDateComModal = (record) => {
    setSelectedRecord(record);
    setLaunchDateCom(record.launchDateCom ? moment(record.launchDateCom) : null);
    setLaunchDateModalVisible(true);
  };

  const handleLegalityOk = async () => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${selectedRecord._id}`, { legality: legalityDate });
      message.success("Legality date updated.");
      fetchData();
      setLegalityModalVisible(false);
    } catch (error) {
      console.error("Error updating legality date: ", error);
      message.error("Failed to update legality date.");
    }
  };

  const handleStateOk = async () => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${selectedRecord._id}`, { state: currentState });
      message.success("State updated.");
      fetchData();
      setStateModalVisible(false);
    } catch (error) {
      console.error("Error updating state: ", error);
      message.error("Failed to update state.");
    }
  };

  const handleGstOk = async () => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${selectedRecord._id}`, { gst: currentGst ? "Yes" : "No" });
      message.success("GST status updated.");
      fetchData();
      setGstModalVisible(false);
    } catch (error) {
      console.error("Error updating GST status: ", error);
      message.error("Failed to update GST status.");
    }
  };

  const handleOnboardingStatusOk = async () => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${selectedRecord._id}`, { onboardingStatus: currentOnboardingStatus });
      message.success("Onboarding status updated.");
      fetchData();
      setOnboardingStatusModalVisible(false);
    } catch (error) {
      console.error("Error updating onboarding status: ", error);
      message.error("Failed to update onboarding status.");
    }
  };

  const handleBrandNameOk = async () => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${selectedRecord._id}`, { brandName: currentBrandName });
      message.success("Brand name updated.");
      fetchData();
      setBrandNameModalVisible(false);
    } catch (error) {
      console.error("Error updating brand name: ", error);
      message.error("Failed to update brand name.");
    }
  };

  const handleIdPassOk = async () => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${selectedRecord._id}`, { idAndPassIn: { id: currentId, pass: currentPass } });
      message.success("ID & PASS IN updated.");
      fetchData();
      setIdPassModalVisible(false);
    } catch (error) {
      console.error("Error updating ID & PASS IN: ", error);
      message.error("Failed to update ID & PASS IN.");
    }
  };

  const handleLaunchDateOk = async () => {
    try {
      await axios.put(`http://localhost:5000/api/managerDashboardData/${selectedRecord._id}`, { launchDateIn: currentLaunchDate });
      message.success("Launch Date IN updated.");
      fetchData();
      setLaunchDateModalVisible(false);
    } catch (error) {
      console.error("Error updating Launch Date IN: ", error);
      message.error("Failed to update Launch Date IN.");
    }
  };

  return (
    <div>
       <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Dashboard" key="1">
          <Table
            dataSource={data}
            rowKey={(record) => record._id}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        <TabPane tab="STAGE1" key="2">
          <Table
            dataSource={data}
            rowKey={(record) => record._id}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        <TabPane tab="STAGE2 (IN)" key="3">
          <Table
            dataSource={data}
            rowKey={(record) => record._id}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        <TabPane tab="STAGE2 (COM)" key="4">
          <Table
            dataSource={data}
            rowKey={(record) => record._id}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
      </Tabs>
      <Table columns={columns} dataSource={data} rowKey="_id" />

      <Modal
        title="Edit Record"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          setVisible(false);
        }}
      >
        <Form>
          <Form.Item label="Enrollment ID">
            <Input
              value={recordToEdit?.enrollmentId}
              onChange={(e) =>
                setRecordToEdit({ ...recordToEdit, enrollmentId: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Tasks">
            <Select
              mode="multiple"
              value={tasks}
              onChange={(value) => setTasks(value)}
            >
              <Option value="Task1">Task1</Option>
              <Option value="Task2">Task2</Option>
              <Option value="Task3">Task3</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status">
            <Select
              value={recordToEdit?.status}
              onChange={(value) =>
                setRecordToEdit({ ...recordToEdit, status: value })
              }
            >
              <Option value="Pending">Pending</Option>
              <Option value="Done">Done</Option>
              <Option value="Error">Error</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Set Legality Date"
        visible={legalityModalVisible}
        onCancel={() => setLegalityModalVisible(false)}
        onOk={handleLegalityOk}
      >
        <DatePicker value={legalityDate} onChange={(date) => setLegalityDate(date)} />
      </Modal>

      <Modal
        title="Set State"
        visible={stateModalVisible}
        onCancel={() => setStateModalVisible(false)}
        onOk={handleStateOk}
      >
        <Input value={currentState} onChange={(e) => setCurrentState(e.target.value)} />
      </Modal>

      <Modal
        title="Set GST Status"
        visible={gstModalVisible}
        onCancel={() => setGstModalVisible(false)}
        onOk={handleGstOk}
      >
        <Switch checked={currentGst} onChange={(checked) => setCurrentGst(checked)} />
      </Modal>

      <Modal
        title="Set Onboarding Status"
        visible={onboardingStatusModalVisible}
        onCancel={() => setOnboardingStatusModalVisible(false)}
        onOk={handleOnboardingStatusOk}
      >
        <Input value={currentOnboardingStatus} onChange={(e) => setCurrentOnboardingStatus(e.target.value)} />
      </Modal>

      <Modal
        title="Set Brand Name"
        visible={brandNameModalVisible}
        onCancel={() => setBrandNameModalVisible(false)}
        onOk={handleBrandNameOk}
      >
        <Input value={currentBrandName} onChange={(e) => setCurrentBrandName(e.target.value)} />
      </Modal>

      <Modal
        title="Set ID & PASS IN"
        visible={idPassModalVisible}
        onCancel={() => setIdPassModalVisible(false)}
        onOk={handleIdPassOk}
      >
        <Input value={currentId} onChange={(e) => setCurrentId(e.target.value)} placeholder="ID" />
        <Input value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} placeholder="PASS" />
      </Modal>

      <Modal
        title="Set Launch Date IN"
        visible={launchDateModalVisible}
        onCancel={() => setLaunchDateModalVisible(false)}
        onOk={handleLaunchDateOk}
      >
        <DatePicker value={currentLaunchDate} onChange={(date) => setCurrentLaunchDate(date)} />
      </Modal>
    </div>
  );
};

export default Managerdashboard;
