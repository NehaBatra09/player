import { createStore } from 'redux'
import reducer from "./reducers/playerReducer"
const store = createStore(reducer)
export default store
