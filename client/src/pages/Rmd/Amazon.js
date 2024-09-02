// import React, { useState } from 'react';
// import { Table, Radio, Input } from 'antd';
// import moment from 'moment';

// const { Search } = Input;

// const Amazon = ({ data }) => {
//   const [selectedOption, setSelectedOption] = useState('option1');
//   const [searchText, setSearchText] = useState('');

//   const extractStoreNameAndFormatDate = (text) => {
//     if (!text) return "Unknown";
//     const parts = text.split(" (updated on ");
//     const storeName = parts[0];
//     const date = parts[1]?.slice(0, -1);
//     if (date) {
//       const formattedDate = new Date(date).toLocaleDateString("en-GB");
//       return `${storeName} (${formattedDate})`;
//     }
//     return storeName;
//   };

//   const getConditionalCellStyle = (date, fieldValue, daysThreshold) => {
//     if (!fieldValue || fieldValue === "Not Done") {
//       const now = moment();
//       const itemDate = moment(date);
//       if (now.diff(itemDate, 'days') > daysThreshold) {
//         return { backgroundColor: 'lightcoral' };
//       }
//     }
//     return {};
//   };

//   const columnsOption1 = [
//     { title: "Date", dataIndex: "date", key: "date", render: (text) => moment(text).format("DD-MM-YYYY") },
//     { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId", fixed: "left" },
//     {
//       title: "ID Card",
//       dataIndex: "idCard",
//       key: "idCard",
//       render: (text, record) => (
//         <div style={getConditionalCellStyle(record.date, text, 2)}>
//           {extractStoreNameAndFormatDate(text)}
//         </div>
//       )
//     },
//     {
//       title: "Training",
//       dataIndex: "training",
//       key: "training",
//       render: (text, record) => (
//         <div style={getConditionalCellStyle(record.date, text, 3)}>
//           {extractStoreNameAndFormatDate(text)}
//         </div>
//       )
//     },
//     { title: "Ebook", dataIndex: "ebook", key: "ebook", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Support Portal", dataIndex: "supportPortal", key: "supportPortal", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Wallet Portal", dataIndex: "walletPortal", key: "walletPortal", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Gallery", dataIndex: "gallery", key: "gallery", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Legality", dataIndex: "legality", key: "legality", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Category", dataIndex: "category", key: "category", render: (text) => extractStoreNameAndFormatDate(text) },
//   ];

//   const columnsOption2 = [
//     { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId", fixed: "left" },
//     { title: "State", dataIndex: "state", key: "state" },
//     { title: "GST", dataIndex: "gst", key: "gst", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Onboarding Status", dataIndex: "onboardingStatus", key: "onboardingStatus", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Brand Name", dataIndex: "brandName", key: "brandName" },
//     { title: "Account Open In", dataIndex: "accountOpenIn", key: "accountOpenIn", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "ID and Pass In", dataIndex: "idAndPassIn", key: "idAndPassIn" },
//     { title: "GTIN", dataIndex: "gtin", key: "gtin", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Listings In", dataIndex: "listingsIn", key: "listingsIn", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Launch Date In", dataIndex: "launchDateIn", key: "launchDateIn", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Add Region In", dataIndex: "addRegionIn", key: "addRegionIn", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Shipping", dataIndex: "shipping", key: "shipping", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "FBA In", dataIndex: "fbaIn", key: "fbaIn", render: (text) => extractStoreNameAndFormatDate(text) },
//   ];

//   const columnsOption3 = [
//     { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId", fixed: "left" },
//     { title: "Document Status", dataIndex: "documentStatus", key: "documentStatus", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Store Name", dataIndex: "storeName", key: "storeName" },
//     { title: "Account Open Com", dataIndex: "accountOpenCom", key: "accountOpenCom", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "ID and Pass Com", dataIndex: "idAndPassCom", key: "idAndPassCom" },
//     { title: "Video KYC", dataIndex: "videoKyc", key: "videoKyc", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Deduct", dataIndex: "deduct", key: "deduct", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Listings Com", dataIndex: "listingsCom", key: "listingsCom", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Launch Date Com", dataIndex: "launchDateCom", key: "launchDateCom", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "NIA", dataIndex: "nia", key: "nia", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "Add Credit", dataIndex: "addCredit", key: "addCredit", render: (text) => extractStoreNameAndFormatDate(text) },
//     { title: "FBA Com", dataIndex: "fbaCom", key: "fbaCom", render: (text) => extractStoreNameAndFormatDate(text) },
//   ];

//   const getColumns = () => {
//     switch (selectedOption) {
//       case 'option2':
//         return columnsOption2;
//       case 'option3':
//         return columnsOption3;
//       default:
//         return columnsOption1;
//     }
//   };

//   const handleSearch = (value) => {
//     setSearchText(value);
//   };

//   const filteredData = data.filter(item =>
//     item.enrollmentId.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <>
//       <div>
//         <Radio.Group
//           onChange={(e) => setSelectedOption(e.target.value)}
//           value={selectedOption}
//           style={{ marginBottom: 16 }}
//         >
//           <Radio.Button value="option1">Stage 1</Radio.Button>
//           <Radio.Button value="option2">Stage 2 (IN)</Radio.Button>
//           <Radio.Button value="option3">Stage 2 (COM)</Radio.Button>
//         </Radio.Group>
//         <Search
//           placeholder="Search by Enrollment ID"
//           onSearch={handleSearch}
//           onChange={e => handleSearch(e.target.value)}
//           style={{ marginBottom: 16, width: 300 }}
//         />
//       </div>
//       <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
//         <Table
//           columns={getColumns()}
//           dataSource={filteredData}
//           rowKey="_id"
//           scroll={{ x: 'max-content', y: 601 }} sticky
//         />
//       </div>
//     </>
//   );
// };

// export default Amazon;
import React, { useState } from 'react';
import { Radio, Input } from 'antd';
import Stage1Component from './Stage1Component';
import Stage2INComponent from './Stage2INComponent';
import Stage2COMComponent from './Stage2COMComponent';

const { Search } = Input;

const Amazon = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [searchText, setSearchText] = useState('');

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderStageComponent = () => {
    switch (selectedOption) {
      case 'option1':
        return <Stage1Component data={data} searchText={searchText} />;
      case 'option2IN':
        return <Stage2INComponent data={data} searchText={searchText} />;
      case 'option2COM':
        return <Stage2COMComponent data={data} searchText={searchText} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Radio.Group onChange={handleOptionChange} value={selectedOption} style={{ marginBottom: 16 }}>
        <Radio.Button value="option1">Stage 1</Radio.Button>
        <Radio.Button value="option2IN">Stage 2 (IN)</Radio.Button>
        <Radio.Button value="option2COM">Stage 2 (COM)</Radio.Button>
      </Radio.Group>
      <Search
        placeholder="Search by Enrollment ID"
        onSearch={handleSearch}
        style={{ marginBottom: 16, width: 300 }}
      />
      {renderStageComponent()}
    </div>
  );
};

export default Amazon;
