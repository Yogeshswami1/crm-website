import React, { useState, useEffect, useTransition } from 'react';
import axios from 'axios';
import { Card, Row, Col, Typography, Badge, Spin } from 'antd';
import './shiny.css';
import moment from 'moment';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title } = Typography;

const Dash = () => {
  const [tasks, setTasks] = useState([]);
  const [additionalTasks, setAdditionalTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalDone, setTotalDone] = useState(0);
  const [totalError, setTotalError] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const id = localStorage.getItem('enrollmentId');
    startTransition(() => {
      fetchUserInfoAndTasks(id);
    });
  }, []);

  const fetchUserInfoAndTasks = async (id) => {
    try {
      const [userInfoResponse, tasksResponse] = await Promise.all([
        axios.get(`${apiUrl}/api/contact/enrollmentId/${id}`),
        axios.get(`${apiUrl}/api/contact/${id}/tasks`),
      ]);

      const userInfoData = userInfoResponse.data;
      const tasksData = tasksResponse.data;
      const additionalTasksData = getAdditionalTasks(userInfoData);

      setUserInfo(userInfoData);
      setTasks(tasksData);
      setAdditionalTasks(additionalTasksData);

      calculateTaskStats([...tasksData, ...additionalTasksData]);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const calculateTaskStats = (allTasks) => {
    const total = allTasks.length;
    const pending = allTasks.filter(task => task.status === 'Pending').length;
    const done = allTasks.filter(task => task.status === 'Done').length;
    const error = allTasks.filter(task => task.status === 'Error').length;

    setTotalTasks(total);
    setTotalPending(pending);
    setTotalDone(done);
    setTotalError(error);
  };

  const getAdditionalTasks = (userData) => {
    const fields = [
      { key: 'idCard', label: 'ID Card' },
      { key: 'training', label: 'Training' },
      { key: 'ebook', label: 'Ebook' },
      { key: 'supportPortal', label: 'Support Portal' },
      { key: 'walletPortal', label: 'Wallet Portal' },
      { key: 'gallery', label: 'Gallery' },
      { key: 'legality', label: 'Legality' },
      { key: 'gst', label: 'GST', specialHandling: handleGstStatus },
      { key: 'onboardingStatus', label: 'Onboarding Status', specialHandling: handleOnboardingStatus },
      { key: 'accountOpenIn', label: 'IN Account Open', specialHandling: handleAccountOpenStatus },
      { key: 'gtin', label: 'GTIN', specialHandling: handleGtinStatus },
      { key: 'listingsIn', label: 'IN Listings' },
      { key: 'launchDateIn', label: 'IN Launch Date' },
      { key: 'addRegionIn', label: 'IN Add Region' },
      { key: 'fbaIn', label: 'IN FBA' },
      { key: 'accountOpenCom', label: 'COM Account Open', specialHandling: handleAccountOpenComStatus },
      { key: 'videoKyc', label: 'COM Video KYC', specialHandling: handleVideoKycStatus },
      { key: 'deduct', label: 'COM 1$ Deduct', specialHandling: handleDeductStatus },
      { key: 'listingsCom', label: 'COM Listings' },
      { key: 'launchDateCom', label: 'COM Launch Date' },
      { key: 'nia', label: 'COM NIA' },
      { key: 'addCredit', label: 'COM 50$ Add Credit', specialHandling: handleAddCreditStatus },
      { key: 'fbaCom', label: 'COM FBA' },
    ];
  
    return fields.map(field => {
      const fieldValue = userData[field.key];
      let status = 'Pending';
      let formattedComment = `${field.label}: ${fieldValue || 'N/A'}`;
  
      if (field.specialHandling && fieldValue) {
        const result = field.specialHandling(fieldValue, userData);
        status = result.status;
        formattedComment = result.formattedComment;
      } else if (fieldValue && fieldValue.includes('(updated on')) {
        const [actualValue, datePart] = fieldValue.split(' (updated on ');
  
        if (field.key === 'listingsIn' || field.key === 'listingsCom') {
          status = actualValue.trim() !== '0' ? 'Done' : 'Pending';
        } else {
          status = actualValue === 'Done' ? 'Done' : 'Pending';
        }
  
        if (datePart) {
          const date = datePart.replace(')', ''); // Remove the closing parenthesis
          const formattedDate = moment(date).format('DD-MM-YYYY');
          formattedComment = `${field.label}: ${actualValue} (updated on ${formattedDate})`;
        }
      }
  
      return {
        label: field.label,
        comment: formattedComment,
        status,
      };
    });
  };
  
  const handleGstStatus = (value, description) => {
    let status = 'Pending';
    let formattedComment = 'GST: ';

    if (value.startsWith('Yes')) {
      status = 'Done';
      formattedComment += 'Yes';
    } else if (value.startsWith('No')) {
      status = 'Pending';
    }

    if (value.includes('(updated on')) {
      const [actualValue, datePart] = value.split(' (updated on ');
      const date = datePart.replace(')', '');
      const formattedDate = moment(date).format('DD-MM-YYYY');
      formattedComment += ` (updated on ${formattedDate})`;
    } else {
      formattedComment += value;
    }

    if (status === 'Pending' && description) {
      formattedComment += ` - ${description}`;
    }

    return { status, formattedComment };
  };

  const handleOnboardingStatus = (value, description) => {
    let status = 'Pending';
    let formattedComment = 'Onboarding Status: ';

    if (value.startsWith('Done')) {
      status = 'Done';
      formattedComment += 'Yes';
    } else if (value.startsWith('Pending')) {
      status = 'Pending';
      formattedComment += 'Pending';
    }

    if (value.includes('(updated on')) {
      const [actualValue, datePart] = value.split(' (updated on ');
      const date = datePart.replace(')', '');
      const formattedDate = moment(date).format('DD-MM-YYYY');
      formattedComment += ` (updated on ${formattedDate})`;
    }

    if (status === 'Pending' && description) {
      formattedComment += ` - ${description}`;
    }

    return { status, formattedComment };
  };

  const handleAccountOpenStatus = (value, description) => {
    let status = 'Pending';
    let formattedComment = 'IN Account Open: ';

    if (value.startsWith('Opened')) {
      status = 'Done';
      formattedComment += 'Opened';
    } else if (value.startsWith('Not Opened')) {
      status = 'Pending';
      formattedComment += 'Not Opened';
    }

    if (value.includes('(updated on')) {
      const [actualValue, datePart] = value.split(' (updated on ');
      const date = datePart.replace(')', '');
      const formattedDate = moment(date).format('DD-MM-YYYY');
      formattedComment += ` (updated on ${formattedDate})`;
    }

    return { status, formattedComment };
  };

  const handleGtinStatus = (value, description) => {
    let status = 'Pending';
    let formattedComment = 'GTIN: ';

    if (value.startsWith('Applied') || value.startsWith('Pending')) {
      status = 'Pending';
      formattedComment += 'Pending';
    } else if (value.startsWith('Denied')) {
      status = 'Error';
      formattedComment += 'Denied';
    } else if (value.startsWith('Approved')) {
      status = 'Done';
      formattedComment += 'Approved';
    }

    if (value.includes('(updated on')) {
      const [actualValue, datePart] = value.split(' (updated on ');
      const date = datePart.replace(')', '');
      const formattedDate = moment(date).format('DD-MM-YYYY');
      formattedComment += ` (updated on ${formattedDate})`;
    }

    return { status, formattedComment };
  };

  const handleAccountOpenComStatus = (value) => {
    let status = 'Pending';
    let formattedComment = 'COM Account Open: ';

    if (value.startsWith('Opened')) {
      status = 'Done';
      formattedComment += 'Opened';
    } else if (value.startsWith('Not Opened')) {
      status = 'Pending';
      formattedComment += 'Not Opened';
    }

    if (value.includes('(updated on')) {
      const [actualValue, datePart] = value.split(' (updated on ');
      const date = datePart.replace(')', '');
      const formattedDate = moment(date).format('DD-MM-YYYY');
      formattedComment = `Opened (Updated on ${formattedDate})`;
    }

    return { status, formattedComment };
  };

  const handleVideoKycStatus = (value, contactData) => {
    let status = 'Pending';
    let formattedComment = 'COM Video KYC: ';
    
    if (value.startsWith('Done')) {
      status = 'Done';
      formattedComment += 'Done';
    } else {
      const description = contactData.videoKycDescription || 'No description available';
      let formattedDate = '';
      
      if (value.includes('(updated on')) {
        const [actualValue, datePart] = value.split(' (updated on ');
        const date = datePart.replace(')', '');
        formattedDate = moment(date).format('DD-MM-YYYY');
        formattedComment += `${actualValue} (Updated on ${formattedDate}) - ${description}`;
      } else {
        formattedComment += `${value} - ${description}`;
      }
    }
    
    return { status, formattedComment };
  };

  const handleDeductStatus = (value, contactData) => {
    let status = 'Pending';
    let formattedComment = 'COM 1$ Deduct: ';
    
    if (value.startsWith('Deducted')) {
      status = 'Done';
      formattedComment += 'Deducted';
    } else {
      const description = contactData.deductDescription || 'No description available';
      let formattedDate = '';
      
      if (value.includes('(updated on')) {
        const [actualValue, datePart] = value.split(' (updated on ');
        const date = datePart.replace(')', '');
        formattedDate = moment(date).format('DD-MM-YYYY');
        formattedComment += `${actualValue} (Updated on ${formattedDate}) - ${description}`;
      } else {
        formattedComment += `${value} - ${description}`;
      }
    }
    
    return { status, formattedComment };
  };

  const handleAddCreditStatus = (value, contactData) => {
    let status = 'Pending';
    let formattedComment = 'COM 50$ Add Credit: ';
    
    if (value.startsWith('Done')) {
      status = 'Done';
      formattedComment += 'Done';
    } else if (value.startsWith('Not Done')) {
      const description = contactData.addCreditDescription || 'No description available';
      let formattedDate = '';
      
      if (value.includes('(updated on')) {
        const [actualValue, datePart] = value.split(' (updated on ');
        const date = datePart.replace(')', '');
        formattedDate = moment(date).format('DD-MM-YYYY');
        formattedComment += `${actualValue} (Updated on ${formattedDate}) - ${description}`;
      } else {
        formattedComment += `${value} - ${description}`;
      }
    }
    
    return { status, formattedComment };
  };

  return (
    <>
      {isPending ? (
        <Spin size="large" />
      ) : (
        <>
          <Row gutter={[16, 16]} justify="center" style={{ marginBottom: '20px' }}>
    <Col xs={24} sm={12} md={6}>
      <Card bordered={false} style={{ textAlign: 'center', background: '#fafafa' }}>
        <Badge count={totalTasks} style={{ backgroundColor: '#1890ff' }}>
          <Title level={4} style={{ margin: 0, color: '#1890ff' }}>Total Tasks</Title>
        </Badge>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card bordered={false} style={{ textAlign: 'center', background: '#fafafa' }}>
        <Badge count={totalPending} style={{ backgroundColor: '#faad14' }}>
          <Title level={4} style={{ margin: 0, color: '#faad14' }}>Pending Tasks</Title>
        </Badge>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card bordered={false} style={{ textAlign: 'center', background: '#fafafa' }}>
        <Badge count={totalDone} style={{ backgroundColor: '#52c41a' }}>
          <Title level={4} style={{ margin: 0, color: '#52c41a' }}>Done Tasks</Title>
        </Badge>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card bordered={false} style={{ textAlign: 'center', background: '#fafafa' }}>
        <Badge count={totalError} style={{ backgroundColor: '#ff4d4f' }}>
          <Title level={4} style={{ margin: 0, color: '#ff4d4f' }}>Error Tasks</Title>
        </Badge>
      </Card>
    </Col>
  </Row>
          <Card style={{ width: '20rem' }}>
            <div className="shine-border">
              <Title level={4}>User Information</Title>
              <UserInformationBoard userInfo={userInfo} />
            </div>
          </Card>
        </>
      )}
    </>
  );
};
const UserInformationBoard = ({ userInfo }) => {
  const formattedDate = moment(userInfo.date).format('DD-MM-YYYY');
  return (
    <>
      <p><strong>Name: </strong>{userInfo.name}</p>
      <p><strong>Email: </strong>{userInfo.email}</p>
      <p><strong>Enrollment ID: </strong>{userInfo.enrollmentId}</p>
      <p><strong>Service: </strong>{userInfo.service}</p>
      <p><strong>Created At: </strong>{formattedDate}</p>
    </>
  );
};

export default Dash;
