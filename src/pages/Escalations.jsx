import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import CustomScorecard from '@/components/CustomScorecard'
import CustomHeader from '@/components/CustomHeader'
import CustomReportCard from '@/components/CustomReportCard'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

function Home () {

  return (
    <>
      <Container fluid>
        <Row className="py-2 px-3">
          <Col>
            <div className="custom-selector">
              <div className="active">Open</div>
              <div>Closed</div>
              <div>Analysis</div>
            </div>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <div className="scorecard">
              <Table responsive className="radiant-table mt-4">
                <thead>
                  <tr>
                    <th width="15%">Escalation <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="15%">Matter name <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="15%">Inhouse legal advisor <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th>Status <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Urgent <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Date raised <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Days open <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-4">Tech Solutions - Service Contract</td>
                    <td>Service Contract</td>
                    <td>15/03/2023</td>
                    <td className="pe-4">
                      <select className="form-select form-select-sm fw-600" aria-label=".form-select-sm example">
                        <option selected>Emily Johnson</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </td>
                    <td>Yes</td>
                    <td>Asia Pacific</td>
                    <td>Sales and Marketing</td>
                    <td><Button variant="outline-black" size="sm">View Details</Button></td>
                  </tr>
                  <tr>
                    <td className="px-2 py-4">Green Tech - Supply Agreement</td>
                    <td>Supply Agreement</td>
                    <td>16/03/2023</td>
                    <td className="pe-4">
                      <select className="form-select form-select-sm fw-600" aria-label=".form-select-sm example">
                        <option selected>Emily Johnson</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </td>
                    <td>Yes</td>
                    <td>EMEA</td>
                    <td>Operations</td>
                    <td><Button variant="outline-black" size="sm">View Details</Button>{' '}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-4">Health Innovations - Partnership Agreement</td>
                    <td>Partnership Agreement</td>
                    <td>27/03/2023</td>
                    <td className="pe-4">
                      <select className="form-select form-select-sm fw-600" aria-label=".form-select-sm example">
                        <option selected>Emily Johnson</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </td>
                    <td>Yes</td>
                    <td>America</td>
                    <td>Healthcare</td>
                    <td><Button variant="outline-black" size="sm">View Details</Button>{' '}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-4">Eco Solutions - Licensing Agreement</td>
                    <td>Licensing Agreement</td>
                    <td>18/03/2023</td>
                    <td className="pe-4">
                      <select className="form-select form-select-sm fw-600" aria-label=".form-select-sm example">
                        <option selected>Emily Johnson</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </td>
                    <td>Yes</td>
                    <td>EMEA</td>
                    <td>Environmental</td>
                    <td><Button variant="outline-black" size="sm">View Details</Button>{' '}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-4">Smart Tech - Distribution Agreement</td>
                    <td>Distribution Agreement</td>
                    <td>28/03/2023</td>
                    <td className="pe-4">
                      <select className="form-select form-select-sm fw-600" aria-label=".form-select-sm example">
                        <option selected>Emily Johnson</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </td>
                    <td>Yes</td>
                    <td>Asia Pacific</td>
                    <td>Technology</td>
                    <td><Button variant="outline-black" size="sm">View Details</Button>{' '}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
