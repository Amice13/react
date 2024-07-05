import router from '@/router'
import { Router, RouterProvider } from 'react-router-dom'
import Layout from './layouts/main.jsx'

function App({ triggerQuery, model, modelUpdate }) {
  console.log(model)
  window.model = model
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
