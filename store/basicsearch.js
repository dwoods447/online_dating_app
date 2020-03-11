import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import cookieparser from 'cookieparser'
import createPersistedState from 'vuex-persistedstate'
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
    state.minAge = Number.parseInt(minAge);
  },
  setMaxAgeMutation(state, maxAge){
    state.maxAge = Number.parseInt(maxAge);
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
    state.postalCode = postalCode.trim();
  },
  setDistanceInMilesMutation(state, miles){
    state.miles = Number.parseInt(miles.split(" "));
  },
  setSearchResultsMutation(state, results){
    let resultsFromLocal = results;
    if(process.client){
      resultsFromLocal = localStorage.getItem("results");

    }
    state.results = resultsFromLocal;
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
  nuxtServerInit (context, { req }) {
    console.log(`Nuxt Sever init runnig in basicsearch.js`)
    let results = null;
    if(req){
      if (req.headers.cookie) {
       const parsed = cookieparser.parse(req.headers.cookie);
        if(!parsed){
          return;
        }
        try {
          results =  parsed.results.replace(/\\/g, '').trim();
        } catch (err) {
          // No valid cookie found
        }
      }
    }
    console.log(`Setting search results... ${JSON.stringify(results)}`)
    context.commit('setSearchResultsMutation', results);
  },
  setMinAgeAction(context, minAge){
    context.commit('setMinAgeMutation', minAge);
 },
 setMaxAgeAction(context, maxAge){
   context.commit('setMaxAgeMutation', maxAge);
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
 clearSearchResultsAction(context){
   context.commit('clearSearchResultsMutation');
 }
}



// export const plugins = [
//   createPersistedState({
//     storage: {
//       getItem: key => Cookies.get(key),
//       // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
//       setItem: (key, value) =>
//         Cookies.set(key, value, { expires: 3, secure: true }),
//       removeItem: key => Cookies.remove(key)
//     }
//   })
// ]
Vue.use(Vuex)
