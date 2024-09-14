import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Accordion from 'react-bootstrap/Accordion'
import PlaybookRow from '@/components/PlaybookRow'

import { $api } from '@api'

const headers = [
  { title: 'Ref', value: 'primaryClausesNumber', sortable: true },
  { title: 'Clause name', value: 'primaryClausesName', sortable: true },
  { title: 'Issue', value: 'description', sortable: true },
  { title: 'Action', value: 'action' },
  { title: 'Reason (internal)', value: 'reason' },
  { title: 'Comment (external)', value: 'comment' },
  { title: '', value: 'button' },
]

function Playbook () {
  const navigate = useNavigate()
  let { id } = useParams()
  let [issues, setIssues] = useState([])
  const [playbookLoader, setPlaybookLoader] = useState(true)
  const [issuesDefinition, setIssuesDefinition] = useState({
    query: '',
    queryField: 'description',
    sort: undefined,
    sortOrder: undefined
  })

  useEffect(() => {
    async function fetchData() {
      setPlaybookLoader(true)
      const res = await $api.data.getById('playbooks', id)
      if (res.status === 'success') setIssues(res.data)
      setPlaybookLoader(false)
      if (!res.data.length) navigate('/playbooks')
      if (!issuesDefinition?.filters?.primaryClausesName) {
        issuesDefinition.filters = { primaryClausesName: [res.data[0].primaryClausesName] }
      }
    }
    fetchData()
  }, [id])
  
  const playbookName = issues?.[0]?.playbooksName || 'Not found'
  const parts = []
  const clausesKeys = []
  const clauses = []

  for (let issue of issues) {
    if (issue.playbookPartsName && !parts.includes(issue.playbookPartsName)) parts.push(issue.playbookPartsName)
    const clause = (issue.primaryClausesNumber ? `${issue.primaryClausesNumber}. ` : '') + issue.primaryClausesName
    if (clausesKeys.includes(clause)) continue
    clausesKeys.push(clause)
    clauses.push({ name: clause, part: issue.playbookPartsName, primaryClausesName: issue.primaryClausesName})
  }

  const setDefinition = (value) => {
    setIssuesDefinition(state => {
      const newState = Object.assign({}, state, value)
      return newState
    })
  }

  let issuesToShow = JSON.parse(JSON.stringify(issues))

  if (issuesDefinition.filters) {
    issuesToShow = issuesToShow.filter(el => {
      for (let [key, values] of Object.entries(issuesDefinition.filters)) {
        if (!values.includes(el[key])) return false
      }
      return true
    })
  }

  if (issuesDefinition.query) {
    const query = issuesDefinition.query.toLowerCase()
      .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      .replace(/-/g, '\\x2d')

    const regex = new RegExp(query, 'i')
    issuesToShow = issuesToShow.filter(issue => {
      if (!issue[issuesDefinition.queryField]) return false
      return issue[issuesDefinition.queryField].match(regex)
    })
  }

  if (issuesDefinition.sort) {
    issuesToShow.sort((a, b) => {
      const nameA = a[issuesDefinition.sort]
      const nameB = b[issuesDefinition.sort]
      if (!nameA || !nameB) return 0
      return issuesDefinition.sortOrder !== 'desc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
    })    
  }

  return (
    <>
      <Container fluid>
        <Row className="py-2 px-3">
          <Col>
            <a
              className="more-link cursor-pointer fw-600 text-gray-600 d-flex align-items-center"
              onClick={() => { navigate('/playbooks')}}
            >
              <i className="bi bi-chevron-left me-2" style={{ fontSize: '28px'}}></i> View all Playbooks
            </a>
          </Col>
        </Row>
        <Row className="py-2 px-3">
          <Col>
            <Stack direction="horizontal" gap={3}>
              <div className="text-gray-800">
                <h3 className="fw-600">Playbook: {playbookName}</h3>
              </div>
              <div className="ms-auto">
                <div className="input-group">
                  <input
                    type="text"
                    defaultValue={setDefinition.query}
                    onChange={event => setDefinition({ query: event.target.value })}
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
            {parts.map(part => {
              return (
                <div key={part}> 
                  <div className="mb-3">
                    <div className="fw-600">{part}</div>
                  </div>
                  {clauses.filter(clause => clause.part === part).map(clause => {
                    let active = issuesDefinition.filters.primaryClausesName.includes(clause.primaryClausesName)
                    active = active ? 'active' : ''
                    return (
                      <div
                        key={clause.name}
                        className={`text-gray-800 rounded-2 ps-3 py-2 mb-1 playbook-link cursor-pointer ${active}`}
                        onClick={() => {setDefinition({ filters: { primaryClausesName: [clause.primaryClausesName] }})}}
                      >
                        {clause.name}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </Col>
          <Col className="col-10">
            <Table responsive className="radiant-table vertical-align-baseline">
              <thead>
                <tr className="text-no-wrap">
                  {headers.map(header => {
                    const isSorted = issuesDefinition.sort === header.value
                    const sortOrder = isSorted && issuesDefinition.sortOrder === 'desc' ? 'asc' : 'desc'
                    return (
                      <th key={header.value}>
                        <span
                          className={`${header.sortable} ${header.sortable ? 'cursor-pointer' : ''}`}
                          onClick={() => {
                            if (header.sortable) setDefinition({
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
                {issuesToShow.map(issue => {
                  return (
                    <PlaybookRow key={issue.id} item={issue} />
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Playbook
