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
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

function Card(posts) {
  const [showComments, setShowComments] = useState(false)
  const [postId, setPostId] = useState(0)
  const [open, setOpen] = useState(false)
  const handleClick = (event, id) => {
    setPostId(id)
    setOpen(!open)
    setShowComments(true)
  }
  const listItems = posts.posts.map(post => {
    return (
      <article>
        <h2 style={{ fontSize: 15, fontFamily: crypto, color: '#1A237E' }}>
          {post.title.toUpperCase()}
        </h2>
        <div style={{ margin: 10, alignItems: 'center', color: '#1A237E' }}>
          {/* /* <ReadMoreReact text={body} max={150} readMoreText={'...read more'} />*/}
          <p>{post.body}</p>
          {open & (postId == post.id) ? (
            <div
              className="comments"
              button
              onClick={event => {
                console.log(post.id)
                handleClick(event, post.id)
              }}
            >
              <div>
                {showComments ? (
                  <CommentsList postId={postId} />
                ) : (
                  <h1
                    style={{
                      fontSize: 15,
                      fontFamily: crypto,
                      color: '#1A237E',
                    }}
                  >
                    loading
                  </h1>
                )}
              </div>
              <ExpandLess />
            </div>
          ) : (
            <div
              className="comments"
              button
              onClick={event => {
                console.log(post.id)
                handleClick(event, post.id)
              }}
            >
              <h1 style={{ fontSize: 15, fontFamily: crypto }}>Comments</h1>
              <ExpandMore />
            </div>
          )}
        </div>
      </article>
    )
  })
  return (
    <div style={{ alignItems: 'center' }}>
      <h1
        style={{
          fontSize: 80,
          fontFamily: 'Spicy Rice',
          margin: 20,
          color: '#dee5d9',
        }}
      >
        ..POSTS..
      </h1>
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
  const [postsFetched, setPostsFetched] = useState(false)
  const [currentPosts, setCurrentPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(3)
  useEffect(() => {
    if (!postsFetched) {
      axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
        console.log(posts)
        setPosts(res.data)
        setLoading(false)
        setPostsFetched(true)
      })
    }
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
            color="primary"
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
