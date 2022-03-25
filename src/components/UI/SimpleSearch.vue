<template>
  <v-text-field
    clearable
    :label="label"
    outlined
    :placeholder="placeholder"
    hide-details
    v-on:input="search"
    v-model="searchTerm"
  >
    <template v-slot:append>
      <span class="icon-search" style="color: black; font-size: 1.5rem;" />
    </template>
  </v-text-field>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'SimpleSearch',
  props: {
    label: {
      type: String,
      default: 'Pesquisa'
    },
    placeholder: {
      type: String,
      default: ''
    },
    searchFunction: {
      type: Function,
      default: async () => {
        throw new Error('SimpleSearch.vue: searchFunction must be implemented in the parent component')
      }
    },
    queryString: {
      type: String,
      default: 'search'
    }
  },
  beforeMount() {
    if (Object.prototype.hasOwnProperty.call(this.$route.query, 'search')) {
      this.searchTerm = this.$route.query.search
    }
  },
  data() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    search: _.debounce(async function() {
      let query = {
        ...this.$route.query,
        [this.queryString]: this.searchTerm
      }
      Object.keys(query).forEach(key => {
        if (!query[key]) {
          delete query[key]
        }
      })
      this.$router.push({ query })
      await this.searchFunction(this.searchTerm)
    }, 1000)
  }
}
</script>

<style></style>
