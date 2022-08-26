<template>
  <v-container>
    <CardHeadlineTitle>投稿検索</CardHeadlineTitle>
    <v-autocomplete
      :items="list"
      label="投稿検索"
      outlined
      dense
      prepend-icon="mdi-movie-search-outline"
      v-model="selectMovieTitle"
      @change="searchPost"
    />
    <v-row class="mt-2">
      <v-col v-for="post in posts" :key="post.id" cols="12" sm="6">
        <CardPost :post="post" :btnSmall="btnSmall" :imageUrl="imageUrl" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $config: { backendBaseUrl, imageUrl }, $axios }) {
    const list = await $axios.$get(`${backendBaseUrl}/movies/search_list`);
    return { backendBaseUrl, imageUrl, list };
  },
  data() {
    return {
      selectMovieTitle: "",
      posts: [],
    };
  },
  computed: {
    btnSmall() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return true;
        default:
          return false;
      }
    },
  },
  methods: {
    async searchPost() {
      const posts = await this.$axios.$get(
        `${this.backendBaseUrl}/posts/search`,
        { params: { search_title: this.selectMovieTitle } }
      );

      this.posts = posts;
    },
  },
};
</script>
