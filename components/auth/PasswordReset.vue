<template>
<div style="height: 100vh;">
    <div class="flex-container">
        <div class="flex-item">
            <div>
                Forgot your account’s password or having trouble logging in? Enter your email address and we’ll send you a recovery link.
            </div>
            <div>
                <label for="">Email</label>    
                <input  type="email" name="email" v-model="email" placeholder="Enter you email" class="form-control">
            </div>
            <br/>
            <div>
                <button class="btn btn-primary">Send Recovery Email</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import UserProfileService from '../../middleware/services/UserProfileService'
export default {
    data(){
        return {
            email: '',
        }
    },
    methods: {
        resetPassword(){
             const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
             const passwordReset = await UserProfileService.resetPassword({email: this.email});

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
