<template>
  <div>
        <div>
          <div class="">
            <a @click="goToProfileDetail(profile._id, profile)" href="#"><div style="max-width: 127px; max-height:127px;"><img :src="profile | imageSrcFilter" alt="" style="width: 100%;"></div><br/>{{ profile.username }}</a>
          </div>
        </div>
  </div>
</template>

<script>
import eventBus from '../../../middleware/eventBus/index'
  export default {
    props: ['profile'],
    created(){
      console.log(`Profile Passed in: ${JSON.stringify(this.profile)}`)

    },
    data(){
      return {

      }
    },
     filters: {
      imageSrcFilter(profile){
       // console.log('Filter src: '+ JSON.stringify(profile));
         if(!profile){
          return ''
        }
        if(profile.images.imagePaths[0].path === 'no-photo-provided.png'){
             return 'uploads/'+ profile.images.imagePaths[0].path;
        }
        if(profile.gender === 'male'){
          return 'random-users/men/'+ profile.images.imagePaths[0].path;
        }
        if(profile.gender === 'female'){
          return 'random-users/women/'+ profile.images.imagePaths[0].path;
        }
        if(profile.gender === 'trans-female'){
          return 'random-users/men/'+ profile.images.imagePaths[0].path;
        }
        if(profile.gender === 'trans-male'){
          return 'random-users/women/'+ profile.images.imagePaths[0].path;
        }

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

<style lang="scss" scoped>

</style>
