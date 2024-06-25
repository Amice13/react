import router from '@/router'
import { Router, RouterProvider } from 'react-router-dom'
import Layout from './layouts/main.jsx'

function App({ triggerQuery, model, modelUpdate }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
