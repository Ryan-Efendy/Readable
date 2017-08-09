import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import logger from 'redux-logger';
import reducers from './reducers';

import { Route } from 'react-router-dom';
import DefaultView from './components/DefaultView';
import CreateEditView from './components/CreateEditView';
import CategoryView from './components/CategoryView';

const createStoreWithMiddleware = applyMiddleware(promise, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route path="/" component={DefaultView} />
        <Route exact path="/create" component={CreateEditView} />
        <Route exac3t path="/show" component={CategoryView} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
