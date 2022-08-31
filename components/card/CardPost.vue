<template>
  <v-card nuxt :to="`/posts/${post.uuid}`">
    <v-row align="center" justify="center" class="pt-4">
      <p class="text-overline text-sm-h5 text-center">
        {{ post.name }}さんを<br />構成する5本の映画
      </p>
    </v-row>
    <v-img
      :src="`https://five-movies.s3.ap-northeast-1.amazonaws.com/uploads/post/image/${post.id}/${post.uuid}.jpg`"
      contain
    />
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
  },
};
</script>
