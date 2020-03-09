<template>
  <div>
        <div>
          <div class="">
            <a @click="goToProfileDetail(profile._id, profile)" href="#">
              <div style="max-width: 127px; max-height:127px;">
                <div v-if="profile.random === 'true'">
                  <div v-if="profile.gender ==='male'">
                    <img :src="profile | maleImageSrcFilter" alt="" style="width: 100%;">
                  </div>
                  <div v-if="profile.gender ==='female'">
                    <img :src="profile | femaleImageSrcFilter" alt="" style="width: 100%;">
                  </div>
                  <div v-if="profile.gender ==='trans-male'">
                    <img :src="profile | transMaleImageSrcFilter" alt="" style="width: 100%;">
                  </div>
                  <div v-if="profile.gender ==='trans-female'">
                    <img :src="profile | transFemaleImageSrcFilter" alt="" style="width: 100%;">
                  </div>
                </div>
                <div v-if="profile.random === 'false'">
                  <img :src="profile | imageSrcFilter" alt="" style="width: 100%;">
                </div>
              </div>
              <br/>{{ profile.username }}
            </a>
          </div>
        </div>
  </div>
</template>

<script>
import eventBus from '../../../middleware/eventBus/index'
  export default {
    props: ['profile'],
    created(){
    },
    data(){
      return {

      }
    },
     filters: {
      imageSrcFilter(profile){
         return '../uploads/'+profile.images.imagePaths[0].path;
      },
      maleImageSrcFilter(profile){
        return '../random-users/men/'+ profile.images.imagePaths[0].path;
      },
      femaleImageSrcFilter(profile){
         return '../random-users/women/'+ profile.images.imagePaths[0].path;
      },
      transMaleImageSrcFilter(profile){
         return '../random-users/men/'+ profile.images.imagePaths[0].path;
      },
      transFemaleImageSrcFilter(profile){
        return '../random-users/women/'+ profile.images.imagePaths[0].path;
      }
    },
    methods: {
        goToProfileDetail(id, profile){
          if(this.$store.getters.isAutheticated){
            this.$router.push({path: '/profile/'+ id, params: {id: id, userProfile: profile}});
          }
         eventBus.$emit('prompt-login', {id: id, userProfile: profile});
         return;
        }
    }
  }
</script>

<style scoped>

</style>
