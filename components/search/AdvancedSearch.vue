<template>
  <div>
   <form @submit.prevent="search">
              <div class="row">
                <p class="error">{{ errorMessage }}</p>
              </div>


        <h5>Filters:</h5>
                <div v-if="!togglePersonalAppearanceVisibility">
                     <button @click="togglePersonalAppearance" class="btn btn-light filter-btn"><i class="fas fa-plus"></i></button>&nbsp;  <h3 class="filter-section-title">Personal Appearance</h3>
                </div>
                <div v-else>
                     <button @click="togglePersonalAppearance" class="btn btn-light filter-btn"><i class="fas fa-minus"></i></button>
                </div>
                <div class="toggle-section">
                   <VueSlideToggle :open="isPersonalApprearanceOpen">
            <div class="form-group">
              <div class="row">
                <div class="col-lg-6 col-xs-12">
                  <label for="">Min Age</label>
                   <select name="minAge" id="" class="form-control" v-model="formData.minAge" @change="setMinAgeInVuexStore(formData.minAge)">
                     <option v-for="(age , i) in rangeOfAges" :key="i+'-'+age">{{age}}</option>
                   </select>
                </div>
                 <div class="col-lg-6 col-xs-12">
                  <label for="">Max Age</label>
                   <select name="maxAge" id="" class="form-control" v-model="formData.maxAge" @change="setMaxAgeInVuexStore(formData.maxAge)">
                     <option v-for="(age , i) in rangeOfAges" :key="i+'-'+age">{{age}}</option>
                   </select>
                </div>
              </div>
            </div>

               <div class="form-group">
                    <div class="row">
                          <div class="col-md-6 col-xs-12">
                            <label for="">Min Height</label>
                            <select name="" id="" v-model="formData.minHeight" class="form-control" @change="setMinHeightInVuexStore(formData.minHeight)">
                              <option :value="height.value" v-for="(height, i) in heights" :key="'min-height-'+i">{{height.name}}</option>
                            </select>
                          </div>
                          <div class="col-md-6 col-xs-12">
                              <label for="">Max Height</label>
                            <select name="" id="" v-model="formData.maxHeight" class="form-control" @change="setMaxHeightInVuexStore(formData.maxHeight)">
                              <option :value="height.value" v-for="(height, i) in heights" :key="'max-height-'+i">{{height.name}}</option>
                            </select>
                          </div>
                          <div class="col-md-12 col-xs-12">
                          <label for="">Body Type</label>
                           <select name="bodyTypes" id="" class="form-control" v-model="formData.bodyType" @change="setBodyTypeInVuexStore(formData.bodyType)">
                              <option v-for="(bodyType, i) in bodyTypes" :key="'bodyType-'+i">{{bodyType.name}}</option>
                            </select>
                          </div>
                     </div>
                 </div>
                  </VueSlideToggle>
              </div>
            <!-- <div>
              <button @click="" class="btn btn-light filter-btn"><i class="fas fa-plus"></i></button>&nbsp; <h3 class="filter-section-title"></h3>
            </div>
            <div>
               <button @click="" class="btn btn-light filter-btn"><i class="fas fa-plus"></i></button>&nbsp; <h3 class="filter-section-title"></h3>
            </div>
            <div class="toggle-section">
               <VueSlideToggle :open="isVicesOpen" class="toggle-section">
               </VueSlideToggle>
            </div> -->

            <div v-if="!toggleVicesVisibility">
              <button @click="toggleVices" class="btn btn-light filter-btn"><i class="fas fa-plus"></i></button>&nbsp; <h3 class="filter-section-title">Vices</h3>
            </div>
            <div v-else>
               <button @click="toggleVices" class="btn btn-light filter-btn"><i class="fas fa-plus"></i></button>&nbsp; <h3 class="filter-section-title"></h3>
            </div>
            <div class="toggle-section">
               <VueSlideToggle :open="isVicesOpen" class="toggle-section">
                 <div class="row">
                   <div class="col-lg-12">
                      <label for="">Smokes</label>
                      <select class="form-control"  v-model="doesSmoke" @change="setDoesSmokeInVuexStore(doesSmoke)">
                    <option v-for="(option, i) in doesSmokeChoices" :key="'smoke-option-'+i+'-'+option.name" :value="option.name">{{ option.name }}</option>
                  </select>
                   </div>
                   <div class="col-lg-12">
                      <label for="">Drinks</label>
                       <select class="form-control"  v-model="doesDrink" @change="setDoesDrinkInVuexStore(doesDrink)">
                    <option v-for="(option, i) in doesDrinkChoices" :key="'drink-option-'+i+'-'+option.name" :value="option.name">{{ option.name }}</option>
                  </select>
                   </div>
                   <div class="col-lg-12">
                      <label for="">Does Drugs</label>
                      <select name="" id="" class="form-control" v-model="doesDoDrugs" @change="setDoesDoDrugsInVuexStore(doesDoDrugs)">
                        <option value=""></option>
                        <option v-for="(option, i) in doesDoDrugsChoices" :key="'drugs-option'+i" :value="option.name">{{option.name}}</option>
                      </select>
                   </div>


                 </div>
               </VueSlideToggle>
            </div>



               <div v-if="!toggleGenderEthnicVisibility">
                     <button @click="toggleGenderEthnicBackground" class="btn btn-light filter-btn"><i class="fas fa-plus"></i></button>&nbsp; <h3 class="filter-section-title">Gender & Ethnic Background</h3>
                </div>
                <div v-else>
                     <button @click="toggleGenderEthnicBackground" class="btn btn-light filter-btn"><i class="fas fa-minus"></i></button>
                </div>
                 <div class="toggle-section">
               <VueSlideToggle :open="isGenderEthnicOpen" class="toggle-section">

              <div class="form-group">
              <div class="row">
                <div class="col-lg-12 col-xs-12">
                  <label for="">Who's gender is</label>
                   <div style="margin-left: 30px;">
                    <p-input  v-for="gender in seekingGenders" :key="gender.key" type="radio" name="radio" color="info" v-model="formData.gender" :value="gender.value" @change="setGenderInVuexStore(gender.value)">{{ gender.name }}</p-input>
                  </div>
                </div>
                 <div class="col-lg-12 col-xs-12">
                  <label for="">Someone whose ethnicity is</label>
                  <div style="margin-left: 30px;">
                      <div v-for="(ethnicity, i) in ethnicities" :key="'ethnicity-'+i">
                            <p-check  name="check"   v-model="formData.ethnicity" @change="setEthnicityInVuexStore(formData.ethnicity)" :value="ethnicity.name">{{ethnicity.name}}</p-check>
                      </div>
                  </div>
                 </div>
                  <div class="col-lg-12 col-xs-12">
                  <label for="">Someone who prefers to date</label>
                  <div style="margin-left: 30px;">
                      <div v-for="(ethnicity, i) in ethnicities" :key="'ethnicity-'+i">
                            <p-check  name="check"   v-model="formData.raceDatingPreferences" @change="setRaceDatingPreferencesInVuexStore(formData.raceDatingPreferences)" :value="ethnicity.name">{{ethnicity.name}}</p-check>
                      </div>
                  </div>
                 </div>
                  <div class="col-lg-12 col-xs-12">
                    <label>Who dates interracially</label>
                    <select name="" id="" v-model="doesDateInteracially" class="form-control" @change="showInterracialChoices">
                      <option value=""></option>
                      <option v-for="(interracialChoice, i) in doesDateInteraciallyChoices" :key="'interracialChoice'+i">{{interracialChoice.name}}</option>
                    </select>
                  </div>
                  <div class="col-lg-12 col-xs-12" v-if="displayInterracialChoices">
                  <label for="">Who interracial preferences is</label>
                  <div style="margin-left: 30px;">
                      <div v-for="(ethnicity, i) in ethnicities" :key="'ethnicity-'+i">
                            <p-check  name="check"   v-model="formData.interacialDatingPreferences" @change="setInterRacialDatingPreferencesInVuexStore(formData.interacialDatingPreferences)" :value="ethnicity.name">{{ethnicity.name}}</p-check>
                      </div>
                  </div>
                 </div>
              </div>
            </div>
              </VueSlideToggle>
           </div>



            <div v-if="!toggleEducationDatingPreferencesVisibility">
              <button @click="toggleEducationPreferences" class="btn btn-light filter-btn"><i class="fas fa-plus"></i></button>&nbsp; <h3 class="filter-section-title">Education & Dating Preferences</h3>
            </div>
            <div v-else>
               <button @click="toggleEducationPreferences" class="btn btn-light filter-btn"><i class="fas fa-plus"></i></button>&nbsp; <h3 class="filter-section-title"></h3>
            </div>
            <div class="toggle-section">
               <VueSlideToggle :open="isEducationDatingPreferencesOpen" class="toggle-section">
                  <div class="row">
                       <div class="col-lg-12 col-xs-12">
                            <label for="">Dating Intent</label>
                            <select name="datingIntent" id="" class="form-control" v-model="formData.datingIntent" @change="setDatingIntentInVuexStore(formData.datingIntent)">
                            <option v-for="(intent, i) in datingIntents" :key="'intent-'+i">{{intent.name}}</option>
                            </select>
                        </div>

                      <div class="col-lg-12 col-xs-12">
                        <label for="">Highest Education</label>
                        <select name="educations" id="" class="form-control" v-model="formData.education" @change="setEducationInVuexStore(formData.education)">
                          <option v-for="(education, i) in educations" :key="'education-'+i" :value="education.value">{{education.name}}</option>
                        </select>
                      </div>

                        <div class="col-lg-12 col-xs-12">
                          <label for="">Someone who has children </label>
                            <select class="form-control"  v-model="doesHaveChildren" @change="setDoesHaveChildrenInVuexStore(doesHaveChildren)">
                            <option v-for="(option, i) in doesHaveChildrenChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                            </select>
                        </div>

                        <div class="col-lg-12 col-xs-12">
                           <label for="">Has a Martial Status of: </label>
                             <div style="margin-left: 30px;">
                              <div v-for="(maritalStatus, i) in maritalStatuses" :key="'ethnicity-'+i">
                                    <p-check  name="check" v-model="formData.maritalStatus" @change="setMaritalStatusInVuexStore(formData.maritalStatus)">{{maritalStatus.name}}</p-check>
                              </div>
                             </div>
                        </div>


                        <div class="col-lg-12 col-xs-12">
                          <label for="">Has an income above: </label>
                          <input type="text" v-model="formData.income" class="form-control" @change="setIncomeInVuexStore(formData.income)">
                          <p><small>Enter a whole dollar amount(NO decimals, commas, or dollar signs)</small></p>
                        </div>

                        <div class="col-lg-12 col-xs-12">
                         <label for="">Has a religion of </label>
                          <div v-for="(religion, i) in religions" :key="'religion-'+i">
                             <p-check  name="check" v-model="formData.religion" @change="setReligionInVuexStore(religion.value)" :value="formData.religion">{{religion.name}}</p-check>
                          </div>
                        </div>
                  </div>
               </VueSlideToggle>
            </div>




           <div v-if="!toggleLocationVisibility">
                     <button @click="toggleLocation" class="btn btn-light filter-btn"><i class="fas fa-plus"></i></button>&nbsp; <h3 class="filter-section-title">Location</h3>
                </div>
                <div v-else>
                     <button @click="toggleLocation" class="btn btn-light filter-btn"><i class="fas fa-minus"></i></button>
                </div>
               <div class="toggle-section">
                <VueSlideToggle :open="isLocationOpen">

                <div class="row">
                  <div class="col-lg-6 col-xs-12">
                     <label for="">City</label>
                     <input type="text" name="city" class="form-control" v-model="formData.city" @change="setCityInVuexStore(formData.city)">
                  </div>
                   <div class="col-lg-6 col-xs-12">
                      <label for="">State</label>
                      <select name="states" id="" class="form-control" v-model="formData.state" @change="setUsStateInVuexStore(formData.state)">
                        <option v-for="(state, i) in states" :key="'state-'+i">{{state.name}}</option>
                   </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-6 col-xs-12">
                       <label for=""><span class="required">*</span>Zipcode</label>
                      <input type="text" name="postalCode" class="form-control" v-model="formData.postalCode" @change="setPostalCodeInVuexStore(formData.postalCode)">

                  </div>
                   <div class="col-lg-6 col-xs-12">
                     <label for=""><span class="required">*</span>Miles</label>
                        <select name="bodyTypes" id="" class="form-control" v-model="formData.milesFrom" @change="setDistanceInMilesInVuexStore(formData.milesFrom)">
                        <option v-for="(mile, i) in miles" :key="'miles-'+i">{{mile.name}}</option>
                      </select>
                  </div>
                </div>
               </VueSlideToggle>
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
import { VueSlideToggle } from 'vue-slide-toggle'
import { mapActions } from 'vuex'
  export default {
    components: {
      VueSlideToggle
    },

    data(){
      return {
          isPersonalApprearanceOpen: false,
          isPersonalApprearanceVisible: false,
          isGenderEthnicOpen: false,
          isGenderEthnicVisible: false,
          isLocationOpen: true,
          isLocationVisible: true,
          isVicesOpen: false,
          isVicesVisible: false,
          isEducationDatingPreferencesVisible: false,
          isEducationDatingPreferencesOpen: false,
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
            {name: "High school", value: "high school"},
            {name: "Some college", value: "some college"},
            {name: "Some University", value: "some university"},
            {name: "Associates degree", value: "associates degree"},
            {name: "Bachelors degree", value: "bachelors degree"},
            {name: "Masters degree", value: "masters  degree"},
            {name: "PhD/Post Doctoral", value: "phd/post doctoral"},
          ],

           ethnicities: [
            {name: "Black/African American", value: ""},
            {name: "White/Caucasian", value: ""},
            {name: "Hispanic", value: ""},
            {name: "Indian", value: ""},
            {name: "Middle Eastern", value: ""},
            {name: "Native American", value: ""},
            {name: "Asian", value: ""},
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
         religions: [
           {name: 'Chrisitan - other', value: 'chrisitan - other', key: ''},
           {name: 'New age', value: 'new age', key: ''},
           {name: 'Muslim', value: 'muslim', key: ''},
           {name: 'Jewish', value: 'jewish', key: ''},
           {name: 'Catholic', value: 'catholic', key: ''},
           {name: 'Buddhist', value: 'buddhist', key: ''},
           {name: 'Hindu', value: 'hindu', key: ''},
           {name: 'Anglican', value: 'anglican', key: ''},
           {name: 'Sikh', value: 'sikh', key: ''},
           {name: 'Methodist', value: 'methodist', key: ''},
           {name: 'Baptist', value: 'baptist', key: ''},
           {name: 'Lutheran', value: 'lutheran', key: ''},
           {name: 'Presbyterian', value: 'presbyterian', key: ''},
           {name: 'Other', value: 'other', key: ''}
         ],
        maritalStatuses: [
           {name: 'single', value: 'single', key: 'single-0'},
           {name: 'married', value: 'married - interested in having an affair', key: 'married-1'},
           {name: 'widowed', value: 'widowed', key: 'widowed-2'},
           {name: 'divorced', value: 'divorced', key: 'divorced-3'},
         ],

          languages: [
           {name: 'Arabic', value: 'Arabic'},
           {name: 'Dutch', value: 'Dutch'},
           {name: 'Chinese', value: 'Chinese'},
           {name: 'English', value: 'English'},
           {name: 'French', value: 'French'},
           {name: 'German', value: 'German'},
           {name: 'Hebrew', value: 'Hebrew'},
           {name: 'Hindi', value: 'Hindi'},
           {name: 'Italian', value: 'Italian'},
           {name: 'Japanese', value: 'Japanese'},
           {name: 'Norwegian', value: 'Norwegian'},
           {name: 'Portguese', value: 'Portguese'},
           {name: 'Russian', value: 'Russian'},
           {name: 'Spanish', value: 'Spanish'},
           {name: 'Swedish', value: 'Swedish'},
           {name: 'Tagalog', value: 'Tagalog'},
           {name: 'Urdu', value: 'Urdu'},
           {name: 'Other', value: 'Other'},

         ],

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
              ethnicity: [],
              state: '',
              bodyType: '',
              milesFrom: '',
              postalCode: '',
              minHeight: '',
              maxHeight: '',
              city: '',
              maritalStatus: [],
              income: 0,
              raceDatingPreferences: [],
              interacialDatingPreferences: [],
              religion: [],
            },

         errorMessage: '',
         doesSmoke: '',
         doesDateInteracially: '',
         displayInterracialChoices: false,
         doesSmokeChoices: [
           {name: 'yes', value: true, key: 'doesSmokeChoices-yes'},
           {name: 'no', value: false, key: 'doesSmokeChoices-no'},
         ],
         doesDrinkChoices: [
            {name: 'yes', value: true, key: 'doesDrinkChoices-yes'},
           {name: 'no', value: false, key: 'doesDrinkChoices-no'},
         ],
         doesDrink: '',
          doesDateInteraciallyChoices: [
           {name: 'yes', value: true, key: 'doesDateInteraciallyChoices-yes'},
           {name: 'no', value: false, key: 'doesDateInteraciallyChoices-no'},
         ],
         doesHaveChildrenChoices: [
           {name: 'yes', value: true, key: 'doesHaveChildrenChoices-yes'},
           {name: 'no', value: false, key: 'doesHaveChildrenChoices-no'},
         ],
         doesHaveChildren: '',
         doesDoDrugsChoices: [
           {name: 'yes', value: true, key: 'doesDoDrugsChoices-yes'},
           {name: 'no', value: false, key: 'doesDoDrugsChoices-no'},
         ],
         doesDoDrugs : '',
         doesHaveChildrenChoices: [
          {name: 'yes', value: true, key: 'doesHaveChildrenChoices-yes'},
           {name: 'no', value: false, key: 'doesHaveChildrenChoices-no'},
         ],
         doesHaveChildren: '',

      }
    },
    methods: {
      ...mapActions({
      setMinAgeInVuexStore: 'advancedsearch/setMinAgeAction',
      setMaxAgeInVuexStore: 'advancedsearch/setMaxAgeAction',
      setMinHeightInVuexStore: 'advancedsearch/setMinHeightAction',
      setMaxHeightInVuexStore: 'advancedsearch/setMaxHeightAction',
      setGenderInVuexStore: 'advancedsearch/setGenderAction',
      setMaritalStatusInVuexStore: 'advancedsearch/setMaritalStatusAction',
      setDatingIntentInVuexStore: 'advancedsearch/setDatingIntentAction',
      setHighestEducationInVuexStore: 'advancedsearch/setHighestEducationAction',
      setIncomeInVuexStore: 'advancedsearch/setIncomeAction',
      setReligionInVuexStore: 'advancedsearch/setReligionAction',
      setEthnicityInVuexStore: 'advancedsearch/setEthnicityAction',

      setDoesDoDrugsInVuexStore: 'advancedsearch/setDoesDoDrugsAction',
      setDoesDrinkInVuexStore: 'advancedsearch/setDoesDrinkAction',
      setDoesSmokeInVuexStore: 'advancedsearch/setDoesSmokeAction',

      setUsStateInVuexStore: 'advancedsearch/setUsStateAction',
      setBodyTypeInVuexStore: 'advancedsearch/setBodyTypeAction',
      setCityInVuexStore: 'advancedsearch/setCityAction',
      setEducationInVuexStore: 'advancedsearch/setEducationAction',
      setPostalCodeInVuexStore: 'advancedsearch/setPostalCodeAction',
      setDistanceInMilesInVuexStore: 'advancedsearch/setDistanceInMilesAction',
      setSearchResultsInVuexStore: 'advancedsearch/setSearchResultsAction',
      clearSearchResultsInVuexStore: 'advancedsearch/clearSearchResultsAction',
      setRaceDatingPreferencesInVuexStore: 'advancedsearch/setRaceDatingPreferencesAction',
      setInterRacialDatingPreferencesInVuexStore: 'advancedsearch/setInterRacialDatingPreferencesAction',
    }),
      togglePersonalAppearance(){
          this.isPersonalApprearanceOpen = !this.isPersonalApprearanceOpen;
          this.isPersonalApprearanceVisible = !this.isPersonalApprearanceVisible;
      },
      toggleGenderEthnicBackground(){
          this.isGenderEthnicOpen = !this.isGenderEthnicOpen;
          this.isGenderEthnicVisible = !this.isGenderEthnicVisible;
      },
      toggleLocation(){
         this.isLocationOpen = !this.isLocationOpen;
         this.isLocationVisible = !this.isLocationVisible;
      },
      toggleVices(){
        this.isVicesOpen = !this.isVicesOpen;
        this.isVicesVisible = !this.isVicesVisible;
      },
      toggleEducationPreferences(){
        this.isEducationDatingPreferencesVisible = !this.isEducationDatingPreferencesVisible;
        this.isEducationDatingPreferencesOpen = !this.isEducationDatingPreferencesOpen;
      },
      showInterracialChoices(){
        this.interacialDatingPreferences = [];
        if(this.doesDateInteracially.toLowerCase() == 'yes'){
          this.displayInterracialChoices = true;
          this.$store.dispatch('advancedsearch/setDoesDateInterraciallyAction', true);
        } else if(this.doesDateInteracially.toLowerCase() == 'no') {
          this.displayInterracialChoices = false;
          this.$store.dispatch('advancedsearch/setDoesDateInterraciallyAction', false);
        } else {
           this.$store.dispatch('advancedsearch/setDoesDateInterraciallyAction', null);
        }

      },
      async search(){
        let formSubmitData = {};
        this.errorMessage = "";
        const token = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
        if(this.formData.milesFrom !== '' && this.formData.postalCode !== ''){
          const searchResults = (await UserProfileService.advancedUserSearch(this.$store.state.advancedsearch)).data;
            if(searchResults.users.length > 0){
              eventBus.$emit('search-results', {results: searchResults.users});
            } else {
               this.errorMessage = "No users found matching search criteria!";
            }
         } else {
            this.errorMessage = "Please enter the zipcode and distance from zipcode in (miles).";
         }
      },

    },

    computed: {
      rangeOfAges(){
         let ages = [];
         for(let i = 18; i <= 99; i++){
           ages.push(i)
         }
         return ages;
      },
      togglePersonalAppearanceVisibility(){
        return this.isPersonalApprearanceVisible;
      },
      toggleGenderEthnicVisibility(){
        return this.isGenderEthnicVisible;
      },
      toggleLocationVisibility(){
        return this.isLocationVisible;
      },
      toggleVicesVisibility(){
        return this.isVicesVisible;
      },
      toggleEducationDatingPreferencesVisibility(){
        return this.isEducationDatingPreferencesVisible;
      }
    }
  }
</script>

<style  scoped>
.error, .required{
  color :red;
}
.toggle-section{
  margin: 0.3em;
  /*padding: 0.3em;*/
}
.filter-section-title{
   display: inline-block;
   color: #1E2341;
   font-weight: 600;
}

.filter-btn{
  display: inline-block;
}

@media all and (min-width: 1024px) and (max-width: 1366px) {
  .filter-section-title{
    font-size: 1.1em;
  }
}
</style>
