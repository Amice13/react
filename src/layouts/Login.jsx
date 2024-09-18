import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const layout = ({ children }) => {
  const currentUser = useSelector(({ layout }) => layout.usersId)
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof currentUser === 'number' && currentUser >= 0) return navigate('/')
  }, [currentUser])

  return (
    <>
    <div className="h-100 d-flex flex-column bg-white justify-content-center">
      {children}
    </div>
    </>
  )
}

export default layout
