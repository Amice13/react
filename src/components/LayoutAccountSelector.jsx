import { useState, useEffect } from 'react'
import { $api } from '@api'

import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import generateWorks from '@faker/works'

import { useSelector, useDispatch } from 'react-redux'
import { setClient } from '@store/layout'

function LayoutAccountSelector () {
  const dispatch = useDispatch()
  const client = useSelector(({ layout }) => layout.client)
  const [showDropdown, setDropdown] = useState(false)
  const [clients, setClients] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await $api.data.query('clients', { limit: 1000 })
      if (res.status === 'success') {
        const { records } = res.data
        setClients(records)
      }
    }
    fetchData()
  }, [])

  let buttonTitle = client === 'All accounts' ? 'Select account' : client
  return (
    <div className="ms-auto">
      <Dropdown
        onToggle={(nextShow) => { setDropdown(nextShow) }}
        show={showDropdown}
        style={{ position: 'relative' }}
      >
        <div>{ showDropdown }</div>
        <div className="ms-auto">
          <Button onClick={() => setDropdown(true)} variant="outline-black btn-rounded" size="sm">{ buttonTitle } <i className="ms-2 bi bi-chevron-down"></i></Button>{' '}
        </div>
        <Dropdown.Menu
          style={{ position: 'absolute', top: '40px', right: '0px', maxHeight: '70vh', overflow: 'auto' }}
        >
          <Dropdown.Header>
            <div><strong>Select account</strong></div>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => { dispatch(setClient(null)) }}>All accounts</Dropdown.Item>
          {clients.map(client => {
            return (
                <Dropdown.Item
                  onClick={() => { dispatch(setClient(client)) }}
                  key={client.id}
                >
                  {client.name || '' }
                </Dropdown.Item>
              )
          })}
        </Dropdown.Menu>
      </Dropdown> 
    </div>
  )
}

export default LayoutAccountSelector
