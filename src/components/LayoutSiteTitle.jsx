import { useSelector } from 'react-redux'

function LayoutAccountSelector ({ pageName }) {
  const usersId = useSelector(({ layout }) => layout.usersId)
  const client = useSelector(({ layout }) => layout.client)
  // If not authenticated return login page
  const name = typeof usersId === 'number' && usersId >= 0 ? `${client} - ${pageName}` : 'Radiant Law'
  return (
    <h3 className="mb-0">{name}</h3>
  )
}

export default LayoutAccountSelector
