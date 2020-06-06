import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import axios from 'axios'
import './main.css'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

export default function NestedList() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [postId, setId] = React.useState(0)
  const handleClick = (event, id) => {
    console.log(id)
    setId(id)
    setOpen(!open)
  }
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
      setLoading(false)
      setPosts(res.data)
    })
  }, [loading])
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Poasts
        </ListSubheader>
      }
      className={classes.root}
    >
      {posts.map(post => {
        return (
          <div className="container">
            <ListItem
              button
              onClick={event => {
                console.log(post.id)
                handleClick(event, post.id)
              }}
            >
              <h2 style={{ fontSize: 15, fontFamily: crypto }}>{post.title}</h2>
              <p>{post.body}</p>
              {open & (postId == post.id) ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={open & (postId == post.id)}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  {loading ? (
                    <h2>loading..</h2>
                  ) : (
                    <ListItemText primary={posts[2].id} />
                  )}
                </ListItem>
              </List>
            </Collapse>
          </div>
        )
      })}
    </List>
  )
}
