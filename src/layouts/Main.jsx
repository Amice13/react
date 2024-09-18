import { useState, useEffect } from 'react'
import { useNavigate, useMatches } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '@/assets/logo.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import LayoutNewsIndicator from '@/components/LayoutNewsIndicator'
import LayoutAccountSelector from '@/components/LayoutAccountSelector'
import LayoutAvatar from '@/components/LayoutAvatar'
import LayoutSiteTitle from '@/components/LayoutSiteTitle'

const layout = ({ children }) => {
  const [key, setKey] = useState('/')
  const currentUser = useSelector(({ layout }) => layout.usersId)
  const navigate = useNavigate()
  useEffect(() => {
    if (currentUser === -1) return navigate('/login')
  }, [currentUser])

  const matches = useMatches()
  const pageName = matches?.[0].handle?.meta?.name || 'Home'

  const tabs = [
    { title: 'Escalations', path: '/', regex: /\/escalation/ },
    { title: 'Playbooks', path: '/playbooks', regex: /\/playbook/ }
  ]

  const goTo = (path) => {
    setKey(path)
    navigate(path)
  }

  return (
    <>
    <div className="h-100 d-flex flex-column">
      <div
        className="w-100 bg-white custom-navbar"
      >
      <Container
        fluid
        style={{ padding: '8px 24px' }}
      >
        <Row className="h-100 d-flex">
          <Col>
            <Stack
              direction="horizontal"
              gap={3}
            >
              <div className="logo-holder">
                <a href="https://vitejs.dev" target="_blank">
                  <img src={Logo} className="logo" alt="Radiant logo" />
                </a>
              </div>
              <LayoutSiteTitle pageName={pageName} />
              <LayoutAccountSelector />
              <LayoutNewsIndicator />
              <LayoutAvatar />
            </Stack>
          </Col>
        </Row>
      </Container>
      </div>
      <div className="h-100 my-3 mx-4">
        <Container fluid className="h-100 mx-1">
          <Row className="h-100">
            <Col>
              <div className="d-flex flex-column pb-2">
                <ul className="mx-4 nav nav-tabs" id="controlled-tab-example" role="tablist">
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
                          className={`custom-nav nav-link ${ tab.path === matches[0].pathname || matches[0].pathname.match(tab.regex) ? 'active' : '' }`}>{tab.title}</button>
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
