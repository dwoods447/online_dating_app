<template>
  <div>
    <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">Start Bootstrap</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
           <nuxt-link to="/" class="nav-link">
           Home
           <span class="sr-only">(current)</span>
           </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/inbox" class="nav-link">Inbox</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/basicsearch" class="nav-link">Search</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/login" class="nav-link">Login</nuxt-link>
          </li>
           <li class="nav-item">
            <nuxt-link to="/signup" class="nav-link">Sign Up</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

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
