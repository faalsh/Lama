import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App'
import {Provider} from 'react-redux'
import store from '../common/store'
import ReactPerf from 'react/lib/ReactPerf'

window.ReactPerf = ReactPerf
console.time('initial')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>

  , document.getElementById('root'))
console.timeEnd('initial')
