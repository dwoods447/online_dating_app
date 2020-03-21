<template>
  <div>
    <section>
      <div style="margin: 1em; padding: 1em;">
        <paginate name="messages" :list="messages" :per="2">
          <SentMessagesInboxPreview v-for="(message, index) in paginated('messages')" :key="'message-user'+'_'+index"
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
            </paginate>
             <div class="flex-container" v-if="NoMessages">
                 <div v-if="messages.length === 0">You have no sent messages</div>
              </div>

             <div class="flex-container">
                     <paginate-links for="messages" :async="true" :classes="{'ul':'pagination', 'li':'page-item', 'a':'page-link'}"></paginate-links>
             </div>
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
          messages: [],
          paginate:['messages'],
          NoMessages: false,
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
         } else {
            this.NoMessages = true;
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
 .flex-container{
   display: flex;
   flex-direction: row;
   align-content: center;
   justify-content: center;
 }
</style>
