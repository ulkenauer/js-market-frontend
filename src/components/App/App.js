import React, { Component, useState, useEffect } from "react";
import { connect } from 'react-redux'
import '../../styles/App.sass';
import User from '../../containers/User'
import { useRouteMatch, useLocation, useHistory, Link, Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Layout, Menu, Icon } from 'antd';
import Profile from "./Profile";
import Basket from "./Basket";
import Market from "./Market";

const { Header, Sider, Content } = Layout;

const App = ({ user, logout }) => {
  
  let location = useLocation()
  let { path, url } = useRouteMatch();

  let history = useHistory()

  useEffect(() => {
    if (user.token === null) {
      history.push('/auth')
    }
  })
  // simple route guard

  const [collapsed, setCollapsed] = useState(true)

  let routeMap = {}

  console.log(location)
  console.log(path)
  console.log(url)

  routeMap[`${path}/profile`] = '1'
  routeMap[`${path}/basket`] = '2'
  routeMap[`${path}/market`] = '3'

  routeMap = _.mapKeys(routeMap, (idx, route) => route.replace('//', '/'))

  const toggle = function ()
  {
    setCollapsed(!collapsed)
  }

  return (
<Layout style={{minHeight: '100%', transition: 'all 0.2s', marginLeft: collapsed ? 80 : 200}} /* className="layout" */ id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={collapsed} style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
        {/* <div className="logo" /> */}
        <Icon
              className="trigger my-trigger"
            /* type={collapsed ? 'menu-unfold' : 'menu-fold'} */
              type={collapsed ? 'right' : 'left'}
              onClick={toggle}
            />
          <Menu selectedKeys={[routeMap[location.pathname]]} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          
          <Menu.Item key="1">
            <Link to={{pathname: '/profile'}}>
              <Icon type="user" />
              <span>Профиль</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
          <Link to={{pathname: '/basket'}}>
              <Icon type="shopping-cart" />
              <span>Корзина</span>
              </Link>
            </Menu.Item>
          <Menu.Item key="3">
          <Link to={{pathname: '/market'}}>
              <Icon type="shopping" />
              <span>Товары</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
          {/* Content */}
          <Switch>
            <Route path="/profile" component={Profile} exact />
            <Route path="/basket" component={Basket} exact />
            <Route path="/market" component={Market} exact />
            <Route path="*">
              <Redirect to={{ pathname: "/profile" }} />
            </Route>
          </Switch>
        </Content>
        </Layout>
      </Layout>

  )

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