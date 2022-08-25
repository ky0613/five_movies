<template>
  <div>
    <v-dialog width="80%" v-model="dialog" class="mx-0">
      <template #activator="{ on, attrs }">
        <v-btn
          color="yellow"
          v-bind="attrs"
          v-on="on"
          class="black--text"
          :small="btnSmall"
        >
          <v-icon class="mr-1" color="black">mdi-movie</v-icon>
          {{ movies.length === selectNumber ? "画像作成" : "プレビュー" }}
          <v-badge
            color="primary"
            v-if="movies.length"
            :content="movies.length"
          />
        </v-btn>
      </template>
      <template #default="dialog">
        <v-card height="100%">
          <draggable
            v-if="movies.length"
            v-model="movies"
            element="div"
            draggable=".movie"
            :options="options"
            style="justify-content: center; align-items: center"
            class="row no-gutters"
            height="900"
          >
            <v-col
              v-for="movie in movies"
              :key="movie.id"
              class="movie mt-10"
              cols="4"
              sm="2"
            >
              <div class="text-center">
                <v-img
                  :src="'http://image.tmdb.org/t/p/w300/' + movie.poster_path"
                  min-height="80"
                  class="mb-3"
                />
                <v-btn :small="btnSmall" @click="removeMovies(movie)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </div>
            </v-col>
          </draggable>
          <v-container v-else style="height: 300px">
            <div style="height: 100%" class="text-center">
              <p class="mt-16">
                <v-icon>mdi-information-outline</v-icon>
                ここに選んだ映画が表示されます。
              </p>
            </div>
          </v-container>
          <v-card-actions>
            <v-col>
              <p class="text-center text-body-2 text-sm-subtitle-2">
                <v-icon>mdi-information-outline</v-icon>
                ドラッグ＆ドロップで映画を並び替えられます。
              </p>
              <v-row class="mb-8 mt-8 text-center">
                <v-col cols="12" sm="4">
                  <v-btn color="green" @click="goResult" :small="btnSmall">
                    画像を作成する
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-btn :small="btnSmall" color="red" @click="deleteAllMovies">
                    選んだ映画を全て削除する
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-btn :small="btnSmall" color="blue" @click="closeDialog">
                    閉じる
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      color="red"
      timeout="1500"
      width="350"
      top
      fixed
      class="mt-2"
      style="top: 100px"
    >
      <v-icon class="mr-2">mdi-movie-open-remove-outline</v-icon>
      {{ selectNumber }}本の映画を選択してください。
    </v-snackbar>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  props: {
    selectNumber: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      options: {
        animation: 200,
      },
      snackbar: false,
    };
  },
  computed: {
    movies: {
      get() {
        return this.$store.state.movies.movies;
      },
      set(value) {
        return this.$store.dispatch("movies/updateMovies", value);
      },
    },
    btnSmall() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return true;
        default:
          return false;
      }
    },
  },
  methods: {
    removeMovies(movie) {
      this.$store.dispatch("movies/deleteMovies", movie);
    },
    deleteAllMovies() {
      this.$store.dispatch("movies/deleteAllMovies");
      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
    },
    goResult() {
      if (this.movies.length === this.selectNumber) {
        this.$router.push("/result");
      } else {
        this.snackbar = true;
      }
      this.closeDialog();
    },
  },
};
</script>
