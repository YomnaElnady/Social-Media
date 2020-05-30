import React, { Component, useState, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router'
import logo from './globe.png'
import './App.css'
import Main from './main'

function Start() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  )
}

function App() {
  const [timer, setTimer] = useState(true)

  setTimeout(() => {
    setTimer(false)
  }, 3000)

  return <div>{timer ? <Start /> : <Main />}</div>
}

export default App
