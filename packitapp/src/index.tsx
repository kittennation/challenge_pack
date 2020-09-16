import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './redux'
import { rootSaga } from './redux/modules/watcher'

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  
    <Provider store={store}>
      <App />
    </Provider>
 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
