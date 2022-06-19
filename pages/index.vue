<template>
  <v-container text-center>
    <draggable
      v-if="movies.length"
      v-model="movies"
      tag="v-row"
      draggable=".movie"
      :options="options"
      class="justify-center"
    >
      <v-col v-for="movie in movies" :key="movie.id" class="movie" cols="2">
        <v-img
          :src="'http://image.tmdb.org/t/p/w300/' + movie.poster_path"
          max-height="260"
          class="mb-3"
        />
        <v-btn @click="removemovies(movie)">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-col>
    </draggable>
    <v-btn
      v-if="this.movies.length === 5"
      class="mt-8 mb-8 blue"
      @click="goResult"
    >
      画像を作成する
    </v-btn>
    <v-row align-content="center">
      <v-text-field
        prepend-icon="mdi-movie-search"
        type="text"
        label="映画検索"
        v-model="query"
        placeholder="検索したい映画を入力"
        solo
        height="30"
        rounded
        @keypress.enter="getSearch"
      />
      <v-btn
        class="mx-2"
        fab
        dark
        color="green"
        elevation="1"
        @click="getSearch"
      >
        <v-icon dark>mdi-magnify</v-icon>
      </v-btn>
      <v-switch v-model="toggle" label="詳細表示" />
    </v-row>
    <v-row>
      <v-col v-for="result in results" :key="result.id" cols="12" sm="3">
        <v-card height="100%" class="black--text white">
          <v-img
            :src="'http://image.tmdb.org/t/p/w300/' + result.poster_path"
          />
          <v-card-title class="justify-center">{{ result.title }}</v-card-title>
          <v-card-subtitle class="black--text justify-center">
            {{ result.release_date }}
          </v-card-subtitle>
          <v-card-actions @click="pushmovies(result)" class="justify-center">
            <v-btn>
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
import draggable from "vuedraggable";

export default {
  asyncData({ $config: { apiKey } }) {
    return { apiKey };
  },
  name: "TopIndex",
  components: {
    draggable,
  },
  data() {
    return {
      query: "",
      results: [],
      toggle: false,
      movies: [],
      options: {
        animation: 200,
      },
    };
  },
  methods: {
    getSearch() {
      this.$axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.query}&language=ja`
        )
        .then((response) => {
          console.log(response.data.results);
          this.results = response.data.results;
        });
    },
    pushmovies(item) {
      if (this.movies.length < 5) this.movies.push(item);
    },
    removemovies(item) {
      this.movies = this.movies.filter((movie) => movie.id !== item.id);
    },
    goResult() {
      this.$store.commit("movies/add", this.movies);
      this.$router.push("/result");
    },
  },
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
</style>
