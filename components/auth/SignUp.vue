<template>
  <div>
      <form action="" class="form" style="width: 60%; margin: 0 auto;">
        <div class="form-group">
             <label for="">Username:</label>
             <input type="text" vmodel="username" class="form-control">
             <label for="">Email:</label>
             <input type="text" vmodel="email" class="form-control">

        </div>
        <div class="form-group">
            <label for="">Password:</label>
           <input type="text" vmodel="password" class="form-control">
             <label for="">Confirm Password:</label>
        <input type="text" vmodel="passwordConfirm" class="form-control">
        </div>
        <div class="form-group">
          <label for="">Gender</label>
           <select name="gender" class="form-control">
            <option  v-for="gender in this.genders" :key="gender.key" vmodel="gender">{{gender.val}}</option>
           </select>
            <label for="">Ethnicity:</label>
            <select name="ethnicitiy" class="form-control">
               <option  v-for="ethnicitiy in this.ethnicities" :key="ethnicitiy.key" vmodel="ethnicitiy">{{ethnicitiy.value}}</option>
             </select>
        </div>
          <div class="form-group">
              <label for="">Birthdate:</label>
              <input type="text" vmodel="birthdate" class="form-control">
              <input type="hidden" vmodel="onlineDatingStatus" >
        </div>








      </form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
          formData: {
            username: '',
            password: '',
            passwordConfirm: '',
            gender: '',
            birthdate: '',
            age: 0,
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
      signUp(){
          if(this.formData.password !== this.formData.passwordConfirm){
            return 'Passwords Do Not Match'
          }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
