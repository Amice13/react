import { createSlice } from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
  name: 'page',
  initialState: {
    username: 'Home',
    userImage: ''
  },
  reducers: {
    setName: ({ username }, value) => {
      username = value
    },
    setUserImage: ({ userImage }, value) => {
      userImage = value
    }
  }
})

// Action creators are generated for each case reducer function
export const { setName, setUserImage } = layoutSlice.actions

export default layoutSlice.reducer
