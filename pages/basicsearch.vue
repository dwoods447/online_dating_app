<template>
  <div>
      <BasicSearch></BasicSearch>
      <SearchResult :results="results"/>

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
