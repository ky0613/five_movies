<template>
  <v-container text-center class="pa-2">
    <v-card class="white" rounded="lg">
      <v-card-title
        class="black--text pt-4 mb-4 justify-center font-weight-bold text-h3"
      >
        #私を構成する5本の映画
      </v-card-title>
      <v-row v-if="movies.length" class="justify-center" no-gutters>
        <v-col
          v-for="movie in movies"
          :key="`img-${movie.id}`"
          align-self="center"
          cols="2"
        >
          <v-img
            :src="'http://image.tmdb.org/t/p/w300/' + movie.poster_path"
            max-height="270"
            @click="openDetailMovie(movie)"
          />
        </v-col>
      </v-row>
      <v-card-subtitle>
        <v-title
          v-for="movie in movies"
          :key="`title-${movie.id}`"
          class="black--text"
        >
          <br />
          <a @click="openDetailMovie(movie)">『 {{ movie.title }} 』</a>
        </v-title>
      </v-card-subtitle>
    </v-card>
    <v-dialog v-model="dialog" width="60%">
      <v-card>
        <v-row>
          <v-img
            :src="'http://image.tmdb.org/t/p/w300/' + detailMovie.poster_path"
            max-width="360"
          />
          <v-col align-self="center">
            <v-card-title class="mb-6 text-h4 justify-center">
              {{ detailMovie.title }}
            </v-card-title>
            <v-card-subtitle>
              公開日: {{ detailMovie.release_date }}
            </v-card-subtitle>
            <v-card-actions class="mb-5">
              <v-btn
                :href="'https://www.themoviedb.org/movie/' + detailMovie.id"
                color="green"
                target="_blank"
                class="ml-auto"
              >
                詳細(外部リンク)
              </v-btn>
            </v-card-actions>
            <v-rating
              half-increments
              readonly
              length="10"
              :value="Number(detailMovie.vote_average)"
              color="yellow"
              dense
              class="ml-5"
            />
            <v-card-subtitle>
              評価: {{ detailMovie.vote_average }} / 10 ({{
                detailMovie.vote_count
              }})
            </v-card-subtitle>
            <v-card-actions>
              <v-btn class="ml-auto mt-auto blue" @click="closeDetailMovie">
                閉じる
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      detailMovie: {},
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies.movies;
    },
  },
  methods: {
    openDetailMovie(movie) {
      this.detailMovie = movie;
      this.dialog = true;
    },
    closeDetailMovie() {
      this.dialog = false;
    },
  },
};
</script>
