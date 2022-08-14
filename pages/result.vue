<template>
  <v-container text-center class="pa-2">
    <v-card class="mr-auto ml-auto" rounded="lg" id="capture">
      <v-card-title
        class="pt-5 mb-2 justify-center font-weight-bold text-sm-h4 text-base"
      >
        #私を構成する5本の映画
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
            @click="openDetailMovie(movie)"
          />
        </v-col>
      </v-row>
    </v-card>
    <v-card color="black">
      <v-card-subtitle>
        <a @click="openDetailMovie(movies[0])">『{{ movies[0].title }}』</a>,
        <a @click="openDetailMovie(movies[1])">『{{ movies[1].title }}』</a>,
        <a @click="openDetailMovie(movies[2])">『{{ movies[2].title }}』</a>,
        <a @click="openDetailMovie(movies[3])">『{{ movies[3].title }}』</a>,
        <a @click="openDetailMovie(movies[4])">『{{ movies[4].title }}』</a>
      </v-card-subtitle>
    </v-card>
    <v-card max-width="80%" class="mt-5 mr-auto ml-auto">
      <v-card-actions>
        <v-text-field
          v-model="name"
          label="ニックネーム"
          prepend-icon="mdi-lead-pencil"
          outlined
          counter="10"
        />
      </v-card-actions>
      <v-card-title class="text-body-2 flex text-center">
        <v-icon>mdi-information-outline</v-icon>
        共有する時のニックネームを入力してください
      </v-card-title>
    </v-card>
    <v-btn
      color="blue"
      class="mt-8"
      @click="createPostImage"
      :loading="loading"
    >
      <v-icon class="mr-2">mdi-twitter</v-icon>結果をツイート
    </v-btn>
    <v-dialog v-model="dialog" width="60%">
      <v-card width="100%">
        <v-row>
          <v-img
            :src="'http://image.tmdb.org/t/p/w300/' + detailMovie.poster_path"
          />
          <v-col align-self="center" width="800">
            <v-card-title class="mb-6 text-sm-h4">
              {{ detailMovie.title }}
            </v-card-title>
            <v-card-subtitle>
              公開日: {{ detailMovie.release_date }}
            </v-card-subtitle>
            <v-progress-circular
              :rotate="270"
              :size="64"
              :width="10"
              :value="Number(detailMovie.vote_average) * 10"
              color="green"
              class="ml-4 ml-sm-10"
            >
              {{ Number(detailMovie.vote_average) * 10 }}%
            </v-progress-circular>
            <v-card-subtitle class="mb-6">
              評価件数: {{ detailMovie.vote_count }}
            </v-card-subtitle>
            <v-card-actions class="mb-4 mb-sm-0">
              <v-row class="justify-end">
                <v-btn
                  :href="'https://www.themoviedb.org/movie/' + detailMovie.id"
                  color="green"
                  target="_blank"
                  class="mr-3 mb-4"
                >
                  詳細(外部リンク)
                </v-btn>
                <v-btn class="blue mr-3 mb-4" @click="closeDetailMovie">
                  閉じる
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  asyncData({ $config: { baseUrl } }) {
    return { baseUrl };
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
        `私を構成する5本の映画は\n${this.movies[0].title}\n${this.movies[1].title}\n${this.movies[2].title}\n${this.movies[3].title}\n${this.movies[4].title}\nです。\r\n #私を構成する5本の映画`
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
      const response = await this.$axios.post(`${this.baseUrl}/api/v1/posts`, {
        uuid: this.generateUuid(),
        name: this.name,
        image_paths,
        movie_ids,
      });
      this.uuid = response.data;
    },
    share() {
      window.open(
        this.twitterUrl,
        "twitter",
        "top=200,left=300,width=600,height=400"
      );
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
