<template>
  <div>
        <div>
          <div>
            <a @click="goToProfileDetail(profile._id, profile)" href="#">
              <div>
                <div v-if="profile.random === 'true'">
                  <div v-if="profile.gender ==='male'" style="max-width: 127px;">
                    <img :src="profile | maleImageSrcFilter" alt="" style="width: 100%;">
                  </div>
                  <div v-if="profile.gender ==='female'" style="max-width: 127px;">
                    <img :src="profile | femaleImageSrcFilter" alt="" style="width: 100%;">
                  </div>
                  <div v-if="profile.gender ==='trans-male'" style="max-width: 127px;">
                    <img :src="profile | transMaleImageSrcFilter" alt="" style="width: 100%;">
                  </div>
                  <div v-if="profile.gender ==='trans-female'" style="max-width: 127px;">
                    <img :src="profile | transFemaleImageSrcFilter" alt="" style="width: 100%;">
                  </div>
                </div>
                <div v-if="profile.random === 'false'" style="max-width: 127px;">
                  <img :src="profile | imageSrcFilter" alt="" style="width: 100%;">
                </div>
              </div>
              <br/>{{ profile.username }}<span v-if="profile.age">, &nbsp;{{profile.age}}</span>&nbsp;&nbsp;<span :class="[{'is-offline': profile.onlineStatus === 'false' || profile.onlineStatus !== true }, {'is-online': profile.onlineStatus === 'true' || profile.onlineStatus !== false}]"></span>
            </a>
             <br/>
              <span v-if="profile.city && profile.state">{{ profile.city }}, {{ profile.state }}</span>
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
