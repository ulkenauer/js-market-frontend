//VIEW
import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link, Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Layout, Menu, Icon, Badge } from 'antd';

import loadable from '@loadable/component'

const Profile = loadable(() => import('../../containers/App/Profile'))
const Basket = loadable(() => import('../../containers/App/Basket'))
const Market = loadable(() => import('../../containers/App/Market'))
const Product = loadable(() => import('../../containers/App/Product'))

const { Header, Sider, Content } = Layout;

const App = ({ fetchBasket, user, basket }) => {
  
  let location = useLocation()

  //fetch basket only once (initialize)
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
<Layout style={{minHeight: '100%', transition: 'all 0.2s', marginLeft: collapsed ? 80 : 200}} id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={collapsed} style={{
        overflow: 'hidden',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
        
        <Icon
              className="trigger my-trigger"
              type={collapsed ? 'right' : 'left'}
              onClick={toggle}
        />
        
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

  )}


App.propTypes = {
  user: PropTypes.object.isRequired,
  basket: PropTypes.object.isRequired,
}

export default App;