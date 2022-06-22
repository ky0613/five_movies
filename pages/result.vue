<template>
  <v-container text-center class="pa-2">
    <v-card class="white" rounded="lg" id="capture">
      <v-card-title
        class="black--text pt-4 mb-4 justify-center font-weight-bold text-h3"
      >
        #私を構成する5本の映画
      </v-card-title>
      <v-row v-if="movies.length" class="justify-center pb-10 mb-6" no-gutters>
        <v-col
          v-for="movie in movies"
          :key="`img-${movie.id}`"
          align-self="center"
          cols="2"
        >
          <v-img
            :src="'http://image.tmdb.org/t/p/w300' + movie.poster_path"
            max-height="270"
            @click="openDetailMovie(movie)"
          />
        </v-col>
      </v-row>
    </v-card>
    <v-row
      v-for="movie in movies"
      :key="`title-${movie.id}`"
      class="black--text"
    >
      <a @click="openDetailMovie(movie)">『 {{ movie.title }} 』</a>
    </v-row>
    <v-btn @click="takeImage">画像保存</v-btn>
    <v-btn @click="appearImage">画像表示</v-btn>
    <img id="result" />
    <v-dialog v-model="dialog" width="60%">
      <v-card>
        <v-row>
          <v-img
            :src="'http://image.tmdb.org/t/p/w300/' + detailMovie.poster_path"
            max-width="360"
          />
          <v-col align-self="center">
            <v-card-title class="mb-6 text-h4">
              {{ detailMovie.title }}
            </v-card-title>
            <v-card-subtitle>
              公開日: {{ detailMovie.release_date }}
            </v-card-subtitle>
            <v-rating
              half-increments
              readonly
              length="10"
              :value="Number(detailMovie.vote_average)"
              color="yellow"
              dense
              class="ml-3"
            />
            <v-card-subtitle class="mb-6">
              評価: {{ detailMovie.vote_average }} / 10 ({{
                detailMovie.vote_count
              }})
            </v-card-subtitle>
            <v-card-actions>
              <v-row class="justify-end">
                <v-btn
                  :href="'https://www.themoviedb.org/movie/' + detailMovie.id"
                  color="green"
                  target="_blank"
                  class="mr-3"
                >
                  詳細(外部リンク)
                </v-btn>
                <v-btn class="blue mr-3" @click="closeDetailMovie">
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
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export default {
  data() {
    return {
      dialog: false,
      detailMovie: {},
      img: null,
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
    takeImage() {
      const imagesRef = ref(this.$storage, "images/test.png");
      htmlToImage
        .toPng(document.getElementById("capture"))
        .then(function (dataUrl) {
          const byteString = window.atob(dataUrl.split(",")[1]);
          const mimeType = dataUrl.match(/:([a-z\/\-]+);/)[1];
          let buffer = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            buffer[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([buffer], {
            type: mimeType,
          });
          uploadBytes(imagesRef, blob);
        });
    },
    appearImage() {
      getDownloadURL(ref(this.$storage, "images/test.png")).then((url) => {
        const result = document.getElementById("result");
        result.src = url;
      });
    },
  },
};
</script>
