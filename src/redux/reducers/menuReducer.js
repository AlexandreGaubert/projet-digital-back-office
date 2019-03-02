import { APICall } from '../APICall'
import { store } from '../store'
import { update } from '../CRUDactions'

const initialState = {
  menus: []
}

export function menus(state = initialState, action) {
  switch (action.type) {
    case "GET_MENU":
      APICall('GET_MENU', document.socket, {data: action.data})
      .then((res) => {
        console.log(res.data);
        return store.dispatch({type: "GET_MENU_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "GET_MENU_ERROR"})
      })
      break;
    case "GET_MENU_SUCCESS":
      return {...state, menus: action.data}
    case "GET_MENU_ERROR":
      return state;

    case "CREATE_MENU":
      APICall('CREATE_MENU', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "CREATE_MENU_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "CREATE_MENU_ERROR"})
      })
      break;
    case "CREATE_MENU_SUCCESS":
      return {...state, menus: [...state.menus, action.data]}
    case "CREATE_MENU_ERROR":
      return state

    case "EDIT_MENU":
      APICall('EDIT_MENU', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "EDIT_MENU_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "EDIT_MENU_ERROR"})
      })
      break;
    case "EDIT_MENU_SUCCESS":
      console.log(action.data);
      return {...state, menus: update(state.menus, action.data)}
    case "EDIT_MENU_ERROR":
      return state

    case "DELETE_MENU":
      APICall('DELETE_MENU', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "GET_MENU"})
      })
      .catch((err) => {
        return store.dispatch({type: "DELETE_MENU_ERROR"})
      })
      break;
    default:
  }
  return state
}
