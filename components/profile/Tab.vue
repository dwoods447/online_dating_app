<template>
  <div>
        <nav class="nav nav-tabs" >
          <a href="#" @click="showUserProfile" :class="[{active: isshowUserProfile},'nav-item', 'nav-link']">
              <i class="fa fa-home"></i> About {{user.username}}
          </a>
          <a href="#" @click="showUserPhotos" :class="[{active: isshowUserPhotos},'nav-item', 'nav-link']">
              <i class="fa fa-user"></i> {{user.username}}'s Photos
          </a>
      </nav>
  </div>
</template>

<script>
  import eventBus from '../../middleware/eventBus/index'
  export default {
    props:['user'],
    data(){
      return {
        isshowUserProfile: true,
        isshowUserPhotos: false,
      }
    },
    methods: {
      showUserPhotos(){
          this.isshowUserProfile = false;
          this.isshowUserPhotos = true;
          eventBus.$emit('showUserPhotos');
      },
      showUserProfile(){
          this.isshowUserProfile = true;
          this.isshowUserPhotos = false;
          eventBus.$emit('showUserProfile');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
