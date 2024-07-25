import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import EscalationsAddDialog from '@/components/EscalationsAddDialog'

function EscalationsAddButton ({ open, onClose }) {
  const [showEscalationsAddDialog, setEscalationsAddDialog] = useState(false)
  return (
    <>
      <Button
        onClick={() => setEscalationsAddDialog(true)}
        className="text-no-wrap btn-yellow"
        variant="outline-black"
      ><i className="bi bi-plus-lg"></i> Add new escalation</Button>
      <EscalationsAddDialog open={showEscalationsAddDialog} onClose={() => setEscalationsAddDialog(false)} />
    </>
  )
}

export default EscalationsAddButton
