import React from 'react';
import { Table } from 'antd';

const extractStoreNameAndFormatDate = (text) => {
  if (!text) return "Unknown";
  const parts = text.split(" (updated on ");
  const storeName = parts[0];
  const date = parts[1]?.slice(0, -1);
  if (date) {
    const formattedDate = new Date(date).toLocaleDateString("en-GB");
    return `${storeName} (${formattedDate})`;
  }
  return storeName;
};

const Stage2INComponent = ({ data, searchText }) => {
  const columns = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId", fixed: "left" },
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

  const filteredData = data.filter(item => 
    item.enrollmentId.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      rowKey="_id"
      scroll={{ x: 'max-content', y: 601 }} 
      sticky 
    />
  );
};

export default Stage2INComponent;
