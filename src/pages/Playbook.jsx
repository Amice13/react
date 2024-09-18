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
import CustomLoaderAside from '@/components/CustomLoaderAside'
import CustomLoaderTable from '@/components/CustomLoaderTable'

import { $api } from '@api'

const headers = [
  { title: 'Ref clause', value: 'primaryClausesNumber', sortable: true },
  { title: 'Topic', value: 'primaryClausesName', sortable: true },
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
  
  const playbookName = issues?.[0]?.playbooksName || 'Loading...'
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
      // if (!issue[issuesDefinition.queryField]) return false
      return JSON.stringify(issue).match(regex)
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
              className="more-link cursor-pointer text-black d-flex align-items-center"
              onClick={() => { navigate('/playbooks')}}
            >
              <i className="bi bi-arrow-left me-2 font-weight-bold"></i> View all Playbooks
            </a>
          </Col>
        </Row>
        <Row className="py-2 px-2 mt-3">
          <Col>
            <Stack className="bg-bubble-gray py-3 px-3" direction="horizontal" gap={3}>
              <div className="text-gray-800">
                <h4 className="fw-400">Playbook: {playbookName}</h4>
              </div>
              <div className="ms-auto">
                <div className="input-group">
                  <input
                    type="text"
                    defaultValue={setDefinition.query}
                    onChange={event => setDefinition({ query: event.target.value })}
                    className="form-control border-end-0 yellow-input bg-transparent"
                    placeholder="Search..."
                    aria-label="from"
                    aria-describedby="from"
                  />
                  <span className="input-group-text bg-transparent"><i className="bi bi-search"></i></span>
                </div>
              </div>
            </Stack>
          </Col>
        </Row>
        <Row className="py-2 mx-1">
          <Col className="col-2">
            <CustomLoaderAside style={{ display: playbookLoader ? 'block': 'none' }} />
            {parts.map(part => {
              return (
                <div key={part} style={{ display: !playbookLoader ? 'block': 'none' }}> 
                  <div className="mb-1 px-2 py-1 bg-bubble-gray">
                    <div className="fw-600 fs-14">{part}</div>
                  </div>
                  {clauses.filter(clause => clause.part === part).map(clause => {
                    let active = issuesDefinition.filters.primaryClausesName.includes(clause.primaryClausesName)
                    active = active ? 'active' : ''
                    return (
                      <div
                        key={clause.name}
                        className={`text-gray-800 ps-3 py-3 playbook-link cursor-pointer ${active}`}
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
            <CustomLoaderTable style={{ display: playbookLoader ? 'block': 'none' }} />
            <Table responsive className="radiant-table vertical-align-baseline" style={{ display: !playbookLoader ? 'block': 'none' }}>
              <thead>
                <tr className="text-no-wrap fs-14">
                  {headers.map(header => {
                    const isSorted = issuesDefinition.sort === header.value
                    const sortOrder = isSorted && issuesDefinition.sortOrder === 'desc' ? 'asc' : 'desc'
                    return (
                      <th key={header.value}>
                        <span
                          className={`${header.sortable ? 'cursor-pointer' : ''}`}
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
                    <PlaybookRow key={issue.id} item={issue} query={issuesDefinition.query} />
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
