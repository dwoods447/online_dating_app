<template>
  <div>
     <h2>Favorite Users</h2>
      <section>
        <div v-for="favorite in allFavorites" :key="favorite._id" style="margin: 10px; display: inline-block;">
          <ProfilePreview   :profile="favorite.userId"  ></ProfilePreview>
          <div><a href="javascript:void(0);" @click="removeFromFavorites(favorite._id)"><span style="color: red;">Remove From Favorites</span></a></div>
        </div>
      </section>
  </div>
</template>

<script>
  import UserProfileService from '../middleware/services/UserProfileService'
  import ProfilePreview from '../components/profile/preview/ProfilePreview'
  export default {
    middleware: ['check-auth', 'auth', 'check-profile'],
    components: { ProfilePreview },
    created(){
        this.getFavoriteUsersInList()
    },
    data(){
      return {
          favoritesList: [],
      }
    },
    methods:{
        async getFavoriteUsersInList(){
             const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const favoriteList = (await UserProfileService.getUsersInFavoriteList()).data
            if(favoriteList){
                this.favoritesList = favoriteList.favoriteList;
            }
        },

        async removeFromFavorites(userId){
          let userToRemove = {userProfileId: userId};
          const updatedFavorites = this.$store.dispatch('removeUserFromFavoritesAction', userToRemove);
                // if(updatedFavorites){
                //   updatedFavorites.favorites = this.favoritesList
                // }
        }
    },
    computed: {
       allFavorites(){
         return this.favoritesList;
       }
    }
  }
</script>

<style lang="scss" scoped>

</style>
