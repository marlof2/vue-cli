<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageProp: {
      type: Number,
      default: 1,
    },
    pageCountProp: {
      type: Number,
      default: 1,
    },
    itemsPerPageProp: {
      type: Number,
      default: 2,
    },
    dataProp: {
      type: Array,
      default: [],
    },
    headersProp: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    this.data = this.dataProp;
    this.headers = this.headersProp;
    this.page = this.pageProp;
    this.pageCount = this.pageCountProp;
    this.itemsPerPage = this.itemsPerPageProp;
  },
  data() {
    return {
      data: [],
      headers: [],
      page: 0,
      pageCount: 0,
      itemsPerPage: 0,
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep .v-data-table-header > tr th span {
  color: #444444 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  vertical-align: middle !important;
}
</style>