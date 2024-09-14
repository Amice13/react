import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const layout = ({ children }) => {
  const currentUser = useSelector(({ layout }) => layout.usersId)
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof currentUser === 'number' && currentUser >= 0) return navigate('/')
  }, [currentUser])

  return (
    <>
    <div className="h-100 d-flex flex-column">
      <div className="h-100">
        <Container fluid className="h-100">
          <Row className="h-100">
            <Col>
              <div className="h-100 d-flex flex-column pb-2">
                <div className="tab-content align-content-center">
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
