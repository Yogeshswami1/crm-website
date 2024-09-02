import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Typography } from 'antd';
import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title, Paragraph } = Typography;

const SocialMediaTimeline = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('enrollmentId');
    if (id) {
      fetchSocialMediaData(id);
    }
  }, []);

  const fetchSocialMediaData = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${id}`);
      const contactData = response.data;

      const socialMediaTasks = getSocialMediaTasks(contactData);
      setTasks(socialMediaTasks);
    } catch (error) {
      console.error('Error fetching social media data: ', error);
    }
  };

  const getSocialMediaTasks = (contactData) => {
    const fields = [
      { key: 'brandName', label: 'Brand Name' },
      { key: 'postWithDate', label: 'Post With Date' },
      // { key: 'instagram', label: 'Instagram' },
      // { key: 'facebook', label: 'Facebook' },
      // { key: 'pinterest', label: 'Pinterest' },
      // { key: 'medium', label: 'Medium' },
      // { key: 'quora', label: 'Quora' },
    ];

    const tasks = fields.map(field => {
      const fieldValue = contactData[field.key];
      let status = 'Pending';
      let formattedComment = `${field.label}: ${fieldValue || 'N/A'}`;

      if (fieldValue) {
        status = 'Done';
        if (field.key === 'postWithDate') {
          formattedComment = `${field.label}: ${fieldValue}`;
        }
      }

      return {
        comment: formattedComment,
        status,
      };
    });

    // Extracting and checking individual social media platform details
    const platforms = [
      {
        platform: 'Instagram',
        details: [
          { label: 'Account Open Instagram', value: contactData.accountOpenInsta },
          { label: 'Instagram ID', value: contactData.instagramId },
          { label: 'Instagram Password', value: contactData.instagramPassword },
          { label: 'Meta Connected Instagram', value: contactData.metaConnectedInsta },
        ],
      },
      {
        platform: 'Facebook',
        details: [
          { label: 'Account Open Facebook', value: contactData.accountOpenFacebook },
          { label: 'Facebook ID', value: contactData.facebookId },
          { label: 'Facebook Password', value: contactData.facebookPassword },
          { label: 'Meta Connected Facebook', value: contactData.metaConnectedFacebook },
        ],
      },
      {
        platform: 'Pinterest',
        details: [
          { label: 'Account Open Pinterest', value: contactData.accountOpenPinterest },
          { label: 'Pinterest ID', value: contactData.pinterestId },
          { label: 'Pinterest Password', value: contactData.pinterestPassword },
          { label: 'Post Pinterest', value: contactData.postPinterest },
        ],
      },
      {
        platform: 'Medium',
        details: [
          { label: 'Account Open Medium', value: contactData.accountOpenMedium },
          { label: 'Medium ID', value: contactData.mediumId },
          { label: 'Medium Password', value: contactData.mediumPassword },
          { label: 'Post Medium', value: contactData.postMedium },
        ],
      },
      {
        platform: 'Quora',
        details: [
          { label: 'Account Open Quora', value: contactData.accountOpenQuora },
          { label: 'Quora ID', value: contactData.quoraId },
          { label: 'Quora Password', value: contactData.quoraPassword },
          { label: 'Post Quora', value: contactData.postQuora },
        ],
      },
    ];

    platforms.forEach(({ platform, details }) => {
      const allDetailsFilled = details.every(detail => detail.value);
      tasks.push({
        comment: (
          <>
            <Title level={5}>{platform} Details</Title>
            {details.map((detail, index) => (
              <Paragraph key={index} style={{ marginBottom: '8px' }}>
                {detail.label}: {detail.value || 'N/A'}
              </Paragraph>
            ))}
          </>
        ),
        status: allDetailsFilled ? 'Done' : 'Pending',
      });
    });

    return tasks;
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
            {typeof task.comment === 'string' ? (
              <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>{task.comment}</Title>
            ) : (
              task.comment
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default SocialMediaTimeline;
