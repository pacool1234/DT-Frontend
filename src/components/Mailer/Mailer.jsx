import React from "react";
import "./Mailer.scss";
import { Link, useNavigate } from "react-router-dom";
import ALogo from "../../../src/images/A.png";
import PuntoSup from "../../../src/images/puntos_sup.png";
import PointsDown from "../../../src/images/points_down.png";
import Flechaizq from "../../../src/images/flechizq.png";

const Mailer = () => {
    const navigate = useNavigate();


    const handleButtonClick = () => {
        navigate("/login");
    };

    return (
        <div className="main-cont-mailer">
            <div className="a_logo">
                <img src={ALogo} alt="Logo de A" />
            </div>
            <div className="points_up">
                <img src={PuntoSup} alt="Puntos superiores" />
            </div>
            <div className="all_text_mailer">
                <div className="div_text_mailer">
                    <p>Revisa la bandeja de tu correo corporativo.
                    </p>
                </div>
                <div className="div_text_mailer1">
                    <p>
                        Te hemos enviado un email para verificar la cuenta.
                    </p>
                </div>

            </div>

            <Link to="/login" className="return_to_login_mailer" onClick={handleButtonClick}>
                <img src={Flechaizq} alt="Volver" className="img_fech" />
                <p className="return_text">Volver</p>
            </Link>

            <div className="points_down">
                <img src={PointsDown} alt="Puntos inferiores" />
            </div>
        </div>
    )
}

export default Mailer