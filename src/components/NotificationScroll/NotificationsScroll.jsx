import React from "react";
import "./NotificationsScroll.scss";
import Notification from "../../images/Cards_horizontales.png";
import TwoNots from "../../images/Cards_horizontalestwo.png";
import NotificationThree from "../../images/Cards_horizontalesthree.png";
import Notificationfour from "../../images/Cards_horizontalesfour.png"
import Notificationfive from "../../images/Cards_horizontalesfive.png"
import Notificationsix from "../../images/Cards_horizontalessix.png"
import Notificationseven from "../../images/Cards_horizontalesseven.png"
import Notificationeight from "../../images/Cards_horizontaleseight.png"
import Notificationnine from "../../images/Cards_horizontalesnine.png"

const NotificationsScroll = () => {
  return (
    <div>
      NotificationsScroll
      <div className="scroll_notificationContainer">
        Hola
        <img src={Notification} alt="notification" className="notification" />
        <img src={TwoNots} alt="notification2" className="notification2" />
        <div className="notification_card">
          <img
            src={NotificationThree}
            alt="notification3"
            className="notification3"
          />
        </div>
        <div className="notification_card">
            <img src={Notificationfour} alt="notification4" className="notification4" />
          </div>
          <div className="notification_card">
            <img src={Notificationfive} alt="notification5" className="notification5" />
          </div>
          <div className="notification_card">
            <img src={Notificationsix} alt="notification6" className="notification6" />
          </div>
          <div className="notification_card">
            <img src={Notificationseven} alt="notification7" className="notification7" />
          </div>
          <div className="notification_card">
            <img src={Notificationeight} alt="notification8" className="notification8" />
          </div>
          <div className="notification_card">
            <img src={Notificationnine} alt="notification9" className="notification9" />
          </div>
      </div>
    </div>
  );
};

export default NotificationsScroll;
