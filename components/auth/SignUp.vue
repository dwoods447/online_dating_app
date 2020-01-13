<template>
  <div>
      <form action="">
             <input type="text" vmodel="username">
             <input type="text" vmodel="password">
             <input type="text" vmodel="passwordConfirm">
             <input type="text" vmodel="email">
             <select name="gender">
               <option  v-for="gender in this.genders" :key="gender.key" vmodel="gender">{{gender.val}}</option>
             </select>
             <input type="text" vmodel="birthdate">
             <input type="text" vmodel="age">
              <select name="ethnicitiy" >
               <option  v-for="ethnicitiy in this.ethnicities" :key="ethnicitiy.key" vmodel="ethnicitiy">{{ethnicitiy.value}}</option>
             </select>
             <input type="hidden" vmodel="onlineDatingStatus" >

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
             { val: 'trans male', key: 'trans male'},
             { val: 'trans female', key: 'trans female'},
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
