<template>
        <select class="form-control" @input="$emit('input', val || $event.target.value)">
                <option v-for="(option, i) in options" :key="'option-'+i+'-'+option.name" :value="option.name">{{ option.name }}</option>
        </select>
</template>

<script>
  export default {
     props: ['options'],
     data(){
       return{

       }
     }
  }
</script>

<style lang="scss" scoped>

</style>
