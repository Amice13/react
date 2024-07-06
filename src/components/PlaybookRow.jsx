import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import PlaybookDialog from '@/components/PlaybookDialog'

function PlaybookRow ({ item }) {
  const [showPlaybookDialog, setPlaybookDialog] = useState(false)
  return (
    <tr>
      <td className="px-2 py-4">{ item.ref }</td>
      <td>{ item.clauseName }</td>
      <td>{ item.issue }</td>
      <td>{ item.action }</td>
      <td>{ item.reason }</td>
      <td>{ item.comment }</td>
      <td>
        <Button
          onClick={() => setPlaybookDialog(true)}
          variant="outline-black"
          size="sm"
        >View Details</Button>
      </td>
      <PlaybookDialog open={showPlaybookDialog} onClose={() => setPlaybookDialog(false)} />
    </tr>
  )
}

export default PlaybookRow
