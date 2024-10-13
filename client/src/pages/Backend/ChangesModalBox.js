import React, { useEffect, useState } from "react";
import { Modal, Spin, Alert } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const ChangesModalBox = ({ visible, onCancel, record }) => {
  const [changes, setChanges] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChanges = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/contact/changes/${record.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChanges(response.data.changes || []);
    } catch (error) {
      toast.error("Failed to fetch changes");
      console.error("Error fetching changes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (record && visible) {
      fetchChanges();
    }
  }, [record, visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Changes"
      footer={null}
    >
      {loading ? (
        <Spin />
      ) : changes.length > 0 ? (
        <ul>
          {changes.map((change, index) => (
            <li key={index}>{change}</li>
          ))}
        </ul>
      ) : (
        <Alert message="No changes found" type="info" />
      )}
    </Modal>
  );
};

export default ChangesModalBox;
