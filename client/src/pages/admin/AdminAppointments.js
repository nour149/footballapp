import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";

import axios from "axios";

import moment from "moment";
import { message, Table } from "antd";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/admin/admin-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
 
    {
      title: "Client Name",
      dataIndex: "userInfo[0]",
      render: (text, record) => {
        if (record.userInfo && record.userInfo.length > 0 && record.userInfo[0].name) {
          return record.userInfo[0].name;
        }
        return "N/A"; 
      },
    },
    {
      title: "Terrain Info",
      dataIndex: "terrainInfo[0]",
      render: (text, record) => {
        if (record.terrainInfo && record.terrainInfo.length > 0 && record.terrainInfo[0].Name) {
          return record.terrainInfo[0].Name;
        }
        return "N/A"; 
      },
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {'--  '+record.time}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>Appoinmtnets Lists</h1>
  
      <Table
  columns={columns}
  dataSource={appointments.map((appointment, index) => ({
    ...appointment,
    key: index, // or use a unique identifier if available (e.g., appointment._id)
  }))}/>


    </Layout>
  );
};

export default AdminAppointments;