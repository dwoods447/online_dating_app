<template>
<div>
  <section class="container">
    <h2>Recent Users</h2>
              <div v-if="warningMessage" style="padding: 1em margin: 1em; color:red;">{{ warningMessage }}</div>
              <ProfilePreview v-for="user in myusers" :profile="user" :key="user._id"></ProfilePreview>
  </section>
  <hr/>
   <section class="container">
     
     <div class="row">
       <div class="col-lg-6">
           <div style="max-width: 500px; max-height: 500px;">
            <img src="~assets/img/homepage-3.jpg" alt="" style="width: 100%;">
          </div>
       </div>
       <div class="col-lg-6">
         <h2 style="margin-left: 15px; text-align: left;">Dating Tips</h2>
          <div>
            <ul>
              <li>First impressions are always important.</li>
              <li>Make date plans for somewhere you'll feel comfortable.</li>
              <li>Be confident.</li>
              <li>Don't do all the talking.</li>
              <li>Keep the conversation fun.</li>
              <li>Avoid the 'ex' conversation.</li>
              <li>Turn off your phone.</li>
              <li>Share the bill.</li>
            </ul>
          </div>
       </div>
     </div>

  </section>
   <hr/>
   <section class="container">
       <h2>Find your Perfect Geek</h2>
       <div class="row">
         <div class="col-lg-6">
             <div>
              <p>Looking for that geek of your dreams that's into Fantasy, Sci-Fi, Anime, Video Games, Conventions & Cos-Play? This dating site is designed to help geeks find other geeks that live within U.S. Here you will find no stereotypes, no gimmicks, just pure, authentic online dating for that little bit of geek in all of us.</p>
            </div>
         </div>
          <div class="col-lg-6">
             <div style="max-width: 500px; max-height: 500px; margin: 0 auto;">
              <img src="~assets/img/homepage-2.jpg" alt="" style="width: 100%;">
            </div>
         </div>
       </div>

  </section>
</div>
</template>

<script>
import UserProfileService from '../middleware/services/UserProfileService'
import ProfilePreview from '../components/profile/preview/ProfilePreview'
import eventBus from '../middleware/eventBus/index'
export default {
   // middleware: ['auth-user'],
   components: { ProfilePreview },
   created(){
        eventBus.$on('prompt-login', (data) => {
          let username = data.userProfile.username;
          this.warning =  `In order to view ${username}'s profile please login!`;
          let $this = this;
          setTimeout(function(){
            $this.warning = '';
          }, 4500);
        })
        this.getRandUsers();
   },
   data(){
     return {
       myusers: [],
       warning: ''
     }
   },
   computed:{
     warningMessage(){
       return this.warning;
     }
   },
   methods: {
     async getRandUsers(){
      //  const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
       const users = (await UserProfileService.getRandomUsersInAuthUsersPostalCode()).data;
       if(users){
          this.myusers = users.users;
       }
     }
   }
}
</script>

<style scoped>
</style>
