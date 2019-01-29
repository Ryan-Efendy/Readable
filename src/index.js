import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import logger from 'redux-logger';
import { Route, Switch } from 'react-router-dom';
import reducers from './reducers';

import registerServiceWorker from './registerServiceWorker';
import DefaultView from './components/DefaultView';
import CreateEditView from './components/CreateEditView';
import PostDetailView from './components/PostDetailView';

const createStoreWithMiddleware = applyMiddleware(promise, logger)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DefaultView} />
        <Route path="/create" component={CreateEditView} />
        <Route path="/edit/:id" component={CreateEditView} />
        <Route exact path="/:category" component={DefaultView} />
        <Route path="/:category/:id" component={PostDetailView} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
