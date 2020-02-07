<template>
  <div>
        <nav class="nav nav-tabs" >
          <a href="#" class="nav-item nav-link active">
              <i class="fa fa-home"></i> About {{user.username}}
          </a>
          <a href="#" class="nav-item nav-link">
              <i class="fa fa-user"></i> {{user.username}}'s Photos
          </a>
      </nav>
  </div>
</template>

<script>
  export default {
    props:['user'],
    data(){
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
