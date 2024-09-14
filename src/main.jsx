// Base react
import React from 'react'
import ReactDOM from 'react-dom/client'

// React store
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import storeSetup from '@/store'

const { store, persistor } = storeSetup()

// Global styles
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.scss'

// App definition
import App from './App.jsx'

// Fonts
import '@fontsource-variable/work-sans'
import '@fontsource/lato'

const rootComponent = window.Retool ? 'react' : 'root'

ReactDOM.createRoot(document.getElementById(rootComponent)).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
