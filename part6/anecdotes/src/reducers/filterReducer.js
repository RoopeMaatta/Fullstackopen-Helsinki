import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange( state, action ) {
      return action.payload
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer



// // Alla vanha //
// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//   case 'FILTER_INPUT':
//     return action.payload
//   default:
//     return state
//   }
// }


// export const filterChange = filter => {
//   return {
//     type: 'FILTER_INPUT',
//     payload: filter,
//   }
// }

// export default filterReducer