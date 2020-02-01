<template>
  <div>
              Your Photos
              <ul>
                 <li v-for="(image, i) in profileImages" :key="'image-'+i" style="display: inline-block; margin: 10px;">
                  <div style="width: 300px; height: 300px; border: 1px solid #000;">
                    <img :src="image.path|imageSrcFilter" style="width: 100%;">
                    <div style="padding: 1em;">
                      <a @click="removeImage(image.imageId)" href="javascript:void(0);">
                          <span>
                            <i class="fas fa-trash"></i>&nbsp; Remove Image
                          </span>
                      </a>
                     </div>
                  </div>
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
    filters: {
      imageSrcFilter(src){
        console.log('Filter src: '+ src);
        if(src){
          return 'uploads/'+ src
        }

      }
    },
    methods: {
      async getUserPhotos(){
        const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        const photoRetrieved = await UserProfileService.getUserDetails(this.$store.state.userId._id);
        if(photoRetrieved){
            this.images = photoRetrieved.data.user.images.imagePaths;
        }
      },
      async removeImage(imageId){
        console.log(`Deleting image with Id: ${imageId}`);
        const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
          const photoDeleted = await UserProfileService.removeUploadedImg({imageId: imageId});
          if(photoDeleted.data.message ==='Image removed successfully'){
             this.images = photoDeleted.data.images;
          }
      }
    },
    computed: {
      profileImages(){
        return this.images;
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
