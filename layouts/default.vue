<template>
  <v-app dark>
    <!-- <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title
        v-text="title"
        @click="jumpHome"
        style="cursor: pointer"
        class="ml-3 ml-sm-8 text-body-1 text-sm-h5"
      />
      <v-spacer />
      <v-dialog width="80%" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="orange" v-bind="attrs" v-on="on">
            <v-icon class="mr-2">mdi-movie</v-icon>画像プレビュー
            <v-badge
              color="primary"
              v-if="movies.length"
              :content="movies.length"
            />
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card height="100%">
            <draggable
              v-if="movies.length"
              v-model="movies"
              element="div"
              draggable=".movie"
              :options="options"
              style="justify-content: center; align-items: center"
              class="row"
              height="900"
            >
              <v-col
                v-for="movie in movies"
                :key="movie.id"
                class="movie mt-10"
                cols="2"
              >
                <div>
                  <v-img
                    :src="'http://image.tmdb.org/t/p/w300/' + movie.poster_path"
                    max-height="260"
                    class="mb-3"
                  />
                  <v-btn @click="removeMovies(movie)" class="mr-auto ml-auto">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </draggable>
            <v-container v-else style="height: 300px">
              <div style="height: 100%" class="text-center">
                <p class="mt-16">ここに選んだ映画が表示されます。</p>
              </div>
            </v-container>
            <v-card-actions>
              <v-row justify="center" align="center" class="mb-8 mt-8">
                <v-btn
                  color="green"
                  class="mr-4 text-sm-button"
                  @click="goResult"
                >
                  画像を作成する
                </v-btn>
                <v-btn color="red" @click="deleteAllMovies">
                  選んだ映画を全て削除する
                </v-btn>
                <v-btn color="blue" @click="closeDialog" class="ml-4">
                  閉じる
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-app-bar>
    <v-snackbar
      v-model="snackbar"
      color="red"
      timeout="2000"
      width="350"
      top
      class="mt-2"
    >
      5本の映画を選択してください。
    </v-snackbar>
    <v-main class="orange lighten-2">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "DefaultLayout",
  components: {
    draggable,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      // items: [
      //   {
      //     icon: "mdi-apps",
      //     title: "トップページ",
      //     to: "/",
      //   },
      //   {
      //     icon: "mdi-chart-bubble",
      //     title: "みんなの5本の映画",
      //     to: "/inspire",
      //   },
      // ],
      title: "#私を構成する5本の映画",
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
  },
  methods: {
    removeMovies(movie) {
      this.$store.dispatch("movies/deleteMovies", movie);
    },
    deleteAllMovies() {
      this.$store.dispatch("movies/deleteAllMovies");
      this.closeDialog();
    },
    goResult() {
      if (this.movies.length === 5) {
        this.$router.push("/result");
      } else {
        this.snackbar = true;
      }
      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
    },
    jumpHome() {
      window.location.href = "/";
    },
  },
};
</script>
