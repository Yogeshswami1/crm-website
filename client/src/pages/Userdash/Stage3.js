import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Typography } from 'antd';
import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import './Userdashboard.css';
import moment from 'moment';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title } = Typography;

const Stage3 = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('enrollmentId');
    if (id) {
      fetchUserData(id);
      fetchTasks(id);
    }
  }, []);

  const fetchTasks = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${id}`);
      const contactData = response.data;
      const additionalTasksData = getAdditionalTasks(contactData);

      setTasks(additionalTasksData);
    } catch (error) {
      console.error('Error fetching tasks: ', error);
    }
  };

  const fetchUserData = async (enrollmentId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
      const userData = response.data;
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  const getAdditionalTasks = (contactData) => {
    const fields = [
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

      if (field.key === 'domainClaim') {
        status = fieldValue && fieldValue !== 'N/A' ? 'Done' : 'Pending';
      } else if (field.key === 'paymentGateway') {
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

  const getIcon = (status) => {
    switch (status) {
      case 'Done':
        return <FaCheckCircle style={{ color: 'green' }} />;
      case 'Pending':
        return <FaClock style={{ color: 'blue' }} />;
      default:
        return <FaExclamationCircle style={{ color: 'red' }} />;
    }
  };

  const getContentStyle = (status) => {
    switch (status) {
      case 'Done':
        return {
          background: '#c8e6c9', // Light green background for Done tasks
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          border: '1px solid #ddd'
        };
      case 'Pending':
        return {
          background: '#bbdefb', // Light blue background for Pending tasks
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          border: '1px solid #ddd'
        };
      default:
        return {
          background: '#ffcdd2', // Light red background for Error tasks
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          border: '1px solid #ddd'
        };
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <VerticalTimeline>
        {tasks.slice().reverse().map((task, index) => (
          <VerticalTimelineElement
            key={index}
            date={`Status: ${task.status}`}
            icon={getIcon(task.status)}
            iconStyle={{
              background: 'white',
              color: '#fff',
              boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
            }}
            contentStyle={getContentStyle(task.status)}
            contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
            dateStyle={{
              color: '#999',
              fontSize: '14px',
            }}
          >
            <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>{task.comment}</Title>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Stage3;
