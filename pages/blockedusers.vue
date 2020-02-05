<template>
  <div>
      <h2>Blocked Users</h2>
      <section>
        <div>

        </div>
      </section>
  </div>
</template>

<script>
   import UserProfileService from '../middleware/services/UserProfileService'
  import ProfilePreview from '../components/profile/preview/ProfilePreview'
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
