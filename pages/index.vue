<template>
<div>
  <section class="container">
    <h2>Recent Users</h2>
              <div v-if="warningMessage" style="padding: 1em margin: 1em; color:red;">{{ warningMessage }}</div>
              <ProfilePreview v-for="user in myusers" :profile="user" :key="user._id"></ProfilePreview>
  </section>
  <hr/>
   <section class="container">
     <h2>Dating Tips</h2>
     <div class="row">
       <div class="col-lg-6">
           <div style="max-width: 500px; max-height: 500px; margin: 0 auto;">
            <img src="~assets/img/homepage-3.jpg" alt="" style="width: 100%;">
          </div>
       </div>
       <div class="col-lg-6">
          <div>
            <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
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
              <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
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
