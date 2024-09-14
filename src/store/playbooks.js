import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  query: '',
  queryField: 'name',
  sort: undefined,
  sortOrder: undefined
}

const reducers = {
  setFilter: (state, { payload: { filter, value }}) => { state.filters[filter] = value },
  setSearch: (state, { payload }) => { state.query = payload },
  setSort: (state, { payload }) => {
    state.sort = payload.sort
    state.sortOrder = payload.sortOrder
  }
}

export const slice = createSlice({
  name: 'playbooks',
  initialState,
  reducers
})

// Action creators are generated for each case reducer function
export const { setFilter, setSearch, setSort } = slice.actions

export default slice.reducer
