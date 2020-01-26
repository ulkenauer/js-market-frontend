import fetch from 'cross-fetch'
export const REQUEST_IDENTITY = 'REQUEST_IDENTITY'
function requestIdentity() {
  return {
    type: REQUEST_IDENTITY,
    phone: 'gittin phon',
  }
}

export const RECEIVE_IDENTITY = 'RECEIVE_IDENTITY'
function receiveIdentity(json) {
  return {
    type: RECEIVE_IDENTITY,
    phone: json.phone,
  }
}

export const FAILED_REQUEST_IDENTITY = 'FAILED_REQUEST_IDENTITY'
function failedRequestIdentity() {
  return {
    type: FAILED_REQUEST_IDENTITY,
    phone: 'unable to get phon',
  }
}

export const INVALIDATE_TOKEN = 'INVALIDATE_TOKEN'
function invalidateToken() {
  return {
    type: INVALIDATE_TOKEN,
  }
}

export const SET_TOKEN = 'SET_TOKEN'
function setToken(token) {
  return {
    type: SET_TOKEN,
    token: token
  }
}

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
function requestProducts(page) {
  return {
    type: REQUEST_PRODUCTS,
    page: page
  }
}

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
function receiveProducts(page, json) {
  return {
    type: RECEIVE_PRODUCTS,
    page: page,
    pageProducts: json
  }
}

export function initializeToken()
{
  return function (dispatch) {
    let token = localStorage.getItem('x-auth')
    dispatch(setToken(token))
  }
}

export function fetchProductDetails(id, handler) {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }

  return function (dispatch, getState) {

    fetch(`http://localhost:3000/api/products/detail?id=${id}`, config).then(response => {

      if (response.status !== 200) {
        handler(null)
        return null
      }
      return response.json()
    })
      .then(json => {
        if (json !== null && json.status !== 'error') {
          handler(json)
        }
      })
  }
}

export function fetchProducts(page, handler = null)
{
  
  return function (dispatch, getState) {

    let config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  
    const state = getState()

    if (page in state.products.pages) {
      return
    }

    dispatch(requestProducts(page))
    fetch(`http://localhost:3000/api/products/list?p=${page}`, config).then(response => {
      console.log(response)
      if (response.status !== 200) {
        if (handler !== null) {
          handler('unkown error')
        }
        return null
      }
      return response.json()
    })
      .then(json => {
        if (json !== null && json.status !== 'error') {
          dispatch(receiveProducts(page, json))
        } else {
          if (handler !== null) {
            handler(json.message)
          }
        }
      })
  }
}

export function logout()
{
  return function (dispatch, getState) {
    localStorage.removeItem('x-auth')
    dispatch(invalidateToken())
  }
}

export function login(credentials, handler)
{
  return function (dispatch, getState) {

    let config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  
    fetch(`http://localhost:3000/auth/login?phone=${credentials.phone}&password=${credentials.password}`, config).then(response => {
      
      if (response.status !== 200) {
        handler('unkown error')
        return null
      }
      return response.json()
    })
      .then(json => {
        if (json !== null && json.status !== 'error') {
          localStorage.setItem('x-auth', json.token)
          dispatch(setToken(json.token))
        } else {
          handler(json.message)
        }
      })
  }
}

export function register(credentials, handler)
{
  return function (dispatch, getState) {

    let config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  
    fetch(`http://localhost:3000/auth/register?phone=${credentials.phone}&password=${credentials.password}`, config).then(response => {
      
      if (response.status !== 200) {
        handler('unkown error')
        return null
      }
      return response.json()
    })
      .then(json => {
        if (json !== null && json.status !== 'error') {
          localStorage.setItem('x-auth', json.token)
          dispatch(setToken(json.token))
        } else {
          handler(json.message)
        }
      })
  }
}

