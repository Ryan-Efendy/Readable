import { combineReducers } from 'redux';
import _ from 'lodash';
import { reducer as formReducer } from 'redux-form';
import {
  FETCH_POSTS,
  FETCH_CATEGORIES,
  SORT_BY_DATE,
  SORT_BY_POPULARITY,
  INCREMENT_LIKES,
  DECREMENT_LIKES,
  CREATE_POST,
  FETCH_POST,
  LOAD,
  FETCH_COMMENT
} from '../actions';

function postsReducer(state = {}, action) {
  let tmpState;
  switch (action.type) {
    case FETCH_POSTS:
      // convert array of objects -> object of objects, key as id
      return _.mapKeys(action.payload.data, 'id');
    case SORT_BY_DATE:
      return _.reverse(_.sortBy(action.posts, 'timestamp'));
    case SORT_BY_POPULARITY:
      return _.reverse(_.sortBy(action.posts, 'voteScore'));
    case INCREMENT_LIKES:
      //todo: see if there's a better way to do this...
      tmpState = _.mapKeys(state, 'id');
      return {
        ...tmpState,
        [action.id]: {
          ...tmpState[action.id],
          voteScore: tmpState[action.id].voteScore + 1
        }
      };
    case DECREMENT_LIKES:
      tmpState = _.mapKeys(state, 'id');
      return {
        ...tmpState,
        [action.id]: {
          ...tmpState[action.id],
          voteScore: tmpState[action.id].voteScore - 1
        }
      };
    case CREATE_POST:
      return _.reverse(_.sortBy(action.posts, 'voteScore'));
    case FETCH_POST:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case LOAD:
      return { data: action.data };
    case FETCH_COMMENT:
      return {
        ...state,
        [action.payload.data[0].parentId]: {
          ...state[action.payload.data[0].parentId],
          comments: action.payload.data
        }
      };
    default:
      return state;
  }
}

function categoriesReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload.data['categories'].map(category => category.name);
    default:
      return state;
  }
}

// function commentsReducer(state = {}, action) {
//   switch (action.type) {
//     case FETCH_COMMENT:
//       return action.payload.data['categories'].map(category => category.name);
//     default:
//       return state;
//   }
// }

const rootReducer = combineReducers({
  posts: postsReducer,
  categories: categoriesReducer,
  form: formReducer
});

export default rootReducer;
