import { createHashRouter } from 'react-router-dom'

import Layout from '@/layouts/Main'
import LoginLayout from '@/layouts/Login'

import Login from '@/pages/Login'
import Matters from '@/pages/Matters'
import Escalation from '@/pages/Escalation'
import Escalations from '@/pages/Escalations'
import Playbooks from '@/pages/Playbooks'
import Reports from '@/pages/Reports'
import Playbook from '@/pages/Playbook'
import Parser from '@/pages/Parser'

const router = createHashRouter([
  {
    path: '/login',
    element: <LoginLayout><Login /></LoginLayout>,
    handle: {
      meta: { name: 'Login' }
    }
  },
  // Default page
  {
    path: '/',
    element: <Layout><Escalations /></Layout>,
    handle: {
      meta: { name: 'Escalations' }
    }
  },
  {
    path: '/playbooks',
    element: <Layout><Playbooks /></Layout>,
    handle: {
      meta: { name: 'Playbooks' }
    }
  },
  {
    path: '/escalation/:id',
    element: <Layout><Escalation /></Layout>,
    handle: {
      meta: { name: 'Escalations' }
    }
  },
  {
    path: '/playbook/:id',
    element: <Layout><Playbook /></Layout>,
    handle: {
      meta: { name: 'Playbooks' }
    }
  },
  {
    path: '/parser',
    element: <Layout><Parser /></Layout>,
    handle: {
      meta: { name: 'Parser' }
    }
  },
])

export default router
