import { useSelector } from 'react-redux'

function LayoutAccountSelector ({ pageName }) {
  const account = useSelector(({ layout }) => layout.account)
  return (
    <h3>{account} - {pageName}</h3>
  )
}

export default LayoutAccountSelector
