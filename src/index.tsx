import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
//import { BrowserRouter as Router } from 'react-router-dom;
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { mainReducer, defaultState } from './reducers';

//import 'normalize.css';
//import 'styles/main.scss';
import Root from './views';


import { ROOT_NODE } from './constants';

const store = createStore(mainReducer, defaultState(), applyMiddleware(thunk));

const render = () => {
    ReactDOM.render(
        (
         
          <Provider store={store}>
            <Router>
              <Root />
            </Router>
          </Provider>
        ),
        ROOT_NODE as HTMLElement,
      );
};

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.unmountComponentAtNode(ROOT_NODE as HTMLElement);
    render();
  });
}

render();