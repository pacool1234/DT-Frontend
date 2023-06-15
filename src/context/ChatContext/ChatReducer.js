const chat = (state, action) => {
  switch (action.type) {
    case "GET_SINGLE_CHAT":
      const sortedHistory = action.payload.history.sort((a, b) =>
        a.date > b.date ? 1 : -1
      );
      return {
        ...state,
        chat: action.payload,
        history: sortedHistory,
      };

    default:
      return state;
  }
};

export default chat;
