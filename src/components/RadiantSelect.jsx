function RadiantSelect ({
  modelValue,
  onChange,
  placeholder,
  label,
  id,
  name,
  items,
  itemTitle,
  itemValue,
  type,
  returnObject,
  allowUndefined,
  undefinedTitle
}) {
  // Processing of the item list
  items = items || []
  if (typeof items[0] === 'string') {
    itemValue = 'value'
    itemTitle = 'title'
    items = items.map(el => { return { title: el, value: el }})
  }
  itemValue = itemValue || 'value'
  itemTitle = itemTitle || 'title'

  // Processing of the selected value
  let defaultValue = modelValue
  if (typeof defaultValue == 'object') {
    defaultValue = defaultValue[itemValue]
  }

  // Setter definition
  const setSelect = value => {
    if (!returnObject) return onChange(value)
    let item = items.find(el => el[itemValue] === value)
    onChange(item)
  }
  return (
    <div className="radiant-input mb-4">
      <label>{ label || ''}</label>
      <div className="input-group">
        <select
          defaultValue={defaultValue}
          onChange={event => setSelect(event.target.value)}
          id={ id }
          name={ name }
          className="form-select form-control fw-600"
          aria-label="from"
          aria-describedby="from"
        >
          {allowUndefined && <option value={undefined}>{undefinedTitle}</option>}
          { items.map(item => {
            return (
              <option key={item[itemValue]} value={item[itemValue]}>{item[itemTitle]}</option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default RadiantSelect
