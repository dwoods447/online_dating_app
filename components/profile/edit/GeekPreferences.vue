<template>
  <div>

            <div style="width:50%; margin: 0 auto;">
              <input type="text" v-model="interest" placeholder="Enter an interest"  class="form-control" style="width:35%; display: inline-block;"><button @click="addInterest" class="btn btn-primary" style="display: inline-block; margin-left: 2px; margin-top: -4px;">Add Interest</button>

              <br/>
              <ul v-if="geekInterestArray.length > 0" style="list-style-type: none;">
                <li v-for="(interest, i) in geekInterestArray" :key="'geek-interest'+i">{{interest}}&nbsp;&nbsp;<button  class="btn btn-light"  @click="removeGeekInterest(interest, i)"><i class="far fa-times-circle"></i></button></li>
              </ul>
            </div>
          <hr/>
           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                  <label for="">Do you date interracially?</label>
                  <select class="form-control"  v-model="doesDateInteracially" @change="showInterracialChoices">
                    <option v-for="(option, i) in doesDateInteraciallyChoices" :key="'option-'+i+'-'+option.name" :value="option.name">{{ option.name }}</option>
                  </select>
               </div>
                <div class="col-sm-6">
                  <div v-if="displayInterracialChoices">
                     <label for="">Im interested in the follwing races:</label>
                            <!-- <multiselect
                            v-model="interacialDatingPreferences"
                            :options="ethnicities"
                            @change="setInteracialDatingPreferencesInVuexStore(interacialDatingPreferences)"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick ethnicities" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ ethnicity }"><strong>{{ ethnicity.name }}</strong></template>
                          </multiselect> -->
                           <div v-for="(ethnicity, i) in ethnicities" :key="'interRacialDating-'+i">
                             <p-check  name="check" v-model="interacialDatingPreferences" @change="setInteracialDatingPreferencesInVuexStore(interacialDatingPreferences)" :value="ethnicity.value">{{ethnicity.name}}</p-check>
                          </div>
                  </div>

                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                   <label for="">Im prefer:</label>
                            <!-- <multiselect
                            v-model="selectedGenders"
                            :options="genders"
                            @change="setSelectedGendersInVuexStore(selectedGenders)"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick genders" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ gender }"><strong>{{ gender.name }}</strong></template>
                    </multiselect> -->

                    <div v-for="(gender, i) in genders" :key="'selectedGenders-'+i">
                             <!-- <p-check  name="check" v-model="selectedGenders" @change="setSelectedGendersInVuexStore(selectedGenders)" :value="gender.value">{{gender.name}}</p-check> -->
                               <p-check  name="check" v-model="selectedGenders" @change="setSelectedGendersInVuexStore(selectedGenders)" :value="gender.value">{{gender.name}}</p-check>
                     </div>
                </div>
                <div class="col-sm-6">
                    <label for="">I will date someone with marital status of:</label>
                      <!-- <multiselect
                            v-model="selectedMaritalStatuses"
                            :options="maritalStatuses"
                            @change="setMaritalStatusesInVuexStore(selectedMaritalStatuses)"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick genders" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ status }"><strong>{{ status.name }}</strong></template>
                    </multiselect> -->

                    <div v-for="(maritalStatus, i) in maritalStatuses" :key="'maritalStatus-'+i">
                             <p-check  name="check" v-model="selectedMaritalStatuses" @change="setMaritalStatusesInVuexStore(selectedMaritalStatuses)" :value="maritalStatus.value">{{maritalStatus.name}}</p-check>
                     </div>
                </div>
            </div>
         </div>



           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                   <label for="">I prefer the following races:</label>
                           <!-- <multiselect
                            v-model="raceDatingPreferences"
                            :options="ethnicities"
                            @change="setRaceDatignPreferenceInVuexStore(selectedMaritalStatuses)"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick ethnicities" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ ethnicity }"><strong>{{ ethnicity.name }}</strong></template>
                          </multiselect> -->
                            <div v-for="(ethnicity, i) in ethnicities" :key="'raceDating-'+i">
                             <p-check  name="check" v-model="raceDatingPreferences" @change="setRaceDatignPreferenceInVuexStore(raceDatingPreferences)" :value="ethnicity.value">{{ethnicity.name}}</p-check>
                           </div>
                </div>
                <div class="col-sm-6">

                </div>
            </div>
         </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Multiselect from 'vue-multiselect'
  export default {
    components: { Multiselect,},
    data(){
      return {
          interest: '',
          geekInterest: [],
          interacialDatingPreferences: [],
          doesDateInteracially: false,
          doesDateInteraciallyChoices: [
            {name: 'yes', value: true,},
            {name: 'no', value: false,},
          ],
          displayInterracialChoices: false,
          raceDatingPreferences: [],
           ethnicities: [
            {name: 'White/Caucasian', value: 'White/Caucasian', key: 'White/Caucasian'},
            {name: 'Black/African American', value: 'Black/African American', key: 'Black/African American'},
            {name: 'Native American', value: 'Native American', key: 'Native American'},
            {name: 'Hispanic', value: 'Hispanic', key: 'Hispanic'},
            {name: 'Indian', value: 'Indian', key: 'Indian'},
            {name: 'Middle Eastern', value: 'Middle Eastern', key: 'Middle Eastern'},
            {name: 'Asian', value: 'Asian', key: 'Asian'},
            {name: 'Mixed Race', value: 'Mixed Race', key: 'Mixed Race'},
            {name: 'Other', value: 'Other', key: 'Other'},
          ],
            genders: [
             { name: 'male', value: 'male', key: 'male'},
             { name: 'female', value: 'female', key: 'female'},
             { name: 'trans-male', value: 'trans-male', key: 'trans male'},
             { name: 'trans-female', value: 'trans-female', key: 'trans female'},
        ],

        selectedGenders: [

        ],
        selectedMaritalStatuses: [],
        maritalStatuses: [
           {name: 'single', value: 'single', key: 'single-0'},
           {name: 'married', value: 'married - interested in having an affair', key: 'married-1'},
           {name: 'widowed', value: 'widowed', key: 'widowed-2'},
           {name: 'divorced', value: 'divorced', key: 'divorced-3'},
        ],
      }
    },
    computed: {
      geekInterestArray(){
        return this.geekInterest;
      }
    },
    methods :{
        removeGeekInterest(interest, i){

          let interestObj = {
            interest: interest,
            index: i,
          }
            if(this.geekInterest.indexOf(interest) !== -1){
                //console.log(`Removing ${interest} at index ${i}`)
                this.geekInterest.splice(i, 1)
                this.$store.dispatch('profile/removeGeekInterestsAction', interestObj);
            }
        },
        addInterest(e){
             e.preventDefault();
             this.geekInterest.push(this.interest);
             this.$store.dispatch('profile/setGeekInterestsAction', this.interest);
             this.interest = '';

        },
       showInterracialChoices(){
        this.interacialDatingPreferences = [];
        if(this.doesDateInteracially.toLowerCase() == 'yes'){
          this.displayInterracialChoices = true;
          this.$store.dispatch('profile/setDoesDateInteraciallyAction',  this.displayInterracialChoices);
        } else {
          this.displayInterracialChoices = false;
          this.$store.dispatch('profile/setDoesDateInteraciallyAction',  this.displayInterracialChoices);
        }

      },

        ...mapActions({
          setHeightInVuexStore: 'profile/setHeightAction',
          setHairColorInVuexStore: 'profile/setHairColorAction',
          setEyeColorInVuexStore: 'profile/setEyeColorAction',
        //  setGeekInterestInVuexStore: 'profile/setGeekInterestsAction',
          setMartialStatusInVuexStore: 'profile/setMaritalStatusAction',
          setReligionInVuexStore: 'profile/setReligionAction',
          setProfessionInVuexStore: 'profile/setProfessionAction',
          setEducationInVuexStore: 'profile/setEducationAction',
          setDoesSmokeInVuexStore: 'profile/setDoesSmokeAction',
          setDoesDrinkInVuexStore: 'profile/setDoesDrinkAction',
          setDoesHaveChildrenInVuexStore: 'profile/setDoesHaveChildrenAction',
          setSecondLanguageInVuexStore: 'profile/setSecondLanguageAction',
          setStateInVuexStore: 'profile/setUsStateAction',
          setZipCodeInVuexStore: 'profile/setPostalCodeAction',
         // setDoesDateInteraciallyInVuexStore: 'profile/setDoesDateInteraciallyAction',
          setInteracialDatingPreferencesInVuexStore: 'profile/setInteracialDatingPreferencesAction',
          setRaceDatignPreferenceInVuexStore: 'profile/setRaceDatingPreferencesAction',
          setSelectedGendersInVuexStore: 'profile/setSelectedGendersAction',
          setMaritalStatusesInVuexStore: 'profile/setSelectedMaritalStatusesAction',
          setCityInVuexStore: 'profile/setCityAction',
       }),
    }
  }
</script>

<style scoped>

</style>
