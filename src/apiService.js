import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getPosts(page = 1) {
    return apiClient.get(`/posts?_page=${page}&_limit=10`);
  },
  getPost(id) {
    return apiClient.get(`/posts/${id}`);
  },
  getCommentsByPostId(id) {
    return apiClient.get(`/posts/${id}/comments`);
  },
  getUser(id) {
    return apiClient.get(`/users/${id}`);
  },
  deletePost(id) {
    return apiClient.delete(`/posts/${id}`);
  },
};
