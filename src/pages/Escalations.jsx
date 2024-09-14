import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import EscalationsControlPane from '@/components/EscalationsControlPane'
import generateEscalations from '@faker/escalations'
import generateContacts from '@faker/contacts'
import { $api } from '@api'
import { setSort } from '@store/escalations'

const headers = [
  { title: 'Escalation', value: 'shortDescription', sortable: true },
  { title: 'Matter name', value: 'matterName', sortable: true },
  { title: 'Inhouse legal advisor', value: 'contactsId' },
  { title: 'Status', value: 'status' },
  { title: 'Urgent', value: 'urgent' },
  { title: 'Date raised', value: 'dateRaised', sortable: true },
  { title: 'Days open', value: 'daysOpen' },
  { title: '', value: 'button' }
]

function Escalations () {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [escalations, setEscalations] = useState([])
  const [escalationsLoader, setEscalationsLoader] = useState(true)
  const clientId = useSelector(({ layout }) => layout.clientId)
  const layout = useSelector(({ layout }) => layout)
  const escalationsDefinition = useSelector(({ escalations }) => escalations)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      const res = await $api.data.query('contacts', { limit: 1000 })
      if (res.status === 'success') {
        const { records } = res.data
        setContacts(records)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      // Generate the data
      // if (process.env.IS_DEV) {
      //   let currentEscalations = generateEscalations(5)
      //   setEscalations(currentEscalations.records)
      //   setEscalationsLoader(false)
      //   return false
      // }
      setEscalationsLoader(true)
      const query = JSON.parse(JSON.stringify(escalationsDefinition))
      if (query.filters.status === 'Open') query.filters.status = '!Closed'
      query.limit = 5
      if (typeof clientId === 'number' && clientId >= 0) query.filters.clientsId = [clientId]
      const res = await $api.data.query('escalations', query)
      if (res.status === 'success') {
        const { records } = res.data
        if (records) setEscalations(records)
      }
      setEscalationsLoader(false)
    }
    fetchData()
  }, [clientId, escalationsDefinition])

  const sortTable = (sort) => {
    dispatch(setSort(sort))
  }

  return (
    <>
      <Container fluid>
        <EscalationsControlPane />
        <Row className="pt-4">
          <Col>
            <div className="scorecard">
              <Table responsive className="radiant-table mt-4" style={{ display: !escalationsLoader ? 'block': 'none' }}>
                <thead>
                  <tr className="text-no-wrap">
                    {headers.map(header => {
                      const isSorted = escalationsDefinition.sort === header.value
                      const sortOrder = isSorted && escalationsDefinition.sortOrder === 'desc' ? 'asc' : 'desc'
                      return (
                        <th key={header.value}>
                          <span
                            className={`${header.sortable} ${header.sortable ? 'cursor-pointer' : ''}`}
                            onClick={() => {
                              if (header.sortable) sortTable({
                                sort: header.value,
                                sortOrder
                              })
                            }}
                          >
                            {header.title}
                          </span>
                          {header.sortable && <i
                            className={`${isSorted ? 'text-black' : ''} bi table-header-icon ${sortOrder === 'desc' ? 'bi-arrow-down-short' : 'bi-arrow-up-short'} ps-2`}
                          />}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {escalations.map(escalation => {
                    return (
                      <tr key={escalation.id}>
                        {headers.map(header => {
                          const key = `${header.value}-${escalation.id}`
                          if (header.value === 'button') return (
                            <td key={key}>
                              <Button onClick={() => { navigate(`/escalation/${escalation.id}`) }} variant="outline-black" size="sm">
                                <span className="text-no-wrap">View Details</span>
                              </Button>
                            </td>
                          )
                          if (header.value === 'contactsId') {
                            let contact
                            if (escalation.contactsId) {
                              contact = contacts.find(el => el.id === escalation.contactsId)
                            }
                            return (
                              <td key={key} className="pe-4">
                                { contact ? contact.name : '- Not assigned -' }
{/*                                <select
                                  defaultValue={escalation.contactsId}
                                  className="form-select form-select-sm fw-600"
                                  aria-label=".form-select-sm example"
                                >
                                  <option value={undefined}>- Not assigned -</option>
                                  { contacts.map(contact => {
                                    return (
                                      <option key={contact.id} value={contact.id}>{contact.name}</option>
                                    )
                                  })}
                                </select>*/}
                              </td>
                            )
                          }
                          if (header.value === 'status') {
                            let status = 'open'
                            if (escalation.status.match(/closed/)) status = 'closed' 
                            if (escalation.status.match(/radiant/i)) status = 'radiant' 
                            return (
                              <td key={key}>
                                <span className={`status text-no-wrap status-${status}`}>
                                  {escalation.status}
                                </span>
                              </td>
                            )
                          }
                          if (header.value === 'dateRaised') return (
                            <td key={key}>
                              { new Date(escalation.dateRaised).toLocaleDateString('en') }
                            </td>
                          )
                          if (header.value === 'daysOpen') return (
                            <td key={key}>
                              { parseInt((new Date() - new Date(escalation.dateRaised)) / (1000 * 60 * 60 * 24), 10) }
                            </td>
                          )
                          return (
                            <td key={key} className="px-2 py-4">
                              {escalation[header.value]}
                            </td>
                          )
                        })}
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
