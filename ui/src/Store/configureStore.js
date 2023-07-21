import {createStore,combineReducers ,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../Reducers/userReducer'
import { stationReducer } from '../Reducers/stationReducer'
import { companyReducer } from '../Reducers/companyReducer'
import { bookingReducer } from '../Reducers/bookingReducer'

 const configureStore =()=>{
    const store = createStore(combineReducers({
        user:userReducer,
        station:stationReducer,
        company:companyReducer,
        booking:bookingReducer
    }),applyMiddleware(thunk))
    return store
 }
 export default configureStore