import React, { useState, useContext, useEffect } from 'react';
import './NavigationEvents.scss';
import { EventContext } from '../../context/EventContext/EventState';
import { Link } from 'react-router-dom';

const NavigationEvents = () => {
  const { events, getEvents } = useContext(EventContext);
  const [sortedEvents, setSortedEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    // Ordenar los eventos por fecha
    const sorted = [...events].sort((a, b) => new Date(a.time) - new Date(b.time));
    setSortedEvents(sorted);
  }, [events]);

  return (
    <div className="main_container_navigation_events">
      <div className="eventRecomendFixed"></div>
      <div className="eventSideText">
        <p className="sideText">Recomendados para ti</p>
      </div>
      <div className="eventSideScroll">
        <div className="eventSideArray">
          <div className='eventside1'>
            <div className='sideUpContainer'>
              <div className='iconarrow'>
                <img src="./src/images/IconArrow_Events.png" alt="Flecha" />
              </div>
            </div>
            <div className='sideDownContainer'>
              <div className='downLeft'>
                <p className='leftEventType'>Charla</p>
                <p className='leftEventTitle'>Juan Roig</p>
                <p className='leftEventTime'>17:00</p>
                <p className='leftEventDate'>Martes 6 de Junio</p>
              </div>
              <div className='downRight'>
                <div className='rightButtonTag1'>
                  <p className='tagText1'>Emprendimiento</p>
                </div>
                <div className='rightButtonTag2'>
                  <p className='tagText2'>Marketing</p>
                </div>
              </div>
            </div>
          </div>
          <div className='eventside1'>
            <div className='sideUpContainer'>
              <div className='iconarrow'>
                <img src="./src/images/IconArrow_Events.png" alt="Flecha" />
              </div>
            </div>
            <div className='sideDownContainer'>
              <div className='downLeft'>
                <p className='leftEventType'>Charla</p>
                <p className='leftEventTitle'>Juan Roig</p>
                <p className='leftEventTime'>17:00</p>
                <p className='leftEventDate'>Martes 6 de Junio</p>
              </div>
              <div className='downRight'>
                <div className='rightButtonTag1'>
                  <p className='tagText1'>Emprendimiento</p>
                </div>
                <div className='rightButtonTag2'>
                  <p className='tagText2'>Marketing</p>
                </div>
              </div>
            </div>
          </div>
          <div className='eventside1'>
            <div className='sideUpContainer'>
              <div className='iconarrow'>
                <img src="./src/images/IconArrow_Events.png" alt="Flecha" />
              </div>
            </div>
            <div className='sideDownContainer'>
              <div className='downLeft'>
                <p className='leftEventType'>Charla</p>
                <p className='leftEventTitle'>Juan Roig</p>
                <p className='leftEventTime'>17:00</p>
                <p className='leftEventDate'>Martes 6 de Junio</p>
              </div>
              <div className='downRight'>
                <div className='rightButtonTag1'>
                  <p className='tagText1'>Emprendimiento</p>
                </div>
                <div className='rightButtonTag2'>
                  <p className='tagText2'>Marketing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="eventDownText">
        <p className="downText">No te pierdas nada</p>
      </div>
      <div className="eventList_Down">
        {sortedEvents.map((event) => (
          <div className="eventBig1" key={event._id}>
            <div className="bigUpContainer">
              <div className="img_event_box">
                <img src={`https://desafio-backend-production.up.railway.app/events/${event.img}`} alt={event.event_name} className="img_events_top" />
              </div>
              <div className="iconarrowblue">
                <Link to={`/getEventById/${event._id}`}>
                  <img src="./src/images/IconArrow_Ev_BLUE.png" alt="Flecha" />
                </Link>
              </div>
              <div className="bigDownContainer">
                <div className="bDownLeft">
                  <p className="bLeftEventType">Evento</p>
                  <p className={`bLeftEventTitle ${event.event_name.length > 30 ? 'two-lines' : ''}`}>{event.event_name}</p>
                  <div className="time_main_container_events">
                    <p className="bLeftEventTime">{event.time?.slice(11, 16)}</p>
                    <p className="bLeftEventDate">
                      {event.time ? new Date(event.time).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).charAt(0).toUpperCase() + new Date(event.time).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).slice(1) : ''}
                    </p>
                  </div>
                </div>
                <div className="bDownRight">
                  {event.eventTags.map((tag, index) => (
                    <div className={`bRightButtonTag${index + 1}`} key={`${event._id}-${index}`}>
                      <p className={`bTagText${index + 1}`}>{tag.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationEvents;
