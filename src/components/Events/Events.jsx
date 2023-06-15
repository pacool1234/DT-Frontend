import React, { useEffect, useContext, useState } from "react";
import "./Events.scss";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavigationEvents from '../NavigationEvents/NavigationEvents';
import CalendarImg from "../../../src/images/calendar_icon.png";
import PointsWhite from "../../../src/images/points_vertWhite.png";

const Events = () => {
    const navigate = useNavigate();
    const [activeComponent, setActiveComponent] = useState("Events");

    const handleCalendarClick = () => {
        navigate("/maincalendar");
    };
   

    useEffect(() => {
      setTimeout(() => {
        setActiveComponent('Events');
      }, 100);
    }, []);

    return (
        <>
            <Header />
            <div className='main_eventsContainer'>
                <div className='events_top_header'>

                    <p className="events_title">Eventos</p>
                    <div className="tipImgContainer">
                        <div className='toolTipFather'>
                            <div className='tooltipTextContainer'>
                                <p className='tooltipText'>Mis eventos</p>
                            </div>
                            <div className='tooltipArrow'>

                            </div>
                        </div>
                        <Link to="/maincalendar" className="go_to_calendar" onClick={handleCalendarClick}>
                            <img src={CalendarImg} alt="Calendario" className="img_calendar" />
                        </Link>
                    </div>

                    <div className="div_img_points">
                        <img src={PointsWhite} alt="Points" className="img_points_white" />
                    </div>
                </div>


                <div className='events_component_container'>
                    <NavigationEvents />
                </div>
            </div>
            <Footer activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        </>
    )
}

export default Events