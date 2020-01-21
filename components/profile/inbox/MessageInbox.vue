<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
             <div v-if="messages.length <= 0">You have No messages</div>
             <MessageInboxPreview v-for="message in messages" :messages="message" :key="message.messageId"></MessageInboxPreview>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileService from '../../../middleware/services/AuthService'
import MessageInboxPreview from './MessageInboxPreview'
  export default {
    created(){
        this.getUserMessages();
    },
    data(){
      return {
        messages: [],
      }
    },

    methods: {
        async getUserMessages(){
            const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const messageData = await UserProfileService.getUserMessages()
            if(messageData.data.messages.length > 0 ){
                this.messages = messageData.data.messages.length;
            } else {
              return this.messages = [];
            }
        }
    },
  }
</script>

<style lang="scss" scoped>

</style>
