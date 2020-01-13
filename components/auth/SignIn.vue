<template>
  <div>
      <form>
          <input type="text" name="username" v-model="username">{{ this.username }}<br/><br/>
          <input type="password" name="password" v-model="password">{{ this.password }}<br/>
          <br/>
          <button @click="signIn" > Sign In</button>
      </form>
      <p v-if="response">{{res.message}}</p>
  </div>
</template>

<script>
import AuthService from '../../middleware/services/AuthService'
  export default {
    data(){
      return {
        response: '',
        username: '',
        password: '',
      }
    },
    methods: {
      async signIn(e){
        e.preventDefault();
        const data = {
          username: this.username,
          password: this.password
        }

          console.log(`Sending: ${JSON.stringify(data)}`);
          const res = await AuthService.signIn(data);
           console.log(`Response recived: ${JSON.stringify(res)}`);
          if(res){
             this.response = res.message;
             console.log(`Response data: ${JSON.stringify(res)}`);
          }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
