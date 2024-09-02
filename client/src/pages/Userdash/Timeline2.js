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

const Timeline2 = () => {
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
      { key: 'gst', label: 'GST', descriptionKey: 'gstDescription', specialHandling: handleGstStatus },
      { key: 'onboardingStatus', label: 'Onboarding Status', descriptionKey: 'onboardingDescription', specialHandling: handleOnboardingStatus },
      { key: 'accountOpenIn', label: 'IN Account Open', specialHandling: handleAccountOpenStatus },
      { key: 'gtin', label: 'GTIN', descriptionKey: 'gtinDescription', specialHandling: handleGtinStatus },
      { key: 'listingsIn', label: 'IN Listings' },
      { key: 'launchDateIn', label: 'IN Launch Date' },
      { key: 'addRegionIn', label: 'IN Add Region' },
      { key: 'fbaIn', label: 'IN FBA' },
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
        if (field.key === 'listingsIn') {
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

    if (value.startsWith('Pending')) {
      status = 'Pending';
      formattedComment += 'Pending';
      if (description) {
        formattedComment += ` - ${description}`;
      }
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
            <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>{task.comment.split(' - ')[0]}</Title>
            {task.status === 'Pending' && task.description ? (
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

export default Timeline2;
