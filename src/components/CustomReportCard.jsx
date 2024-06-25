import Report from '@/assets/report.jpg'

function CustomHeader ({ date, description, url }) {
  return (
    <div className="reportcard">
      <div className="d-flex px-2 pt-2">
        <div className="fw-bold small">
          <div className="report-holder">
            <img src={Report} className="report" alt="Report" />
          </div>
        </div>
        <div className="small flex-grow-1 ps-3">
          <div className="fw-light-bolder">Report</div>
          <div className="small gray">{ date }</div>
        </div>
      </div>
      <div className="small py-3 ps-2 report-text">{ description }</div>
      <div className="text-end small fw-light-bolder small">
        <a className="more-link dark-gray" href={url}>
          View report <i className="bi bi-arrow-right mx-2 font-weight-bold"></i>
        </a>
      </div>
    </div>
  )
}

export default CustomHeader
