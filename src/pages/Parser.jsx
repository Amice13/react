import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
import CustomLoaderTable from '@/components/CustomLoaderTable'
import { $api } from '@api'
import axios from 'axios'

import JSZip from 'jszip'

const getTextFromCell = (elements, string = '') => {
  if (!Array.isArray(elements)) elements = [elements]
  for (let element of elements) {
    // Get the text
    let text = [...element.children].filter(el => el.tagName === 'w:t')[0]
    // Check formatting
    let format = {}
    let formatting = [...element.children].filter(el => el.tagName === 'w:rPr')[0]
    if (formatting && text) {
      if (formatting.querySelector('b')) format.isBold = true
      if (formatting.querySelector('i')) format.isItalic = true
      if (formatting.querySelector('u')) format.isItalic = true
      if (formatting.querySelector('strike')) format.isStriked = true
      if (formatting.querySelector('highlight')) format.isHighlighted = true
      if (formatting.querySelector('[val="subscript"]')) format.isSubscript = true
      if (formatting.querySelector('[val="superscript"]')) format.isSuperscript = true
      if (formatting.querySelector('[val="ListParagraph"]')) format.isList = true
    }
    // If element contains the text, add it to the string
    if (text) {
      // if (text.querySelector('#text')) text = text.querySelector('#text')
      text = text.textContent
      if (format.isBold) text = '**' + text.replace(/ +$/, '') + '** '
      if (format.isItalic) text = '*' + text.replace(/ +$/, '') + '* '
      if (format.isUnderlined) text = '<ins>' + text.replace(/ +$/, '') + '</ins> ' 
      if (format.isStriked) text = '~~' + text.replace(/ +$/, '') + '~~ '
      if (format.isHighlighted) text = '==' + text.replace(/ +$/, '') + '== '
      if (format.isSubscript) text = '~' + text.replace(/ +$/, '') + '~ '
      if (format.isSuperscript) text = '^' + text.replace(/ +$/, '') + '^ '
      string = string + text
      continue
    }
    // Check runs
    let secondFormat = {}
    let secondFormatting = [...element.children].filter(el => el.tagName === 'w:rPr')[0]
    if (secondFormatting && [...element.children].filter(el => el.tagName === 'w:r').length) {
      if (secondFormatting.querySelector('[val="ListParagraph"]')) secondFormat.isList = true      
    }
    let runs = [...element.children].filter(el => el.tagName === 'w:r')
    if (runs.length) {
      let text = getTextFromCell(runs, '')
      if (secondFormat.isList) text = '\n* ' + text.replace(/ +$/, '')
      if (!secondFormat.isList) text = text + '\n\n'
      string = string + text
      continue
    }
    let paragraphs = [...element.children].filter(el => el.tagName === 'w:p')
    if (paragraphs) {
      let text = getTextFromCell(paragraphs, '')
      string = string + text
      continue
    }
  }
  return string
}

const dict = {
  '**CLAUSE #**': 'clauseRef',
  '**CLAUSE**': 'secondaryClause',
  '**THEME**': 'secondaryClause',
  '**ISSUE**': 'issue',
  '**ACTION**': 'action',
  '**REASON (INTERNAL)**': 'reason',
  '**COMMENT (EXTERNAL)**': 'comment',
  'CLAUSE #': 'clauseRef',
  'CLAUSE': 'secondaryClause',
  'THEME': 'secondaryClause',
  'ISSUE': 'issue',
  'ACTION': 'action',
  'REASON (INTERNAL)': 'reason',
  'COMMENT (EXTERNAL)': 'comment',
  '**REASON**': 'reason',
  '**COMMENT**': 'comment',
  'REASON': 'reason',
  'COMMENT': 'comment'
}

const headers = [
  { title: 'Ref', value: 'clauseRef', sortable: true },
  { title: 'Clause', value: 'primaryClause', sortable: true },
  { title: 'Secondary Clause', value: 'secondaryClause', sortable: true },
  { title: 'Issue', value: 'issue' },
  { title: 'Action', value: 'action' },
  { title: 'Reason', value: 'reason' },
  { title: 'Comment', value: 'comment' },
  { title: '', value: 'button' }
]

function Parser () {
  const navigate = useNavigate()
  const [issues, setIssues] = useState([])
  const layout = useSelector(({ layout }) => layout)
  const dispatch = useDispatch()

  const [issuesDefinition, setIssuesDefinition] = useState({
    query: '',
    queryField: 'description',
    sort: undefined,
    sortOrder: undefined
  })

  useEffect(() => {
    async function fetchData() {
      const fileRequest = await axios('/NDA.docx', { responseType: 'blob' })
      const { data } = fileRequest
      const zip = await JSZip.loadAsync(data)
      const xmlString = await zip.files['word/document.xml'].async('string')
      const parser = new DOMParser()
      const xml = parser.parseFromString(xmlString, 'text/xml')
      const tableRows = [...xml.querySelectorAll('tbl tr')]

      let i = 0
      let headers = []
      let primaryClause
      let results = []
      for (let row of tableRows) {
        i++
        let tableCells = [...row.querySelectorAll('tc')]
        const cellValues = tableCells.map(cell => getTextFromCell(cell).trim())
        if (i === 1) {
          headers = cellValues.map(el => dict[el])
          continue
        }
        if (cellValues.filter(Boolean).length === 1) {
          primaryClause = cellValues[0].replace(/\*/g, '')
          continue
        }
        let entity = headers.reduce((acc, el, i) => {
          acc[el] = cellValues[i]
          return acc
        }, {})
        console.log(entity)
        results.push({ primaryClause, ...entity })
      }
      setIssues(results)
    }
    fetchData()
  }, [])

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <div className="mx-3">
              <Table responsive className="radiant-table mt-4 vertical-align-baseline">
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
                  {issues.map((issue, i) => {
                    return (
                      <tr key={i}>
                        {headers.map(header => {
                          const key = `${header.value}-${issue.id}`
                          if (header.value === 'button') return (
                            <td key={key}>
                              <Button onClick={() => { navigate(`/issue/${issue.id}`) }} variant="outline-black" size="sm">
                                <span className="text-no-wrap">View Details</span>
                              </Button>
                            </td>
                          )
                          return (
                            <td key={key} className="px-2 py-4 fs-12 fw-500">
                              {issue[header.value] && <Markdown remarkPlugins={[remarkGfm]}>{issue[header.value]}</Markdown>}
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

export default Parser
