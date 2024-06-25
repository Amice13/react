function Scorecard ({ name, value, indicator, type, percent, period }) {
  return (
    <div className="scorecard">
      <div className="d-flex">
        <div className="fw-bold small flex-grow-1">{ name }</div>
        <div className={`fw-bold small text-${type}`}><i className={`bi bi-arrow-${indicator}`}></i> { percent }</div>
      </div>
      <div className="small-1 gray">{ period } <i className="bi bi-info-circle"></i></div>
      <div className="fw-bold fs-5 my-2">{ value }</div>
    </div>
  )
}

export default Scorecard
