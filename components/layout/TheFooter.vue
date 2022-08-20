<template>
  <div>
    <v-bottom-navigation
      v-model="value"
      v-if="isBottomNavigation"
      color="yellow"
      app
    >
      <v-btn value="create" to="/" nuxt>
        <span>Create</span>
        <v-icon>mdi-movie-star-outline</v-icon>
      </v-btn>
      <v-btn value="posts" to="/posts" nuxt>
        <span>All Posts</span>
        <v-icon>mdi-movie-roll</v-icon>
      </v-btn>
      <v-btn value="search" to="/search" nuxt>
        <span>Search</span>
        <v-icon>mdi-movie-search-outline</v-icon>
      </v-btn>
      <v-btn value="ranking" to="/ranking" nuxt>
        <span>Ranking</span>
        <v-icon>mdi-filmstrip-box-multiple</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-footer app v-else>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </div>
</template>

<script>
export default {
  props: {
    isBottomNavigation: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      fixed: false,
      value: null,
    };
  },
};
</script>
