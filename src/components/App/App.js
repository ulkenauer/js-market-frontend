import React, { Component, useState, useEffect } from "react";
import { connect } from 'react-redux'
import '../../styles/App.sass';
import User from '../../containers/User'
import { useRouteMatch, useLocation, useHistory, Link, Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Layout, Menu, Icon, Badge } from 'antd';
import Profile from "./Profile";
import Basket from "./Basket";
import Market from "./Market";
import Product from "./Product";
import { createPortal } from "react-dom";

const { Header, Sider, Content } = Layout;

const App = ({ fetchBasket, user, logout, basket }) => {
  
  let location = useLocation()
  let { path, url } = useRouteMatch();

  const [flag, setFlag] = useState(false)

  if (!flag) {
    fetchBasket()
    setFlag(true)
  }

  let history = useHistory()

  useEffect(() => {
    if (user.token === null) {
      history.push('/auth')
    }
  })
  // simple route guard

  const [collapsed, setCollapsed] = useState(true)

  let routePatterns = [
    {regex: /^\/profile$/, id: '1'},
    {regex: /^\/basket$/, id: '2'},
    {regex: /^\/market(\/product\/[0-9]+)?$/, id: '3'},
  ]

  const getRouteId = function () {
    let routeId = null
    _.each(routePatterns, pattern => {
      if (location.pathname.match(pattern.regex) !== null) {
        routeId = pattern.id
        return
      }
    })
    return routeId
  }

  const toggle = function ()
  {
    setCollapsed(!collapsed)
  }

  return (
<Layout style={{minHeight: '100%', transition: 'all 0.2s', marginLeft: collapsed ? 80 : 200}} /* className="layout" */ id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={collapsed} style={{
        overflow: 'hidden',
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
              {/* <Badge style={{position: 'absolute'}} count={5}>
              </Badge> */}
          <Menu selectedKeys={[getRouteId()]} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          
          <Menu.Item key="1">
            <Link to={{pathname: '/profile'}}>
              <Icon type="user" />
              <span>Профиль</span>
            </Link>
          </Menu.Item>
          <Menu.Item style={{overflow: 'visible'}} title="Корзина" key="2">
            <Link to={{ pathname: '/basket' }}>
            <Badge style={{right: (collapsed ? '-35px' : '-155px'), position:'absolute'}} count={basket.products.length} />
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
            <Route path="/market/product/:id" component={Product} exact />
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
  basket: PropTypes.object.isRequired,
}

export default App;