import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import reducer from 'reducers'

const loggerMiddleware = createLogger()

const store = createStore(reducer, compose(applyMiddleware(loggerMiddleware)))

export default store
