import { useState, useEffect } from 'react'
import { useNavigate, useMatches } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import EscalationsControlPane from '@/components/EscalationsControlPane'

import generateEscalations from '@faker/escalations'
import generateContacts from '@faker/contacts'

function Escalations () {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [escalations, setEscalations] = useState([])
  const [escalationsLoader, setEscalationsLoader] = useState(true)
  useEffect(() => {
    async function fetchData() {
      // Generate the data
      if (process.env.IS_DEV) {
        let currentContacts = generateContacts(5)
        let currentEscalations = generateEscalations(5)
        const contactsId = currentEscalations.records.map(el => el.fields['Inhouse Legal Advisor'][0])
        setContacts(currentContacts.records)
        currentContacts.records = currentContacts.records.map((el, i) => {
          el.id = contactsId[i]
          return el
        })
        setEscalations(currentEscalations.records)
        setEscalationsLoader(false)
        return false
      }
      let currentContacts = await window.db.search('Contacts', { maxRecords: 100, pageSize: 100 })
      if (currentContacts.records) setContacts(currentContacts.records)
      let currentEscalations = await window.db.search('Escalations', { maxRecords: 100, pageSize: 10 })
      if (currentEscalations.records) setEscalations(currentEscalations.records)
      setEscalationsLoader(false)
    }
    fetchData()
  }, [])

  return (
    <>
      <Container fluid>
        <EscalationsControlPane />
        <Row className="pt-4">
          <Col>
            <div className="scorecard">
              <Table responsive className="radiant-table mt-4">
                <thead>
                  <tr>
                    <th>
                      Escalation
                      <i className="bi table-header-icon bi-arrow-down-short ps-2" />
                    </th>
                    <th width="15%">
                      Matter name
                      <i className="bi table-header-icon bi-arrow-down-short ps-2" />
                    </th>
                    <th width="15%">
                      Inhouse legal advisor
                      <i className="bi table-header-icon bi-arrow-down-short ps-2" />
                    </th>
                    <th width="10%">
                      Status
                      <i className="bi table-header-icon bi-arrow-down-short ps-2" />
                    </th>
                    <th width="10%">
                      Urgent
                      <i className="bi table-header-icon bi-arrow-down-short ps-2" />
                    </th>
                    <th width="10%">
                      Date raised
                      <i className="bi table-header-icon bi-arrow-down-short ps-2" />
                    </th>
                    <th width="10%">
                      Days open
                      <i className="bi table-header-icon bi-arrow-down-short ps-2" />
                    </th>
                    <th width="10%"></th>
                  </tr>
                </thead>
                <tbody>
                  {escalations.map(escalation => {
                    return (
                      <tr key={escalation.id}>
                        <td className="px-2 py-4">
                          {escalation.fields?.['Short Description'] || ''}
                        </td>
                        <td>
                          {escalation.fields?.['Matter Name'] || ''}
                        </td>
                        <td className="pe-4">
                          <select
                            defaultValue={escalation.fields?.['Inhouse Legal Advisor'] ? escalation.fields?.['Inhouse Legal Advisor'][0] || undefined : '' }
                            className="form-select form-select-sm fw-600"
                            aria-label=".form-select-sm example"
                          >
                            { contacts.map(contact => {
                              return (
                                <option key={contact.id} value={contact.id}>{contact.fields.Name}</option>
                              )
                            })}
                          </select>
                        </td>
                        <td>
                          <span className={`status status-${escalation.fields?.['Status']}`}>{escalation.fields?.['Status'] || ''}</span>
                        </td>
                        <td>
                          {escalation.fields?.['Urgent'] || ''}
                        </td>
                        <td>
                          {escalation.fields?.['Date Raised'] ? escalation.fields?.['Date Raised'].toLocaleDateString() : ''}
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
                </tbody>
              </Table>
              <div className="text-center" style={{ display: escalationsLoader ? 'block': 'none' }}>
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
