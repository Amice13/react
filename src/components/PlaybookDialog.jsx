import { memo } from 'react'
import Modal from 'react-bootstrap/Modal'

function PlaybookDialog ({ open, onClose }) {
  return (
    <Modal
      show={open}
      onHide={onClose}
      dialogClassName="modal-90w modal-lg"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          10. Confidentiality (in general)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <div className="bg-tertiary-100 py-2 px-3 my-4">
          <p><strong>Last Updated:</strong> <span>05/04/2024</span></p>
          <p><strong>Clause:</strong> <span>Confidentiality (in general)</span></p>
          <p>
            <strong>Sub-Clause:</strong><br />
            4.1. Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        </div>
        <div>
          <p>
            <strong>Issue</strong><br />
            Request to make changes
          </p>
          <p>
            <strong>Action</strong><br />
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
          </p>
          <p>
            <strong>Reason</strong><br />
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem!
          </p>
          <p>
            <strong>Comment (external)</strong><br />
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam.
          </p>

        </div>
      </Modal.Body>
    </Modal>
  )
}

export default memo(PlaybookDialog)
