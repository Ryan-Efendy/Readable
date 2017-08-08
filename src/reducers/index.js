import { combineReducers } from 'redux';
import _ from 'lodash';
// import { reducer as formReducer } from 'redux-form';
import { FETCH_POSTS } from '../actions';

function postsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  posts: postsReducer
});

export default rootReducer;
