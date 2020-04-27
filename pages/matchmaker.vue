<template>
<div>
  <section class="container">
       <MatchMaker></MatchMaker>
  </section>

  
</div>
</template>

<script>
import UserProfileService from '../middleware/services/UserProfileService'
import MatchMaker from '../components/profile/matchmaker/MatchMaker'
export default {
   // middleware: ['auth-user'],
   components: { MatchMaker },
   created(){
    
   },
   data(){
     return {
     }
   },
   computed:{
     
   },
   methods: {
    
   }
}
</script>

<style scoped>
</style>
