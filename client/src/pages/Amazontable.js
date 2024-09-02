import React, { useState } from 'react';
import { Table, Radio, Input } from 'antd';
import moment from 'moment';

const { Search } = Input;

const AmazonTable = ({ data }) => {
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
    { title: "ID Card", dataIndex: "idCard", key: "idCard", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Training", dataIndex: "training", key: "training", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Ebook", dataIndex: "ebook", key: "ebook", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Support Portal", dataIndex: "supportPortal", key: "supportPortal", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Wallet Portal", dataIndex: "walletPortal", key: "walletPortal", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Gallery", dataIndex: "gallery", key: "gallery", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Legality", dataIndex: "legality", key: "legality", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Category", dataIndex: "category", key: "category", render: (text) => extractStoreNameAndFormatDate(text) },
  ];

  const columnsOption2 = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
    { title: "State", dataIndex: "state", key: "state" },
    { title: "GST", dataIndex: "gst", key: "gst", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Onboarding Status", dataIndex: "onboardingStatus", key: "onboardingStatus", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Brand Name", dataIndex: "brandName", key: "brandName" },
    { title: "Account Open In", dataIndex: "accountOpenIn", key: "accountOpenIn", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "ID and Pass In", dataIndex: "idAndPassIn", key: "idAndPassIn" },
    { title: "GTIN", dataIndex: "gtin", key: "gtin", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Listings In", dataIndex: "listingsIn", key: "listingsIn", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Launch Date In", dataIndex: "launchDateIn", key: "launchDateIn", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Add Region In", dataIndex: "addRegionIn", key: "addRegionIn", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Shipping", dataIndex: "shipping", key: "shipping", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "FBA In", dataIndex: "fbaIn", key: "fbaIn", render: (text) => extractStoreNameAndFormatDate(text) },
  ];

  const columnsOption3 = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
    { title: "Document Status", dataIndex: "documentStatus", key: "documentStatus", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Store Name", dataIndex: "storeName", key: "storeName" },
    { title: "Account Open Com", dataIndex: "accountOpenCom", key: "accountOpenCom", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "ID and Pass Com", dataIndex: "idAndPassCom", key: "idAndPassCom" },
    { title: "Video KYC", dataIndex: "videoKyc", key: "videoKyc", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Deduct", dataIndex: "deduct", key: "deduct", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Listings Com", dataIndex: "listingsCom", key: "listingsCom", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Launch Date Com", dataIndex: "launchDateCom", key: "launchDateCom", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "NIA", dataIndex: "nia", key: "nia", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Add Credit", dataIndex: "addCredit", key: "addCredit", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "FBA Com", dataIndex: "fbaCom", key: "fbaCom", render: (text) => extractStoreNameAndFormatDate(text) },
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
        <Radio.Button value="option2">Stage 2 (IN)</Radio.Button>
        <Radio.Button value="option3">Stage 2 (COM)</Radio.Button>
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

export default AmazonTable;
