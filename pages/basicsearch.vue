<template>
  <div>
      <div style="width: 75%; margin: 0 auto;">
         <BasicSearch></BasicSearch>
         <SearchResult :results="results"/>
      </div>


  </div>
</template>

<script>
import BasicSearch from '../components/search/BasicSearch'
import SearchResult from '../components/search/SearchResult'
  export default {
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

<style lang="scss" scoped>

</style>
