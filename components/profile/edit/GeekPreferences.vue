<template>
  <div>
            <h2>Geek Preferences</h2>
            <div>

              <ul>
                <li>Strek or Star Wars?</li>
                 <li>Geeky events i like to attend? list  of categories</li>
                 <li>Geeky things i like?</li>
                 <li>Geeky things i dont like?</li>
              </ul>
            </div>
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
                            @change="setInteracialDatingPreferencesInVuexStore(interacialDatingPreferences)"
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
                            @change="setSelectedGendersInVuexStore(selectedGenders)"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick genders" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ gender }"><strong>{{ gender.name }}</strong></template>
                    </multiselect>
                </div>
                <div class="col-sm-6">
                    <label for="">I will date someone with marital status of:</label>
                      <multiselect
                            v-model="selectedMaritalStatuses"
                            :options="maritalStatuses"
                            @change="setMaritalStatusesInVuexStore(selectedMaritalStatuses)"
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
                            @change="setRaceDatignPreferenceInVuexStore(selectedMaritalStatuses)"
                            :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick ethnicities" label="name" track-by="name" :preselect-first="false">
                            <template slot="singleLabel" slot-scope="{ ethnicity }"><strong>{{ ethnicity.name }}</strong></template>
                          </multiselect>
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
         doesDateInteracially: false,
         doesDateInteraciallyChoices: false,
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
             { name: 'male', val: 'male', key: 'male'},
             { name: 'female', val: 'female', key: 'female'},
             { name: 'trans-male', val: 'trans-male', key: 'trans male'},
             { name: 'trans-female', val: 'trans-female', key: 'trans female'},
        ],

        selectedGenders: [],
        selectedMaritalStatuses: [],
        maritalStatuses: [],
      }
    },
    methods :{
       showInterracialChoices(){
        this.interacialDatingPreferences = [];
        if(this.doesDateInteracially.toLowerCase() == 'yes'){
          this.displayInterracialChoices = true;
        } else {
          this.displayInterracialChoices = false;
        }

      },

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
    }
  }
</script>

<style lang="scss" scoped>

</style>
