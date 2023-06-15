import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NotificationsScroll from "../NotificationScroll/NotificationsScroll";
// import Notification from "../../images/Card_horizontales.png";
// import Notification2 from "../../images/Card_horizontales2.png";
// import Notification3 from "../../images/Card_horizontales3.png";
// import Notification4 from "../..//images/Card_horizontales4.png";
// import Notification5 from "../../images/Card_horizontales5.png";
// import Notification6 from "../../images/Card_horizontales6.png";
// import Notification7 from "../../images/Card_horizontales7.png";
// import Notification8 from "../../images/Card_horizontales8.png";
// import Notification9 from "../../images/Card_horizontales9.png";

const Notification = () => {
  const [activeComponent, setActiveComponent] = useState("Notifications");
  const navigate = useNavigate();


  useEffect(() => {
    setTimeout(() => {
      setActiveComponent('Notifications');
    }, 100);
  }, []);


  return (
    <>
      <Header />
      <div className="main_notificationContainer">
        <NotificationsScroll />
      </div>

      <Footer activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
    </>
  );
};

export default Notification;
