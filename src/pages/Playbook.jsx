import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Accordion from 'react-bootstrap/Accordion'
import PlaybookRow from '@/components/PlaybookRow'

function Escalations () {
  const navigate = useNavigate()
  return (
    <>
      <Container fluid>
        <Row className="py-2 px-3">
          <Col>
            <a
              className="more-link fw-600 text-gray-600 d-flex align-items-center"
              onClick={() => { navigate('/escalations')}}
            >
              <i className="bi bi-chevron-left me-2" style={{ fontSize: '28px'}}></i> View all Playbooks
            </a>
          </Col>
        </Row>
        <Row className="py-2 px-3">
          <Col>
            <Stack direction="horizontal" gap={3}>
              <div className="text-gray-800">
                <h3 className="fw-600">Playbook: [Customer] Framework Agreement</h3>
              </div>
              <div className="ms-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-end-0"
                    placeholder="Search"
                    aria-label="from"
                    aria-describedby="from"
                  />
                  <span className="input-group-text bg-transparent"><i className="bi bi-search"></i></span>
                </div>
              </div>
            </Stack>
          </Col>
        </Row>
        <Row className="py-2 mx-3" style={{ borderTop: '1px solid #DDD' }}>
          <Col className="col-2" style={{ borderRight: '1px solid #DDD' }}>
            <div className="mb-3">
              <div className="fw-600">Framework Terms</div>
            </div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">1. Definitions</div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">2. Interpretation</div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">3. Term</div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">4. Provision Of Services</div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">5. Code Of Conduct</div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">6. Supplier Personnel</div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">7. Acceptance</div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">8. Warranties</div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">9. Charges And Payments</div>
            <div className="bg-gray-800 text-white rounded-2 ps-3 py-2">
              10. Confidentiality
            </div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">11. Data Protection</div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">12. Information Security</div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">13. Intellectual Property</div>
            <div className="my-3">
              <div className="fw-600">Service-Specific Terms</div>
            </div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">1. Definitions</div>
            <div className="text-gray-800 rounded-2 ps-3 py-2">2. License And Usage</div>
          </Col>
          <Col className="col-10">
            <Table responsive className="radiant-table">
              <thead>
                <tr>
                  <th width="5%">Ref</th>
                  <th width="15%">Clause name</th>
                  <th width="15%">Issue</th>
                  <th width="15%">Action</th>
                  <th>Reason (internal)</th>
                  <th width="15%">Comment (external)</th>
                  <th width="10%"></th>
                </tr>
              </thead>
              <tbody>
                <PlaybookRow item={{
                  ref: 10,
                  clauseName: 'Confidentiality (in general)',
                  issue: 'Request to make changes',
                  action: 'Seek to adopt the wording of template clause wherever possible',
                  reason: 'It is a regulatory requirement that Company takes the necessary steps to ensure',
                  comment: 'It is a regulatory requirement that Company takes',
                  id: 1
                }} />
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Escalations
