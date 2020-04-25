<template>
    <div>
        <p style="width: 50%; margin: 0 auto; text-align:center;">Are you sure you want to delete your profile: </p>
        <div class="flex-container">
            <div class="flex-item"><button class="btn btn-custom btn-yes" @click="confirmDeleteUserProfile()">Yes</button></div>
            <div class="flex-item"><button class="btn btn-custom btn-no" @click="cancelDeleteUserProfile()">No</button></div>
        </div>
    </div>
</template>
<script>
import UserProfileService from '../middleware/services/UserProfileService'

 export default {
     middleware: ['check-auth', 'auth', 'check-profile'],
     data(){
         return {

         }
     },
     methods: {
         async confirmDeleteUserProfile(){
             const answer = confirm("Are you sure you?");
             if(answer){
                  const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
                  const userProfileDeleted = (await UserProfileService.deleteUserProfile()).data;
                  if(userProfileDeleted){
                      await this.$store.dispatch('setLogOutAction');
                      this.router.push({name: 'signup'});
                  }
             }
         },


         cancelDeleteUserProfile(){

         }
     }
 }
</script>
<style>
.flex-container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.flex-item{
width: 220px;
margin: 10px;
}

.btn-custom{
    width: 220px;
    background-color: blue;
    color: #fff;
}

.btn-yes{
    background-color: red;
}
.btn-no{
 background-color: green;
}
</style>