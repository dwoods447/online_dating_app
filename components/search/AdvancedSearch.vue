<template>
  <div>
            <form @submit.prevent="search">
              <div class="row">
                <p class="error">{{ errorMessage }}</p>
              </div>
              <div class="row">

                  <label for="">Min Age</label>
                  <select name="minAge" class="form-control" v-model="formData.minAge">
                      <option v-for="(age , i) in rangeOfAges" :key="i+'-'+age">{{age}}</option>
                  </select>


                   <label for="">Max Age</label>
                   <select name="maxAge" id="" class="form-control" v-model="formData.maxAge">
                     <option v-for="(age , i) in rangeOfAges" :key="i+'-'+age">{{age}}</option>
                   </select>


                  <label for="">Gender</label>
                  <select name="seekingGender" id="" class="form-control" v-model="formData.gender">
                      <option v-for="gender in seekingGenders" :key="gender.key" :value="gender.value">{{gender.name}}</option>
                  </select>


                  <label for="">Dating Intent</label>
                  <select name="datingIntent" id="" class="form-control" v-model="formData.datingIntent">
                   <option v-for="(intent, i) in datingIntents" :key="'intent-'+i">{{intent.name}}</option>
                  </select>


              </div>

             <div class="row">

                  <label for="">Highest Education</label>
                  <select name="educations" id="" class="form-control" v-model="formData.education">
                      <option v-for="(education, i) in educations" :key="'education-'+i" >{{education.name}}</option>
                  </select>


                    <label for="">Ethnicity</label>
                    <select name="ethnicities" id="" class="form-control" v-model="formData.ethnicity">
                      <option v-for="(ethnicity, i) in ethnicities" :key="'ethnicity-'+i">{{ethnicity.name}}</option>
                   </select>


                     <label for="">State</label>
                      <select name="states" id="" class="form-control" v-model="formData.state">
                        <option v-for="(state, i) in states" :key="'ethnicity-'+i">{{state.name}}</option>
                   </select>


                  <label for="">Body Type</label>
                  <select name="bodyTypes" id="" class="form-control" v-model="formData.bodyType">
                   <option v-for="(bodyType, i) in bodyTypes" :key="'bodyType-'+i">{{bodyType.name}}</option>
                </select>

             </div>

                <div class="row">

                      <label for="">Zipcode</label>
                      <input type="text" name="postalCode" class="form-control" v-model="formData.postalCode">

                      <label for="">Miles</label>
                        <select name="bodyTypes" id="" class="form-control" v-model="formData.milesFrom">
                        <option v-for="(mile, i) in miles" :key="'miles-'+i">{{mile.name}}</option>
                      </select>
                </div>


              <div class="row">
                    <button class="btn btn-primary">Search</button>
              </div>

            </form>
  </div>
</template>

<script>
import StateList from '../../data/states.js'
import UserProfileService from '../../middleware/services/UserProfileService';
import eventBus from '../../middleware/eventBus/index'
import { mapActions } from 'vuex'
  export default {
    ...mapActions({
      setMinAgeInVuexStore: 'advancedsearch/setMinAgeAction',
      setMaxAgeInVuexStore: 'advancedsearch/setMaxAgeAction',
      setGenderInVuexStore: 'advancedsearch/setGenderAction',
      setDatingIntentInVuexStore: 'advancedsearch/setDatingIntentAction',
      setHighestEducationInVuexStore: 'advancedsearch/setHighestEducationAction',
      setEthnicityInVuexStore: 'advancedsearch/setEthnicityAction',
      setUsStateInVuexStore: 'advancedsearch/setUsStateAction',
      setBodyTypeInVuexStore: 'advancedsearch/setBodyTypeAction',
      setPostalCodeInVuexStore: 'advancedsearch/setPostalCodeAction',
      setDistanceInMilesInVuexStore: 'advancedsearch/setDistanceInMilesAction',
      setSearchResultsInVuexStore: 'advancedsearch/setSearchResultsAction',
      clearSearchResultsInVuexStore: 'advancedsearch/clearSearchResultsAction'
    }),
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

      }
    },
    methods: {

      async search(){
        let formSubmitData = {};
        this.errorMessage = "";
        if(this.formData.minAge) formSubmitData.minAge = this.formData.minAge;
        if(this.formData.maxAge) formSubmitData.maxAge = this.formData.maxAge;
        if(this.formData.gender) formSubmitData.gender =  this.formData.gender;
        if(this.formData.datingIntent) formSubmitData.datingIntent =  this.formData.datingIntent;
        if(this.formData.education) formSubmitData.education =  this.formData.education;
        if(this.formData.ethnicity) formSubmitData.ethnicity =  this.formData.ethnicity;
        if(this.formData.state) formSubmitData.state =  this.formData.state;
        if(this.formData.bodyType) formSubmitData.minAge =  this.formData.bodyType;
        if(this.formData.postalCode) formSubmitData.postalCode =  this.formData.postalCode.trim();
        if(this.formData.milesFrom) formSubmitData.miles =  this.formData.milesFrom;
        const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        if(this.formData.milesFrom !== '' && this.formData.postalCode !== ''){
          console.log(`Sending data: ${JSON.stringify(formSubmitData, null, 2)}`);
          const searchResults = (await UserProfileService.basicUserSearch(formSubmitData)).data;
          console.log(`Search Results ${JSON.stringify(searchResults)}`);
            if(searchResults.users.length > 0){
              eventBus.$emit('search-results', {results: searchResults.users});
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
