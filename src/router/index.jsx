import { createHashRouter } from 'react-router-dom'

import Layout from '@/layouts/main'

import Home from '@/pages/Home'
import Matters from '@/pages/Matters'
import Escalations from '@/pages/Escalations'
import Escalation from '@/pages/Escalation'
import Playbooks from '@/pages/Playbooks'
import Reports from '@/pages/Reports'
import Playbook from '@/pages/Playbook'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
    handle: {
      meta: { name: 'Customer - Home' }
    }
  },
  {
    path: '/matters',
    element: <Layout><Matters /></Layout>,
    handle: {
      meta: { name: 'Customer - Matters' }
    }
  },
  {
    path: '/escalations',
    element: <Layout><Escalations /></Layout>,
    handle: {
      meta: { name: 'Customer - Escalations' }
    }
  },
  {
    path: '/playbooks',
    element: <Layout><Playbooks /></Layout>,
    handle: {
      meta: { name: 'Customer - Playbooks' }
    }
  },
  {
    path: '/reports',
    element: <Layout><Reports /></Layout>,
    handle: {
      meta: { name: 'Customer - Reports' }
    }
  },
  {
    path: '/escalation',
    element: <Layout><Escalation /></Layout>,
    handle: {
      meta: { name: 'Customer - Escalations' }
    }
  },
  {
    path: '/playbook',
    element: <Layout><Playbook /></Layout>,
    handle: {
      meta: { name: 'Customer - Playbooks' }
    }
  },
])

export default router
