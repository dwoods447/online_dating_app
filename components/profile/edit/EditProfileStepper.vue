<template>
        <section>
          <div class="flex-container">
              <div class="flex-container step-header">
                <div :class="['step-header-item']"><span :class="[{'highlight': isStepOneActive }, 'stepp-number',]">1</span>&nbsp;Enter profile Details</div>
                <div :class="['step-header-item']"><span :class="[{'highlight': isStepTwoActive }, 'stepp-number']">2</span>&nbsp;Upload Photo</div>
                <div :class="['step-header-item']"><span  :class="[{'highlight': isStepThreeActive },'stepp-number']">3</span>&nbsp;Enter Geek Preferences</div>
                <div :class="['step-header-item']"><span  :class="[{'highlight': isDone }, 'stepp-number']">4</span>&nbsp;Update Profile</div>
              </div>
           </div>
              <div v-if="step == 1" class="step">
                 <section class="stepper-section">
                   <div v-if="this.$store.state.userId">
                      <div v-if="this.$store.state.userId.isProfileCompleted !== true">
                        <UpdateFormProfileIncomplete></UpdateFormProfileIncomplete>
                    </div>
                    <div v-else>
                          <!-- User has completed profile -->
                          <UpdateFormProfileComplete></UpdateFormProfileComplete>
                    </div>
                  </div>
                 </section>
              </div>
               <div v-if="step == 2" class="step">
                 <section class="stepper-section">
                   <h2 class="form-header">Upload a Photo</h2>
                      <ImgUpload  />
                 </section>
               </div>
               <div v-if="step == 3" class="step">
                 <section class="stepper-section">
                 <h2 class="form-header">Enter Geek Preferences & Interests</h2>
                 <GeekPreferences></GeekPreferences>
                  </section>
               </div>
               <div v-if="step == 4" class="step">
                 <div class="flex-container">
                   <div class="flex-container" style="height: 50vh;">
                     <button @click.prevent="updateUserProfile" class="btn btn-primary btn-sm btn-custom"  :disabled="this.onReadySubmit" v-if="this.isDone">Update Your Profile&nbsp;&nbsp;&nbsp; <span class="arrow-left">&gt;</span></button>
                   </div>
                 </div>
               </div>
               <div class="flex-container">
                 <div class="flex--item">
                    <button @click.prevent="prevStep" class="btn btn-primary btn-sm" v-if="step != 1"><span class="arrow-right">&lt;</span>&nbsp;&nbsp;&nbsp; Previous Step</button>
                    <button @click.prevent="nextStep" class="btn btn-primary btn-sm" v-if="step != totalSteps" :disabled="this.onReadySubmit">Next Step &nbsp;&nbsp;&nbsp;<span class="arrow-left">&gt;</span></button>

                 </div>
               </div>

        </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
