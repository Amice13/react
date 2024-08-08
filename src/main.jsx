import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/db/index.jsx'

// Global styles
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.scss'

// React store
import store from '@/store'
import { Provider } from 'react-redux'

// App definition
import App from './App.jsx'

// Fonts
import '@fontsource-variable/work-sans'
import '@fontsource/lato'

const rootComponent = window.Retool ? 'react' : 'root'

ReactDOM.createRoot(document.getElementById(rootComponent)).render(
  <Provider store={store}>
    <App />
  </Provider>
)