export function fetchIdentity() {
  return function(dispatch, getState) {
    let config = {
      method: 'GET',
      //cors: 'cors',
      headers: {
        //'Content-Type': 'application/json',
        'x-auth': getState().user.token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    dispatch(requestIdentity())
    fetch(`http://localhost:3000/api/identity`, config).then(response => {
      if (response.status !== 200) {
        dispatch(failedRequestIdentity())
        if (response.status === 401) {
          localStorage.removeItem('x-auth')
          dispatch(invalidateToken())
        }
        return null
      }

      return response.json()
    })
    .then(json => {
      if (json !== null) {
        dispatch(receiveIdentity(json))
      }
    })
  }
}

export const REQUEST_BASKET = 'REQUEST_BASKET'
function requestBasket() {
  return {
    type: REQUEST_BASKET,
  }
}

export const RECEIVE_BASKET = 'RECEIVE_BASKET'
function receiveBasket(json) {
  return {
    type: RECEIVE_BASKET,
    frozen: json.frozen,
    total: json.total,
    products: json.products,
  }
}
export const FAILED_RECEIVE_BASKET = 'FAILED_RECEIVE_BASKET'
function failedReceiveBasket() {
  return {
    type: FAILED_RECEIVE_BASKET,
  }
}

export function fetchBasket() {
  return function(dispatch, getState) {
    let config = {
      method: 'GET',
      headers: {
        'x-auth': getState().user.token
      },
    }
    
    dispatch(requestBasket())
    fetch(`http://localhost:3000/api/basket`, config).then(response => {
      if (response.status !== 200) {
        dispatch(failedReceiveBasket())
        console.log(response)
        if (response.status === 401) {
          localStorage.removeItem('x-auth')
          dispatch(invalidateToken())
        }
        return null
      }

      return response.json()
    })
    .then(json => {
      if (json !== null) {
        console.log(json)
        dispatch(receiveBasket(json))
      }
    })
  }
}

export function setBasketItemRequest(id, amount) {
  return function(dispatch, getState) {
    let config = {
      method: 'POST',
      headers: {
        'x-auth': getState().user.token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({product_id: id, amount: amount})
      //body: JSON.stringify({product_id: id, amount: amount})
    }
    
    dispatch(requestBasket())
    fetch(`http://localhost:3000/api/basket/set-good`, config).then(response => {
      if (response.status !== 200) {
        dispatch(failedReceiveBasket())
        console.log(response)
        if (response.status === 401) {
          localStorage.removeItem('x-auth')
          dispatch(invalidateToken())
        }
        return null
      }

      return response.json()
    })
    .then(json => {
      if (json !== null) {
        console.log(json)
        dispatch(receiveBasket(json))
      }
    })
  }
}

export function clearBasketRequest(handler) {
  return function(dispatch, getState) {
    let config = {
      method: 'POST',
      headers: {
        'x-auth': getState().user.token,
      },
    }
    
    dispatch(requestBasket())
    fetch(`http://localhost:3000/api/basket/clear`, config).then(response => {
      if (response.status !== 200) {
        dispatch(failedReceiveBasket())
        console.log(response)
        if (response.status === 401) {
          localStorage.removeItem('x-auth')
          dispatch(invalidateToken())
        }
        handler('Ваша корзина на данный момент в заморозке')
        return null
      }

      return response.json()
    })
    .then(json => {
      if (json !== null) {
        console.log(json)
        dispatch(receiveBasket(json))
      }
    })
  }
}

export function freezeBasketRequest() {
  return function(dispatch, getState) {
    let config = {
      method: 'POST',
      headers: {
        'x-auth': getState().user.token,
      },
    }
    
    dispatch(requestBasket())
    fetch(`http://localhost:3000/api/basket/freeze`, config).then(response => {
      if (response.status !== 200) {
        dispatch(failedReceiveBasket())
        console.log(response)
        if (response.status === 401) {
          localStorage.removeItem('x-auth')
          dispatch(invalidateToken())
        }
        return null
      }

      return response.json()
    })
    .then(json => {
      if (json !== null) {
        console.log(json)
        dispatch(receiveBasket(json))
      }
    })
  }
}