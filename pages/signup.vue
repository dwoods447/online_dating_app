<template>
  <div>
    <h2 class="center">Please register for a new account!</h2>
    <SignUp></SignUp>
  </div>
</template>

<script>
import SignUp from '../components/auth/SignUp'
  export default {
    components:{
      SignUp
    },
    data(){
      return {

      }
    }
  }
</script>

<style  scoped>
.center{
  text-align: center;
}
</style>
