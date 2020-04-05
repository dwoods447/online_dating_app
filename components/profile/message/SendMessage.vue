<template>
  <div>

       <form @submit.prevent="sendUserMessage(userId)">
       <textarea name="message" id="message" cols="60" rows="10" v-model="message" class="form-control" placeholder="Please enter your message"><slot></slot></textarea>
       <button class="btn btn-success btn-custom" :disabled="isBlocked">Send</button>
       <div>
         <div v-if="status">{{ updateStatus }}</div>
       </div>
      </form>

  </div>
</template>

<script>
import UserProfileService from '../../../middleware/services/UserProfileService'
import eventBus from '../../../middleware/eventBus/index'
  export default {
    props: {
      userId: {
        type: String,
        required : true
      }
    },
    mounted(){
    },
    data(){
      return {
          message: '',
          status: '',
          isBlocked: false,
      }
    },
    methods: {
       async sendUserMessage(recieverId){
          const sent  = (await UserProfileService.sendUserMessage({userProfileId: recieverId, message: this.message})).data;
          console.log(`Sent Response Rec'vd: ${JSON.stringify(sent, null, 2)}`)
            this.message = '';
            this.status = '';
          if(sent.blocked == false){
              this.status = 'Message sent succesfully';
              eventBus.$emit('message-sent');
              console.log(`Emitting message-sent`)
          } else {
            this.status = sent.message;
            this.isBlocked = sent.blocked;
            setTimeout(()=>{
              console.log('You are prevented from sending this user a message');
              this.$router.push({name: 'basicsearch'});
            }, 3000)
          }
      }
    },
    computed: {
      updateStatus(){
        return this.status;
      }
    }
  }
</script>

<style lang="scss" scoped>


</style>
