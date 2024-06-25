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
  let location = useLocation()
  const matches = useMatches()
  const pageName = matches?.[0].handle?.meta?.name || 'Home'
  console.log(matches[0].pathname)
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
                <Tabs
                  id="controlled-tab-example"
                  activeKey={matches[0].pathname}
                  onSelect={(k) => navigate(k)}
                  className="mx-2"
                > 
                  <Tab eventKey="/" title="Home">
                    {children}
                  </Tab>
                  <Tab eventKey="/matters" title="Matters">
                    {children}
                  </Tab>
                  <Tab eventKey="/escalations" title="Escalations">
                    {children}
                  </Tab>
                  <Tab eventKey="/playbooks" title="Playbooks">
                    {children}
                  </Tab>
                  <Tab eventKey="/reports" title="Reports">
                    {children}
                  </Tab>
                </Tabs>
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
