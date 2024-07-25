import { configureStore } from '@reduxjs/toolkit'
import layout from './layout'
import escalations from './escalations'

export default configureStore({
  reducer: {
    layout,
    escalations
  }
})

