<template>
  <div style="display: inline-block; width: 250px; margin-right: 0.4em; margin-top: 10px;">
        <div>
          <div>
            <a @click="goToProfileDetail(profile._id, profile)" href="#">
              <div>
                <div v-if="profile.random === 'true'">
                  <div v-if="profile.gender ==='male'">
                    <img :src="profile | maleImageSrcFilter" alt="" style="display: block; width: 100%;">
                  </div>
                  <div v-if="profile.gender ==='female'">
                    <img :src="profile | femaleImageSrcFilter" alt="" style="display: block; width: 100%;">
                  </div>
                  <div v-if="profile.gender ==='trans-male'">
                    <img :src="profile | transMaleImageSrcFilter" alt="" style="display: block; width: 100%;">
                  </div>
                  <div v-if="profile.gender ==='trans-female'">
                    <img :src="profile | transFemaleImageSrcFilter" alt="" style="display: block; width: 100%;">
                  </div>
                </div>
                <div v-if="profile.random === 'false'">
                  <img :src="profile | imageSrcFilter" alt="" style="display: block; width: 100%;">
                </div>
              </div>
              <div v-if="this.$store.getters.isAutheticated">
                 <div style="padding: 0; text-align: center;"><nuxt-link :to="'/profile/'+profile._id">{{ profile.username }}<span v-if="profile.age">, &nbsp;{{profile.age}}</span>&nbsp;&nbsp;<span :class="[{'is-offline': profile.onlineStatus === 'false' || profile.onlineStatus === false }, {'is-online': profile.onlineStatus === 'true' || profile.onlineStatus === true}]"></span></nuxt-link></div>
              </div>
              <div v-else>
                <div style="padding: 0; text-align: center;">{{ profile.username }}<span v-if="profile.age">, &nbsp;{{profile.age}}</span>&nbsp;&nbsp;<span :class="[{'is-offline': profile.onlineStatus === 'false' || profile.onlineStatus === false }, {'is-online': profile.onlineStatus === 'true' || profile.onlineStatus === true}]"></span></div>
              </div>
              
            </a>
            <div style="padding: 0; text-align: center;">
              <span v-if="profile.city && profile.state">{{ profile.city }}, {{ profile.state }}</span>
              <span v-else>&nbsp;</span>
            </div>
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
        if(profile.images.imagePaths.length > 0){
           return '../uploads/'+profile.images.imagePaths[0].path;
        } else {
           return 'http://placehold.it/200x200';
        }

      },
      maleImageSrcFilter(profile){
         if(profile.images.imagePaths.length > 0){
            return '../random-users/men/'+ profile.images.imagePaths[0].path;
          } else {
           return 'http://placehold.it/200x200';
        }
      },
      femaleImageSrcFilter(profile){
         if(profile.images.imagePaths.length > 0){
         return '../random-users/women/'+ profile.images.imagePaths[0].path;
         } else {
           return 'http://placehold.it/200x200';
        }
      },
      transMaleImageSrcFilter(profile){
         if(profile.images.imagePaths.length > 0){
         return '../random-users/men/'+ profile.images.imagePaths[0].path;
          } else {
           return 'http://placehold.it/200x200';
        }
      },
      transFemaleImageSrcFilter(profile){
         if(profile.images.imagePaths.length > 0){
            return '../random-users/women/'+ profile.images.imagePaths[0].path;
          } else {
           return 'http://placehold.it/200x200';
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

<style scoped>
.is-online{
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid green;
  border-radius: 50%;
  background: green;
}
.is-offline{
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid gray;
  border-radius: 50%;
  background: gray;
}
</style>
