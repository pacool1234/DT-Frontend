import React, { useState, useContext, useEffect } from 'react'
import "./RecoverPass.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserState";
import ALogo from "../../../src/images/A.png";
import PuntoSup from "../../../src/images/puntos_sup.png";
import PointsDown from "../../../src/images/points_down.png";
import Flechaizq from "../../../src/images/flechizq.png";

const RecoverPass = () => {
    const { recoverToken } = useParams();
    const { resetPassword, message, turnOffMessage } = useContext(UserContext);

    const navigate = useNavigate();
    const [data, setData] = useState({
        password: "",
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
        if (!data.password) {
            return null;
        }

        try {
            const response = await resetPassword(data.password, recoverToken);
            if (response.success) {
                // La contraseña es válida
                setData({
                    password: "",
                });
                turnOffMessage();

            }
        } catch (error) {
            console.log(error);

            setData({
                password: "",
            });
            setTimeout(() => {
                turnOffMessage();
            }, 3000);
        }
    };



    return (

        <div className="main-cont-recov">
            <div className="a_logo">
                <img src={ALogo} alt="Logo de A" />
            </div>
            <div className="points_up">
                <img src={PuntoSup} alt="Puntos superiores" />
            </div>
            <p className="recov_message">Reestablece tu contraseña</p>

            <div className="div_recovForm">

                <form className="recov_form" onSubmit={handleSubmit}>
                    <label className="pass_label_recov" htmlFor="password">
                        Nueva contraseña
                    </label>
                    <input
                        className="password_input_recov"
                        type="password"
                        placeholder="•••••••"
                        value={data.password}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        name="password"
                    />

                    <button type="submit" className="submitRecov">
                        Cambiar contraseña
                    </button>

                </form>
            </div>

            <div className="alert_hidden_recov">
                {message && typeof message === "object" ? <p>{message.message}</p> : null}
            </div>

            <Link to="/login" className="return_to_login_recov" onClick={handleButtonClick}>
                <img src={Flechaizq} alt="Volver" className="img_fech" />
                <p className="return_text">Volver</p>
            </Link>

            <div className="points_down">
                <img src={PointsDown} alt="Puntos inferiores" />
            </div>
        </div>

    );
}

export default RecoverPass