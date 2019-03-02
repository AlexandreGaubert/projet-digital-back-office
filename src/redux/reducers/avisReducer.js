import { APICall } from '../APICall'
import { store } from '../store'
import { update } from '../CRUDactions'

const initialState = {
  avis: []
}

export function avis(state = initialState, action) {
  switch (action.type) {
    case "GET_AVIS":
      console.log("dispatch get_avis");
      APICall('GET_AVIS', document.socket, {data: action.data})
      .then((res) => {
        return store.dispatch({type: "GET_AVIS_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "GET_AVIS_ERROR"})
      })
      break;
    case "GET_AVIS_SUCCESS":
      return {...state, avis: action.data}
    case "GET_AVIS_ERROR":
      return state;

    case "CREATE_AVIS":
      APICall('CREATE_AVIS', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "CREATE_AVIS_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "CREATE_AVIS_ERROR"})
      })
      break;
    case "CREATE_AVIS_SUCCESS":
      return {...state, avis: [...state.avis, action.data]}
    case "CREATE_AVIS_ERROR":
      return state

    case "EDIT_AVIS":
      APICall('EDIT_AVIS', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "EDIT_AVIS_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "EDIT_AVIS_ERROR"})
      })
      break;
    case "EDIT_AVIS_SUCCESS":
      console.log(action.data);
      return {...state, avis: update(state.avis, action.data)}
    case "EDIT_AVIS_ERROR":
      return state

    case "DELETE_AVIS":
      APICall('DELETE_AVIS', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "GET_AVIS"})
      })
      .catch((err) => {
        return store.dispatch({type: "DELETE_AVIS_ERROR"})
      })
      break;
    default:
  }
  return state
}
