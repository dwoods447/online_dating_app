import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import api from '../middleware/services/api/api'
import UserServiceProfile from '../middleware/services/UserProfileService'
import cookieparser from 'cookieparser'
Vue.use(Vuex)

const createStore = () =>{
    return new Vuex.Store({
      state: {
        token:  null,
        userId: null,
        error: null,
      },
      mutations: {
        setAuthTokenMutation(state, token){
          console.log(`setting token ${token}`)
          state.token = token;
          console.log(`Token set to:  ${state.token}`)
        },
        clearToken (state){
          state.token = null;
          state.userId = null;
        },
        setErrorMessageMutation(state, message){
          state.error  = '';
          state.error = message;
          console.log(`Setting error message to: ${message}`);
          console.log(`Set error message to: ${state.error}`);
        },
        setLoggedInUserIdMutation(state, userId){
          let storedUser = {};
          console.log(`setting user${userId}`)
          if(typeof userId === 'string'){
            let storedUser
            userId = JSON.parse(userId);
            storedUser = {...userId},
            state.userId = storedUser;
          }
          storedUser = {...userId};
          state.userId = storedUser;
          console.log(`User is an ${ typeof state.userId}`)
          console.log(`User set to ${state.userId}`)
        },
      },
      getters :{
          isAutheticated(state){
            return state.token !== null;
          },

          getLoggedInUser(state){
            return state.userId;
          },

          getLoggedInUsername(state){
            if(state.userId !== null){
              return state.userId.username;
            }
            return null;
          }
      },
      actions :{

          nuxtServerInit (context, { req }) {
            let token = null;
            let user = null;
          console.log(`nuxtServerInit running`);
            if(req){
              if (req.headers.cookie) {
               const parsed = cookieparser.parse(req.headers.cookie);
                if(!parsed){
                  return;
                }
                try {
                  token = parsed.jwt.replace(/\\/g, '').trim();
                  user =  parsed.user.replace(/\\/g, '').trim();

                } catch (err) {
                  // No valid cookie found
                  console.log(`Error parsing cookie ${err}`);
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
                console.log(`Response returned in Store ${JSON.stringify(token)}`);

                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpiration', new Date().getTime() +  Number.parseInt(tokenExpr) * 1000);
                localStorage.setItem('user', user);
                Cookie.set('jwt', token);
                Cookie.set('expiresDate', new Date().getTime() +  Number.parseInt(tokenExpr) * 1000);
                Cookie.set('user', user);
                context.commit('setAuthTokenMutation', token);
                context.commit('setLoggedInUserIdMutation', res.data.user);
                    //  test if  this.user.isProfileCompleted = true
                    if(res.data.user.isProfileCompleted !== 'true' || res.data.user.isProfileCompleted !== true){
                      console.log(`User Profile is incomplete.`)
                      // if not redirect to completed profile
                      this.$router.push({name: 'edituserprofile', params: {user: res.data.user}})
                    } else {
                       console.log(`User Profile is completed.`)
                       this.$router.push({name: 'index', params: {user: res.data.user}})
                    }
                return res;
             }
            }catch(err){
              // console.log(`Error code recieved: ${err}`);
              console.log(`Msg: ${err.message}`);
              console.log(`Status: ${err.status}`);
                 let errorMessage = 'Invalid username and password';
                 context.commit('setErrorMessageMutation', errorMessage);

            }


          },
          setErrorMessageAction(context, message){
            context.commit('setErrorMessageMutation', message);
          },
          setAuthTokenAction(context, token){
            console.log('Setting token action,' + token);
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
            if(!req){
               token = localStorage.getItem("token");
               expiresDate = JSON.parse(localStorage.getItem("tokenExpiration"));
               user  = JSON.parse(localStorage.getItem("user"));
            } else {
              if(req.headers.cookie){
                console.log(`Parsing cookies....`);
                const parsed = cookieparser.parse(req.headers.cookie);
                if(parsed){
                  console.log(`Setting parsed cookies....`);
                  token = parsed.jwt.replace(/\\/g, '').trim();
                  user =  parsed.user.replace(/\\/g, '').trim();
                 }

              }
            }
            if(new Date().getTime() > +expiresDate || !token){
              console.log(`Token has expired or doesnt exist`);
              console.log(`Token Exp value: ${new Date().getTime() > +expiresDate}`);
              console.log(`Token value: ${token}`);
              console.log(`Clearing token.....`);
              context.commit('clearToken');
              return;
            }

          // context.dispatch('loadUserAction', {user: user, token: token});
           console.log(`Resetting Token: ${token}`);
           console.log(`Resetting Exp: ${+expiresDate  - new Date().getTime()}`);
          //  context.dispatch('setLogOutTimerAction', +expiresDate  - new Date().getTime())
          console.log(`Storing or restoring user and token info`);
          context.dispatch('setAuthTokenAction', token);
          context.dispatch('setLoggedInUserIdAction', user);
          },

          async setOffLineStatus(context){
            const user = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');
            const offline = await api.post('/logout');
            console.log(`Returing offline ${JSON.stringify(offline.data)}`);
            return offline;
          },
          setLogOutAction(context){
            context.commit('clearToken');
            Cookie.remove('jwt');
            Cookie.remove('expiresDate');
            Cookie.remove('user');
            if(process.client){
              localStorage.removeItem('token');
              localStorage.removeItem('tokenExpiration');
              localStorage.removeItem('user');
            }

          },
          async addUserUToBlockListAction(context, userId){
            const token = await UserServiceProfile.setAuthHeaderToken(context.state.token);
            const userAddedToBlockList = (await UserServiceProfile.addUserToBlockList(userId)).data;
            if(userAddedToBlockList.message === 'User added to your block list'){
                console.log(userAddedToBlockList.message);
            }
             return userAddedToBlockList;
          },

          async addUserToFavoritesAction(context, userId){
            const token = await UserServiceProfile.setAuthHeaderToken(context.state.token);
            const userAddedToFavoritesList = (await UserServiceProfile.addUserToFavoriteList(userId)).data;
            if(userAddedToFavoritesList.message === 'User added to favorites successfully!'){
                console.log(userAddedToFavoritesList.message);
            }
             return userAddedToFavoritesList;
          }

      } // end of action
    })

};


export default createStore;
