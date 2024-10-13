// import React, { useState } from "react";
// import { Table, Radio, Input, Button,Form } from "antd";
// import moment from "moment";

// const { Search } = Input;

// const WebsiteTable = ({ data }) => {
//   const [selectedOption, setSelectedOption] = useState("option1");
//   const [searchText, setSearchText] = useState("");
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [isIdPassModalVisible, setIsIdPassModalVisible] = useState(false);

//   const [form] = Form.useForm();

//   const extractStoreNameAndFormatDate = (text) => {
//     if (!text) return "Unknown";
//     const parts = text.split(" (updated on ");
//     const storeName = parts[0];
//     const date = parts[1]?.slice(0, -1); // Remove the closing parenthesis
//     if (date) {
//       const formattedDate = new Date(date).toLocaleDateString("en-GB");
//       return `${storeName} (${formattedDate})`;
//     }
//     return storeName;
//   };

//   const handleOpenContactModal = (record) => {
//     console.log("Contact Modal:", record);
//   };

//   const openModal = (type, record) => {
//     console.log(`${type} Modal Opened for`, record);
//   };
//   const handleOpenIdPassModal = (record) => {
//     setCurrentRecord(record);
//     form.setFieldsValue({
//       id: record.idAndPassWebsite?.id || '',
//       pass: record.idAndPassWebsite?.pass || ''
//     });
//     setIsIdPassModalVisible(true);
//   };

//   const handleOpenRemarksModal = (record) => {
//     console.log("Remarks Modal:", record);
//   };

//   const stageColumns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//       render: (text) => moment(text).format("DD-MM-YYYY"),
//     },
//     {
//       title: "Enrollment ID",
//       dataIndex: "enrollmentId",
//       key: "enrollmentId",
//       fixed: "left",
//       render: (text, record) => (
//         <Button type="link" onClick={() => handleOpenContactModal(record)}>
//           {text}
//         </Button>
//       ),
//     },
//     {
//       title: "Stage 1 Payment",
//       dataIndex: "payment.stage1.status",
//       filters: [
//         { text: "Done", value: "Done" },
//         { text: "Not Done", value: "Not Done" },
//       ],
//       onFilter: (value, record) => record?.payment?.stage1?.status === value,
//       render: (text, record) => (
//         <Button
//           style={{
//             backgroundColor: record?.payment?.stage1?.status === "Done" ? "#90EE90" : undefined,
//           }}
//           onClick={() => openModal("payment", record)}
//         >
//           Edit Payment
//         </Button>
//       ),
//     },
//     {
//       title: "Legality",
//       dataIndex: "legality",
//       filters: [
//         { text: "Done", value: "Done" },
//         { text: "Not Done", value: "Not Done" },
//       ],
//       onFilter: (value, record) => record.legality === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.legality === "Done" ? "#90EE90" : undefined }}
//           onClick={() => openModal("legality", record)}
//         >
//           Legality
//         </Button>
//       ),
//     },
//     {
//       title: "OVC",
//       dataIndex: "ovc",
//       filters: [
//         { text: "Done", value: "Done" },
//         { text: "Not Done", value: "Not Done" },
//       ],
//       onFilter: (value, record) => record.ovc === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.ovc === "Done" ? "#90EE90" : undefined }}
//           onClick={() => openModal("videoCall", record)}
//         >
//           Onboarding Video Call
//         </Button>
//       ),
//     },
//     {
//       title: "ID Card",
//       dataIndex: "idCard",
//       filters: [
//         { text: "Done", value: "Done" },
//         { text: "Not Done", value: "Not Done" },
//       ],
//       onFilter: (value, record) => record.idCard === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.idCard === "Done" ? "#90EE90" : undefined }}
//           onClick={() => openModal("idCard", record)}
//         >
//           ID Card
//         </Button>
//       ),
//     },
//     {
//       title: "Social Media Content",
//       dataIndex: "socialMediaContent",
//       filters: [
//         { text: "Completed", value: "Completed" },
//         { text: "Not Done", value: "Not Done" },
//       ],
//       onFilter: (value, record) => record.socialMediaContent === value,
//       render: (text, record) => (
//         <Button
//           style={{
//             backgroundColor: record?.socialMediaContent === "Completed" ? "#90EE90" : undefined,
//           }}
//           onClick={() => openModal("socialMediaContent", record)}
//         >
//           Social Media Content
//         </Button>
//       ),
//     },
//     {
//       title: "Theme",
//       dataIndex: "theme",
//       filters: [
//         { text: "Selected", value: "selected" },
//         { text: "Not Selected", value: "notSelected" },
//       ],
//       onFilter: (value, record) => (record.theme ? "selected" : "notSelected") === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.theme ? "#90EE90" : undefined }}
//           onClick={() => openModal("theme", record)}
//         >
//           Theme
//         </Button>
//       ),
//     },
//     {
//       title: "Stage 1 Completion",
//       dataIndex: "stage1Completion",
//       filters: [
//         { text: "Done", value: "Done" },
//         { text: "Not Done", value: "Not Done" },
//       ],
//       onFilter: (value, record) => record.stage1Completion === value,
//       render: (text, record) => (
//         <Button
//           style={{
//             backgroundColor: record.stage1Completion === "Done" ? "#90EE90" : undefined,
//           }}
//           onClick={() => openModal("stageCompletion", record)}
//         >
//           Stage 1 Completion
//         </Button>
//       ),
//     },
//     {
//       title: "Remarks",
//       key: "remarks",
//       render: (text, record) => <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>,
//     },
//   ];

