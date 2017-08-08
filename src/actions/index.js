import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';

const URL = 'http://localhost:5001/posts';

export function fetchPosts() {
  const request = axios.get(URL, {
    headers: { Authorization: 'whatever-you-want' }
  });

  return {
    type: FETCH_POSTS,
    payload: request
  };
}
