import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Password.scss";
import { UserContext } from "../../context/UserContext/UserState";
import ALogo from "../../../src/images/A.png";
import PuntoSup from "../../../src/images/puntos_sup.png";
import PointsDown from "../../../src/images/points_down.png";
import Flechaizq from "../../../src/images/flechizq.png";

const Password = () => {
  const { recoverPassword, message, turnOffMessage } = useContext(UserContext);

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });


  const handleButtonClick = () => {
    navigate("/login");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };


  const handleSubmit = async (event) => {

    event.preventDefault();
    if (!data.email) {
      return null;
    }

    try {
      const response = await recoverPassword(data.email);
      if (response.success) {
        // El correo es válido
        setData({
          email: "",
        });
        turnOffMessage();

      }
    } catch (error) {
      console.log(error);

      setData({
        email: "",
      });
      setTimeout(() => {
        turnOffMessage();
      }, 3000);
    }
  };

  return (
    <>
      <div className="main-cont-login">
        <div className="a_logo">
          <img src={ALogo} alt="Logo de A" />
        </div>
        <div className="points_up">
          <img src={PuntoSup} alt="Puntos superiores" />
        </div>
        <p className="forgot_message">¿Has olvidado la contraseña?</p>

        <div className="div_forgotForm">

          <form className="forgot_form" onSubmit={handleSubmit}>
            <label className="email_label_forgot" htmlFor="email">
              Usuario de MdE
            </label>
            <input
              className="email_input_forgot"
              type="email"
              placeholder="username@edem.es"
              value={data.email}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              name="email"
            />

            <button type="submit" className="submitForgot">
              Recuperar contraseña
            </button>

          </form>
        </div>

        <div className="alert_hidden_forgot">
          {message && typeof message === "object" ? <p>{message.message}</p> : null}
        </div>

        <Link to="/login" className="return_to_login_forgot" onClick={handleButtonClick}>
          <img src={Flechaizq} alt="Volver" className="img_fech" />
          <p className="return_text">Volver</p>
        </Link>

        <div className="points_down">
          <img src={PointsDown} alt="Puntos inferiores" />
        </div>
      </div>
    </>
  );
};

export default Password;