//   const mediaColumns = [
//     {
//       title: "Enrollment ID",
//       dataIndex: "enrollmentId",
//       key: "enrollmentId",
//       fixed: 'left',
//       width: 100,
//     },
//     {
//       title: "Stage 2 Payment",
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' },
//       ],
//       onFilter: (value, record) => (record?.payment?.stage2?.status || 'Not Done') === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.payment?.stage2?.status === "Done" ? '#90EE90' : undefined }}
//           onClick={() => openModal('stage2payment', record)}
//         >
//           Edit Payment
//         </Button>
//       ),
//     },
//     {
//       title: "CAT File",
//       dataIndex: "catFile",
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' },
//       ],
//       onFilter: (value, record) => record.catFile === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.catFile === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('catFile', record)}
//         >
//           CAT File
//         </Button>
//       ),
//     },
//     {
//       title: "Product File",
//       dataIndex: "productFile",
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' },
//       ],
//       onFilter: (value, record) => record.productFile === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.productFile === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('productFile', record)}
//         >
//           Product File
//         </Button>
//       ),
//     },
//     {
//       title: "Logo",
//       dataIndex: "logo",
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' },
//       ],
//       onFilter: (value, record) => record.logo === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.logo === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('logo', record)}
//         >
//           Logo
//         </Button>
//       ),
//     },
//     {
//       title: "Banner",
//       dataIndex: "banner",
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' },
//       ],
//       onFilter: (value, record) => record.banner === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.banner === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('banner', record)}
//         >
//           Banner
//         </Button>
//       ),
//     },
//     {
//       title: "Social Media Content",
//       dataIndex: "socialMedia1",
//       filters: [
//         { text: 'Completed', value: 'Completed' },
//         { text: 'Not Done', value: 'Not Done' },
//       ],
//       onFilter: (value, record) => record.socialMedia1 === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.socialMedia1 === 'Completed' ? '#90EE90' : undefined }}
//           onClick={() => openModal('socialMediaContent', record)}
//         >
//           Social Media Content
//         </Button>
//       ),
//     },
//     {
//       title: "Gallery",
//       dataIndex: "gallery",
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' },
//       ],
//       onFilter: (value, record) => record.gallery === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.gallery === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('gallery', record)}
//         >
//           Gallery
//         </Button>
//       ),
//     },
//     {
//       title: "Stage 2 Completion",
//       dataIndex: "stage2Completion",
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' },
//       ],
//       onFilter: (value, record) => record.stage2Completion === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.stage2Completion === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('stage2completion', record)}
//         >
//           Stage 2 Completion
//         </Button>
//       ),
//     },
//     {
//       title: "Remarks",
//       key: "remarks",
//       render: (text, record) => (
//         <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
//       ),
//     },
//   ];
//   const serverColumns = [
//     {
//       title: "Enrollment ID",
//       dataIndex: "enrollmentId",
//       key: "enrollmentId",
//       fixed: 'left',
//       width: 100,
//     },
//     {
//       title: "Stage 3 Payment",
//       dataIndex: ['simpleStatus', 'stage3Payment'],
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' }
//       ],
//       onFilter: (value, record) => record.simpleStatus.stage3Payment === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record?.payment?.stage3?.status === "Done" ? '#90EE90' : undefined }}
//           onClick={() => openModal('payment', record)}
//         >
//           Edit Payment
//         </Button>
//       ),
//     },
//     {
//       title: "Server Purchase",
//       dataIndex: ['simpleStatus', 'serverPurchase'],
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' }
//       ],
//       onFilter: (value, record) => record.simpleStatus.serverPurchase === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.simpleStatus.serverPurchase === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('server', record)}
//         >
//           Server Purchase
//         </Button>
//       ),
//     },
//     {
//       title: "Domain Claim",
//       dataIndex: ['simpleStatus', 'domainClaim'],
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' }
//       ],
//       onFilter: (value, record) => record.simpleStatus.domainClaim === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.simpleStatus.domainClaim === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('domainclaim', record)}
//         >
//           Domain Claim
//         </Button>
//       ),
//     },
//     {
//       title: "Domain Mail Verification",
//       dataIndex: ['simpleStatus', 'domainMailVerification'],
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' }
//       ],
//       onFilter: (value, record) => record.simpleStatus.domainMailVerification === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.simpleStatus.domainMailVerification === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('domainmail', record)}
//         >
//           Domain Mail Verification
//         </Button>
//       ),
//     },
//     {
//       title: "Website Uploaded",
//       dataIndex: ['simpleStatus', 'websiteUploaded'],
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' }
//       ],
//       onFilter: (value, record) => record.simpleStatus.websiteUploaded === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.simpleStatus.websiteUploaded === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('websiteuploaded', record)}
//         >
//           Website Uploaded
//         </Button>
//       ),
//     },
//     {
//       title: "ID & Pass",
//       dataIndex: "idAndPassWebsite",
//       key: "idAndPassWebsite",
//       width: 100,
//       render: (text, record) => (
//         <div>
//           {record.idAndPassWebsite?.id ? (
//             <div onClick={() => handleOpenIdPassModal(record)} style={{ cursor: "pointer", color: "#1890ff" }}>
//               <p><strong>ID:</strong> {record.idAndPassWebsite.id}</p>
//               <p><strong>Pass:</strong> {record.idAndPassWebsite.pass}</p>
//             </div>
//           ) : (
//             <Button onClick={() => handleOpenIdPassModal(record)}>
//               Set ID & Pass
//             </Button>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: "Social Media Content",
//       dataIndex: ['simpleStatus', 'socialMediaContent'],
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' }
//       ],
//       onFilter: (value, record) => record.simpleStatus.socialMediaContent === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.simpleStatus.socialMediaContent === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('socialMediaContent', record)}
//         >
//           Social Media Content
//         </Button>
//       ),
//     },
//     {
//       title: "Payment Gateway",
//       dataIndex: ['simpleStatus', 'paymentGateway'],
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' }
//       ],
//       onFilter: (value, record) => record.simpleStatus.paymentGateway === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.simpleStatus.paymentGateway === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('paymentgateway', record)}
//         >
//           Payment Gateway
//         </Button>
//       ),
//     },
//     {
//       title: "Ready To Handover",
//       dataIndex: ['simpleStatus', 'readyToHandover'],
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' }
//       ],
//       onFilter: (value, record) => record.simpleStatus.readyToHandover === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.simpleStatus.readyToHandover === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('ready2handover', record)}
//         >
//           Ready To Handover
//         </Button>
//       ),
//     },
//     {
//       title: "Stage 3 Completion",
//       dataIndex: ['simpleStatus', 'stage3Completion'],
//       filters: [
//         { text: 'Done', value: 'Done' },
//         { text: 'Not Done', value: 'Not Done' }
//       ],
//       onFilter: (value, record) => record.simpleStatus.stage3Completion === value,
//       render: (text, record) => (
//         <Button
//           style={{ backgroundColor: record.simpleStatus.stage3Completion === 'Done' ? '#90EE90' : undefined }}
//           onClick={() => openModal('stage3completion', record)}
//         >
//           Stage 3 Completion
//         </Button>
//       ),
//     }
//   ];
  
