const profiles = (state, action) => {
  switch (action.type) {
    case "GET_TAGS":
      return {
        ...state,
        tags: action.payload,
      };

    case "GET_HOBBIES":
      return {
        ...state,
        hobbies: action.payload,
      };

    case "GET_USERTYPES":
      return {
        ...state,
        userTypes: action.payload,
      };

    default:
      return state;
  }
};

export default profiles;
