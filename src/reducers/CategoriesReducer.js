import _ from 'lodash';
import { FETCH_CATEGORIES } from '../actions';

export default function categoriesReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      if (
        !action.payload.data ||
        _.isEmpty(action.payload.data) ||
        action.payload.data.length === 0
      ) {
        return state;
      }
      return action.payload.data['categories'].map(category => category.name);
    default:
      return state;
  }
}
