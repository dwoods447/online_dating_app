<template>
  <div>
      <h2 style="text-align:center;">Please Sign In</h2>
      <div v-if="signInResponse" style="width: 10%; margin: 0 auto; color: green; font-weight: 600;">{{ signInResponse }}</div>
      <form @submit.prevent="signIn" style="max-width: 20%; margin: 2% auto;">
        <div class="form-group">
           <input type="text" name="username" v-model="username" placeholder="Enter your username" class="form-control">
        </div>
         <div class="form-group">
          <input type="password" name="password" v-model="password" placeholder="Enter your password" class="form-control">
        </div>
        <button class="btn btn-primary" style="display: block; width: 100%;"> Sign In</button>
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
        signUpMessage: this.$route.params.message
      }
    },
    methods: {
      async signIn(){
        const data = {
          username: this.username,
          password: this.password
        }
       let resData = await this.$store.dispatch('authenticateUserAction', data);
      },
    },
    computed: {
      signInResponse(){
        return this.signUpMessage;
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>
