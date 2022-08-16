<template>
  <v-card>
    <v-card-subtitle>
      <span v-for="(movie, i) in movies" :key="movie.id">
        <a @click="openModal(movie)">『{{ movie.title }}』</a>
        {{ i === 4 ? "" : "," }}
      </span>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openModal(movie) {
      this.$emit("open-modal-title", movie);
    },
  },
};
</script>
