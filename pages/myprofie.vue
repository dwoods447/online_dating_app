<template>
  <div>
    <UserProfile :userId="this.$route.params.userId"></UserProfile>
  </div>
</template>

<script>
import UserProfileService from '../middleware/services/UserProfileService'
import UserProfile from '../components/profile/UserProfile'
  export default {
    data(){
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
