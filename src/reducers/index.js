import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from '../reducers/PostsReducer';
import CategoriesReducer from '../reducers/CategoriesReducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  categories: CategoriesReducer,
  form: formReducer
});

export default rootReducer;
