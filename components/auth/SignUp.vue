<template>
  <div>
       <div v-if="message !== null">{{ message }}</div>
       <div v-if="errorMessage !== null" style='font-weight: 900; width: 50%; color:red; text-align: center; margin: 0 auto; font-size: 2em;'>{{ errorMessage }}</div>
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
        <button class="btn btn-primary btn-custom" :disabled="isDisabled">Sign Up</button>
      </form>
  </div>
</template>

<script>
import AuthService from '../../middleware/services/AuthService'
  export default {
    data(){
      return {
        isDisabled: false,
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
        let email = {
          email: this.formData.email
        }
        const emailResponse = (await AuthService.checkEmailUnique(email)).data;
        if(emailResponse.emailExists){
            this.errorMessage = emailResponse.message;
        }
      },
      async signUp(){
         this.isDisabled = true;
          if(this.formData.password !== this.formData.passwordConfirm){
             this.errorMessage = "Passwords do not match!";
              this.isDisabled = false;
            return;
          }
          const signedUp = (await AuthService.signUp(this.formData)).data;
          if(signedUp.statusCode !== 200){
             this.errorMessage = signedUp.message;
              this.isDisabled = false;
          }
          if(signedUp.statusCode === 200){
               this.isDisabled = false;
               this.message = signedUp.message;
               let $this = this;
               $this.$router.push({name:'login', params: {user: signedUp.user, message: this.message}});
          }
      }
    }
  }
</script>

<style  scoped>
.btn-custom{
  width: 100%;
}
</style>
