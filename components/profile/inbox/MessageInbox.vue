<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <section>
          <div style="margin: 1em; padding: 1em;">
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
                  <div class="corner-ribbon top-right blue" v-if="message.messageContent[message.messageContent.length - 1].unread">New</div>
                  </MessageInboxPreview>

                  </paginate>
                  <div class="flex-container">
                     <paginate-links for="messages" :async="true" :classes="{'ul':'pagination', 'li':'page-item', 'a':'page-link'}"></paginate-links>
                  </div>

              </div>
              <div class="flex-container" v-if="NoMessages">
                 <div v-if="messages.length === 0">You have no messages</div>
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
        paginate:['messages'],
        NoMessages: false,
      }
    },
    computed:{
      myMessages(){
        return this.messages;
      }
    },
    methods: {

        async getUserMessages(){
           this.NoMessages =  false;
            const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const messageData = await UserProfileService.getUserMessages(this.page);
            if(messageData.data.messages.length > 0 ){
                this.messages = messageData.data.messages;
            } else {
                this.NoMessages = true;
            }
        },




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
  position: relative;
  overflow: hidden;
}
.thread > a{
  color: #fff;
}
 .unread{
   background-color: rgb(20, 224, 37);
   color: #fff;
 }

 .flex-container{
   display: flex;
   flex-direction: row;
   align-content: center;
   justify-content: center;
 }


.corner-ribbon{
  width: 200px;
  background: #e43;
  position: absolute;
  top: 25px;
  left: -50px;
  text-align: center;
  line-height: 50px;
  letter-spacing: 1px;
  color: #f0f0f0;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.corner-ribbon.top-right{
  top: 25px;
  right: -50px;
  left: auto;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.corner-ribbon.blue{background: #39d;}
</style>
