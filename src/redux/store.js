import { createStore, combineReducers } from 'redux'
//reducers
import { menus } from './reducers/menuReducer'
import { activities } from './reducers/activityReducer'
import { news } from './reducers/newsReducer'
import { avis } from './reducers/avisReducer'
import { galleries } from './reducers/galleryReducer'

const mainReducer = combineReducers({news, activities, menus, avis, galleries})
export const store = createStore(mainReducer)
