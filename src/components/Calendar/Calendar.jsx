import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.scss";
import { UserContext } from "../../context/UserContext/UserState";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getUser, user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    getUser().then(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  const formatDate = (date) => {
    const fecha = new Date(date);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const subscribedDates = user.suscriptions.map((event) => {
    return formatDate(event.time);
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const tileClassName = ({ date }) => {
    const formattedDate = formatDate(date);
    return subscribedDates.includes(formattedDate) ? "highlighted-day" : null;
  };

  const currentDate = new Date();

  return (
    <div className="main_calendar">
      <div className="calendar">
        <div className="calendar-container">
          <Calendar
            className="react-calendar"
            onChange={handleDateClick}
            value={selectedDate}
            tileClassName={tileClassName}
          />
        </div>
      </div>

      <div className="background_title_inscriptions">
        <p className="event_title_scroll_inscriptions">Próximos eventos</p>
      </div>
      <div className="scroll_event_inscriptions">
        {user &&
          user.suscriptions &&
          user.suscriptions
            .slice() // Crear una copia del array para no modificar el original
            .sort((a, b) => {
              const timeDiffA =
                new Date(a.time).getTime() - currentDate.getTime();
              const timeDiffB =
                new Date(b.time).getTime() - currentDate.getTime();
              return timeDiffA - timeDiffB;
            })
            .map((suscription) => (
              <div className="card_events_inscriptions" key={suscription._id}>
                <div className="div_tipe_event_hour">
                  <p className="type_event_inscription">Evento</p>
                  <p className="hour_event_inscription">
                    {suscription.time?.slice(11, 16)}h
                  </p>
                </div>
                <div className="div_name_event_day">
                  <p className="name_event_inscription">
                    {suscription.event_name}
                  </p>
                  <p className="date_event_inscription">
                    {new Date(suscription.time)
                      .toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric", // Añadido 'year' para incluir el año
                      })
                      .charAt(0)
                      .toUpperCase() +
                      new Date(suscription.time)
                        .toLocaleDateString("es-ES", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric", // Añadido 'year' para incluir el año
                        })
                        .slice(1)}
                  </p>
                </div>
                <div className="div_where_event_day">
                  <p className="location_event_inscription">
                    {suscription.place}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default CalendarView;
