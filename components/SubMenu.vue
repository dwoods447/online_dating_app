<template>
  <div>
      <nav class="nav nav-tabs" style="width: 45%; margin: 0 auto;">
        <li class="nav-item" @click="setActiveLink('isShowHome')">
           <!-- <a href="" class="nav-link">Inbox</a> -->
           <nuxt-link :class="[{active: isShowHome},'nav-item', 'nav-link']"  to="/" v-if="this.$store.getters.isAutheticated">Home</nuxt-link>

        </li>
        <li class="nav-item" @click="setActiveLink('isShowInbox')">
           <!-- <a href="" class="nav-link">Inbox</a> -->
           <nuxt-link :class="[{active: isShowInbox},'nav-item', 'nav-link']"  to="/inbox" v-if="this.$store.getters.isAutheticated">Inbox</nuxt-link>

        </li>
        <li class="nav-item" @click="setActiveLink('isShowPhotos')">
          <!-- <a href="" class="nav-link">Search</a> -->
           <nuxt-link :class="[{active: isShowPhotos},'nav-item', 'nav-link']"  to="/photos" v-if="this.$store.getters.isAutheticated">My Photos</nuxt-link>
        </li>
        <li class="nav-item" @click="setActiveLink('isShowSearch')">
          <!-- <a href="" class="nav-link">Search</a> -->
           <nuxt-link :class="[{active: isShowSearch},'nav-item', 'nav-link']"   to="/basicsearch" v-if="this.$store.getters.isAutheticated">Search</nuxt-link>
        </li>
        <li class="nav-item" @click="setActiveLink('isShowProfileViews')">
        <nuxt-link :class="[{active: isShowProfileViews},'nav-item', 'nav-link']"  to="/profileviews"  v-if="this.$store.getters.isAutheticated">Profile Views</nuxt-link>
        </li>
        <li class="nav-item" @click="setActiveLink('isShowFavorites')" >
          <nuxt-link  :class="[{active: isShowFavorites},'nav-item', 'nav-link']" to="/favoriteusers"  v-if="this.$store.getters.isAutheticated">Favorite Users</nuxt-link>
        </li>
        <li class="nav-item" @click="setActiveLink('isShowBlockedUsers')" >
         <nuxt-link  :class="[{active: isShowBlockedUsers},'nav-item', 'nav-link']" to="/blockedusers"  v-if="this.$store.getters.isAutheticated">Blocked Users</nuxt-link>
        </li>
      </nav>
      <section>
        <slot></slot>
      </section>
  </div>
</template>

<script>
import eventBus from '../middleware/eventBus/index'
  export default {
    creted(){
      eventBus.$on('setActiveLink', (activeChoice)=>{
          if(activeChoice === 'isShowHome'){
              this.isShowHome = true;
              this.isShowInbox = false;
              this.isShowPhotos  = false;
              this.isShowSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
          }
           if(activeChoice === 'isShowInbox'){
              this.isShowInbox = true;
              this.isShowHome  = false;
              this.isShowPhotos  = false;
              this.isShowSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
          }
           if(activeChoice === 'isShowPhotos'){
              this.isShowPhotos = true;
              this.isShowSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }
           if(activeChoice === 'isShowSearch'){
             this.isShowSearch = true;
              this.isShowPhotos = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }
           if(activeChoice === 'isShowProfileViews'){
              this.isShowProfileViews = true;
              this.isShowSearch = false;
              this.isShowPhotos = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }
           if(activeChoice === 'isShowBlockedUsers'){
              this.isShowBlockedUsers = true;
              this.isShowProfileViews = false;
              this.isShowSearch = false;
              this.isShowPhotos = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }
           if(activeChoice === 'isShowFavorites'){
              this.isShowFavorites = true;
              this.isShowBlockedUsers = false;
              this.isShowProfileViews = false;
              this.isShowSearch = false;
              this.isShowPhotos = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }


      })
    },
    data(){
      return {
        isShowHome: true,
        isShowInbox: false,
        isShowPhotos: false,
        isShowSearch: false,
        isShowProfileViews: false,
        isShowFavorites: false,
        isShowFavorites: false,
        isShowBlockedUsers: false,

      }
    },
    methods: {
      setActiveLink(activeChoice){
         if(activeChoice === 'isShowHome'){
              this.isShowHome = true;
              this.isShowInbox = false;
              this.isShowPhotos  = false;
              this.isShowSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
          }
           if(activeChoice === 'isShowInbox'){
              this.isShowInbox = true;
              this.isShowHome  = false;
              this.isShowPhotos  = false;
              this.isShowSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
          }
           if(activeChoice === 'isShowPhotos'){
              this.isShowPhotos = true;
              this.isShowSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }
           if(activeChoice === 'isShowSearch'){
             this.isShowSearch = true;
              this.isShowPhotos = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }
           if(activeChoice === 'isShowProfileViews'){
              this.isShowProfileViews = true;
              this.isShowSearch = false;
              this.isShowPhotos = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }
           if(activeChoice === 'isShowBlockedUsers'){
              this.isShowBlockedUsers = true;
              this.isShowProfileViews = false;
              this.isShowSearch = false;
              this.isShowPhotos = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }
           if(activeChoice === 'isShowFavorites'){
              this.isShowFavorites = true;
              this.isShowBlockedUsers = false;
              this.isShowProfileViews = false;
              this.isShowSearch = false;
              this.isShowPhotos = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }

      }
    }
  }
</script>

<style scoped>
 /* li.nav-item{
   margin: 14px;
 } */
</style>
