import Vue from 'vue'
import Vuex from 'vuex'

export const state = ()=>({
  minAge: '',
  maxAge: '',
  gender: '',
  datingIntent: '',
  highestEducation: '',
  ethnicity: '',
  usState: '',
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

}

Vue.use(Vuex)
