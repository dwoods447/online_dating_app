<template>
  <div>
    <div class="flex-container-column flex-header">
      <div class="flex-item">
         <h1 style="text-align:center; color: red;">You are prevented from viewing this user's profile.</h1>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    middleware: ['check-auth', 'auth', 'check-profile'],
    data(){
      return {

      }
    }
  }
</script>

<style scoped>
.flex-container-column{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: nowrap;
}

.flex-header{
   height: 50vh;
}
</style>
