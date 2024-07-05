function CustomHeader ({ title, url }) {
  return (
    <div className="d-flex align-center custom-header">
      <h4 className="flex-grow-1">{ title }</h4>
      <a className="more-link fw-600 gray" href={url}>See all <i className="bi bi-arrow-right"></i></a>
    </div>
  )
}

export default CustomHeader
