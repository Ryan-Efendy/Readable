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
export const UPDATE_POST = 'update_post';
export const FETCH_COMMENT = 'fetch_comment';
export const DELETE_POST = 'delete_post';
export const CREATE_COMMENT = 'create_comment';
export const INCREMENT_COMMENT_LIKES = 'increment_comment_likes';
export const DECREMENT_COMMENT_LIKES = 'decrement_comment_likes';
export const DELETE_COMMENT = 'delete_comment';
export const UPDATE_COMMENT = 'update_comment';

const URL = 'http://localhost:3001/';

/**
 * As with your reducers, it's considered best practice to split action creators into logical component modules, to improve your file structure and code readability
 * You may find this article helpful to help you achieve this https://marmelab.com/blog/2015/12/17/react-directory-structure.html
 */

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

export const sortByDate = posts => ({
  type: SORT_BY_DATE,
  posts
});

export const sortByPopularity = posts => ({
  type: SORT_BY_POPULARITY,
  posts
});

export const incrementLikes = id => {
  const request = axios({
    method: 'post',
    url: `${URL}posts/${id}`,
    data: {
      option: 'upVote'
    },
    headers: { Authorization: 'whatever-you-want' }
  });
  return {
    type: INCREMENT_LIKES,
    id,
    payload: request
  };
};

export const decrementLikes = id => {
  axios({
    method: 'post',
    url: `${URL}posts/${id}`,
    data: {
      option: 'downVote'
    },
    headers: { Authorization: 'whatever-you-want' }
  });
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

// todo: change request -> payload: request
export const updatePost = (id, values, callback) => {
  const request = axios({
    method: 'put',
    url: `${URL}posts/${id}`,
    data: values,
    headers: { Authorization: 'whatever-you-want' }
  }).then(() => callback());
  return {
    type: UPDATE_POST,
    request
  };
};

export const load = data => ({
  type: LOAD,
  data
});

export const fetchComments = id => {
  const request = axios.get(`${URL}posts/${id}/comments`, {
    headers: { Authorization: 'whatever-you-want' }
  });
  return {
    type: FETCH_COMMENT,
    payload: request
  };
};

export const deletePost = (id, callback) => {
  axios
    .delete(`${URL}posts/${id}`, {
      headers: { Authorization: 'whatever-you-want' }
    })
    .then(() => callback());
  return {
    type: DELETE_POST,
    payload: id
  };
};

export const createComment = values => {
  const request = axios({
    method: 'post',
    url: `${URL}comments`,
    data: values,
    headers: { Authorization: 'whatever-you-want' }
  });
  return {
    type: CREATE_COMMENT,
    payload: request
  };
};

export const incrementCommentLikes = (postId, commentId) => {
  const request = axios({
    method: 'post',
    url: `${URL}comments/${commentId}`,
    data: {
      option: 'upVote'
    },
    headers: { Authorization: 'whatever-you-want' }
  });
  return {
    type: INCREMENT_COMMENT_LIKES,
    postId,
    commentId,
    payload: request
  };
};

export const decrementCommentLikes = (postId, commentId) => {
  const request = axios({
    method: 'post',
    url: `${URL}comments/${commentId}`,
    data: {
      option: 'downVote'
    },
    headers: { Authorization: 'whatever-you-want' }
  });
  return {
    type: DECREMENT_COMMENT_LIKES,
    postId,
    commentId,
    payload: request
  };
};

export const deleteComment = (postId, commentId) => {
  axios.delete(`${URL}comments/${commentId}`, {
    headers: { Authorization: 'whatever-you-want' }
  });
  return {
    type: DELETE_COMMENT,
    postId,
    commentId
  };
};

export const updateComment = (id, values) => {
  const request = axios({
    method: 'put',
    url: `${URL}comments/${id}`,
    data: values,
    headers: { Authorization: 'whatever-you-want' }
  });
  return {
    type: UPDATE_COMMENT,
    payload: request
  };
};
