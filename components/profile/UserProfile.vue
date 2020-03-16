<template>
<div class="container" v-if="userReturned !== null || userReturned !== {}">
  <div class="row">
    <div class="col-lg-6">
        <h3>{{ userReturned.username }}</h3>
        <h5>{{ userReturned.city }}, {{ userReturned.state }}</h5>
    </div>
    <div class="col-lg-6">
      <div class="row">
        <div class="col-lg-12">
          <div class="flex-container">
            <AddUserToFavoritesListButton :userId="userReturned._id" class="block-btn-custom"></AddUserToFavoritesListButton>
            <AddUserToBlockListButton :userId="userReturned._id" class="block-btn-custom"></AddUserToBlockListButton>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-6">
      <div class="main-image-container" v-if="renderMainImage">
        <ProfileMainImg :imageSrc="mainImgSrc" :imageIndex="mainImageIndex" :genderType="mainGenderValue" :randomType="mainRandomVal"></ProfileMainImg>
      </div>
      <div class="thumbnail-container">
        <ul class="image-thumbs" v-if="images.length > 0">
          <li v-for="(image, i) in images" :key="'preview-image'+i" @click="changeMainImage(image, userReturned.random, userReturned.gender)">
           <ProfileImgPreview :random="userReturned.random" :gender="userReturned.gender" :images="images" :imageIndex="i"></ProfileImgPreview>
          </li>
        </ul>
      </div>
      <div>
        <h4>About</h4>
        <p>urabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta. Curabitur aliquet quam id dui posuere blandit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>
      </div>
    </div>
    <div class="col-lg-6">
        <div class="profile-block">
        <div class="profile-block-header"><h4>Appearance & Personal Details</h4></div>
        <div class="profile-block-body">
          <ul>
            <li>Marital Status: <strong>{{ userReturned.martialStatus }}</strong></li>
             <li>Age: <strong>{{ userReturned.age }}</strong></li>
             <li>Hair Color: <strong>{{ userReturned.hairColor }}</strong></li>
             <li>Eye Color: <strong>{{ userReturned.eyeColor }}</strong></li>
             <li>Height: <strong>{{ userReturned.height|heightInchesToFeet}}</strong></li>
             <li>Personaility: <strong>{{ userReturned.personality}}</strong></li>

          </ul>

        </div>
      </div>
       <div class="profile-block">
        <div class="profile-block-header"><h4>Gender & Background</h4></div>
        <div class="profile-block-body">
          <ul>
             <li>Gender: <strong>{{ userReturned.gender }}</strong></li>
             <li>Ethnicity: <strong>{{ userReturned.ethnicity }}</strong></li>
             <li>Highest Education Level: <strong>{{ userReturned.highestEducation }}</strong></li>
             <li>Profession: <strong>{{ userReturned.profession}}</strong></li>
             <li>secondLanguage: <strong>{{ userReturned.secondLanguage }}</strong></li>
             <li>Do you have children?: <strong>{{ userReturned.hasChildren | booleanToResponse }}</strong></li>

          </ul>
         </div>
      </div>
      <div class="profile-block">
        <div class="profile-block-header"><h4>Location & Dating Preferences</h4></div>
        <div class="profile-block-body">
        <ul>
               <li>City: <strong>{{ userReturned.city }}</strong></li>
                <li>State: <strong>{{ userReturned.state }}</strong></li>
                <li>Zipcode: <strong>{{ userReturned.postalCode }}</strong></li>
            <li>Do you date interacially?: <strong>{{ userReturned.doesDateInteracially | booleanToResponse }}</strong></li>
           <li>Dating Intent: <strong>{{ userReturned.datingIntent }}</strong></li>
          </ul>
        </div>
      </div>
      <div class="profile-block">
        <div class="profile-block-header"><h4>Interest & Vices</h4></div>
        <div class="profile-block-body">
          <ul>
            <li>Do you do you drink?: <strong>{{ userReturned.doesDrink | booleanToResponse }}</strong></li>
            <li>Do you do you do drugs?: <strong>{{ userReturned.doesDoDrugs | booleanToResponse }}</strong></li>
             <li>Do you smoke?: <strong>{{ userReturned.doesSmoke | booleanToResponse }}</strong></li>
          </ul>
        </div>
      </div>

    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <div class="message-box">
       <SendMessage :userId="messageReciever" >Send Message</SendMessage>
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
import ProfileImgPreview from './image/ProfileImgPreview'
import ProfileMainImg from './main-profile-image/ProfileMainImg'
  export default {
    components: {SendMessage, AddUserToBlockListButton, AddUserToFavoritesListButton, ProfileImgPreview, ProfileMainImg},
    props:['user'],
    created(){
        console.log(`Getting user details...`);
        this.userReturned = this.user;
        this.images = this.user.images.imagePaths;
        console.log(`Data loaded....`);

    },
    mounted(){
        //this.getUserDetails(this.userId);
        if(this.images.length > 0){
          this.changeMainImage(this.images[0], this.userReturned.random, this.userReturned.gender)
        }else {
          this.changeMainImage('', this.userReturned.random, this.userReturned.gender)
        }


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
      },
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
      heightInchesToFeet(value){
        let feet = Math.floor(value/12);
        let inches = value%12;
        return `${feet}'${inches}`;
      }
    },
    data (){
      return {
          userReturned: {},
          messageReciever: this.user._id,
          images: [],
          mainImg: '',
          mainImgIndex: '',
          randomVal: '',
          genderVal: '',
          renderMainImage: false,
          // raceDatingPreferences:userReturned.raceDatingPreferences.races,
          // interRacialDatingPreferences: userReturned.interRacialDatingPreferences.races,
      }
    },
    computed:{
      mainImgSrc(){
        return this.mainImg;
      },
      mainImageIndex(){
        return this.mainImgIndex;
      },
      mainGenderValue(){
        return this.genderVal;
      },
      mainRandomVal(){
        return this.randomVal;
      }
    },
    methods: {
      changeMainImage(imageSrc, randomValue, genderValue){
          console.log(`Changing Image....`);
           console.log(`Main Image ${JSON.stringify(imageSrc)}`);
            console.log(`Random ${randomValue}`);
             console.log(`gender ${genderValue}`);
          this.mainImg = imageSrc.path;
        //  this.mainImgIndex = imageIndex;
          this.randomVal = randomValue;
          this.genderVal = genderValue;
          this.renderMainImage = true;
      },
      async getUserDetails(userId){

        const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        const user = (await UserProfileService.getUserDetails(userId)).data;
        if(user.blocked == true){
            this.$router.push({path: '/blocked'})
        } else {
           this.userReturned = user.user;
           this.images = user.user.images.imagePaths;

        }
      },


    }
  }
</script>

<style  scoped>
.flex-container{
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  padding: 1em;
}
.block-btn-custom{
  margin: 0.2em;
}
.flex-row{
  height:
}
.image-thumbs ul {
  margin: 0;
  padding: 0;
}

.image-thumbs li{
  display: inline-block;
}

.thumbnail-container{
  margin-top: 0.2em;
}
.profile-block{
  background: #ddd;
  border: 2px solid #333;
  border-radius: 6px;
  width: 500px;
  height: 280px;
  padding: 0;
  margin: 0.54em;
}

.profile-block-header{
  width: 100%;
  height: 60px;
  background-color: #007BFF;
  padding: 0.5em;
  color: #fff;
}

.profile-block-body{
  padding: 0.5em;
}
.message-box{
  width: 95%;
  margin: 0 auto;
}
</style>
