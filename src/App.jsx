import router from '@/router'
import { Outlet, Router, RouterProvider } from 'react-router-dom'
import Layout from './layouts/main.jsx'
import {  } from "react-router-dom"

function App({ triggerQuery, model, modelUpdate }) {
  window.app = { triggerQuery, model, modelUpdate }
  return (
    <>
    <Outlet context={[triggerQuery, model, modelUpdate]} />
    <RouterProvider router={router} model={model} />
    </>
  )
}

export default App
