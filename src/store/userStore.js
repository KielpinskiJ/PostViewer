import { defineStore } from 'pinia';
import apiService from '../apiService';

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [],
  }),
  actions: {
    async loadAllUsers() {
      const response = await apiService.getAllUsers();
      this.users = response.data;
    },
    getUser(id) {
      return this.users.find((user) => user.id === id);
    },
  },
});

export default useUserStore;
