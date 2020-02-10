<template>
  <div>
        Sent Messages:
        <!-- <div v-for="message in messages" :key="message._id.to">
            Reciever: {{ message.messageContent[0].receiver}}<br/>
            {{ message.messageContent[0].content }}
        </div> -->
           <SentMessagesInboxPreview v-for="(message, index) in messages" :key="'message-user'+'_'+index"  style="max-width: 945px; margin: 0 auto; border: 1px solid #000; padding: 1.7em;"
            :imageSrc="message.messageContent[0].image"
            :sender="message.messageContent[0].sender"
            :reciever="message.messageContent[0].receiver"
            :content="message.messageContent[message.messageContent.length - 1].content"
            :messageLength="message.messageContent.length"
            :date="message.messageContent[0].date|dateFilter"
            :thread="message"
            :senderId="message._id.from"
            :gender="message.messageContent[0].receiverGender"
            :random="message.messageContent[0].random"
            :class="{unread: message.messageContent[message.messageContent.length - 1].unread}"
            >
            </SentMessagesInboxPreview>
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

<style lang="scss" scoped>

</style>
