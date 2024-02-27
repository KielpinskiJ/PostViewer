import { defineStore } from 'pinia';
import { computed } from 'vue';
import apiService from '../apiService';
import { sortPosts, filterPosts, searchPosts } from '../utils/postUtils';

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
      return computed(() => Math.ceil(this.filteredPosts.length / 10));
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
    loadPosts(sort, filter, search) {
      this.page = 1;
      this.searchState = { sort, filter, search };
      this.filterAndSortPosts(sort, filter, search);
      this.posts = this.filteredPosts.slice((this.page - 1) * 10, this.page * 10);
    },
    deletePost(id) {
      this.allPosts = this.allPosts.filter((post) => post.id !== id);
      this.filteredPosts = this.filteredPosts.filter((post) => post.id !== id);
      this.loadPosts(this.searchState.sort, this.searchState.filter, this.searchState.search);
    },
    nextPage() {
      if (this.page * 10 < this.filteredPosts.length) {
        this.page += 1;
        this.posts = this.filteredPosts.slice((this.page - 1) * 10, this.page * 10);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page -= 1;
        this.posts = this.filteredPosts.slice((this.page - 1) * 10, this.page * 10);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.lastPage) {
        this.page = page;
        this.posts = this.filteredPosts.slice((this.page - 1) * 10, this.page * 10);
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
