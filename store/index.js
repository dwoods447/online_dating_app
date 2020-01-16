import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import UserService from '../middleware/services/UserProfileService'
import UserProfileService from '../middleware/services/UserProfileService'

Vue.use(Vuex)

const createStore = () =>{
    return new Vuex.Store({
      state: {
        token:  null,
        userId: null,
      },
      mutations: {
        setAuthTokenMutation(state, token){
          console.log('Setting token mutation');
          state.token = token;
          console.log('Setting token to :' + token);
          console.log('Token in state: ' + state.token);

        },
        clearToken (state){
          console.log(`Clearing Token...`);
          state.token = null;
          state.userId = null;
        },
        setLoggedInUserIdMutation(state, userId){
          console.log(`Setting logged in state to: ${JSON.stringify(userId)}`);
          state.userId = userId;
          console.log(`User in state: ${JSON.stringify(state.userId)}`);
        },
      },
      getters :{
          isAutheticated(state){
            return state.token !== null;
          },

          getLoggedInUser(state){
            return state.userId;
          }
      },
      actions :{
          async loadUserAction(context, userToken){
            let user;
            const setToken = await UserProfileService.setAuthHeaderToken(userToken.token, null, 2);
            console.log(`Token rec'vd in loadUserAction ${JSON.stringify(userToken.token, null, 2)}`);
            console.log(`Token set in header returned: ${setToken}`);
            if(setToken){
              user = await UserService.getUserDetails(userToken.user);
              console.log(`User returned from loadUserAction ${JSON.stringify(user.data.user)}`);
            }
            context.commit('setLoggedInUserIdMutation', user.data.user)
          },
          setAuthTokenAction(context, token){
            console.log('Setting token action');
            context.commit('setAuthTokenMutation', token);
          },
          setLoggedInUserIdAction(context, userId){
            console.log(`Setting logged in user: ${JSON.stringify(userId)}`);
            context.commit('setLoggedInUserIdMutation', userId);
          },
          setLogOutTimerAction(context, duration){
            console.log(`Duration re'vd: ${duration}`);
             setTimeout(()=>{
                console.log(`Timer expired`);
                context.commit('clearToken');

             }, duration)
          },
          initAuthAction(context, req){
            let token;
            let expiresDate;
            let user;
            console.log(`Re quest object value ${req}`)
            if(req){
              console.log('Running on the server');
              if(!req.headers.cookie){
                console.log(`Req.headers.cookies is not set`);
                return;
              }
              const jwtCookie = req.headers.cookie.split(';').find(c =>c.trim().startsWith("jwt="));
              if(!jwtCookie){
                 console.log(`JWT Cookie not found!`);
                 return;
              }
               token  = jwtCookie.split("=")[1];
               expiresDate = req.headers.cookie.split(';').find(c =>c.trim().startsWith("expiresDate=")).split("=")[1];
               user = req.headers.cookie.split(';').find(c =>c.replace("%", "").trim().startsWith("user=")).split("=")[1];
              console.log('user:' + JSON.stringify(user));
               console.log(`User from server: ${JSON.stringify(user)}`);
            } else {
               console.log(`Getting the token and expiration date from local storage`);
               token = localStorage.getItem("token");
               expiresDate = localStorage.getItem("tokenExpiration");
               user = JSON.parse(localStorage.getItem("user"));
               console.log(`User from localstorage: ${JSON.stringify(user)}`);
            }

            if(new Date().getTime() > +expiresDate || !token){
              console.log(`Token has expired or doesnt exist`);
              console.log(`Token Exp value: ${new Date().getTime() > +expiresDate}`);
              console.log(`Token value: ${token}`);
              console.log(`Clearing token.....`);
              context.commit('clearToken');
              return;
            }

           context.dispatch('loadUserAction', {user: user, token: token});
           console.log(`Resetting Token: ${token}`);
           console.log(`Resetting Exp: ${+expiresDate  - new Date().getTime()}`);
          //  context.dispatch('setLogOutTimerAction', +expiresDate  - new Date().getTime())
           context.dispatch('setAuthTokenAction', token);

          },

          setLogOutAction(context){
            context.commit('clearToken');
            Cookie.remove('jwt');
            Cookie.remove('expiresDate');
            Cookie.remove('user');
            Cookie.remove('userId');
            if(process.client){
              localStorage.removeItem('token');
              localStorage.removeItem('tokenExpiration');
              localStorage.removeItem('user');
              localStorage.removeItem('userId');
            }

          }

      } // end of action
    })

};


export default createStore;
