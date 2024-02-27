<template>
  <div>
    <div class="posts-filters">
      <select aria-label="Sortuj według" @change="postStore.setSort($event.target.value)">
        <option value="">Sortuj według...</option>
        <option value="alphabetical">Alfabetycznie</option>
        <option value="reverseAlphabetical">Od końca alfabetu</option>
        <option value="longest">Najdłuższy post</option>
        <option value="shortest">Najkrótszy post</option>
      </select>

      <select aria-label="Filtruj według użytkownika"
        @change="postStore.setFilter($event.target.value)">
        <option value="">Filtruj według użytkownika...</option>
        <option v-for="user in userStore.users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>

      <input @input="postStore.setSearch($event.target.value)" placeholder="Wyszukaj..." />
    </div>

    <div class="post-wrapper">
      <div v-if="postStore.apiError">
        <h2>Wystąpił błąd podczas pobierania postów. Spróbuj ponownie później.</h2>
      </div>
      <div class="post" v-for="post in postStore.posts" :key="post.id" v-else>
        <h2 class="post-title">{{ post.title }}</h2>
        <p>{{ post.body.substring(0, 100) }}...</p>
        <p class="author">Autor: {{ userStore.getUser(post.userId).name }}</p>
        <div class="buttons">
          <button class="button button-view" @click="viewPost(post)">Zobacz więcej</button>
          <button class="button button-delete" @click="deletePost(post.id)">Usuń post</button>
        </div>
      </div>
    </div>

    <div class="buttons-bottom">
      <button class="button button-prev"
        @click="postStore.prevPage()"
        :disabled="postStore.page === 1"
      >
        Poprzednia strona
      </button>
      <span class="page-info">Strona: {{ postStore.page }} / {{ postStore.lastPage }}</span>
      <button class="button button-next"
        @click="postStore.nextPage()"
        :disabled="postStore.page * 10 >= postStore.filteredPosts.length"
      >
        Następna strona
      </button>
    </div>
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

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/button.scss';

.posts-filters {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;

  select, input {
    background-color: $post-filters-background-color;
    color: white;
    padding: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
  }
}

.post-wrapper {
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin: 0 auto;
}

@media (min-width: 600px) {
  .post-wrapper {
    grid-template-columns: repeat(2, 1fr);
    max-width: 1000px;
  }

  .posts-filters {
    margin: 0 auto;
    flex-direction: row;
    justify-content: space-between;
    max-width: 1000px
  }
}
.post {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba($post-background-color, 0.5);

  &-title {
    flex-grow: 1;
  }
}

.author {
  margin-top: auto;
  padding-top: 20px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}

.buttons-bottom {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 800px;
  padding: 0 20px 20px 20px;
}

.page-info {
  align-self: center;
}
</style>
