<template>
  <div>
       <button class="btn btn-primary" @click="addUserToFavorites()"><i class="fas fa-heart"></i> &nbsp;Add to Favorites</button>
  </div>
</template>

<script>
import eventBus from '../../../middleware/eventBus/index'
  export default {
    props:['userId'],
    created(){
      
    },
    data(){
      return {

      }
    },
     methods: {
         async addUserToFavorites(){
        const message = await this.$store.dispatch('addUserToFavoritesAction', {userProfileId: this.userId});
        if(message.message === 'User added to favorites successfully!'){
           eventBus.$emit('button-response-recieved', message.message);
        }
      }
    }
  }
</script>

<style  scoped>

</style>
