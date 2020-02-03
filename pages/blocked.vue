<template>
  <div>
        This user has prevented you from viewing their profile.
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
