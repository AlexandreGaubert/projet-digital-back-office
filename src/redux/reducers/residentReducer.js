import { APICall } from '../APICall'
import { store } from '../store'
import { update } from '../CRUDactions'

const initialState = {
  residents: []
}

export function residents(state = initialState, action) {
  switch (action.type) {
    case "GET_RESIDENT":
      APICall('GET_RESIDENT', document.socket, {data: action.data})
      .then((res) => {
        return store.dispatch({type: "GET_RESIDENT_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "GET_RESIDENT_ERROR"})
      })
      break;
    case "GET_RESIDENT_SUCCESS":
      return {...state, residents: action.data}
    case "GET_RESIDENT_ERROR":
      return state;

    case "CREATE_RESIDENT":
      APICall('CREATE_RESIDENT', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "CREATE_RESIDENT_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "CREATE_RESIDENT_ERROR"})
      })
      break;
    case "CREATE_RESIDENT_SUCCESS":
      return {...state, residents: [...state.residents, action.data]}
    case "CREATE_RESIDENT_ERROR":
      return state

    case "EDIT_RESIDENT":
      APICall('EDIT_RESIDENT', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "EDIT_RESIDENT_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "EDIT_RESIDENT_ERROR"})
      })
      break;
    case "EDIT_RESIDENT_SUCCESS":
      console.log(action.data);
      return {...state, residents: update(state.residents, action.data)}
    case "EDIT_RESIDENT_ERROR":
      return state

    case "DELETE_RESIDENT":
      APICall('DELETE_RESIDENT', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "GET_RESIDENT"})
      })
      .catch((err) => {
        return store.dispatch({type: "DELETE_RESIDENT_ERROR"})
      })
      break;
    default:
  }
  return state
}
