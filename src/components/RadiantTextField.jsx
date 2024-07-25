
function RadiantTextField ({ modelValue, onChange, placeholder, label, id, name, type }) {
  return (
    <div className="radiant-input mb-4">
      <label>{ label || ''}</label>
      <div className="input-group">
        <input
          value={modelValue}
          onChange={event => onChange(event.target.value)}
          id={ id || '' }
          name={ name || 'name' }
          type={ type || 'text' }
          className="form-control"
          placeholder={ placeholder }
          aria-label="from"
          aria-describedby="from"
        />
      </div>
    </div>
  )
}

export default RadiantTextField
