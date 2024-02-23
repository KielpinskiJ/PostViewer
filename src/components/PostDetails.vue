<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <p>Autor: {{ post.user.name }}</p>
    <button @click="deletePost(post.id)">Usuń post</button>
    <button @click="closePost">Wróć do listy postów</button>
  </div>
</template>

<script>
import usePostStore from '../store/postStore';
import apiService from '../apiService';

export default {
  props: ['post'],
  setup() {
    const postStore = usePostStore();

    const closePost = () => {
      postStore.selectedPost = null;
    };

    const deletePost = async (id) => {
      await apiService.deletePost(id);
      postStore.posts = postStore.posts.filter((p) => p.id !== id);
      closePost();
    };

    return { deletePost, closePost };
  },
};
</script>

<style scoped lang="scss"></style>
