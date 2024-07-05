import { useState } from 'react'
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

  const [queryState, changeState] = useState(true)

  const run = () => {
    if (window.Retool) {
      console.log('query', window.Retool.triggerQuery('Playbook_Trigger'))
    }
    // setTimeout(() => {
    //   changeState('true')
    // }, 5000)
  }

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
                  <tr>
                    <td>Tech Innovations - Framework Agreement</td>
                    <td>Guidance required on the mark-up of regulatory provisions in annex 2</td>
                    <td>3 days</td>
                  </tr>
                  <tr>
                    <td>Eco Energy</td>
                    <td>Data protection and SCCs</td>
                    <td>6 days</td>
                  </tr>
                  <tr>
                    <td>Quantum Dynamics - Amendment</td>
                    <td>Tax implications</td>
                    <td>5 days</td>
                  </tr>
                  <tr>
                    <td>Bright Horizons - Reinstatement</td>
                    <td>Scope: restatement agreement</td>
                    <td>8 days</td>
                  </tr>
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
                <HomeAction name="Dora contract position to be discussed" />
                <HomeAction name="Dora contract position to be discussed" />
                <HomeAction name="Dora contract position to be discussed" />
                <HomeAction name="Dora contract position to be discussed" />
                { queryState }
                <button
                  type="button"
                  onClick={() => run()}
                >Blue</button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="py-2">
          <h4>Quarterly Reports</h4>
        </Row>
        <Row className="py-2">
          <Col>
            <CustomReportCard
              date="10 June 2024"
              description="Quarterly report xyz..."
              url="https://google.com"
            />
          </Col>
          <Col>
            <CustomReportCard
              date="10 June 2024"
              description="Quarterly report xyz..."
              url="https://google.com"
            />
          </Col>
          <Col>
            <CustomReportCard
              date="10 June 2024"
              description="Quarterly report xyz..."
              url="https://google.com"
            />
          </Col>
          <Col>
            <CustomReportCard
              date="10 June 2024"
              description="Quarterly report xyz..."
              url="https://google.com"
            />
          </Col>
          <Col>
            <CustomReportCard
              date="10 June 2024"
              description="Quarterly report xyz..."
              url="https://google.com"
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
