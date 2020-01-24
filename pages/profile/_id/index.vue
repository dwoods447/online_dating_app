<template>
  <div>
        Profile Detail
        <p>Their ID: {{ this.$route.params.id }}</p>
        <p>your ID: {{ this.$store.state.userId._id}}</p>
          <p>Profile: {{ this.$route.params.userProfile }}</p>
          <UserProfile :userId="this.$route.params.id"></UserProfile>
  </div>
</template>

<script>
  import UserProfile from '../../../components/profile/UserProfile'
  export default {
    components: { UserProfile },
    data(){
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