import UserProfileService from '../../../middleware/services/UserProfileService'
import UpdateFormProfileComplete from './UpdateFormProfileComplete'
import UpdateFormProfileIncomplete from './UpdateFormProfileIncomplete'
import ImgUpload from '../../profile/image/ImgUpload'
import GeekPreferences from './GeekPreferences'
import Cookie from 'js-cookie'
import eventBus from '../../../middleware/eventBus/index'
  export default {
    components: { Multiselect, ImgUpload, UpdateFormProfileComplete, UpdateFormProfileIncomplete, GeekPreferences},
    data(){
      return {
        step: 1,
        totalSteps: 4,
        isStepOneActive: true,
        isStepTwoActive: false,
        isStepThreeActive: false,
        isDone: false,
        onReadySubmit: false,
      }
    },
    methods: {
      async updateUserProfile(){
           const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
           const updated  = await UserProfileService.updateUserProfile(this.$store.state.profile);
           let updatedUser = updated.data.user;
           if(updatedUser){
              localStorage.removeItem('user');
              Cookie.remove('user');
              localStorage.setItem('user', JSON.stringify(updatedUser));
              Cookie.set('user', JSON.stringify(updatedUser));
              await this.$store.dispatch('setLoggedInUserIdAction', updatedUser);
              eventBus.$emit('setActiveLink', 'isShowBasicSearch');
              this.onReadySubmit = false;
              this.$router.push({name: 'basicsearch'});
           }
      },
      validateStep(step){
        if(step == 1){
          if(
            this.$store.state.profile.height !== ''
            && this.$store.state.profile.hairColor !== ''
            && this.$store.state.profile.eyeColor !== ''
            && this.$store.state.profile.maritalStatus !== ''
            && this.$store.state.profile.religion !== ''
            && this.$store.state.profile.profession !== ''
           // && this.$store.state.profile.eudcation !== ''
            && this.$store.state.profile.doesSmoke !== ''
            && this.$store.state.profile.doesDrink !== ''
            && this.$store.state.profile.doesHaveChildren !==''
            && this.$store.state.profile.secondLanguage !== ''
            && this.$store.state.profile.city !== ''
            && this.$store.state.profile.state !== ''
            && this.$store.state.profile.postalCode !== ''
            ){
              this.onReadySubmit = false;
              this.step++;
          } else {
            console.log('Please complete all required fields...');
          }
        }
        if(step == 2){
           if(this.$store.getters.hasImages.length > 0 ){
               this.step++;
           }
        }
        if(step == 3){
            this.step++;
        }
        if(step == 4){
           this.onReadySubmit = false;
        }
      },
         prevStep: function(){
           this.step--;
         // this.validateStep(this.step);
            if(this.step == 1){

            this.isStepOneActive = true;
            this.isStepTwoActive = false;
            this.isStepThreeActive = false;
            this.isDone = false;
          }
          if(this.step == 2){
            this.isStepOneActive = false;
            this.isStepTwoActive = true;
            this.isStepThreeActive = false;
            this.isDone = false;
          }
          if(this.step == 3){
            this.isStepOneActive = false;
            this.isStepTwoActive = false;
            this.isStepThreeActive = true;
            this.isDone = false;
          }
          if(this.step >= this.totalSteps){
           //show submit button
            this.isStepOneActive = false;
            this.isStepTwoActive = false;
            this.isStepThreeActive = false;
            this.isDone = true;
          }
        },

         nextStep: function(){
        //  this.validateStep(this.step);
          this.step++;
          if(this.step == 1){
            this.isStepOneActive = true;
            this.isStepTwoActive = false;
            this.isStepThreeActive = false;
            this.isDone = false;
          }
          if(this.step == 2){
            this.isStepOneActive = false;
            this.isStepTwoActive = true;
            this.isStepThreeActive = false;
            this.isDone = false;
          }
          if(this.step == 3){
            this.isStepOneActive = false;
            this.isStepTwoActive = false;
            this.isStepThreeActive = true;
            this.isDone = false;
          }
          if(this.step >= this.totalSteps){
           //show submit button
            this.isStepOneActive = false;
            this.isStepTwoActive = false;
            this.isStepThreeActive = false;
            this.isDone = true;
          }


        },


    },
    computed :{

    }
  }
</script>

<style scoped>

.flex-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
.step-header{
  width: 66%;
  margin: 0 auto;
}
  .step-header-item{
    width: 250px;
    margin: 10px;
    display: inline-block;
  }
  .stepp-number{
    width: 50px;
    height: 50px;
    display: inline-block;
    background-color: #eee;
    padding-left: 1.2em;
    padding-right: 1.2em;
    padding-top: 0.8em;
    padding-bottom: 0.8em;
    border: 1px solid #eee;
    color: #333;
    border-radius: 50%;
  }
  .highlight{
    background-color: blue;
    color: #fff;
  }
  .stepper-section{
  max-width: 1200px;
  margin: 0 auto;
}
.form-header{
  text-align: center;
}

.step{
  min-height: 35vh;
}
.btn-custom{
  width: 250px;
  height: 40px;
  vertical-align: middle;
  margin: 50% auto;
}

.arrow-left, .arrow-right{
  font-size: 1.1em;
}
</style>
