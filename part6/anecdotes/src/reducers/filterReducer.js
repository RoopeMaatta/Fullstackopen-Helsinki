const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'FILTER_INPUT':
    return action.payload
  default:
    return state
  }
}


export const filterChange = filter => {
  return {
    type: 'FILTER_INPUT',
    payload: filter,
  }
}

export default filterReducer