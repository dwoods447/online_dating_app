<template>
  <div>
              Your Photos
              <ul>
                 <li v-for="(image, i) in images" :key="'image-'+i">
                  <div class="max-width: 300px; max-height: 300px;"><img :src="image.path" style="width: 100%;"></div>
                 </li>
              </ul>

  </div>
</template>

<script>
  import UserProfileService from '../middleware/services/UserProfileService'
  export default {
    created(){
        this.getUserPhotos();
    },
    data(){
      return {
       images: [],
      }
    },
    methods: {
      async getUserPhotos(){
        const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        const photoRetrieved = await UserProfileService.getUserDetails(this.$store.state.userId._id);
        console.log(`Photo response: ${JSON.stringify(photoRetrieved)}`);
        if(photoRetrieved){
            this.images = photoRetrieved.data.user.images.imagePaths;
            console.log(`Image array: ${JSON.stringify(this.images)}`);
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
