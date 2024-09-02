import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

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

const Stage1Component = ({ data, searchText }) => {
  const columns = [
    { title: "Date", dataIndex: "date", key: "date", render: (text) => moment(text).format("DD-MM-YYYY") },
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId", fixed: "left" },
    { 
      title: "ID Card", 
      dataIndex: "idCard", 
      key: "idCard", 
      render: (text, record) => {
        const daysSinceDate = moment().diff(moment(record.date), 'days');
        const isHighlight = (!text || text === "Not Done") && daysSinceDate > 2;
        return <span style={{ backgroundColor: isHighlight ? 'lightcoral' : 'transparent' }}>{extractStoreNameAndFormatDate(text)}</span>;
      }
    },
    { 
      title: "Training", 
      dataIndex: "training", 
      key: "training", 
      render: (text, record) => {
        const daysSinceDate = moment().diff(moment(record.date), 'days');
        const isHighlight = (!text || text === "Not Done") && daysSinceDate > 3;
        return <span style={{ backgroundColor: isHighlight ? 'lightcoral' : 'transparent' }}>{extractStoreNameAndFormatDate(text)}</span>;
      }
    },
    { title: "Ebook", dataIndex: "ebook", key: "ebook", render: (text, record) => {
        const daysSinceDate = moment().diff(moment(record.date), 'days');
        const isHighlight = (!text || text === "Not Done") && daysSinceDate > 3;
        return <span style={{ backgroundColor: isHighlight ? 'lightcoral' : 'transparent' }}>{extractStoreNameAndFormatDate(text)}</span>;
      } },
    { title: "Support Portal", dataIndex: "supportPortal", key: "supportPortal", render: (text, record) => {
        const daysSinceDate = moment().diff(moment(record.date), 'days');
        const isHighlight = (!text || text === "Not Done") && daysSinceDate > 3;
        return <span style={{ backgroundColor: isHighlight ? 'lightcoral' : 'transparent' }}>{extractStoreNameAndFormatDate(text)}</span>;
      } },
    { title: "Wallet Portal", dataIndex: "walletPortal", key: "walletPortal", render: (text, record) => {
        const daysSinceDate = moment().diff(moment(record.date), 'days');
        const isHighlight = (!text || text === "Not Done") && daysSinceDate > 3;
        return <span style={{ backgroundColor: isHighlight ? 'lightcoral' : 'transparent' }}>{extractStoreNameAndFormatDate(text)}</span>;
      } },
    { title: "Gallery", dataIndex: "gallery", key: "gallery", render: (text, record) => {
        const daysSinceDate = moment().diff(moment(record.date), 'days');
        const isHighlight = (!text || text === "Not Done") && daysSinceDate > 3;
        return <span style={{ backgroundColor: isHighlight ? 'lightcoral' : 'transparent' }}>{extractStoreNameAndFormatDate(text)}</span>;
      } },
    { title: "Legality", dataIndex: "legality", key: "legality", render: (text, record) => {
        const daysSinceDate = moment().diff(moment(record.date), 'days');
        const isHighlight = (!text || text === "Not Done") && daysSinceDate > 3;
        return <span style={{ backgroundColor: isHighlight ? 'lightcoral' : 'transparent' }}>{extractStoreNameAndFormatDate(text)}</span>;
      } },
    { title: "Category", dataIndex: "category", key: "category", render: (text) => extractStoreNameAndFormatDate(text) },
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

export default Stage1Component;
