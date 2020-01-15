<template>
  <div>
       <div v-if="errorMessage !== null">{{ errorMessage }}</div>
      <form @submit.prevent="signUp" class="form" style="width: 60%; margin: 0 auto;">
        <div class="form-group">
             <label for="">Username:</label>
             <input type="text" vmodel="formData.username" class="form-control">
             <label for="">Email:</label>
             <input type="text" vmodel="formData.email" class="form-control">

        </div>
        <div class="form-group">
            <label for="">Password:</label>
           <input type="text" vmodel="formData.password" class="form-control">
             <label for="">Confirm Password:</label>
        <input type="text" vmodel="formData.passwordConfirm" class="form-control">
        </div>
        <div class="form-group">
          <label for="">Gender</label>
           <select name="gender" class="form-control" vmodel="formData.gender">
            <option  v-for="gender in this.genders" :key="gender.key" >{{gender.val}}</option>
           </select>
            <label for="">Ethnicity:</label>
            <select name="ethnicitiy" class="form-control" vmodel="formData.ethnicitiy">
               <option  v-for="ethnicitiy in this.ethnicities" :key="ethnicitiy.key" >{{ethnicitiy.value}}</option>
             </select>
        </div>
          <div class="form-group">
              <label for="">Birthdate:</label>
              <input type="text" vmodel="formData.birthdate" class="form-control">
              <input type="hidden" vmodel="formData.onlineDatingStatus">
        </div>

      </form>
  </div>
</template>

<script>
import UserService from '../../middleware/services/AuthService'
  export default {
    data(){
      return {
        errorMessage: '',
          formData: {
            username: '',
            password: '',
            passwordConfirm: '',
            gender: '',
            birthdate: '',
            ethnicitiy: '',
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
      async signUp(){
          if(this.formData.password !== this.formData.passwordConfirm){
             this.errorMessage = "Passwords do not match!";
            return;
          }
          const signedUp = await AuthService.signUp(this.formData);
          console.log(`Signed Up Resp: ${JSON.stringify(signedUp)}`);
          console.log(`User Id: ${JSON.stringify(signedUp.data.userId)}`);
          if(signedUp.data.status !== 200){
            this.errorMessage = signedUp.data.message;
          }
          if(signedUp.data.status === 200){
              console.log(`${signedUp.data.message}`);
              this.$router.push('/login', {params: {userId: signedUp.data.userId}});
          }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
