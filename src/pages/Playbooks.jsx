import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import CustomSelectorBox from '@/components/CustomSelectorBox'
import { $api } from '@api'
import { setSort } from '@store/playbooks'

const headers = [
  { title: 'Playbook name', value: 'name', sortable: true },
  { title: 'Supplier or customer (paper)', value: 'paper' },
  { title: 'Last updated', value: 'lastUpdate' },
  { title: 'Open escalations', value: 'openEscalations' },
  { title: 'Escalations last 6m', value: 'escalations' },
  { title: 'Canges last 6m', value: 'changes', sortable: true },
  { title: 'Date of last approval', value: 'lastApproval' },
  { title: '', value: 'button' },
  { title: '', value: 'file' }
]

function Playbooks () {
  const navigate = useNavigate()
  const [playbooks, setPlaybooks] = useState([])
  const [playbooksLoader, setPlaybooksLoader] = useState(true)
  const clientId = useSelector(({ layout }) => layout.clientId)
  const playbooksDefinition = useSelector(({ playbooks }) => playbooks)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      setPlaybooksLoader(true)
      const query = JSON.parse(JSON.stringify(playbooksDefinition))
      query.limit = 5
      if (typeof clientId === 'number' && clientId >= 0) query.filters = { clientsId: [clientId] }
      const res = await $api.data.query('playbooks', query)
      if (res.status === 'success') {
        const { records } = res.data
        if (records) setPlaybooks(records)
      }
      setPlaybooksLoader(false)
    }
    fetchData()
  }, [clientId, playbooksDefinition])

  const sortTable = (sort) => {
    dispatch(setSort(sort))
  }

  return (
    <>
      <Container fluid>
        <Row className="pt-4">
          <Col>
            <div className="scorecard">
              <Table responsive className="radiant-table mt-4">
                <thead>
                  <tr className="text-no-wrap">
                    {headers.map(header => {
                      const isSorted = playbooksDefinition.sort === header.value
                      const sortOrder = isSorted && playbooksDefinition.sortOrder === 'desc' ? 'asc' : 'desc'
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
                  {playbooks.map(playbook => {
                    return (
                      <tr key={playbook.id}>
                        {headers.map(header => {
                          const key = `${header.value}-${playbook.id}`
                          if (header.value === 'button') return (
                            <td key={key}>
                              <Button
                                onClick={() => { navigate(`/playbook/${playbook.id}`) }}
                                variant="outline-black"
                                size="sm"
                              >
                                <span className="text-no-wrap">Browse Playbook</span>
                              </Button>
                            </td>
                          )
                          if (header.value === 'file') return (
                            <td key={key}>
                              <i className="bi bi-file-pdf-fill text-gray-600" style={{ fontSize: '24px'}}></i>
                            </td>
                          )
                          if (header.value === 'lastUpdate') return (
                            <td key={key}>
                              { new Date(playbook.lastUpdate).toLocaleDateString('en') }
                            </td>
                          )
                          if (header.value === 'daysOpen') return (
                            <td key={key}>
                              { parseInt((new Date() - new Date(playbook.dateRaised)) / (1000 * 60 * 60 * 24), 10) }
                            </td>
                          )
                          return (
                            <td key={key} className="px-2 py-4">
                              {playbook[header.value]}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Playbooks
