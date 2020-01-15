<template>
  <div>
      <form>
          <input type="text" name="username" v-model="username">
          <input type="password" name="password" v-model="password">

          <p>{{ user }}</p>
          <button @click="signIn" > Sign In</button>
      </form>

  </div>
</template>

<script>
import AuthService from '../../middleware/services/AuthService'
import UserProfileService from '../../middleware/services/UserProfileService'
import axios from 'axios'
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
      async signIn(e){
        e.preventDefault();
        const data = {
          username: this.username,
          password: this.password
        }
          let token;
          let userId;
          let tokenExpiresIn;
          console.log(`Sending: ${JSON.stringify(data)}`);
          const res = await AuthService.signIn(data);
           console.log(`Response recived: ${JSON.stringify(res)}`);
          if(res){
             console.log(`Response data: ${JSON.stringify(res)}`);
             token = res.data.token;
             userId = res.data.userId
             tokenExpiresIn = res.data.tokenExpiresIn;
             console.log(`UserId Returned ${userId}`);
             console.log(`Token Returned ${token}`);
             this.$store.dispatch('setAuthTokenAction', token);
             this.$store.dispatch('setLogOutTimerAction', +tokenExpiresIn * 1000);
             localStorage.setItem('token', token);
             localStorage.setItem('tokenExpiration', new Date().getTime() +  +tokenExpiresIn * 1000);
             Cookie.set('jwt', token);
             Cookie.set('expiresDate', new Date().getTime() +  tokenExpiresIn * 1000);
             console.log(`Token expires in  ${+tokenExpiresIn} in hours: ${+tokenExpiresIn * 1000}`)
             const setToken = await UserProfileService.setAuthHeaderToken(token);
             const userInfo = await UserProfileService.getUserDetails(userId, setToken);
             if(userInfo.data.user){
                this.user = userInfo.data.user;
                // test if  this.user.isProfileCompleted = true
                // if(this.user.isProfileCompleted){
                //   this.$router.push({name: '/', params: {user: this.user}})
                // } else {
                //    // if not redirect to completed profile
                //    this.$router.push({name: '/user/update/profile', params: {user: this.user}})

                // }

             }
          }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
