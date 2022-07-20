<template>
  <v-container>
    <v-row>
      <v-text-field
        prepend-icon="mdi-movie-search"
        type="search"
        label="映画検索"
        v-model="query"
        placeholder="検索したい映画を入力"
        solo
        height="30"
        rounded
        @input="getSearch"
        class="mt-4"
        id="searchField"
      />
      <v-switch v-model="toggle" label="詳細表示" class="ml-sm-5 pt-sm-3" />
    </v-row>
    <v-row>
      <v-col v-for="result in results" :key="result.id" cols="6" sm="3">
        <v-card height="100%" class="black--text white">
          <v-img
            :src="'http://image.tmdb.org/t/p/w300/' + result.poster_path"
          />
          <v-card-title class="justify-center text-body-1 text-sm-h6">{{
            result.title
          }}</v-card-title>
          <v-card-subtitle
            class="black--text justify-center text-caption text-sm-body-2"
          >
            {{ result.release_date }}
          </v-card-subtitle>
          <v-card-actions class="justify-center">
            <v-btn
              v-if="checkSelectMovie(result)"
              @click="removeMovies(result)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn v-else @click="pushMovies(result)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-text v-if="toggle" class="black--text">
            {{ result.overview }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  asyncData({ $config: { apiKey } }) {
    return { apiKey };
  },
  name: "TopIndex",
  data() {
    return {
      query: "",
      results: [],
      toggle: false,
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies.movies;
    },
  },
  mounted() {
    document.getElementById("searchField").focus();
  },
  methods: {
    getSearch() {
      this.$axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: { api_key: this.apiKey, query: this.query, language: "ja" },
        })
        .then((response) => {
          this.results = response.data.results;
        });
    },
    pushMovies(movie) {
      if (this.movies.length < 5)
        this.$store.dispatch("movies/addMovies", movie);
    },
    removeMovies(movie) {
      this.$store.dispatch("movies/deleteMovies", movie);
    },
    checkSelectMovie(result) {
      return this.movies.some((movie) => movie.id === result.id);
    },
  },
};
</script>
