import React from 'react';
import ReactDOM from 'react-dom/client'

import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)