import { useState, useEffect } from 'react'
import { useNavigate, useMatches } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import CustomSelectorBox from '@/components/CustomSelectorBox'

function Escalations () {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [escalations, setEscalations] = useState([])
  const [escalationsLoader, setEscalationsLoader] = useState(true)

  useEffect(() => {
    async function fetchData() {
      let currentContacts = await window.db.search('Contacts', { maxRecords: 100, pageSize: 100 })
      if (currentContacts.records) setEscalations(currentContacts.records)
      let currentEscalations = await window.db.search('Escalations', { maxRecords: 100, pageSize: 10 })
      if (currentEscalations.records) setEscalations(currentEscalations.records)
      setEscalationsLoader(false)
    }
    fetchData()
  }, [])

  return (
    <>
      <Container fluid>
        <Row className="py-2 px-3">
          <Col>
            <CustomSelectorBox selected="Open" options={['Open', 'Closed', 'Analysis']} />
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
                    <th width="10%">Urgent <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Date raised <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Days open <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {escalations.map(escalation => {
                    return (
                      <tr>
                        <td className="px-2 py-4">
                          {escalation.fields?.['Short Description'] || ''}
                        </td>
                        <td>
                          {escalation.fields?.['Matter Name (just for testing)'] || ''}
                        </td>
                        <td className="pe-4">
                          <select
                            selected={escalation.fields?.['Inhouse Legal Advisor'] || undefined }
                            className="form-select form-select-sm fw-600"
                            aria-label=".form-select-sm example"
                          >
                            { contacts.map(contact => {
                              return (
                                <option value={contact.id}>{contact.fields.Name}</option>
                              )
                            })}
                          </select>
                        </td>
                        <td>
                          {escalation.fields?.['Urgent'] || ''}
                        </td>
                        <td>
                          {escalation.fields?.['Date Raised'] || ''}
                        </td>
                        <td>
                          {escalation.fields?.['Days Open'] || ''}
                        </td>
                        <td>
                          <Button onClick={() => { navigate('/escalation') }} variant="outline-black" size="sm">View Details</Button>
                        </td>
                      </tr>
                    )
                  })}
{/*                  <tr>
                    <td className="px-2 py-4">Green Tech - Supply Agreement</td>
                    <td>Supply Agreement</td>
                    <td>16/03/2023</td>
                    <td className="pe-4">
                      <select selected="Emily Johnson" className="form-select form-select-sm fw-600" aria-label=".form-select-sm example">
                        <option value="1">Emily Johnson</option>
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
                      <select selected="Emily Johnson" className="form-select form-select-sm fw-600" aria-label=".form-select-sm example">
                        <option value="1">Emily Johnson</option>
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
                      <select selected="Emily Johnson" className="form-select form-select-sm fw-600" aria-label=".form-select-sm example">
                        <option value="1">Emily Johnson</option>
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
                      <select selected="Emily Johnson" className="form-select form-select-sm fw-600" aria-label=".form-select-sm example">
                        <option value="1">Emily Johnson</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </td>
                    <td>Yes</td>
                    <td>Asia Pacific</td>
                    <td>Technology</td>
                    <td><Button variant="outline-black" size="sm">View Details</Button>{' '}</td>
                  </tr>*/}
                </tbody>
              </Table>
              <div className="text-center" style={{ display: escalationsLoader ? 'none' : 'block' }}>
                <span className="loader"></span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Escalations
