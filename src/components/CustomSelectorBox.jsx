import { useState } from 'react'

function CustomSelectBox ({ options, selected }) {
  const [selectedOption, selectOption] = useState(selected)
  return (
    <div className="custom-selector">
      { options.map(option => {
        return <div
          key={option}
          onClick={() => selectOption(option)}
          className={option === selectedOption ? 'active' : '' }
        >{option}</div>
      })}
    </div>
  )
}

export default CustomSelectBox
