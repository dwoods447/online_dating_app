<template>
  <div>
         You are prevented from viewing this user's profile.
  </div>
</template>

<script>
  export default {
    middleware: ['check-auth', 'auth', 'check-profile'],
    data(){
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
