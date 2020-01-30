<template>
  <div style="width: 60%; margin: 0 auto;">
     <div class="row">
       <Tab></Tab>
     </div>
      <div class="row">

        <div class="col-lg-6">
         <ul>
            <li>Body Type: <strong>{{ userReturned.bodyType }}</strong></li>
            <li>Personaility: <strong>{{ userReturned.personality }}</strong></li>
            <li>Marital Status: <strong>{{ userReturned.martialStatus }}</strong></li>
            <li>Age: <strong>{{ userReturned.age }}</strong></li>
          </ul>
        </div>
        <div class="col-lg-6">
          <ul>
            <li>Gender: <strong>{{ userReturned.gender }}</strong></li>
            <li>Ethnicity: <strong>{{ userReturned.ethnicity }}</strong></li>
            <li>Hair Color: <strong>{{ userReturned.hairColor }}</strong></li>
            <li>Eye Color: <strong>{{ userReturned.eyeColor }}</strong></li>

          </ul>
        </div>

      </div>


        <div class="row">
          <div class="col-lg-6">
            <ul>
                <li>Do you have children?: <strong>{{ userReturned.hasChildren }}</strong></li>
                <li>Do you smoke?: <strong>{{ userReturned.doesSmoke | booleanToResponse }}</strong></li>
                <li>Do you do you do drugs?: <strong>{{ userReturned.doesDoDrugs | booleanToResponse }}</strong></li>
                <li>Do you do you drink?: <strong>{{ userReturned.doesDrink | booleanToResponse }}</strong></li>
            </ul>
          </div>
          <div class="col-lg-6">
             <ul>
                <li>City: <strong>{{ userReturned.postalCode }}</strong></li>
                <li>State: <strong>{{ userReturned.state }}</strong></li>
                <li>Dating Intent: <strong>{{ userReturned.datingIntent }}</strong></li>
            </ul>
          </div>
        </div>

         <div class="row">
          <div class="col-lg-6">
            <ul>
                <li>Do you date interacially?: <strong>{{ userReturned.doesDateInteracially | booleanToResponse }}</strong></li>
                <li>secondLanguage: <strong>{{ userReturned.secondLanguage }}</strong></li>
                <li>BodyType: <strong>{{ userReturned.bodyType }}</strong></li>
                <li>Height: <strong>{{ userReturned.height }}</strong></li>
                <li>Highest Education Level: <strong>{{ userReturned.highestEducation }}</strong></li>
            </ul>
          </div>
          <div class="col-lg-6">
             <ul>
                <li>Profession: <strong>{{ userReturned.profession}}</strong></li>
                <li>Personaility: <strong>{{ userReturned.personality}}</strong></li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6">
              <AddUserToBlockListButton :userId="userReturned._id"></AddUserToBlockListButton><br/>
          </div>
           <div class="col-lg-6">
              <AddUserToFavoritesListButton :userId="userReturned._id"></AddUserToFavoritesListButton>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
               <SendMessage :userId="messageReciever" >Send Message</SendMessage>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">

                  <h2>Dating Preferences</h2>
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

                  </div>
          </div>
        </div>





  </div>
</template>

<script>
import UserProfileService from '../../middleware/services/UserProfileService'
import SendMessage from '../../components/profile/message/SendMessage'
import AddUserToBlockListButton from '../../components/profile/actions/AddUserToBlockButton'
import AddUserToFavoritesListButton from '../../components/profile/actions/AddUserToFavoriteButton'
import Tab from '../../components/profile/Tab'
  export default {
    components: {SendMessage, AddUserToBlockListButton, AddUserToFavoritesListButton, Tab},
    props:['userId'],
    created(){

    },
    mounted(){
      console.log(`Getting user with id ${this.userId}`);
        this.getUserDetails(this.userId);
    },
    filters: {
      booleanToResponse(value){
        if(value == true){
          return 'Yes';
        } else if(value == false) {
          return 'No';
        } else {
          return '';
        }
      }
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
