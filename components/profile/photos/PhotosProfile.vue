<template>
  <div>
      Photos Profile
      <img v-for="(image, i) in images" :key="'image-'+i" :src="image.path" alt="">
  </div>
</template>

<script>

  export default {
    props:['user'],
    data(){
      return {
          images: this.user.images.imagePaths || []
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
