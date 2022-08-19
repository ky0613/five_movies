<template>
  <v-container>
    <CardHeadlineTitle>ランキング</CardHeadlineTitle>
    <v-card v-for="(movie, i) in movies" :key="movie.id" class="pa-3 mb-2">
      <p class="text-center text-h5">{{ i + 1 }}位</p>
      <CardMovieDetail :movie="movie" :ranking="true" />
    </v-card>
  </v-container>
</template>

<script>
import CardHeadlineTitle from "../../components/card/CardHeadlineTitle.vue";
import CardMovieDetail from "../../components/card/CardMovieDetail.vue";

export default {
  components: {
    CardHeadlineTitle,
    CardMovieDetail,
  },
  async asyncData({ $config: { backendBaseUrl }, $axios }) {
    const movies = await $axios.$get(`${backendBaseUrl}/movies/ranking`);
    return { movies };
  },
};
</script>