//   const getColumns = () => {
//     switch (selectedOption) {
//       case "option2":
//         return mediaColumns;
//       case "option3":
//         return stageColumns;
//       default:
//         return stageColumns; // Defaults to stageColumns for stage 1
//     }
//   };

//   const handleSearch = (value) => {
//     setSearchText(value);
//   };

//   const filteredData = data.filter((item) =>
//     item.enrollmentId.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <div>
//       <Radio.Group
//         onChange={(e) => setSelectedOption(e.target.value)}
//         value={selectedOption}
//         style={{ marginBottom: 16 }}
//       >
//         <Radio.Button value="option1">Stage 1</Radio.Button>
//         <Radio.Button value="option2">Stage2</Radio.Button>
//         <Radio.Button value="option3">Stage 2</Radio.Button>
//       </Radio.Group>
//       <Search
//         placeholder="Search by Enrollment ID"
//         allowClear
//         enterButton="Search"
//         onSearch={handleSearch}
//         style={{ marginBottom: 16, width: 400 }}
//       />
//       <Table
//         columns={getColumns()}
//         dataSource={filteredData}
//         pagination={{ pageSize: 10 }}
//         rowKey="enrollmentId"
//         scroll={{ x: 1300 }}
//       />
//     </div>
//   );
// };

// export default WebsiteTable;



