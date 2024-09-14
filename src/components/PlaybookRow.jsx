import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import PlaybookDialog from '@/components/PlaybookDialog'

function PlaybookRow ({ item }) {
  const [showPlaybookDialog, setPlaybookDialog] = useState(false)
  return (
    <tr>
      <td className="px-2 py-4">{ item.primaryClausesNumber }</td>
      <td>{ item.primaryClausesName }</td>
      <td>{ item.description }</td>
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
      <PlaybookDialog item={item} open={showPlaybookDialog} onClose={() => setPlaybookDialog(false)} />
    </tr>
  )
}

export default PlaybookRow
