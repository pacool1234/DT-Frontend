import React, { useContext, useEffect, useState } from 'react';
import './EventSingle.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ButtonShare from '../../images/share_notices_button.png';
import PointsImg from '../../images/points_horWhite.png';
import { useNavigate, useParams } from 'react-router-dom';
import { EventContext } from '../../context/EventContext/EventState';
import BackButton from '../../images/icon_return_back.png';

const EventSingle = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { getEventId, event, likeEvent, token } = useContext(EventContext);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await getEventId(_id);
      setLoading(false); // Set loading to false when data has been loaded
    }
    fetchData();
  }, []);

  const handleButtonClick = () => {
    navigate('/events');
  };

  const handleButtoninscription = async (eventId) => {
    if (!liked) {
      await likeEvent(eventId);
      setLiked(true); // Actualizar el estado de liked a true después de la inscripción
      setTimeout(() => {
        navigate('/maincalendar'); // Navegar a /maincalendar después de 2 segundos
      }, 2000);
    }
  };

  const renderImage = () => {
    if (!event || !event.img) {
      return null; // Si no hay evento o no hay imagen, no se muestra nada
    }

    try {
      return (
        <img
          src={`https://desafio-backend-production.up.railway.app/events/${event.img}`}
          alt={event.event_name}
          className='img_events_top'
        />
      );
    } catch (error) {
      // Manejar el error
      console.error(error);
      return null; // Otra opción es mostrar una imagen de error o un mensaje alternativo
    }
  };


  return (
    <>
      <Header />

      <div className='singleEventMain'>
        <div className='return_to_events_button' onClick={handleButtonClick}>
          <img src={BackButton} className='userimgcomm' alt='user_img_comment' />
        </div>
        <div className='eventPic'>{renderImage()}</div>

        <div className='eventPicFooter'>
          <p className='picFooterText'>{event.place}</p>
          <div className='picFooterIcon'>
            <img src={ButtonShare} alt='Compartir' />
          </div>
        </div>

        <div className='dotsOverlay'>
          <img src={PointsImg} alt='Puntos' />
        </div>

        <div className='eventBodyMain'>
          <div className='bodyHeaderMain'>
            <div className='head_event_single_desing'>
              <div className='headerMainLeft'>
                <p className='eventType'>Evento</p>
                <p className='eventTitle'>{event.event_name}</p>
              </div>

              <div className={`mainButton ${liked ? 'liked_notices' : ''}`} onClick={() => handleButtoninscription(event._id)}>
                <p className='mainButtonText'>{liked ? 'Inscrito' : 'Asistiré'}</p>
              </div>
            </div>
            <div className='bodyContentMain'>{event.description}</div>
          </div>
          <div className='bodyFooterUp'>
            <p className='footerUpTime'>{event.time?.slice(11, 16)}h</p>
            <p className='footerUpAsistentes'>
              <strong>43</strong> asistentes
            </p>
          </div>
          <div className='bodyFooterDown'>
            <p className='footerDownDate'>
              {event.time ? (
                new Date(event.time).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric' // Agregar 'year' para incluir el año en la fecha
                }).charAt(0).toUpperCase() +
                new Date(event.time).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric' // Agregar 'year' para incluir el año en la fecha
                }).slice(1)
              ) : (
                ''
              )}
            </p>
            <p className='footerDownInscritos'><strong>112</strong> inscritos online</p>
          </div>


        </div>
      </div>


      <Footer />

    </>
  )
}

export default EventSingle