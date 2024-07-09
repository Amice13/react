import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate, useMatches } from 'react-router-dom'
import Logo from '@/assets/logo.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import GlobalAvatar from '@/components/GlobalAvatar'

const layout = ({ children }) => {
  const [key, setKey] = useState('/')
  const navigate = useNavigate()
  const matches = useMatches()
  const pageName = matches?.[0].handle?.meta?.name || 'Home'

  const tabs = [
    { title: 'Home', path: '/' },
    // { title: 'Matters', path: '/matters' },
    { title: 'Escalations', path: '/escalations' },
    { title: 'Playbooks', path: '/playbooks' },
    // { title: 'Reports', path: '/reports' },
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
              <GlobalAvatar />
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
                <ul className="mx-2 nav nav-tabs" id="controlled-tab-example" role="tablist">
                  {tabs.map((tab) => {
                    return (
                      <li key={tab.path} className="nav-item" role="presentation">
                        <button
                          type="button"
                          onClick={() => goTo(tab.path)}
                          id={`controlled-tab-tab-${tab.path}`}
                          role="tab"
                          aria-controls={`controlled-tab-tab-${tab.path}`}
                          aria-selected="true"
                          className={`nav-link ${ tab.path === matches[0].pathname ? 'active' : '' }`}>{tab.title}</button>
                      </li>
                    )
                  })}
                </ul>
                <div className="tab-content">
                  <div
                    role="tabpanel"
                    id="controlled-tab-example-tabpane-/"
                    aria-labelledby="controlled-tab-example-tab-/"
                    className="fade tab-pane active show">
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
