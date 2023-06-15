import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.scss";
import { UserContext } from "../../context/UserContext/UserState";
import { ProfileContext } from "../../context/ProfileContext/ProfileState";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import noPic from "../../../src/images/no_pic.png";
import noBgPic from "../../../src/images/no_bg_pic.png";
import progressBar from "../../../src/images/medallas.png";

const Profile = () => {
  const { user, getUser, update } = useContext(UserContext);
  const { tags, hobbies, getTags, getHobbies, getUserTypes } =
    useContext(ProfileContext);
  const navigate = useNavigate();

  const [selectedInterestButtons, setSelectedInterestButtons] = useState({});
  const [selectedHobbyButtons, setSelectedHobbyButtons] = useState({});
  const [bioText, setBioText] = useState("");

  useEffect(() => {
    getUser();
    getTags();
    getHobbies();
    getUserTypes();
  }, []);

  useEffect(() => {
    if (user) {
      // Interests
      const alreadyLikedInterests = user.interest.map((item) => item.name);
      const initialSelectedInterests = {};
      tags.forEach((item) => {
        if (alreadyLikedInterests.includes(item.name)) {
          initialSelectedInterests[item._id] = {
            name: item.name,
            toggled: true,
          };
        }
      });
      setSelectedInterestButtons(initialSelectedInterests);

      // Hobbies
      const alreadyLikedHobbies = user.hobbies.map((item) => item.name);
      const initialSelectedHobbies = {};
      hobbies.forEach((item) => {
        if (alreadyLikedHobbies.includes(item.name)) {
          initialSelectedHobbies[item._id] = {
            name: item.name,
            toggled: true,
          };
        }
      });
      setSelectedHobbyButtons(initialSelectedHobbies);

      // Bio
      setBioText(user.bio);
    }
  }, [user]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!user) {
    return (
      <>
        <Header />
        <div className="profileContainer">
          <div className="imageContainer"></div>
          <div className="profileInfoContainer"></div>
        </div>
        <Footer />
      </>
    );
  }

  const handleInterestButtonClick = (id, name, isToggled) => {
    setSelectedInterestButtons((prevState) => {
      if (isToggled) {
        return { ...prevState, [id]: { name: name, toggled: isToggled } };
      } else {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      }
    });
  };

  const handleHobbyButtonClick = (id, name, isToggled) => {
    setSelectedHobbyButtons((prevState) => {
      if (isToggled) {
        return { ...prevState, [id]: { name: name, toggled: isToggled } };
      } else {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedFormData = {
      interest: Object.keys(selectedInterestButtons),
      hobbies: Object.keys(selectedHobbyButtons),
      bio: bioText
    };
    update(user._id, formattedFormData);
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };


  const extractFilePathFromImage = (path) => {
    const url = "https://desafio-backend-production.up.railway.app/";
    return url + path.replace("uploads/", "");
  };

  const allInterestsDiv = tags.map((item) => {
    const isToggled = !!selectedInterestButtons[item._id]?.toggled;
    return (
      <div
        className="item"
        key={item._id}
        onClick={() =>
          handleInterestButtonClick(item._id, item.name, !isToggled)
        }
        style={{ backgroundColor: isToggled ? "lightblue" : "white" }}
      >
        {item.name}
      </div>
    );
  });

  const allHobbiesDiv = hobbies.map((item) => {
    const isToggled = !!selectedHobbyButtons[item._id]?.toggled;
    return (
      <div
        className="item"
        key={item._id}
        onClick={() => handleHobbyButtonClick(item._id, item.name, !isToggled)}
        style={{ backgroundColor: isToggled ? "lightblue" : "white" }}
      >
        {item.name}
      </div>
    );
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
        <div className="gamingContainer">
          <p className="totalPoints">150 puntos</p>
          <p className="howTo">¿Cómo ganar puntos?</p>
          <div className="progressBar">
            <img src={progressBar} />
          </div>
        </div>
        <button onClick={handleSubmit}>PRESS</button>
        <div className="profileInfoContainer">
          <p className="profileUsername">{user.username}</p>
          <p className="profileUsertype">
            {user.userType.name.replace("Usuario ", "")}
          </p>
          <p className="profileDegree">{user.degree.name}</p>
          <p className="profilePosition">{user.cargo || "Estudiante"}</p>

          <form>
            <textarea
              name="bio"
              className="bioInputArea"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
            >
            </textarea>
          </form>

          <p className="profileTitle">Intereses</p>
          <div className="interestsContainer">{allInterestsDiv}</div>
          <p className="profileTitle">Hobbies</p>
          <div className="hobbiesContainer">{allHobbiesDiv}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
