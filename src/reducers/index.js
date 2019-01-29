import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './PostsReducer';
import CategoriesReducer from './CategoriesReducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  categories: CategoriesReducer,
  form: formReducer
});

export default rootReducer;
