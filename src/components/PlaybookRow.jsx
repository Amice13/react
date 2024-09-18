import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import PlaybookDialog from '@/components/PlaybookDialog'

const highlight = (text, query) => {
  if (!text) return ''
  const safeQuery = query.toLowerCase()
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    .replace(/-/g, '\\x2d')

  const regex = new RegExp('(' + query + ')', 'ig')
  const parts = text.split(regex)

  return (
    <span>{ parts.map((part, i) => 
      <span key={i} className={`${part.toLowerCase() === safeQuery.toLowerCase() && 'highlighted'}`}>
        { part }
      </span>)
    }</span>
  )
} 

function PlaybookRow ({ item, query }) {
  const [showPlaybookDialog, setPlaybookDialog] = useState(false)
  return (
    <tr>
      <td className="px-2 py-4">{ highlight(item.primaryClausesNumber, query) }</td>
      <td>{ highlight(item.primaryClausesName, query) }</td>
      <td>{ highlight(item.description, query) }</td>
      <td>{ highlight(item.action, query) }</td>
      <td>{ highlight(item.reason, query) }</td>
      <td>{ highlight(item.comment, query) }</td>
      <td>
        <Button
          onClick={() => setPlaybookDialog(true)}
          className="lightgrey"
          variant="outline-black"
          size="sm"
        >View</Button>
      </td>
      <PlaybookDialog item={item} open={showPlaybookDialog} onClose={() => setPlaybookDialog(false)} />
    </tr>
  )
}

export default PlaybookRow
