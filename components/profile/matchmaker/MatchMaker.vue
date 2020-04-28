<template>
    <div>
        <div style="padding: 1em; margin: 1em;">
         <div class="flex-container">
                <div><h2>Think this geek is a match for you?</h2></div>
            </div>
            <div class="flex-container">
                <div><button @click="addToMatches()" class="btn btn-yes">Yes</button></div>
                <div><button @click="addToMatches()" class="btn btn-maybe">Maybe</button></div>
                <div><button @click="skipToNextProfile()" class="btn btn-no">No</button></div>
            </div>
            <div class="flex-container">
                 <div v-for="(user, i) in userProfiles" :key="'user-'+i">
                    <div v-if="user.random === 'true'">
                     <div v-if="user.gender === 'male'" class="matchmaker-image-container">
                         <img :src="user.images.imagePaths[0].path | maleImageSrcFilter" class="matchmaker-image">
                     </div>
                      <div v-if="user.gender === 'female'" class="matchmaker-image-container">
                          <img :src="user.images.imagePaths[0].path |femaleImageSrcFilter" class="matchmaker-image">
                     </div>
                      <div v-if="user.gender === 'trans-male'" class="matchmaker-image-container">
                          <img :src="user.images.imagePaths[0].path | transMaleImageSrcFilter" class="matchmaker-image">
                     </div>
                     <div v-if="user.gender === 'trans-female'" class="matchmaker-image-container">
                         <img :src="user.images.imagePaths[0].path | transFemaleImageSrcFilter" class="matchmaker-image">
                     </div>
                    </div>
                    <div v-if="user.random === 'false'" class="matchmaker-image-container">
                        <img :src="user.images.imagePaths[0].path | imageSrcFilter" class="matchmaker-image">
                        
                    </div>
                   

                    <div>
                        <h3><nuxt-link :to="'/profile/'+user._id">{{user.username}}</nuxt-link></h3> 
                        <h4>{{user.city}}, {{user.state}}</h4>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import UserProfileService from '../../../middleware/services/UserProfileService'
import ProfilePreview from '../../../components/profile/preview/ProfilePreview'
export default {
    created(){
        this.skipToNextProfile();
    },
    data(){
        return {
            myusers: [],
        }
    },
    filters: {
      imageSrcFilter(src){
         return '../uploads/'+src;
      },
      maleImageSrcFilter(src){
        return '../random-users/men/'+ src;
      },
      femaleImageSrcFilter(src){
         return '../random-users/women/'+ src;
      },
      transMaleImageSrcFilter(src){
         return '../random-users/men/'+ src;
      },
      transFemaleImageSrcFilter(src){
        return '../random-users/women/'+ src;
      },
    },
    methods: {
        async addToMatches(){
             const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
             let userId = this.myusers[0]._id.toString();
             console.log(`Sending user with an ID: ${userId}`);
             await UserProfileService.addUserToUserMatches({userProfileId: userId});
             this.skipToNextProfile();
        },
        async skipToNextProfile(){
            const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
            const users = (await UserProfileService.getUserForMatchMaker()).data;
            if(users){
                console.log(`User returned: ${JSON.stringify(users.users, null, 2)}`)
                this.myusers = users.users;
            }
        }
    },
    computed:{
        userProfiles(){
          return this.myusers;
        }
    }
}
</script>
<style>
.flex-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.matchmaker-image-container{
    max-width: 500px;
    max-height: 500px;
}

.matchmaker-image{
    width: 500px;
    display: block;
}

.btn-yes{
    display: block;
    margin: 0.5em;
    width: 220px;
    background-color: green;
    color: #fff
}

.btn-maybe{
    display: block;
    margin: 0.5em;
    width: 220px;
    background-color: yellow;
    color: #000;
}
.btn-no{
    display: block;
    margin: 0.5em;
    width: 220px;
    background-color: red;
    color: #fff;
}

</style>