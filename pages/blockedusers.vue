<template>
  <div>

      <section style="max-width: 1200px; margin: 0 auto;">
        <h2>Blocked Users</h2>
        <div v-for="blockedUser in allBlockedUsers" :key="blockedUser._id" style="margin: 10px; display: inline-block;">
          <ProfilePreview   :profile="blockedUser.userId"></ProfilePreview>
          <div><a href="javascript:void(0);" @click="removeFromBlockedUsersList(blockedUser.userId._id)"><span style="color: red;">Remove From Blocked Users</span></a></div>
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
        this.getBlockedUsersInList()
    },
    data(){
      return {
        blockedUserList: []
      }
    },
    methods:{
        async getBlockedUsersInList(){
             const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const blockedList = (await UserProfileService.getUserInBlockList()).data;
            if(blockedList){
                this.blockedUserList = blockedList.blockList;
            }
        },

         async removeFromBlockedUsersList(userId){
          let userToRemove = {userProfileId: userId};
          const updatedBlockedUsers = await this.$store.dispatch('removeFromBlockedUsersAction', userToRemove);
          if(updatedBlockedUsers){
              this.getBlockedUsersInList();
             // updatedFavorites.favorites = this.favoritesList;
          }
        }

    },
    computed: {
      allBlockedUsers(){
         return this.blockedUserList ;
       }
    }
  }
</script>

<style lang="scss" scoped>

</style>
