import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { $auth } from '@api'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'

const imageUrlToBase64 = async url => {
  const response = await fetch(url)
  const blob = await response.blob()
  return new Promise((onSuccess, onError) => {
    try {
      const reader = new FileReader()
      reader.onload = function(){ onSuccess(this.result) }
      reader.readAsDataURL(blob)
    } catch(e) {
      onError(e)
    }
  })
}


function LayoutAvatar ({ name, href }) {
  const user = useSelector(({ layout }) => layout)
  const [showDropdown, setDropdown] = useState(false)
  const [image, setImage] = useState('')

  const navigate = useNavigate()
  const logoutHandler = async () => {
    await $auth.logout()
    navigate('/login')
  }

  useEffect(() => {
  let userImage = user.userImage ? user.userImage.replace(/=[^=]+$/, '') : 'https://avatar.iran.liara.run/public'
    const getImage = async () => {
      if (!userImage || !userImage.match(/googleusercontent/)) return setImage(userImage)
      const image = await imageUrlToBase64(userImage)
      return setImage(image)
    }

    getImage()    
  }, [])

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
          src={image}
          style={{ cursor: 'pointer' }}
          className="rounded-circle"
          width="40"
        />
        <Dropdown.Menu
          style={{ position: 'absolute', top: '40px', right: '0px' }}
        >
          <Dropdown.Header>
            <div><strong>{ user.username || 'Uknnown user' }</strong></div>
            <div className="small">{ user.email || 'email@domain.com' }</div>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => { logoutHandler() }}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default LayoutAvatar
