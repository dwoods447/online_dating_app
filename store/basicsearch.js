import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import cookieparser from 'cookieparser'
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
    state.postalCode = postalCode.trim();
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
    context.commit('setSearchResultsMutation', results);
  },
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
 setSearchResultsAction(context){
   if(process.client){
    let resultData = localStorage.getItem("results");
    let results = JSON.parse(resultData)
    context.commit('setSearchResultsMutation', results);
   }
 },
 clearSearchResultsAction(context){
   context.commit('clearSearchResultsMutation');
 },
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
