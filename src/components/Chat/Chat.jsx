import React, { useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import "./Chat.scss";
import { ChatContext } from "../../context/ChatContext/ChatState";
import { UserContext } from "../../context/UserContext/UserState";
import { MdSend, MdAttachFile } from "react-icons/md";
import emptyChat from "../../../src/images/empty_chat.png";
import noPic from "../../../src/images/no_pic.png";


let socket;

const Chat = () => {
  const { chat, history, token, getSingleChat, sendMessage } = useContext(ChatContext);
  const { user, getUser } = useContext(UserContext);
  const { _id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    message: "",
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setLoading(true)
    getUser();
    getSingleChat(_id).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [history]);

  useEffect(() => {
    socket = io("https://desafio-backend-production.up.railway.app/"); // CHANGE this with your server URL
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [_id]);

  useEffect(() => {
    const handler = () => {
      getSingleChat(_id);
    };
    socket.on("chat update", handler);
    // socket.on("connect", () => {
    //   console.log(socket);
    // });
    return () => {
      socket.on("chat update", handler);
    };
  }, []);

  if (loading) {
    return (  <div className="chatContainer">
        <div className="singleChatHeader">
          <div className="backArrow" onClick={() => navigate("/chatlist")}>
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
          <div className="receiverImage">
            <img src={noPic} />
          </div>
        </div>
        <div ref={messagesEndRef} /> 
        <div className="sendMessage">
          <div className="blankSpace"> </div>
          <form>
            <input
              type="text"
              placeholder="Message"
              name="message"
            />
            <button disabled className="attachIcon">
              <MdAttachFile />
            </button>
            <button type="submit" className="sendIcon">
              <MdSend />
            </button>
          </form>
        </div>
      </div>);
  }

  const getUserID = (chat) => {
    const usersArray = chat.users;
    const sender = usersArray.find(x => x.username === user.username);
    return sender._id;
  }
  
  const getReceiver = (chat) => {
    const usersArray = chat.users;
    const receiver = usersArray.find(x => x.username !== user.username);
    return receiver;
  }

  const sender = getUserID(chat)
  const receiver = getReceiver(chat);

  const formatTime = (utcDate) => {
    let date = new Date(utcDate);
    date.setHours(date.getHours() - 0);
    return date.toTimeString().slice(0, 5);
  };

  const formatDate = (utcDate) => {
    const date = new Date(utcDate);
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getUTCMonth()];
    return `${day} ${month} ${year}`;
  };

  const extractFilePathFromImage = (path) => {
    const url = "https://desafio-backend-production.up.railway.app/users/"; //CHANGE to pertinent URL
    return url + path.replace("uploads/", "");
  }

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!data.message) {
      return null;
    }
    sendMessage(chat._id, sender, data, token);
    socket.emit("chat update", { chatId: chat._id });
    setData({
      message: "",
    });
  };

  const threadDiv = history.map((item, index) => {
    const isNewDay =
      index === 0 ||
      formatDate(history[index - 1].date) !== formatDate(item.date);
    const speakerId = item.speakerId === sender ? "sender" : "receiver";
    return (
      <>
        <React.Fragment key={index}>
          {isNewDay && (
            <div className="dateDisplay">
              <span>{formatDate(item.date)}</span>
            </div>
          )}
          {item.message && (
          <div className="messageLine" id={`${speakerId}`}>
            <div className="messageDiv">
              <p className="textMessage">{item.message}</p>
            </div>
            <div className="timeDiv">
              <span className="textTime">{formatTime(item.date)}</span>
            </div>
          </div>
          )}
        </React.Fragment>
      </>
    );
  });

  const emptyChatDiv = (
    <img src={emptyChat} />
  );

  return (
    <>
      <div className="chatContainer">
        <div className="singleChatHeader">
          <div className="backArrow" onClick={() => navigate("/chatlist")}>
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
          <div className="receiverImage">
            <img src={receiver.img ? extractFilePathFromImage(receiver.img) : noPic} />
          </div>
          <div className="receiverUsername">
            <p>{receiver.username}</p>
            <span className="receiverCargo">{receiver.cargo ? receiver.cargo : "Estudiante"}</span>
          </div>
        </div>
        <div className="chatThread">
          {/* {threadDiv} */}
          {(history.length === 1 && history[0].message === "") ? emptyChatDiv : threadDiv}
        </div>
        <div ref={messagesEndRef} /> 
        <div className="sendMessage">
          <div className="blankSpace"> </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Message"
              value={data.message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              name="message"
            />
            <button disabled className="attachIcon">
              <MdAttachFile />
            </button>
            <button type="submit" className="sendIcon">
              <MdSend />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
