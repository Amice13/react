import router from '@/router'
import { Outlet, Router, RouterProvider } from 'react-router-dom'
import Layout from './layouts/main.jsx'

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
