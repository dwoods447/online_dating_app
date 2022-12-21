<template>
  <div>
    <UpdatePasswordReset :userId="this.$route.params.id" :authToken="this.$route.params.token"/>
  </div>
</template>

<script>
import UpdatePasswordReset from '../../../../../../components/auth/UpdatePasswordReset'
export default {
 components: { UpdatePasswordReset },
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

<style>

</style>