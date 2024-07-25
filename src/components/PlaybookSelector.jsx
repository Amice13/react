import { useState } from 'react'
import CustomSelect from '@/components/CustomSelect'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch, setFilter } from '@store/escalations'
function PlaybookSelector ({ width }) {
  const dispatch = useDispatch()
  const filters = useSelector(({ escalations }) => escalations.filters)

  return (
    <div style={{ width }}>
      <CustomSelect
        modelValue={filters.playbook}
        onChange={(value) => {dispatch(setFilter({ filter: 'playbook', value }) )}}
        label="Playbook"
        items={['Yes', 'No']}
        id="PlaybookSelector"
        name="PlaybookSelector"
      />
    </div>
  )
}

export default PlaybookSelector
