<template>
  <div>

       <form @submit.prevent="sendUserMessage(userId)" style="max-width: 20%; margin: 0 auto;">
       <textarea name="message" id="message" cols="30" rows="10" v-model="message" class="form-control"><slot></slot></textarea>
       <button class="btn btn-success btn-custom" :disabled="isBlocked">Send</button>
       <div>
         <div v-if="status">{{ status }}</div>
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
          console.log(`${JSON.stringify(sent)}`)
            this.message = '';
            this.status = '';
          if(sent.status == 200 && sent.blocked == false){
              this.status = 'Message sent succesfully';
              eventBus.$emit('message-sent');
              console.log(`Emitting message-sent`)
          } else if(sent.blocked == true) {
            this.status = sent.message;
            this.isBlocked = sent.blocked;
          }
      }
    }
  }
</script>

<style lang="scss" scoped>


</style>
