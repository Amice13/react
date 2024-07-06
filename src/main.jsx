import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.scss'
import store from '@/store'
import { Provider } from 'react-redux'

const rootComponent = window.Retool ? 'react' : 'root'

ReactDOM.createRoot(document.getElementById(rootComponent)).render(
  <Provider store={store}>
    <App />
  </Provider>
)
