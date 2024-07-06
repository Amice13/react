import { useState } from 'react'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'

function GlobalAvatar ({ name, href }) {
  const user = localStorage.getItem('user')
  const [showDropdown, setDropdown] = useState(false)
  return (
    <div className="avatar">
      <Dropdown
        onToggle={(nextShow) => { setDropdown(nextShow) }}
        show={showDropdown}
        style={{ position: 'relative' }}
      >
    <div>{ showDropdown }</div>
        <Image
          onClick={() => setDropdown(true)}
          src={user ? user.profilePhotoUrl : 'https://avatar.iran.liara.run/public'}
          style={{ cursor: 'pointer' }}
          width="40"
          rounded
        />
        <Dropdown.Menu
          style={{ position: 'absolute', top: '40px', right: '0px' }}
        >
          <Dropdown.Header>
            <div><strong>{ user ? user.fullName : 'Uknnown user' }</strong></div>
            <div className="small">{ user ? user.email : 'email@domain.com' }</div>
          </Dropdown.Header>
          <Dropdown.Item>Another action</Dropdown.Item>
          <Dropdown.Item>Something else here</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default GlobalAvatar
