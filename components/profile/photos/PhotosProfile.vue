<template>
  <div>
      Photos Profile

        <div v-if="random === 'true'">
          <div v-if="gender==='male'">
             <img v-for="(image, i) in images" :key="'image-'+i" :src="image.path|maleImageSrcFilter" alt="">
          </div>
          <div v-if="gender==='female'">
             <img v-for="(image, i) in images" :key="'image-'+i" :src="image.path|femaleImageSrcFilter" alt="">
          </div>
          <div v-if="gender==='trans-male'">
             <img v-for="(image, i) in images" :key="'image-'+i" :src="image.path|transMaleImageSrcFilter" alt="">
          </div>
          <div v-if="gender==='trans-female'">
             <img v-for="(image, i) in images" :key="'image-'+i" :src="image.path|transFemaleImageSrcFilter" alt="">
          </div>
        </div>
        <div v-if="random === 'false'">
            <div>
                <img v-for="(image, i) in images" :key="'image-'+i" :src="image.path|imageSrcFilter" alt="">
            </div>
        </div>
  </div>
</template>

<script>

  export default {
    props:['user'],
    created(){
      this.gender = this.user.gender;
      this.random = this.user.random;
      this.images = this.user.images.imagePaths;
      console.log(`Photos for user: ${JSON.stringify(this.images)}`)
    },
    data(){
      return {
          images: this.user.images.imagePaths || [],
          gender: this.user.gender,
          random: this.user.random,
      }
    },
    filters: {
      imageSrcFilter(src){
         return '../uploads/'+src;
      },
      maleImageSrcFilter(src){
        return '../random-users/men/'+ src;
      },
      femaleImageSrcFilter(src){
         return '../random-users/women/'+ src;
      },
      transMaleImageSrcFilter(src){
         return '../random-users/men/'+ src;
      },
      transFemaleImageSrcFilter(src){
        return '../random-users/women/'+ src;
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
