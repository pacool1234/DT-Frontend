import axios from "axios";
import { createContext, useReducer } from "react";
import CommentReducer from "./CommentReducer";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
    token: token ? token : null,
    // notice: {},
    comments: [],
};

const API_URL = "https://desafio-backend-production.up.railway.app";


export const CommentContext = createContext(initialState);

export const CommentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CommentReducer, initialState);

    const getComments = async () => {
        try {
            const res = await axios.get(API_URL + '/comments/getAll');
            dispatch({
                type: 'GET_COMMENTS',
                payload: res.data,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const createComment = async (commentData, _id) => {
        const token = JSON.parse(localStorage.getItem('token'))
        try {
            const res = await axios.post(API_URL + "/comments/create/" + _id, commentData, {
                headers: {
                    Authorization: token,
                },
            });
            dispatch({
                type: "CREATE_COMMENT",
                payload: res.data.comment,
            });
            return res.data.comment;
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <CommentContext.Provider
            value={{
                token: state.token,
                // notice: state.notice,
                comments: state.comments,
                getComments,
                createComment
            }}
        >
            {children}
        </CommentContext.Provider>
    );
};
