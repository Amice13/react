import { memo } from 'react'
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import RadiantTextField from '@/components/RadiantTextField'
import RadiantTextarea from '@/components/RadiantTextarea'
import RadiantSelect from '@/components/RadiantSelect'

const defaultState = {
  matterName: '',
  matterId: '',
  escalationDescription: '',
  escalationContext: '',
  urgent: 'No',
  isPlaybookPosition: 'No',
  playbook: '',
  primaryClause: '',
  issue: '',
  counterpartyMarkup: '',
  counterpartyComment: '',
  radiantMarkup: '',
  radiantRecommendation: ''  
}

function EscalationsDeleteDialog ({ initialState, open, onClose }) {
  const [state, setState] = useState({})
  useEffect(() => {
    if (initialState) {
      setMode('Edit')
      return setState(initialState)
    }
    return setState(defaultState)
  })

  return (
    <Modal
      show={open}
      onHide={onClose}
      aria-labelledby="example-custom-modal-styling-title"
      dialogClassName="width-500"
      centered
    >
      <Modal.Header closeButton className="bg-white">
        <Modal.Title id="example-custom-modal-styling-title">
          Delete Escalation?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-4">
        <div>
          <div className="py-2">
            Are you sure you want to delete this escalation? This action can't be undone
          </div>
          <Stack direction="horizontal" gap={3}>
            <div className="ms-auto mt-4">
              <Button
                onClick={() => onClose(false)}
                className="text-no-wrap"
                variant="outline-black"
              >Cancel</Button>
              <Button
                onClick={() => onClose(true)}
                className="text-no-wrap ms-2"
                variant="danger"
              >Delete</Button>
            </div>
          </Stack>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default memo(EscalationsDeleteDialog)
