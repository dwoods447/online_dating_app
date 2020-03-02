<template>
  <div>
      <h2>Blocked Users</h2>
      <section>
        <div v-for="blockedUser in allBlockedUsers" :key="blockedUser._id" style="margin: 10px; display: inline-block;">
          <ProfilePreview   :profile="blockedUser.userId"  ></ProfilePreview>
          <div><a href="javascript:void(0);"><span style="color: red;">Remove From Blocked Users</span></a></div>
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
             console.log(`Blocked users retrieved ${JSON.stringify(blockedList)}`);
            if(blockedList){
                this.blockedUserList = blockedList.blockList;
            }
        },

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
