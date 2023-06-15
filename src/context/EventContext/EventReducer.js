const events = (state, action) => {
    switch (action.type) {

        case "GET_EVENTS":
            return {
                ...state,
                events: action.payload,
            };

        case "GET_EVENT_ID":
            return {
                ...state,
                event: action.payload,
            };

        case "LIKE_EVENT":
            return {
                ...state,
                events: state.events.map((event) =>
                    event._id === action.payload
                        ? { ...event, liked: true }
                        : event
                ),
            };
        // case "UNLIKE_EVENT":
        //     return {
        //         ...state,
        //         events: state.events.map((event) =>
        //             event._id === action.payload
        //                 ? { ...event, liked: false }
        //                 : event
        //         ),
        //     };

        default:
            return state;
    }
};

export default events;