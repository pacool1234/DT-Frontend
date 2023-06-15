import axios from "axios";
import { createContext, useReducer } from "react";
import EventReducer from "./EventReducer";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
    token: token ? token : null,
    event: {},
    events: [],
};

const API_URL = "https://desafio-backend-production.up.railway.app";


export const EventContext = createContext(initialState);

export const EventProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EventReducer, initialState);

    const getEvents = async () => {
        try {
            const res = await axios.get(API_URL + '/events/getAll');
            dispatch({
                type: 'GET_EVENTS',
                payload: res.data,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getEventId = async (id) => {
        try {
            const res = await axios.get(API_URL + '/events/getEventById/' + id);
            dispatch({
                type: 'GET_EVENT_ID',
                payload: res.data,
            });
        } catch (error) {
            console.error(error);
        }
    };


    const likeEvent = async (eventId) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            await axios.put(API_URL + `/users/suscription/${eventId}`, null, {
                headers: {
                    Authorization: token
                }
            });
            // Actualizar el estado después de dar like
            dispatch({
                type: "LIKE_EVENT",
                payload: eventId,
            });
        } catch (error) {
            console.error(error);
        }
    };

    // const unlikeNotice = async (noticeId) => {
    //     try {
    //         const token = JSON.parse(localStorage.getItem("token"));
    //         await axios.put(API_URL + `/users/unlikenotices/${noticeId}`, null, {
    //             headers: {
    //                 Authorization: token
    //             }
    //         });
    //         // Actualizar el estado después de quitar el like
    //         dispatch({
    //             type: "UNLIKE_NOTICE",
    //             payload: noticeId,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };



    return (
        <EventContext.Provider
            value={{
                token: state.token,
                event: state.event,
                events: state.events,
                getEvents,
                getEventId,
                likeEvent,
                // unlikeNotice
            }}
        >
            {children}
        </EventContext.Provider>
    );
};
