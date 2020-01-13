<template>
  <div>
            <form action="">
              <div class="row">
                <div class="col-sm-3">
                  <select name="minAge" class="form-control" v-model="formData.minAge">
                      <option v-for="(age , i) in rangeOfAges" :key="i+'-'+age">{{age}}</option>
                  </select>
                </div>
                <div class="col-sm-3">
                   <select name="maxAge" id="" class="form-control" v-model="formData.maxAge">
                     <option v-for="(age , i) in rangeOfAges" :key="i+'-'+age">{{age}}</option>
                   </select>
                </div>
                <div class="col-sm-3">
                  <select name="seekingGender" id="" class="form-control" v-model="formData.gender">
                      <option v-for="gender in seekingGenders" :key="gender.key">{{gender.name}}</option>
                  </select>
                </div>
                <div class="col-sm-3">
                  <select name="datingIntent" id="" class="form-control" v-model="formData.datingIntent">
                   <option v-for="(intent, i) in datingIntents" :key="'intent-'+i">{{intent.name}}</option>
                  </select>
                </div>

              </div>

             <div class="row">
               <div class="col-sm-3">
                  <select name="educations" id="" class="form-control" v-model="formData.education">
                      <option v-for="(education, i) in educations" :key="'education-'+i" >{{education.name}}</option>
                  </select>
               </div>
                <div class="col-sm-3">
                    <select name="ethnicities" id="" class="form-control" v-model="formData.ethnicity">
                      <option v-for="(ethnicity, i) in ethnicities" :key="'ethnicity-'+i">{{ethnicity.name}}</option>
                   </select>
               </div>
                <div class="col-sm-3">
                      <select name="states" id="" class="form-control" v-model="formData.state">
                        <option v-for="(state, i) in states" :key="'ethnicity-'+i">{{state.name}}-{{state.abbreviation}}</option>
                   </select>
               </div>
                <div class="col-sm-3">
                  <select name="bodyTypes" id="" class="form-control" v-model="formData.bodyType">
                   <option v-for="(bodyType, i) in bodyTypes" :key="'bodyType-'+i">{{bodyType.name}}</option>
                </select>
               </div>
             </div>

            </form>
  </div>
</template>

<script>
import StateList from '../../data/states.js'
  export default {
    data(){
      return {
          seekingGenders: [
            {name: 'Male', value: '', key: 'gender-1'},
            {name: 'Female', value: '', key: 'gender-2'},
            {name: 'Trans Male', value: '', key: 'gender-3'},
            {name: 'Trans Female', value: '', key: 'gender-4'},
          ],


          datingIntents: [
            {name: "I'm looking for Casual dating/No Commitment", value: ""},
            {name: "I want to date but nothing serious.", value: ""},
            {name: "I want to date but nothing serious.", value: ""},
            {name: "I am putting in serious effort to find someone.", value: ""},
            {name: "I am serious and I want to find someone to marry.", value: ""},
          ],

          educations: [
            {name: "High school", value: ""},
            {name: "Some college", value: ""},
            {name: "Some University", value: ""},
            {name: "Associates degree", value: ""},
            {name: "Bachelors degree", value: ""},
            {name: "Masters degree", value: ""},
            {name: "PhD / Post Doctoral", value: ""},
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
              {name: 'A Few Extra Pounds', value: ''},


            ],

            formData: {
              minAge: '18',
              maxAge: '75',
              gender: 'Female',
              datingIntent: 'I want to date but nothing serious.',
              education :'High school',
              ethnicity: '',
              state: 'Texas-TX',
              bodyType: '',
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

<style lang="scss" scoped>

</style>
