<template>
  <div class="modal" v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <p>Autor: {{ userStore.getUser(post.userId).name }}</p>
    <div class="buttons">
      <button class="button button-back" @click="closePost">Wróć do listy postów</button>
      <button class="button button-delete" @click="deletePost(post.id)">Usuń post</button>
    </div>
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
      postStore.deletePost(id);
      closePost();
    };

    return { deletePost, closePost, userStore };
  },
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/button.scss';

.modal {
  font-size: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 800px;
  padding: 20px;
  background-color: $post-details-background-color;
  color: $text-color-secondary;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.buttons {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}

</style>
