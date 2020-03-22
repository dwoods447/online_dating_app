<template>
  <div>
        <a @click="viewMessageThread()" href="javascript:void(0);">
          <div class="row">
                  <div class="col-lg-2">
                      <div>
                          <div v-if="this.random === 'true' && this.gender === 'male'">
                             <img :src="this.imageSrc|maleImageSrcFilter" alt="" style="width: 100%;" class="message-thread-photo">
                          </div>
                          <div v-if="this.random === 'true' && this.gender === 'female'">
                               <img :src="this.imageSrc|femaleImageSrcFilter" alt="" style="width: 100%;" class="message-thread-photo">
                            </div>
                             <div v-if="this.random === 'true' && this.gender === 'trans-male'">
                               <img :src="this.imageSrc|transMaleImageSrcFilter" alt="" style="width: 100%;" class="message-thread-photo">
                            </div>
                             <div v-if="this.random === 'true' && this.gender === 'trans-female'">
                               <img :src="this.imageSrc|transFemaleImageSrcFilter" alt="" style="width: 100%;" class="message-thread-photo">
                            </div>
                          <div v-if="this.random === 'false'">
                            <img :src="this.imageSrc|imageSrcFilter" alt="" style="width: 100%;" class="message-thread-photo">
                          </div>


                        </div>
                      <div><p style="color:#041F3D;">{{ this.sender }}</p></div>
                  </div>
                  <div class="col-lg-6">
                      <div class="flex-container">
                        <div class="flex-item">
                          <p style="color:#041F3D;">{{ this.content | filterPreview }}&nbsp;&nbsp;<strong>( {{ this.messageLength }})</strong></p>
                        </div>
                      </div>
                  </div>
                  <div class="col-lg-4">
                     <div class="flex-container">
                        <div class="flex-item">
                        <p style="color:#041F3D;">{{ this.date }}</p>
                        </div>
                      </div>
                  </div>
          </div>
          </a>
          <slot></slot>
  </div>
</template>

<script>
import UserProfileService from '../../../middleware/services/UserProfileService'
  export default {
    props: ['imageSrc', 'sender', 'reciever', 'content', 'messageLength', 'date', 'thread', 'senderId', 'gender', 'random'],
    created(){
    },
    filters :{
      filterPreview(message){
        let length = message.length;
        return message.substring(0, length/1.2) + '...';
      },
      imageSrcFilter(src){
         return '../uploads/'+src;
      },
      maleImageSrcFilter(src){
        return '../random-users/men/'+src;
      },
      femaleImageSrcFilter(src){
         return '../random-users/women/'+src;
      },
      transMaleImageSrcFilter(src){
         return '../random-users/men/'+src;
      },
      transFemaleImageSrcFilter(src){
        return '../random-users/women/'+src;
      }
    },
    data(){
      return {
        msgSender: '',
      }
    },
    methods :{
        viewMessageThread(){
          let routeParams = {
            thread: this.thread,
            senderId: this.senderId
          }
              this.changeUnreadStatus();
              this.$router.push({path: `/message/${this.senderId}/${this.sender}`, params: {routeParams}});
              // this.$router.push({path: '/profile/'+ id, params: {id: id, userProfile: profile}});
        },

        async changeUnreadStatus(){
            let messageId = this.thread.messageContent[this.thread.messageContent.length - 1].messageId;
            console.log('Reading message with id ' + messageId);
            await UserProfileService.markMessageAsRead({messageId: messageId});
        }
    }
  }
</script>

<style scoped>
.flex-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  align-content: center;
}
.flex-item{
  width: 85%;
  height: 50px;
  flex-shrink: 1;
  margin-top: 50px;
  margin-bottom: 50px;
}
.message-thread-photo{
 border-radius: 50%;
 border: 2px solid blue;
}
</style>
