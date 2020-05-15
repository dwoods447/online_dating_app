<template>
  <div class="sub-menu">
      <nav class="nav nav-tabs">
        <li class="nav-item" @click="setActiveLink('isShowHome')">
           <nuxt-link :class="[{active: isShowHome},'nav-item', 'nav-link']"  to="/" v-if="this.$store.getters.isAutheticated">Home</nuxt-link>
        </li>
        <li class="nav-item" @click="setActiveLink('isShowInbox')">
           <nuxt-link :class="[{active: isShowInbox},'nav-item', 'nav-link']"  to="/inbox" v-if="this.$store.getters.isAutheticated">Inbox</nuxt-link>
        </li>
        <li class="nav-item" @click="setActiveLink('isShowPhotos')">
           <nuxt-link :class="[{active: isShowPhotos},'nav-item', 'nav-link']"  to="/photos" v-if="this.$store.getters.isAutheticated">My Photos</nuxt-link>
        </li>
        <li class="nav-item" @click="setActiveLink('isShowBasicSearch')">
          <!-- <a href="" class="nav-link">Search</a> -->
           <nuxt-link :class="[{active: isShowBasicSearch},'nav-item', 'nav-link']"   to="/basicsearch" v-if="this.$store.getters.isAutheticated">Basic Search</nuxt-link>
        </li>
        <li class="nav-item" @click="setActiveLink('isShowAdvancedSearch')" v-if="this.$store.getters.isPremiumUser">
          <!-- <a href="javascript:void(0)" class="nav-item nav-link">Advanced Search</a> -->
          <nuxt-link :class="[{active: isShowAdvancedSearch},'nav-item', 'nav-link']" to="/advancedsearch" v-if="this.$store.getters.isAutheticated">Advanced Search</nuxt-link>
        </li>
         <li class="nav-item" @click="setActiveLink('isShowMatchMaker')" v-if="this.$store.getters.isPremiumUser">
          <nuxt-link  :class="[{active: isShowMatchMaker},'nav-item', 'nav-link']" to="/matchmaker"  v-if="this.$store.getters.isAutheticated">Try MatchMaker</nuxt-link>
        </li>
        <li class="nav-item" @click="setActiveLink('isShowProfileViews')" v-if="this.$store.getters.isPremiumUser">
        <nuxt-link :class="[{active: isShowProfileViews},'nav-item', 'nav-link']"  to="/profileviews"  v-if="this.$store.getters.isAutheticated">Who's viewed your profile</nuxt-link>
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
    created(){
      eventBus.$on('setActiveLink', (activeChoice)=>{
          if(activeChoice === 'isShowHome'){
              this.isShowHome = true;
              this.isShowInbox = false;
              this.isShowPhotos  = false;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowMatchMaker = false;
          }
           if(activeChoice === 'isShowInbox'){
              this.isShowInbox = true;
              this.isShowHome  = false;
              this.isShowPhotos  = false;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowMatchMaker = false;
          }
           if(activeChoice === 'isShowPhotos'){
              this.isShowPhotos = true;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
              this.isShowMatchMaker = false;
          }
           if(activeChoice === 'isShowBasicSearch'){
              this.isShowBasicSearch  = true;
              this.isShowAdvancedSearch  = false;
              this.isShowPhotos = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
              this.isShowMatchMaker = false;
          }
           if(activeChoice === 'isShowAdvancedSearch'){
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = true;
              this.isShowPhotos = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
              this.isShowMatchMaker = false;
          }
           if(activeChoice === 'isShowProfileViews'){
              this.isShowProfileViews = true;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowPhotos = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
              this.isShowMatchMaker = false;
          }
           if(activeChoice === 'isShowBlockedUsers'){
              this.isShowBlockedUsers = true;
              this.isShowProfileViews = false;
               this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowPhotos = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
              this.isShowMatchMaker = false;
          }
           if(activeChoice === 'isShowFavorites'){
              this.isShowFavorites = true;
              this.isShowBlockedUsers = false;
              this.isShowProfileViews = false;
               this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowPhotos = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
              this.isShowMatchMaker = false;
          }

          if(activeChoice === 'isAvancedSearch'){
              this.isShowFavorites = false;
              this.isShowBlockedUsers = false;
              this.isShowProfileViews = false;
               this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowPhotos = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
              this.isAvancedSearch = true;
              this.isShowMatchMaker = false;
          }

          
          if(activeChoice === 'isShowMatchMaker'){
              this.isShowFavorites = false;
              this.isShowBlockedUsers = false;
              this.isShowProfileViews = false;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowPhotos = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
              this.isAvancedSearch = false;
              this.isShowMatchMaker = true;
          }


      })
    },
    data(){
      return {
        isShowHome: true,
        isShowInbox: false,
        isShowPhotos: false,
        isShowBasicSearch: false,
        isShowAdvancedSearch: false,
        isShowProfileViews: false,
        isShowFavorites: false,
        isShowFavorites: false,
        isShowBlockedUsers: false,
        isAvancedSearch: false,
        isShowMatchMaker: false,

      }
    },
    methods: {
      setActiveLink(activeChoice){
         if(activeChoice === 'isShowHome'){
              this.isShowHome = true;
              this.isShowInbox = false;
              this.isShowPhotos  = false;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
          }
           if(activeChoice === 'isShowInbox'){
              this.isShowInbox = true;
              this.isShowHome  = false;
              this.isShowPhotos  = false;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
          }
           if(activeChoice === 'isShowPhotos'){
              this.isShowPhotos = true;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }
            if(activeChoice === 'isShowBasicSearch'){
              this.isShowBasicSearch  = true;
              this.isShowAdvancedSearch  = false;
              this.isShowPhotos = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
              this.isShowMatchMaker = false;
          }
           if(activeChoice === 'isShowAdvancedSearch'){
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = true;
              this.isShowPhotos = false;
              this.isShowProfileViews  = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
              this.isShowMatchMaker = false;
          }
           if(activeChoice === 'isShowProfileViews'){
              this.isShowProfileViews = true;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowPhotos = false;
              this.isShowBlockedUser  = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }
           if(activeChoice === 'isShowBlockedUsers'){
              this.isShowBlockedUsers = true;
              this.isShowProfileViews = false;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowPhotos = false;
              this.isShowFavorites  = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }
           if(activeChoice === 'isShowFavorites'){
              this.isShowFavorites = true;
              this.isShowBlockedUsers = false;
              this.isShowProfileViews = false;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowPhotos = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
          }

          if(activeChoice === 'isShowMatchMaker'){
              this.isShowFavorites = false;
              this.isShowBlockedUsers = false;
              this.isShowProfileViews = false;
              this.isShowBasicSearch  = false;
              this.isShowAdvancedSearch  = false;
              this.isShowPhotos = false;
              this.isShowInbox = false;
              this.isShowHome  = false;
              this.isAvancedSearch = false;
              this.isShowMatchMaker = true;
          }

      }
    }
  }
</script>

<style scoped>
 li.nav-item{
   display: block;
   margin: 2px;
 }
 
</style>
