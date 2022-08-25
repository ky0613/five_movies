<template>
  <v-card>
    <v-row align="center" justify="center" class="pt-4">
      <p class="text-overline text-sm-h5 text-center">
        {{ post.name }}さんを<br />構成する5本の映画
      </p>
      <v-btn
        :to="`/posts/${post.uuid}`"
        :small="btnSmall"
        class="ml-8 mb-5 black--text"
        color="yellow"
      >
        詳細ページ
      </v-btn>
    </v-row>
    <v-img :src="imageUrl + post.image.url" contain />
  </v-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    btnSmall: {
      type: Boolean,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
};
</script>
