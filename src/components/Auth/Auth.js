//VIEW
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from '../../containers/Auth/Login'
import Register from '../../containers/Auth/Register'

import PropTypes from 'prop-types'

import { Layout } from 'antd';
const { Content } = Layout;

const Auth = ({ user }) => {

  let history = useHistory()

  useEffect(() => {
    if (user.token !== null) {
      history.push('/')
    }
  })

  let { path, url } = useRouteMatch();

  return (
    <Layout className="layout">

      <Content style={{ padding: '0 50px' }}>
        <div style={{ position: 'relative', height: "100%" }}>
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
