import router from '@/router'
import { Outlet, Router, RouterProvider } from 'react-router-dom'
import Layout from './layouts/main.jsx'

async function sha256 (source) {
  const sourceBytes = new TextEncoder().encode(source)
  const digest = await crypto.subtle.digest('SHA-256', sourceBytes)
  const resultBytes = [...new Uint8Array(digest)]
  return resultBytes.map(x => x.toString(16).padStart(2, '0')).join('')
}

function App() {
  window.sha256 = sha256
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
