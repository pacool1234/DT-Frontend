const CommentReducer = (state, action) => {
    switch (action.type) {
      case 'GET_COMMENTS':
        return {
          ...state,
          comments: action.payload,
        };
      case 'CREATE_COMMENT':
        console.log('reducer')
        console.log(action.payload)
        return {
          ...state,
          comments: [...state.comments, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default CommentReducer;
  