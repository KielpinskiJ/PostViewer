<template>
  <div id="app">
    <PostList />
    <PostDetails v-if="postStore.selectedPost" :post="postStore.selectedPost" />
  </div>
</template>

<script>
import PostList from './components/PostList.vue';
import PostDetails from './components/PostDetails.vue';
import usePostStore from './store/postStore';

export default {
  components: {
    PostList,
    PostDetails,
  },
  setup() {
    const postStore = usePostStore();
    return { postStore };
  },
};
</script>

<style></style>
