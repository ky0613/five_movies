<template>
  <v-container text-center class="pa-2">
    <CardMovies :movies="movies" @open-modal="openDetailMovie" />
    <CardMovieTitles :movies="movies" @open-modal-title="openDetailMovie" />
    <v-card class="mt-5 mr-auto ml-auto pt-2">
      <p class="text-body-2 flex text-center">
        <v-icon small>mdi-information-outline</v-icon>
        共有する時のニックネームを入力してください
      </p>
      <v-card-actions>
        <v-row align="center">
          <v-text-field
            v-model="name"
            label="ニックネーム"
            prepend-icon="mdi-lead-pencil"
            outlined
            counter="10"
            class="ml-3 mr-3"
          />
          <v-btn
            color="blue"
            class="ml-sm-3 mr-sm-3 mb-5 ml-auto mr-auto"
            @click="twitterShare"
            :loading="loading"
            :disabled="!name"
          >
            <v-icon class="mr-2">mdi-twitter</v-icon>結果をツイート
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
    <MovieDetailDialog
      :dialog="dialog"
      :detailMovie="detailMovie"
      @close-modal="closeDetailMovie"
    />
  </v-container>
</template>

<script>
import CardMovies from "../components/CardMovies.vue";
import CardMovieTitles from "../components/CardMovieTitles.vue";
import MovieDetailDialog from "../components/MovieDetailDialog.vue";

export default {
  asyncData({ $config: { baseUrl, backendBaseUrl } }) {
    return { baseUrl, backendBaseUrl };
  },
  components: {
    CardMovies,
    CardMovieTitles,
    MovieDetailDialog,
  },
  data() {
    return {
      dialog: false,
      detailMovie: {},
      uuid: "",
      loading: false,
      name: "",
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies.movies;
    },
    url() {
      return encodeURIComponent(`${this.baseUrl}/results/${this.uuid}`);
    },
    textAndHashTag() {
      return encodeURIComponent(
        `${this.name}さんを構成する5本の映画は\n${this.movies[0].title}\n${this.movies[1].title}\n${this.movies[2].title}\n${this.movies[3].title}\n${this.movies[4].title}\nです。\r\n #私を構成する5本の映画`
      );
    },
    twitterUrl() {
      return `https://twitter.com/intent/tweet?text=${this.textAndHashTag}&url=${this.url}`;
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
    generateUuid() {
      const strong = 1000;
      return (
        new Date().getTime().toString(16) +
        Math.floor(strong * Math.random()).toString(16)
      );
    },
    async createPostImage() {
      const image_paths = this.movies.map(
        (movie) => "http://image.tmdb.org/t/p/w300" + movie.poster_path
      );
      const movie_ids = this.movies.map((movie) => movie.id);
      const response = await this.$axios.post(`${this.backendBaseUrl}/posts`, {
        uuid: this.generateUuid(),
        name: this.name,
        image_paths,
        movie_ids,
      });
      this.uuid = response.data;
    },
    share() {
      if (navigator.share) {
        return navigator.share({
          title: "twitter",
          url: decodeURIComponent(this.url),
          text: decodeURIComponent(this.textAndHashTag),
        });
      }

      window.open(this.twitterUrl, "_blank");
    },
    async twitterShare() {
      this.loading = true;
      await this.createPostImage();
      this.loading = false;
      this.share();
    },
  },
};
</script>
