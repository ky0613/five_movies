<template>
  <v-container text-center class="pa-2">
    <v-card class="white" rounded="lg">
      <v-card-title class="black--text mb-4 justify-center">
        私を構成する5本の映画
      </v-card-title>
      <v-row v-if="movies.length" class="mb-4 justify-center" no-gutters>
        <v-col
          v-for="movie in movies"
          :key="`img-${movie.id}`"
          align-self="center"
        >
          <v-img
            :src="'http://image.tmdb.org/t/p/w300/' + movie.poster_path"
            max-width="171"
            max-height="240"
          />
        </v-col>
      </v-row>
      <v-card-subtitle>
        <v-title
          v-for="movie in movies"
          :key="`title-${movie.id}`"
          class="black--text"
        >
          <br />『 {{ movie.title }} 』
        </v-title>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    movies() {
      return this.$store.state.movies.movies;
    },
  },
};
</script>
