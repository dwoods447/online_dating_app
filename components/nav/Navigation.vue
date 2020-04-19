<template>
  <div>
    <!-- Navigation -->
  <nav class="navbar fixed-top static-top navbar-expand-lg"  style="background-color: #0A1C44;">
     <nuxt-link to="/" class="navbar-brand" style="display: block; width: 500px;">
          <div class="logo-container"><img src="~assets/img/logo-edited.png" >&nbsp;&nbsp;<span class="navbar-brand-title">ImSeekingGeeks</span></div>
     </nuxt-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
        aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <nuxt-link  to="/login" class="nav-link nav-text" v-if="!this.$store.getters.isAutheticated">
         <span class="sr-only">(current)</span>
         Login
         </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link  to="/signup" class="nav-link nav-text" v-if="!this.$store.getters.isAutheticated">Sign Up</nuxt-link>
      </li>
      <li class="nav-item dropdown" v-if="this.$store.getters.isAutheticated">
        <a class="nav-link dropdown-toggle nav-text" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" href="javascript:void(0);">

       <div v-if="this.$store.getters.hasImages" style="display: inline-block; margin-top: 0.8em;">
        <div v-if="this.$store.state.userId.random === 'true'">
          <div v-if="this.$store.state.userId.gender === 'male'">
                 <img :src="this.$store.getters.hasImages[0].path|maleImageSrcFilter" alt="" class="login-photo">
          </div>
           <div v-if="this.$store.state.userId.gender === 'female'">
                <img :src="this.$store.getters.hasImages[0].path|femaleImageSrcFilter" alt="" class="login-photo">
          </div>
           <div v-if="this.$store.state.userId.gender === 'trans-male'" >
                 <img :src="this.$store.getters.hasImages[0].path|transMaleImageSrcFilter" alt="" class="login-photo">
          </div>
           <div v-if="this.$store.state.userId.gender === 'trans-female'">
                <img :src="this.$store.getters.hasImages[0].path|transFemaleImageSrcFilter" alt="" class="login-photo">
          </div>
        </div>
        <div v-if="this.$store.state.userId.random === 'false'">
             <img :src="this.$store.getters.hasImages[0].path|imageSrcFilter" alt="" class="login-photo">
        </div>

       </div><!-- <i class="fas fa-user"></i>--> <span class="nav-text">Welcome, {{ this.$store.getters.getLoggedInUsername}}</span> </a>&nbsp;&nbsp;
        <div class="dropdown-menu dropdown-menu-right dropdown-info nav-text" aria-labelledby="navbarDropdownMenuLink-4" >
          <nuxt-link class="dropdown-item" to="/inbox" v-if="this.$store.getters.isAutheticated">Inbox</nuxt-link>
          <a href="#" class="dropdown-item" @click="goToEditUsersProfile"  v-if="this.$store.getters.isAutheticated" >Edit Profile</a>
           <a href="#" class="dropdown-item" @click="goToUsersProfile"  v-if="this.$store.getters.isAutheticated && this.$store.getters.isProfileCompleted" >View My Profile</a>
          <a class="dropdown-item" v-if="this.$store.getters.isAutheticated" @click="logOut" style="color: #212529;">Log Out</a>
        </div>
      </li>
    </ul>
  </div>
  </nav>
  </div>
</template>
<script>
import UserProfileService from '../../middleware/services/UserProfileService'
import eventBus from '../../middleware/eventBus/index'
export default {
  data(){
    return {

    }
  },
  methods: {
    async logOut(){
      let userId = this.$store.state.userId._id;
      this.$store.dispatch('setLogOutAction');
      eventBus.$emit('setActiceLink', 'isShowHome');
      this.$router.push({name: 'index'});
      const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
      const offline = await this.$store.dispatch('setOffLineStatus', {userId: userId});
      if(offline){
          this.$store.dispatch('setLogOutAction');
          this.$router.push({name: 'index'});
      }
    },
    goToEditUsersProfile(){

          this.$router.push({path: '/edituserprofile', params: {user: this.$store.state.userId}});
    },
    goToUsersProfile(){
       this.$router.push({path: `/profile/${this.$store.state.userId._id}`, params: {user: this.$store.state.userId}});
    }
  },
  filters:{
      imageSrcFilter(src){
         return '../uploads/'+src;
      },
      maleImageSrcFilter(src){
        return '../random-users/men/'+ src;
      },
      femaleImageSrcFilter(src){
         return '../random-users/women/'+ src;
      },
      transMaleImageSrcFilter(src){
         return '../random-users/men/'+ src;
      },
      transFemaleImageSrcFilter(src){
        return '../random-users/women/'+ src;
      },
  }
}
</script>
<style>
.login-photo{
  max-width: 30px;
}
.navbar-brand-title{
  display: inline-block;
  font-weight: 900;
  font-size: 1.79em;
  color: #fff;
  font-family: 'Rock Salt', cursive;
}
.navbar-brand-title:hover{
  color: #007bff;
}
.nav-text{
   color: #fff;
}
.nav-text:hover{
   color: #007bff;
}

.logo-container{
  max-width: 120px;
  max-height: 120px;
}

.logo-container img {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
}
</style>
