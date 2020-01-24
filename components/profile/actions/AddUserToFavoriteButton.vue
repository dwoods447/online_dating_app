<template>
  <div>
       <button class="btn btn-primary" @click="addUserToFavorites()">Add to Favorites</button>
  </div>
</template>

<script>
  export default {
    props:['userId'],
    data(){
      return {

      }
    },
     methods: {
         async addUserToFavorites(){
        console.log(`Adding User to Favs with user with an Id if ${this.userId}`);
        const message = await this.$store.dispatch('addUserToFavoritesAction', {userProfileId: this.userId});
        if(message ){
          console.log(`Message returned in addUserToFavorites button component: ${message}`);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
