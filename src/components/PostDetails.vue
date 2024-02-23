<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <p>Autor: {{ userStore.getUser(post.userId).name }}</p>
    <button @click="deletePost(post.id)">Usuń post</button>
    <button @click="closePost">Wróć do listy postów</button>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import usePostStore from '../store/postStore';
import useUserStore from '../store/userStore';
import apiService from '../apiService';

export default {
  props: ['post'],
  setup() {
    const postStore = usePostStore();
    const userStore = useUserStore();

    onMounted(async () => {
      await userStore.loadAllUsers();
    });

    const closePost = () => {
      postStore.selectedPost = null;
    };

    const deletePost = async (id) => {
      await apiService.deletePost(id);
      postStore.posts = postStore.posts.filter((p) => p.id !== id);
      closePost();
    };

    return { deletePost, closePost, userStore };
  },
};
</script>

<style scoped lang="scss"></style>
