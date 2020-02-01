<template>
  <div>
    <!-- Navigation -->
  <nav class="navbar navbar-light bg-light static-top navbar-expand-lg">
     <a class="navbar-brand" href="#">Websitename.com</a>
    <!-- <div class="container">
      <a class="navbar-brand" href="#">Websitename.com</a>
           <nuxt-link to="/">
           Home
           <span class="sr-only">(current)</span>
           </nuxt-link>
            <nuxt-link class="nav-link" to="/inbox" v-if="this.$store.getters.isAutheticated">Inbox</nuxt-link>
            <nuxt-link class="nav-link" to="/basicsearch" v-if="this.$store.getters.isAutheticated">Search</nuxt-link>
            <nuxt-link  to="/login" class="btn btn-primary" v-if="!this.$store.getters.isAutheticated">Login</nuxt-link>
            <nuxt-link  to="/signup" class="btn btn-primary" v-if="!this.$store.getters.isAutheticated">Sign Up</nuxt-link>
            <a href="#" class="nav-link" @click="goToEditUsersProfile"  v-if="this.$store.getters.isAutheticated" >Edit Profile</a>
            <nuxt-link  class="nav-link" to="/signup" v-if="this.$store.getters.getLoggedInUsername">Welcome, {{ this.$store.getters.getLoggedInUsername}}</nuxt-link>
            <a class="btn btn-primary" v-if="this.$store.getters.isAutheticated" @click="logOut">Log Out</a>
    </div> -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
        aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <nuxt-link  to="/login" class="nav-link" v-if="!this.$store.getters.isAutheticated">
         <span class="sr-only">(current)</span>
         Login
         </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link  to="/signup" class="nav-link" v-if="!this.$store.getters.isAutheticated">Sign Up</nuxt-link>
      </li>
      <li class="nav-item dropdown" v-if="this.$store.getters.isAutheticated">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" href="javascript:void(0);">
          <i class="fas fa-user"></i>&nbsp;&nbsp;  Welcome, {{ this.$store.getters.getLoggedInUsername}} </a>
        <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4" >
          <nuxt-link class="dropdown-item" to="/inbox" v-if="this.$store.getters.isAutheticated">Inbox</nuxt-link>
          <a href="#" class="dropdown-item" @click="goToEditUsersProfile"  v-if="this.$store.getters.isAutheticated" >Edit Profile</a>
          <a class="dropdown-item" v-if="this.$store.getters.isAutheticated" @click="logOut">Log Out</a>
        </div>
      </li>
    </ul>
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
