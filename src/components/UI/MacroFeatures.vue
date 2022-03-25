<template>

    <router-link :to="{name: this.url}" :exact="exact" class="macro_component_link col-12 col-xs-12 col-sm-4 col-lg-2"> 
        <span :class="this.icon"></span>
        <h3>{{ name }}</h3>
    </router-link>
    
</template>
<script>
export default {
    props:{      
        name: String,
        icon: String,
        url: String,
        exact: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style scoped>
.macro_component_link{
    text-decoration: none !important;
}
</style>