import React, { createContext, useReducer } from "react";
import ChatReducer from "./ChatReducer";
import axios from "axios";

const API_URL = "https://desafio-backend-production.up.railway.app";
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  chat: null,
  history: [],
  token: token ? token : null,
};

export const ChatContext = createContext(initialState);

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const getSingleChat = async (chatId) => {
    try {
      const res = await axios.get(API_URL + "/chats/getone/" + chatId, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: "GET_SINGLE_CHAT",
        payload: res.data,
      });
    } catch (error) {
      console.error(error);      
    }
  };

  const sendMessage = async (chatId, speakerId, message, token) => {
    try {
      const url = API_URL + "/chats/update/" + chatId;
      const body = {
        speakerId: speakerId,
        message: message.message, // HTML gives an object: {message: ...}
      };
      const config = {
        headers: {
          Authorization: token
        }
      };

      const res = await axios.put(url, body, config);
      // const res = await axios.put(url, body); // uncomment to enable authentication
      await getSingleChat(chatId);
      // dispatch({
      //   type: "SEND_MESSAGE",
      //   payload: res.data,
      // });
    } catch (error) {
      console.error(error);      
    }
  };


  return (
    <ChatContext.Provider
      value={{
        chat: state.chat,
        history: state.history,
        token: state.token,
        getSingleChat,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
