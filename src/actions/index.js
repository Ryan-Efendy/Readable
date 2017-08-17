import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_CATEGORIES = 'fetch_categories';
export const SORT_BY_DATE = 'sort_by_date';
export const SORT_BY_POPULARITY = 'sort_by_popularity';
export const INCREMENT_LIKES = 'increment_likes';
export const DECREMENT_LIKES = 'decrement_likes';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const LOAD = 'load';

const URL = 'http://localhost:5001/';

export const fetchPosts = () => {
  const request = axios.get(`${URL}posts`, {
    headers: { Authorization: 'whatever-you-want' }
  });

  return {
    type: FETCH_POSTS,
    payload: request
  };
};

export const fetchCategories = () => {
  const request = axios.get(`${URL}categories`, {
    headers: { Authorization: 'whatever-you-want' }
  });

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
};

export const sortByDate = posts => {
  return {
    type: SORT_BY_DATE,
    posts
  };
};

export const sortByPopularity = posts => {
  return {
    type: SORT_BY_POPULARITY,
    posts
  };
};

export const incrementLikes = id => {
  return {
    type: INCREMENT_LIKES,
    id
  };
};

export const decrementLikes = id => {
  return {
    type: DECREMENT_LIKES,
    id
  };
};

export const createPost = (values, callback) => {
  const request = axios({
    method: 'post',
    url: `${URL}posts`,
    data: values,
    headers: { Authorization: 'whatever-you-want' }
  }).then(() => callback());
  return {
    type: CREATE_POST,
    request
  };
};

export const fetchPost = id => {
  const request = axios.get(`${URL}posts/${id}`, {
    headers: { Authorization: 'whatever-you-want' }
  });
  return {
    type: FETCH_POST,
    payload: request
  };
};

export const load = data => ({ type: LOAD, data });
