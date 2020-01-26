import React, { Component, useState, useEffect } from "react";
import { connect } from 'react-redux'
import '../styles/App.sass';
import User from '../containers/User'
import { useLocation, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const App = ({ user, logout }) => {
  
  let location = useLocation()

  let history = useHistory()

  useEffect(() => {
    if (user.token === null) {
      history.push('/auth')
    }
  })
  // simple route guard

  return (
    <div>
      <h1>Init!</h1>
      <button onClick={logout}>logout</button>
        {/* <UserCard user={{ phone: 31224 }}></UserCard> */}
        <User></User>
    </div>
)}


App.propTypes = {
  user: PropTypes.object.isRequired,
}

export default App;