import {applyMiddleware, createStore} from 'redux'
import createLogger  from 'redux-logger'
import reducer from './reducers'
import thunk from 'redux-thunk'


const logger = createLogger();
const middleware = applyMiddleware(thunk,logger)

export default createStore(reducer, middleware)
