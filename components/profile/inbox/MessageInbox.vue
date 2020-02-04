<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
             <div v-if="messages.length <= 0">You have No messages</div>

            <MessageInboxPreview v-for="(message, index) in messages" :key="'message-user'+'_'+index"  style="max-width: 945px; margin: 0 auto; border: 1px solid #000; padding: 1.7em;"
            :imageSrc="message.sender.imageSrc|imageSrcFilter"
            :sender="message.sender.username"
            :content="message.content"
            :messageLength="message.length"
            :date="message.date|dateFilter"
            :thread="message"
            :senderId="message.sender.id"
            :class="{unread: message.unread}"
            >
            </MessageInboxPreview>



              <!-- <div v-for="sender in messages" style="width: 90%; margin: 0 auto;">
                <a href="#">
                  <div  style="width: 900px; display: block; border: 2px solid #000;  box-shadow: 2px 3px #000; padding: 2em; margin: 10px;">
                      <div> From: {{ sender.from }} </div>
                       <div v-for="(message, i) in sender.inbox.messages">
                      <div v-if="i == 0">{{message.content}}   <span v-if="sender.inbox.messages.length > 1">({{ sender.inbox.messages.length }})</span></div>
                    </div>
                  </div>
                </a>
             </div> -->

             <div >

                    <br/>


             </div>
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
            const messageData = await UserProfileService.getUserMessages();
           // console.log(`Inbox response: ${JSON.stringify(messageData)}`);
            if(messageData.data.messages.length > 0 ){
                this.messages = messageData.data.messages;
              //  console.log(`Inbox messages: ${JSON.stringify(this.messages)}`);
            }
        },


    },
  }
</script>

<style scoped>
 .unread{
   background-color: #ee4;
   color: #fff;
 }
</style>
