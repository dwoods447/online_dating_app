<template>
    <div>
        <div style="width: 100vw; height: 100vh;" class="flex-container">
            <div style="margin: 10%; text-align: center;">
                <h1 style="text-align:center; color: red;">This user's profile no longer exists!</h1>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    created(){
        this.redirectToHomePage();
    },
    data(){
        return {

        }
    },
    methods: {
        redirectToHomePage(){
            let $this = this;
            setTimeout(()=>{
                $this.$router.push({name: 'index'});
            }, 3500)
        }
    }
}
</script>
<style scoped>
.flex-container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}
 
</style>