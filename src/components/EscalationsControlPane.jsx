import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import CustomSelectorBox from '@/components/CustomSelectorBox'
import EscalationsAddButton from '@/components/EscalationsAddButton' 
import PlaybookSelector from '@/components/PlaybookSelector'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch, setFilter } from '@store/escalations'

function debounce (fn, delay = 1000) {
  let timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    let args = arguments
    let that = this
    timeoutID = setTimeout(function () {
      console.log('hlah')
      fn.apply(that, args)
    }, delay)
  }
}

function EscalationsControlPane () {
  const dispatch = useDispatch()
  const search = useSelector(({ escalations }) => escalations.search)
  const filters = useSelector(({ escalations }) => escalations.filters)

  return (
    <Row className="py-2 px-3">
      <Col>
        <Stack direction="horizontal" gap={3}>
          <CustomSelectorBox
            modelValue={filters.status}
            onChange={(value) => {dispatch(setFilter({ filter: 'status', value }) )}}
            items={['Open', 'Closed']}
          />
          <div className="ms-auto">
            <div className="input-group" style={{ width: '300px' }}>
              <input
                value={search}
                onChange={(event) => { debounce(() => { dispatch(setSearch(event.target.value)) })() }}
                type="text"
                className="form-control yellow-input"
                placeholder="Search..."
                aria-label="from"
                aria-describedby="from"
              />
            </div>
          </div>
          { filters.status === 'Open' && <EscalationsAddButton /> }
          {/*{ filters.status === 'Closed' && <PlaybookSelector width="183px" /> }*/}
        </Stack>
      </Col>
    </Row>
  )
}

export default EscalationsControlPane
