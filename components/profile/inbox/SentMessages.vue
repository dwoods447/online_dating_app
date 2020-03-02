<template>
  <div>
    <section>
      <div style="margin: 1em; padding: 1em;">
          <SentMessagesInboxPreview v-for="(message, index) in messages" :key="'message-user'+'_'+index"
            :imageSrc="message.messageContent[0].image"
            :sender="message.messageContent[0].sender"
            :reciever="message.messageContent[0].receiver"
            :content="message.messageContent[message.messageContent.length - 1].content"
            :messageLength="message.messageContent.length"
            :date="message.messageContent[0].date|dateFilter"
            :thread="message"
            :senderId="message._id.from"
            :recieverId="message._id.to"
            :gender="message.messageContent[0].receiverGender"
            :random="message.messageContent[0].random"
            :class="['thread', {unread: message.messageContent[message.messageContent.length - 1].unread}]"
            >
            </SentMessagesInboxPreview>
      </div>
    </section>

  </div>
</template>

<script>
  import UserProfileService from '../../../middleware/services/UserProfileService'
  import SentMessagesInboxPreview from '../../profile/inbox/SentMessagesInboxPreview'
  import moment from 'moment'
  export default {
    props: ['user'],
    components :{ SentMessagesInboxPreview },
    created(){
        this.getUserMessages();
    },
    data(){
      return {
          messages: []
      }
    },
    filters: {
      dateFilter(date){
        if(date){
          return moment(new Date(date), 'MM/DD/YYYY').format('l')
        }
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

<style  scoped>
.thread{
  max-width: 945px;
  margin: 0.1em auto;
  border: 1px solid #2D6BB8;
  background-color: #eee;
  padding: 1.1em;
}
</style>
