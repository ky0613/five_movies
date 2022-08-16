<template>
  <v-dialog v-model="dialog" width="60vh">
    <v-container>
      <v-card>
        <v-row justify="center">
          <v-img
            :src="'http://image.tmdb.org/t/p/w300/' + detailMovie.poster_path"
            contain
            max-width="230"
          />
          <v-col align-self="center" width="800" justify-center>
            <v-card-title class="mb-6 text-sm-subtitle-2">
              {{ detailMovie.title }}
            </v-card-title>
            <v-card-subtitle>
              公開日: {{ detailMovie.release_date }}
            </v-card-subtitle>
            <v-progress-circular
              :rotate="270"
              :size="54"
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
                  small
                >
                  詳細(外部リンク)
                </v-btn>
                <v-btn class="blue mr-3 mb-4" small @click="closeModal">
                  閉じる
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    detailMovie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
