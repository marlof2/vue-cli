<template>
    <v-btn v-on="$listeners" :dark="dark" :style="{background: background}">{{label}}</v-btn>
</template>
<script>
export default {
    props: {
        background: String,
        label: String,
        dark: Boolean,
        click: Function,
    },
}
</script>

<style></style>