<template>
  <div class="container">
    <h2>Users</h2>
              <div v-if="warningMessage" style="padding: 1em margin: 1em; color:red;">{{ warningMessage }}</div>
              <ProfilePreview v-for="user in myusers" :profile="user" :key="user._id" style="margin: 10px; display: inline-block;"></ProfilePreview>
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

<style>

</style>
