<template>
  <div class="container">
    <h2>Users</h2>
              <ProfilePreview v-for="user in myusers" :profile="user" :key="user._id" style="margin: 10px; display: inline-block;"></ProfilePreview>
  </div>
</template>

<script>
import UserProfileService from '../middleware/services/UserProfileService'
import ProfilePreview from '../components/profile/preview/ProfilePreview'
export default {
   // middleware: ['auth-user'],
   components: { ProfilePreview },
   created(){
        this.getRandUsers();
   },
   data(){
     return {
       myusers: [],
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
