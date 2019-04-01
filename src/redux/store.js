import { createStore, combineReducers } from 'redux'
//reducers
import { menus } from './reducers/menuReducer'
import { activities } from './reducers/activityReducer'
import { news } from './reducers/newsReducer'
import { avis } from './reducers/avisReducer'
import { galleries } from './reducers/galleryReducer'
import { residents } from './reducers/residentReducer'
import { users } from './reducers/userReducer'

const mainReducer = combineReducers({users, news, activities, menus, avis, galleries, residents})
export const store = createStore(mainReducer)
