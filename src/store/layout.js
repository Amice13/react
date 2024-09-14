import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  client: 'All accounts',
  clientId: null,
  usersId: undefined,
  email: undefined,
  username: '',
  userImage: ''
}

const reducers = {
  setClient: (state, { payload }) => {
    if (!payload) {
      state.client = 'All accounts'
      state.clientId = -1
      return false
    }
    state.client = payload.name
    state.clientId = payload.id
  },
  setUsersId: (state, { payload }) => {
    state.usersId = payload
  },
  setUser: (state, { payload }) => {
    if (payload.name) state.username = payload.name
    if (payload.picture) state.userImage = payload.picture
    if (payload.email) state.email = payload.email
    if (typeof payload.sub === 'number') state.usersId = payload.sub
  }
}

export const slice = createSlice({
  name: 'layout',
  initialState,
  reducers
})

// Action creators are generated for each case reducer function
export const { setClient, setUsersId, setUser } = slice.actions

export default slice.reducer
