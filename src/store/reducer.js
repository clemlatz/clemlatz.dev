const initialState = {
  experiences: null,
}

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD_EXPERIENCES') {
    return {
      experiences: action.experiences,
    }
  }
  return state;
}

export default reducer;
