<template>
  <div>
        <a @click="viewMessageThread()" href="javascript:void(0);"><div class="row">
                  <div class="col-lg-2">
                      <div style="border: 1px solid green;">

                          <img :src="this.imageSrc" alt="" style="width: 100%;">

                        </div>
                      <div>{{ this.sender }}</div>
                  </div>
                  <div class="col-lg-6">
                      {{ this.content | filterPreview }}( {{ this.messageLength }})
                  </div>
                  <div class="col-lg-4">
                      {{ this.date }}
                  </div>
          </div></a>
  </div>
</template>

<script>
import Message from './Message'
import UserProfileService from '../../../middleware/services/UserProfileService'
  export default {
    props: ['imageSrc', 'sender', 'content', 'messageLength', 'date', 'thread', 'senderId'],
    created(){
    },
    filters :{
      filterPreview(message){
        let length = message.length;
        return message.substring(0, length/1.2) + '...';
      },
      imageSrcFilter(profile){
         return '../uploads/'+profile.images.imagePaths[0].path;
      },
      maleImageSrcFilter(profile){
        return '../random-users/men/'+ profile.images.imagePaths[0].path;
      },
      femaleImageSrcFilter(profile){
         return '../random-users/women/'+ profile.images.imagePaths[0].path;
      },
      transMaleImageSrcFilter(profile){
         return '../random-users/men/'+ profile.images.imagePaths[0].path;
      },
      transFemaleImageSrcFilter(profile){
        return '../random-users/women/'+ profile.images.imagePaths[0].path;
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
            let messageId = this.thread._id;
            console.log('Reading message with id ' + messageId);
            await UserProfileService.markMessageAsRead({messageId: messageId});
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>
