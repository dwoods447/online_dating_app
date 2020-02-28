<template>
  <div>
     <h2 style="width: 250px; margin: 0 auto;">Edit Your Profile  ----</h2>
     <div style="width: 50%; margin: 0 auto;" v-if="fullImageSrc">
          Your main picture:
          <div v-if="randomVal === 'true'">
            <div v-if="chosenGender==='male'" style="max-width: 127px; max-height: 127px;">
               <img :src="fullImageSrc|maleImageSrcFilter" style="width: 100%;">
            </div>
            <div v-if="chosenGender==='female'" style="max-width: 127px; max-height: 127px;">
              <img :src="fullImageSrc|femaleImageSrcFilter" style="width: 100%;">
            </div>
             <div v-if="chosenGender==='trans-female'" style="max-width: 127px; max-height: 127px;">
              <img :src="fullImageSrc|transFemaleImageSrcFilter" style="width: 100%;">
            </div>
            <div v-if="chosenGender==='trans-male'" style="max-width: 127px; max-height: 127px;">
              <img :src="fullImageSrc|transMaleImageSrcFilter" style="width: 100%;">
            </div>
          </div>
           <div v-if="randomVal === 'false'" style="max-width: 127px; max-height: 127px;">
              <img :src="fullImageSrc|imageSrcFilter " alt="" style="width: 100%;">
           </div>
       </div>
     <div style="width: 415px; margin: 0 auto; color :red;"><p v-if="!$store.getters.isProfileCompleted">Please update your profile before proceeding!</p></div>
     <div v-if="this.$store.state.userId">
          <div v-if="this.$store.state.userId.isProfileCompleted !== true">
       <form @submit.prevent="updateExtentedUserProfile" style="width: 50%; margin: 0 auto;">
           <div class="form-group">
          <div class="row">
              <div class="col-sm-6">
              <label for="">Height</label>
              <select class="form-control"  v-model="height">
                <option v-for="(option, i) in heights" :key="'inches-'+i+'-'+option.value" :value="option.value">{{ option.name }}</option>
              </select>

          </div>
           <div class="col-sm-6">
             <label for="">Hair Color</label>
             <select class="form-control"  v-model="hairColor">
                <option v-for="(option, i) in hairColors" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
              </select>

          </div>
          </div>

        </div>
          <div class="form-group">
            <div class="row">
               <div class="col-sm-6">
              <label for="">Eye Color</label>
              <select class="form-control"  v-model="eyeColor">
                <option v-for="(option, i) in eyeColors" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
              </select>

            </div>
            <div class="col-sm-6">
               <label for="">Marital Status</label>
               <select class="form-control"  v-model="maritalStatus">
                <option v-for="(option, i) in maritalStatuses" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
              </select>

            </div>
            </div>

        </div>

          <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                  <label for="">Religion</label>
                   <select class="form-control"  v-model="religion">
                    <option v-for="(option, i) in religions" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>

                </div>
                <div class="col-sm-6">
                <label for="">Your Profession</label>
                <input type="text" v-model="profession"  class="form-control" style="border: 1px solid #000;">
                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                  <label for="">Your highest education</label>
                  <select class="form-control"  v-model="highestEducation">
                  <option v-for="(option, i) in educations" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>

                </div>
                <div class="col-sm-6">
                   <label for="">Do you smoke?</label>
                      <select class="form-control"  v-model="doesSmoke">
                      <option v-for="(option, i) in doesSmokeChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                      </select>

                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="">Do you drink?</label>
                   <select class="form-control"  v-model="doesDrink">
                      <option v-for="(option, i) in doesDrinkChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                    </select>
                </div>
                <div class="col-sm-6">
                  <label for="">Do you have children? </label>
                   <select class="form-control"  v-model="doesHaveChildren">
                      <option v-for="(option, i) in doesHaveChildrenChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                    </select>
                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="">Second Language</label>
                  <select class="form-control"  v-model="secondLanguage">
                    <option v-for="(option, i) in languages" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>
                </div>
                <div class="col-sm-6">
                   <label for="">City</label>
                   <input type="text" v-model="city"   class="form-control">
                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="">State</label>
                    <select class="form-control"  v-model="state">
                <option v-for="(option, i) in states" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
              </select>

                </div>
                <div class="col-sm-6">
                  <label for="">Zipcode</label>
                  <input type="text" v-model="postalCode"  class="form-control">
                </div>
            </div>
         </div>




           <!-- <div class="form-group">
            <div class="row">
                <div class="col-sm-6"></div>
                <div class="col-sm-6"></div>
            </div>
         </div> -->

               <h2>Dating Preferences</h2>
          <hr/>
           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                  <label for="">Do you date interracially?</label>
                  <select class="form-control"  v-model="doesDateInteracially" @change="showInterracialChoices">
                    <option v-for="(option, i) in doesDateInteraciallyChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>
               </div>
                <div class="col-sm-6">
                  <div v-if="displayInterracialChoices">
                     <label for="">Im interested in the follwing races:</label>
                            <multiselect
                            v-model="interacialDatingPreferences"
                            :options="ethnicities"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick ethnicities" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ ethnicity }"><strong>{{ ethnicity.name }}</strong></template>
                          </multiselect>
                  </div>

                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                   <label for="">Im prefer:</label>
                            <multiselect
                            v-model="selectedGenders"
                            :options="genders"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick genders" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ gender }"><strong>{{ gender.name }}</strong></template>
                    </multiselect>
                </div>
                <div class="col-sm-6">
                    <label for="">I will date someone with marital status of:</label>
                      <multiselect
                            v-model="selectedMaritalStatuses"
                            :options="maritalStatuses"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick genders" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ status }"><strong>{{ status.name }}</strong></template>
                    </multiselect>
                </div>
            </div>
         </div>



           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                   <label for="">I prefer the following races:</label>
                           <multiselect
                            v-model="raceDatingPreferences"
                            :options="ethnicities"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick ethnicities" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ ethnicity }"><strong>{{ ethnicity.name }}</strong></template>
                          </multiselect>
                </div>
                <div class="col-sm-6">

                </div>
            </div>
         </div>

         <button class="btn btn-primary">Update Your Profile </button>
       </form>
       </div>
     <div v-else>
          User has completed profile
      <form @submit.prevent="updateExtentedUserProfile" style="width: 50%; margin: 0 auto;">
        <div class="form-group">
          <div class="row">
              <div class="col-sm-6">
              <label for="">Height</label>
               <select class="form-control"  v-model="height">
                <option v-for="(option, i) in heights" :key="'option-'+i+'-'+option.name" :value="option.value">{{ option.name }}</option>
              </select>
          </div>
           <div class="col-sm-6">
             <label for="">Hair Color</label>
             <select class="form-control"  v-model="hairColor">
                <option v-for="(option, i) in hairColors" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
              </select>

          </div>
          </div>

        </div>
          <div class="form-group">
            <div class="row">
               <div class="col-sm-6">
              <label for="">Eye Color</label>
              <select class="form-control"  v-model="eyeColor">
                <option v-for="(option, i) in eyeColors" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
              </select>

            </div>
            <div class="col-sm-6">
               <label for="">Marital Status</label>
                <select class="form-control"  v-model="maritalStatus">
                <option v-for="(option, i) in maritalStatuses" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
              </select>

            </div>
            </div>

        </div>

          <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                  <label for="">Religion</label>
                  <select class="form-control"  v-model="religion">
                    <option v-for="(option, i) in religions" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>

                </div>
                <div class="col-sm-6">
                <label for="">Your Profession</label>
                <input type="text" v-model="profession"  class="form-control" style="border: 1px solid #000;">
                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                  <label for="">Your highest education</label>
                    <select class="form-control"  v-model="highestEducation">
                    <option v-for="(option, i) in educations" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>

                </div>
                <div class="col-sm-6">
                   <label for="">Do you smoke?</label>
                  <select class="form-control"  v-model="doesSmoke">
                    <option v-for="(option, i) in doesSmokeChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>

                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="">Do you drink?</label>
                    <select class="form-control"  v-model="doesDrink">
                    <option v-for="(option, i) in doesDrinkChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <label for="">Do you have children? </label>
                    <select class="form-control"  v-model="doesHaveChildren">
                    <option v-for="(option, i) in doesHaveChildrenChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>
                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="">Second Language</label>
                   <select class="form-control"  v-model="secondLanguage">
                    <option v-for="(option, i) in languages" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>
                </div>
                <div class="col-sm-6">
                   <label for="">City</label>
                   <input type="text" v-model="city"  class="form-control">
                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label for="">State</label>
                      <select class="form-control"  v-model="state">
                    <option v-for="(option, i) in states" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <label for="">Zipcode</label>
                  <input type="text" v-model="postalCode"  class="form-control">
                </div>
            </div>
         </div>

          <h2>Dating Preferences</h2>
          <hr/>
           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                  <label for="">Do you date interracially?</label>
                  <select class="form-control"  v-model="doesDateInteracially" @change="showInterracialChoices">
                    <option v-for="(option, i) in doesDateInteraciallyChoices" :key="'option-'+i+'-'+option.name">{{ option.name }}</option>
                  </select>
               </div>
                <div class="col-sm-6">
                  <div v-if="displayInterracialChoices">
                     <label for="">Im interested in:</label>
                            <multiselect
                            v-model="interacialDatingPreferences"
                            :options="ethnicities"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick ethnicities" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ ethnicity }"><strong>{{ ethnicity.name }}</strong></template>
                          </multiselect>
                  </div>

                </div>
            </div>
         </div>

           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                   <label for="">Im prefer:</label>
                            <multiselect
                            v-model="selectedGenders"
                            :options="genders"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick genders" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ gender }"><strong>{{ gender.name }}</strong></template>
                    </multiselect>
                </div>
                <div class="col-sm-6">
                    <label for="">I will date someone with marital status of:</label>
                      <multiselect
                            v-model="selectedMaritalStatuses"
                            :options="maritalStatuses"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick genders" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ status }"><strong>{{ status.name }}</strong></template>
                    </multiselect>
                </div>
            </div>
         </div>



           <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                   <label for="">Im prefer:</label>
                           <multiselect
                            v-model="raceDatingPreferences"
                            :options="ethnicities"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick ethnicities" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ ethnicity }"><strong>{{ ethnicity.name }}</strong></template>
                          </multiselect>
                </div>
                <div class="col-sm-6">

                </div>
            </div>
         </div>




         <!-- <div class="form-group">
            <div class="row">
                <div class="col-sm-6">

                </div>
                <div class="col-sm-6">

                </div>
            </div>
         </div> -->







          <button class="btn btn-primary" style="width: 100%;" :disabled="onReadySubmit">Update Your Profile </button>
      </form>
     </div>

     <br/>
     <br/>
     <div style="width: 50%; margin: 0 auto;">
            <div class="row">
            <div class="col-lg-3">
              <ImgUpload  />
            </div>
            <!-- <div class="col-lg-3">
              <ImgUpload />
            </div>
            <div class="col-lg-3">
              <ImgUpload />
            </div>
             <div class="col-lg-3">
              <ImgUpload  />
            </div> -->
     </div>
     </div>






     <!--


      <div class="form-group">
        <label class="typo__label">Select a You are Seeking Gender</label>
        <multiselect v-model="genderSeeking" deselect-label="Can't remove this value" track-by="name" label="name" placeholder="Select one" :options="seekingGenders" :searchable="false" :allow-empty="false" :multiple="true">
          <template slot="singleLabel" slot-scope="{ gender }"><strong>{{ gender.name }}</strong></template>
        </multiselect>
      </div>



      <div class="form-group">
        <label for="">Im interested in:</label>
         <multiselect
        v-model="datingIntent"
        :options="datingIntents">
        <template slot="singleLabel" slot-scope="{ intent }"><strong>{{ intent.name }}</strong></template>
      </multiselect>
      </div>





     </form>  -->
  </div>
     </div>

