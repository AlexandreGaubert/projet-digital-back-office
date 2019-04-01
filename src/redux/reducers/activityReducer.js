import { APICall } from '../APICall'
import { store } from '../store'
import { update } from '../CRUDactions'

const initialState = {
  activities: [],
  hours: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
}

export function activities(state = initialState, action) {
  switch (action.type) {
    case "GET_ACTIVITY":
      APICall('GET_ACTIVITY', document.socket, {data: action.data})
      .then((res) => {
        return store.dispatch({type: "GET_ACTIVITY_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "GET_ACTIVITY_ERROR"})
      })
      break;
    case "GET_ACTIVITY_SUCCESS":
      return {...state, activities: action.data}
    case "GET_ACTIVITY_ERROR":
      return state;

    case "CREATE_ACTIVITY":
      APICall('CREATE_ACTIVITY', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "CREATE_ACTIVITY_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "CREATE_ACTIVITY_ERROR"})
      })
      break;
    case "CREATE_ACTIVITY_SUCCESS":
      return {...state, activities: [...state.activities, action.data]}
    case "CREATE_ACTIVITY_ERROR":
      return state

    case "EDIT_ACTIVITY":
      APICall('EDIT_ACTIVITY', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "EDIT_ACTIVITY_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "EDIT_ACTIVITY_ERROR"})
      })
      break;
    case "EDIT_ACTIVITY_SUCCESS":
      console.log(action.data);
      return {...state, activities: update(state.activities, action.data)}
    case "EDIT_ACTIVITY_ERROR":
      return state

    case "DELETE_ACTIVITY":
      APICall('DELETE_ACTIVITY', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "DELETE_ACTIVITY_SUCCESS", data: res.deletedID})
      })
      .catch((err) => {
        return store.dispatch({type: "DELETE_ACTIVITY_ERROR"})
      })
      break;
    case "DELETE_ACTIVITY_SUCCESS":
      return {...state, activities: state.activities.filter(activity => activity._id !== action.data)}
    case "DELETE_ACTIVITY_ERROR":
      return state
  }
  return state
}
