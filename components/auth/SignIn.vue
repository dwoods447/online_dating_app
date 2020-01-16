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
            //  this.$store.dispatch('setLogOutTimerAction', new Date().getTime() + Number.parseInt(tokenExpiresIn) * 1000);
             localStorage.setItem('token', token);
             localStorage.setItem('tokenExpiration', new Date().getTime() +  Number.parseInt(tokenExpiresIn) * 1000);
             Cookie.set('jwt', token);
             Cookie.set('expiresDate', new Date().getTime() +  Number.parseInt(tokenExpiresIn) * 1000);
             console.log(`Token expires in  ${Number.parseInt(tokenExpiresIn)} in hours: ${Number.parseInt(tokenExpiresIn) * 1000}`)
             const setToken = await UserProfileService.setAuthHeaderToken(token);
             const userInfo = await UserProfileService.getUserDetails(userId, setToken);
             //let userString = JSON.stringify(userInfo);
             //console.log(`User string ${userString}`);
             Cookie.set('user', userId)
             localStorage.setItem('user', userId);
             if(userInfo.data.user){
                this.user = userInfo.data.user;
                this.$store.dispatch('setLoggedInUserIdAction', this.user);
              //  test if  this.user.isProfileCompleted = true
                if(this.user.isProfileCompleted){
                  console.log(`User Profile is completed.`)
                  this.$router.push({name: 'index', params: {user: this.user}})
                } else {
                  console.log(`User Profile is incomplete.`)
                   // if not redirect to completed profile
                   this.$router.push({name: 'edituserprofile', params: {user: this.user}})

                }

             }
          }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