</template>

<script>
 import Multiselect from 'vue-multiselect'
 import states from '../../../data/states'
 import ImgUpload from '../../profile/image/ImgUpload'
 import UserProfileService from '../../../middleware/services/UserProfileService'
 import Cookie from 'js-cookie'
 import eventBus from '../../../middleware/eventBus/index'
  export default {
    props: ['userId'],
    components: { Multiselect, ImgUpload},
    mounted(){
      this.loadUserProfile(this.userId._id);
    },
    data(){
      return {
         onReadySubmit: false,
         user: null,
         agePreferences: '',
         heightPreferences: '',
         displayInterracialChoices: false,
         states: [...states],
         state: this.$store.state.userId.state,
         genderSeeking: [],
         randomVal: this.$store.state.userId.random,
         chosenGender: this.$store.state.userId.gender,
         datingIntent: this.$store.state.userId.datingIntent,
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
         maritalStatus: this.$store.state.userId.maritalStatus,
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
         hairColor: this.$store.state.userId.hairColor,
         hairColors:[
           {name: 'black', value: 'black', key: 'hairColor-black-0'},
           {name: 'brown', value: 'brown', key: 'hairColor-brown-1'},
           {name: 'blonde', value: 'blonde', key: 'hairColor-blonde-2'},
           {name: 'red', value: 'red', key: 'hairColor-red-3'},
         ],
         religion: this.$store.state.userId.religion || '',
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
         highestEducation: this.$store.state.userId.highestEducation,
         educations: [
           {name: 'High school', value: 'High school', key: 'High school-0'},
           {name: 'Some college', value: 'Some college', key: 'Some college-1'},
           {name: 'Some university', value: 'Some university', key: 'Some university-2'},
           {name: 'Associates degree', value: 'Associates degree', key: 'Associates degree-3'},
           {name: 'Bachelors', value: 'Bachelors', key: 'Bachelors-4'},
           {name: 'Masters', value: 'Masters', key: 'Masters-5'},
           {name: 'PhD/Post Doctoral', value: 'PhD/Post Doctoral', key: 'PhD/Post Doctoral-6'},
         ],
         eyeColor: this.$store.state.userId.eyeColor,
         eyeColors: [
           {name: 'brown', value: 'brown', key: 'brown-hair-0'},
           {name: 'blue', value: 'blue', key: 'blue-eyes-1'},
           {name: 'green', value: 'green', key: 'green-eyes-2'},
           {name: 'black', value: 'black', key: 'black-eyes-3'},
           {name: 'hazel', value: 'hazel', key: 'hazel-eyes-4'},
         ],
         doesSmoke: this.$store.state.userId.doesSmoke,
         doesSmokeChoices: [
           {name: 'yes', value: true, key: 'doesSmokeChoices-yes'},
           {name: 'no', value: false, key: 'doesSmokeChoices-no'},
         ],
         doesDrinkChoices: [
            {name: 'yes', value: true, key: 'doesDrinkChoices-yes'},
           {name: 'no', value: false, key: 'doesDrinkChoices-no'},
         ],
         doesDrink: this.$store.state.userId.doesDrink,
          doesDateInteraciallyChoices: [
           {name: 'yes', value: true, key: 'doesDateInteraciallyChoices-yes'},
           {name: 'no', value: false, key: 'doesDateInteraciallyChoices-no'},
         ],
         doesHaveChildrenChoices: [
           {name: 'yes', value: true, key: 'doesHaveChildrenChoices-yes'},
           {name: 'no', value: false, key: 'doesHaveChildrenChoices-no'},
         ],
         doesHaveChildren: this.$store.state.userId.doesHaveChildren,
         doesDoDrugsChoices: [
          {name: 'yes', value: true, key: 'doesDoDrugsChoices-yes'},
           {name: 'no', value: false, key: 'doesDoDrugsChoices-no'},
         ],
         doesDoDrugs : this.$store.state.userId.doesDoDrugs,
         doesHaveChildrenChoices: [
          {name: 'yes', value: true, key: 'doesHaveChildrenChoices-yes'},
           {name: 'no', value: false, key: 'doesHaveChildrenChoices-no'},
         ],
         doesHaveChildren: this.$store.state.userId.doesHaveChildren,
         postalCode: this.$store.state.userId.postalCode ||'',
         profession: this.$store.state.userId.profession || '',
         city: this.$store.state.userId.city,
         doesDateInteracially: this.$store.state.userId.doesDateInteracially,
         interacialDatingPreferences: this.$store.state.userId.interacialDatingPreferences || [],
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
         bodyType: this.$store.state.userId.bodyType ||'',
         bodyTypes: [
              {name: 'Prefer Not To Say', value: 'Prefer Not To Say'},
              {name: 'Thin', value: 'Thin'},
              {name: 'Athletic', value: 'Athletic'},
              {name: 'Average', value: 'Average'},
              {name: 'A Few Extra Pounds', value: 'A Few Extra Pounds'},
         ],
          raceDatingPreferences: this.$store.state.userId.raceDatingPreferences || [],
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

        selectedGenders: this.$store.state.userId.seekingGenders.genders || [],
        imagePaths: this.$store.state.userId.images.imagePaths || []
      }
    },
    filters: {
      imageSrcFilter(src){
        if(src){
          return 'uploads/'+ src
        }

      },
      maleImageSrcFilter(src){
        return 'random-users/men/'+ src;
      },
      femaleImageSrcFilter(src){
         return 'random-users/women/'+ src;
      },
      transMaleImageSrcFilter(src){
         return 'random-users/men/'+ src;
      },
      transFemaleImageSrcFilter(src){
        return 'random-users/women/'+ src;
      }
    },
    computed: {
      fullImageSrc(){
        if(this.$store.state.hasOwnProperty("userId") && this.$store.state.userId !== {} || this.$store.state.userId !== null){
          if(this.imagePaths.length > 0){
              return this.url = this.imagePaths[0].path;
          }
        }
        return false;
      },



    },
    methods: {

      showInterracialChoices(){
        this.interacialDatingPreferences = [];
        if(this.doesDateInteracially.toLowerCase() == 'yes'){
          this.displayInterracialChoices = true;
        } else {
          this.displayInterracialChoices = false;
        }

      },
      async loadUserProfile(userId){
        const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
          const userReturned = (await UserProfileService.getUserDetails(userId)).data;
          if(userReturned){
            this.user = userReturned;
            this.$store.dispatch('setLoggedInUserIdAction', this.user.user);

          }
      },
      // onFileSelect(event){
      //   this.selectedFile = event.target.files[0];
      //   if(this.selectedFile){
      //     //file is selected
      //   }
      // },
      // async onUpload(){
      //     let formData = new FormData();
      //     formData.append('image', this.selectedFile, this.selectedFile.name);
      //     const uploadImg = await UserProfileService.uploadImg(formData);
      // },
      async updateExtentedUserProfile(){
          this.onReadySubmit = true;
          console.log(`updating profile....`);
         let formData = {};
          if(this.genderSeeking.length > 0) formData.seekingGender = this.genderSeeking;
          if(this.datingIntent) formData.datingIntent = this.datingIntent;
          if(this.height) formData.height = this.height;
          if(this.hairColor) formData.hairColor = this.hairColor;
          if(this.eyeColor) formData.eyeColor = this.eyeColor;
          if(this.highestEducation) formData.highestEducation = this.highestEducation;
          if(this.secondLanguage) formData.secondLanguage = this.secondLanguage;
          if(this.bodyType) formData.bodyType = this.bodyType;
          if(this.postalCode) formData.postalCode = this.postalCode;
          if(this.state) formData.state = this.state;
          if(this.martialStatus) formData.martialStatus = this.martialStatus;
          if(this.hasChildren) formData.hasChildren = true;
          if(this.doesSmoke ==='true' || this.doesSmoke === true) formData.doesSmoke = true;
          if(this.doesDoDrugs ==='true'|| this.doesDoDrugs === true) formData.doesDoDrugs = true;
          if(this.doesDrink ==='true' || this.doesDrink === true) formData.doesDrink = true;
          if(this.religion) formData.religion = this.religion;
          if(this.profession) formData.profession = this.profession;
          if(this.doesHavePets ==='true' || this.doesHavePets === true) formData.doesHavePets = true;
          if(this.personality) formData.personality = this.personality;
          if(this.ambitiousness) formData.ambitiousness = this.ambitiousness;
          if(this.longestRelationShip) formData.longestRelationShip = this.longestRelationShip;
          if(this.income) formData.income = this.income;
          if(this.doesDateInteracially) formData.doesDateInteracially = this.doesDateInteracially;
          if(this.interacialDatingPreferences.length > 0) formData.interacialDatingPreferences = this.interacialDatingPreferences;
          if(this.raceDatingPreferences.length > 0) formData.raceDatingPreferences = this.raceDatingPreferences;
            formData.isProfileCompleted = true;
           const token  = await UserProfileService.setAuthHeaderToken(this.$store.state.token);
           const updated  = await UserProfileService.updateUserProfile(formData);
           let updatedUser = updated.data.user;
           if(updatedUser){
              localStorage.removeItem('user');
              Cookie.remove('user');
              localStorage.setItem('user', JSON.stringify(updatedUser));
              Cookie.set('user', JSON.stringify(updatedUser));
              await this.$store.dispatch('setLoggedInUserIdAction', updatedUser);
              eventBus.$emit('setActiveLink', 'isShowSearch');
              this.onReadySubmit = false;
              this.$router.push({name: 'basicsearch'});
           }

      },


    }
  }
</script>

<style lang="scss" scoped>

</style>
