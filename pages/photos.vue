<template>
    <div>
        <section style="max-width: 1200px; margin: 0 auto;">
            <ul>
                 <li v-for="(image, i) in profileImages" :key="'image-'+i" style="display: inline-block; margin: 10px;">
                  <div style="width: 300px; height: 300px; border: 1px solid #000;">
                     <div v-if="profile.random === 'false'">
                         <img :src="image.path|imageSrcFilter" style="width: 100%;">
                    </div>
                    <div v-if="profile.random === 'true' && profile.gender === 'male'">
                         <img :src="image.path|maleImageSrcFilter" style="width: 100%;">
                    </div>
                    <div v-if="profile.random === 'true' && profile.gender === 'female'">
                         <img :src="image.path|femaleImageSrcFilter" style="width: 100%;">
                    </div>
                     <div v-if="profile.random === 'true' && profile.gender === 'trans-female'">
                         <img :src="image.path|transFemaleImageSrcFilter" style="width: 100%;">
                    </div>
                     <div v-if="profile.random === 'true' && profile.gender === 'trans-male'">
                         <img :src="image.path|transMaleImageSrcFilter" style="width: 100%;">
                    </div>
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
          </section>
    </div>
</template>

<script>
  import UserProfileService from '../middleware/services/UserProfileService'
  export default {
    middleware: ['check-auth', 'auth', 'check-profile'],
    created(){
        this.getUserPhotos();
    },
    data(){
      return {
       images: [],
       profile: null,
      }
    },
    filters: {
      imageSrcFilter(src){
         return 'uploads/'+src;
      },
      maleImageSrcFilter(src){
        return 'random-users/men/'+ src;
      },
      femaleImageSrcFilter(src){
         return 'random-users/women/'+ src;
      },
      transMaleImageSrcFilter(src){
         return 'random-users/men/'+ src;
      },
      transFemaleImageSrcFilter(src){
        return 'random-users/women/'+ src;
      }
    },
    methods: {
      async getUserPhotos(){
        const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        const photoRetrieved = await UserProfileService.getUserDetails(this.$store.state.userId._id);
        if(photoRetrieved){
            this.images = photoRetrieved.data.user.images.imagePaths;
            this.profile = photoRetrieved.data.user;
        }
      },
      async removeImage(imageId){
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
