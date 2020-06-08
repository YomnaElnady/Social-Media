import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './comments.css'
import { css } from '@emotion/core'
import DotLoader from 'react-spinners/DotLoader'

function CommentsList(id) {
  const override = css`
    display: block;
    border-color: red;
  `
  const [comments, setComments] = useState([])
  const [commentsFetched, setCommentsFetched] = useState(false)
  const [showComments, setShowComments] = useState(false)
  useEffect(() => {
    if (!commentsFetched) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${id.postId}/comments`)
        .then(res => {
          setComments(res.data)
          setShowComments(true)
          setCommentsFetched(true)
        })
    }
  }, [comments])

  const listItems = comments.map(comment => {
    console.log(id.postId, comment.body)
    return (
      <div className="comment">
        <h1
          style={{
            fontSize: 9,
            fontFamily: crypto,
            color: '#1A237E',
            margin: 10,
          }}
        >
          {comment.name}
        </h1>
        <p style={{ fontSize: 8, fontFamily: crypto, color: '#1A237E' }}>
          {comment.body}
        </p>
      </div>
    )
  })
  return (
    <div className="comment-container">
      {showComments ? <ul>{listItems}</ul> : <p>Loading...</p>}
    </div>
  )
}

export default CommentsList
