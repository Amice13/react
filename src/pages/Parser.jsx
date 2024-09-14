import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import EscalationComments from '@/components/EscalationComments'
import EscalationsDeleteButton from '@/components/EscalationsDeleteButton'

import { $api } from '@api'

function Escalations () {
  const navigate = useNavigate()
  let { id } = useParams()
  let [escalation, setEscalation] = useState({})
  const [escalationLoader, seteEcalationLoader] = useState(true)

  useEffect(() => {
    async function fetchData() {
      seteEcalationLoader(true)
      const res = await $api.data.getById('escalations', id)
      if (Object.keys(res.data).length === 0) navigate('/escalations')
      if (res.status === 'success') setEscalation(res.data)
      seteEcalationLoader(false)
    }
    fetchData()
  }, [id])

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
                <h3 className="fw-600">{escalation.shortDescription}</h3>
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
                      <div className="text-gray-700 pb-4 small">{escalation.escalationDescription}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-4">
                      <strong>Status:</strong> <span className="text-gray-700">{escalation.status}</span>
                    </Col>
                    <Col className="col-4">
                      <strong>Date Raised:</strong> <span className="text-gray-700">{ new Date(escalation.dateRaised).toLocaleDateString('en') }</span>
                    </Col>
                    {escalation.contactsName &&
                      <Col className="col-4">
                        <strong>Inhouse Legal Advisor:</strong> <span className="text-gray-700">{escalation.contactsName}</span>
                      </Col>
                    }
                  </Row>
                </div>
              </Col>
            </Row>
            <Row className="py-4">
              <Col>
                <h5 className="fw-bolder">Agreement: Framework</h5>
              </Col>
            </Row>
            {escalation.matterContext &&
              <Row>
                <Col>
                  <h6 className="fw-bolder">Matter Context</h6>
                  <div className="text-gray-700 pb-4 small">{escalation.matterContext}</div>
                </Col>
              </Row>
            }
            {escalation.counterpartyMarkup &&
              <Row>
                <Col>
                  <h6 className="fw-bolder">Counterparty's Mark-up</h6>
                  <div className="text-gray-700 pb-4 small">{escalation.counterpartyMarkup}</div>
                </Col>
              </Row>
            }
            {escalation.counterpartyReasoning &&
              <Row>
                <Col>
                  <h6 className="fw-bolder">Counterparty's Reasoning</h6>
                  <div className="text-gray-700 pb-4 small">{escalation.counterpartyReasoning}</div>
                </Col>
              </Row>
            }
            {escalation.proposedMarkup &&
              <Row>
                <Col>
                  <h6 className="fw-bolder">Radiant's Proposed Mark-up</h6>
                  <div className="text-gray-700 pb-4 small">{escalation.proposedMarkup}</div>
                </Col>
              </Row>
            }
            {escalation.recommendation &&
              <Row>
                <Col>
                  <h6 className="fw-bolder">Radiant's Recommendation</h6>
                  <div className="text-gray-700 pb-4 small">{escalation.recommendation}</div>
                </Col>
              </Row>
            }
            <Row className="mb-2">
              <Col>
                <Stack direction="horizontal" gap={2}>
                  <div className="text-gray-800">
                    <h6 className="fw-bolder mb-0">Relevant documents</h6>
                  </div>
                  <div className="ms-auto">
                    <a
                      className="more-link cursor-pointer fw-600 text-gray-600 d-flex align-items-center"
                      onClick={() => { navigate('/escalations')}}
                    >
                      Download all
                    </a>
                  </div>
                </Stack>
              </Col>
            </Row>
            <Row>
              <Col className="col-4">
                <div className="file-btn d-flex align-items-center">
                  <i className="bi bi-upload me-3 ms-2"></i> Upload document
                </div>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Accordion className="radiant-accordion" alwaysOpen onSelect={(e) => { console.log(e) }}>
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
                      <h5>Playbook details</h5>
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
          <EscalationComments id={id} />
        </Row>
      </Container>
    </>
  )
}

export default Escalations
