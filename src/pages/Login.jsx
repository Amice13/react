import '../App.scss'
import { $api, $auth } from '@api'
import { useState } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useNavigate, useMatches } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Logo from '@/assets/logo.png'
import LayoutSiteTitle from '@/components/LayoutSiteTitle'
import Card from 'react-bootstrap/Card'

import { useDispatch } from 'react-redux'
import { setUser } from '@store/layout'


function Login () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const handleLoginSuccess = async (response) => {
    setLoading(true)
    const user = $auth.getUserFromToken(response.credential)
    const accessCredentials = await $api.auth.googleVerify({ token: response.credential })
    if (!accessCredentials?.data?.accessToken) return alert('Can\'t login')
    await $auth.setToken(accessCredentials.data.accessToken)
    const localCredentials = $auth.getUserFromToken(accessCredentials.data.accessToken)
    user.sub = localCredentials.sub
    dispatch(setUser(user))
  }

  const handleLoginFailure = (error) => {
    alert('Can\'t login')
  }

  return (
    <>
      <Container fluid>
        <Row className="py-2 px-3">
          <Col>
            <Card className="mx-auto text-center shadow" style={{ width: '32rem' }}>
              <Card.Body>
                <Container fluid>
                  <Row className="h-100 d-flex mb-5">
                    <Col>
                      <Stack direction="horizontal" gap={3}>
                        <div className="logo-holder">
                          <img src={Logo} className="logo" alt="Radiant logo" />
                        </div>
                        <LayoutSiteTitle />
                      </Stack>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col>
                      <h3 className="mt-8"><strong>Welcome back</strong></h3>
                      <h5 className="text-gray-700">Log in to your account</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-center" style={{ display: loading ? 'block': 'none' }}>
                        <span className="loader"></span>
                      </div>

                      <div className="google-center" style={{ display: !loading ? 'block': 'none' }}>
                        <GoogleOAuthProvider
                          clientId="311570180300-lbsbap1cu1g6o181lmcunpe63vhq0vq0.apps.googleusercontent.com"
                        >
                          <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onFailure={handleLoginFailure}
                          />
                        </GoogleOAuthProvider>
                      </div>
                    </Col>
                  </Row>
                </Container>                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
