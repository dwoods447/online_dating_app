<template>
  <div>
      <nav class="nav nav-tabs" style="width: 40%; margin: 0 auto;">
        <li class="nav-item">
           <!-- <a href="" class="nav-link">Inbox</a> -->
           <nuxt-link class="nav-link nav-item active" to="/" v-if="this.$store.getters.isAutheticated">Home</nuxt-link>

        </li>
        <li class="nav-item">
           <!-- <a href="" class="nav-link">Inbox</a> -->
           <nuxt-link class="nav-link nav-item " to="/inbox" v-if="this.$store.getters.isAutheticated">Inbox</nuxt-link>

        </li>
        <li class="nav-item">
          <!-- <a href="" class="nav-link">Search</a> -->
           <nuxt-link class="nav-link nav-item" to="/photos" v-if="this.$store.getters.isAutheticated">Photos</nuxt-link>
        </li>
        <li class="nav-item">
          <!-- <a href="" class="nav-link">Search</a> -->
           <nuxt-link class="nav-link nav-item" to="/basicsearch" v-if="this.$store.getters.isAutheticated">Search</nuxt-link>
        </li>
        <li class="nav-item">
        <a href="#" class="nav-link nav-item" v-if="this.$store.getters.isAutheticated">Profile Views</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link nav-item" v-if="this.$store.getters.isAutheticated">Favorite Users</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link nav-item" v-if="this.$store.getters.isAutheticated">Blocked Users</a>
        </li>
      </nav>
      <section>
        <slot></slot>
      </section>
  </div>
</template>

<script>
  export default {
    data(){
      return {

      }
    }
  }
</script>

<style scoped>
 /* li.nav-item{
   margin: 14px;
 } */
</style>
