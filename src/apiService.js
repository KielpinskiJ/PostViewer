import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const API_PATHS = {
  POSTS: '/posts',
  USERS: '/users',
};

async function handleRequest(request) {
  try {
    const response = await request;
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: 'Problem with API call' };
  }
}

export default {
  getAllPosts() {
    return handleRequest(apiClient.get(API_PATHS.POSTS));
  },
  getPost(id) {
    return handleRequest(apiClient.get(`${API_PATHS.POSTS}/${id}`));
  },
  getCommentsByPostId(id) {
    return handleRequest(apiClient.get(`${API_PATHS.POSTS}/${id}/comments`));
  },
  getAllUsers() {
    return handleRequest(apiClient.get(API_PATHS.USERS));
  },
  getUser(id) {
    return handleRequest(apiClient.get(`${API_PATHS.USERS}/${id}`));
  },
  deletePost(id) {
    return handleRequest(apiClient.delete(`${API_PATHS.POSTS}/${id}`));
  },
};
