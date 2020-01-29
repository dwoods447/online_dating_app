<template>
  <div>

       <form @submit.prevent="sendUserMessage(userId)" style="max-width: 20%; margin: 0 auto;">
       <textarea name="message" id="message" cols="30" rows="10" v-model="message" class="form-control"><slot></slot></textarea>
       <button class="btn btn-success btn-custom">Send</button>
       <div>
         <div v-if="status">{{ status }}</div>
       </div>
      </form>

  </div>
</template>

<script>
import UserProfileService from '../../../middleware/services/UserProfileService'
  export default {
    props: {
      userId: {
        type: String,
        required : true
      }
    },
    mounted(){
      console.log(`Id is send message: ${this.userId}`)
    },
    data(){
      return {
          message: '',
          status: ''
      }
    },
    methods: {
       async sendUserMessage(recieverId){
          console.log(`Sending user a messagew with id: ${recieverId}`);
          const sent  = await UserProfileService.sendUserMessage({userProfileId: recieverId, message: this.message});
          console.log(`Message status: ${JSON.stringify(sent)}`)
          if(sent.status == 200){
              console.log(`Message sent succesfully`);
              this.message = '';
              this.status = '';
              this.status = 'Message sent succesfully'
          }
      }
    }
  }
</script>

<style lang="scss" scoped>


</style>
