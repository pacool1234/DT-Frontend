import axios from "axios";
import { createContext, useReducer } from "react";
import NoticeReducer from "./NoticeReducer";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
    token: token ? token : null,
    notice: {},
    notices: [],
};

const API_URL = "https://desafio-backend-production.up.railway.app";


export const NoticeContext = createContext(initialState);

export const NoticeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(NoticeReducer, initialState);

    const getNotices = async () => {
        try {
            const res = await axios.get(API_URL + '/notices/getAllNotices');
            dispatch({
                type: 'GET_NOTICES',
                payload: res.data,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getNoticeId = async (id) => {
        try {
            const res = await axios.get(API_URL + '/notices/getNoticeById/' + id);
            console.log("respuesta del servidor por axios", res);
            dispatch({
                type: 'GET_NOTICE_ID',
                payload: res.data,
            });
        } catch (error) {
            console.error(error);
        }
    };


    const likeNotice = async (noticeId) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            await axios.put(API_URL + `/users/likesnotices/${noticeId}`, null, {
                headers: {
                    Authorization: token
                }
            });
            // Actualizar el estado después de dar like
            dispatch({
                type: "LIKE_NOTICE",
                payload: noticeId,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const unlikeNotice = async (noticeId) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            await axios.put(API_URL + `/users/unlikenotices/${noticeId}`, null, {
                headers: {
                    Authorization: token
                }
            });
            // Actualizar el estado después de quitar el like
            dispatch({
                type: "UNLIKE_NOTICE",
                payload: noticeId,
            });
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <NoticeContext.Provider
            value={{
                token: state.token,
                notice: state.notice,
                notices: state.notices,
                getNotices,
                getNoticeId,
                likeNotice,
                unlikeNotice
            }}
        >
            {children}
        </NoticeContext.Provider>
    );
};
