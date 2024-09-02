import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Typography } from 'antd';
import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title, Paragraph } = Typography;

const EcommerceTimeline = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('enrollmentId');
    if (id) {
      fetchEcommerceData(id);
    }
  }, []);

  const fetchEcommerceData = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${id}`);
      const contactData = response.data;

      const ecommerceTasks = getEcommerceTasks(contactData);
      setTasks(ecommerceTasks);
    } catch (error) {
      console.error('Error fetching social media data: ', error);
    }
  };

  const getEcommerceTasks = (contactData) => {
    const fields = [
      { key: 'brandName', label: 'Brand Name' },
      { key: 'logo', label: 'Logo' },
      // { key: 'amazonIn', label: 'Amazon.In' },
      // { key: 'amazonCom', label: 'Amazon.Com' },
      // { key: 'flipkart', label: 'Flipkart' },
      // { key: 'meesho', label: 'Meesho' },
      // { key: 'ebay', label: 'Ebay' },
    ];

    const tasks = fields.map(field => {
      const fieldValue = contactData[field.key];
      let status = 'Pending';
      let formattedComment = `${field.label}: ${fieldValue || 'N/A'}`;

      if (fieldValue) {
        status = 'Done';
        if (field.key === 'logo') {
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
        platform: 'Amazom.In',
        details: [
          { label: 'Account Open Amazon', value: contactData.accountOpenAmazonIn },
          { label: 'Amazon ID', value: contactData.amazonInId },
          { label: 'Amazon Password', value: contactData.amazonPass },
          { label: 'Meta Connected Amazon', value: contactData.metaConnectedAmazon },
        ],
      },
      {
        platform: 'Amazon.Com',
        details: [
          { label: 'Account Open Amazon', value: contactData.accountOpenAmazonCom },
          { label: 'Amazon ID', value: contactData.amazonComId },
          { label: 'Amazon Password', value: contactData.amazonComPass },
          { label: 'Meta Connected Amazon', value: contactData.metaConnectedAmazon },
        ],
      },
      {
        platform: 'Flipkart',
        details: [
          { label: 'Account Open Flipkart', value: contactData.accountOpenFlipkart },
          { label: 'Flipkart ID', value: contactData.flipkartId },
          { label: 'Flipkart Password', value: contactData.flipkartPass },
          { label: 'Post Flipkart', value: contactData.postFlipkart },
        ],
      },
      {
        platform: 'Meesho',
        details: [
          { label: 'Account Open Meesho', value: contactData.accountOpenMeesho },
          { label: 'Meesho ID', value: contactData.meeshoId },
          { label: 'Meesho Password', value: contactData.meeshoPass },
          { label: 'Post Meesho', value: contactData.postMeesho },
        ],
      },
      {
        platform: 'Ebay',
        details: [
          { label: 'Account Open Ebay', value: contactData.accountOpenEbay },
          { label: 'Ebay ID', value: contactData.ebayId },
          { label: 'Ebay Password', value: contactData.ebayPass },
          { label: 'Post Ebay', value: contactData.postEbay },
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

export default EcommerceTimeline;
