import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    status: 'Open',
    playbook: ''
  },
  search: ''
}

const reducers = {
  setFilter: (state, { payload: { filter, value }}) => { state.filters[filter] = value },
  setSearch: (state, { payload }) => { state.search = payload }
}

export const slice = createSlice({
  name: 'escalations',
  initialState,
  reducers
})

// Action creators are generated for each case reducer function
export const { setFilter, setSearch } = slice.actions

export default slice.reducer
