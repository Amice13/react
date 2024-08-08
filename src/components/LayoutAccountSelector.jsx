import { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import generateWorks from '@faker/works'

import { useSelector, useDispatch } from 'react-redux'
import { setAccount } from '@store/layout'
import db from '@/db'

function LayoutAccountSelector () {
  const dispatch = useDispatch()
  const account = useSelector(({ layout }) => layout.account)
  const [showDropdown, setDropdown] = useState(false)
  const [worksLoader, setWorksLoader] = useState(true)
  const [works, setWorks] = useState([])


  useEffect(() => {
    async function fetchData() {
      if (process.env.IS_DEV) {
        let currentWorks = generateWorks(30)
        setWorks(currentWorks.records)
        setWorksLoader(false)
        return false
      }
      let currentWorks = await db.search('Works', { maxRecords: 100, pageSize: 100 })
      if (currentContacts.records) setWorks(currentContacts.records)        
      setWorksLoader(false)
    }
    fetchData()
  }, [])

  let buttonTitle = account === 'All accounts' ? 'Select account' : account
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
            <div><strong>Selet account</strong></div>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => { dispatch(setAccount('All accounts')) }}>All accounts</Dropdown.Item>
          {works.map(work => {
            return (
                <Dropdown.Item onClick={() => { dispatch(setAccount(work.fields?.Name)) }} key={work.id}>{work.fields?.Name || '' }</Dropdown.Item>
              )
          })}
        </Dropdown.Menu>
      </Dropdown> 
    </div>
  )
}

export default LayoutAccountSelector
