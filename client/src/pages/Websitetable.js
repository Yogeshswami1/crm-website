import React, { useState } from 'react';
import { Table, Radio, Input } from 'antd';
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


 const columnsOption1 = [
   { title: "Date", dataIndex: "date", key: "date", render: (text) => moment(text).format("DD-MM-YYYY") },
   { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
   { title: "Legality", dataIndex: "legality", key: "legality", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "OVC", dataIndex: "ovc", key: "ovc", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "ID Card", dataIndex: "idCard", key: "idCard", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "Theme", dataIndex: "theme", key: "theme", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "Stage 1 Completion", dataIndex: "stage1Completion", key: "stage1Completion", render: (text) => extractStoreNameAndFormatDate(text) },
 ];




 const columnsOption2 = [
   { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
   { title: "Sub Domain", dataIndex: "subDomain", key: "subDomain" },
   { title: "Cat File", dataIndex: "catFile", key: "catFile", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "Product File", dataIndex: "productFile", key: "productFile", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "Logo", dataIndex: "logo", key: "logo", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "Banner", dataIndex: "banner", key: "banner", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "Gallery", dataIndex: "gallery", key: "gallery", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "Stage 2 Completion", dataIndex: "stage2Completion", key: "stage2Completion", render: (text) => extractStoreNameAndFormatDate(text) },
 ];




 const columnsOption3 = [
   { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
   { title: "Server Purchase", dataIndex: "serverPurchase", key: "serverPurchase", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "Domain Claim", dataIndex: "domainClaim", key: "domainClaim" },
   { title: "Domain Mail Verification", dataIndex: "domainMailVerification", key: "domainMailVerification", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "Website Uploaded", dataIndex: "websiteUploaded", key: "websiteUploaded", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "ID and Pass Website", dataIndex: "idAndPassWebsite", key: "idAndPassWebsite" },
   { title: "Payment Gateway", dataIndex: "paymentGateway", key: "paymentGateway" },
   { title: "Ready to Handover", dataIndex: "readyToHandover", key: "readyToHandover", render: (text) => extractStoreNameAndFormatDate(text) },
   { title: "Stage 3 Completion", dataIndex: "stage3Completion", key: "stage3Completion", render: (text) => extractStoreNameAndFormatDate(text) },
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
     />
   </div>
 );
};




export default WebsiteTable;









