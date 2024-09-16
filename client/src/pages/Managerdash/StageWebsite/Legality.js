import React from "react";
import { Modal, Form, Input, Switch, Button, DatePicker } from "antd";
import moment from "moment";  // Required to work with dates

const Legality = ({
  isLegalityModalVisible,
  handleLegalitySave,
  setIsLegalityModalVisible,
  legalityStatus,
  setLegalityStatus,
  legalityDescription,
  setLegalityDescription,
  legalityDate,
  setLegalityDate
}) => {
  
  // Disable dates before today
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day');
  };

  return (
    <Modal
      title="Legality Details"
      open={isLegalityModalVisible}
      onCancel={() => setIsLegalityModalVisible(false)}
      onOk={handleLegalitySave}
    >
      <Form layout="vertical">
        <Form.Item label="Legality Status">
          <Switch
            checked={legalityStatus}
            onChange={(checked) => setLegalityStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        <Form.Item label="Legality Description">
          <Input.TextArea
            value={legalityDescription}
            onChange={(e) => setLegalityDescription(e.target.value)}
            rows={4}
          />
        </Form.Item>
        <Form.Item label="Legality Date">
          <DatePicker
            value={legalityDate ? moment(legalityDate) : null}
            onChange={(date) => setLegalityDate(date ? date.format('YYYY-MM-DD') : '')}
            disabledDate={disabledDate}  // Disable past dates
            format="YYYY-MM-DD"  // Define the date format
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Legality;
