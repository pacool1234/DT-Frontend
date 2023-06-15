import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatList.scss";
import { UserContext } from "../../context/UserContext/UserState";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import points from "../../../src/images/points_upAll.png";
import groupChats from "../../../src/images/groupal_chats.png";
import noPic from "../../../src/images/no_pic.png";

const ChatList = () => {
  const { user, chats, getUser, getChatsFromUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("ChatList");
  const [isSingle, setIsSingle] = useState(true);

  useEffect(() => {
    getUser(), getChatsFromUser();
    setTimeout(() => {
      setActiveComponent("ChatList");
    }, 100);
  }, []);

  const API_URL = "http://localhost:8080/";

  const getReceiver = (chat) => {
    const usersArray = chat.users;
    const receiver = usersArray.find((x) => x.username !== user.username);
    return receiver;
  };

  const extractFilePathFromImage = (path) => {
    const url = "https://desafio-backend-production.up.railway.app/users/";
    return url + path.replace("uploads/", "");
  };

  const formatTime = (utcDate) => {
    let date = new Date(utcDate);
    date.setHours(date.getHours() - 0);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return date.toTimeString().slice(0, 5);
    }

    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Ayer";
    }

    var lastMonday = new Date();
    lastMonday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    if (date > lastMonday) {
      return [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ][date.getDay() - 1];
    }

    return (
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear()
    );
  };

  const formatLastMessage = (message) => {
    const maxLength = 15;
    if (message.length > maxLength) {
      return message.slice(0, maxLength) + "...";
    }
    return message;
  };

  const groupChatImage = <img src={groupChats} width={428}></img>;

  const chatList = chats.map((chat, index) => {
    return (
      <div
        key={index}
        className="chatItem"
        onClick={() => navigate(`/chat/${chat._id}`)}
      >
        <div className="imageDiv">
          <div className="imageContainer">
            <img src={extractFilePathFromImage(getReceiver(chat).img) ? extractFilePathFromImage(getReceiver(chat).img) : noPic} />
            {/* <img src={noPic} /> */}
          </div>
        </div>
        <div className="chatInfo">
          <div className="namePlusDate">
            <p className="leftUsername">{getReceiver(chat).username}</p>
            <p className="rightTime">
              {formatTime(chat.history[chat.history.length - 1].date)}
            </p>
          </div>
          <div className="firstRowOfMessage">
            <p>
              {formatLastMessage(chat.history[chat.history.length - 1].message)}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Header />
      <div className="chatListContainer">
        <div className="chatListTitleContainer">
          <p>Chat</p>
          <img className="pointsImage" src={points} />
        </div>
        <div className="switchingButtonsContainer">
          <button className="single" onClick={() => setIsSingle(true)}>
            Individuales
          </button>
          <button className="group" onClick={() => setIsSingle(false)}>
            Grupales
          </button>
        </div>
        <div className="chatListDiv">
          {isSingle ? chatList : groupChatImage}
        </div>
      </div>
      <Footer
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
    </>
  );
};

export default ChatList;
