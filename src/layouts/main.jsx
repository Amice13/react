import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate, useMatches } from 'react-router-dom'
import Logo from '@/assets/logo.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Image from 'react-bootstrap/Image'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

const layout = ({ children }) => {
  const [key, setKey] = useState('/')
  const navigate = useNavigate()

  const matches = useMatches()
  const pageName = matches?.[0].handle?.meta?.name || 'Home'

  const tabs = [
    { title: 'Home', path: '/' },
    { title: 'Matters', path: '/matters' },
    { title: 'Escalations', path: '/escalations' },
    { title: 'Playbooks', path: '/playbooks' },
    { title: 'Reports', path: '/reports' },
  ]

  const goTo = (path) => {
    setKey(path)
    navigate(path)
  }

  return (
    <>
    <div className="h-100 d-flex flex-column">
      <div className="w-100">
      <Container fluid>
        <Row className="h-100 d-flex">
          <Col>
            <Stack direction="horizontal" gap={3}>
              <div className="logo-holder">
                <a href="https://vitejs.dev" target="_blank">
                  <img src={Logo} className="logo" alt="Radiant logo" />
                </a>
              </div>
              <h3>{pageName}</h3>
              <div className="ms-auto">
                <i className="bi bi-bell-fill" style={{ fontSize: '24px' }}></i>
              </div>
              <div className="avatar">
                <Image src="https://avatar.iran.liara.run/public" width="40" rounded />
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
      </div>
      <div className="h-100">
        <Container fluid className="h-100">
          <Row className="h-100">
            <Col>
              <div className="h-100 d-flex flex-column pb-2">
                <ul class="mx-2 nav nav-tabs" id="controlled-tab-example" role="tablist">
                  {tabs.map((tab) => {
                    return (
                      <li class="nav-item" role="presentation">
                        <button
                          type="button"
                          onClick={() => goTo(tab.path)}
                          id="controlled-tab-example-tab-/"
                          role="tab"
                          data-rr-ui-event-key="/"
                          aria-controls="controlled-tab-example-tabpane-/"
                          aria-selected="true"
                          className={`nav-link ${ tab.path === key ? 'active' : '' }`}>{tab.title}</button>
                      </li>
                    )
                  })}
                </ul>
                <div class="tab-content">
                  <div
                    role="tabpanel"
                    id="controlled-tab-example-tabpane-/"
                    aria-labelledby="controlled-tab-example-tab-/"
                    class="fade tab-pane active show">
                      {children}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    </>
  )
}

export default layout
