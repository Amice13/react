
function RadiantTextarea ({ modelValue, onChange, placeholder, label, id, name, type, rows }) {
  return (
    <div className="radiant-input mb-4">
      <label>{ label || ''}</label>
      <div className="form-group">
        <textarea
          value={modelValue}
          onChange={event => onChange(event.target.value)}
          id={ id || '' }
          name={ name || 'name' }
          type={ type || 'text' }
          className="form-control"
          rows={rows || 3}
          placeholder={ placeholder }
          aria-label="from"
          aria-describedby="from"
        />
      </div>
    </div>
  )
}

export default RadiantTextarea
