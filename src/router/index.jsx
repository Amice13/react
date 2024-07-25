import { createHashRouter } from 'react-router-dom'

import Layout from '@/layouts/main'

import Matters from '@/pages/Matters'
import Escalation from '@/pages/Escalation'
import Escalations from '@/pages/Escalations'
import Playbooks from '@/pages/Playbooks'
import Reports from '@/pages/Reports'
import Playbook from '@/pages/Playbook'

const router = createHashRouter([
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
    path: '/escalation',
    element: <Layout><Escalation /></Layout>,
    handle: {
      meta: { name: 'Escalations' }
    }
  },
  {
    path: '/playbook',
    element: <Layout><Playbook /></Layout>,
    handle: {
      meta: { name: 'Playbooks' }
    }
  },
])

export default router
