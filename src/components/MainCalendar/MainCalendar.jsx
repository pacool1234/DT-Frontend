import React, { useEffect, useContext, useState } from "react";
import "./MainCalendar.scss";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Calendar from '../Calendar/Calendar';
import CalendarImgActive from "../../../src/images/calendar_active_button.png";
import PointsWhite from "../../../src/images/points_vertWhite.png";

const MainCalendar = () => {
    const navigate = useNavigate();
    const [activeComponent, setActiveComponent] = useState("MainCalendar");

    useEffect(() => {
      setTimeout(() => {
        setActiveComponent("MainCalendar");
      }, 100);
    }, []);

    const handleCalendarClick = () => {
        navigate("/events");
    };



    return (
        <>
            <Header />
            <div className='main_calendar_container'>

                <div className="top_background_calendar">
                    <div className='calendar_top_header'>
                        <p className="my_events_title">Mis Eventos</p>
                        <div className="tipImgContainer_calendar">
                            <div className="go_back_to_events_calendar" onClick={handleCalendarClick}>
                                <img src={CalendarImgActive} alt="Calendario" className="img_calendar_active" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="div_img_points">
                    <img src={PointsWhite} alt="Points" className="img_points_white" />
                </div>

            </div>
            <div className='events_component_container'>
                <Calendar />
            </div>
            <Footer activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        </>
    )
}

export default MainCalendar