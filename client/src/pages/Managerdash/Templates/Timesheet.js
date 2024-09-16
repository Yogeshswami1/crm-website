import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Spin, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const Timesheet = ({ visible, onClose, onSave, enrollmentId, apiUrl }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState([]); // Store fetched timesheet data

  useEffect(() => {
    if (visible && enrollmentId) {
      fetchTimesheetData();
    }
  }, [visible, enrollmentId]);

  // Fetch existing timesheet data
  const fetchTimesheetData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/timesheets/${enrollmentId}`);
      setInitialData(response.data.tasks || []);
      form.setFieldsValue({ tasks: response.data.tasks || [] }); // Set form fields with fetched data
    } catch (error) {
      console.error('Error fetching timesheet:', error);
      message.error('Failed to load timesheet data');
    }
    setLoading(false);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then(values => {
        onSave(values.tasks);
        form.resetFields(); // Reset fields after saving
        onClose(); // Close modal after saving
      })
      .catch(info => {
        console.log('Validation Failed:', info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Task Details"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      {loading ? (
        <Spin />
      ) : (
        <Form form={form} layout="vertical">
          {/* Dynamically Add/Remove Task Fields */}
          <Form.List name="tasks" initialValue={initialData}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'taskDate']}
                        fieldKey={[field.fieldKey, 'taskDate']}
                        label={`Task Date ${index + 1}`}
                        rules={[{ required: true, message: 'Please enter the task date!' }]}
                      >
                        <Input placeholder="Enter task date" />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, 'dueDate']}
                        fieldKey={[field.fieldKey, 'dueDate']}
                        label="Due Date"
                        rules={[{ required: true, message: 'Please enter the due date!' }]}
                      >
                        <Input placeholder="Enter due date" />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, 'status']}
                        fieldKey={[field.fieldKey, 'status']}
                        label="Status"
                        rules={[{ required: true, message: 'Please enter the status!' }]}
                      >
                        <Input placeholder="Enter status" />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, 'worked']}
                        fieldKey={[field.fieldKey, 'worked']}
                        label="Worked"
                        rules={[{ required: true, message: 'Please enter worked details!' }]}
                      >
                        <Input placeholder="Enter worked details" />
                      </Form.Item>
                    </div>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ marginLeft: '8px', color: 'red', alignSelf: 'center' }}
                      />
                    ) : null}
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '100%' }}
                    icon={<PlusOutlined />}
                  >
                    Add Task
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      )}
    </Modal>
  );
};

export default Timesheet;
