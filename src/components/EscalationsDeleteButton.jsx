import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import EscalationsDeleteDialog from '@/components/EscalationsDeleteDialog'

function EscalationsDeleteButton ({ open, onClose, itemToDelete }) {
  const [showEscalationsDeleteDialog, setEscalationsDeleteDialog] = useState(false)
  return (
    <>
      <Button
        onClick={() => setEscalationsDeleteDialog(true)}
        className="text-no-wrap ms-2"
        variant="outline-black"
      >Delete</Button>
      <EscalationsDeleteDialog open={showEscalationsDeleteDialog} onClose={() => setEscalationsDeleteDialog(false)} />
    </>
  )
}

export default EscalationsDeleteButton
