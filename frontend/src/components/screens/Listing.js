import { PlusOutlined } from "@ant-design/icons";
import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { createDispatch, getDispatch } from "../../functions/dispatch";
import AddDispatch from "./AddDispatch";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getToken } from "../../functions/auth";

const Listing = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const history = useHistory();

  const formTemp = {
    deliveryNum: 0,
    shipmentNumber: 0,
    destCode: 0,
    sourceCode: 0,
    startDate: "",
    endDate: "",
    driverNum: 0,
    driverName: "",
    transporter: "",
    vechileNumber: 0,
  };
  const [dispatchData, setDispatchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [dispatchFormData, setDispatchFormData] = useState(formTemp);
  const [modified, setModified] = useState(false);
  // const [deliveryNumber, setDeliveryNumber] = useState(0);
  // const [shipmentNumber, setShipmentNumber] = useState(0);
  // const [destCode, setDestCode] = useState("");
  // const [sourceCode, setSourceCode] = useState(0);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [driverNum, setDriverNum] = useState(0);
  // const [driverName, setDriverName] = useState("");
  // const [transporter, setTransporter] = useState("");
  // const [vechileNumber, setVechileNumber] = useState(0);

  //success mes
  const success = (msg) => {
    message.success({
      content: msg,
      className: "custom-class",
      style: {
        marginTop: "11vh",
      },
    });
  };

  const errorMessage = (msg) => {
    message.error({
      content: msg,
      className: "custom-class",
      style: {
        marginTop: "11vh",
      },
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    console.log("clicked");
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(dispatchFormData);
    dispatchFormData.createdBy = user.userId;
    dispatchFormData.updatedBy = user.userId;
    console.log(dispatchFormData);

    createDispatch(dispatchFormData, user.token)
      .then((res) => {
        console.log(res);

        if (modified) {
          setModified(false);
        } else {
          setModified(true);
        }
        setModified(true);
        setDispatchFormData(formTemp);
        success("successfully Created");
      })
      .catch((error) => {
        console.log(error.response.data.msg, "this is the erorr");

        errorMessage(error.response.data.msg);
        console.log(error.response);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //intialized columns for the table and also some customizations
  const columns = [
    {
      key: "1",
      title: "Delivery Number",
      dataIndex: "deliveryNumber",
      sorter: (record1, record2) => {
        return record1.deliveryNumber < record2.deliveryNumber;
      },
    },
    {
      key: "2",
      title: "Shipment Number",
      dataIndex: "shipmentNumber",
      render: (record) => {
        return <p> {record === null ? "None" : record}</p>;
      },
      sorter: (record1, record2) => {
        return record1.deliveryNumber < record2.deliveryNumber;
      },
    },
    {
      key: "3",
      title: "Destination code",
      dataIndex: "destCode",
    },
    {
      key: "4",
      title: "Source code",
      dataIndex: "sourceCode",
    },
    {
      key: "5",
      title: "Start Date",
      dataIndex: "startDate",
      render: (record) => {
        var date = new Date(record);
        return <p>{date.toDateString()}</p>;
      },
      sorter: (record1, record2) => {
        return record1.deliveryNumber < record2.deliveryNumber;
      },
    },
    {
      key: "6",
      title: "End Date",
      dataIndex: "EndDate",
      render: (record) => {
        var date = new Date(record);
        return <p>{date.toDateString()}</p>;
      },
      sorter: (record1, record2) => {
        return record1.deliveryNumber < record2.deliveryNumber;
      },
    },
    {
      key: "7",
      title: "Driver Name",
      dataIndex: "driverName",
      render: (record) => {
        return <p> {record === null ? "None" : record}</p>;
      },
    },
    {
      key: "7",
      title: "Driver Number",
      dataIndex: "driverNum",
      render: (record) => {
        return <p> {record === null ? "None" : record}</p>;
      },
    },
    { key: "8", title: "Transporter", dataIndex: "transporter" },
    { key: "9", title: "vechile Number", dataIndex: "vechileNumber" },
  ];

  //fetching the data with pagination
  useEffect(() => {
    setLoading(true);
    getDispatch(pageNum)
      .then((res) => {
        setLoading(false);

        console.log(res.data.data, "this is the data");
        setDispatchData(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [pageNum, modified]);

  return (
    <>
      <div>
        <AddDispatch
          setDispatchFormData={setDispatchFormData}
          dispatchFormData={dispatchFormData}
          handleOk={handleOk}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          showModal={showModal}
        />

        <Table
          loading={loading}
          columns={columns}
          dataSource={dispatchData}
          pagination={{
            total: 20,
            pageSize: pageSize,
            current: pageNum,
            onChange: (page) => {
              setPageNum(page);
            },
          }}
        ></Table>
      </div>
    </>
  );
};

export default Listing;
