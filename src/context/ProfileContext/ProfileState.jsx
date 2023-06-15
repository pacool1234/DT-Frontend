import axios from "axios";
import { createContext, useReducer } from "react";
import ProfileReducer from "./ProfileReducer";

const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  token: token ? token : null,
  user: user ? user : null,
  tags: [],
  hobbies: [],
  userTypes: [],
  positions: ["Estudiante", "Profesor", "Staff", "Mentor", "Startup", "Angels"],
};

const API_URL = "https://desafio-backend-production.up.railway.app";
// const API_URL = "http://localhost:8080";

export const ProfileContext = createContext(initialState);

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  const getTags = async () => {
    try {
      const res = await axios.get(API_URL + "/tags/getall");
      dispatch({
        type: "GET_TAGS",
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  const getHobbies = async () => {
    try {
      const res = await axios.get(API_URL + "/hobbies/getall");
      dispatch({
        type: "GET_HOBBIES",
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  const getUserTypes = async () => {
    try {
      const res = await axios.get(API_URL + "/usertypes/get");
      dispatch({
        type: "GET_USERTYPES",
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        token: state.token,
        user: state.user,
        tags: state.tags,
        hobbies: state.hobbies,
        userTypes: state.userTypes,
        positions: state.positions,
        getTags,
        getHobbies,
        getUserTypes,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};


