<template>
  <div>
      <h2 style="text-align:center;">Please Sign In</h2>


      <div v-if="signInResponse" style="text-align: center; width: 50%; margin: 0 auto; color: green; font-weight: 600; font-size: 2em;">{{ signInResponse }}</div>
      <form @submit.prevent="signIn" style="max-width: 20%; margin: 2% auto;">
        <div class="form-group">
           <input type="text" name="username" v-model="username" placeholder="Enter your username" class="form-control">
        </div>
         <div class="form-group">
          <input type="password" name="password" v-model="password" placeholder="Enter your password" class="form-control">
        </div>
        <button class="btn btn-primary btn-custom" :disabled="isDisabled"> Sign In</button>
        <br/>
        <p><nuxt-link to="/forgot-password">Forgot password?</nuxt-link></p>

        <br/>
        <div v-if="this.$store.state.error"> {{ this.$store.state.error }}</div>
      </form>
  </div>
</template>

<script>
import AuthService from '../../middleware/services/AuthService'
import UserProfileService from '../../middleware/services/UserProfileService'
import Cookie from 'js-cookie'

  export default {
    data(){
      return {
        response: '',
        username: '',
        password: '',
        user: {},
        signUpMessage: this.$route.params.message,
        isDisabled: false,
      }
    },
    methods: {
      async signIn(){
        this.isDisabled = true;
        const data = {
          username: this.username,
          password: this.password
        }
       let resData = await this.$store.dispatch('authenticateUserAction', data);
       if(resData){
         this.isDisabled = false;
       } else{
         this.isDisabled = false;
         this.signUpMessage = '';
       }
      },
    },
    computed: {
      signInResponse(){
        return this.signUpMessage;
      }
    }

  }
</script>

<style scoped>
.flexbox{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.flex-item{
  width: 195px;
  height: 190px;
  margin-left: 10px;
}

.btn-custom{
  display: block;
  width: 100%;
}
</style>
