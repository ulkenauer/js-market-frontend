import React, { useEffect, Component } from "react";
import { connect } from 'react-redux'
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom'
import { Form } from 'antd'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

import PropTypes from 'prop-types'

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

import '../../styles/App.sass'

const Auth = ({user}) => {

  let history = useHistory()

  useEffect(() => {
    if (user.token !== null) {
      console.log(user.token)
      history.push('/')
    }
  })
  
  let { path, url } = useRouteMatch();


  return (
    <Layout className="layout">

      <Content style={{ padding: '0 50px' }}>

        {/* <div style={{ background: '#fff', padding: 24, minHeight: 280, marginTop: '250px' }}> */}
        <div style={{ position: 'relative', height: "100%" }}>
          {/* <div style={{ background: '#fff', padding: 24, minHeight: 280, position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)', marginRight: '-50%', left: '50%' }}> */}
          <div className="auth-window">

            <Switch>
              <Route path={`${path}/login`} component={Login} exact />
              <Route path={`${path}/register`} component={Register} exact />
              <Route path='*'>
                <Redirect to={`${path}/login`}></Redirect>
              </Route>
            </Switch>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

Auth.propTypes = {
  user: PropTypes.object.isRequired,
}


export default Auth;
