<template>
  <v-card color="blue-grey darken-4">
    <v-row align="center" justify="center" class="pt-4">
      <p class="text-overline text-sm-h5 text-center">
        {{ post.name }}さんを<br />構成する{{ post.movie_count }}本の映画
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
    <v-img :src="imgSrc" contain />
  </v-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
      props: true,
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
  computed: {
    imgSrc() {
      const { id, uuid, movie_count } = this.post;
      if (movie_count === "5") {
        return `${this.imageUrl}/uploads/post/image/${id}/${uuid}.jpg`;
      }
      return `${this.imageUrl}/uploads/post/image/${id}/share_${uuid}.jpg`;
    },
  },
};
</script>
