import _ from 'lodash';
import {
  FETCH_POSTS,
  SORT_BY_DATE,
  SORT_BY_POPULARITY,
  INCREMENT_LIKES,
  DECREMENT_LIKES,
  CREATE_POST,
  FETCH_POST,
  LOAD,
  FETCH_COMMENT,
  CREATE_COMMENT,
  INCREMENT_COMMENT_LIKES,
  DECREMENT_COMMENT_LIKES,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from '../actions';

export default function postsReducer(state = {}, action) {
  let tmpState, tmpComment;
  switch (action.type) {
    case FETCH_POSTS:
      if (
        !action.payload.data ||
        _.isEmpty(action.payload.data) ||
        action.payload.data.length === 0
      ) {
        return state;
      }
      // convert array of objects -> object of objects, key as id
      return _.mapKeys(action.payload.data, 'id');
    case SORT_BY_DATE:
      return _.reverse(_.sortBy(action.posts, 'timestamp'));
    case SORT_BY_POPULARITY:
      return _.reverse(_.sortBy(action.posts, 'voteScore'));
    case INCREMENT_LIKES:
      //todo: see if there's a better way to do this...
      //todo: need to check if success/200 before incrementing?
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
      if (
        !action.payload.data ||
        _.isEmpty(action.payload.data) ||
        action.payload.data.length === 0
      ) {
        return state;
      }
      return { ...state, [action.payload.data.id]: action.payload.data };
    case LOAD:
      return { data: action.data };
    case FETCH_COMMENT:
      if (
        !action.payload.data ||
        _.isEmpty(action.payload.data) ||
        action.payload.data.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        [action.payload.data[0].parentId]: {
          ...state[action.payload.data[0].parentId],
          comments: action.payload.data
        }
      };
    case CREATE_COMMENT:
      tmpComment = _.mapKeys(
        state[action.payload.data.parentId].comments,
        'id'
      );
      return {
        ...state,
        [action.payload.data.parentId]: {
          ...state[action.payload.data.parentId],
          comments: {
            ...tmpComment,
            [action.payload.data.id]: action.payload.data
          }
        }
      };
    case INCREMENT_COMMENT_LIKES:
      tmpComment = _.mapKeys(state[action.postId].comments, 'id');
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: {
            ...tmpComment,
            [action.commentId]: {
              ...tmpComment[action.commentId],
              voteScore: tmpComment[action.commentId].voteScore + 1
            }
          }
        }
      };
    case DECREMENT_COMMENT_LIKES:
      tmpComment = _.mapKeys(state[action.postId].comments, 'id');
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: {
            ...tmpComment,
            [action.commentId]: {
              ...tmpComment[action.commentId],
              voteScore: tmpComment[action.commentId].voteScore - 1
            }
          }
        }
      };
    case DELETE_COMMENT:
      // Array.isArray(state)
      tmpComment = _.mapKeys(state[action.postId].comments, 'id');
      return {
        ...state,
        [state[action.postId].id]: {
          ...state[action.postId],
          comments: {
            ...tmpComment,
            [action.commentId]: {
              ...tmpComment[action.commentId],
              deleted: true
            }
          }
        }
      };
    case UPDATE_COMMENT:
      tmpComment = _.mapKeys(
        state[action.payload.data.parentId].comments,
        'id'
      );
      return {
        ...state,
        [action.payload.data.parentId]: {
          ...state[action.payload.data.parentId],
          comments: {
            ...tmpComment,
            [action.payload.data.id]: action.payload.data
          }
        }
      };
    default:
      return state;
  }
}