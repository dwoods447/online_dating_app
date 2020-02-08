<template>
  <div>
        Sent Messages:
        <div v-for="message in messages" :key="message._id.to">
            Reciever: {{ message.messageContent[0].receiver}}<br/>
            {{ message.messageContent[0].content }}
        </div>
  </div>
</template>

<script>
  import UserProfileService from '../../../middleware/services/UserProfileService'
  import MessageInboxPreview from './MessageInboxPreview'
  export default {
    props: ['user'],
    created(){
        this.getUserMessages();
    },
    data(){
      return {
          messages: []
      }
    },
    methods: {
      async getUserMessages(){
        console.log('Getting messages...');
           const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
         let sentMessages =  (await UserProfileService.getSentMessagesForUser()).data;
         console.log(`Sent Messages ${JSON.stringify(sentMessages)}`);
         if(sentMessages.messages.length > 0){
           this.messages = sentMessages.messages;
         }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
