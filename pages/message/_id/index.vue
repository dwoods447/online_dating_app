<template>
  <div>
     Message Sub folder: {{this.$route.params}}
  </div>
</template>

<script>
import UserProfileService from '../../../middleware/services/UserProfileService'
  export default {
     middleware: ['check-auth', 'auth', 'check-profile'],
    created(){

    },
      data(){
        return {

        }
      },

      methods: {


      }

  }
</script>

<style lang="scss" scoped>

</style>
