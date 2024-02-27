<template>
  <div id="app">
    <PostList />
    <PostDetails v-if="postStore.selectedPost" :post="postStore.selectedPost" />
  </div>
</template>

<script>
import { watch, onUnmounted } from 'vue';
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

    const updateBodyClass = () => {
      if (postStore.selectedPost) {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.marginRight = `${scrollBarWidth}px`;
        document.body.classList.add('modal-open');
      } else {
        document.body.style.marginRight = '0px';
        document.body.classList.remove('modal-open');
      }
    };

    watch(() => postStore.selectedPost, updateBodyClass);

    onUnmounted(() => {
      document.body.classList.remove('modal-open');
    });

    return { postStore };
  },
};
</script>

<style lang="scss">
@import './styles/colors.scss';

body, html {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  scrollbar-width: thin;
  background-color: $background-color;
  color: $text-color;
}

body.modal-open {
  overflow: hidden;
}

body.modal-open::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
}

</style>
