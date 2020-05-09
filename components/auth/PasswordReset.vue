<template>
<div style="height: 100vh;">
    <div class="flex-container">
        <div class="flex-item">
            <div v-if="myMessage">
                <p style="color: green; front-weight: 700;">{{ displayMessage }}</p>
            </div>
            <div>
                Forgot your account’s password or having trouble logging in? Enter your email address and we’ll send you a recovery link.
            </div>
        
            <form @submit.prevent="resetPassword">
                <div>
                    <label for="">Email</label>    
                    <input  type="email" name="email" v-model="email" placeholder="Enter you email" class="form-control">
                </div>
                <br/>
                <div>
                    <button class="btn btn-primary">Send Recovery Email</button>
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
    data(){
        return {
            email: '',
            myMessage: '',
        }
    },
    methods: {
        async resetPassword(){
             this.message = '';
             const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
             const passwordReset = (await AuthService.resetPassword({email: this.email})).data;
                if(passwordReset){
                    console.log(`password reset return ${JSON.stringify(passwordReset.message)}`)
                    this.myMessage = passwordReset.message;
                    this.email = '';
                    let $this = this;
                    if(passwordReset.message !== 'No user account with that email exists.'){
                         setTimeout(()=>{
                            $this.$router.push({name: 'index'});
                        }, 3500)
                    }
                   
                }
        }
    },
    computed: {
        displayMessage(){
            return this.myMessage;
        }
    }
}
</script>
<style scoped>
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
