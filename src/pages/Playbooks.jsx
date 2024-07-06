import { useNavigate, useMatches } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import CustomSelectorBox from '@/components/CustomSelectorBox'

function Playbooks () {
  const navigate = useNavigate()

  return (
    <>
      <Container fluid>
        <Row className="py-2 px-3">
          <Col>
            <CustomSelectorBox selected="Open" options={['Open', 'Closed', 'Analysis']} />
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <div className="scorecard">
              <Table responsive className="radiant-table mt-4">
                <thead>
                  <tr>
                    <th width="15%">Playbook name <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="15%">Supplier or customer (paper) <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Last updated <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th>Open escalations <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Escalations last 6m <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Changes last 6m <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th width="10%">Date of last approval <i className="bi small bi-caret-down-fill ps-2"></i></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-4">[Customer] Framework Agrement</td>
                    <td>Customer</td>
                    <td>05/04/2024</td>
                    <td>4</td>
                    <td>3</td>
                    <td>3</td>
                    <td>06/04/2024</td>
                    <td>
                      <Button onClick={() => { navigate('/playbook') }} variant="outline-black" size="sm">Browse Playbook</Button>
                    </td>
                    <td>
                      <i className="bi bi-file-pdf-fill text-gray-600" style={{ fontSize: '24px'}}></i>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Playbooks
