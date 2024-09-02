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

  const getAdditionalTasks = (contactData) => {
    const fields = [
      { key: 'stage1Completion', label: 'Stage 1 Completion' },
      { key: 'theme', label: 'Theme' },
      { key: 'idCard', label: 'ID Card' },
      { key: 'ovc', label: 'Onboarding Video Call' },
      { key: 'legality', label: 'Legality' },
      { key: 'stage2Completion', label: 'Stage 2 Completion' },
      { key: 'gallery', label: 'Gallery' },
      { key: 'banner', label: 'Banner' },
      { key: 'logo', label: 'Logo' },
      { key: 'productFile', label: 'Product File' },
      { key: 'catFile', label: 'CAT File' },
      { key: 'subDomain', label: 'Sub Domain' },
      { key: 'stage3Completion', label: 'Stage 3 Completion' },
      { key: 'readyToHandover', label: 'Ready To Handover' },
      { key: 'paymentGateway', label: 'Payment Gateway' },
      { key: 'websiteUploaded', label: 'Website Uploaded' },
      { key: 'domainMailVerification', label: 'Domain Mail Verification' },
      { key: 'domainClaim', label: 'Domain Claim' },
      { key: 'serverPurchase', label: 'Server Purchase' },
    ];

    return fields.map(field => {
      const fieldValue = contactData[field.key];
      let status = 'Pending';
      let formattedComment = `${field.label}: ${fieldValue || 'N/A'}`;

      if (field.key === 'theme') {
        if (fieldValue) {
          const [actualValue, datePart] = fieldValue.split(' (updated on ');
          status = ['Theme 1', 'Theme 2', 'Theme 3'].includes(actualValue) ? 'Done' : 'Pending';

          if (datePart) {
            const date = datePart.replace(')', ''); // Remove the closing parenthesis
            const formattedDate = moment(date).format('DD-MM-YYYY');
            formattedComment = `${field.label}: ${actualValue} (updated on ${formattedDate})`;
          }
        } else {
          status = 'Pending';
        }
      } else if (field.key === 'subDomain' || field.key === 'paymentGateway' || field.key === 'domainClaim') {
        status = fieldValue && fieldValue !== 'N/A' ? 'Done' : 'Pending';
      } else if (fieldValue && fieldValue.includes('(updated on')) {
        const [actualValue, datePart] = fieldValue.split(' (updated on ');
        status = actualValue === 'Done' ? 'Done' : 'Pending';

        if (datePart) {
          const date = datePart.replace(')', ''); // Remove the closing parenthesis
          const formattedDate = moment(date).format('DD-MM-YYYY');
          formattedComment = `${field.label}: ${actualValue} (updated on ${formattedDate})`;
        }
      }

      return {
        comment: formattedComment,
        status,
      };
    });
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
