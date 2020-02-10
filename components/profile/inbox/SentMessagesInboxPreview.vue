<template>
  <div>
        <a @click="viewMessageThread()" href="javascript:void(0);"><div class="row">
                  <div class="col-lg-2">
                      <div style="border: 1px solid green;">
                          <div v-if="this.random === 'true' && this.gender === 'male'">
                             <img :src="this.imageSrc|maleImageSrcFilter" alt="" style="width: 100%;">
                          </div>
                          <div v-if="this.random === 'true' && this.gender === 'female'">
                               <img :src="this.imageSrc|femaleImageSrcFilter" alt="" style="width: 100%;">
                            </div>
                             <div v-if="this.random === 'true' && this.gender === 'trans-male'">
                               <img :src="this.imageSrc|transMaleImageSrcFilter" alt="" style="width: 100%;">
                            </div>
                             <div v-if="this.random === 'true' && this.gender === 'trans-female'">
                               <img :src="this.imageSrc|transFemaleImageSrcFilter" alt="" style="width: 100%;">
                            </div>
                          <div v-if="this.random === 'false'">
                            <img :src="this.imageSrc|imageSrcFilter" alt="" style="width: 100%;">
                          </div>


                        </div>
                      <div>{{ this.sender }}</div>
                  </div>
                  <div class="col-lg-6">
                      {{ this.content | filterPreview }}&nbsp;&nbsp;<strong>( {{ this.messageLength }})</strong>
                  </div>
                  <div class="col-lg-4">
                      {{ this.date }}
                  </div>
          </div></a>
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

<style lang="scss" scoped>

</style>
