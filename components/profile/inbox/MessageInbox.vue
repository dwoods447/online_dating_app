<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
             <div v-if="messages.length <= 0">You have No messages</div>
             <MessageInboxPreview v-for="message in messages" :message="message.content" :imagePath="message.from.images.imagePaths[0]" :date="message.date"  :key="message.messageId"></MessageInboxPreview>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileService from '../../../middleware/services/UserProfileService'
import MessageInboxPreview from './MessageInboxPreview'
  export default {
    components :{ MessageInboxPreview },
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
            console.log(`Message data returned ${JSON.stringify(messageData)}`)
            if(messageData.data.messages.length > 0 ){
                this.messages = messageData.data.messages;
            } else {
              return this.messages = [];
            }
        }
    },
  }
</script>

<style lang="scss" scoped>

</style>
