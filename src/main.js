import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { css } from '@emotion/core'
import DotLoader from 'react-spinners/DotLoader'
import './main.css'
import { Pagination } from '@material-ui/lab'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Card(posts) {
  const listItems = posts.posts.map(post => {
    return (
      <article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
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
  const [postsPerPage, setPostsPerPage] = useState(4)

  axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
    setPosts(res.data)
    setLoading(false)
  })
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
              console.log('hi', page)
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
