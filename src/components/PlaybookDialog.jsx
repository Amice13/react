import { memo } from 'react'
import Modal from 'react-bootstrap/Modal'
import ParserDialog from '@/components/ParserDialog'

function PlaybookDialog ({ item, open, onClose }) {


  return (
    <Modal
      show={open}
      onHide={onClose}
      dialogClassName="modal-90w modal-lg"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {item.playbookPartsName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <div className="py-1 px-2 my-2">
          <p>
            <strong>Last Updated:</strong> <span>{ new Date(item.updatedAt || item.createdAt).toLocaleDateString() }</span>
          </p>
          {item.primaryClausesName && <p><strong>Clause:</strong> <span>{item.primaryClausesName}</span></p>}
          {item.secondaryClausesName && <p className="pre-text">
            <strong>Sub-Clause:</strong><br />
            {item.secondaryClausesNumber} {item.secondaryClausesName}
          </p>}
          {item.description && <p>
            <strong>Issue</strong><br />
            {item.description}
          </p>}
          {item.action && <p>
            <strong>Action</strong><br />
            {item.action}
          </p>}
          {item.reason && <p>
            <strong>Reason</strong><br />
            {item.reason}
          </p>}
          {item.comment && <p>
            <strong>Comment (external)</strong><br />
            {item.comment}
          </p>}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default memo(PlaybookDialog)
