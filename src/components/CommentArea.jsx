import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'
import { useEffect, useState } from 'react'

const CommentArea = (props) => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  const getComments = async () => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + props.asin,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzRmMWQyYjc0Yjc3ZDAwMTVkM2YwZjAiLCJpYXQiOjE3MzMyMzgwNTksImV4cCI6MTczNDQ0NzY1OX0.zkAb-9aLkKn1nLURNSt1OQ-AElP3wF7pf0IF25cBUV0',
          },
        }
      )
      console.log(response)
      if (response.ok) {
        let comments = await response.json()

        setComments(comments)
        setIsLoading(false)
        setIsError(false)
      } else {
        setIsLoading(false)
        setIsError(true)
      }
    } catch (error) {
      console.log(error)

      setIsLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    getComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin])

  return (
    <div className='text-center'>
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  )
}

export default CommentArea
