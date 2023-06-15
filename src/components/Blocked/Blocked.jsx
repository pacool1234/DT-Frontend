import React, { useState, useEffect } from "react";
import "./Blocked.scss";
import { Link, useNavigate } from "react-router-dom";
import ALogo from "../../../src/images/A.png";
import PuntoSup from "../../../src/images/puntos_sup.png";

const Blocked = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
       setTimeout(() => {
      setButtonDisabled(false);
    }, 60000);
  }, []);

  const handleButtonClick = () => {
    navigate("/login");
  };

  return (
    <div className="main-cont-blocked">
      <div className="a_logo">
        <img src={ALogo} alt="Logo de A" />
      </div>
      <div className="points_up">
        <img src={PuntoSup} alt="Puntos superiores" />
      </div>
      <div className="all_text_blocked">
        <div className="div_text_blocked">
          <p>Lo sentimos, tu cuenta ha sido bloqueada temporalmente.</p>
        </div>
        <div className="div_text_blocked2">
          <p>
            Debido a los multiples intentos de inicio de sesión hemos bloqueado
            tu cuenta por motivos de seguridad.
          </p>
        </div>
        <div className="div_text_blocked2">
          <p>Espera unos minutos y vuelve a intentarlo más tarde.</p>
        </div>
      </div>

      <button
        type="submit"
        className="return_to_login"
        disabled={buttonDisabled} 
        onClick={handleButtonClick}
      >
        Iniciar sesión
      </button>

      <div className="points_down">
        <img src={PuntoSup} alt="Puntos inferiores" />
      </div>
    </div>
  );
};

export default Blocked;