import router from '@/router'
import { Outlet, Router, RouterProvider } from 'react-router-dom'
import Layout from './layouts/main.jsx'

function App({ triggerQuery, model, modelUpdate }) {
  console.log(model)
  window.app = { triggerQuery, model, modelUpdate }
  return (
    <>
    <RouterProvider router={router} model={model} />
    </>
  )
}

export default App
