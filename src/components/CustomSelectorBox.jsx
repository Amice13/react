import { useState } from 'react'

function CustomSelectBox ({ modelValue, onChange, items }) {
  items = items || []
  return (
    <div className="custom-selector">
      { items.map(item => {
        return <div
          key={item}
          onClick={() => onChange(item)}
          className={item === modelValue ? 'active' : '' }
        >{item}</div>
      })}
    </div>
  )
}

export default CustomSelectBox
