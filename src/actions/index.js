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


export function fetchProducts(page, handler = null)
{
  
  return function (dispatch, getState) {

    let config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify(credentials)
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
      //body: JSON.stringify(credentials)
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
      //body: JSON.stringify(credentials)
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

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))
export function fetchIdentity() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function(dispatch, getState) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    console.log('cucumber')
    let config = {
      method: 'GET',
      //cors: 'cors',
      headers: {
        //'Content-Type': 'application/json',
        'x-auth': getState().user.token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    console.log('cucumber')
    dispatch(requestIdentity())
    // return
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    // return async function ()
    // {
      //   let result = await fetch(`http://localhost:3000/api/identity`)
      //   console.log(result)
      // }

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

    // return fetch(`http://localhost:3000/api/identity`)
    //   .then(
    //     response => {
    //       console.log(response)
    //       //response.json()
    //       response.json().then(item => {console.log(item)}).catch(item => {console.log(item)})
    //     }
    //     // Do not use catch, because that will also catch
    //     // any errors in the dispatch and resulting render,
    //     // causing a loop of 'Unexpected batch number' errors.
    //     // https://github.com/facebook/react/issues/6895
    //     //error => console.log('An error occurred.', error)
    //   )
    //   .then(json => {
    //     console.log(json)
    //     // We can dispatch many times!
    //     // Here, we update the app state with the results of the API call.
    //     dispatch(receiveIdentity(json))
    //   }
    //   )
  }
}