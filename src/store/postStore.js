import { defineStore } from 'pinia';
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
  }),
  actions: {
    async loadAllPosts() {
      const response = await apiService.getAllPosts();
      this.allPosts = response.data;
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
      const postIndex = this.allPosts.findIndex((post) => post.id === id);
      if (postIndex !== -1) {
        this.allPosts.splice(postIndex, 1);
      }

      const filteredPostIndex = this.filteredPosts.findIndex((post) => post.id === id);
      if (filteredPostIndex !== -1) {
        this.filteredPosts.splice(filteredPostIndex, 1);
      }

      this.loadPosts(this.searchState.sort, this.searchState.filter, this.searchState.search);
    },
    nextPage() {
      if (this.page * 10 < this.filteredPosts.length) {
        this.page += 1;
        this.posts = this.filteredPosts.slice((this.page - 1) * 10, this.page * 10);
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page -= 1;
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
      this.searchState.filter = value;
      this.loadPosts(this.searchState.sort, this.searchState.filter, this.searchState.search);
    },
    setSearch(value) {
      this.searchState.search = value;
      this.loadPosts(this.searchState.sort, this.searchState.filter, this.searchState.search);
    },

  },
});

export default usePostStore;
