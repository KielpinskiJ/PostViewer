import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

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
    return handleRequest(apiClient.get('/posts'));
  },
  getPost(id) {
    return handleRequest(apiClient.get(`/posts/${id}`));
  },
  getCommentsByPostId(id) {
    return handleRequest(apiClient.get(`/posts/${id}/comments`));
  },
  getAllUsers() {
    return handleRequest(apiClient.get('/users'));
  },
  getUser(id) {
    return handleRequest(apiClient.get(`/users/${id}`));
  },
  deletePost(id) {
    return handleRequest(apiClient.delete(`/posts/${id}`));
  },
};
