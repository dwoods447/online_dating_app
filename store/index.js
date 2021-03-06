import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import api from '../middleware/services/api/api'
import UserServiceProfile from '../middleware/services/UserProfileService'
import AuthService from '../middleware/services/AuthService'
import cookieparser from 'cookieparser'
import eventBus from '../middleware/eventBus/index'


export const state = ()=>({
  token:  null,
  userId: null,
  error: null,
})


export const mutations = {
  setAuthTokenMutation(state, token){
    state.token = token;
  },
  clearToken (state){
    state.token = null;
    state.userId = null;
  },

  setLoggedOutTimer(state, timer){

  },
  setErrorMessageMutation(state, message){
    state.error  = '';
    state.error = message;
  },
  setLoggedInUserIdMutation(state, userId){
    let storedUser = {};
    if(typeof userId === 'string'){
      let storedUser;
      userId = JSON.parse(userId);
      storedUser = {...userId},
      state.userId = storedUser;
    }
    storedUser = {...userId};
    state.userId = storedUser;
  },
}


export const getters = {
  isAutheticated(state){
    return state.token !== null;
  },

  isPremiumUser(state){
    if(state.hasOwnProperty('isPremiumUser')){
      return state.isPremiumUser !== null;
    } else {
      return false;
    }
    
  },

  getLoggedInUser(state){
    return state.userId;
  },

  getLoggedInUsername(state){
    if(state.userId !== null){
      return state.userId.username;
    }
    return null;
  },
  isProfileCompleted(state){
    if(state.userId !== null){
      return state.userId.isProfileCompleted;
    }
  },

  hasImages(state){
    if(state.userId !== null){
       if(state.userId.images){
         if(state.userId.images.imagePaths.length > 0){
            return state.userId.images.imagePaths;
         }
       }
    }
    return false;
  }
}

export const actions = {
  nuxtServerInit (context, { req }) {
    let token = null;
    let user = null;
    let results = null;
    if(req){
      if (req.headers.cookie) {
       const parsed = cookieparser.parse(req.headers.cookie);
        if(!parsed){
          return;
        }
        try {
          token = parsed.jwt.replace(/\\/g, '').trim();
          user =  parsed.user.replace(/\\/g, '').trim();
          results =  parsed.results.replace(/\\/g, '').trim();
        } catch (err) {
          // No valid cookie found
        }
      }
    }

    context.commit('setAuthTokenMutation', token);
    context.commit('setLoggedInUserIdMutation', user);
  },
  async authenticateUserAction(context, authData){
    let token;
    let user;
    let tokenExpr;
    try{
      const res =  await api.post('/login', authData);
      if(res.data.token){
        token = res.data.token;
        tokenExpr = JSON.stringify(res.data.tokenExpiresIn);
        user = JSON.stringify(res.data.user);
        tokenExpr = (new Date().getTime()) +  (Number.parseInt(tokenExpr) * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', tokenExpr);
        localStorage.setItem('user', user);
        Cookie.set('jwt', token);
        Cookie.set('expiresDate',  tokenExpr);
        Cookie.set('user', user);
        context.commit('setAuthTokenMutation', token);
        context.commit('setLoggedInUserIdMutation', res.data.user);
        context.dispatch('setLogOutTimerAction', tokenExpr);
            //  test if  this.user.isProfileCompleted = true
            if(res.data.user.isProfileCompleted == true){
              this.$router.push({name: 'index', params: {user: res.data.user}})
            } else {
              eventBus.$emit('setActiveLink', 'isShowBasicSearch');
             this.$router.push({name: 'edituserprofile', params: {user: res.data.user}})
            }
        return res;
     }
    }catch(err){
         console.log(err);
         let errorMessage = 'Invalid username/password';
         context.commit('setErrorMessageMutation', errorMessage);
    }


  },
  setErrorMessageAction(context, message){
    context.commit('setErrorMessageMutation', message);
  },
  setAuthTokenAction(context, token){
    context.commit('setAuthTokenMutation', token);
  },
  setLoggedInUserIdAction(context, userId){
    context.commit('setLoggedInUserIdMutation', userId);
  },
  setLogOutTimerAction(context, duration){
    let hour = 60 * 60 * 1000;
     setTimeout(()=>{
        context.commit('clearToken');
        this.$router.push({name:'index'});
     }, hour);
  },
  initAuthAction(context, req){
    let token;
    let expiresDate;
    let user;
    let results;
    if(!req){
       token = localStorage.getItem("token");
       expiresDate = JSON.parse(localStorage.getItem("tokenExpiration"));
       user  = JSON.parse(localStorage.getItem("user"));
       results = JSON.parse(localStorage.getItem("results"));
    } else {
      if(req.headers.cookie){
        const parsed = cookieparser.parse(req.headers.cookie);
        if(parsed){
          if("jwt" in parsed){
            token = parsed.jwt.replace(/\\/g, '').trim();
          }
          if("user" in parsed){
            user =  parsed.user.replace(/\\/g, '').trim();
          }
          if("results" in parsed){
            results = parsed.results.replace(/\\/g, '').trim();
          }

         }

      }
    }
    if(new Date().getTime() > +expiresDate || !token){
      context.commit('clearToken');
      return;
    }

  // context.dispatch('loadUserAction', {user: user, token: token});
  context.dispatch('setLogOutTimerAction', +expiresDate  - new Date().getTime());
  context.dispatch('setAuthTokenAction', token);
  context.dispatch('setLoggedInUserIdAction', user);
  },

  async setOffLineStatus(context, userId){
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const offline = await AuthService.signOut(userId);
    return offline;
  },
  setLogOutAction(context){
    context.commit('clearToken');
    Cookie.remove('jwt');
    Cookie.remove('expiresDate');
    Cookie.remove('user');
    Cookie.remove('results');
    if(process.client){
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('user');
      localStorage.removeItem('results');
    }

  },
  async addUserUToBlockListAction(context, userId){
    const token = await UserServiceProfile.setAuthHeaderToken(context.state.token);
    const userAddedToBlockList = (await UserServiceProfile.addUserToBlockList(userId)).data;
    if(userAddedToBlockList.message === 'User added to your block list'){

    }
     return userAddedToBlockList;
  },

  async addUserToFavoritesAction(context, userId){
    const token = await UserServiceProfile.setAuthHeaderToken(context.state.token);
    const userAddedToFavoritesList = (await UserServiceProfile.addUserToFavoriteList(userId)).data;
    if(userAddedToFavoritesList.message === 'User added to favorites successfully!'){
    }
     return userAddedToFavoritesList;
  },

  async removeUserFromFavoritesAction(context, userId){
    const token = await UserServiceProfile.setAuthHeaderToken(context.state.token);
    const userRemovedFromFavoritesList = (await UserServiceProfile.removeUserFromFavoriteList(userId)).data;
     return userRemovedFromFavoritesList;
  },

  async removeFromBlockedUsersAction(context, userId){
    const token = await UserServiceProfile.setAuthHeaderToken(context.state.token);
    const userRemovedFromBlockedList = (await UserServiceProfile.removeUserFromBlockList(userId)).data;
     return userRemovedFromBlockedList;
  },




  async getUserDetailsAction(context, userId){

    let userReturned;
    const token = await UserServiceProfile.setAuthHeaderToken(context.state.token);
    const userDetails = (await UserServiceProfile.getUserDetails(userId)).data;

    if(userDetails.blocked == true){
      this.$router.push({path: '/blocked'})
      return userReturned;
    }
    return userReturned = userDetails.user;
  }

}




Vue.use(Vuex)
