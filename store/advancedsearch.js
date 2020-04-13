import Vue from 'vue'
import Vuex from 'vuex'

export const state = ()=>({
  minAge: '',
  maxAge: '',
  minHeight: '',
  maxHeight: '',
  gender: '',
  datingIntent: '',
  highestEducation: '',
  ethnicity: [],
  usState: null,
  city: null,
  bodyType: '',
  postalCode: '',
  miles: '',
  results: [],
  maritalStatus: [],
  doesDrink: '',
  doesSmoke: '',
  doesDoDrugs: '',
  doesDateInteracially: '',
  raceDatingPreferences: [],
  interacialDatingPreferences: [],
  income: 0,
  religion: [],
})
export const mutations = {
  setMinAgeMutation(state, minAge){
    state.minAge = Number.parseInt(minAge);
  },
  setMaxAgeMutation(state, maxAge){
    state.maxAge = Number.parseInt(maxAge);
  },
  setMinHeightMutation(state, minHeight){
    state.minHeight = Number.parseInt(minHeight);
  },
  setMaxHeightMutation(state, maxHeight){
    state.maxHeight = Number.parseInt(maxHeight);
  },
  setGenderMutation(state,gender){
    state.gender = gender;
  },
  setDatingIntentMutation(state,datingIntent){
    state.datingIntent = datingIntent;
  },
  setHighestEducationMutation(state,highestEducation){
    state.highestEducation = highestEducation;
  },
  setEthnicityMutation(state,ethnicity){
    state.ethnicity = ethnicity;
  },
  setUsStateMutation(state,usState){
    state.usState = usState;
  },
  setBodyTypeMutation(state,bodyType){
    state.bodyType = bodyType;
  },
  setPostalCodeMutation(state,postalCode){
    state.postalCode = postalCode;
  },
  setDistanceInMilesMutation(state, miles){
    state.miles = Number.parseInt(miles.split(" "));
  },
  setSearchResultsMutation(state, results){
    let storedResults = {};
    if(typeof results === 'string'){

      let searchResutls;
       searchResutls = JSON.parse(results);
       storedResults = {...searchResutls}
       state.results = storedResults;
    }

    storedResults = {...results};
    state.userId = storedResults;
  },
  setCityMutation(state, city){
    state.city = city;
  },
  setEducationMutation(state, education){
    state.education = education;
  },
  setMaritalStatusMutation(state, maritalStatus){
    state.maritalStatus = maritalStatus;
  },
  setReligionMutation(state, religion){
    state.religion = religion;
  },
  setDoesDateInterraciallyMutation(state, date){
    state.doesDateInteracially = date;
  },
  setRaceDatingPreferencesMutation(state, race){
    state.raceDatingPreferences = race;
  },

   setDoesSmokeMutation(state, doesSmoke){
    if(doesSmoke === 'yes'){
      state.doesSmoke = true;
    } else {
      state.doesSmoke = false;
    }
   },
   setDoesDoDrugsMutation(state, doesDoDrugs){

      if(doesDoDrugs === 'yes'){
        state.doesDoDrugs = true;
      } else {
        state.doesDoDrugs = false;
      }
   },
   setDoesDrinkMutation(state, doesDrink){
    if(doesDrink === 'yes'){
      state.doesDrink = true;
    } else {
      state.doesDrink =  false;
    }
   },



  setIncomeMutation(state, income){
    state.income = 0;
    state.income += Number.parseInt(income);
  },
  setInterRacialDatingPreferencesMutation(state, race){
    state.interacialDatingPreferences = race;
  },
  clearSearchResultsMutation(state){
    state.results = [];
  }
}

export const getters = {
  getSearchResults(state){
    return state.results;
  }
}

export const actions = {
  setMinAgeAction(context, minAge){
    context.commit('setMinAgeMutation', minAge);
 },
 setMaxAgeAction(context, maxAge){
   context.commit('setMaxAgeMutation', maxAge);
 },
 setMinHeightAction(context, minHeight){
  context.commit('setMinHeightMutation', minHeight);
},
setMaxHeightAction(context, maxHeight){
 context.commit('setMaxHeightMutation', maxHeight);
},
 setGenderAction(context,gender){
   context.commit('setGenderMutation', gender);
 },
 setDatingIntentAction(context,datingIntent){
  context.commit('setDatingIntentMutation', datingIntent);
 },
 setHighestEducationAction(context,highestEducation){
   context.commit('setHighestEducationMutation', highestEducation);
 },
 setEthnicityAction(context,ethnicity){
   context.commit('setEthnicityMutation', ethnicity);
 },
 setUsStateAction(context,usState){
   context.commit('setUsStateMutation', usState);
 },
 setBodyTypeAction(context,bodyType){
  context.commit('setBodyTypeMutation', bodyType);
 },

 setDoesSmokeAction(context, doesSmoke){
  context.commit('setDoesSmokeMutation', doesSmoke);
 },
 setDoesDoDrugsAction(context, doesDoDrugs){
  context.commit('setDoesDoDrugsMutation', doesDoDrugs);
 },
 setDoesDrinkAction(context, doesDrink){
  context.commit('setDoesDrinkMutation', doesDrink);
 },




 setPostalCodeAction(context, postalCode){
   context.commit('setPostalCodeMutation', postalCode);
 },
 setDistanceInMilesAction(context, miles){
  context.commit('setDistanceInMilesMutation', miles);
 },
 setSearchResultsAction(context, results){
  context.commit('setSearchResultsMutation', results);
 },
 setCityAction(context, city){
  context.commit('setCityMutation', city);
 },
 setEducationAction(context, education){
  context.commit('setEducationMutation', education);
 },
 setMaritalStatusAction(context, maritalStatus){
  context.commit('setMaritalStatusMutation', maritalStatus);
 },
 setReligionAction(context, religion){
  context.commit('setReligionMutation', religion);
 },
 setIncomeAction(context, income){
  context.commit('setIncomeMutation', income);
 },
 setDoesDateInterraciallyAction(context, date){
  context.commit('setDoesDateInterraciallyMutation', date);
 },
 setRaceDatingPreferencesAction(context, race){
  context.commit('setRaceDatingPreferencesMutation', race);
 },
 setInterRacialDatingPreferencesAction(context, race){
  context.commit('setInterRacialDatingPreferencesMutation', race);
 },
 clearSearchResultsAction(context){
   context.commit('clearSearchResultsMutation');
 }
}

Vue.use(Vuex)
