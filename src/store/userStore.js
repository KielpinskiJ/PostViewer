import { defineStore } from 'pinia';
import apiService from '../apiService';

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [],
  }),
  actions: {
    async getUser(id) {
      if (!this.users[id]) {
        const response = await apiService.getUser(id);
        this.users[id] = response.data;
      }
      return this.users[id];
    },
  },
});

export default useUserStore;
