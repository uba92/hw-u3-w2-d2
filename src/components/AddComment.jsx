import { Button, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const AddComment = (props) => {
  const [comment, setComment] = useState({
    comment: '',
    rate: 1,
    elementId: props.asin,
  })

  const sendComment = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(comment),
          headers: {
            'Content-type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzRmMWQyYjc0Yjc3ZDAwMTVkM2YwZjAiLCJpYXQiOjE3MzMyMzgwNTksImV4cCI6MTczNDQ0NzY1OX0.zkAb-9aLkKn1nLURNSt1OQ-AElP3wF7pf0IF25cBUV0',
          },
        }
      )
      if (response.ok) {
        alert('Recensione inviata!')
        setComment(comment)
      } else {
        throw new Error('Qualcosa è andato storto')
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    setComment({ ...comment, elementId: props.asin })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin])

  return (
    <div className='my-3'>
      <Form onSubmit={sendComment}>
        <Form.Group className='mb-2'>
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type='text'
            placeholder='Inserisci qui il testo'
            value={comment.comment}
            onChange={(e) =>
              setComment({ ...comment, comment: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as='select'
            value={comment.rate}
            onChange={(e) =>
              setComment({
                ...comment,
                rate: e.target.value,
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Invia
        </Button>
      </Form>
    </div>
  )
}

export default AddComment
