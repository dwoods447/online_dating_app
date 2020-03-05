<template>
  <div>
       <h5>Please complete your profile</h5>
       <form @submit.prevent="updateExtentedUserProfile" style="width: 75%; margin: 0 auto;">
           <div class="form-group">
          <div class="row">
              <div class="col-sm-6">
              <label for="">Height</label>
              <select class="form-control"  v-model="height" @change="setHeightInVuexStore(height)">
                <option v-for="(option, i) in heights" :key="'inches-'+i+'-'+option.value" :value="option.value">{{ option.name }}</option>
              </select>

          </div>
           <div class="col-sm-6">
             <label for="">Hair Color</label>
             <select class="form-control"  v-model="hairColor" @change="setHairColorInVuexStore(hairColor)">
                <option v-for="(option, i) in hairColors" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
              </select>

          </div>
          </div>

        </div>
          <div class="form-group">
            <div class="row">
               <div class="col-sm-6">
              <label for="">Eye Color</label>
              <select class="form-control"  v-model="eyeColor"  @change="setEyeColorInVuexStore(eyeColor)">
                <option v-for="(option, i) in eyeColors" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
              </select>

            </div>
            <div class="col-sm-6">
               <label for="">Marital Status</label>
               <select class="form-control"  v-model="maritalStatus"  @change="setMartialStatusInVuexStore(maritalStatus)">
                <option v-for="(option, i) in maritalStatuses" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
              </select>

            </div>
            </div>

        </div>

          <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                  <label for="">Religion</label>
                   <select class="form-control"  v-model="religion"  @change="setReligionInVuexStore(religion)">
                    <option v-for="(option, i) in religions" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>

                </div>
                <div class="col-sm-6">
                <label for="">Your Profession</label>
                <input type="text" v-model="profession"  class="form-control" style="border: 1px solid #000;"  @change="setProfessionInVuexStore(profession)">
                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                  <label for="">Your highest education</label>
                  <select class="form-control"  v-model="highestEducation">
                  <option v-for="(option, i) in educations" :key="'option-'+i+'-'+option.name"  @change="setEducationInVuexStore(highestEducation)">{{ option.name }}</option>
                  </select>

                </div>
                <div class="col-sm-6">
                   <label for="">Do you smoke?</label>
                      <select class="form-control"  v-model="doesSmoke" @change="setDoesSmokeInVuexStore(doesSmoke)">
                      <option v-for="(option, i) in doesSmokeChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                      </select>

                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="">Do you drink?</label>
                   <select class="form-control"  v-model="doesDrink" @change="setDoesDrinkInVuexStore(doesDrink)">
                      <option v-for="(option, i) in doesDrinkChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                    </select>
                </div>
                <div class="col-sm-6">
                  <label for="">Do you have children? </label>
                   <select class="form-control"  v-model="doesHaveChildren" @change="setDoesHaveChildrenInVuexStore(doesHaveChildren)">
                      <option v-for="(option, i) in doesHaveChildrenChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                    </select>
                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="">Second Language</label>
                  <select class="form-control"  v-model="secondLanguage" @change="setSecondLanguageInVuexStore(secondLanguage)">
                    <option v-for="(option, i) in languages" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>
                </div>
                <div class="col-sm-6">
                   <label for="">City</label>
                   <input type="text" v-model="city"   class="form-control" @change="setCityInVuexStore(city)">
                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="">State</label>
                    <select class="form-control"  v-model="state" @change="setStateInVuexStore(state)">
                <option v-for="(option, i) in states" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
              </select>

                </div>
                <div class="col-sm-6">
                  <label for="">Zipcode</label>
                  <input type="text" v-model="postalCode"  class="form-control" @change="setZipCodeInVuexStore(postalCode)">
                </div>
            </div>
         </div>




           <!-- <div class="form-group">
            <div class="row">
                <div class="col-sm-6"></div>
                <div class="col-sm-6"></div>
            </div>
         </div> -->



         <!-- <button class="btn btn-primary">Update Your Profile </button> -->
       </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    methods: {


      ...mapActions({
          setHeightInVuexStore: 'profile/setHeightAction',
          setHairColorInVuexStore: 'profile/setHairColorAction',
          setEyeColorInVuexStore: 'profile/setEyeColorAction',
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
          setDoesDateInteraciallyInVuexStore: 'profile/setDoesDateInteraciallyAction',
          setInteracialDatingPreferencesInVuexStore: 'profile/setInteracialDatingPreferencesAction',
          setRaceDatignPreferenceInVuexStore: 'profile/setRaceDatingPreferencesAction',
          setSelectedGendersInVuexStore: 'profile/setSelectedGendersAction',
          setMaritalStatusesInVuexStore: 'profile/setMaritalStatusAction',
          setCityInVuexStore: 'profile/setCityAction',
       }),

         async updateExtentedUserProfile(){

      }
    },
    data(){
      return {
         onReadySubmit: false,
         user: null,
         agePreferences: '',
         heightPreferences: '',
         displayInterracialChoices: false,
         states: [...states],
         state: '',
         genderSeeking: [],
         randomVal: this.$store.state.userId.random,
         chosenGender: '',
         datingIntent: '',
         datingIntents: [
           {name: 'I am looking for Casual dating/No Commitment', value: 'I am looking for Casual dating/No Commitment', key: 'datingIntent-0'},
           {name: 'I want to date but nothing serious', value: 'I want to date but nothing serious', key: 'datingIntent-1'},
           {name: "I am putting in serious effort to find someone", value: "I am putting in serious effort to find someone", key: 'datingIntent-2'},
           {name: 'I am putting in serious effort to find someone', value: 'I am putting in serious effort to find someone', key: 'datingIntent-3'},
         ],
         selectedMaritalStatuses: [],
         maritalStatuses: [
           {name: 'single', value: 'single', key: 'single-0'},
           {name: 'married', value: 'married', key: 'married-1'},
           {name: 'widowed', value: 'widowed', key: 'widowed-2'},
           {name: 'divorced', value: 'divorced', key: 'divorced-3'},
         ],
         maritalStatus: '',
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
         height: '',
         hairColor: '',
         hairColors:[
           {name: 'black', value: 'black', key: 'hairColor-black-0'},
           {name: 'brown', value: 'brown', key: 'hairColor-brown-1'},
           {name: 'blonde', value: 'blonde', key: 'hairColor-blonde-2'},
           {name: 'red', value: 'red', key: 'hairColor-red-3'},
         ],
         religion: '',
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
         highestEducation: '',
         educations: [
           {name: 'High school', value: 'High school', key: 'High school-0'},
           {name: 'Some college', value: 'Some college', key: 'Some college-1'},
           {name: 'Some university', value: 'Some university', key: 'Some university-2'},
           {name: 'Associates degree', value: 'Associates degree', key: 'Associates degree-3'},
           {name: 'Bachelors', value: 'Bachelors', key: 'Bachelors-4'},
           {name: 'Masters', value: 'Masters', key: 'Masters-5'},
           {name: 'PhD/Post Doctoral', value: 'PhD/Post Doctoral', key: 'PhD/Post Doctoral-6'},
         ],
         eyeColor: '',
         eyeColors: [
           {name: 'brown', value: 'brown', key: 'brown-hair-0'},
           {name: 'blue', value: 'blue', key: 'blue-eyes-1'},
           {name: 'green', value: 'green', key: 'green-eyes-2'},
           {name: 'black', value: 'black', key: 'black-eyes-3'},
           {name: 'hazel', value: 'hazel', key: 'hazel-eyes-4'},
         ],
         doesSmoke: '',
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
         postalCode: '',
         profession: '',
         city: '',
         doesDateInteracially: '',
         interacialDatingPreferences: [],
         secondLanguage: '',
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
         bodyType: '',
         bodyTypes: [
              {name: 'Prefer Not To Say', value: 'Prefer Not To Say'},
              {name: 'Thin', value: 'Thin'},
              {name: 'Athletic', value: 'Athletic'},
              {name: 'Average', value: 'Average'},
              {name: 'A Few Extra Pounds', value: 'A Few Extra Pounds'},
         ],
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

         selectedFile: '',
         url: '',
        genders: [
             { name: 'male', val: 'male', key: 'male'},
             { name: 'female', val: 'female', key: 'female'},
             { name: 'trans-male', val: 'trans-male', key: 'trans male'},
             { name: 'trans-female', val: 'trans-female', key: 'trans female'},
        ],

        selectedGenders: [],
        imagePaths: []

      }
    }
  }
</script>

<style scoped>

</style>
