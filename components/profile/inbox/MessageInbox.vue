<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <section>
          <div style="margin: 1em; padding: 1em;">
              <div v-if="messages.length <= 0">You have No messages</div>
              <div v-if="messages.length > 0">
                 <paginate name="messages" :list="messages" :per="2">
                  <MessageInboxPreview v-for="(message, index) in paginated('messages')" :key="'message-user'+'_'+index"
                  :imageSrc="message.messageContent[0].image"
                  :sender="message.messageContent[0].sender"
                  :content="message.messageContent[message.messageContent.length - 1].content"
                  :messageLength="message.messageContent.length"
                  :date="message.messageContent[0].date|dateFilter"
                  :thread="message"
                  :senderId="message._id.from"
                  :gender="message.messageContent[0].gender"
                  :random="message.messageContent[0].random"
                  :class="['thread', {unread: message.messageContent[message.messageContent.length - 1].unread}]"
                  >
                  </MessageInboxPreview>

                  </paginate>
                  <div class="flex-container">
                     <paginate-links for="messages" :async="true" :classes="{'ul':'pagination', 'li':'page-item', 'a':'page-link'}"></paginate-links>
                  </div>

              </div>

          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileService from '../../../middleware/services/UserProfileService'
import MessageInboxPreview from './MessageInboxPreview'
import moment from 'moment'
  export default {
    components :{ MessageInboxPreview },
    created(){
        this.getUserMessages();
    },
     filters: {
      imageSrcFilter(src){
        console.log('Filter src: '+ src);
        if(src){
          return 'uploads/'+ src
        }

      },
      dateFilter(date){
        if(date){
          return moment(new Date(date), 'MM/DD/YYYY').format('l')
        }
      }
    },
    data(){
      return {
        messages: [],
        inboxData: [],
        page: 1,
        paginate:['messages']
      }
    },
    computed:{
      myMessages(){
        return this.messages;
      }
    },
    methods: {
        // async getUserMessages(){
        //     const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        //     const messageData = await UserProfileService.getUserMessages()
        //     if(messageData.data.messageInbox.length > 0 ){
        //         this.messages = messageData.data.messageInbox;
        //     } else {
        //       return this.messages = [];
        //     }
        // },
        async getUserMessages(){
            const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const messageData = await UserProfileService.getUserMessages(this.page);
           // console.log(`Inbox response: ${JSON.stringify(messageData)}`);
            if(messageData.data.messages.length > 0 ){
                this.messages = messageData.data.messages;
               console.log(`Inbox messages: ${JSON.stringify(this.messages)}`);
            }
        },

        // async nextPage(page){
        //       const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        //     const messageData = await UserProfileService.getUserMessages(page);
        //    // console.log(`Inbox response: ${JSON.stringify(messageData)}`);
        //     if(messageData.data.messages.length > 0 ){
        //         this.messages = messageData.data.messages;
        //        console.log(`Inbox messages: ${JSON.stringify(this.messages)}`);
        //     }
        // },
        // async prevPage(page){
        //     const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        //     const messageData = await UserProfileService.getUserMessages(page);
        //    // console.log(`Inbox response: ${JSON.stringify(messageData)}`);
        //     if(messageData.data.messages.length > 0 ){
        //         this.messages = messageData.data.messages;
        //        console.log(`Inbox messages: ${JSON.stringify(this.messages)}`);
        //     }
        // }


    },
  }
</script>

<style scoped>
.thread{
  max-width: 945px;
  margin: 0.3em auto;
  border: 1px solid #2D6BB8;
  border-radius: 6px;
  background-color: #eee;
  padding: 1.2em;
}
.thread > a{
  color: #fff;
}
 .unread{
   background-color: #14ABE0;
   color: #fff;
 }

 .flex-container{
   display: flex;
   flex-direction: row;
   align-content: center;
   justify-content: center;
 }
</style>
