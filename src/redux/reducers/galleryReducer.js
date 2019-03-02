import { APICall } from '../APICall'
import { store } from '../store'
import { update } from '../CRUDactions'

const initialState = {
  galleries: []
}

export function galleries(state = initialState, action) {
  switch (action.type) {
    case "GET_GALLERY":
      APICall('GET_GALLERY', document.socket, {data: action.data})
      .then((res) => {
        return store.dispatch({type: "GET_GALLERY_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "GET_GALLERY_ERROR"})
      })
      break;
    case "GET_GALLERY_SUCCESS":
      return {...state, galleries: action.data}
    case "GET_GALLERY_ERROR":
      return state;

    case "EDIT_GALLERY":
      APICall('EDIT_GALLERY', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "EDIT_GALLERY_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "EDIT_GALLERY_ERROR"})
      })
      break;
    case "EDIT_GALLERY_SUCCESS":
      console.log(action.data);
      return {...state, galleries: update(state.galleries, action.data)}
    case "EDIT_GALLERY_ERROR":
      return state

    case "DELETE_GALLERY":
      APICall('DELETE_GALLERY', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "GET_GALLERY"})
      })
      .catch((err) => {
        return store.dispatch({type: "DELETE_GALLERY_ERROR"})
      })
      break;
    default:
  }
  return state
}
