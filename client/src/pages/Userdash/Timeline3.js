import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Typography } from 'antd';
import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import './Userdashboard.css';
import moment from 'moment';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title, Text } = Typography;

const Timeline3 = () => {
  const [additionalTasks, setAdditionalTasks] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('enrollmentId');
    if (id) {
      fetchAdditionalTasks(id);
    }
  }, []);

  const fetchAdditionalTasks = async (enrollmentId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
      const contactData = response.data;
      const additionalTasksData = getAdditionalTasks(contactData);
      setAdditionalTasks(additionalTasksData);
    } catch (error) {
      console.error('Error fetching additional tasks: ', error);
    }
  };

  const getAdditionalTasks = (contactData) => {
    const fields = [
      { key: 'accountOpenCom', label: 'COM Account Open', specialHandling: handleAccountOpenComStatus },
      { key: 'videoKyc', label: 'COM Video KYC', descriptionKey: 'videoKycDescription', specialHandling: handleVideoKycStatus },
      { key: 'deduct', label: 'COM 1$ Deduct', descriptionKey: 'deductDescription', specialHandling: handleDeductStatus },
      { key: 'listingsCom', label: 'COM Listings' },
      { key: 'launchDateCom', label: 'COM Launch Date' },
      { key: 'nia', label: 'COM NIA' },
      { key: 'addCredit', label: 'COM 50$ Add Credit', descriptionKey: 'addCreditDescription', specialHandling: handleAddCreditStatus },
      { key: 'fbaCom', label: 'COM FBA' },
    ];

    const additionalTasks = fields.map(field => {
      const fieldValue = contactData[field.key];
      let status = 'Pending';
      let formattedComment = `${field.label}: ${fieldValue}`;
      let description = contactData[field.descriptionKey] || '';

      if (field.specialHandling) {
        if (fieldValue !== undefined) {
          const result = field.specialHandling(fieldValue, description);
          status = result.status;
          formattedComment = result.formattedComment;
        } else {
          console.warn(`Field value for ${field.key} is undefined`);
        }
      } else if (fieldValue && fieldValue.includes('(updated on')) {
        const [actualValue, datePart] = fieldValue.split(' (updated on ');
        if (field.key === 'listingsCom') {
          status = actualValue.trim() !== '0' ? 'Done' : 'Pending';
        } else {
          status = actualValue === 'Done' ? 'Done' : 'Pending';
        }

        if (datePart) {
          const date = datePart.replace(')', '');
          const formattedDate = moment(date).format('DD-MM-YYYY');
          formattedComment = `${field.label}: ${actualValue} (updated on ${formattedDate})`;
        }
      }

      return {
        label: field.label,
        comment: formattedComment,
        status,
        description,
      };
    });

    return additionalTasks;
  };

  const handleAccountOpenComStatus = (fieldValue, description) => {
    let status = 'Pending';
    let formattedComment = `COM Account Open: ${fieldValue}`;
    
    if (fieldValue.includes('(updated on')) {
      const [actualValue, datePart] = fieldValue.split(' (updated on ');
      const date = datePart.replace(')', '');
      const formattedDate = moment(date).format('DD-MM-YYYY');
      formattedComment = `COM Account Open: ${actualValue.trim()} (updated on ${formattedDate})`;
  
      if (actualValue.trim() === 'Opened') {
        status = 'Done';
      } else if (actualValue.trim() === 'Not Opened') {
        status = 'Pending';
      }
    }
    
    return { status, formattedComment };
  };

  const handleVideoKycStatus = (fieldValue, description) => {
    let status = 'Pending';
    let formattedComment = `COM Video KYC: ${fieldValue}`;
  
    if (fieldValue.includes('(updated on')) {
      const [actualValue, datePart] = fieldValue.split(' (updated on ');
      const date = datePart.replace(')', '');
      const formattedDate = moment(date).format('DD-MM-YYYY');
      formattedComment = `COM Video KYC: ${actualValue.trim()} (Updated on ${formattedDate})`;
  
      if (actualValue.trim() === 'Done') {
        status = 'Done';
      } else if (actualValue.trim() === 'Pending') {
        status = 'Pending';
        formattedComment = `${formattedComment} - ${description}`;
      } else if (actualValue.trim() === 'Not Done') {
        status = 'Error';
      }
    }
  
    return { status, formattedComment };
  };

  const handleDeductStatus = (fieldValue, description) => {
    let status = 'Pending';
    let formattedComment = `COM 1$ Deduct: ${fieldValue}`;
    
    if (fieldValue.includes('(updated on')) {
      const [actualValue, datePart] = fieldValue.split(' (updated on ');
      const date = datePart.replace(')', '');
      const formattedDate = moment(date).format('DD-MM-YYYY');
      formattedComment = `COM 1$ Deduct: ${actualValue.trim()} (Updated on ${formattedDate})`;
  
      if (actualValue.trim() === 'Deducted') {
        status = 'Done';
      } else if (actualValue.trim() === 'Pending') {
        status = 'Pending';
        formattedComment = `${formattedComment} - ${description}`;
      }
    }
    
    return { status, formattedComment };
  };

  const handleAddCreditStatus = (fieldValue, description) => {
    let status = 'Pending';
    let formattedComment = `COM 50$ Add Credit: ${fieldValue}`;
  
    if (fieldValue.includes('(updated on')) {
      const [actualValue, datePart] = fieldValue.split(' (updated on ');
      const date = datePart.replace(')', '');
      const formattedDate = moment(date).format('DD-MM-YYYY');
      formattedComment = `COM 50$ Add Credit: ${actualValue.trim()} (Updated on ${formattedDate})`;
  
      if (actualValue.trim() === 'Done') {
        status = 'Done';
      } else if (actualValue.trim() === 'Pending') {
        status = 'Pending';
        formattedComment = `${formattedComment} - ${description}`;
      }
    } else {
      if (fieldValue === 'Done') {
        status = 'Done';
      } else if (fieldValue === 'Not Done') {
        status = 'Pending';
        formattedComment = `${formattedComment} - ${description}`;
      }
    }
  
    return { status, formattedComment };
  };

  const getIcon = (status) => {
    switch (status) {
      case 'Done':
        return <FaCheckCircle style={{ color: 'green' }} />;
      case 'Pending':
        return <FaClock style={{ color: 'blue' }} />;
      case 'Error':
        return <FaExclamationCircle style={{ color: 'red' }} />;
      default:
        return <FaExclamationCircle style={{ color: 'red' }} />;
    }
  };

  const getContentStyle = (status) => {
    switch (status) {
      case 'Done':
        return {
          background: '#c8e6c9',
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          border: '1px solid #ddd'
        };
      case 'Pending':
        return {
          background: '#bbdefb',
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          border: '1px solid #ddd'
        };
      case 'Error':
        return {
          background: '#ffcdd2',
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          border: '1px solid #ddd'
        };
      default:
        return {
          background: '#fff',
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
    {additionalTasks.map((task, index) => (
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
        <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>
          {task.comment.split(' - ')[0]}
        </Title>
        {(task.status === 'Pending' || task.status === 'Error') && task.description ? (
          <Text style={{ color: '#666' }}>
            {task.description}
          </Text>
        ) : null}
      </VerticalTimelineElement>
    ))}
  </VerticalTimeline>
</div>
  );
};

export default Timeline3;
