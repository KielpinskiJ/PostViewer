<template>
  <div>
    <div v-for="post in postStore.posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body.substring(0, 100) }}...</p>
      <p>Autor: {{ post.user.name }}</p>
      <button @click="deletePost(post.id)">Usuń post</button>
      <router-link :to="`/post/${post.id}`">Zobacz więcej</router-link>
    </div>

    <button @click="postStore.prevPage" :disabled="postStore.page === 1">
      Poprzednia strona
    </button>
    <button @click="postStore.nextPage" :disabled="!postStore.hasMorePosts">
      Następna strona
    </button>
  </div>
</template>

<script>
import usePostStore from '../store/postStore';
import apiService from '../apiService';

export default {
  setup() {
    const postStore = usePostStore();

    const deletePost = async (id) => {
      await apiService.deletePost(id);
      postStore.posts = postStore.posts.filter((post) => post.id !== id);
    };

    return { postStore, deletePost };
  },
  created() {
    this.postStore.loadPosts();
  },
};
</script>

<style scoped lang="scss"></style>
