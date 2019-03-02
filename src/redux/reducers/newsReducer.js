import { APICall } from '../APICall'
import { store } from '../store'
import { update } from '../CRUDactions'

const initialState = {
  news: []
}

export function news(state = initialState, action) {
  switch (action.type) {
    case "GET_NEWS":
      APICall('GET_NEWS', document.socket, {data: action.data})
      .then((res) => {
        return store.dispatch({type: "GET_NEWS_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "GET_NEWS_ERROR"})
      })
      break;
    case "GET_NEWS_SUCCESS":
      return {...state, news: action.data}
    case "GET_NEWS_ERROR":
      return state;

    case "CREATE_NEWS":
      APICall('CREATE_NEWS', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "CREATE_NEWS_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "CREATE_NEWS_ERROR"})
      })
      break;
    case "CREATE_NEWS_SUCCESS":
      return {...state, news: [...state.news, action.data]}
    case "CREATE_NEWS_ERROR":
      return state

    case "EDIT_NEWS":
      APICall('EDIT_NEWS', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "EDIT_NEWS_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "EDIT_NEWS_ERROR"})
      })
      break;
    case "EDIT_NEWS_SUCCESS":
      console.log(action.data);
      return {...state, news: update(state.news, action.data)}
    case "EDIT_NEWS_ERROR":
      return state

    case "DELETE_NEWS":
      APICall('DELETE_NEWS', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "GET_NEWS"})
      })
      .catch((err) => {
        return store.dispatch({type: "DELETE_NEWS_ERROR"})
      })
      break;
    default:
  }
  return state
}
