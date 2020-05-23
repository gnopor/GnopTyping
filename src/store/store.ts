import rootReducer from '../redux/reducers'
import {createStore} from 'redux'

const configureStore = () =>{

    const store = createStore(rootReducer)

    return store

}

export default configureStore; 