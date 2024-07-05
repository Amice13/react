function Scorecard ({ name, href }) {
  return (
    <div className="d-flex align-center py-2 small">
      <div className="icon-avatar">
        <i className="bi bi-info-circle bg-primary-200 text-orange3-300"></i>
      </div>
      <div className="ps-3 fw-light-bolder">
        { name }
      </div>
    </div>
  )
}

export default Scorecard
