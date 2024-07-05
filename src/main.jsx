import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.scss'
import store from '@/store'
import { Provider } from 'react-redux'

const rootComponent = window.Retool ? 'react' : 'root'

// if (window.Retool) {
//   const ConnectedComponent = window.Retool.connectReactComponent(App)
//   const container = document.getElementById('react')
//   const root = ReactDOM.createRoot(container)
//   root.render(
//     <Provider store={store}>
//       <ConnectedComponent />
//     </Provider>
//   )
// } else {
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   )
// }

  ReactDOM.createRoot(document.getElementById(rootComponent)).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
