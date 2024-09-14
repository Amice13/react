import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import EscalationsDeleteButton from '@/components/EscalationsDeleteButton'

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 10000)
  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + ' years ago'
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + ' months ago'
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + ' days ago'
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + ' hours ago'
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + ' minutes ago'
  return Math.floor(seconds) + ' seconds ago'
}


import { $api } from '@api'

function Escalations ({ id }) {
  const navigate = useNavigate()
  const user = useSelector(({ layout }) => layout)

  let [comments, setComments] = useState([])
  const [commentsLoader, setCommentsLoader] = useState(true)

  let [playbook, setPlaybook] = useState({})


  useEffect(() => {
    async function fetchData() {
      setCommentsLoader(true)
      const res = await $api.data.query('comments', {
        limit: 100,
        sort: 'createdAt',
        filters: {
          entityType: 'escalations',
          entityId: id
        },
        populate: {
          users: ['givenName', 'familyName']
        }
      })
      if (res.status === 'success') setComments(res.data.records)
      setCommentsLoader(false)
    }
    fetchData()
  }, [id])

  const getPlaybook = async () => {
    if (Object.keys(playbook).length) return false
      const res = await $api.data.query('comments', {
        limit: 100,
        sort: 'createdAt',
        filters: {
          entityType: 'escalations',
          entityId: id
        },
        populate: {
          users: ['givenName', 'familyName']
        }
      })
    
  }

  const sendComment = async () => {
    const body = {}
    body.message = document.querySelector('#text-box').innerHTML
    if (!body.message || body.message === 'Write a comment...') return false
    body.entityType = 'escalations'
    body.entityId = id
    const result = await $api.data.upsertOne('comments', body)
    if (result.status !== 'success') return alert('Can\'t save the comment')
    body.id = result.data
    body.createdAt = Date.parse(new Date())
    let [usersGivenName, usersFamilyName] = user.username.split(/ /)
    body.usersGivenName = usersGivenName || ''
    body.usersFamilyName = usersFamilyName || ''
    setComments((state) => {
      return [...state, body]
    })
  }

  const removeComment = async (id) => {
    let index = comments.map(el => el.id).indexOf(id)
    if (index === -1) return alert('This comment does not exist')
    const result = await $api.data.deleteById('comments', id)
    if (result.status !== 'success') return alert('Can\'t delete the comment')
    setComments((state) => {
      const newState = JSON.parse(JSON.stringify(state))
      newState.splice(index, 1)
      return newState
    })
  }

  return (
    <>
      <Col className="col-5">
        <Row>
          <Col>
            <h5 className="fw-bolder mb-4">Activity {id}</h5>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <div className="bg-gray-200 px-4 py-2 rounded-3">
              <strong>Created</strong>
              <span className="text-gray-700 ms-2">{ new Date().toLocaleString('sv-SE')}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="bg-gray-200 px-4 py-2 rounded-3">
              <strong>Assigned to Inhouse Legal Advisor: {JSON.stringify({})}</strong>
              <span className="text-gray-700 ms-2">2024-06-01 10:00 AM</span>
            </div>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <div className="d-flex">
              <div>
                <div
                  className="bg-primary-900 rounded-circle d-flex align-items-center"
                  style={{ width: '36px', height: '36px' }}
                ><span className="text-center w-100 text-white fw-600">E</span></div>
              </div>
              <div className="bg-tertiary-200 ms-3 flex-grow-1 py-3 px-3">
                <div>
                  <span className="fw-600">Emily</span>
                  <span className="small text-gray-500 ms-2">2 days ago</span>
                </div>
                <div className="small">Can you please send me the original intake form?</div>
                <div className="text-end small fw-600 text-orange2-300">Reply</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <div className="d-flex">
              <div style={{ paddingLeft: '48px' }}>
                <div
                  className="bg-orange1-600 rounded-circle d-flex align-items-center"
                  style={{ width: '36px', height: '36px', position: 'relative' }}
                >
                  <div style={{ top: '-36px', left: '-30px', position: 'absolute', width: '28px', height: '56px', borderLeft: '1px solid #ccc', borderBottom: '1px solid #DDD', borderRadius: '0px 0px 0px 20px' }}></div>
                  <span className="text-center w-100 text-white fw-600">R</span>
                </div>
              </div>
              <div className="bg-tertiary-200 ms-3 flex-grow-1 py-3 px-3">
                <div>
                  <span className="fw-600">Radiant</span>
                  <span className="small text-gray-500 ms-2">1 day ago</span>
                </div>
                <div className="small">The original intake form has been sent</div>
                <div className="text-end small fw-600 text-orange2-300">Reply</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <div className="bg-gray-200 px-4 py-2 rounded-3">
              <strong>Radiant provided comment</strong>
              <span className="text-gray-700 ms-2">2024-06-05 04:00 PM</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="bg-gray-200 px-4 py-2 rounded-3">
              <strong>Request further information</strong>
              <span className="text-gray-700 ms-2">2024-06-01 05:00 PM</span>
            </div>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <div className="d-flex">
              <div>
                <div
                  className="bg-primary-900 rounded-circle d-flex align-items-center"
                  style={{ width: '36px', height: '36px' }}
                ><span className="text-center w-100 text-white fw-600">E</span></div>
              </div>
              <div className="bg-tertiary-200 ms-3 flex-grow-1 py-3 px-3">
                <div>
                  <span className="fw-600">Emily</span>
                  <span className="small text-gray-500 ms-2">2 days ago</span>
                </div>
                <div className="small">Can you please provide me the client contract details?</div>
                <div className="text-end small fw-600 text-orange2-300">Reply</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <div className="d-flex">
              <div style={{ paddingLeft: '48px' }}>
                <div
                  className="bg-orange1-600 rounded-circle d-flex align-items-center"
                  style={{ width: '36px', height: '36px', position: 'relative' }}
                >
                  <div style={{ top: '-36px', left: '-30px', position: 'absolute', width: '28px', height: '56px', borderLeft: '1px solid #ccc', borderBottom: '1px solid #DDD', borderRadius: '0px 0px 0px 20px' }}></div>
                  <span className="text-center w-100 text-white fw-600">R</span>
                </div>
              </div>
              <div className="bg-tertiary-200 ms-3 flex-grow-1 py-3 px-3">
                <div>
                  <span className="fw-600">Radiant</span>
                  <span className="small text-gray-500 ms-2">2 days ago</span>
                </div>
                <div className="small">The client contract details are atttached</div>
                <div className="text-end small fw-600 text-orange2-300">Reply</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <div className="bg-gray-200 px-4 py-2 rounded-3">
              <strong>Radiant provided comment</strong>
              <span className="text-gray-700 ms-2">2024-06-05 04:00 PM</span>
            </div>
          </Col>
        </Row>

        {comments.map(comment => {
          return (
            <Row className="my-4" key={comment.id}>
              <Col>
                <div className="d-flex">
                  <div>
                    <div
                      className="bg-primary-900 rounded-circle d-flex align-items-center"
                      style={{ width: '36px', height: '36px' }}
                    ><span className="text-center w-100 text-white fw-600">{comment.usersGivenName[0]}</span></div>
                  </div>
                  <div className="bg-tertiary-200 ms-3 flex-grow-1 py-3 px-3">
                    <div>
                      <span className="fw-600">{comment.usersGivenName} {comment.usersFamilyName}</span>
                      <span className="small text-gray-500 ms-2">{timeSince(new Date(comment.createdAt))}</span>
                    </div>
                    <div className="small">{comment.message}</div>
                    <div className="d-flex w-100 justify-content-end">
                      <div
                        onClick={() => { removeComment(comment.id) }}
                        className="text-end small fw-600 text-orange2-300 cursor-pointer me-2"
                      >
                        Delete
                      </div>
                      <div className="text-end small fw-600 text-orange2-300 cursor-pointer">Reply</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )
        })}


        <hr className="my-4"/>
        <Row className="mb-3">
          <Col>
            <div className="px-2 py-2 rounded-3 d-flex" style={{ border: '1px solid #ddd' }}>
              <div
                id="text-box"
                contentEditable="true"
                suppressContentEditableWarning={true}
                className="text-gray-600 flex-grow-1 px-2"
                onFocus={(el) => {
                  let text = el.target.innerHTML
                  if (text === 'Write a comment...') { el.target.innerHTML = '' }
                }}
                onBlur={(el) => {
                  let text = el.target.innerHTML
                  if (!text) { el.target.innerHTML = 'Write a comment...' }
                }}
                style={{ maxWidth: 'calc(100% - 110px)', border: '0px'}}
              >Write a comment...</div>
              <div>
                <i className="bi bi-image-fill text-gray-600 me-2"></i>
                <i className="bi bi-paperclip text-gray-600 me-2"></i>
                <i className="bi bi-emoji-smile text-gray-600 me-2"></i>
                <span className="me-2">|</span>
                <i
                  onClick={() => { sendComment() }}
                  className="bi bi-send-fill text-orange1-700 cursor-pointer"
                ></i>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default Escalations
