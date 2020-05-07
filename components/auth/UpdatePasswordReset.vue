<template>
<div style="height: 100vh;">
    <div class="flex-container">
        <div class="flex-item">
            <div>
              <h2> Update your password</h2>
            </div>
             <div v-if="error">
                  <p style="color: red;">{{ error }}</p>
            </div>   
            <form @submit.prevent="updatePassword">
                   <div>
                        <label for="">Password</label>    
                        <input  type="password" name="password" v-model="password" placeholder="Enter you password" class="form-control">
                        <label for="">Confirm Password</label>    
                        <input  type="password" name="confirm-password" v-model="confirmPassword" placeholder="Re-enter you password" class="form-control">
                    </div>
                    <br/>
                    <div>
                        <button class="btn btn-primary">Update Password</button>
                    </div>
            </form>
         
        </div>
    </div>
</div>
</template>
<script>
import AuthService from '../../middleware/services/AuthService'
import UserProfileService from '../../middleware/services/UserProfileService'
export default {
    props: {
        userId: String,
        authToken: String,
    },
    created(){
       this.token = this.authToken;
       this.userID = this.userId;
    },
    data(){
        return {
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
            token: '',
            userID: '',
        }
    },
    methods: {
        async updatePassword(){
            this.error  = "";
             const token = await UserProfileService.setAuthHeaderToken(this.token);
             if(this.password === this.confirmPassword){
                   const passwordReset = await AuthService.updatePassword({userId: this.userID, token: this.token, password: this.password});
             } else {
                 this.error  = "Passwords do not match. Please try again.";
                 this.password = "";
                 this.confirmPassword = "";
             }
           

        }
    }
}
</script>
<style>
.flex-container{
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    
}

.flex-item{
    width: 340px;
    height: 440px;
}
</style>
