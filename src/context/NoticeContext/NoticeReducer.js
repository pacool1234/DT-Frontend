const notices = (state, action) => {
    switch (action.type) {

        case "GET_NOTICES":
            return {
                ...state,
                notices: action.payload,
            };

        case "GET_NOTICE_ID":
            return {
                ...state,
                notice: action.payload,
            };

        case "LIKE_NOTICE":
            return {
                ...state,
                notices: state.notices.map((notice) =>
                    notice._id === action.payload
                        ? { ...notice, liked: true }
                        : notice
                ),
            };
        case "UNLIKE_NOTICE":
            return {
                ...state,
                notices: state.notices.map((notice) =>
                    notice._id === action.payload
                        ? { ...notice, liked: false }
                        : notice
                ),
            };

        default:
            return state;
    }
};

export default notices;