import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OtherProfile.scss";
import { UserContext } from "../../context/UserContext/UserState";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import noPic from "../../../src/images/no_pic.png";
import noBgPic from "../../../src/images/no_bg_pic.png";

const OtherProfile = () => {
  const { user, getUserById } = useContext(UserContext);
  const [activeComponent, setActiveComponent] = useState("OtherProfile");
  const { _id } = useParams();
  const navigate = useNavigate();

  const API_URL = "https://desafio-backend-production.up.railway.app";

  useEffect(() => {
    getUserById(_id);
    setTimeout(() => {
      setActiveComponent("OtherProfile");
    }, 100);
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        <div className="profileContainer">
          <div className="imageContainer"></div>
          <div className="profileInfoContainer"></div>
        </div>
        <Footer
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
      </>
    );
  }

  const handleGoToChat = async () => {
    // Fetch _id of user using the app
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get(API_URL + "/users/getUser", {
      headers: {
        Authorization: token,
      },
    });
    // Check if said user is present in contact's chats
    for (const _chat of user.chat) {
      if (_chat.users.includes(res.data._id)) {
        // console.log("Chat between users already exists. Redirecting to");
        navigate(`/chat/${_chat._id}`);
        return null;
      }
    }

    const chatCreated = await axios.post(
      API_URL + "/chats/create",
      {
        users: [res.data._id, user._id],
        history: [
          {
            speakerId: res.data._id,
            message: "",
          },
        ],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setTimeout(() => {
      navigate(`/chat/${chatCreated.data.chat._id}`);
    }, 1000);
  };

  const extractFilePathFromImage = (path) => {
    const url = "https://desafio-backend-production.up.railway.app/users/";
    return url + path.replace("uploads/", "");
  };

  const interestsDiv = user.interest.map((item) => {
    return <p className="item">{item.name}</p>;
  });

  const hobbiesDiv = user.hobbies.map((item) => {
    return <p className="item">{item.name}</p>;
  });

  return (
    <>
      <Header />
      <div className="profileContainer">
        <div className="imageContainer">
          <img
            className="backgroundImage"
            src={
              user.backgroundImg
                ? extractFilePathFromImage(user.backgroundImg)
                : noBgPic
            }
          />
          <div className="profileImageContainer">
            <img
              className="profileImage"
              src={user.img ? extractFilePathFromImage(user.img) : noPic}
            />
          </div>
        </div>
        <div className="profileInfoContainer">
          <p className="profileUsername">{user.username}</p>
          <p className="profileUsertype">
            {user.userType.name.replace("Usuario ", "")}
          </p>
          <p className="profileDegree">{user.degree.name}</p>
          <p className="profilePosition">{user.cargo || "Estudiante"}</p>
          <p className="profileBio">{user.bio}</p>
          <button className="goToChat" onClick={handleGoToChat}>
            Chat
          </button>
          <p className="profileTitle">Intereses</p>
          <div className="interestsContainer">{interestsDiv}</div>
          <p className="profileTitle">Hobbies</p>
          <div className="hobbiesContainer">{hobbiesDiv}</div>
        </div>
      </div>
      <Footer
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
    </>
  );
};

export default OtherProfile;
