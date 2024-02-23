import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getAllPosts() {
    return apiClient.get('/posts');
  },
  getPost(id) {
    return apiClient.get(`/posts/${id}`);
  },
  getCommentsByPostId(id) {
    return apiClient.get(`/posts/${id}/comments`);
  },
  getAllUsers() {
    return apiClient.get('/users');
  },
  getUser(id) {
    return apiClient.get(`/users/${id}`);
  },
  deletePost(id) {
    return apiClient.delete(`/posts/${id}`);
  },
};
