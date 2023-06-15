import React from "react";
import "./Welcome.scss";
import { useNavigate } from "react-router-dom";
import WelcomeHands from "../../../src/images/welcome_hands.png";
import RiskyPeople from "../../../src/images/risky_people.png";
import LogoAgora from "../../../src/images/logo_agora.png";

const Welcome = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <div className="main-container-welcome">
        <div className="logo-risky-people">
          <img src={RiskyPeople} className="logo-risky-people_img" />
        </div>
        <div className="logoDiv_welcome">
          <img src={WelcomeHands} className="welcome_hands" />
        </div>
        <div className="appTitle_welcome">
          <img src={LogoAgora} className="appTitle_welcome_img" />
        </div>
        <div className="introText_welcome">
          <p className="p_introtext_welcome">
            {" "}
            Únete a la comunidad de <strong>MdE</strong> para informarte de las
            últimas noticias y conectar con alumnos de EDEM, startups de
            Lanzadera y Angels
          </p>
        </div>
        <div className="startButton_welcome" onClick={handleSubmit}>
          <button className="button_welcome">Empezar</button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
