const users = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        message: action.payload.message,
        user: action.payload.user,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        message: action.payload,
      };

    case "GET_USER_INFO":
      return {
        ...state,
        user: action.payload,
        message: "",
      };

    case "GET_ALL_USERS":
      return {
        ...state,
        users: action.payload,
        filteredUsers: action.payload,
        message: "",
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        _grecaptcha: null,
        message: "",
      };

    case "LOGOUT_ERROR":
      return {
        ...state,
        message: action.payload,
      };

    case "GET_CHATS_FROM_USER":
      const sortedChats = action.payload.sort((a, b) =>
        a.updatedAt < b.updatedAt ? 1 : -1
      );
      return {
        ...state,
        chats: sortedChats,
      };
    case "TURN_OFF_MESSAGE":
      return {
        ...state,
        message: null,
      };
    case "RECOVER_PASSWORD_SUCCESS":
      return {
        ...state,
        message: action.payload,
      };

    case "RECOVER_PASSWORD_ERROR":
      return {
        ...state,
        message: action.payload,
      };

    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        message: action.payload,
      };

    case "RESET_PASSWORD_ERROR":
      return {
        ...state,
        message: action.payload,
      };

    case "MAKE_CONTACT_FAVOURITE":
      return {
        ...state,
        user: action.payload,
      };

    case "FILTER_BY_USERNAME":
      const pattern = action.payload;
      state.filteredUsers = state.users;
      const filteredUsersByUsername = state.filteredUsers.filter((item) =>
        item.username.toLowerCase().includes(pattern.toLowerCase())
      );
      return {
        ...state,
        filteredUsers: filteredUsersByUsername,
      };

    case "FILTER_BY_CONTACT":
      state.filteredUsers = state.users;
      const userContactList = state.user.contacts.map((x) => x._id);

      if (action.payload) {
        const filteredOnlyContacts = state.filteredUsers.filter((item) => {
          const isContact = userContactList.includes(item._id);
          if (isContact) {
            return item;
          }
        });
        return {
          ...state,
          filteredUsers: filteredOnlyContacts,
        };
      } else {
        return {
          ...state,
        };
      }

    default:
      return state;
  }
};

export default users;
