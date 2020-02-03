<template>
  <div>

  <Navigation/>
    <!-- Page Content -->
    <div>
      <AppHeader/>
       <SubMenu>
         <nuxt />
       </SubMenu>
    </div>
    <!-- /.container -->
  <AppFooter/>
  </div>
</template>
<script>

import AppFooter from '../components/footer/AppFooter'
import Navigation from '../components/nav/Navigation'
import AppHeader from '../components/header/AppHeader'
import SubMenu from '../components/SubMenu'
export default {
  components:{
    AppFooter,
    Navigation,
    AppHeader,
    SubMenu
  },
  data(){
    return {

    }
  },
  head(){
    return {
        script: [
        { src: 'https://code.jquery.com/jquery-3.4.1.slim.js', body: true },
         { src: 'https://getbootstrap.com/docs/4.1/assets/js/vendor/popper.min.js', body: true },
          { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', body: true },
      ],
    }
  }
}
</script>
<style>

</style>
