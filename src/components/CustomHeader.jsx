import { useNavigate, useMatches } from 'react-router-dom'

function CustomHeader ({ title, url, goTo }) {
  const navigate = useNavigate()

  return (
    <div className="d-flex align-center custom-header">
      <h4 className="flex-grow-1">{ title }</h4>
      <a
        onClick={() => {goTo(url)}}
        className="more-link fw-600 gray"
        href="#"
      >See all <i className="bi bi-arrow-right"></i></a>
    </div>
  )
}

export default CustomHeader
