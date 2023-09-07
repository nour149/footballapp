import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const TabPane = Tabs.TabPane;


const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("somthing went wrong");
    }
  };

  // delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrong In Ntifications");
    }
  };

  
  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        <TabPane
          tab={
            <div className="d-flex justify-content-end">
              <h4 className="p-2" onClick={handleMarkAllRead}>
                Mark All Read
              </h4>
            </div>
          }
          key={0}
        >
    
    {user && user.notification.map((notification, index) => (
  <div className="card" style={{ cursor: "pointer" }} key={index}>
   {user.isAdmin ? (
      <div
        className="card-text"
        onClick={() => navigate(`/admin-appointments`)}
      >
        {notification.message}
      </div>
    ) : (
      <div
        className="card-text"
        onClick={() => navigate(`/appointments`)}
      >
        {notification.message}
      </div>
    )}
  </div>
))}

        </TabPane>
        <TabPane
          tab={
            <div className="d-flex justify-content-end">
              <h4
                className="p-2 text-primary"
                style={{ cursor: "pointer" }}
                onClick={handleDeleteAllRead}
              >
                Delete All Read
              </h4>
            </div>
          }
          key={1}
        >
{user && user.seennotification && user.seennotification.map((notificationMgs, index) => (
  <div className="card" style={{ cursor: "pointer" }} key={index}>
    <div
      className="card-text"
      onClick={() => navigate(notificationMgs.onClickPath)}
    >
      {notificationMgs.message}
    </div>
  </div>
))}
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;