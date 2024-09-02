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

const Stage2COMComponent = ({ data, searchText }) => {
  const columns = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId", fixed: "left" },
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

export default Stage2COMComponent;
