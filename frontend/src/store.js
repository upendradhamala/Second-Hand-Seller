import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers'
import { productDetailsReducer } from './reducers/productReducers'
import { userLoginReducer } from './reducers/userReducer'
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
})

const userDataFromStorage = localStorage.getItem('userData')
  ? JSON.parse(localStorage.getItem('userData'))
  : null

const middleware = [thunk]
const initialState = {
  userLogin: { userData: userDataFromStorage },
}
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
