<template>
  <div>
            <form @submit.prevent="search">
              <div class="row">
                <p class="error">{{ errorMessage }}</p>
              </div>

                <h5>Filters:</h5>

                <div class="row">
                  <div class="col-md-6 col-xs-12">
                          <label for="">Min Age</label>
                  <select name="minAge" class="form-control" v-model="formData.minAge" @change="setMinAgeInVuexStore(formData.minAge)">
                      <option v-for="(age , i) in rangeOfAges" :key="i+'-'+age">{{age}}</option>
                  </select>
                  </div>
                  <div class="col-md-6 col-xs-12">
                         <label for="">Max Age</label>
                   <select name="maxAge" id="" class="form-control" v-model="formData.maxAge" @change="setMaxAgeInVuexStore(formData.maxAge)">
                     <option v-for="(age , i) in rangeOfAges" :key="i+'-'+age">{{age}}</option>
                   </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 col-xs-12">
                    <label for="">Min Height</label>
                    <select name="" id="" v-model="minHeight" class="form-control">
                      <option :value="height.value" v-for="(height, i) in heights" :key="'min-height-'+i">{{height.name}}</option>
                    </select>
                  </div>
                  <div class="col-md-6 col-xs-12">
                      <label for="">Max Height</label>
                    <select name="" id="" v-model="maxHeight" class="form-control">
                      <option :value="height.value" v-for="(height, i) in heights" :key="'max-height-'+i">{{height.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                       <!-- <label for="">Gender</label>
                  <select name="seekingGender" id="" class="form-control" v-model="formData.gender" @change="setGenderInVuexStore(formData.gender)">
                      <option v-for="gender in seekingGenders" :key="gender.key" :value="gender.value">{{gender.name}}</option>
                  </select> -->
                  <p-input  v-for="gender in seekingGenders" :key="gender.key" type="radio" name="radio" color="info" v-model="formData.gender" @change="setGenderInVuexStore(formData.gender)">{{ gender.name }}</p-input>

                  </div>
                </div>






                  <label for="">Dating Intent</label>
                  <select name="datingIntent" id="" class="form-control" v-model="formData.datingIntent" @change="setDatingIntentInVuexStore(formData.datingIntent)">
                   <option v-for="(intent, i) in datingIntents" :key="'intent-'+i">{{intent.name}}</option>
                  </select>





<!--
                  <label for="">Highest Education</label>
                  <select name="educations" id="" class="form-control" v-model="formData.education" @change="setHighestEducationInVuexStore(formData.education)">
                      <option v-for="(education, i) in educations" :key="'education-'+i" >{{education.name}}</option>
                  </select> -->


                    <label for="">Ethnicity</label>
                    <select name="ethnicities" id="" class="form-control" v-model="formData.ethnicity" @change="setEthnicityInVuexStore(formData.ethnicity)">
                      <option v-for="(ethnicity, i) in ethnicities" :key="'ethnicity-'+i">{{ethnicity.name}}</option>
                   </select>


                     <label for="">State</label>
                      <select name="states" id="" class="form-control" v-model="formData.state" @change="setUsStateInVuexStore(formData.state)">
                        <option v-for="(state, i) in states" :key="'ethnicity-'+i">{{state.name}}</option>
                   </select>


                  <label for="">Body Type</label>
                  <select name="bodyTypes" id="" class="form-control" v-model="formData.bodyType" @change="setBodyTypeInVuexStore(formData.bodyType)">
                   <option v-for="(bodyType, i) in bodyTypes" :key="'bodyType-'+i">{{bodyType.name}}</option>
                </select>




                      <label for="">Zipcode</label>
                      <input type="text" name="postalCode" class="form-control" v-model="formData.postalCode" @change="setPostalCodeInVuexStore(formData.postalCode)">


                      <label for="">Miles</label>
                        <select name="bodyTypes" id="" class="form-control" v-model="formData.milesFrom" @change="setDistanceInMilesInVuexStore(formData.milesFrom)">
                        <option v-for="(mile, i) in miles" :key="'miles-'+i">{{mile.name}}</option>
                      </select>



                    <button class="btn btn-primary">Search</button>

            </form>
  </div>
</template>

<script>
import StateList from '../../data/states.js'
import UserProfileService from '../../middleware/services/UserProfileService';
import eventBus from '../../middleware/eventBus/index'
import Cookie from 'js-cookie'
import cookieparser from 'cookieparser'
import { mapActions } from 'vuex'
  export default {
    data(){
      return {
          seekingGenders: [
            {name: 'Male', value: 'male', key: 'gender-1'},
            {name: 'Female', value: 'female', key: 'gender-2'},
            {name: 'Trans Male', value: 'trans-male', key: 'gender-3'},
            {name: 'Trans Female', value: 'trans-female', key: 'gender-4'},
          ],


          datingIntents: [
            {name: "I'm looking for Casual dating/No Commitment", value: ""},
            {name: "I want to date but nothing serious", value: ""},
            {name: "I am putting in serious effort to find someone", value: ""},
            {name: "I am serious and I want to find someone to marry", value: ""},

          ],

          educations: [
            {name: "High school", value: ""},
            {name: "Some college", value: ""},
            {name: "Some University", value: ""},
            {name: "Associates degree", value: ""},
            {name: "Bachelors degree", value: ""},
            {name: "Masters degree", value: ""},
            {name: "PhD/Post Doctoral", value: ""},
          ],

           ethnicities: [
            {name: "Black/African American", value: ""},
            {name: "White/Caucasian", value: ""},
            {name: "Hispanic", value: ""},
            {name: "Indian", value: ""},
            {name: "Middle Eastern", value: ""},
            {name: "Native American", value: ""},
            {name: "Asain", value: ""},
            {name: "Mixed Race", value: ""},
            {name: "Other", value: ""},
          ],


          states: StateList,

          miles: [
             {name: '5 miles', value: 5},
             {name: '8 miles', value: 8},
             {name: '10 miles', value: 10},
             {name: '15 miles', value: 15},
             {name: '25 miles', value: 25},
             {name: '35 miles', value: 35},
             {name: '50 miles', value: 50},
             {name: '75 miles', value: 75},
             {name: '100 miles', value: 100},
             {name: '150 miles', value: 150},
             {name: '200 miles', value: 200},

            ],




            bodyTypes: [
              {name: 'Prefer Not To Say', value: ''},
              {name: 'Thin', value: ''},
              {name: 'Athletic', value: ''},
              {name: 'Average', value: ''},
              {name: 'A Few Extra Pounds', value: ''},


            ],

            formData: {
              minAge: '18',
              maxAge: '75',
              gender: '',
              datingIntent: '',
              education :'',
              ethnicity: '',
              state: '',
              bodyType: '',
              milesFrom: '',
              postalCode: ''
            },

            errorMessage: '',

         heights: [
           {name: "4'5", value: 53, key: ""},
           {name: "4'6", value: 54, key: ""},
           {name: "4'7", value: 55, key: ""},
           {name: "4'8", value: 56, key: ""},
           {name: "4'9", value: 57, key: ""},
           {name: "4'10", value: 58, key: ""},
           {name: "4'11", value: 59, key: ""},
           {name: "5'0", value: 60, key: ""},
           {name: "5'1", value: 61, key: ""},
           {name: "5'2", value: 62, key: ""},
           {name: "5'3", value: 63, key: ""},
           {name: "5'4", value: 64, key: ""},
           {name: "5'5", value: 65, key: ""},
           {name: "5'6", value: 66, key: ""},
           {name: "5'7", value: 67, key: ""},
           {name: "5'8", value: 68, key: ""},
           {name: "5'9", value: 69, key: ""},
           {name: "5'10", value: 70, key: ""},
           {name: "5'11", value: 71, key: ""},
           {name: "6'0", value: 72, key: ""},
           {name: "6'1", value: 73, key: ""},
           {name: "6'2", value: 74, key: ""},
           {name: "6'3", value: 75, key: ""},
           {name: "6'4", value: 76, key: ""},
           {name: "6'5", value: 77, key: ""},
           {name: "6'6", value: 78, key: ""},
           {name: "6'7", value: 79, key: ""},
           {name: "6'8", value: 80, key: ""},
           {name: "6'9", value: 81, key: ""},
           {name: "7,0", value: 82, key: ""},
           {name: "7,1", value: 83, key: ""},
         ],
         minHeight: '',
         maxHeight: '',

      }
    },
    methods: {
      ...mapActions({
        setMinAgeInVuexStore: 'basicsearch/setMinAgeAction',
        setMaxAgeInVuexStore: 'basicsearch/setMaxAgeAction',
        setGenderInVuexStore: 'basicsearch/setGenderAction',
        setDatingIntentInVuexStore: 'basicsearch/setDatingIntentAction',
        setHighestEducationInVuexStore: 'basicsearch/setHighestEducationAction',
        setEthnicityInVuexStore: 'basicsearch/setEthnicityAction',
        setUsStateInVuexStore: 'basicsearch/setUsStateAction',
        setBodyTypeInVuexStore: 'basicsearch/setBodyTypeAction',
        setPostalCodeInVuexStore: 'basicsearch/setPostalCodeAction',
        setDistanceInMilesInVuexStore: 'basicsearch/setDistanceInMilesAction',
        setSearchResultsInVuexStore: 'basicsearch/setSearchResultsAction',
        clearSearchResultsInVuexStore: 'basicsearch/clearSearchResultsAction'
      }),
      async search(){
        let formSubmitData = {};
        this.errorMessage = "";
        // if(this.formData.minAge) formSubmitData.minAge = this.formData.minAge;
        // if(this.formData.maxAge) formSubmitData.maxAge = this.formData.maxAge;
        // if(this.formData.gender) formSubmitData.gender =  this.formData.gender;
        // if(this.formData.datingIntent) formSubmitData.datingIntent =  this.formData.datingIntent;
        // if(this.formData.education) formSubmitData.education =  this.formData.education;
        // if(this.formData.ethnicity) formSubmitData.ethnicity =  this.formData.ethnicity;
        // if(this.formData.state) formSubmitData.state =  this.formData.state;
        // if(this.formData.bodyType) formSubmitData.minAge =  this.formData.bodyType;
        // if(this.formData.postalCode) formSubmitData.postalCode =  this.formData.postalCode.trim();
        // if(this.formData.milesFrom) formSubmitData.miles =  this.formData.milesFrom;
        const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        if(this.formData.milesFrom !== '' && this.formData.postalCode !== ''){
          console.log(`Sending data: ${JSON.stringify(formSubmitData, null, 2)}`);
          const searchResults = (await UserProfileService.basicUserSearch(this.$store.state.basicsearch)).data;
         // console.log(`Search Results ${JSON.stringify(searchResults)}`);
            if(searchResults.users.length > 0){
              eventBus.$emit('search-results', {results: searchResults.users});
                   let resultsData = JSON.stringify(searchResults.users);
                   console.log(`Setting Cookies... ${resultsData}`);
                   localStorage.setItem('results', resultsData);
                   Cookie.set('results', resultsData);
                   Cookie.set('resultsData', 'result');
                   this.$store.dispatch('basicsearch/setSearchResultsAction' , searchResults.users);

            } else {
               this.errorMessage = "No users found matching search criteria!";
            }
         } else {
            this.errorMessage = "Please enter the zipcode and distance from zipcode in (miles).";
         }
      }

    },
    computed: {
      rangeOfAges(){
         let ages = [];
         for(let i = 18; i <= 99; i++){
           ages.push(i)
         }
         return ages;
      }
    }
  }
</script>

<style  scoped>
.error{
  color :red;
}
</style>
