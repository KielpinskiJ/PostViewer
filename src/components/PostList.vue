<template>
  <div>
    <select @change="postStore.setSort($event.target.value)">
      <option value="">Sortuj według...</option>
      <option value="alphabetical">Alfabetycznie</option>
      <option value="reverseAlphabetical">Od końca alfabetu</option>
      <option value="longest">Najdłuższy post</option>
      <option value="shortest">Najkrótszy post</option>
    </select>

    <select @change="postStore.setFilter($event.target.value)">
      <option value="">Filtruj według użytkownika...</option>
      <option v-for="user in userStore.users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>

    <input @input="postStore.setSearch($event.target.value)" placeholder="Wyszukaj..." />

    <div v-for="post in postStore.posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body.substring(0, 100) }}...</p>
      <p>Autor: {{ userStore.getUser(post.userId).name }}</p>
      <button @click="deletePost(post.id)">Usuń post</button>
      <button @click="viewPost(post)">Zobacz więcej</button>
    </div>

    <button
      @click="postStore.prevPage()"
      :disabled="postStore.page === 1"
    >
      Poprzednia strona
    </button>
    <button
      @click="postStore.nextPage()"
      :disabled="postStore.page * 10 >= postStore.filteredPosts.length"
    >
      Następna strona
    </button>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import useUserStore from '../store/userStore';
import usePostStore from '../store/postStore';
import apiService from '../apiService';

export default {
  setup() {
    const userStore = useUserStore();
    const postStore = usePostStore();

    onMounted(async () => {
      await userStore.loadAllUsers();
      await postStore.loadAllPosts();
      postStore.loadPosts(
        postStore.searchState.sort,
        postStore.searchState.filter,
        postStore.searchState.search,
      );
    });

    const deletePost = async (id) => {
      await apiService.deletePost(id);
      postStore.deletePost(id);
    };

    const viewPost = (post) => {
      postStore.selectedPost = post;
    };

    return {
      postStore,
      userStore,
      deletePost,
      viewPost,
    };
  },
};
</script>

<style scoped lang="scss"></style>
