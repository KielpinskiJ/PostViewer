import { defineStore } from 'pinia';
import apiService from '../apiService';
import useUserStore from './userStore';

const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts: [],
    nextPagePosts: [],
    page: 1,
    hasMorePosts: true,
  }),
  actions: {
    async getPosts(page) {
      const response = await apiService.getPosts(page);
      const userStore = useUserStore();

      return Promise.all(
        response.data.map(async (post) => {
          const user = await userStore.getUser(post.userId);
          return { ...post, user };
        }),
      );
    },
    async loadPosts() {
      this.posts = await this.getPosts(this.page);
      this.prefetchNextPage();
    },
    async prefetchNextPage() {
      const nextPage = this.page + 1;
      const posts = await this.getPosts(nextPage);
      if (posts.length > 0) {
        this.nextPagePosts = posts;
        this.hasMorePosts = true;
      } else {
        this.hasMorePosts = false;
      }
    },
    async nextPage() {
      if (this.nextPagePosts.length > 0) {
        this.page += 1;
        this.posts = this.nextPagePosts;
        this.nextPagePosts = [];
        this.prefetchNextPage();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page -= 1;
        this.loadPosts();
      }
    },
  },
});

export default usePostStore;
