import { memo } from 'react'
import Modal from 'react-bootstrap/Modal'

function ParserDialog ({ item, open, onClose }) {
  return (
    <Modal
      show={open}
      onHide={onClose}
      dialogClassName="modal-90w modal-lg"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Title
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <div className="py-1 px-2 my-2">
          {JSON.stringify(item)}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default memo(ParserDialog)
