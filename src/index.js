import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App'
import {Provider} from 'react-redux'
import store from './store'
import ReactDefaultPerf from 'react/lib/ReactDefaultPerf'

window.ReactDefaultPerf = ReactDefaultPerf
console.time('initial')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>

  , document.getElementById('root'))
console.timeEnd('initial')