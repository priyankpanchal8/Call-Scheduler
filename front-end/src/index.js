import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Master/Header';
import './Site.css';

import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import Reducer from './reducers'
import {loadState,saveState} from './localStorage'
import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'
import {createStore, applyMiddleware} from 'redux'
import Menu from './components/Menu'

const persistedState = loadState();
let store = createStore(Reducer,persistedState,applyMiddleware(thunk));

store.subscribe(throttle(() => {
    saveState({
        authState: store.getState().authState
    });
}), 1000);


ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
        <BrowserRouter>
            <Menu />
        </BrowserRouter>
    </Provider>

  // <React.StrictMode>
  //   <BrowserRouter>
  //   <Header />
  //     <App />
  //   </BrowserRouter>
  // </React.StrictMode>,
)
