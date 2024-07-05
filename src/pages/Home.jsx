import { useState, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import HomeAction from '@/components/HomeAction'
import CustomScorecard from '@/components/CustomScorecard'
import CustomHeader from '@/components/CustomHeader'
import CustomReportCard from '@/components/CustomReportCard'

function Home () {
  const [escalations, setEscalations] = useState([])
  const [actions, setActions] = useState([])
  const [reports, setReports] = useState([])

  useEffect(async () => {

    let currentReports = await window.db.search('Quaterly Reports', {})
    if (currentReports.records) setReports(currentReports.records)

    let currentActions = await window.db.search('Governance Actions', {})
    if (currentActions.records) setActions(currentActions.records)

    let currentEscalations = await window.db.search('Escalations', {})
    if (currentEscalations.records) setEscalations(currentEscalations.records)

  }, [])
  
  return (
    <>
      <Container fluid>
        <Row className="py-2">
          <Col>
            <div className="text-end fw-600 gray my-2">
              See all
              <i className="bi bi-arrow-right mx-2 font-weight-bold"></i>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomScorecard
              name="New matters"
              value="229"
              indicator="up"
              type="success"
              percent="30%"
              period="Last 30 days"
            />
          </Col>
          <Col>
            <CustomScorecard
              name="Average turnaround time"
              value="3.5 hours"
              indicator="up"
              type="danger"
              percent="20%"
              period="Last 30 days"
            />
          </Col>
          <Col>
            <CustomScorecard
              name="Average days to close"
              value="30 days"
              indicator="down"
              type="success"
              percent="20%"
              period="Last 30 days"
            />
          </Col>
          <Col>
            <CustomScorecard
              name="Average touches to close"
              value="7.6"
              indicator="down"
              type="success"
              percent="15%"
              period="Last 30 days"
            />
          </Col>
          <Col>
            <CustomScorecard
              name="Current NPS"
              value="4.8"
              indicator="up"
              type="success"
              percent="11%"
              period="Last 30 days"
            />
          </Col>
        </Row>
        <Row className="py-4">
          <Col className="col-3-5">
            <div className="scorecard">
              <CustomHeader title="Open Escalations (4)" url="https://google.com" />
              <Table responsive className="radiant-table mt-4">
                <thead>
                  <tr>
                    <th className="bg-primary fw-bold py-3" width="30%">Matter name</th>
                    <th className="bg-primary fw-bold py-3">Short description</th>
                    <th className="bg-primary fw-bold py-3" width="10%">Age</th>
                  </tr>
                </thead>
                <tbody>
                { escalations.map((escalation) => {
                  return (
                    <tr key={escalation.id}>
                      <td>{ escalation.fields?.['Matter Name (just for testing)'] ? escalation.fields['Matter Name (just for testing)'] : '' }</td>
                      <td>{ escalation.fields?.['Escalation Description'] ? escalation.fields['Escalation Description'] : '' }</td>
                      <td>{ escalation.fields?.['Days Open'] ? escalation.fields['Days Open'] : '' }</td>
                    </tr>
                  )
                })}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col className="col-2-5">
            <div className="scorecard">
              <div className="d-flex align-center">
                <h4 className="flex-grow-1">Governance Actions</h4>
              </div>
              <div className="py-3">
                { actions.map((action) => {
                  return <HomeAction key={action.id} name={action.fields?.Name ? action.fields?.Name : ''} />
                })}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="py-2">
          <h4>Quaterly Reports</h4>
        </Row>
        <Row className="py-2">
          { reports.map(report => {
            return (
              <Col key={report.id}>
                <CustomReportCard
                  date={report?.fields?.Date ? report.fields.Date : '' }
                  description={Array.isArray(report?.fields?.Name) ? report.fields.Name[0] : report.fields.Name }
                  url="https://google.com"
                />
              </Col>)
          })}
        </Row>
      </Container>
    </>
  )
}

export default Home
