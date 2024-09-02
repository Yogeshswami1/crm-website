import React, { useState, useEffect } from "react";
import { Radio, Table, Card, message, Button, Modal } from "antd";
import axios from "axios";
import fileDownload from "js-file-download";
import PieChartComponent from "./PieChartComponent"; // Import the PieChartComponent

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Reports = () => {
  const [service, setService] = useState("AMAZON");
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchContacts(service);
  }, [service]);

  const fetchContacts = async (selectedService) => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/contact/getcontact`);
      const filtered = data.filter(contact => contact.service === selectedService);
      setContacts(filtered);
      setFilteredContacts(filtered);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      message.error("Failed to load contacts. Please try again.");
    }
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFilter = (key, value) => {
    const filtered = contacts.filter(contact => {
      const contactValue = contact[key] || "Not Done";
      return contactValue === value || contactValue === "" || contactValue === "N/A" || contactValue === "unknown";
    });
    setFilteredContacts(filtered);
    handleCloseModal();
  };

  const downloadCSV = () => {
    const csvData = filteredContacts.map(contact => ({
      enrollmentId: contact.enrollmentId,
      managerPosition: contact.managerId?.position
    }));

    const csvRows = [
      ["Enrollment ID", "Manager Position"],
      ...csvData.map(row => [row.enrollmentId, row.managerPosition])
    ];

    const csvContent = csvRows.map(row => row.join(",")).join("\n");

    fileDownload(csvContent, "contacts.csv");
  };

  // Prepare data for PieChartComponent
  const pieChartData = [
    { name: "Filtered", value: filteredContacts.length },
    { name: "Total", value: contacts.length - filteredContacts.length },
  ];

  const amazonFilterButtons = [
    { key: "legality", value: "Not Done" },
    { key: "idCard", value: "Not Done" },
    { key: "training", value: "Not Done" },
    { key: "ebook", value: "Not Done" },
    { key: "supportPortal", value: "Not Done" },
    { key: "walletPortal", value: "Not Done" },
    { key: "gallery", value: "Not Done" },
    { key: "gst", value: "No" },
    { key: "onboardingStatus", value: "Pending" },
    { key: "accountOpenIn", value: "Not Opened" },
    { key: "gtin", value: "Pending" },
    { key: "launchDateIn", value: "Not Done" },
    { key: "addRegionIn", value: "Not Done" },
    { key: "fbaIn", value: "Not Done" },
    { key: "documentStatus", value: "Not Done" },
    { key: "accountOpenCom", value: "Not Done" },
    { key: "videoKyc", value: "Not Done" },
    { key: "launchDateCom", value: "Not Done" },
    { key: "nia", value: "Not Done" },
    { key: "fbaCom", value: "Not Done" },
  ];

  const websiteFilterButtons = [
    { key: "legality", value: "Not Done" },
    { key: "ovc", value: "Not Done" },
    { key: "idCard", value: "Not Done" },
    { key: "stage1Completion", value: "Not Done" },
    { key: "catFile", value: "Not Done" },
    { key: "productFile", value: "Not Done" },
    { key: "logo", value: "Not Done" },
    { key: "banner", value: "Not Done" },
    { key: "gallery", value: "Not Done" },
    { key: "stage2Completion", value: "Not Done" },
    { key: "serverPurchase", value: "Not Done" },
    { key: "domainMailVerification", value: "Not Done" },
    { key: "websiteUploaded", value: "Not Done" },
    { key: "readyToHandover", value: "Not Done" },
    { key: "stage3Completion", value: "Not Done" },
  ];

  const columns = [
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
    },
    {
      title: "Manager Position",
      dataIndex: ["managerId", "position"],
      key: "managerPosition",
    },
  ];

  return (
    <Card bordered={false} title="Reports">
      <Radio.Group onChange={handleServiceChange} value={service} style={{ marginBottom: 16 }}>
        <Radio.Button value="AMAZON">AMAZON</Radio.Button>
        <Radio.Button value="WEBSITE">WEBSITE</Radio.Button>
      </Radio.Group>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleOpenModal} style={{ marginRight: 8 }}>
          Open Filters
        </Button>
        <Button onClick={() => fetchContacts(service)} style={{ marginRight: 8 }}>
          Reset
        </Button>
        <Button onClick={downloadCSV}>Download CSV</Button>
      </div>
      <PieChartComponent data={pieChartData} /> {/* Use the PieChartComponent */}
      <Table columns={columns} dataSource={filteredContacts} rowKey="_id" />
      <Modal
        title="Filter Contacts"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {(service === "AMAZON" ? amazonFilterButtons : websiteFilterButtons).map((filter) => (
          <Button
            key={filter.key}
            onClick={() => handleFilter(filter.key, filter.value)}
            style={{ margin: 5 }}
          >
            Filter by {filter.key} {filter.value}
          </Button>
        ))}
      </Modal>
    </Card>
  );
};

export default Reports;
