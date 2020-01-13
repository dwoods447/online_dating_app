<template>
  <div>

  <Navigation/>
    <!-- Page Content -->
    <div>
      <AppHeader/>
      <nuxt />
    </div>
    <!-- /.container -->
      <!-- Bootstrap core JavaScript -->
  <script
  src="https://code.jquery.com/jquery-3.4.1.slim.js"
  integrity="sha256-BTlTdQO9/fascB1drekrDVkaKd9PkwBymMlHOiG+qLI="
  crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <AppFooter/>




  </div>
</template>
<script>

import AppFooter from '../components/footer/AppFooter'
import Navigation from '../components/nav/Navigation'
import AppHeader from '../components/header/AppHeader'
export default {
  components:{
    AppFooter,
    Navigation,
    AppHeader
  },
  data(){
    return {

    }
  }
}
</script>
<style>

</style>
