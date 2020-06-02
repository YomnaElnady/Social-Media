import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { css } from '@emotion/core'
import DotLoader from 'react-spinners/DotLoader'
import './main.css'
import { Pagination } from '@material-ui/lab'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CommentsList from './Commnets'
import ReadMoreReact from 'read-more-react'

function Card(posts) {
  const [showComments, setShowComments] = useState(false)
  const [postId, setPostId] = useState(0)

  const listItems = posts.posts.map(post => {
    return (
      <article id={Math.random.toString}>
        <h2 style={{ fontSize: 15, fontFamily: crypto }}>{post.title}</h2>
        <div style={{ margin: 10, alignItems: 'center' }}>
          {/* /* <ReadMoreReact text={body} max={150} readMoreText={'...read more'} />*/}
          <p>{post.body}</p>
          <button
            style={{ marginTop: 10 }}
            onClick={() => {
              setPostId(post.id)
              setShowComments(!showComments)
            }}
          >
            Comments
          </button>
        </div>
        <div>
          {showComments ? (
            <CommentsList postId={postId} />
          ) : (
            <DotLoader size={10} color={'white'} loading={showComments} />
          )}
        </div>
      </article>
    )
  })
  return (
    <div>
      <ul className="post-container">{listItems}</ul>
    </div>
  )
}

function Main() {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [currentPosts, setCurrentPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(3)
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
      setPosts(res.data)
      setLoading(false)
    })
  }, [posts])

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage

    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost))
  }, [currentPage, posts])

  const notify = () => toast('Posts loaded successfully!')
  useEffect(() => {
    if (!loading) {
      notify()
    }
  }, [loading])

  return (
    <div>
      {loading ? (
        <DotLoader
          css={override}
          size={100}
          color={'white'}
          loading={loading}
        />
      ) : (
        <div className="container">
          <Card posts={currentPosts} />
          <Pagination
            count={Math.ceil(posts.length / postsPerPage)}
            onChange={(event, page) => {
              setCurrentPage(page)
            }}
          />
          <ToastContainer />
        </div>
      )}
    </div>
  )
}

export default Main
