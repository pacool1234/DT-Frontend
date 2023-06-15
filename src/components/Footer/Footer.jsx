import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import {
  MdHome,
  MdDateRange,
  MdContacts,
  MdNotifications,
  MdChat,
} from "react-icons/md";

const Footer = ({ activeComponent, setActiveComponent }) => {
  return (
    <>
      <div className="buttonsContainer">
        <Link
          to="/home"
          className="icon"
          style={{
            color: ["Home", "HomeTab"].includes(activeComponent) ? "coral" : "ligthgray",
          }}
          onClick={() => setActiveComponent("Home")}
        >
          <MdHome />
        </Link>
        <Link
          to="/events"
          className="icon"
          style={{
            color: ["Events", "MainCalendar"].includes(activeComponent) ? "coral" : "ligthgray",
          }}
          onClick={() => setActiveComponent("Events")}
        >
          <MdDateRange />
        </Link>
        <Link
          to="/contacts"
          className="icon"
          style={{
            color: ["Contacts", "OtherProfile"].includes(activeComponent) ? "coral" : "ligthgray",
          }}
          onClick={() => setActiveComponent("Contacts")}
        >
          <MdContacts />
        </Link>
        <Link
          to="/notification"
          className="icon"
          style={{
            color: activeComponent === "Notifications" ? "coral" : "ligthgray",
          }}
          onClick={() => setActiveComponent("Notifications")}
        >
          <MdNotifications />
        </Link>
        <Link
          to="/chatlist"
          className="icon"
          style={{
            color: activeComponent === "ChatList" ? "coral" : "ligthgray",
          }}
          onClick={() => setActiveComponent("ChatList")}
        >
          <MdChat />
        </Link>
      </div>
    </>
  );
};

export default Footer;
