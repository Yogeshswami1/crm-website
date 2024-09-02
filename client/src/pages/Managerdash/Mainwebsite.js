// import React, { useState, useEffect } from 'react';
// import { Card, Row, Col, Table, Input, Switch } from 'antd';
// import axios from 'axios';

// const { Search } = Input;

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const CallStatus = () => {
//   const [userData, setUserData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     const managerId = localStorage.getItem("managerId");
//     axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
//       .then(response => {
//         const sortedData = response.data.sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
//         setUserData(sortedData);
//         setFilteredData(sortedData);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

//   const handleSearch = value => {
//     const filtered = userData.filter(item => item.enrollmentId.includes(value));
//     setFilteredData(filtered);
//   };

//   const parseCallDoneStatus = (status) => {
//     if (!status || typeof status !== 'string') {
//       return false;
//     }
//     return status.startsWith('true');
//   };

//   const handleToggle = (record) => {
//     const currentStatus = parseCallDoneStatus(record.callDone);
//     const newStatus = !currentStatus;
//     const updatedData = userData.map(item => {
//       if (item.enrollmentId === record.enrollmentId) {
//         return { ...item, callDone: `${newStatus} (updated on ${new Date().toISOString()})` };
//       }
//       return item;
//     });

//     setUserData(updatedData);
//     setFilteredData(updatedData);

//     axios.put(`${apiUrl}/api/contact/${record._id}`, { callDone: `${newStatus} (updated on ${new Date().toISOString()})` })
//       .then(response => {
//         console.log('Call status updated successfully');
//       })
//       .catch(error => {
//         console.error('Failed to update call status', error);
//       });
//   };

//   const columns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     },
//     {
//       title: 'Call Done',
//       key: 'callDone',
//       render: (_, record) => (
//         <Switch
//           checked={parseCallDoneStatus(record.callDone)}
//           onChange={() => handleToggle(record)}
//           checkedChildren="Done"
//           unCheckedChildren="Not Done"
//         />
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <Row gutter={16}>
//         <Col span={24}>
//           <Card title="Call Status" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//             <Search
//               placeholder="Search by Enrollment ID"
//               onSearch={handleSearch}
//               enterButton
//               style={{ width: "15rem", marginBottom: '20px' }}
//             />
//             <Table
//               columns={columns}
//               dataSource={filteredData}
//               rowKey="enrollmentId"
//               pagination={{ pageSize: 10 }}
//             />
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default CallStatus;

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Input, Switch, Modal, Radio } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Search } = Input;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const CallStatus = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [archiveFilter, setArchiveFilter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStage, setSelectedStage] = useState('stage1');

  useEffect(() => {
    const managerId = localStorage.getItem("managerId");
    axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
      .then(response => {
        const sortedData = response.data.sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
        setUserData(sortedData);
        setFilteredData(sortedData);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleSearch = value => {
    const filtered = userData.filter(item => item.enrollmentId.includes(value));
    setFilteredData(filtered);
  };

  const parseStatus = (status) => {
    if (!status || typeof status !== 'string') {
      return false;
    }
    return status.startsWith('true');
  };

  const handleToggle = (record, field) => {
    const currentStatus = parseStatus(record[field]);
    const newStatus = !currentStatus;
    const updatedData = userData.map(item => {
      if (item.enrollmentId === record.enrollmentId) {
        return { ...item, [field]: `${newStatus}` };
      }
      return item;
    });

    setUserData(updatedData);
    setFilteredData(updatedData);

    axios.put(`${apiUrl}/api/contact/${record._id}`, { [field]: `${newStatus}` })
      .then(response => {
        console.log(`${field} status updated successfully`);
      })
      .catch(error => {
        console.error(`Failed to update ${field} status`, error);
      });
  };

  useEffect(() => {
    const filtered = userData.filter(item => parseStatus(item.archive) === archiveFilter);
    setFilteredData(filtered);
  }, [archiveFilter, userData]);

  const handleModalOpen = (record) => {
    setSelectedUser(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleStageChange = (e) => {
    setSelectedStage(e.target.value);
  };

  const formatCompletionData = (data) => {
    if (!data) return '';
    return data.replace(/updated on (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/, (_, dateStr) => {
      return `(${moment(dateStr).format('DD-MM-YYYY')})`;
    });
  };

  const columns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Call Done',
      key: 'callDone',
      render: (_, record) => (
        <Switch
          checked={parseStatus(record.callDone)}
          onChange={() => handleToggle(record, 'callDone')}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      ),
    },
    {
      title: 'Archive',
      key: 'archive',
      render: (_, record) => (
        <Switch
          checked={parseStatus(record.archive)}
          onChange={() => handleToggle(record, 'archive')}
          checkedChildren="On"
          unCheckedChildren="Off"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <a onClick={() => handleModalOpen(record)}>Details</a>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Call Status" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Search
              placeholder="Search by Enrollment ID"
              onSearch={handleSearch}
              enterButton
              style={{ width: "15rem", marginBottom: '20px' }}
            />
            <div style={{ marginBottom: '20px' }}>
              <Switch
                checked={archiveFilter}
                onChange={() => setArchiveFilter(!archiveFilter)}
                checkedChildren="Archived"
                unCheckedChildren="Active"
              />
              <span style={{ marginLeft: '10px' }}>Show Archived</span>
            </div>
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="enrollmentId"
            />
          </Card>
        </Col>
      </Row>

      <Modal
        open={modalVisible}
        title="User Details"
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedUser && (
          <>
            <Radio.Group onChange={handleStageChange} value={selectedStage}>
              <Radio value="stage1">Stage 1</Radio>
              <Radio value="stage2">Stage 2</Radio>
              <Radio value="stage3">Stage 3</Radio>
            </Radio.Group>
            <div style={{ marginTop: '20px' }}>
              <p><strong>Enrollment ID:</strong> {selectedUser.enrollmentId}</p>
              {selectedStage === 'stage1' && (
                <div>
                  <p><strong>Payment:</strong> {formatCompletionData(selectedUser.payment?.stage1?.amount)} &nbsp;<strong>Status:</strong>{formatCompletionData(selectedUser.payment?.stage1?.status)}</p>
                  <p><strong>Legality:</strong> {formatCompletionData(selectedUser.legality)}</p>
                  <p><strong>OVC:</strong> {formatCompletionData(selectedUser.ovc)}</p>
                  <p><strong>ID Card:</strong> {formatCompletionData(selectedUser.idCard)}</p>
                  <p><strong>Theme:</strong> {formatCompletionData(selectedUser.theme)}</p>
                </div>
              )}
              {selectedStage === 'stage2' && (
                <div>
                  <p><strong>Payment:</strong> {formatCompletionData(selectedUser.payment?.stage2?.amount)} &nbsp;<strong>Status:</strong>{formatCompletionData(selectedUser.payment?.stage2?.status)}</p>
                  <p><strong>CAT File:</strong> {formatCompletionData(selectedUser.catFile)}</p>
                  <p><strong>Product File:</strong> {formatCompletionData(selectedUser.productFile)}</p>
                  <p><strong>Logo:</strong> {formatCompletionData(selectedUser.logo)}</p>
                  <p><strong>Banner:</strong> {formatCompletionData(selectedUser.banner)}</p>
                  <p><strong>Gallery:</strong> {formatCompletionData(selectedUser.gallery)}</p>
                </div>
              )}
              {selectedStage === 'stage3' && (
                <div>
                  <p><strong>Payment:</strong> {formatCompletionData(selectedUser.payment?.stage3?.amount)} &nbsp;<strong>Status:</strong>{formatCompletionData(selectedUser.payment?.stage3?.status)}</p>
                  <p><strong>Server Purchase:</strong> {formatCompletionData(selectedUser.serverPurchase)}</p>
                  <p><strong>Domain Claim:</strong> {formatCompletionData(selectedUser.domainClaim)}</p>
                  <p><strong>Domain Mail Verification:</strong> {formatCompletionData(selectedUser.domainMailVerification)}</p>
                  <p><strong>Website Uploaded:</strong> {formatCompletionData(selectedUser.websiteUploaded)}</p>
                  <p><strong>Payment Gateway:</strong> {formatCompletionData(selectedUser.paymentGateway)}</p>
                  <p><strong>Ready To Handover:</strong> {formatCompletionData(selectedUser.readyToHandover)}</p>
                </div>
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CallStatus;
