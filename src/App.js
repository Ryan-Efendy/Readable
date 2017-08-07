import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import DefaultView from './components/DefaultView';
import CreateEditView from './components/CreateEditView';
import CategoryView from './components/CategoryView';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={DefaultView} />
        <Route exact path="/create" component={CreateEditView} />
        <Route exact path="/show" component={CategoryView} />
      </div>
    );
  }
}

export default App;
