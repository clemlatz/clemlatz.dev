const initialState = {
  experiences: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EXPERIENCES':
      return {
        ...state ,
        experiences: action.experiences,
      };
    default:
      return { ...state };
  }
}

export default reducer;
