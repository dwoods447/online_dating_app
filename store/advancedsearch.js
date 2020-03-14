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
  ethnicity: '',
  usState: '',
  city: '',
  bodyType: '',
  postalCode: '',
  miles: '',
  results: [],
})
export const mutations = {
  setMinAgeMutation(state, minAge){
    state.minAge = minAge;
  },
  setMaxAgeMutation(state, maxAge){
    state.maxAge = maxAge;
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
    state.miles = miles;
  },
  setSearchResultsMutation(state, results){
    state.results = [];
    state.results = results;
  },
  setCityMutation(state, city){
    state.city = city;
  },
  setEducationMutation(state, education){
    state.education = education;
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
 clearSearchResultsAction(context){
   context.commit('clearSearchResultsMutation');
 }
}

Vue.use(Vuex)
