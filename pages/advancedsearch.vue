<template>
  <div>
      <div style="width: 75%; margin: 0 auto;">
         <h2>Advanced Search</h2>
         <div class="row">
           <div class="col-lg-4">
              <AdvancedSearch></AdvancedSearch>
           </div>
            <div class="col-lg-8">
               <SearchResult/>
            </div>
         </div>


      </div>


  </div>
</template>

<script>
import AdvancedSearch from '../components/search/AdvancedSearch'
import SearchResult from '../components/search/SearchResult'
  export default {
    middleware: ['check-auth', 'auth', 'check-profile', 'checkPremium'],
    components: {
      AdvancedSearch,
      SearchResult
    },
    data(){
      return {
          results: [],
      }
    }
  }
</script>

<style  scoped>

</style>
