import { APICall } from '../APICall'
import { store } from '../store'
import { update } from '../CRUDactions'

const initialState = {
  employees: [],
  descriptions: [
    {section: 'administration', description: "administration"},
    {section: 'maintenance', description: "maintenance"},
    {section: 'soin', description: "soin"},
    {section: 'nuit', description: "nuit"},
    {section: 'hotellerie', description: "hotellerie"},
    {section: 'restauration', description: "restauration"},
    {section: 'animation', description: 'animation'},
  ]
}

export function employees(state = initialState, action) {
  switch (action.type) {
    case "GET_EMPLOYEE":
      APICall('GET_EMPLOYEE', document.socket, {data: action.data})
      .then((res) => {
        return store.dispatch({type: "GET_EMPLOYEE_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "GET_EMPLOYEE_ERROR"})
      })
      break;
    case "GET_EMPLOYEE_SUCCESS":
      return {...state, employees: action.data}
    case "GET_EMPLOYEE_ERROR":
      return state;

    case "GET_SECTION_DESCRIPTION":
      APICall('GET_SECTION_DESCRIPTION', document.socket, {data: action.data})
      .then((res) => {
        return store.dispatch({type: "GET_SECTION_DESCRIPTION_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "GET_SECTION_DESCRIPTION_ERROR"})
      })
      break;
    case "GET_SECTION_DESCRIPTION_SUCCESS":
      return {...state, descriptions: action.data}
    case "GET_SECTION_DESCRIPTION_ERROR":
      return state;

    case "CREATE_EMPLOYEE":
      APICall('CREATE_EMPLOYEE', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "CREATE_EMPLOYEE_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "CREATE_EMPLOYEE_ERROR"})
      })
      break;
    case "CREATE_EMPLOYEE_SUCCESS":
      return {...state, employees: [...state.employees, action.data]}
    case "CREATE_EMPLOYEE_ERROR":
      return state

    case "EDIT_EMPLOYEE":
      APICall('EDIT_EMPLOYEE', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "EDIT_EMPLOYEE_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "EDIT_EMPLOYEE_ERROR"})
      })
      break;
    case "EDIT_EMPLOYEE_SUCCESS":
      return {...state, employees: update(state.employees, action.data)}
    case "EDIT_EMPLOYEE_ERROR":
      return state

    case "EDIT_SECTION_DESCRIPTION":
      APICall('EDIT_SECTION_DESCRIPTION', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "EDIT_SECTION_DESCRIPTION_SUCCESS", data: res.data})
      })
      .catch((err) => {
        return store.dispatch({type: "EDIT_SECTION_DESCRIPTION_ERROR"})
      })
      break;
    case "EDIT_SECTION_DESCRIPTION_SUCCESS":
      var descriptions = state.descriptions;

      for (var i = 0; i < descriptions.length; i++) {
        if (descriptions[i].section === action.data.section) {
          descriptions[i] = action.data
        }
      }

      return {...state, descriptions: descriptions}
    case "EDIT_SECTION_DESCRIPTION_ERROR":
      return state

    case "DELETE_EMPLOYEE":
      APICall('DELETE_EMPLOYEE', document.socket, action.data)
      .then((res) => {
        return store.dispatch({type: "GET_EMPLOYEE"})
      })
      .catch((err) => {
        return store.dispatch({type: "DELETE_EMPLOYEE_ERROR"})
      })
      break;
  }
  return state
}
