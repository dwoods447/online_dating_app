<template>
  <div>
      <div class="row">

        <div class="col-lg-6">
         <ul>
            <li>Body Type: <strong>{{ userReturned.bodyType }}</strong></li>
            <li>Personaility <strong>{{ userReturned.personality }}</strong></li>
            <li>Marital Status <strong>{{ userReturned.martialStatus }}</strong></li>
            <li>Age <strong>{{ userReturned.age }}</strong></li>
          </ul>
        </div>
        <div class="col-lg-6">
          <ul>
            <li>Gender <strong>{{ userReturned.gender }}</strong></li>
            <li>Ethnicity <strong>{{ userReturned.ethnicity }}</strong></li>
            <li>Hair Color <strong>{{ userReturned.hairColor }}</strong></li>
            <li>Eye Color <strong>{{ userReturned.eyeColor }}</strong></li>

          </ul>
        </div>

      </div>


        <div class="row">
          <div class="col-lg-6">
            <ul>
                <li>Do you have children? <strong>{{ userReturned.hasChildren }}</strong></li>
                <li>Do you smoke? <strong>{{ userReturned.doesSmoke }}</strong></li>
                <li>Do you do you do drugs? <strong>{{ userReturned.doesDoDrugs }}</strong></li>
                <li>Do you do you drink? <strong>{{ userReturned.doesDrink }}</strong></li>
            </ul>
          </div>
          <div class="col-lg-6">
             <ul>
                <li>City <strong>{{ userReturned.postalCode }}</strong></li>
                <li>State <strong>{{ userReturned.state }}</strong></li>
                <li>Dating Intent <strong>{{ userReturned.datingIntent }}</strong></li>
            </ul>
          </div>
        </div>

         <div class="row">
          <div class="col-lg-6">
            <ul>
                <li>Do you date interacially? <strong>{{ userReturned.doesDateInteracially }}</strong></li>
                <li>secondLanguage <strong>{{ userReturned.secondLanguage }}</strong></li>
                <li>bodyType <strong>{{ userReturned.bodyType }}</strong></li>
                <li>Height <strong>{{ userReturned.height }}</strong></li>
                <li>Highest Education Level <strong>{{ userReturned.highestEducation }}</strong></li>
            </ul>
          </div>
          <div class="col-lg-6">
             <ul>
                <li>Profession <strong>{{ userReturned.profession}}</strong></li>
                <li>Personaility <strong>{{ userReturned.personality}}</strong></li>
            </ul>
          </div>
        </div>

                <AddUserToBlockListButton :userId="userReturned._id"></AddUserToBlockListButton><br/>
                <AddUserToFavoritesListButton :userId="userReturned._id"></AddUserToFavoritesListButton>

                <SendMessage :userId="messageReciever" >Send Message</SendMessage>

        <h2>Preferences</h2>
        <p> Im looking for....</p>
        <div class="row">
          <div class="col-lg-6">
            <ul>
                <li>I am seeking:

                </li>
                <li>
                  Marital Statuses
                  <ul>
                    <li></li>
                  </ul>
                </li>

                <li>
                  Age preferences
                </li>
                <li>
                  Someone who does/doesnot want children
                </li>
                <li>
                  Is religious or of this faith
                </li>
                 <li>
                   Height preferences
                 </li>

                  <li>
                   Race dating  preferences

                  </li>

                  <li>
                  Interracial dating  preferences

                  </li>
            </ul>


          </div>
          <div class="col-lg-6">

          </div>
        </div>



  </div>
</template>

<script>
import UserProfileService from '../../middleware/services/UserProfileService'
import SendMessage from '../../components/profile/message/SendMessage'
import AddUserToBlockListButton from '../../components/profile/actions/AddUserToBlockButton'
import AddUserToFavoritesListButton from '../../components/profile/actions/AddUserToFavoriteButton'
  export default {
    components: {SendMessage, AddUserToBlockListButton, AddUserToFavoritesListButton},
    props:['userId'],
    created(){

    },
    mounted(){
      console.log(`Getting user with id ${this.userId}`);
        this.getUserDetails(this.userId);
    },
    data (){
      return {
          userReturned: {},
          messageReciever: this.userId
      }
    },
    methods: {
      async getUserDetails(userId){

        const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        const user = (await UserProfileService.getUserDetails(userId)).data;
        console.log(`User returned: ${JSON.stringify(user)}`)
        if(user.message === 'This user has prohibited you from viewing their users profile'){
            this.$router.push({path: '/blocked'})
        } else {
           this.userReturned = user.user;
        }
      },


    }
  }
</script>

<style lang="scss" scoped>

</style>
