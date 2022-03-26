import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

const AddDispatch = ({
  setDispatchFormData,
  handleOk,
  isModalVisible,
  handleCancel,
  dispatchFormData,
  showModal,
}) => {
  function onChangeDate(value, dateString) {
    console.log("Selected Time: ", value);

    setDispatchFormData({
      ...dispatchFormData,
      startDate: dateString[0],
      endDate: dateString[1],
    });
    console.log("Formatted Selected Time: ", dateString);
  }

  const shippingForm = () => (
    <>
      <Form
        initialValues={{
          remember: true,
        }}
        layout={"vertical"}
      >
        <Form.Item
          label="Delivery Number"
          name="deliveryNum"
          rules={[
            {
              required: true,
              message: "Please provide Delivery Number!",
            },
          ]}
        >
          <Input
            placeholder="Number.."
            value={dispatchFormData.deliveryNum}
            onChange={(e) =>
              setDispatchFormData({
                ...dispatchFormData,
                deliveryNum: e.target.value,
              })
            }
            className="success-focus"
          />
        </Form.Item>

        <Form.Item label="Shipment Number" name="shipmentNumber">
          <Input
            placeholder="shipment number.."
            value={dispatchFormData.shipmentNumber}
            onChange={(e) =>
              setDispatchFormData({
                ...dispatchFormData,
                shipmentNumber: e.target.value,
              })
            }
            className="success-focus"
          />
        </Form.Item>

        <Form.Item
          label="Driver Number"
          name="driverNum"
          rules={[
            {
              required: true,
              message: "Please provide valid number",
            },
            {
              pattern: new RegExp(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/),
              message: "Enter valid phone number",
            },
          ]}
        >
          <Input
            placeholder="90221391xxx.."
            value={dispatchFormData.driverNum}
            onChange={(e) => {
              setDispatchFormData({
                ...dispatchFormData,
                driverNum: e.target.value,
              });
            }}
            className="success-focus"
            required
          />
        </Form.Item>

        <Form.Item
          label="Destination code"
          name="destCode"
          rules={[
            {
              type: "number",
              required: true,
              message: "Please provide valid Pincode",
            },
            {
              pattern: new RegExp(/^[1-9][0-9]{5}$/),
              message: "Provide valid pincode !",
            },
          ]}
          style={{ display: "inline-block" }}
        >
          <InputNumber
            placeholder="pincode.."
            value={dispatchFormData.destCode}
            onChange={(value) => {
              setDispatchFormData({ ...dispatchFormData, destCode: value });
            }}
            className="success-focus"
            required
          />
        </Form.Item>

        <Form.Item
          label="source code"
          name="sourceCode"
          rules={[
            {
              type: "number",
              required: true,
              message: "Please provide valid Pincode",
            },
            {
              pattern: new RegExp(/^[1-9][0-9]{5}$/),
              message: "Provide valid pincode !",
            },
          ]}
          style={{ display: "inline-block" }}
        >
          <InputNumber
            placeholder="pincode.."
            value={dispatchFormData.sourceCode}
            onChange={(value) => {
              setDispatchFormData({ ...dispatchFormData, sourceCode: value });
            }}
            className="success-focus"
            required
          />
        </Form.Item>

        <Form.Item
          label="Vechile Number"
          name="vechileNumber"
          rules={[
            {
              required: true,
              message: "Please provide VIN Number",
            },
            {
              pattern: new RegExp(/[A-HJ-NPR-Z0-9]{17}/),
              message: "Provide valid VIN !",
            },
          ]}
          style={{ display: "inline-block" }}
        >
          <Input
            placeholder="vechile Number.."
            value={dispatchFormData.vechileNumber}
            onChange={(e) => {
              setDispatchFormData({
                ...dispatchFormData,
                vechileNumber: e.target.value,
              });
            }}
            className="success-focus"
            required
          />
        </Form.Item>

        <Form.Item label="transporter" name="transporter">
          <Input
            placeholder="transporter"
            value={dispatchFormData.transporter}
            onChange={(e) =>
              setDispatchFormData({
                ...dispatchFormData,
                transporter: e.target.value,
              })
            }
            className="success-focus"
          />
        </Form.Item>

        <Form.Item label="driverName" name="driverName">
          <Input
            placeholder="Driver Name.."
            value={dispatchFormData.driverName}
            onChange={(e) =>
              setDispatchFormData({
                ...dispatchFormData,
                driverName: e.target.value,
              })
            }
            className="success-focus"
          />
        </Form.Item>
      </Form>
      <RangePicker
        required
        showTime={{ format: "HH:mm" }}
        onChange={onChangeDate}
        format="YYYY-MM-DD HH:mm"
      />
    </>
  );

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Dispatch
      </Button>
      <Modal
        title="Enter Dispatch Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {shippingForm()}
      </Modal>
    </>
  );
};

export default AddDispatch;
