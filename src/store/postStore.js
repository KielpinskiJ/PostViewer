import { defineStore } from 'pinia';
import { computed } from 'vue';
import apiService from '../apiService';
import { sortPosts, filterPosts, searchPosts } from '../utils/postUtils';
import POSTS_PER_PAGE from '../config';

const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    allPosts: [],
    filteredPosts: [],
    posts: [],
    page: 1,
    selectedPost: null,
    searchState: { sort: '', filter: '', search: '' },
    apiError: false,
  }),
  getters: {
    lastPage() {
      return computed(() => {
        const result = Math.ceil(this.filteredPosts.length / POSTS_PER_PAGE);
        return result === 0 ? 1 : result;
      });
    },
  },
  actions: {
    async loadAllPosts() {
      const response = await apiService.getAllPosts();
      if (response.success) {
        this.allPosts = response.data;
        this.apiError = false;
      } else {
        this.apiError = true;
        console.error(response.error);
      }
    },
    filterAndSortPosts(sort, filter, search) {
      let posts = [...this.allPosts];

      if (sort) {
        posts = sortPosts(posts, sort);
      }
      if (filter) {
        posts = filterPosts(posts, filter);
      }
      if (search) {
        posts = searchPosts(posts, search);
      }

      this.filteredPosts = posts;
    },
    updatePosts() {
      this.posts = this.filteredPosts.slice(
        (this.page - 1) * POSTS_PER_PAGE,
        this.page * POSTS_PER_PAGE,
      );
    },
    loadPosts(sort, filter, search) {
      this.page = 1;
      this.searchState = { sort, filter, search };
      this.filterAndSortPosts(sort, filter, search);
      this.updatePosts();
    },
    deletePost(id) {
      this.allPosts = this.allPosts.filter((post) => post.id !== id);
      this.filteredPosts = this.filteredPosts.filter((post) => post.id !== id);
      this.loadPosts(this.searchState.sort, this.searchState.filter, this.searchState.search);
    },
    nextPage() {
      if (this.page * POSTS_PER_PAGE < this.filteredPosts.length) {
        this.page += 1;
        this.updatePosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page -= 1;
        this.updatePosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.lastPage) {
        this.page = page;
        this.updatePosts();
      }
    },
    selectPost(post) {
      this.selectedPost = post;
    },
    setSort(value) {
      this.searchState.sort = value;
      this.loadPosts(this.searchState.sort, this.searchState.filter, this.searchState.search);
    },
    setFilter(value) {
      this.searchState.filter = Number(value);
      this.loadPosts(this.searchState.sort, this.searchState.filter, this.searchState.search);
    },
    setSearch(value) {
      this.searchState.search = value;
      this.loadPosts(this.searchState.sort, this.searchState.filter, this.searchState.search);
    },

  },
});

export default usePostStore;
