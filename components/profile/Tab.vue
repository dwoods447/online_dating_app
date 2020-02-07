<template>
  <div>
        <nav class="nav nav-tabs" >
          <a href="#" @click="showUserProfile" class="nav-item nav-link active">
              <i class="fa fa-home"></i> About {{user.username}}
          </a>
          <a href="#" @click="showUserPhotos" class="nav-item nav-link">
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

      }
    },
    methods: {
      showUserPhotos(){
          eventBus.$emit('showUserPhotos');
      },
      showUserProfile(){
          eventBus.$emit('showUserProfile');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
