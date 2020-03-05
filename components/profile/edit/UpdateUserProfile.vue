<template>
  <div>
     <h2 style="width: 250px; margin: 0 auto;">Edit Your Profile</h2>

     <div style="width: 415px; margin: 0 auto; color :red;"><p v-if="!$store.getters.isProfileCompleted">Please update your profile before proceeding!</p></div>
         <div style="width: 50%; margin: 0 auto;" v-if="fullImageSrc">
                        Your main picture:
                        <div v-if="randomVal === 'true'">
                          <div v-if="chosenGender==='male'" style="max-width: 127px; max-height: 127px;">
                            <img :src="fullImageSrc|maleImageSrcFilter" style="width: 100%;">
                          </div>
                          <div v-if="chosenGender==='female'" style="max-width: 127px; max-height: 127px;">
                            <img :src="fullImageSrc|femaleImageSrcFilter" style="width: 100%;">
                          </div>
                          <div v-if="chosenGender==='trans-female'" style="max-width: 127px; max-height: 127px;">
                            <img :src="fullImageSrc|transFemaleImageSrcFilter" style="width: 100%;">
                          </div>
                          <div v-if="chosenGender==='trans-male'" style="max-width: 127px; max-height: 127px;">
                            <img :src="fullImageSrc|transMaleImageSrcFilter" style="width: 100%;">
                          </div>
                        </div>
                        <div v-if="randomVal === 'false'" style="max-width: 127px; max-height: 127px;">
                            <img :src="fullImageSrc|imageSrcFilter " alt="" style="width: 100%;">
                        </div>
                    </div>
                    <EditProfileStepper></EditProfileStepper>

 </div>

</template>

<script>
import { mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'
import states from '../../../data/states'
import ImgUpload from '../../profile/image/ImgUpload'
import UserProfileService from '../../../middleware/services/UserProfileService'
import Cookie from 'js-cookie'
import eventBus from '../../../middleware/eventBus/index'
import UpdateFormProfileComplete from './UpdateFormProfileComplete'
import UpdateFormProfileIncomplete from './UpdateFormProfileIncomplete'
import EditProfileStepper from '../edit/EditProfileStepper'
  export default {
    props: ['userId'],
    components: { Multiselect, ImgUpload, UpdateFormProfileComplete, UpdateFormProfileIncomplete, EditProfileStepper},
    mounted(){
      this.loadUserProfile(this.userId._id);
    },
    data(){
      return {
         onReadySubmit: false,
         displayInterracialChoices: false,
         randomVal: this.$store.state.userId.random,
         imagePaths: this.$store.state.userId.images.imagePaths || [],
         steps: [
         ]
      }
    },
    filters: {
      imageSrcFilter(src){
        if(src){
          return 'uploads/'+ src
        }

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
    computed: {
      fullImageSrc(){
        if(this.$store.state.hasOwnProperty("userId") && this.$store.state.userId !== {} || this.$store.state.userId !== null){
          if(this.imagePaths.length > 0){
              return this.url = this.imagePaths[0].path;
          }
        }
        return false;
      },



    },
    methods: {
          async loadUserProfile(userId){
            const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
              const userReturned = (await UserProfileService.getUserDetails(userId)).data;
              if(userReturned){
                this.user = userReturned;
                this.$store.dispatch('setLoggedInUserIdAction', this.user.user);

              }
          },



    }
  }
</script>

<style lang="scss" scoped>

</style>
