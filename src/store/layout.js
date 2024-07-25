import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account: 'All accounts',
  username: 'Home',
  userImage: ''
}

const reducers = {
  setAccount: (state, { payload }) => { state.account = payload },
  setName: ({ username }, value) => { username = value },
  setUserImage: ({ userImage }, value) => { userImage = value }  
}

export const slice = createSlice({
  name: 'layout',
  initialState,
  reducers
})

// Action creators are generated for each case reducer function
export const { setName, setUserImage, setAccount } = slice.actions

export default slice.reducer
