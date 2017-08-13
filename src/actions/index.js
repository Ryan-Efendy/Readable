import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const SORT_BY_DATE = 'sort_by_date';
export const SORT_BY_POPULARITY = 'sort_by_popularity';
export const INCREMENT_LIKES = 'increment_likes';
export const DECREMENT_LIKES = 'decrement_likes';

const URL = 'http://localhost:5001/posts';

export const fetchPosts = () => {
  const request = axios.get(URL, {
    headers: { Authorization: 'whatever-you-want' }
  });

  return {
    type: FETCH_POSTS,
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