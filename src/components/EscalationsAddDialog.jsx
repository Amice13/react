import { memo } from 'react'
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import RadiantTextField from '@/components/RadiantTextField'
import RadiantTextarea from '@/components/RadiantTextarea'
import RadiantSelect from '@/components/RadiantSelect'

const defaultState = {
  matterName: '',
  matterId: '',
  escalationDescription: '',
  escalationContext: '',
  urgent: 'No',
  isPlaybookPosition: 'No',
  playbook: '',
  primaryClause: '',
  issue: '',
  counterpartyMarkup: '',
  counterpartyComment: '',
  radiantMarkup: '',
  radiantRecommendation: ''  
}

function EscalationsAddDialog ({ initialState, open, onClose }) {
  const [mode, setMode] = useState('Add New')
  const [state, setState] = useState({})
  useEffect(() => {
    if (initialState) {
      setMode('Edit')
      return setState(initialState)
    }
    return setState(defaultState)
  })

  return (
    <Modal
      show={open}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="">
          Add New Escalation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-4">
        <div>
          <Form>
            <RadiantTextField
              modelValue={state.matterName}
              onChange={event => setState(state => { return { ...state, matterName: event }})}
              placeholder="[Customer] - Framework Agreement"
              label="Matter name *"
              id="matterName"
              name="matterName"
            />
            <RadiantTextField
              modelValue={state.matterId}
              onChange={event => setState(state => { return { ...state, matterId: event }})}
              placeholder="XXXXXXXX"
              label="Matter ID *"
              id="matterId"
              name="matterId"
            />
            <RadiantTextarea
              modelValue={state.escalationDescription}
              onChange={event => setState(state => { return { ...state, escalationDescription: event }})}
              label="Escalation description *"
              id="escalationDescription"
              name="escalationDescription"
              rows="8"
            />
            <RadiantTextarea
              modelValue={state.escalationContext}
              onChange={event => setState(state => { return { ...state, escalationContext: event }})}
              label="Escalation context *"
              id="escalationContext"
              name="escalationContext"
              rows="3"
            />
            <RadiantSelect
              modelValue={state.urgent}
              onChange={event => setState(state => { return { ...state, urgent: event }})}
              label="Urgent *"
              items={['Yes', 'No']}
              id="urgent"
              name="urgent"
            />
            <RadiantSelect
              modelValue={state.isPlaybookPosition}
              onChange={event => setState(state => { return { ...state, isPlaybookPosition: event }})}
              label="Does this escalation relate to a playbook position"
              items={['Yes', 'No']}
              id="isPlaybookPosition"
              name="isPlaybookPosition"
            />
            {state.isPlaybookPosition === 'Yes' &&
              <div>
                <RadiantSelect
                  modelValue={state.playbook}
                  onChange={event => setState(state => { return { ...state, playbook: event }})}
                  label="Playbook *"
                  items={['Yes', 'No']}
                  id="playbook"
                  name="playbook"
                />
                <RadiantSelect
                  modelValue={state.primaryClause}
                  onChange={event => setState(state => { return { ...state, primaryClause: event }})}
                  label="Primary clause/Theme *"
                  items={['Yes', 'No']}
                  id="primaryClause"
                  name="primaryClause"
                />
                <RadiantTextField
                  modelValue={state.issue}
                  onChange={event => setState(state => { return { ...state, issue: event }})}
                  placeholder="[Customer] - Framework Agreement"
                  label="Issue *"
                  id="issue"
                  name="issue"
                />
                <RadiantTextarea
                  modelValue={state.counterpartyMarkup}
                  onChange={event => setState(state => { return { ...state, counterpartyMarkup: event }})}
                  label="Counterparty's Mark-up"
                  id="counterpartyMarkup"
                  name="counterpartyMarkup"
                  rows="4"
                />
                <RadiantTextarea
                  modelValue={state.counterpartyComment}
                  onChange={event => setState(state => { return { ...state, counterpartyComment: event }})}
                  label="Counterparty's Comment"
                  id="counterpartyComment"
                  name="counterpartyComment"
                  rows="4"
                />
                <RadiantTextarea
                  modelValue={state.radiantMarkup}
                  onChange={event => setState(state => { return { ...state, radiantMarkup: event }})}
                  label="Radiant's Proposed Mark-up"
                  id="radiantMarkup"
                  name="radiantMarkup"
                  rows="4"
                />                
              </div>
            }
            <RadiantTextarea
              modelValue={state.radiantRecommendation}
              onChange={event => setState(state => { return { ...state, radiantRecommendation: event }})}
              label="Radiant's Recommendation"
              id="radiantRecommendation"
              name="radiantRecommendation"
              rows="2"
            />
          </Form>
          <Stack direction="horizontal" gap={3}>
            <div className="ms-auto mt-2">
              <Button
                onClick={() => onClose(false)}
                className="text-no-wrap"
                variant="outline-black"
              > Cancle</Button>
              <Button
                onClick={() => onClose(true)}
                className="text-no-wrap btn-yellow ms-2"
                variant="outline-black"
              >Save</Button>
            </div>
          </Stack>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default memo(EscalationsAddDialog)
