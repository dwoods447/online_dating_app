<template>
  <div>
      <form @submit.prevent="signIn" style="max-width: 20%; margin: 0 auto;">
        <div class="form-group">
           <input type="text" name="username" v-model="username" class="form-control">
        </div>
         <div class="form-group">
          <input type="password" name="password" v-model="password" class="form-control">
        </div>
        <button class="btn btn-primary" style="display: block; width: 100%;"> Sign In</button>
        <br/>
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
        user: {}
      }
    },
    methods: {
      async signIn(){
        const data = {
          username: this.username,
          password: this.password
        }

        let resData = await this.$store.dispatch('authenticateUserAction', data);
        console.log(`Returned data sign in: ${JSON.stringify(resData)}`);
        if(resData.status !== 200){
            console.log(`Retunred${JSON.stringify(resData)}`)
        }
        if(resData.status !== 200){
            console.log(`Retunred${JSON.stringify(resData)}`)
        }

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
