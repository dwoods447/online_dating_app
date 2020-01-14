<template>
  <div>
      <BasicSearch/>
      <SearchResult/>
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

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
