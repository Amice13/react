import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import layout from './layout'
import escalations from './escalations'
import playbooks from './playbooks'

const reducers = combineReducers({
  layout,
  escalations,
  playbooks
})

const persistConfig = {
  key: 'radiant-escalations',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}