import React, { useState } from 'react';
import { Table, Radio, Input ,Button,Tag} from 'antd';
import moment from 'moment';


const { Search } = Input;


const WebsiteTable = ({ data }) => {
const [selectedOption, setSelectedOption] = useState('option1');
const [searchText, setSearchText] = useState('');


const extractStoreNameAndFormatDate = (text) => {
 if (!text) return "Unknown";
 const parts = text.split(" (updated on ");
 const storeName = parts[0];
 const date = parts[1]?.slice(0, -1); // Remove the closing parenthesis
 if (date) {
   const formattedDate = new Date(date).toLocaleDateString("en-GB");
   return `${storeName} (${formattedDate})`;
 }
 return storeName;
};

const combineSocialMediaStatus = (record) => {
  // Collect all relevant fields
  const statuses = [record.socialMedia, record.socialMedia1, record.socialMedia2];
  
  // Check for status in the order of priority
  if (statuses.includes('Not Done')) {
    return 'Not Done';
  }
  if (statuses.includes('Done') || statuses.includes('Completed')) {
    return 'Done';
  }
  return 'N/A'; // Default status
};




const columnsOption1 = [
  { 
    title: "Date", 
    dataIndex: "date", 
    key: "date", 
    render: (text) => moment(text).format("DD-MM-YYYY") 
  },
  { 
    title: "Enrollment ID", 
    dataIndex: "enrollmentId", 
    key: "enrollmentId" 
  },
  { 
    title: "Stage 1 Payment", 
    key: "payment.stage1.status", 
    render: (record) => getStatusTag(record?.payment?.stage1?.status) // Apply getStatusTag here
  },
  { 
    title: "Legality", 
    dataIndex: "legality", 
    key: "legality", 
    render: (text) => getStatusTag(text) // Apply getStatusTag here
  },
  { 
    title: "OVC", 
    dataIndex: "ovc", 
    key: "ovc", 
    render: (text) => getStatusTag(text) // Apply getStatusTag here
  },
  { 
    title: "ID Card", 
    dataIndex: "idCard", 
    key: "idCard", 
    render: (text) => getStatusTag(text) // Apply getStatusTag here
  },
  { 
    title: "Theme", 
    dataIndex: "theme", 
    key: "theme", 
    render: (text) => text || "N/A" 
  },
  { 
    title: "Stage 1 Completion", 
    dataIndex: "stage1Completion", 
    key: "stage1Completion", 
    render: (text) => getStatusTag(text) // Apply getStatusTag here
  }
];



const getStatusTag = (status) => {
  if (status === 'Done' || status === 'Completed') {
    return <Tag color="green">Done</Tag>;
  } else {
    return <Tag color="red">Not Done</Tag>;
  }
};









const columnsOption2 = [
  { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
  { 
    title: "Stage 2 Payment", 
    key: "payment.stage2.status", 
    render: (text, record) => getStatusTag(record?.payment?.stage2?.status) // Apply getStatusTag here
  }, {
    title: "Cat File",
    dataIndex: "catFile",
    key: "catFile",
    render: (text, record) => getStatusTag(record.catFile) // Show "Done" or "Not Done"
  },
  {
    title: "Product File",
    dataIndex: "productFile",
    key: "productFile",
    render: (text, record) => getStatusTag(record.productFile) // Show "Done" or "Not Done"
  },
  {
    title: "Logo",
    dataIndex: "logo",
    key: "logo",
    render: (text, record) => getStatusTag(record.logo) // Show "Done" or "Not Done"
  },
  {
    title: "Banner",
    dataIndex: "banner",
    key: "banner",
    render: (text, record) => getStatusTag(record.banner) // Show "Done" or "Not Done"
  },
  {
    title: "Social Media Content",
    dataIndex: "socialMedia1",
    key: "socialMedia1",
    render: (text, record) => getStatusTag(record.socialMedia1) // Apply getStatusTag here
  },
  {
    title: "Gallery",
    dataIndex: "gallery",
    key: "gallery",
    render: (text, record) => getStatusTag(record.gallery) // Show "Done" or "Not Done"
  },
  {
    title: "Stage 2 Completion",
    dataIndex: "stage2Completion",
    key: "stage2Completion",
    render: (text, record) => getStatusTag(record.stage2Completion) // Show "Done" or "Not Done"
  },
];



const getStatus = (data) => {
  // Check ID and Pass Website status
  const idAndPassStatus = data.idAndPassWebsite?.id && data.idAndPassWebsite?.pass ? 'Done' : 'Not Done';
  
  // Check Payment Gateway status
  const paymentGatewayStatus = data.paymentGateway ? 'Done' : 'Not Done';
  
  // Return combined status as a string or use a more complex logic if needed
  return `ID & Pass: ${idAndPassStatus}, Payment Gateway: ${paymentGatewayStatus}`;
};


const columnsOption3 = [
  { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
  { 
    title: "Stage 3 Payment", 
    key: "payment.stage3.status", 
    render: (text, record) => getStatusTag(record?.payment?.stage3?.status) // Apply getStatusTag here
  },
  
  // Use extractStoreNameAndFormatDate for date fields
  { 
    title: "Server Purchase", 
    dataIndex: "serverPurchase", 
    key: "serverPurchase", 
    render: (text) => getStatusTag(text) 
  },
  
  // Use getStatusTag for status fields
  { 
    title: "Domain Claim", 
    dataIndex: "domainClaim", 
    key: "domainClaim", 
    render: (text) => getStatusTag(text) // Apply getStatusTag here
  },
  
  { 
    title: "Domain Mail Verification", 
    dataIndex: "domainMailVerification", 
    key: "domainMailVerification", 
    render: (text) => getStatusTag(text) 
  },
  
  { 
    title: "Website Uploaded", 
    dataIndex: "websiteUploaded", 
    key: "websiteUploaded", 
    render: (text) => getStatusTag(text) 
  },
  
  {
    title: "ID & Pass Website",
    dataIndex: "idAndPassWebsite",
    key: "idAndPassWebsite",
    render: (text, record) => (
      <div>
        {record.idAndPassWebsite?.id ? (
          <div>
            <p><strong>ID:</strong> {record.idAndPassWebsite.id}</p>
            <p><strong>Pass:</strong> {record.idAndPassWebsite.pass}</p>
          </div>
        ) : (
          <span>No ID & Pass Set</span>
        )}
      </div>
    ),
  },

  {
    title: "Social Media Content",
    key: 'socialMediaContent',
    render: (text, record) => {
      console.log("Record data:", record); // Debugging line
      return getStatusTag(combineSocialMediaStatus(record)); // Apply getStatusTag here
    }
  },
  
  {
    title: "Payment Gateway",
    dataIndex: "paymentGateway",
    key: "paymentGateway",
    render: (text, record) => {
      // Determine the status based on the presence of paymentGateway data
      const status = record.paymentGateway ? 'Done' : 'Not Done';
      return getStatusTag(status); // Use getStatusTag for consistent styling
    },
  },
  
  { 
    title: "Ready to Handover", 
    dataIndex: "readyToHandover", 
    key: "readyToHandover", 
    render: (text) => getStatusTag(text) 
  },
  
  { 
    title: "Stage 3 Completion", 
    dataIndex: "stage3Completion", 
    key: "stage3Completion", 
    render: (text) => getStatusTag(text) 
  },
];

const getColumns = () => {
  switch (selectedOption) {
    case 'option2':
      return columnsOption2;
    case 'option3':
      return columnsOption3;
    default:
      return columnsOption1;
  }
};








const handleSearch = (value) => {
  setSearchText(value);
};








const filteredData = data.filter(item =>
  item.enrollmentId.toLowerCase().includes(searchText.toLowerCase())
);








return (
  <div>
    <Radio.Group
      onChange={(e) => setSelectedOption(e.target.value)}
      value={selectedOption}
      style={{ marginBottom: 16 }}
    >
      <Radio.Button value="option1">Stage 1</Radio.Button>
      <Radio.Button value="option2">Stage 2</Radio.Button>
      <Radio.Button value="option3">Stage 3</Radio.Button>
    </Radio.Group>
    <Search
      placeholder="Search by Enrollment ID"
      onSearch={handleSearch}
      onChange={e => handleSearch(e.target.value)}
      style={{ marginBottom: 16, width: 300 }}
    />
    <Table
      columns={getColumns()}
      dataSource={filteredData}
      rowKey="_id"
      // pagination={{ pageSize: 10 }}
    />
  </div>
);
};








export default WebsiteTable;







