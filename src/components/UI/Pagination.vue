<template>
    <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
        <v-text-field
        :value="itemsPerPage"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
        ></v-text-field>
    </div>
</template>