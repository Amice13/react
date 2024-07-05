import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import CustomScorecard from '@/components/CustomScorecard'
import CustomHeader from '@/components/CustomHeader'
import CustomReportCard from '@/components/CustomReportCard'
import Button from 'react-bootstrap/Button'

function Home () {

  return (
    <>
      <Container fluid>
        <Row className="py-2 px-3">
          <Col>
            <div className="custom-selector">
              <div className="active">Intake</div>
              <div>Open</div>
              <div>Closed</div>
            </div>
          </Col>
          <Col className="col-3">
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
          </Col>
          <Col className="col-2">
            <div className="custom-select">
              <div className="input-label">Deal type</div>
              <div className="input-group">
                <select className="form-control" id="inputGroupSelect">
                  <option defaultValue>All</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              <span className="input-group-text bg-transparent"><i className="bi small bi-chevron-down"></i></span>
              </div>
            </div>
          </Col>
          <Col className="col-3">
            <div className="custom-select">
              <div className="input-label">Status</div>
              <div className="input-group">
                <select className="form-control" id="inputGroupSelect">
                  <option defaultValue>All</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              <span className="input-group-text bg-transparent"><i className="bi small bi-chevron-down"></i></span>
              </div>
            </div>
          </Col>
          <Col className="flex-shrink-1 col-1 text-center pt-2">
            <i className="bi bi-sliders2"></i>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <div className="scorecard">
              <Table responsive className="radiant-table mt-4">
                <thead>
                  <tr>
                    <th width="15%">Matter name <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="15%">Deal type <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Received date <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th>Status <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Business contact <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Region <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="15%">Business division <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-4">Tech Solutions - Service Contract</td>
                    <td>Service Contract</td>
                    <td>15/03/2023</td>
                    <td>Working On: Radiant</td>
                    <td><a href="#">Jane Doe</a></td>
                    <td>Asia Pacific</td>
                    <td>Sales and Marketing</td>
                    <td><Button variant="outline-dark" size="sm">View Details</Button>{' '}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-4">Green Tech - Supply Agreement</td>
                    <td>Supply Agreement</td>
                    <td>16/03/2023</td>
                    <td>Working On: Radiant</td>
                    <td><a href="#">Alice Johnson</a></td>
                    <td>EMEA</td>
                    <td>Operations</td>
                    <td><Button variant="outline-dark" size="sm">View Details</Button>{' '}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-4">Health Innovations - Partnership Agreement</td>
                    <td>Partnership Agreement</td>
                    <td>27/03/2023</td>
                    <td>Working On: Radiant</td>
                    <td><a href="#">Emily White</a></td>
                    <td>America</td>
                    <td>Healthcare</td>
                    <td><Button variant="outline-dark" size="sm">View Details</Button>{' '}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-4">Eco Solutions - Licensing Agreement</td>
                    <td>Licensing Agreement</td>
                    <td>18/03/2023</td>
                    <td>Working On: Customer<br/><small>Business to provide feedback</small></td>
                    <td><a href="#">William Green</a></td>
                    <td>EMEA</td>
                    <td>Environmental</td>
                    <td><Button variant="outline-dark" size="sm">View Details</Button>{' '}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-4">Smart Tech - Distribution Agreement</td>
                    <td>Distribution Agreement</td>
                    <td>28/03/2023</td>
                    <td>Working On: Customer<br/><small>Business to provide feedback</small></td>
                    <td><a href="#">Sophia Brown</a></td>
                    <td>Asia Pacific</td>
                    <td>Technology</td>
                    <td><Button variant="outline-dark" size="sm">View Details</Button>{' '}</td>
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
