<template>
  <v-container text-center class="pa-2">
    <v-card class="white mr-auto ml-auto" rounded="lg" id="capture">
      <v-card-title
        class="black--text pt-10 mb-4 justify-center font-weight-bold text-sm-h4 text-h6"
      >
        #私を構成する5本の映画
      </v-card-title>
      <v-row
        v-if="movies.length"
        class="justify-center pb-10 mb-6 pr-15 pl-15 pr-md-18 pl-md-18"
        no-gutters
      >
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
    <v-card color="white">
      <v-card-subtitle class="black--text">
        私を構成する5本の映画は,
        <a @click="openDetailMovie(movies[0])">『{{ movies[0].title }}』</a>,
        <a @click="openDetailMovie(movies[1])">『{{ movies[1].title }}』</a>,
        <a @click="openDetailMovie(movies[2])">『{{ movies[2].title }}』</a>,
        <a @click="openDetailMovie(movies[3])">『{{ movies[3].title }}』</a>,
        <a @click="openDetailMovie(movies[4])">『{{ movies[4].title }}』</a>
        です。
      </v-card-subtitle>
    </v-card>
    <v-btn
      color="blue"
      class="mt-8"
      @click="twitterShare"
      :loading="loading"
      crossorigin="anonymous"
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
import * as htmlToImage from "html-to-image";

export default {
  asyncData({ $config: { baseUrl } }) {
    return { baseUrl };
  },
  data() {
    return {
      dialog: false,
      detailMovie: {},
      img: "",
      uuid: "",
      shareImgUrl: "",
      loading: false,
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies.movies;
    },
    url() {
      return encodeURIComponent(
        `${this.baseUrl}/results/${this.uuid}?movie_id_1=${this.movies[0].id}&movie_id_2=${this.movies[1].id}&movie_id_3=${this.movies[2].id}&movie_id_4=${this.movies[3].id}&movie_id_5=${this.movies[4].id}`
      );
    },
    textAndHashTag() {
      return encodeURIComponent(
        `私を構成する5本の映画は\n${this.movies[0].title}\n${this.movies[1].title}\n${this.movies[2].title}\n${this.movies[3].title}\n${this.movies[4].title}\nです。\r\n #私を構成する5本の映画`
      );
    },
    twitterUrl() {
      return `https://twitter.com/intent/tweet?text=${this.textAndHashTag} ${this.shareImgUrl}&url=${this.url}`;
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
    async twitterShare() {
      this.loading = true;
      await this.uploadImage();
      this.loading = false;
      this.share();
    },
    async uploadImage() {
      // カード画像のデータURLを作成
      const dataUrl = await htmlToImage.toPng(
        document.getElementById("capture")
      );
      // データURLをBLOB型に変換する
      const byteString = window.atob(dataUrl.split(",")[1]);
      const mimeType = dataUrl.match(/:([a-z\/\-]+);/)[1];
      let buffer = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        buffer[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([buffer], {
        type: mimeType,
      });

      // BLOB型の画像をFireBaseにアップロード
      this.uuid = this.generateUuid();
      const storageRef = this.$fire.storage.ref(`images/${this.uuid}.png`);
      await storageRef.put(blob);

      this.shareImgUrl = await storageRef.getDownloadURL();
    },
    share() {
      window.open(
        this.twitterUrl,
        "twitter",
        "top=200,left=300,width=600,height=400"
      );
    },
  },
};
</script>
