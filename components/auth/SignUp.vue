<template>
  <div>
       <div v-if="message !== null">{{ message }}</div>
       <div v-if="errorMessage !== null" style='width: 25%; color:red; text-align: center; margin" 0 auto;'>{{ errorMessage }}</div>
      <form @submit.prevent="signUp" class="form" style="width: 60%; margin: 3% auto;">
        <div class="form-group">
             <label for="">Username:</label>
             <input type="text" v-model="formData.username" class="form-control" @change="checkUsername">
             <label for="">Email:</label>
             <input type="text" v-model="formData.email" class="form-control" @change="checkEmail">

        </div>
        <div class="form-group">
            <label for="">Password:</label>
           <input type="password" v-model="formData.password" class="form-control">
             <label for="">Confirm Password:</label>
        <input type="password" v-model="formData.passwordConfirm" class="form-control">
        </div>
        <div class="form-group">
          <label for="">Gender</label>
           <select name="gender" class="form-control" v-model="formData.gender">
            <option  v-for="gender in this.genders" :key="gender.key" >{{gender.val}}</option>
           </select>
            <label for="">Ethnicity:</label>
            <select name="ethnicitiy" class="form-control" v-model="formData.ethnicity">
               <option  v-for="ethnicity in this.ethnicities" :key="ethnicity.key" >{{ethnicity.value}}</option>
             </select>
        </div>
          <div class="form-group">
              <label for="">Birthdate:</label>
              <input type="text" v-model="formData.birthdate" class="form-control">

        </div>
        <button class="btn btn-primary" style="width: 100%;">Sign Up</button>
      </form>
  </div>
</template>

<script>
import AuthService from '../../middleware/services/AuthService'
  export default {
    data(){
      return {
        message: '',
        errorMessage: '',
          formData: {
            username: '',
            password: '',
            passwordConfirm: '',
            gender: '',
            birthdate: '',
            ethnicity: '',
            onlineDatingStatus: false,
          },
          genders: [
             { val: 'male', key: 'male'},
             { val: 'female', key: 'female'},
             { val: 'trans-male', key: 'trans male'},
             { val: 'trans-female', key: 'trans female'},
          ],
          ethnicities: [
            {value: 'White/Caucasian', key: 'White/Caucasian'},
            {value: 'Black/African American', key: 'Black/African American'},
            {value: 'Native American', key: 'Native American'},
            {value: 'Hispanic', key: 'Hispanic'},
            {value: 'Indian', key: 'Indian'},
            {value: 'Middle Eastern', key: 'Middle Eastern'},
            {value: 'Asian', key: 'Asian'},
            {value: 'Mixed Race', key: 'Mixed Race'},
            {value: 'Other', key: 'Other'},
          ],
      }
    },
    methods: {
      async checkUsername(){
        this.errorMessage = '';
        console.log(`User entered: ${this.formData.username}`);
        let username = {
          username: this.formData.username
        }
        const usernameResponse = (await AuthService.checkUserNameUnique(username)).data;
        if(usernameResponse.usernameExists){
          this.errorMessage = usernameResponse.message;
        }
      },
       async checkEmail(){
         this.errorMessage = '';
        console.log(`User entered: ${this.formData.username}`);
        let email = {
          email: this.formData.email
        }
        const emailResponse = (await AuthService.checkEmailUnique(email)).data;
        if(emailResponse.emailExists){
            this.errorMessage = emailResponse.message;
        }
      },
      async signUp(){
          if(this.formData.password !== this.formData.passwordConfirm){
             this.errorMessage = "Passwords do not match!";
            return;
          }
          const signedUp = (await AuthService.signUp(this.formData)).data;
          if(signedUp.statusCode !== 200){
             this.errorMessage = signedUp.message;
          }
          if(signedUp.statusCode === 200){
               this.message = signedUp.message;
               let $this = this;
               $this.$router.push({name:'login', params: {user: signedUp.user, message: this.message}});
          }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
