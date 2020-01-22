<template>
  <div>
      <UpdateUserProfile :userId="this.$store.state.userId"></UpdateUserProfile>
  </div>
</template>

<script>
import UpdateUserProfile from '../components/profile/edit/UpdateUserProfile'
  export default {
    middleware: ['check-auth', 'auth',],
    components: { UpdateUserProfile },
    data(){
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
