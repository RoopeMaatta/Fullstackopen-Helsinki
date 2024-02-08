const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return incrementState(state, 'good');
    case 'OK':
      return incrementState(state, 'ok');
    case 'BAD':
      return incrementState(state, 'bad');
    case 'ZERO':
      return initialState;
    default:
      return state;
  }
};

const incrementState = (state, key) => {
  return {
    ...state,
    [key]: state[key] + 1
  };
};

export default counterReducer
