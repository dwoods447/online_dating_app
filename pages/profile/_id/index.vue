<template>
  <div>
        <!-- Profile Detail
        <p>Their ID: {{ this.$route.params.id }}</p>
        <p>your ID: {{ this.$store.state.userId._id}}</p>
          <p>Profile: {{ this.$route.params.userProfile }}</p> -->
          <Tab :user="loadedUser"></Tab>
          <div v-if="loadedUser && showProfileTab">
            <UserProfile  :user="loadedUser"></UserProfile>
          </div>
          <div v-if="loadedUser && showPhotoTab">
            <PhotosProfile  :user="loadedUser"></PhotosProfile>
          </div>


  </div>
</template>

<script>
  import UserProfile from '../../../components/profile/UserProfile'
  import Tab from '../../../components/profile/Tab'
  import eventBus from '../../../middleware/eventBus/index'
  import PhotosProfile from '../../../components/profile/photos/PhotosProfile'
  export default {
    components: { UserProfile, Tab, PhotosProfile },
    created(){
      eventBus.$on('showUserProfile',()=>{
          console.log('Showing user profile');
          this.showProfileTab = true;
          this.showPhotoTab = false;
      })
      eventBus.$on('showUserPhotos',()=>{
          console.log('Showing user photos');
          this.showProfileTab = false;
          this.showPhotoTab = true;
      })
      console.log(`Preparing user with id: ${this.$route.params.id}`);
      this.getUser(this.$route.params.id);
    },
    data(){
      return {
        loadedUser: '',
        showProfileTab: true,
        showPhotoTab: false,
      }
    },
    methods: {
      async getUser(userId){
        console.log(`Rec'vd id ${userId}`);
         let userData =  await this.$store.dispatch('getUserDetailsAction', userId);
         this.loadedUser = userData;
         console.log(`Rec'vd user data: ${JSON.stringify(userData)}`);
      }
    },
    computed: {
      loadUser(){
        this.loadedUser;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
