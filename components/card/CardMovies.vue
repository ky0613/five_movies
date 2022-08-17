<template>
  <v-card class="mr-auto ml-auto" rounded="lg" id="capture">
    <v-card-title
      class="pt-5 mb-2 justify-center font-weight-bold text-sm-h4 text-base"
    >
      {{ name }}さんを構成する5本の映画
    </v-card-title>
    <v-row v-if="movies.length" class="justify-center pb-3 mb-6" no-gutters>
      <v-col
        v-for="movie in movies"
        :key="`img-${movie.id}`"
        align-self="center"
        cols="2"
      >
        <v-img
          :src="'http://image.tmdb.org/t/p/w300' + movie.poster_path"
          @click="openModal(movie)"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    openModal(movie) {
      this.$emit("open-modal", movie);
    },
  },
};
</script>
