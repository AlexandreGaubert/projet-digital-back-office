import { APICall } from '../APICall'
import { store } from '../store'
import { update } from '../CRUDactions'

const initialState = {
  users: [],
  loginSuccessful: false,
  loginError: null,
  isAuth: false
}

export function users(state = initialState, action) {
  switch (action.type) {
    case "GET_USER":
      APICall('GET_USER', document.socket, {data: action.data})
      .then((res) => {
        return store.dispatch({type: "GET_USER_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "GET_USER_ERROR"})
      })
      break;
    case "GET_USER_SUCCESS":
      return {...state, users: action.data}
    case "GET_USER_ERROR":
      return state;

    case "CREATE_USER":
      APICall('CREATE_USER', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "CREATE_USER_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "CREATE_USER_ERROR"})
      })
      break;
    case "CREATE_USER_SUCCESS":
      return {...state, users: [...state.users, action.data]}
    case "CREATE_USER_ERROR":
      return state

    case "EDIT_USER":
      APICall('EDIT_USER', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "EDIT_USER_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "EDIT_USER_ERROR"})
      })
      break;
    case "EDIT_USER_SUCCESS":
      return {...state, users: update(state.users, action.data)}
    case "EDIT_USER_ERROR":
      return state

    case "DELETE_USER":
      APICall('DELETE_USER', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "GET_USER"})
      })
      .catch((err) => {
        return store.dispatch({type: "DELETE_USER_ERROR"})
      })
      break;

    case "USER_LOGIN":
      APICall('USER_LOGIN', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "USER_LOGIN_SUCCESS"})
      })
      .catch((err) => {
        console.log('login error');
        return store.dispatch({type: "USER_LOGIN_ERROR", error: err})
      })
      break;
    case "USER_LOGIN_SUCCESS":
      return {...state, loginSuccessful: true, loginError: null, isAuth: true}
      break;
    case "USER_LOGIN_ERROR":
      return {...state, loginSuccessful: false, loginError: action.error, isAuth: false}
      break;
    default:

    case "USER_IS_AUTH":
      APICall('USER_IS_AUTH', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "USER_IS_AUTH_SUCCESS", data: {user: res.data.user}})
      })
      .catch((err) => {
        return store.dispatch({type: "USER_IS_AUTH_ERROR", error: err})
      })
      break;
    case "USER_IS_AUTH_SUCCESS":
      return {...state, isAuth: true, user: action.data.user}
      break;
    case "USER_IS_AUTH_ERROR":
      return {...state, isAuth: false, user: null}
      break;
  }
  return state
}
