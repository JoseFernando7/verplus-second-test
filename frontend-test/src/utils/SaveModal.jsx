import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import { sendUser } from '../service/postUser'

SaveModal.propTypes = {
  /**
   * The info of the other column selected by the user.
   */
  response1: PropTypes.array,
  /**
   * The info of the rank column selected by the user.
   */
  response2: PropTypes.array
}

/**
 * Component that shows and hides a modal to save a query. It creates a JavaScript object with the informatio of the modal (username, query_name, comment and query columns information).
 * @component
 * @param {*} {} - An object with the info of the other column selected by the user.
 * @returns - JSX.Element that renders the modal.
 */
function SaveModal ({ response1, response2 }) {
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    queries: [
      {
        query_name: '',
        other_column: '',
        rank_column: '',
        comment: ''
      }
    ]
  })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Handles the change of the inputs of the modal.
  const handleChange = (e) => {
    const { name, value } = e.target

    // Set username in the object
    if (name === 'username') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }))
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        queries: [
          {
            ...prevFormData.queries[0],
            [name]: value
          }
        ]
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Add response1 and response2 to the formData
    const newData = {
      ...formData,
      queries: [
        {
          ...formData.queries[0],
          other_column: response1,
          rank_column: response2
        }
      ]
    }

    // Clean all the inputs and alerts the user that the query was saved
    setFormData({
      username: '',
      queries: [
        {
          query_name: '',
          other_column: '',
          rank_column: '',
          comment: ''
        }
      ]
    })

    const serverResponse = await sendUser(newData)
    alert(serverResponse)

    handleClose()
  }

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Query</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Write here your username'
                name='username'
                autoFocus
                onChange={handleChange}
                value={formData.username}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Query name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Type here the name you want to save your query'
                name='query_name'
                onChange={handleChange}
                value={formData.queries[0].query_name}
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Comment</Form.Label>
              <Form.Control as='textarea' rows={3} name='comment' onChange={handleChange} value={formData.queries[0].comment} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant='primary' onClick={handleSubmit}>
            Save Query
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SaveModal
