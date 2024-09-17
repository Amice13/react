import { useState } from 'react'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'

function LayoutAvatar ({ name, href }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [showDropdown, setDropdown] = useState(false)
  return (
    <div className="position-relative">
      <i className="bi bi-bell-fill text-gray-600" style={{ fontSize: '22px', color: 'grey' }}></i>
      <div id="redDot"></div>
    </div>
  )
}

export default LayoutAvatar
