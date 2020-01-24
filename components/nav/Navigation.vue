<template>
  <div>
    <!-- Navigation -->
  <nav class="navbar navbar-light bg-light static-top">
    <div class="container">
      <a class="navbar-brand" href="#">ShootUrShot.net</a>
           <nuxt-link to="/">
           Home
           <span class="sr-only">(current)</span>
           </nuxt-link>
           <nuxt-link to="/inbox" v-if="this.$store.getters.isAutheticated">Inbox</nuxt-link>
            <nuxt-link to="/basicsearch" >Search</nuxt-link>
            <nuxt-link to="/login" class="btn btn-primary" v-if="!this.$store.getters.isAutheticated">Login</nuxt-link>
            <nuxt-link to="/signup" class="btn btn-primary" v-if="!this.$store.getters.isAutheticated">Sign Up</nuxt-link>
            <a href="#" @click="goToEditUsersProfile"  v-if="this.$store.getters.isAutheticated" >Edit Profile</a>
            <nuxt-link to="/signup" v-if="this.$store.getters.getLoggedInUsername">Welcome, {{ this.$store.getters.getLoggedInUsername}}</nuxt-link>
            <a class="btn btn-primary" v-if="this.$store.getters.isAutheticated" @click="logOut">Log Out</a>
    </div>
  </nav>



  </div>
</template>
<script>
import UserProfileService from '../../middleware/services/UserProfileService'
export default {
  data(){
    return {

    }
  },
  methods: {
    async logOut(){
      console.log('Loggin user out....');
       this.$store.dispatch('setLogOutAction');
       this.$router.push({name: 'index'});
      // const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
      // const offline = await this.$store.dispatch('setOffLineStatus');
      // if(offline){
      //     this.$store.dispatch('setLogOutAction');
      //     this.$router.push({name: 'index'});
      // }
    },
    goToEditUsersProfile(){
          this.$router.push({path: '/edituserprofile', params: {user: this.$store.state.userId}});
    },
  }
}
</script>
