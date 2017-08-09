import { combineReducers } from 'redux';
import _ from 'lodash';
// import { reducer as formReducer } from 'redux-form';
import { FETCH_POSTS, SORT_BY_DATE, SORT_BY_POPULARITY } from '../actions';

function postsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      // return _.mapKeys(action.payload.data, 'id');
      return action.payload.data;
    case SORT_BY_DATE:
      return _.reverse(_.sortBy(action.payload, 'timestamp'));
    case SORT_BY_POPULARITY:
      return _.reverse(_.sortBy(action.payload, 'voteScore'));
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  posts: postsReducer
});

export default rootReducer;
