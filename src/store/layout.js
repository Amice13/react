import { createSlice } from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
  name: 'page',
  initialState: {
    name: 'Home'
  },
  reducers: {
    change: ({ name }, value) => {
      name = value
    },
  }
})

// Action creators are generated for each case reducer function
export const { change } = layoutSlice.actions

export default layoutSlice.reducer
