<template>
  <section>
    <div style="width: 75%; margin: 0 auto;">
        <div class="row">
         <div class="col-lg-4">
           <h2>Basic Search</h2>
           <BasicSearch></BasicSearch>
         </div>
         <div class="col-lg-8">
             <SearchResult/>
         </div>
      </div>
    </div>

  </section>
</template>

<script>
import BasicSearch from '../components/search/BasicSearch'
import SearchResult from '../components/search/SearchResult'
  export default {
    middleware: ['check-auth', 'auth', 'check-profile', 'check-results'],
    components: {
      BasicSearch,
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
