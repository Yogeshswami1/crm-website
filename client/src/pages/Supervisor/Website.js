import React, { useState } from 'react';
import { Table, Radio, Input, Button, Modal, Checkbox } from 'antd';
import moment from 'moment';
import fileDownload from 'js-file-download';

const { Search } = Input;

const Website = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);

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
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId", fixed: "left" },
    { title: "Legality", dataIndex: "legality", key: "legality", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "OVC", dataIndex: "ovc", key: "ovc", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "ID Card", dataIndex: "idCard", key: "idCard", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Theme", dataIndex: "theme", key: "theme", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Stage 1 Completion", dataIndex: "stage1Completion", key: "stage1Completion", render: (text) => extractStoreNameAndFormatDate(text) },
  ];

  const columnsOption2 = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId", fixed: "left" },
    { title: "Sub Domain", dataIndex: "subDomain", key: "subDomain" },
    { title: "Cat File", dataIndex: "catFile", key: "catFile", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Product File", dataIndex: "productFile", key: "productFile", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Logo", dataIndex: "logo", key: "logo", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Banner", dataIndex: "banner", key: "banner", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Gallery", dataIndex: "gallery", key: "gallery", render: (text) => extractStoreNameAndFormatDate(text) },
    { title: "Stage 2 Completion", dataIndex: "stage2Completion", key: "stage2Completion", render: (text) => extractStoreNameAndFormatDate(text) },
  ];

  const columnsOption3 = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId", fixed: "left" },
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

  const showColumnSelectionModal = () => {
    setIsModalVisible(true);
  };

  const handleColumnSelection = (selectedValues) => {
    setSelectedColumns(selectedValues);
    setIsModalVisible(false);
  };

  const downloadCSV = () => {
    const columns = ['enrollmentId', ...selectedColumns];
    const exportData = filteredData.map(item => {
      const row = {};
      columns.forEach(col => {
        row[col] = item[col];
      });
      return row;
    });

    const csvContent = exportData.map(item => 
      columns.map(col => `"${item[col] || ''}"`).join(',')
    );
    const header = columns.join(',');
    const csvData = [header, ...csvContent].join('\n');
    fileDownload(csvData, `website_data_${selectedOption}.csv`);
  };

  return (
    <>
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
        <Button type="primary" onClick={showColumnSelectionModal} style={{ marginLeft: 16 }}>
          Download CSV
        </Button>
      </div>
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
        <Table
          columns={getColumns()}
          dataSource={filteredData}
          rowKey="_id"
          scroll={{ x: 'max-content', y: 601 }}
          sticky
        />
      </div>

      <Modal
        title="Select Columns to Download"
        visible={isModalVisible}
        onOk={downloadCSV}
        onCancel={() => setIsModalVisible(false)}
      >
        <Checkbox.Group
          options={getColumns().map(col => ({
            label: col.title,
            value: col.dataIndex,
          }))}
          onChange={handleColumnSelection}
          value={selectedColumns}
        />
      </Modal>
    </>
  );
};

export default Website;
