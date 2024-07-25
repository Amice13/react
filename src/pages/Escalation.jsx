import { useNavigate, useMatches } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import EscalationsDeleteButton from '@/components/EscalationsDeleteButton'

function Escalations () {
  const navigate = useNavigate()

  return (
    <>
      <Container fluid>
        <Row className="py-2 px-3">
          <Col>
            <a
              className="more-link fw-600 text-gray-600 d-flex align-items-center"
              onClick={() => { navigate('/')}}
            >
              <i className="bi bi-chevron-left me-2" style={{ fontSize: '28px'}}></i> View all escalations
            </a>
          </Col>
        </Row>
        <Row className="py-2 px-3">
          <Col>
            <Stack direction="horizontal" gap={3}>
              <div className="text-gray-800">
                <h3 className="fw-600">Tech Innovations - Framework Agreement</h3>
              </div>
              <div className="ms-auto">
                <Button
                  onClick={() => { navigate('/') }}
                  className="ms-2"
                  variant="outline-black"
                >Close
                </Button>
                <EscalationsDeleteButton />
                <Button
                  className="btn-bg-primary ms-2"
                  variant="outline-black"
                >Edit
                </Button>
              </div>
            </Stack>
          </Col>
        </Row>
        <hr/>
        <Row className="pt-4">
          <Col className="col-7 py-2 px-4" style={{ borderRight: '1px solid #999' }}>
            <Row>
              <Col>
                <div className="bg-tertiary-200 px-3 py-3">
                  <Row>
                    <Col>
                      <h5 className="fw-bolder">Escalation Description</h5>
                      <div className="text-gray-700 pb-4 small">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-3">
                      <strong>Status:</strong> <span className="text-gray-700">Open</span>
                    </Col>
                    <Col className="col-4">
                      <strong>Date Raised:</strong> <span className="text-gray-700">10 April 2024</span>
                    </Col>
                    <Col className="col-5">
                      <strong>Inhouse Legal Advisor:</strong> <span className="text-gray-700">John Smith</span>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row className="py-4">
              <Col>
                <h5 className="fw-bolder">Agreement: Framework</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="fw-bolder">Matter Context</h6>
                <div className="text-gray-700 pb-4 small">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>                
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="fw-bolder">Counterparty's Mark-up</h6>
                <div className="text-gray-700 pb-4 small">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>                
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="fw-bolder">Counterparty's Reasoning</h6>
                <div className="text-gray-700 pb-4 small">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="fw-bolder">Counterparty's Reasoning</h6>
                <div className="text-gray-700 pb-4 small">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="fw-bolder">Radiant's Proposed Mark-up</h6>
                <div className="text-gray-700 pb-4 small">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="fw-bolder">Radiant's Recommendation</h6>
                <div className="text-gray-700 pb-4 small">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>                
              </Col>
            </Row>
            <Row>
              <Col>
                <Stack direction="horizontal" gap={2}>
                  <div className="text-gray-800">
                    <h6 className="fw-bolder">Relevant documents</h6>
                  </div>
                  <div className="ms-auto">
                    <a
                      className="more-link fw-600 text-gray-600 d-flex align-items-center"
                      onClick={() => { navigate('/escalations')}}
                    >
                      Download all
                    </a>
                  </div>
                </Stack>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="file-btn d-flex align-items-center">
                  <i className="bi bi-file-earmark me-2"></i> Document 1
                </div>
              </Col>
              <Col>
                <div className="file-btn d-flex align-items-center">
                  <i className="bi bi-file-earmark me-2"></i> Document 2
                </div>
              </Col>
              <Col>
                <div className="file-btn d-flex align-items-center">
                  <i className="bi bi-file-earmark me-2"></i> Document 3
                </div>
              </Col>
              <Col>
                <div className="file-btn d-flex align-items-center">
                  <i className="bi bi-file-earmark me-2"></i> Document 4
                </div>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Accordion className="radiant-accordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <h5>Matter details</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col className="col-12 px-4 mx-4">
                          <div><strong>Working on</strong></div>
                          <div className="text-gray-700 pb-4 small">Counterparty reviewing</div> 
                        </Col>
                        <Col className="col-5 px-4 mx-4">
                          <div><strong>Deal type</strong></div>
                          <div className="text-gray-700 pb-4 small">Standalone</div> 
                        </Col>
                        <Col className="col-6">
                          <div><strong>Legal Advisor</strong></div>
                          <div className="text-orange1-700 pb-4 small">James Anderson</div> 
                        </Col>
                        <Col className="col-5 px-4 mx-4">
                          <div><strong>Business Division</strong></div>
                          <div className="text-gray-700 pb-4 small">Finance And Accounting</div> 
                        </Col>
                        <Col className="col-6">
                          <div><strong>Paper (Supplier/Own Paper)</strong></div>
                          <div className="text-gray-700 pb-4 small">Supplier</div> 
                        </Col>
                        <Col className="col-12 px-4 mx-4">
                          <div><strong>Legal Contact</strong></div>
                          <div className="text-gray-700 pb-4 small">Emily Johnson</div> 
                        </Col>
                        <Col className="col-12 px-4 mx-4">
                          <div><strong>Region</strong></div>
                          <div className="text-gray-700 pb-4 small">Asia Pacific</div> 
                        </Col>
                        <Col className="col-12 px-4 mx-4">
                          <div><strong>Instruction Acknowledged Date</strong></div>
                          <div className="text-gray-700 pb-4 small">22/04/2023 09:45</div> 
                        </Col>
                        <Col className="col-12 px-4 mx-4">
                          <div><strong>Contract Value</strong></div>
                          <div className="text-gray-700 pb-4 small">£250,000</div> 
                        </Col>
                        <Col className="col-12 px-4 mx-4">
                          <div><strong>Business Contact</strong></div>
                          <div className="text-orange1-700 pb-4 small">Emily Johnson</div> 
                        </Col>
                        <Col className="col-12 px-4 mx-4">
                          <div><strong>Matter Context</strong></div>
                          <div className="text-gray-700 pb-4 small">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div> 
                        </Col>
                        <Col className="col-12 px-4 mx-4">
                          <div><strong>Matter Escalation History</strong></div>
                          <div className="text-gray-700 pb-4 small">
                            <ul className="radiant-list">
                              <li>November 12, 2023: Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                              <li>December 3, 2023: Lorem Ipsum has been the industry's standard dummy text</li>
                              <li>January 20, 2024: Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</li>
                            </ul>
                          </div>
                        </Col>
                       <Col className="col-12 px-4 mx-4">
                          <div className="pb-1"><strong>Current Draft</strong></div>
                          <div className="file-btn py-2 px-2 align-items-center">
                            <Stack direction="horizontal" gap={3}>
                              <div className="text-gray-800">
                                <i className="bi bi-file-earmark me-2" style={{ fontSize: '28px' }}></i>
                              </div>
                              <div>
                                <div className="fw-600">Standalone</div>
                                <div className="fw-normal text-gray-500">Last updated: 21/04/2023 14:45</div>
                              </div>
                              <div className="ms-auto text-end">
                                <div className="text-gray-700">View</div>
                              </div>
                            </Stack>
                          </div>
                        </Col>
                       <Col className="col-12 px-4 mx-4 mt-4">
                          <div className="pb-1"><strong>Additional Documents</strong></div>
                          <div className="file-btn py-2 px-2 align-items-center">
                            <Stack direction="horizontal" gap={3}>
                              <div className="text-gray-800">
                                <i className="bi bi-file-earmark me-2" style={{ fontSize: '28px' }}></i>
                              </div>
                              <div>
                                <div className="fw-600">Standalone</div>
                                <div className="fw-normal text-gray-500">Last updated: 21/04/2023 14:45</div>
                              </div>
                              <div className="ms-auto text-end">
                                <div className="text-gray-700">View</div>
                              </div>
                            </Stack>
                          </div>
                        </Col>
 
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <h5>Escalation details</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>            
          </Col>
          <Col className="col-5">
            <Row>
              <Col>
                <h5 className="fw-bolder mb-4">Activity</h5>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <div className="bg-gray-200 px-4 py-2 rounded-3">
                  <strong>Created</strong>
                  <span className="text-gray-700 ms-2">2024-06-01 09:00 AM</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="bg-gray-200 px-4 py-2 rounded-3">
                  <strong>Assigned to Inhouse Legal Advisor: Emily Johnson</strong>
                  <span className="text-gray-700 ms-2">2024-06-01 10:00 AM</span>
                </div>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <div className="d-flex">
                  <div>
                    <div
                      className="bg-primary-900 rounded-circle d-flex align-items-center"
                      style={{ width: '36px', height: '36px' }}
                    ><span className="text-center w-100 text-white fw-600">E</span></div>
                  </div>
                  <div className="bg-tertiary-200 ms-3 flex-grow-1 py-3 px-3">
                    <div>
                      <span className="fw-600">Emily</span>
                      <span className="small text-gray-500 ms-2">2 days ago</span>
                    </div>
                    <div className="small">Can you please send me the original intake form?</div>
                    <div className="text-end small fw-600 text-orange2-300">Reply</div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <div className="d-flex">
                  <div style={{ paddingLeft: '48px' }}>
                    <div
                      className="bg-orange1-600 rounded-circle d-flex align-items-center"
                      style={{ width: '36px', height: '36px', position: 'relative' }}
                    >
                      <div style={{ top: '-36px', left: '-30px', position: 'absolute', width: '28px', height: '56px', borderLeft: '1px solid #ccc', borderBottom: '1px solid #DDD', borderRadius: '0px 0px 0px 20px' }}></div>
                      <span className="text-center w-100 text-white fw-600">R</span>
                    </div>
                  </div>
                  <div className="bg-tertiary-200 ms-3 flex-grow-1 py-3 px-3">
                    <div>
                      <span className="fw-600">Radiant</span>
                      <span className="small text-gray-500 ms-2">1 day ago</span>
                    </div>
                    <div className="small">The original intake form has been sent</div>
                    <div className="text-end small fw-600 text-orange2-300">Reply</div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <div className="bg-gray-200 px-4 py-2 rounded-3">
                  <strong>Radiant provided comment</strong>
                  <span className="text-gray-700 ms-2">2024-06-05 04:00 PM</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="bg-gray-200 px-4 py-2 rounded-3">
                  <strong>Request further information</strong>
                  <span className="text-gray-700 ms-2">2024-06-01 05:00 PM</span>
                </div>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <div className="d-flex">
                  <div>
                    <div
                      className="bg-primary-900 rounded-circle d-flex align-items-center"
                      style={{ width: '36px', height: '36px' }}
                    ><span className="text-center w-100 text-white fw-600">E</span></div>
                  </div>
                  <div className="bg-tertiary-200 ms-3 flex-grow-1 py-3 px-3">
                    <div>
                      <span className="fw-600">Emily</span>
                      <span className="small text-gray-500 ms-2">2 days ago</span>
                    </div>
                    <div className="small">Can you please provide me the client contract details?</div>
                    <div className="text-end small fw-600 text-orange2-300">Reply</div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <div className="d-flex">
                  <div style={{ paddingLeft: '48px' }}>
                    <div
                      className="bg-orange1-600 rounded-circle d-flex align-items-center"
                      style={{ width: '36px', height: '36px', position: 'relative' }}
                    >
                      <div style={{ top: '-36px', left: '-30px', position: 'absolute', width: '28px', height: '56px', borderLeft: '1px solid #ccc', borderBottom: '1px solid #DDD', borderRadius: '0px 0px 0px 20px' }}></div>
                      <span className="text-center w-100 text-white fw-600">R</span>
                    </div>
                  </div>
                  <div className="bg-tertiary-200 ms-3 flex-grow-1 py-3 px-3">
                    <div>
                      <span className="fw-600">Radiant</span>
                      <span className="small text-gray-500 ms-2">2 days ago</span>
                    </div>
                    <div className="small">The client contract details are atttached</div>
                    <div className="text-end small fw-600 text-orange2-300">Reply</div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <div className="bg-gray-200 px-4 py-2 rounded-3">
                  <strong>Radiant provided comment</strong>
                  <span className="text-gray-700 ms-2">2024-06-05 04:00 PM</span>
                </div>
              </Col>
            </Row>
            <hr className="my-4"/>
            <Row className="mb-3">
              <Col>
                <div className="px-2 py-2 rounded-3 d-flex" style={{ border: '1px solid #ddd' }}>
                  <div className="text-gray-600 flex-grow-1 px-2">Write a comment...</div>
                  <div>
                    <i className="bi bi-image-fill text-gray-600 me-2"></i>
                    <i className="bi bi-paperclip text-gray-600 me-2"></i>
                    <i className="bi bi-emoji-smile text-gray-600 me-2"></i>
                    <span className="me-2">|</span>
                    <i className="bi bi-send-fill text-orange1-700"></i>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Escalations
